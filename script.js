document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  const preloader = document.querySelector(".preloader");
  window.addEventListener("load", function () {
    setTimeout(function () {
      preloader.classList.add("fade-out");
      setTimeout(function () {
        preloader.style.display = "none";
      }, 500);
    }, 1000);
  });

  // Particles.js
  particlesJS.load("particles-js", "particles.json", function () {
    console.log("Particles.js config loaded");
  });

  // Scroll Reveal
  ScrollReveal().reveal(
    ".hero-content, .feature-card, .section-header, .two-columns, .resource-card, .login-form",
    {
      duration: 800,
      origin: "bottom",
      distance: "30px",
      easing: "cubic-bezier(0.5, 0, 0, 1)",
      interval: 200,
      reset: true,
    }
  );

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Active nav link
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", function () {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Smooth scrolling
  window.scrollToSection = function (id) {
    const section = document.getElementById(id);
    if (section) {
      const offset = section.getBoundingClientRect().top + window.pageYOffset - document.querySelector(".navbar").offsetHeight;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  // Modal control
  window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("active"), 10);
    document.body.style.overflow = "hidden";
  };

  window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove("active");
    setTimeout(() => (modal.style.display = "none"), 300);
    document.body.style.overflow = "auto";
  };

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal.id);
    });
  });

const mobileMenuBtn = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('.nav-links');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', function () {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
    });
  });

  // ==========================
  // LOGIN CON ROLES
  // ==========================
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const user = document.getElementById("username").value.trim().toLowerCase();
      const pass = document.getElementById("password").value;
      const errorMsg = document.getElementById("loginError");

      // Usuarios simulados
      const users = {
        "admin@edudata.com": {
          password: "admin123",
          role: "admin",
          redirect: "dashboard_admin.html",
        },
        "gustavo.restrepo@edudata.edu.co": {
          password: "colegio123",
          role: "institucion",
          redirect: "dashboard_institucion.html",
        },
      };

      if (users[user] && users[user].password === pass) {
        const userData = users[user];
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", user);
        localStorage.setItem("userRole", userData.role);
        errorMsg.style.display = "none";
        closeModal("loginModal");
        setTimeout(() => {
          window.location.href = userData.redirect;
        }, 300);
      } else {
        errorMsg.style.display = "block";
      }
    });
  }

  // Mostrar u ocultar botones según sesión
  const loginBtn = document.getElementById("loginBtn");
  const dashboardBtn = document.getElementById("dashboardBtn");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (loginBtn && dashboardBtn) {
    if (isLoggedIn) {
      loginBtn.style.display = "none";
      dashboardBtn.style.display = "inline-flex";
    } else {
      loginBtn.style.display = "inline-flex";
      dashboardBtn.style.display = "none";
    }
  }
});
