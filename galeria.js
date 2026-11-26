const gallery = document.querySelector(".gallery");
const slides = [...gallery.querySelectorAll(".slide")];
const controls = gallery.querySelector(".gallery-controls");
const buttons = [...controls.querySelectorAll("button")];
const announcement = gallery.querySelector("[aria-live]");
let position = 0;

function showSlide(index) {
  position = (index + slides.length) % slides.length;
  slides.forEach((slide, number) => {
    slide.hidden = number !== position;
    buttons[number].setAttribute("aria-pressed", String(number === position));
  });
  announcement.textContent = slides[position].querySelector("figcaption").textContent;
}

controls.hidden = false;
buttons.forEach((button) => button.addEventListener("click", () => showSlide(Number(button.dataset.slide))));
controls.addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
  event.preventDefault();
  showSlide(position + (event.key === "ArrowRight" ? 1 : -1));
  buttons[position].focus();
});

document.querySelector("#consulta").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#estado").textContent = "La consulta está completa. En esta maqueta no se envía.";
});

let touchStart;
gallery.addEventListener("touchstart", (event) => {
  if (event.touches.length === 1) touchStart = event.touches[0];
}, { passive: true });
gallery.addEventListener("touchend", (event) => {
  if (!touchStart) return;
  const finger = event.changedTouches[0];
  const horizontal = finger.clientX - touchStart.clientX;
  const vertical = finger.clientY - touchStart.clientY;
  touchStart = undefined;
  if (Math.abs(horizontal) > 55 && Math.abs(horizontal) > Math.abs(vertical)) {
    showSlide(position + (horizontal < 0 ? 1 : -1));
  }
}, { passive: true });
gallery.addEventListener("touchcancel", () => { touchStart = undefined; });

const aboutMenu = document.querySelector(".about-menu");
aboutMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => { aboutMenu.open = false; });
});
aboutMenu.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && aboutMenu.open) {
    aboutMenu.open = false;
    aboutMenu.querySelector("summary").focus();
  }
});
