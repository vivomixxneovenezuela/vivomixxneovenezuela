document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const progressBar = document.querySelector(".scroll-progress span");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const revealElements = document.querySelectorAll(".reveal");
  const sections = document.querySelectorAll("main section[id]");
  const details = document.querySelectorAll(".faq-list details");

  const ambientGradient1 = document.querySelector(".ambient-gradient-1");
  const ambientGradient2 = document.querySelector(".ambient-gradient-2");
  const ambientGradient3 = document.querySelector(".ambient-gradient-3");
  const ambientOrb1 = document.querySelector(".ambient-orb-1");
  const ambientOrb2 = document.querySelector(".ambient-orb-2");
  const ambientSpiresLeft = document.querySelector(".ambient-spires-left");
  const ambientSpiresRight = document.querySelector(".ambient-spires-right");

  const heroSpires1 = document.querySelector(".hero-scene-spires-1");
  const heroSpires2 = document.querySelector(".hero-scene-spires-2");
  const heroOrb1 = document.querySelector(".hero-scene-orb-1");
  const heroOrb2 = document.querySelector(".hero-scene-orb-2");
  const heroMedia = document.querySelector(".hero-media");
  const heroProduct460 = document.querySelector(".hero-product-460");
  const heroProduct115 = document.querySelector(".hero-product-115");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* HEADER + SCROLL PROGRESS */

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 18) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  function updateProgressBar() {
    if (!progressBar) return;

    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 0;

    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }

  function setActiveNavLink() {
    if (!sections.length || !navLinks.length) return;

    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 160;

      if (window.scrollY >= sectionTop) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");

      if (href === `#${currentSectionId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  /* DEPTH / PARALLAX MOTION */

  function updateDepthMotion() {
    if (prefersReducedMotion) return;

    const scrollY = window.scrollY;
    const viewportH = window.innerHeight || 1;
    const normalized = scrollY / viewportH;

    if (ambientGradient1) {
      ambientGradient1.style.transform = `
        translate3d(${Math.sin(normalized * 1.1) * 30}px, ${scrollY * -0.025}px, 0)
        scale(${1 + Math.sin(normalized) * 0.025})
      `;
    }

    if (ambientGradient2) {
      ambientGradient2.style.transform = `
        translate3d(${Math.cos(normalized * 1.1) * -36}px, ${scrollY * 0.018}px, 0)
        scale(${1 + Math.cos(normalized) * 0.03})
      `;
    }

    if (ambientGradient3) {
      ambientGradient3.style.transform = `
        translate3d(${Math.sin(normalized * 0.9) * 22}px, ${scrollY * 0.03}px, 0)
        scale(${1 + Math.sin(normalized * 1.2) * 0.025})
      `;
    }

    if (ambientOrb1) {
      ambientOrb1.style.transform = `
        translate3d(${Math.cos(normalized * 1.4) * 24}px, ${scrollY * -0.018}px, 0)
      `;
    }

    if (ambientOrb2) {
      ambientOrb2.style.transform = `
        translate3d(${Math.sin(normalized * 1.2) * -20}px, ${scrollY * 0.02}px, 0)
      `;
    }

    if (ambientSpiresLeft) {
      ambientSpiresLeft.style.transform = `
        translate3d(${Math.sin(normalized) * 18}px, ${scrollY * 0.035}px, 0)
        rotate(${-18 + scrollY * 0.006}deg)
      `;
    }

    if (ambientSpiresRight) {
      ambientSpiresRight.style.transform = `
        translate3d(${Math.cos(normalized) * -18}px, ${scrollY * -0.025}px, 0)
        rotate(${20 - scrollY * 0.005}deg)
      `;
    }

    if (heroSpires1) {
      heroSpires1.style.transform = `
        translate3d(0, ${scrollY * 0.018}px, 0)
        rotate(${16 + scrollY * 0.004}deg)
      `;
    }

    if (heroSpires2) {
      heroSpires2.style.transform = `
        translate3d(0, ${scrollY * -0.014}px, 0)
        rotate(${-22 - scrollY * 0.004}deg)
      `;
    }

    if (heroOrb1) {
      heroOrb1.style.transform = `
        translate3d(${Math.sin(normalized) * 18}px, ${scrollY * 0.016}px, 0)
      `;
    }

    if (heroOrb2) {
      heroOrb2.style.transform = `
        translate3d(${Math.cos(normalized) * -18}px, ${scrollY * -0.012}px, 0)
      `;
    }

    if (heroMedia) {
      heroMedia.style.transform = `
        translate3d(0, ${scrollY * -0.018}px, 0)
      `;
    }
  }

  /* SUBTLE MOUSE DEPTH ON HERO */

  function setupHeroPointerDepth() {
    if (prefersReducedMotion || !heroMedia) return;

    const heroSection = document.querySelector(".hero-section");

    if (!heroSection) return;

    heroSection.addEventListener("mousemove", (event) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      heroMedia.style.setProperty("--pointer-x", `${x * 18}px`);
      heroMedia.style.setProperty("--pointer-y", `${y * 18}px`);

      if (heroProduct460) {
        heroProduct460.style.setProperty("--pointer-product-x", `${x * -10}px`);
        heroProduct460.style.setProperty("--pointer-product-y", `${y * -10}px`);
      }

      if (heroProduct115) {
        heroProduct115.style.setProperty("--pointer-product-x", `${x * 12}px`);
        heroProduct115.style.setProperty("--pointer-product-y", `${y * 12}px`);
      }
    });

    heroSection.addEventListener("mouseleave", () => {
      heroMedia.style.setProperty("--pointer-x", "0px");
      heroMedia.style.setProperty("--pointer-y", "0px");

      if (heroProduct460) {
        heroProduct460.style.setProperty("--pointer-product-x", "0px");
        heroProduct460.style.setProperty("--pointer-product-y", "0px");
      }

      if (heroProduct115) {
        heroProduct115.style.setProperty("--pointer-product-x", "0px");
        heroProduct115.style.setProperty("--pointer-product-y", "0px");
      }
    });
  }

  let ticking = false;

  function handleScrollEffects() {
    updateHeader();
    updateProgressBar();
    setActiveNavLink();
    updateDepthMotion();
    ticking = false;
  }

  function requestScrollTick() {
    if (!ticking) {
      window.requestAnimationFrame(handleScrollEffects);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestScrollTick, { passive: true });
  window.addEventListener("resize", requestScrollTick);
  handleScrollEffects();
  setupHeroPointerDepth();

  /* MOBILE NAV */

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("menu-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("menu-open");

      if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      body.classList.remove("menu-open");

      if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  /* REVEAL ANIMATIONS */

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* FAQ ACCORDION */

  details.forEach((targetDetail) => {
    targetDetail.addEventListener("toggle", () => {
      if (targetDetail.open) {
        details.forEach((detail) => {
          if (detail !== targetDetail) {
            detail.open = false;
          }
        });
      }
    });
  });

  /* PRODUCT SELECTOR */

  const choiceButtons = document.querySelectorAll(".choice-btn");
  const choiceResult = document.querySelector(".choice-result");

  const choiceMessages = {
    sobres: {
      title: "Probablemente te conviene revisar Vivomixx neo 9 – 460 sobres.",
      text:
        "Es la presentación de mayor concentración por toma: 460 mil millones de bacterias vivas por sobre. Puede ser útil si priorizas concentración y no te importa mezclarlo con agua, yogur u otra bebida o alimento frío sin gas."
    },
    capsulas: {
      title: "Probablemente te conviene revisar Vivomixx neo 9 – 115 cápsulas.",
      text:
        "Es una opción más práctica para la rutina diaria: 115 mil millones de bacterias vivas por cápsula. La dosis diaria recomendada es de 1 a 4 cápsulas con un vaso de agua."
    },
    duda: {
      title: "Lo ideal es elegir según tu caso y rutina.",
      text:
        "Si no estás seguro, consulta disponibilidad de ambas presentaciones y pregunta a un profesional de salud, especialmente si hay embarazo, lactancia, niños, condiciones médicas, inmunosupresión o uso concomitante con tratamientos."
    }
  };

  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedChoice = button.dataset.choice;
      const message = choiceMessages[selectedChoice];

      choiceButtons.forEach((choiceButton) => {
        choiceButton.classList.toggle("active", choiceButton === button);
      });

      if (!choiceResult || !message) return;

      choiceResult.innerHTML = `
        <strong>${message.title}</strong>
        <span>${message.text}</span>
      `;
    });
  });

  /* USAGE TABS */

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedTab = button.dataset.tab;

      tabButtons.forEach((tabButton) => {
        const isActive = tabButton === button;
        tabButton.classList.toggle("active", isActive);
        tabButton.setAttribute("aria-selected", String(isActive));
      });

      tabPanels.forEach((panel) => {
        const isActive = panel.id === `tab-${selectedTab}`;
        panel.classList.toggle("active", isActive);
      });
    });
  });

  /* STORIES CAROUSEL */

  const storyCards = document.querySelectorAll(".story-card");
  const storyPrev = document.querySelector(".story-prev");
  const storyNext = document.querySelector(".story-next");
  let activeStoryIndex = 0;

  function showStory(index) {
    if (!storyCards.length) return;

    activeStoryIndex = (index + storyCards.length) % storyCards.length;

    storyCards.forEach((card, cardIndex) => {
      const isActive = cardIndex === activeStoryIndex;
      card.classList.toggle("active", isActive);
      card.setAttribute("aria-hidden", String(!isActive));
    });
  }

  if (storyPrev) {
    storyPrev.addEventListener("click", () => {
      showStory(activeStoryIndex - 1);
    });
  }

  if (storyNext) {
    storyNext.addEventListener("click", () => {
      showStory(activeStoryIndex + 1);
    });
  }

  showStory(activeStoryIndex);

  /* STRAIN EXPLORER */

  const strainButtons = document.querySelectorAll(".strain-node");
  const strainTitle = document.querySelector("#strain-title");
  const strainDescription = document.querySelector("#strain-description");

  const strainContent = {
    paracasei: {
      title: "Lacticaseibacillus paracasei IMC 502",
      description:
        "Bacteria láctica utilizada en combinaciones probióticas. En Vivomixx neo 9 forma parte del conjunto de cepas vivas que acompañan el cuidado de la microbiota intestinal."
    },
    rhamnosus501: {
      title: "Lacticaseibacillus rhamnosus IMC 501",
      description:
        "Especie de bacteria láctica frecuente en el mundo de los probióticos. En una fórmula multicepa, contribuye al conjunto de microorganismos vivos presentes en Vivomixx neo 9."
    },
    rhamnosussp1: {
      title: "Lacticaseibacillus rhamnosus SP1",
      description:
        "Otra cepa de Lacticaseibacillus rhamnosus incluida en Vivomixx neo 9. Su presencia refuerza el enfoque multicepa de la fórmula."
    },
    breve: {
      title: "Bifidobacterium breve Bbr8",
      description:
        "Pertenece al grupo de las bifidobacterias, microorganismos habituales del ecosistema intestinal. Forma parte de la combinación de cepas vivas de Vivomixx neo 9."
    },
    lactis: {
      title: "Bifidobacterium animalis subsp. lactis BLC1",
      description:
        "Bifidobacteria utilizada en complementos con fermentos probióticos. En Vivomixx neo 9 se integra dentro de una combinación de bacterias vivas de alta concentración."
    },
    acidophilus: {
      title: "Lactobacillus acidophilus LA1",
      description:
        "Lactobacilo ampliamente conocido en productos probióticos y fermentados. En Vivomixx neo 9 forma parte del conjunto de bacterias vivas de la fórmula."
    },
    plantarum: {
      title: "Lactiplantibacillus plantarum 14D",
      description:
        "Bacteria láctica presente en distintos alimentos fermentados y fórmulas probióticas. Se incluye en Vivomixx neo 9 como parte de su combinación multicepa."
    },
    "lactis-sp38": {
      title: "Lactococcus lactis SP38",
      description:
        "Bacteria láctica asociada tradicionalmente a procesos de fermentación. En Vivomixx neo 9 contribuye al perfil de cepas vivas de la fórmula."
    },
    thermo: {
      title: "Streptococcus thermophilus SP4",
      description:
        "Bacteria láctica ampliamente utilizada en fermentaciones alimentarias. En Vivomixx neo 9 forma parte de la combinación de 9 cepas vivas."
    }
  };

  function updateStrain(strainKey) {
    const content = strainContent[strainKey];

    if (!content || !strainTitle || !strainDescription) return;

    strainTitle.textContent = content.title;
    strainDescription.textContent = content.description;

    strainButtons.forEach((button) => {
      const isActive = button.dataset.strain === strainKey;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  strainButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.classList.contains("active")));

    button.addEventListener("click", () => {
      updateStrain(button.dataset.strain);
    });
  });

  updateStrain("paracasei");

  /* MICROBIOTA INTERACTIVE */

  const microButtons = document.querySelectorAll(".micro-chip");
  const microTitle = document.querySelector("#micro-title");
  const microDescription = document.querySelector("#micro-description");

  const microContent = {
    alimentacion: {
      title: "Alimentación",
      description:
        "Una alimentación variada aporta sustratos y nutrientes que influyen en la composición de la microbiota intestinal. La dieta es una de las formas más importantes de cuidar este ecosistema."
    },
    rutina: {
      title: "Rutina",
      description:
        "Los hábitos diarios, los horarios, el descanso y la regularidad pueden influir en el bienestar digestivo. Cuidar la microbiota suele ser parte de una rutina constante, no de una acción aislada."
    },
    estres: {
      title: "Estrés",
      description:
        "El estrés puede relacionarse con cambios en la percepción digestiva y en los hábitos de alimentación, sueño y rutina. Por eso el bienestar intestinal también se conecta con el estilo de vida."
    },
    edad: {
      title: "Edad",
      description:
        "La microbiota puede cambiar a lo largo de la vida. Por eso muchas personas buscan apoyar su equilibrio intestinal en distintas etapas y momentos de cambio."
    },
    tratamientos: {
      title: "Tratamientos",
      description:
        "Algunos tratamientos pueden influir en la microbiota. Si estás tomando medicamentos o tienes una condición médica, consulta con un profesional de salud antes de usar complementos alimenticios."
    },
    probioticos: {
      title: "Probióticos",
      description:
        "Los probióticos aportan microorganismos vivos. Vivomixx neo 9 combina 9 cepas vivas en presentaciones de alta concentración para acompañar el cuidado responsable de la microbiota."
    }
  };

  function updateMicrobiota(microKey) {
    const content = microContent[microKey];

    if (!content || !microTitle || !microDescription) return;

    microTitle.textContent = content.title;
    microDescription.textContent = content.description;

    microButtons.forEach((button) => {
      const isActive = button.dataset.micro === microKey;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  microButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.classList.contains("active")));

    button.addEventListener("click", () => {
      updateMicrobiota(button.dataset.micro);
    });
  });

  updateMicrobiota("alimentacion");
});
