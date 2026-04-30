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

  const ambientOne = document.querySelector(".ambient-gradient-one");
  const ambientTwo = document.querySelector(".ambient-gradient-two");
  const ambientThree = document.querySelector(".ambient-gradient-three");

  const bioLayerBack = document.querySelector(".bio-layer-back");
  const bioLayerMid = document.querySelector(".bio-layer-mid");
  const bioLayerFront = document.querySelector(".bio-layer-front");
  const bioShapes = document.querySelectorAll(".bio-shape");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const themeMap = {
    hero: {
      base: "#3d2843",
      a: "rgba(183, 139, 180, 0.34)",
      b: "rgba(0, 168, 200, 0.20)",
      c: "rgba(247, 201, 72, 0.14)",
    },
    facts: {
      base: "#ffffff",
      a: "rgba(183, 139, 180, 0.16)",
      b: "rgba(0, 168, 200, 0.12)",
      c: "rgba(111, 190, 68, 0.10)",
    },
    soft: {
      base: "#fbf6fa",
      a: "rgba(183, 139, 180, 0.16)",
      b: "rgba(111, 190, 68, 0.12)",
      c: "rgba(0, 168, 200, 0.10)",
    },
    difference: {
      base: "#f8fdff",
      a: "rgba(183, 139, 180, 0.18)",
      b: "rgba(0, 168, 200, 0.14)",
      c: "rgba(111, 190, 68, 0.10)",
    },
    cold: {
      base: "#3d2843",
      a: "rgba(183, 139, 180, 0.28)",
      b: "rgba(0, 168, 200, 0.22)",
      c: "rgba(111, 190, 68, 0.10)",
    },
    products: {
      base: "#ffffff",
      a: "rgba(183, 139, 180, 0.16)",
      b: "rgba(0, 168, 200, 0.12)",
      c: "rgba(111, 190, 68, 0.10)",
    },
    selector: {
      base: "#fbf6fa",
      a: "rgba(183, 139, 180, 0.18)",
      b: "rgba(247, 201, 72, 0.12)",
      c: "rgba(0, 168, 200, 0.10)",
    },
    strains: {
      base: "#fbf6fa",
      a: "rgba(183, 139, 180, 0.20)",
      b: "rgba(111, 190, 68, 0.14)",
      c: "rgba(0, 168, 200, 0.10)",
    },
    microbiota: {
      base: "#f8fdff",
      a: "rgba(111, 190, 68, 0.18)",
      b: "rgba(183, 139, 180, 0.16)",
      c: "rgba(0, 168, 200, 0.10)",
    },
    usage: {
      base: "#fbf6fa",
      a: "rgba(183, 139, 180, 0.14)",
      b: "rgba(0, 168, 200, 0.10)",
      c: "rgba(111, 190, 68, 0.10)",
    },
    stories: {
      base: "#ffffff",
      a: "rgba(183, 139, 180, 0.16)",
      b: "rgba(247, 201, 72, 0.12)",
      c: "rgba(0, 168, 200, 0.10)",
    },
    audience: {
      base: "#fbf6fa",
      a: "rgba(183, 139, 180, 0.14)",
      b: "rgba(111, 190, 68, 0.12)",
      c: "rgba(0, 168, 200, 0.10)",
    },
    professionals: {
      base: "#3d2843",
      a: "rgba(183, 139, 180, 0.22)",
      b: "rgba(0, 168, 200, 0.14)",
      c: "rgba(247, 201, 72, 0.12)",
    },
    contact: {
      base: "#ffffff",
      a: "rgba(183, 139, 180, 0.16)",
      b: "rgba(111, 190, 68, 0.12)",
      c: "rgba(0, 168, 200, 0.10)",
    },
    faq: {
      base: "#fbf6fa",
      a: "rgba(183, 139, 180, 0.14)",
      b: "rgba(111, 190, 68, 0.10)",
      c: "rgba(0, 168, 200, 0.08)",
    },
  };

  let currentTheme = "";
  let ticking = false;

  function getCurrentTheme() {
    if (!themedSections.length) return "products";

    let selectedTheme = themedSections[0].dataset.theme || "products";
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

    const theme = themeMap[themeName] || themeMap.products;
    currentTheme = themeName;

    root.style.setProperty("--ambient-base", theme.base);
    root.style.setProperty("--ambient-a", theme.a);
    root.style.setProperty("--ambient-b", theme.b);
    root.style.setProperty("--ambient-c", theme.c);
  }

  function updateHeader() {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 20);
  }

  function updateProgressBar() {
    if (!progressBar) return;

    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }

  function setActiveNavLink() {
    if (!sections.length || !navLinks.length) return;

    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 180;

      if (window.scrollY >= sectionTop) {
        currentSectionId = section.getAttribute("id") || "";
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${currentSectionId}`);
    });
  }

  function updateAmbientMotion() {
    if (prefersReducedMotion) return;

    const scrollY = window.scrollY;
    const viewportH = window.innerHeight || 1;
    const normalized = scrollY / viewportH;

    if (ambientOne) {
      ambientOne.style.transform = `
        translate3d(${Math.sin(normalized * 1.2) * 34}px, ${scrollY * -0.035}px, 0)
        scale(${1 + Math.sin(normalized) * 0.035})
      `;
    }

    if (ambientTwo) {
      ambientTwo.style.transform = `
        translate3d(${Math.cos(normalized * 1.1) * -42}px, ${scrollY * 0.028}px, 0)
        scale(${1 + Math.cos(normalized) * 0.04})
      `;
    }

    if (ambientThree) {
      ambientThree.style.transform = `
        translate3d(${Math.sin(normalized * 0.8) * 28}px, ${scrollY * 0.045}px, 0)
        scale(${1 + Math.sin(normalized * 1.4) * 0.03})
      `;
    }

    if (bioLayerBack) {
      bioLayerBack.style.transform = `translate3d(0, ${scrollY * 0.025}px, 0)`;
    }

    if (bioLayerMid) {
      bioLayerMid.style.transform = `translate3d(0, ${scrollY * 0.055}px, 0)`;
    }

    if (bioLayerFront) {
      bioLayerFront.style.transform = `translate3d(0, ${scrollY * 0.09}px, 0)`;
    }

    bioShapes.forEach((shape, index) => {
      const drift = Math.sin(scrollY * 0.004 + index) * (6 + (index % 3) * 3);
      const rotate = scrollY * (0.008 + index * 0.0008);

      shape.style.setProperty("--shape-drift-x", `${drift}px`);
      shape.style.setProperty("--shape-rotate", `${rotate}deg`);
    });
  }

  function handleScrollEffects() {
    updateHeader();
    updateProgressBar();
    setActiveNavLink();
    applyTheme(getCurrentTheme());
    updateAmbientMotion();
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
        rootMargin: "0px 0px -40px 0px",
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

  const choiceButtons = document.querySelectorAll(".choice-btn");
  const choiceResult = document.querySelector(".choice-result");

  const choiceMessages = {
    sobres: {
      title: "Podrías revisar Vivomixx neo® 9 – 460 sobres.",
      text:
        "Es la presentación de mayor concentración por toma: 460 mil millones de bacterias vivas por sobre. La dosis diaria recomendada es de 1 sobre. Se disuelve en agua, yogur u otra bebida o alimento frío sin gas.",
    },
    capsulas: {
      title: "Podrías revisar Vivomixx neo® 9 – 115 cápsulas.",
      text:
        "Es una opción práctica para la rutina diaria: 115 mil millones de bacterias vivas por cápsula. La dosis diaria recomendada es de 1 a 4 cápsulas con un vaso de agua.",
    },
    duda: {
      title: "Puedes elegir según tu rutina y orientación profesional.",
      text:
        "Si no estás seguro, consulta disponibilidad de ambas presentaciones y pregunta a un profesional de salud, especialmente en embarazo, lactancia, niños, condiciones médicas, inmunosupresión o si estás siguiendo algún tratamiento.",
    },
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

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  function activateTab(selectedTab, selectedButton) {
    tabButtons.forEach((tabButton) => {
      const isActive = tabButton === selectedButton;
      tabButton.classList.toggle("active", isActive);
      tabButton.setAttribute("aria-selected", String(isActive));
      tabButton.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.id === `tab-${selectedTab}`;
      panel.classList.toggle("active", isActive);
      panel.toggleAttribute("hidden", !isActive);
    });
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activateTab(button.dataset.tab, button);
    });

    button.addEventListener("keydown", (event) => {
      const buttons = Array.from(tabButtons);
      const currentIndex = buttons.indexOf(button);

      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

      event.preventDefault();

      const nextIndex =
        event.key === "ArrowRight"
          ? (currentIndex + 1) % buttons.length
          : (currentIndex - 1 + buttons.length) % buttons.length;

      const nextButton = buttons[nextIndex];
      nextButton.focus();
      activateTab(nextButton.dataset.tab, nextButton);
    });
  });

  tabPanels.forEach((panel) => {
    panel.toggleAttribute("hidden", !panel.classList.contains("active"));
  });

  const strainButtons = document.querySelectorAll(".strain-node");
  const strainTitle = document.querySelector("#strain-title");
  const strainDescription = document.querySelector("#strain-description");

  const strainContent = {
    paracasei: {
      title: "Lacticaseibacillus paracasei IMC 502",
      description:
        "Bacteria láctica utilizada en combinaciones probióticas. En Vivomixx neo® 9 forma parte del conjunto de cepas vivas que acompañan el cuidado de la microbiota intestinal.",
    },
    rhamnosus501: {
      title: "Lacticaseibacillus rhamnosus IMC 501",
      description:
        "Especie de bacteria láctica frecuente en el mundo de los probióticos. En una fórmula multicepa, contribuye al conjunto de microorganismos vivos presentes en Vivomixx neo® 9.",
    },
    rhamnosussp1: {
      title: "Lacticaseibacillus rhamnosus SP1",
      description:
        "Otra cepa de Lacticaseibacillus rhamnosus incluida en Vivomixx neo® 9. Su presencia refuerza el enfoque multicepa de la fórmula.",
    },
    breve: {
      title: "Bifidobacterium breve Bbr8",
      description:
        "Pertenece al grupo de las bifidobacterias, microorganismos habituales del ecosistema intestinal. Forma parte de la combinación de cepas vivas de Vivomixx neo® 9.",
    },
    lactis: {
      title: "Bifidobacterium animalis subsp. lactis BLC1",
      description:
        "Bifidobacteria utilizada en complementos con fermentos probióticos. En Vivomixx neo® 9 se integra dentro de una combinación de bacterias vivas de alta concentración.",
    },
    acidophilus: {
      title: "Lactobacillus acidophilus LA1",
      description:
        "Lactobacilo ampliamente conocido en productos probióticos y fermentados. En Vivomixx neo® 9 forma parte del conjunto de bacterias vivas de la fórmula.",
    },
    plantarum: {
      title: "Lactiplantibacillus plantarum 14D",
      description:
        "Bacteria láctica presente en distintos alimentos fermentados y fórmulas probióticas. Se incluye en Vivomixx neo® 9 como parte de su combinación multicepa.",
    },
    "lactis-sp38": {
      title: "Lactococcus lactis SP38",
      description:
        "Bacteria láctica asociada tradicionalmente a procesos de fermentación. En Vivomixx neo® 9 contribuye al perfil de cepas vivas de la fórmula.",
    },
    thermo: {
      title: "Streptococcus thermophilus SP4",
      description:
        "Bacteria láctica ampliamente utilizada en fermentaciones alimentarias. En Vivomixx neo® 9 forma parte de la combinación de 9 cepas vivas.",
    },
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

  if (strainButtons.length) {
    updateStrain("paracasei");
  }

  const microButtons = document.querySelectorAll(".micro-chip");
  const microTitle = document.querySelector("#micro-title");
  const microDescription = document.querySelector("#micro-description");

  const microContent = {
    alimentacion: {
      title: "Alimentación",
      description:
        "Una alimentación variada aporta sustratos y nutrientes que influyen en la composición de la microbiota intestinal. La dieta es una de las formas más importantes de cuidar este ecosistema.",
    },
    rutina: {
      title: "Rutina",
      description:
        "Los hábitos diarios, los horarios, el descanso y la regularidad pueden influir en el bienestar digestivo. Cuidar la microbiota suele ser parte de una rutina constante, no de una acción aislada.",
    },
    estres: {
      title: "Estrés",
      description:
        "El estrés puede relacionarse con cambios en la percepción digestiva y en los hábitos de alimentación, sueño y rutina. Por eso el bienestar intestinal también se conecta con el estilo de vida.",
    },
    edad: {
      title: "Edad",
      description:
        "La microbiota puede cambiar a lo largo de la vida. Por eso muchas personas buscan apoyar su equilibrio intestinal en distintas etapas y momentos de cambio.",
    },
    tratamientos: {
      title: "Tratamientos",
      description:
        "Algunos tratamientos pueden influir en la microbiota. Si estás tomando medicamentos o tienes una condición médica, consulta con un profesional de salud antes de usar complementos alimenticios.",
    },
    probioticos: {
      title: "Probióticos",
      description:
        "Los probióticos aportan microorganismos vivos. Vivomixx neo® 9 combina 9 cepas vivas en presentaciones de alta concentración para acompañar el cuidado responsable de la microbiota.",
    },
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

  if (microButtons.length) {
    updateMicrobiota("alimentacion");
  }
});
