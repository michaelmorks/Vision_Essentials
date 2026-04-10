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

function updateContent(key) {
  const data = contentData[key];
  title.textContent = data.title;
  desc.textContent = data.desc;
  video.src = data.video;
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


/* ── FADE ON SCROLL ── */
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

/* ── SMOOTH SCROLL ── */
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


/* ── LOADING SCREEN ── */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const loaderVideo = document.getElementById("loader-video");

  let hasExited = false;

  function hideLoader() {
    if (hasExited) return;
    hasExited = true;
    loader.classList.add("fade-out");
    setTimeout(() => {
      loader.style.display = "none";
    }, 800);
  }

  if (loaderVideo && window.innerWidth > 768) {
    loaderVideo.addEventListener("ended", hideLoader);
  }

  setTimeout(hideLoader, 4000);
});


/* ── REVIEW CAROUSEL ── */
let reviewCurrent = 0;
const reviews = document.querySelectorAll('.review');
const reviewTotal = reviews.length;

function goTo(idx) {
  reviews[reviewCurrent].classList.remove('active');
  reviewCurrent = (idx + reviewTotal) % reviewTotal;
  reviews[reviewCurrent].classList.add('active');
}

document.getElementById('prev').addEventListener('click', () => goTo(reviewCurrent - 1));
document.getElementById('next').addEventListener('click', () => goTo(reviewCurrent + 1));


/* ── COUNT-UP ANIMATION ── */
function animateCounter(el) {
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

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 }); // triggers when 50% visible

  counters.forEach(counter => observer.observe(counter));
});


/* ── COMPANY LOGO SLIDER ── */
const track = document.getElementById('sliderTrack');

const companies = [
  { name: 'Stripe',  logo: 'images/stripe.png'  },
  { name: 'Notion',  logo: 'images/notion.png'  },
  { name: 'Figma',   logo: 'images/figma.png'   },
  { name: 'Shopify', logo: 'images/shopify.png' },
  { name: 'Slack',   logo: 'images/slack.png'   },
  { name: 'HubSpot', logo: 'images/hubspot.png' },
  { name: 'Webflow', logo: 'images/webflow.png' },
  { name: 'Linear',  logo: 'images/linear.png'  },
];

[...companies, ...companies].forEach(c => {
  const pill = document.createElement('div');
  pill.className = 'logo-pill';
  pill.innerHTML = `
    <img src="${c.logo}" alt="${c.name}" class="logo-img">
    <span class="logo-name">${c.name}</span>
  `;
  track.appendChild(pill);
});