const pickup = localStorage.getItem("pickup");
const drop = localStorage.getItem("drop");
const distance = localStorage.getItem("distance");
const fare = localStorage.getItem("cost");
const time = localStorage.getItem("time");
const date = localStorage.getItem("date");
const carimg = localStorage.getItem("carimg");
const carname = localStorage.getItem("carname");
const rate = localStorage.getItem("rate");

const route = `${pickup} - ${drop}`;
const datetime = `${date} ${time}`;

console.log(pickup, drop, distance, fare, time, date, carimg, carname, rate);

const A =  document.getElementById("rental-type").innerHTML = route;
const B = document.getElementById("distance").innerHTML = distance;
const C = document.getElementById("per-km").innerHTML = rate;
const D = document.getElementById("taxi-cost").innerHTML = carname;
const E = document.getElementById("final-cost").innerHTML = fare;

