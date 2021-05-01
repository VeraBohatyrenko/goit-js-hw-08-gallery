import gallery from "./gallery-items.js";

const galleryContainer = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".js-lightbox");
const imgModalRef = document.querySelector(".lightbox__image");
const btnCloseModalRef = document.querySelector(".lightbox__button");
const overlayBoxRef = document.querySelector(".lightbox__overlay");

/** Переменная индекса картинки */
let activeIndex = 0;

/** Создание списка галереи */
const task = gallery
  .map(({ preview, original, description }) => {
    return ` 
    <li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
  })
  .join(""); /** join - связывает массив строк в одну строку */

/** Добавляем в html гроздь li */
galleryContainer.insertAdjacentHTML("beforeend", task);

function openModalfn(e) {
  e.preventDefault();
  if (e.target.nodeName === "IMG") {
    modalRef.classList.add("is-open");
    imgModalRef.src = e.target.dataset.source;
  }
}
/** Добавляет слушатель события на ul (только на IMG) для открытия модалки */
galleryContainer.addEventListener("click", openModalfn);
/** ф-ия закрытия модального окна, снятие класса is-open и очистку src */
function closeModalfn() {
  modalRef.classList.remove("is-open");
  imgModalRef.removeAttribute("src");
}
/** Добавляет слушатель события на закрытие модалки через кнопку */
btnCloseModalRef.addEventListener("click", closeModalfn);
/** Добавляет слушатель события на закрытие модалки через оверлей */
overlayBoxRef.addEventListener("click", closeModalfn);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModalfn();
  }
});

/** Ф-ия "Карусели" перелистывает картинки клавишами право/лево */
function onPressArrow(e) {
  if (e.key === "ArrowLeft" && activeIndex > 0) {
    activeIndex -= 1;
    imgModalRef.src = gallery[activeIndex].original;
  }
  if (e.key === "ArrowRight" && activeIndex < gallery.length - 1) {
    activeIndex += 1;
    imgModalRef.src = gallery[activeIndex].original;
  }
}

window.addEventListener("keydown", onPressArrow);
