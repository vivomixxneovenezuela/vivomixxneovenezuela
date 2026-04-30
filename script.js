document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const root = document.documentElement;

  const header = document.querySelector(".site-header");
  const progressBar = document.querySelector(".scroll-progress span");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const revealElements = document.querySelectorAll(".reveal");
  const sections = document.querySelectorAll("main section[id]");
  const themedSections = document.querySelectorAll("[data-theme]");
  const details = document.querySelectorAll("details");

  const bgOrbOne = document.querySelector(".brand-bg-orb-1");
  const bgOrbTwo = document.querySelector(".brand-bg-orb-2");
  const bgSpiresOne = document.querySelector(".brand-bg-spires-1");
  const bgSpiresTwo = document.querySelector(".brand-bg-spires-2");
  const heroSpiresMain = document.querySelector(".hero-spires-main");
  const heroSpiresSoft = document.querySelector(".hero-spires-soft");
  const heroProductSpires = document.querySelector(".hero-product-spires");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* SECTION THEME */

  const themeMap = {
    hero: {
      base: "#fbf7fd",
      a: "rgba(165, 134, 189, 0.28)",
      b: "rgba(104, 198, 224, 0.18)",
      c: "rgba(143, 191, 33, 0.12)"
    },
    availability: {
      base: "#fbf7fd",
      a: "rgba(165, 134, 189, 0.20)",
      b: "rgba(243, 231, 94, 0.16)",
      c: "rgba(104, 198, 224, 0.12)"
    },
    facts: {
      base: "#ffffff",
      a: "rgba(165, 134, 189, 0.14)",
      b: "rgba(104, 198, 224, 0.10)",
      c: "rgba(143, 191, 33, 0.10)"
    },
    soft: {
      base: "#fbf7fd",
      a: "rgba(165, 134, 189, 0.18)",
      b: "rgba(104, 198, 224, 0.10)",
      c: "rgba(143, 191, 33, 0.10)"
    },
    difference: {
      base: "#ffffff",
      a: "rgba(165, 134, 189, 0.16)",
      b: "rgba(104, 198, 224, 0.12)",
      c: "rgba(143, 191, 33, 0.08)"
    },
    cold: {
      base: "#f4edf8",
      a: "rgba(165, 134, 189, 0.22)",
      b: "rgba(104, 198, 224, 0.15)",
      c: "rgba(143, 191, 33, 0.10)"
    },
    products: {
      base: "#ffffff",
      a: "rgba(104, 198, 224, 0.13)",
      b: "rgba(143, 191, 33, 0.11)",
      c: "rgba(165, 134, 189, 0.12)"
    },
    selector: {
      base: "#fbf7fd",
      a: "rgba(165, 134, 189, 0.18)",
      b: "rgba(104, 198, 224, 0.10)",
      c: "rgba(243, 231, 94, 0.10)"
    },
    strains: {
      base: "#ffffff",
      a: "rgba(165, 134, 189, 0.18)",
      b: "rgba(104, 198, 224, 0.12)",
      c: "rgba(143, 191, 33, 0.10)"
    },
    microbiota: {
      base: "#fbf7fd",
      a: "rgba(165, 134, 189, 0.18)",
      b: "rgba(143, 191, 33, 0.12)",
      c: "rgba(104, 198, 224, 0.10)"
    },
    usage: {
      base: "#ffffff",
      a: "rgba(165, 134, 189, 0.14)",
      b: "rgba(104, 198, 224, 0.10)",
      c: "rgba(143, 191, 33, 0.08)"
    },
    stories: {
      base: "#fbf7fd",
      a: "rgba(165, 134, 189, 0.20)",
      b: "rgba(243, 231, 94, 0.12)",
      c: "rgba(104, 198, 224, 0.10)"
    },
    audience: {
      base: "#ffffff",
      a: "rgba(165, 134, 189, 0.14)",
      b: "rgba(104, 198, 224, 0.09)",
      c: "rgba(143, 191, 33, 0.09)"
    },
    professionals: {
      base: "#f4edf8",
      a: "rgba(165, 134, 189, 0.20)",
      b: "rgba(104, 198, 224, 0.12)",
      c: "rgba(243, 231, 94, 0.10)"
    },
    faq: {
      base: "#fbf7fd",
      a: "rgba(165, 134, 189, 0.15)",
      b: "rgba(104, 198, 224, 0.08)",
      c: "rgba(143, 191, 33, 0.08)"
    },
    contact: {
      base: "#ffffff",
      a: "rgba(165, 134, 189, 0.16)",
      b: "rgba(104, 198, 224, 0.10)",
      c: "rgba(143, 191, 33, 0.10)"
    }
  };

  let currentTheme = "";

  function getCurrentTheme() {
    if (!themedSections.length) return "soft";

    let selectedTheme = themedSections[0].dataset.theme || "soft";
    const viewportReference = window.scrollY + window.innerHeight * 0.42;

    themedSections.forEach((section) => {
      if (viewportReference >= section.offsetTop) {
        selectedTheme = section.dataset.theme || selectedTheme;
      }
    });

    return selectedTheme;
  }

  function applyTheme(themeName) {
    if (themeName === currentTheme) return;

    const theme = themeMap[themeName] || themeMap.soft;
    currentTheme = themeName;

    root.style.setProperty("--ambient-base", theme.base);
    root.style.setProperty("--ambient-a", theme.a);
    root.style.setProperty("--ambient-b", theme.b);
    root.style.setProperty("--ambient-c", theme.c);
  }

  /* HEADER + PROGRESS + ACTIVE NAV */

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 20) {
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
      const sectionTop = section.offsetTop - 180;

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

  /* BRAND SPIRES MOTION */

  function updateBrandMotion() {
    if (prefersReducedMotion) return;

    const scrollY = window.scrollY;
    const viewportH = window.innerHeight || 1;
    const normalized = scrollY / viewportH;

    if (bgOrbOne) {
      bgOrbOne.style.transform = `
        translate3d(${Math.sin(normalized * 1.1) * 28}px, ${scrollY * -0.025}px, 0)
        scale(${1 + Math.sin(normalized) * 0.03})
      `;
    }

    if (bgOrbTwo) {
      bgOrbTwo.style.transform = `
        translate3d(${Math.cos(normalized * 1.05) * -34}px, ${scrollY * 0.022}px, 0)
        scale(${1 + Math.cos(normalized) * 0.035})
      `;
    }

    if (bgSpiresOne) {
      bgSpiresOne.style.transform = `
        translate3d(${Math.sin(normalized) * 18}px, ${scrollY * 0.035}px, 0)
        rotate(${-18 + scrollY * 0.006}deg)
      `;
    }

    if (bgSpiresTwo) {
      bgSpiresTwo.style.transform = `
        translate3d(${Math.cos(normalized) * -18}px, ${scrollY * -0.025}px, 0)
        rotate(${20 - scrollY * 0.005}deg)
      `;
    }

    if (heroSpiresMain) {
      heroSpiresMain.style.transform = `
        translate3d(0, ${scrollY * 0.018}px, 0)
        rotate(${18 + scrollY * 0.004}deg)
      `;
    }

    if (heroSpiresSoft) {
      heroSpiresSoft.style.transform = `
        translate3d(0, ${scrollY * -0.014}px, 0)
        rotate(${-22 - scrollY * 0.004}deg)
      `;
    }

    if (heroProductSpires) {
      heroProductSpires.style.transform = `
        translate3d(0, ${Math.sin(normalized * 1.4) * 10}px, 0)
        rotate(${-12 + Math.sin(normalized) * 2}deg)
      `;
    }
  }

  let ticking = false;

  function handleScrollEffects() {
    updateHeader();
    updateProgressBar();
    setActiveNavLink();
    applyTheme(getCurrentTheme());
    updateBrandMotion();
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
        "Es la presentación de mayor concentración por toma: 460 mil millones de bacterias vivas por sobre. La dosis diaria recomendada es de 1 sobre. Puede ser útil si priorizas concentración y no te importa mezclarlo con agua, yogur u otra bebida o alimento frío sin gas."
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
