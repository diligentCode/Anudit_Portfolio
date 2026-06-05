import "./style.css";

//page loaded
window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.classList.remove("loading");
    document.body.classList.add("loaded");
    document.body.style.overflow = "auto";
  }, 1000);
});

//Contact effect
const contacts = [
  {
    selector: ".email",
    value: "anuditjangid@gmail.com",
  },
  {
    selector: ".linkedin",
    value: "linkedin.com/in/Anudit",
  },
  {
    selector: ".github",
    value: "github.com/diligentCode",
  },
  {
    selector: ".phone",
    value: "+91 9511XXXXXX",
  },
];

contacts.forEach(({ selector, value }) => {
  const button = document.querySelector(selector);

  const originalHTML = button.innerHTML;

  button.addEventListener("mouseenter", () => {
    button.classList.add("active");
    const textElement = button.querySelector("p");
    if (textElement) textElement.textContent = value;
  });

  button.addEventListener("mouseleave", () => {
    button.classList.remove("active");
    button.innerHTML = originalHTML;
  });
});

//Type effect
const typeWriter = document.querySelector(".skill-name");

const words = ["Full-Stack Developer", "App Developer", "Problem Solver"];
let charIndex = 0;
let wordIndex = 0;
let deleting = false;

function typeEffect() {
  if (!deleting) {
    typeWriter.textContent = words[wordIndex].substring(0, charIndex + 1);
    charIndex++;
    if (charIndex == words[wordIndex].length) {
      deleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }
  } else {
    typeWriter.textContent = words[wordIndex].substring(0, charIndex);
    charIndex--;

    if (charIndex == 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();

//cursor effect
const cursorRing = document.querySelector(".cursor-ring");
const cursorDot = document.querySelector(".cursor-dot");
const clickables = document.querySelectorAll("button, a");

//  Hover effect
clickables.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    cursorRing.classList.add("active");
  });
  item.addEventListener("mouseleave", () => {
    cursorRing.classList.remove("active");
  });
});

//Follow effect
let currentX = 0;
let currentY = 0;

let mouseX = 0;
let mouseY = 0;

// Parallax target for profile
const profile = document.querySelector(".profile-container");

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Snap inner dot instantly to mouse
  cursorDot.style.left = mouseX + "px";
  cursorDot.style.top = mouseY + "px";

  // Subtle Parallax effect calculation for the profile picture
  if (profile) {
    const xVal = (mouseX / window.innerWidth - 0.5) * 30; // Moves max 15px
    const yVal = (mouseY / window.innerHeight - 0.5) * 30;
    profile.style.transform = `translateX(calc(50% + ${-xVal}px)) translateY(${-yVal}px)`;
  }
});

function animate() {
  // Lerp function for the trailing outer ring
  currentX += (mouseX - currentX) * 0.15;
  currentY += (mouseY - currentY) * 0.15;

  cursorRing.style.left = currentX + "px";
  cursorRing.style.top = currentY + "px";

  requestAnimationFrame(animate);
}

animate();
