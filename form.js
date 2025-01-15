// tab shifting

const tabLinks = document.querySelectorAll(".tab-link");
const tabContents = document.querySelectorAll(".tab-content");

tabLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Remove active class from all buttons and contents
    tabLinks.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active class to the clicked button and corresponding content
    link.classList.add("active");
    document
      .getElementById(link.getAttribute("data-tab"))
      .classList.add("active");
  });
});

// google map location finder

let pickupAutocomplete;
let dropAutocomplete;

function initializeAutocomplete() {
  const pickupInput = document.getElementById("pickup");
  const dropInput = document.getElementById("drop");

  pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput, {
    types: ["geocode"],
    componentRestrictions: { country: "IN" },
  });
  dropAutocomplete = new google.maps.places.Autocomplete(dropInput, {
    types: ["geocode"],
    componentRestrictions: { country: "IN" },
  });
}

document.addEventListener("DOMContentLoaded", initializeAutocomplete);



// form submission

document
  .getElementById("one-way-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent actual form submission

    // Collect form data
    const pickup = document.getElementById("pickup").value;
    const drop = document.getElementById("drop").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // Store data in localStorage
    localStorage.setItem("pickup", pickup);
    localStorage.setItem("drop", drop);
    localStorage.setItem("date", date);
    localStorage.setItem("time", time);

    // Calculate fare
    calculatefare(pickupAutocomplete, dropAutocomplete);

    // Redirect to the second form
    window.open("book.html", "_blank");
  });

function calculatefare(pickup, drop) {
  const pickupPlace = pickup.getPlace();
  const dropPlace = drop.getPlace();

  if (
    !pickupPlace ||
    !dropPlace ||
    !pickupPlace.geometry ||
    !dropPlace.geometry
  ) {
    resultDiv.innerHTML =
      "Please select valid locations for both Pickup and Drop.";
    return;
  }

  const pickupCoords = pickupPlace.geometry.location;
  const dropCoords = dropPlace.geometry.location;

  const distance =
    google.maps.geometry.spherical.computeDistanceBetween(
      pickupCoords,
      dropCoords
    ) / 1000; // Convert meters to kilometers

  const distence = distance.toFixed(2);
  const suvfare = (distance * 20).toFixed(2);
  const primefare = (distance * 24).toFixed(2);
  const sedanfare = (distance * 15).toFixed(2);
  const innovafare = (distance * 30).toFixed(2);
  const innovacrystafare = (distance * 20).toFixed(2);

  console.log("Distance:", distance, "km");
  console.log("SUV Fare:", suvfare, "INR");
  console.log("Prime Fare:", primefare, "INR");
  console.log("Sedan Fare:", sedanfare, "INR");
  console.log("Innova Fare:", innovafare, "INR");
  console.log("Innova Crystal Fare:", innovacrystafare, "INR");

  localStorage.setItem("suvfare", suvfare);
  localStorage.setItem("distance", distence);
  localStorage.setItem("primefare", primefare);
  localStorage.setItem("sedanfare", sedanfare);
  localStorage.setItem("innovafare", innovafare);
  localStorage.setItem("innovacrystafare", innovacrystafare);
}
