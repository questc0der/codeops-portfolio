let header = document.getElementsByClassName("h1-heading");
let singleDiv = document.querySelector("div");
let allDivs = document.querySelectorAll("div");

let email = document.getElementById("email");
let password = document.getElementById("password");
let loginButton = document.getElementById("loginForm");

function handleSubmit(e) {
  e.preventDefault();
  console.log("Form submitted");
  console.log(email.value);
  console.log(password.value);
}

loginButton.addEventListener("submit", handleSubmit);

// console.log(email.textContent);
// console.log(password.textContent);

console.dir(singleDiv);
console.dir(allDivs);
