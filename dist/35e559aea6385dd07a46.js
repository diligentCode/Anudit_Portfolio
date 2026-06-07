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

const profile = document.querySelector(".profile-container");

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursorDot.style.left = mouseX + "px";
  cursorDot.style.top = mouseY + "px";

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

// Shuffle the carddsssss
const cardSec = document.querySelector(".skill-card-section");

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      cardSec.classList.add("active");
    } else {
      cardSec.classList.remove("active");
    }
  },
  {
    threshold: 0.4,
  },
);

observer.observe(cardSec);

//Some transition for headings
const headings = document.querySelectorAll("h1");

headings.forEach((heading) => {
  const originalText = heading.textContent;

  heading.textContent = "";

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;

      let i = 0;

      const interval = setInterval(() => {
        heading.textContent += originalText[i];

        i++;

        if (i >= originalText.length) {
          clearInterval(interval);
        }
      }, 200);

      observer.unobserve(heading);
    },
    {
      threshold: 1,
    },
  );

  observer.observe(heading);
});

const projectCards = document.querySelectorAll(".project-card");
const projectLinks = document.querySelectorAll(".project-link");
const globalRing = document.querySelector(".cursor-ring");

// Connect all custom portfolio links directly to your custom expandable cursor ring
projectLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    if (globalRing) globalRing.classList.add("active");
  });
  link.addEventListener("mouseleave", () => {
    if (globalRing) globalRing.classList.remove("active");
  });
});

