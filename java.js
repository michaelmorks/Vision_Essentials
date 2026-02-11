
//dropdown meanu
const hamburger = document.querySelector(".hamburger");
const dropdown = document.getElementById("dropdownMenu");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdown.classList.toggle("active");
});

document.addEventListener("click", () => {
  dropdown.classList.remove("active");
});
////////////////-------------


// Auto silder
window.addEventListener("load", () => {

  const track = document.querySelector(".gallery-track");
  const slides = Array.from(track.children);
  
  // Duplicate slides for infinite loop
  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    track.appendChild(clone);
  });
  
  let scrollPos = 0;
  let speed = 1.3;
  
  function autoScroll() {
    scrollPos += speed;
    track.style.transform = `translateX(${-scrollPos}px)`;
  
    // Reset smoothly when half reached
    if (scrollPos >= track.scrollWidth / 2) {
      scrollPos = 0;
    }
  
    requestAnimationFrame(autoScroll);
  }
  
  autoScroll();
  });
  ////-------------------



  /* Show loader when page is loading */
window.addEventListener("load", () => {

  const loader = document.getElementById("loader");

  // Small delay so animation is visible (optional)
  setTimeout(() => {
    document.querySelector(".ball").style.animation = "none";
loader.classList.add("hidden");    
  }, 600);

});


/* Show loader again when user navigates away */
window.addEventListener("beforeunload", () => {
  document.getElementById("loader").classList.remove("hidden");
});
////-------------------