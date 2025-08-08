// ========== Hamburger Menu ==========
const menuToggle = document.getElementById('menuToggle');
const navWrapper = document.querySelector('.nav-wrapper');
const navLinks = document.querySelectorAll('.nav-links a');

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  const isOpen = !expanded;

  menuToggle.classList.toggle('active');
  navWrapper.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));

  // Lock or unlock scroll
  document.body.classList.toggle('no-scroll', isOpen);
});

// Close menu when a nav link is clicked (mobile only)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navWrapper.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll'); // Unlock scroll
    }
  });
});

// ========== Scroll to Top Button ==========
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
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

// ========== Dynamic Project Loader ==========
document.addEventListener("DOMContentLoaded", () => {
  fetch("response.json")
    .then(response => response.json())
    .then(data => {
      const projectGrid = document.getElementById("projectGrid");
      data.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
          <img src="${project.image}" alt="${project.title}" loading="lazy">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <a href="${project.link}" target="_blank" class="btn-secondary">View on GitHub</a>
        `;
        projectGrid.appendChild(card);
      });
    })
    .catch(error => console.error("Error loading projects:", error));
});


const projects = [
  { title: "Chop Chop", category: "landing", image: "images/premium.avif", description: "Food-ordering platform for Nigerian snacks.", link: "#" },
  { title: "Dev Portfolio", category: "portfolio", image: "images/devfolio.webp", description: "Minimal personal dev site template.", link: "#" },
  { title: "Figma ToolKit", category: "tools", image: "images/figma-toolkit.webp", description: "UI component set for rapid prototyping.", link: "#" },
  { title: "Lagos Tours", category: "landing", image: "images/lagos-tours.webp", description: "Landing page for a local tourism company.", link: "#" },
  { title: "Resume Builder", category: "tools", image: "images/resume-builder.webp", description: "Interactive resume building web app.", link: "#" }
];

const projectGrid = document.getElementById("portfolioProjects");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderProjects(category) {
  projectGrid.innerHTML = "";
  const filtered = category === "all" ? projects : projects.filter(p => p.category === category);

  filtered.forEach((project, i) => {
    const card = document.createElement("div");
    card.className = `project-card animate-fade delay-${i}`;
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title} Screenshot" loading="lazy">
      <div class="project-info">
        <span class="project-badge">${project.category}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank" class="btn-secondary">View</a>
      </div>`;
    projectGrid.appendChild(card);
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });
});

renderProjects("all");