// Dynamic Card Tracking Calculations
projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);

    const tiltX = (rect.height / 2 - y) * 0.035;
    const tiltY = (x - rect.width / 2) * 0.035;

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    card.style.setProperty("--mouse-x", `50%`);
    card.style.setProperty("--mouse-y", `50%`);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".exp-timeline-wrapper");
  const svgTrack = document.querySelector(".exp-svg-track");
  const activePath = document.querySelector(".exp-path-active");
  const bgPath = document.querySelector(".exp-path-bg");
  const cards = document.querySelectorAll(".exp-card-wrapper");
  const liveSpark = document.getElementById("exp-live-spark");

  if (!wrapper || !svgTrack || !activePath || !bgPath) return;

  const desktopTriggers = [0.08, 0.5, 0.92];

  function initTimelineStructure() {
    const isMobile = window.innerWidth < 900;

    if (isMobile) {
      const totalWrapperHeight = wrapper.offsetHeight;
      svgTrack.setAttribute("viewBox", `0 0 80 ${totalWrapperHeight}`);

      const mobileD = `M 40 0 L 40 ${totalWrapperHeight}`;
      activePath.setAttribute("d", mobileD);
      bgPath.setAttribute("d", mobileD);

      cards.forEach((card) => {
        const cardTop = card.offsetTop;
        const triggerRatio = Math.max(
          0.01,
          Math.min(0.96, (cardTop + 30) / totalWrapperHeight),
        );
        card.setAttribute("data-trigger", triggerRatio);
      });
    } else {
      svgTrack.setAttribute("viewBox", "0 0 1000 1350");

      const desktopD =
        "M 500 0 C 200 300, 200 500, 500 675 C 800 850, 800 1050, 500 1350";

      activePath.setAttribute("d", desktopD);
      bgPath.setAttribute("d", desktopD);

      cards.forEach((card, index) => {
        if (index < desktopTriggers.length) {
          card.setAttribute("data-trigger", desktopTriggers[index]);
          card.style.top = `${index * 440 + 40}px`;
        }
      });
    }

    const pathTotalLength = activePath.getTotalLength();
    activePath.style.strokeDasharray = pathTotalLength;
    activePath.style.strokeDashoffset = pathTotalLength;

    buildTimelineNodes(pathTotalLength);
    scrubTimelineProgress();
  }

  function buildTimelineNodes(totalLength) {
    svgTrack
      .querySelectorAll(".exp-dynamic-dot")
      .forEach((node) => node.remove());

    cards.forEach((card) => {
      const triggerPercent = parseFloat(card.getAttribute("data-trigger"));

      const coordPoint = activePath.getPointAtLength(
        triggerPercent * totalLength,
      );

      const gGroup = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g",
      );

      gGroup.setAttribute("class", "exp-dynamic-dot");
      gGroup.setAttribute("data-trigger", triggerPercent);

      const haloCircle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );

      haloCircle.setAttribute("cx", coordPoint.x);
      haloCircle.setAttribute("cy", coordPoint.y);
      haloCircle.setAttribute("r", "13");
      haloCircle.setAttribute("class", "dot-halo");

      const coreCircle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );

      coreCircle.setAttribute("cx", coordPoint.x);
      coreCircle.setAttribute("cy", coordPoint.y);
      coreCircle.setAttribute("r", "5");
      coreCircle.setAttribute("class", "dot-core");

      gGroup.appendChild(haloCircle);
      gGroup.appendChild(coreCircle);

      svgTrack.appendChild(gGroup);
    });
  }

  function scrubTimelineProgress() {
    const sectionElement = document.querySelector(".experience-section");
    if (!sectionElement) return;

    const sectionBounding = sectionElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const interpolationStart =
      window.pageYOffset + sectionBounding.top - viewportHeight * 0.45;

    const interpolationEnd =
      window.pageYOffset +
      sectionBounding.top +
      sectionBounding.height -
      viewportHeight * 0.75;

    const scrollCursor = window.pageYOffset;

    let currentProgress =
      (scrollCursor - interpolationStart) /
      (interpolationEnd - interpolationStart);

    currentProgress = Math.max(0, Math.min(1, currentProgress));

    const totalPathLength = activePath.getTotalLength();
    const tracePixelDistance = currentProgress * totalPathLength;

    activePath.style.strokeDashoffset = totalPathLength - tracePixelDistance;

    if (currentProgress <= 0.002) {
      liveSpark.style.opacity = "0";
    } else {
      liveSpark.style.opacity = "1";

      const sparkPoint = activePath.getPointAtLength(tracePixelDistance);

      liveSpark.setAttribute(
        "transform",
        `translate(${sparkPoint.x}, ${sparkPoint.y})`,
      );
    }

    cards.forEach((card) => {
      const activationTrigger = parseFloat(card.getAttribute("data-trigger"));

      if (currentProgress >= activationTrigger) {
        card.classList.add("active-node");
      } else {
        card.classList.remove("active-node");
      }
    });

    svgTrack.querySelectorAll(".exp-dynamic-dot").forEach((dot) => {
      const dotTrigger = parseFloat(dot.getAttribute("data-trigger"));

      if (currentProgress >= dotTrigger) {
        dot.classList.add("illuminated");
      } else {
        dot.classList.remove("illuminated");
      }
    });
  }

  cards.forEach((wrapperNode) => {
    const structuralCard = wrapperNode.querySelector(".exp-card");
    const localizedGlow = wrapperNode.querySelector(".card-inner-glow");

    if (!structuralCard || !localizedGlow) return;

    structuralCard.addEventListener("mousemove", (event) => {
      const rectBox = structuralCard.getBoundingClientRect();

      const pointerX = event.clientX - rectBox.left;
      const pointerY = event.clientY - rectBox.top;

      localizedGlow.style.left = `${pointerX}px`;
      localizedGlow.style.top = `${pointerY}px`;
      localizedGlow.style.opacity = "1";

      const centerOffsetX = rectBox.width / 2;
      const centerOffsetY = rectBox.height / 2;

      const degreeTiltX = (centerOffsetY - pointerY) / 14;
      const degreeTiltY = (pointerX - centerOffsetX) / 14;

      structuralCard.style.transform = `perspective(1000px) rotateX(${degreeTiltX}deg) rotateY(${degreeTiltY}deg) scale3d(1.015, 1.015, 1.015)`;
    });

    structuralCard.addEventListener("mouseleave", () => {
      localizedGlow.style.opacity = "0";

      structuralCard.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });

    structuralCard.addEventListener("mouseenter", () => {
      const globalCursorRing = document.querySelector(".cursor-ring");

      if (globalCursorRing) {
        globalCursorRing.classList.add("active");
      }
    });

    structuralCard.addEventListener("mouseleave", () => {
      const globalCursorRing = document.querySelector(".cursor-ring");

      if (globalCursorRing) {
        globalCursorRing.classList.remove("active");
      }
    });
  });

  window.addEventListener("scroll", scrubTimelineProgress, {
    passive: true,
  });

  window.addEventListener("resize", initTimelineStructure);

  initTimelineStructure();

  setTimeout(initTimelineStructure, 600);
});
