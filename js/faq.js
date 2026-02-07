(() => {
  const items = document.querySelectorAll(".faq__list-item");

  const closeItem = (item) => {
    const btn = item.querySelector(".faq__list-btn");
    const panel = item.querySelector(".faq__list-subtitle");

    btn.classList.remove("active");
    panel.classList.remove("active");
    panel.style.maxHeight = "0px";
  };

  const openItem = (item) => {
    const btn = item.querySelector(".faq__list-btn");
    const panel = item.querySelector(".faq__list-subtitle");

    btn.classList.add("active");
    panel.classList.add("active");

    panel.style.maxHeight = "0px";
    panel.offsetHeight;
    panel.style.maxHeight = panel.scrollHeight + "px";
  };

  items.forEach((item) => {
    const btn = item.querySelector(".faq__list-btn");
    const panel = item.querySelector(".faq__list-subtitle");

    panel.style.maxHeight = "0px";

    item.addEventListener("click", () => {
      const isOpen = btn.classList.contains("active");

      items.forEach((it) => {
        if (it !== item) closeItem(it);
      });

      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });

  window.addEventListener("resize", () => {
    items.forEach((item) => {
      const btn = item.querySelector(".faq__list-btn");
      const panel = item.querySelector(".faq__list-subtitle");

      if (btn.classList.contains("active")) {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
})();
