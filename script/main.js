// ========== Hamburger Menu ==========
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show");

      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);
    });
  }
});


// ========== Last Modified Date ==========
const lastModified = document.getElementById("lastModified");
if (lastModified) {
  lastModified.textContent = new Date(document.lastModified).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

// ========== Fun Quote Rotator ==========
const quoteEl = document.getElementById("funQuote");
const quotes = [
  { lang: "English", text: "Creativity is the soul of progress." },
  { lang: "Hausa", text: "Kirkira ita ce ruhin ci gaba." },
  { lang: "Yoruba", text: "Ìmọ̀lára ni ẹ̀mí ìlọsíwájú." },
  { lang: "Igbo", text: "Olu nka bu mkpụrụ obi mmepe." },
  { lang: "Ibibio", text: "Ukim ke idiong ediwat mme mme." },
  { lang: "Tiv", text: "Mtom u sha yô nenge ga." }
];

let currentQuote = 0;

if (quoteEl) {
  setInterval(() => {
    currentQuote = (currentQuote + 1) % quotes.length;
    quoteEl.textContent = `"${quotes[currentQuote].text}"`;
  }, 5000);
}

// ========== Stat Counter Animation ==========
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          const increment = Math.ceil(target / speed);

          if (count < target) {
            counter.innerText = count + increment;
            setTimeout(updateCount, 20);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
});

function checkStatsVisible() {
  const statsSection = document.getElementById("stats");
  if (!statsSection || hasAnimated) return;

  const top = statsSection.getBoundingClientRect().top;
  if (top < window.innerHeight) {
    runStatCounters();
    hasAnimated = true;
  }
}

window.addEventListener("scroll", checkStatsVisible);

// ========== Dynamic Project Loader ==========
document.addEventListener("DOMContentLoaded", () => {
  fetch("projects.json")
    .then(response => response.json())
    .then(data => {
      const projectGrid = document.getElementById("projectGrid");
      data.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
          <img src="${project.image}" alt="${project.title}" loading="lazy" />
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <a href="${project.link}" target="_blank" class="btn-secondary">View on GitHub</a>
        `;
        projectGrid.appendChild(card);
      });
    })
    .catch(error => console.error("Error loading projects:", error));
});

// Scroll-to-top functionality
const scrollBtn = document.getElementById("scrollTopBtn");
window.onscroll = () => {
  scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
};

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
