(() => {
  const dropdowns = document.querySelectorAll("[data-dropdown]");

  dropdowns.forEach((dropdown) => {
    const input = dropdown.querySelector('input[name="service"]');
    const items = dropdown.querySelectorAll(".dropdown-list li");

    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        input.value = item.dataset.value;
        dropdown.classList.remove("active");
      });
    });

    dropdown.addEventListener("click", (e) => {
      if (e.target.closest(".dropdown-list li")) return;
      dropdown.classList.toggle("active");
    });
  });

  document.addEventListener("click", (e) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dropdowns.forEach((dropdown) => dropdown.classList.remove("active"));
    }
  });
})();
