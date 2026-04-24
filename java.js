/* ── HERO SLIDESHOW ── */
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


/* ── HAMBURGER MENU ── */
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".dropdown-menu");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
  });
});


/* ── FORMSPREE ── */
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
      form.reset();
      successMessage.style.display = "block";

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 120,
          origin: { y: 0.5 }
        });
      }, 300);

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


/* ── SERVICES ── */
const cards = document.querySelectorAll(".card");
const title = document.getElementById("env-title");
const desc = document.getElementById("env-desc");
const video = document.getElementById("env-video");
let lastSrc = "";

const contentData = {
  video: {
    title: "Video Production",
    desc: "High-quality video production that tells your brand story, captures attention, and drives engagement.",
    video: "https://player.vimeo.com/video/1184473573?autoplay=1&muted=1&loop=1",
    class: "video"
  },
  Social: {
    title: "Social Media Content",
    desc: "Scroll-stopping content designed to grow your audience and increase engagement across platforms.",
    video: "https://player.vimeo.com/video/1184666620?autoplay=1&loop=1",
    class: "social"
  },
  events: {
    title: "Events",
    desc: "Professional event coverage capturing every key moment with cinematic quality.",
    video: "https://player.vimeo.com/video/1184669012?autoplay=1&loop=1",
    class: "events"
  },
  business: {
    title: "Business Content",
    desc: "Corporate and promotional videos that build trust and showcase your business professionally.",
    video: "https://player.vimeo.com/video/1184667410?autoplay=1&loop=1",
    class: "business"
  },
  branding: {
    title: "Branding",
    desc: "Creative visuals that define your brand identity and help you stand out in the market.",
    video: "https://player.vimeo.com/video/1184477919?autoplay=1&loop=1",
    class: "branding"
  }
};

function updateContent(key) {
  const data = contentData[key];
  title.textContent = data.title;
  desc.textContent = data.desc;
  video.src = data.video;
  video.className = data.class;
  lastSrc = data.video; // keep lastSrc updated
}

cards.forEach(card => {
  card.addEventListener("click", () => {
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    const key = card.getAttribute("data-env");
    updateContent(key);
  });
});

updateContent("video");

/* ── PAUSE VIDEO WHEN OUT OF VIEW ── */
const servicesSection = document.getElementById("services");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Back in view — restore saved src
      if (lastSrc) {
        video.src = lastSrc;
      }
    } else {
      // Out of view — save src then clear it
      if (video.src) {
        lastSrc = video.src;
      }
      video.src = "";
    }
  });
}, { threshold: 0.2 });

observer.observe(servicesSection);


/* ── CLIP-PATH REVEAL ON SCROLL ── */
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section-fade");

  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("show");
        }, 150);
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: "0px 0px -100px 0px"
  });

  sections.forEach(section => {
    fadeObserver.observe(section);
  });
});


/* ── LOADING SCREEN ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader-overlay').classList.add('hidden');
  }, 3000);
});


/* ── COUNT-UP ANIMATION ── */
function animateCounter(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = true;

  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const step = target / (duration / 16);
  let val = 0;

  const timer = setInterval(() => {
    val = Math.min(val + step, target);
    el.textContent = Math.round(val);
    if (val >= target) clearInterval(timer);
  }, 16);
}

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  counters.forEach(counter => {
    const rect = counter.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      animateCounter(counter);
    } else {
      observer.observe(counter);
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('sliderTrack');
  if (!track) return;

  const companies = [
    { logo: 'work-logos/747.png' },
    { logo: 'work-logos/ball-smart.png' },
    { logo: 'work-logos/barber.png' },
    { logo: 'work-logos/ball.png' },
    { logo: 'work-logos/brid.png' },
    { logo: 'work-logos/ehs.png' },
    { logo: 'work-logos/muslsa.png' },
    { logo: 'work-logos/pakenhamfc.png' },
    { logo: 'work-logos/plus.png' },
    { logo: 'work-logos/sting.png' },
  ];

  [...companies, ...companies].forEach(c => {
    const pill = document.createElement('div');
    pill.className = 'logo-pill';
    pill.innerHTML = `
      <img src="${c.logo}" alt="" class="logo-img" onerror="this.style.display='none'">
    `;
    track.appendChild(pill);
  });
});