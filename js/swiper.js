const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,

  // базово для мобилок
  slidesPerView: 1.1,
  spaceBetween: 12,
  centeredSlides: false,
  watchOverflow: true,

  // кликабельные точки
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // стрелки (если на мобилке скрываешь CSS-ом — ок)
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // если используешь скроллбар — оставь
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },

  // чтобы свайп был приятнее
  speed: 600,
  grabCursor: true,

  // адаптив
  breakpoints: {
    1280: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    890: {
      slidesPerView: 2,
      spaceBetween: 12,
    },
    440: {
      slidesPerView: 1.1,
      spaceBetween: 12,
    },
    0: {
      slidesPerView: 1.1,
      spaceBetween: 10,
    },
  },
});
