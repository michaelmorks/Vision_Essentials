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


/* FORMSPREE CODE */


const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      
      // ✅ reset form first
      form.reset();

      // ✅ show success message
      successMessage.style.display = "block";

      // 🎉 CONFETTI BURST 1
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });

      // 🎉 CONFETTI BURST 2 (delayed)
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 120,
          origin: { y: 0.5 }
        });
      }, 300);

      // 📳 VIBRATION (mobile only)
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }

    } else {
      alert("Something went wrong. Please try again.");
    }

  } catch (error) {
    alert("Submission failed. Please check your connection.");
  }
});
/* END OF FORMSPREE CODE */







/* SERVCIES */

const cards = document.querySelectorAll(".card");
const title = document.getElementById("env-title");
const desc = document.getElementById("env-desc");
const video = document.getElementById("env-video");

/* DATA FOR EACH TAB */
const contentData = {
  video: {
    title: "Video Production",
    desc: "High-quality video production that tells your brand story, captures attention, and drives engagement.",
    video: "videos/video-production.mp4"
  },
  Social: {
    title: "Social Media Content",
    desc: "Scroll-stopping content designed to grow your audience and increase engagement across platforms.",
    video: "videos/social.mp4"
  },
  events: {
    title: "Events",
    desc: "Professional event coverage capturing every key moment with cinematic quality.",
    video: "videos/events.mp4"
  },
  business: {
    title: "Business Content",
    desc: "Corporate and promotional videos that build trust and showcase your business professionally.",
    video: "videos/business.mp4"
  },
  branding: {
    title: "Branding",
    desc: "Creative visuals that define your brand identity and help you stand out in the market.",
    video: "videos/branding.mp4"
  }
};

/* FUNCTION TO UPDATE CONTENT */
function updateContent(key) {
  const data = contentData[key];

  title.textContent = data.title;
  desc.textContent = data.desc;
  video.src = data.video;
}

/* CLICK EVENTS */
cards.forEach(card => {
  card.addEventListener("click", () => {

    // remove active
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");

    // update content
    const key = card.getAttribute("data-env");
    updateContent(key);
  });
});

/* LOAD DEFAULT */
updateContent("video");

/* END OF SERVCIES */




/* FADE EFFECT */
const sections = document.querySelectorAll(".section-fade");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      // small delay so user actually sees it
      setTimeout(() => {
        entry.target.classList.add("show");
      }, 150);

    }
  });
}, {
  threshold: 0.25, // waits until 25% of section is visible
  rootMargin: "0px 0px -100px 0px" // triggers slightly later (KEY FIX)
});

sections.forEach(section => {
  observer.observe(section);
});

/* END OF FADE EFFECT */



/* SRCOLL EFFECT */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

/* END OF SRCOLL EFFECT */


/* LOADING SCREEN EFFECT */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const video = document.getElementById("loader-video");

  let hasExited = false;

  function hideLoader() {
    if (hasExited) return;
    hasExited = true;

    loader.classList.add("fade-out");

    setTimeout(() => {
      loader.style.display = "none";
    }, 800);
  }

  // only attach video event if it exists AND is visible (desktop)
  if (video && window.innerWidth > 768) {
    video.addEventListener("ended", hideLoader);
  }

  // fallback always
  setTimeout(hideLoader, 4000);
});

/* END OF LOADING SCREEN EFFECT */
