(() => {
  const PER_PAGE = 9;
  const FAKE_LOADING_MS = 250; // время "загрузки" (можешь 150-400)

  const listEl = document.querySelector("#cases");
  const paginationEl = document.querySelector("#casesPagination");

  if (!listEl || !paginationEl) return;

  const items = Array.from(listEl.querySelectorAll(".case-items__item"));
  const totalPages = Math.ceil(items.length / PER_PAGE);

  // если <= 9 — просто показать всё и скрыть пагинацию
  if (totalPages <= 1) {
    paginationEl.style.display = "none";
    items.forEach((el) => (el.style.display = ""));
    return;
  }

  const setActive = (page) => {
    paginationEl
      .querySelectorAll(".pagination__list-item")
      .forEach((li) => li.classList.remove("active"));

    const activeBtn = paginationEl.querySelector(`[data-page="${page}"]`);
    if (activeBtn)
      activeBtn.closest(".pagination__list-item").classList.add("active");
  };

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

  const showPage = (page) => {
    const start = (page - 1) * PER_PAGE;
    const end = start + PER_PAGE;

    items.forEach((el, idx) => {
      el.style.display = idx >= start && idx < end ? "" : "none";
    });
  };

  let currentPage = 1;
  let isLoading = false;

  const goToPage = (page) => {
    if (isLoading) return;
    if (page < 1 || page > totalPages) return;
    if (page === currentPage) return;

    isLoading = true;
    listEl.classList.add("is-loading");

    // имитация загрузки (сервер не трогаем, просто UX)
    window.setTimeout(() => {
      currentPage = page;
      showPage(currentPage);
      setActive(currentPage);

      listEl.classList.remove("is-loading");
      isLoading = false;

      // (опционально) прокрутка к началу блока
      // listEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }, FAKE_LOADING_MS);
  };

  // делегирование клика
  paginationEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-page]");
    if (!btn) return;
    goToPage(Number(btn.dataset.page));
  });

  // старт
  renderPagination(1);
  showPage(1);
})();
