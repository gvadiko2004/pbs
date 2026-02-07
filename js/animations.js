document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".service-seo");
  if (!section) return;

  const images = section.querySelectorAll(".images img");

  // Сохраняем стартовые transform значения
  const startTransforms = Array.from(images).map((img) => {
    const style = getComputedStyle(img).transform;
    return style === "none" ? { x: 0, y: 0 } : getTranslate(style);
  });

  function getTranslate(matrix) {
    const values = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");
    return {
      x: parseFloat(values[4]),
      y: parseFloat(values[5]),
    };
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function animate() {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Старт — когда секция заходит снизу
    const start = windowHeight * 0.75;
    // Конец — когда половина секции в экране
    const end = windowHeight * 0.25;

    const progress = clamp((start - rect.top) / (start - end), 0, 1);

    images.forEach((img, index) => {
      const { x, y } = startTransforms[index];

      const currentX = x * (1 - progress);
      const currentY = y * (1 - progress);

      img.style.transform = `translate(${currentX}px, ${currentY}px)`;
    });

    requestAnimationFrame(animate);
  }

  animate();
});

