document.addEventListener("DOMContentLoaded", () => {
  const BREAKPOINT = 1080;
  const HIDE_DELAY = 500;

  const items = Array.from(
    document.querySelectorAll(".header__list-item.has-drop"),
  );

  let openedItem = null;
  let hideTimer = null;

  const isMobile = () =>
    window.matchMedia(`(max-width: ${BREAKPOINT}px)`).matches;

  const getTrigger = (li) => li.querySelector(".js-menu-trigger");
  const getMenu = (li) => li.querySelector(".menu");

  const stopHide = () => {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
  };

  const closeItem = (li) => {
    if (!li) return;

    const menu = getMenu(li);
    const trigger = getTrigger(li);

    if (menu) {
      menu.classList.remove("active");
      menu.setAttribute("aria-hidden", "true");
    }
    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
    }

    if (openedItem === li) openedItem = null;
  };

  const openItem = (li) => {
    if (!li) return;

    if (openedItem && openedItem !== li) {
      closeItem(openedItem);
    }

    const menu = getMenu(li);
    const trigger = getTrigger(li);

    if (menu) {
      menu.classList.add("active");
      menu.setAttribute("aria-hidden", "false");
    }
    if (trigger) {
      trigger.setAttribute("aria-expanded", "true");
    }

    openedItem = li;
  };

  const toggleItem = (li) => {
    const menu = getMenu(li);
    const isOpen = menu && menu.classList.contains("active");
    if (isOpen) closeItem(li);
    else openItem(li);
  };

  const scheduleClose = (li) => {
    stopHide();
    hideTimer = setTimeout(() => {
      // на десктопе: не закрываем, если курсор всё ещё внутри li (включая подменю)
      if (!isMobile() && li.matches(":hover")) return;
      closeItem(li);
    }, HIDE_DELAY);
  };

  // биндим поведение для каждого dropdown пункта
  items.forEach((li) => {
    const trigger = getTrigger(li);
    if (!trigger) return;

    // DESKTOP: hover
    li.addEventListener("mouseenter", () => {
      if (isMobile()) return;
      stopHide();
      openItem(li);
    });

    li.addEventListener("mouseleave", () => {
      if (isMobile()) return;
      scheduleClose(li);
    });

    // MOBILE/TABLET: click
    trigger.addEventListener("click", (e) => {
      if (!isMobile()) return; // на десктопе клики не ломаем
      e.preventDefault();
      toggleItem(li);
    });
  });

  // MOBILE: клик вне открытого меню — закрыть
  document.addEventListener("click", (e) => {
    if (!isMobile()) return;
    if (!openedItem) return;

    if (!openedItem.contains(e.target)) {
      closeItem(openedItem);
    }
  });

  // ESC — закрыть (везде)
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (openedItem) closeItem(openedItem);
  });

  // при ресайзе чистим состояние, чтобы не залипало при переключении режимов
  window.addEventListener("resize", () => {
    stopHide();
    if (openedItem) closeItem(openedItem);
  });
});

document.querySelector(".btn-menu-open").addEventListener("click", function () {
  document.querySelector(".menu-navs").classList.add("active");
});

document
  .querySelector(".btn-close-menu")
  .addEventListener("click", function () {
    document.querySelector(".menu-navs").classList.remove("active");
  });

document.querySelectorAll(".header__list-item").forEach((item) => {
  item.addEventListener("click", function () {
    document.querySelector(".menu-navs").classList.remove("active");
  });
});
