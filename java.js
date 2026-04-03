const slides = document.querySelectorAll('.slide');
const total = slides.length;
let current = 0;

function getIndex(offset) {
  return (current + offset + total) % total;
}

function update() {
  slides.forEach(s => s.className = s.className.replace(/\b(active|next|prev|hidden)\b/g, '').trim());
  slides[getIndex(0)].classList.add('active');
  slides[getIndex(1)].classList.add('next');
  slides[getIndex(-1)].classList.add('prev');
  for (let i = 2; i < total - 1; i++) slides[getIndex(i)].classList.add('hidden');
}

setInterval(() => { current = getIndex(1); update(); }, 3000);


document.addEventListener("DOMContentLoaded", function () {

  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".dropdown-menu");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
  });

});



const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = new FormData(form);

  const response = await fetch(form.action, {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  });

  if (response.ok) {
    form.reset();
    successMessage.style.display = "block";
  } else {
    alert("Something went wrong. Please try again.");
  }
});
