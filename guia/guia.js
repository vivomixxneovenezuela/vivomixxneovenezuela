(() => {
  const searchInput = document.querySelector("#guide-search-input");
  const clearButton = document.querySelector(".guide-search-clear");
  const searchOpenButtons = document.querySelectorAll(".guide-search-open");
  const filterButtons = document.querySelectorAll(".guide-filter");
  const cards = Array.from(document.querySelectorAll("[data-content-card]"));
  const loadMoreButton = document.querySelector("#guide-load-more");
  const emptyState = document.querySelector("#guide-empty");
  const resetButton = document.querySelector("#guide-reset");
  const resultsCount = document.querySelector("#guide-results-count");
  const menuToggle = document.querySelector(".guide-menu-toggle");
  const menu = document.querySelector("#guide-menu");
  const initialLimit = 9;

  if (!searchInput || !cards.length) return;

  let activeFilter = "all";
  let expanded = false;

  const normalize = (value) =>
    value
      .toLocaleLowerCase("es")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const applyFilters = () => {
    const query = normalize(searchInput.value);
    const matches = cards.filter((card) => {
      const categories = card.dataset.category.split(" ");
      const searchable = normalize(`${card.dataset.search} ${card.textContent}`);
      const categoryMatch = activeFilter === "all" || categories.includes(activeFilter);
      const searchMatch = !query || searchable.includes(query);
      return categoryMatch && searchMatch;
    });

    const limit = expanded || query || activeFilter !== "all" ? matches.length : initialLimit;

    cards.forEach((card) => {
      const matchIndex = matches.indexOf(card);
      card.hidden = matchIndex === -1 || matchIndex >= limit;
    });

    const visibleCount = Math.min(matches.length, limit);
    resultsCount.textContent = `${visibleCount} ${visibleCount === 1 ? "contenido" : "contenidos"}`;
    emptyState.hidden = matches.length !== 0;
    loadMoreButton.hidden = matches.length <= initialLimit || expanded || Boolean(query) || activeFilter !== "all";
    clearButton.hidden = !searchInput.value;
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      expanded = activeFilter !== "all";
      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      applyFilters();
    });
  });

  searchInput.addEventListener("input", applyFilters);

  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    applyFilters();
  });

  loadMoreButton.addEventListener("click", () => {
    expanded = true;
    applyFilters();
    const firstNewCard = cards[initialLimit];
    if (firstNewCard) firstNewCard.querySelector("a").focus();
  });

  const resetFilters = () => {
    activeFilter = "all";
    expanded = false;
    searchInput.value = "";
    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === "all";
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    applyFilters();
    searchInput.focus();
  };

  resetButton.addEventListener("click", resetFilters);

  searchOpenButtons.forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector("#articulos").scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => searchInput.focus(), 350);
      if (menu) menu.classList.remove("is-open");
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase("es") === "k") {
      event.preventDefault();
      document.querySelector("#articulos").scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => searchInput.focus(), 350);
    }
  });

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  applyFilters();
})();
