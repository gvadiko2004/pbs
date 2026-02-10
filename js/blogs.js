(() => {
  const PER_PAGE = 9;
  const FAKE_LOADING_MS = 250;

  // контейнер с айтемами
  const listEl = document.querySelector("#blogs");
  // контейнер пагинации (сюда рисуем ul/li/buttons)
  const paginationEl = document.querySelector("#blogsPagination");

  if (!listEl || !paginationEl) return;

  const items = Array.from(listEl.querySelectorAll(".blogs-list__item"));
  const totalPages = Math.ceil(items.length / PER_PAGE);

  // если <= 9 — показать всё и скрыть пагинацию
  if (totalPages <= 1) {
    paginationEl.style.display = "none";
    items.forEach((el) => (el.style.display = ""));
    return;
  }

  let currentPage = 1;
  let isLoading = false;

  const renderPagination = (activePage) => {
    paginationEl.innerHTML = `
      <ul class="list-reset pagination__list">
        ${Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          return `
            <li class="pagination__list-item ${page === activePage ? "active" : ""}">
              <button class="btn-reset pagination__list-link" type="button" data-page="${page}">
                ${page}
              </button>
            </li>
          `;
        }).join("")}
      </ul>
    `;
  };

  const setActive = (page) => {
    paginationEl
      .querySelectorAll(".pagination__list-item")
      .forEach((li) => li.classList.remove("active"));

    const btn = paginationEl.querySelector(`[data-page="${page}"]`);
    if (btn) btn.closest(".pagination__list-item").classList.add("active");
  };

  const showPage = (page) => {
    const start = (page - 1) * PER_PAGE;
    const end = start + PER_PAGE;

    items.forEach((el, idx) => {
      el.style.display = idx >= start && idx < end ? "" : "none";
    });
  };

  const goToPage = (page) => {
    if (isLoading) return;
    if (page < 1 || page > totalPages) return;
    if (page === currentPage) return;

    isLoading = true;
    listEl.classList.add("is-loading");

    window.setTimeout(() => {
      currentPage = page;

      showPage(currentPage);
      setActive(currentPage);

      listEl.classList.remove("is-loading");
      isLoading = false;

      // опционально: скролл к началу списка
      // listEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }, FAKE_LOADING_MS);
  };

  // делегирование клика по пагинации
  paginationEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-page]");
    if (!btn) return;
    goToPage(Number(btn.dataset.page));
  });

  // старт
  renderPagination(1);
  showPage(1);
})();
