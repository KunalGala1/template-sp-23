document.addEventListener("DOMContentLoaded", () => {
  const animationElements = document.querySelectorAll("[data-animation]");

  /* Add animation type to children if parent has a cascading animation */
  for (let i = 0; i < animationElements.length; i++) {
    if (animationElements[i].hasAttribute("data-cascade")) {
      for (let j = 0; j < animationElements[i].children.length; j++) {
        animationElements[i].children[j].setAttribute(
          "data-animation",
          animationElements[i].dataset.animation
        );
      }
      animationElements[i].removeAttribute("data-animation");
    }
  }

  const handleScroll = () => {
    let buffer = window.innerWidth < 450 ? -575 : 100;

    animationElements.forEach((el) => {
      const isOnScreen =
        el.getBoundingClientRect().top < window.innerHeight - buffer &&
        el.getBoundingClientRect().bottom > buffer;

      if (isOnScreen) {
        handleAnimation(el);
      }
    });
  };

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("touchmove", handleScroll);
  window.addEventListener("resize", handleScroll);

  handleScroll();
});

const handleAnimation = (el) => {
  if (el.hasAttribute("data-cascade")) {
    let delay = 250;
    for (let i = 0; i < el.children.length; i++) {
      setTimeout(() => {
        el.children[i].classList.add("animate--start");
      }, i * delay);
    }
    return;
  }

  el.classList.add("animate--start");
};
