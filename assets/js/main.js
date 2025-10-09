document.addEventListener("DOMContentLoaded", function () {
  // phone inputmask
  //   const phoneInput = document.querySelector("input[name=phone]");
  //   Inputmask({
  //     mask: "+7 (999) 999-99-99",
  //     clearIncomplete: true,
  //     showMaskOnHover: false,
  //     showMaskOnFocus: true,
  //     placeholder: "_",
  //   }).mask(phoneInput);
  //
  document.querySelector(".header_burger").onclick = function () {
    this.classList.toggle("active");
    document.querySelector(".header_mobile").classList.toggle("active");
  };

  const faqItems = document.querySelectorAll(".faq_item");

  faqItems.forEach((item) => {
    const header = item.querySelector(".faq_header");
    const content = item.querySelector(".faq_content");

    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Boshqalarni yopish (agar kerak bo‘lsa)
      faqItems.forEach((i) => {
        i.classList.remove("active");
        const c = i.querySelector(".faq_content");
        c.style.height = 0;
        c.style.opacity = 0;
      });

      // Agar avval yopiq bo‘lsa — ochamiz
      if (!isOpen) {
        item.classList.add("active");
        content.style.height = content.scrollHeight + "px";
        content.style.opacity = 1;
      }
    });
  });
});

window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

document.querySelectorAll(".business_items").forEach((list, index) => {
  // Elementlarni ikki baravar ko‘paytiramiz
  const clone = list.cloneNode(true);
  list.append(...clone.childNodes);

  // 1 va 3 qatorlar o‘ngga, 2 va 4 chapga
  const isRight = index % 2 === 0;

  let position = isRight ? -list.scrollWidth / 4 : 0;
  // o‘ngga ketadiganlar uchun boshlanish pozitsiyasi biroz orqaga

  const speed = 0.14; // tezlik sozlanadi

  requestAnimationFrame(() => {
    const resetPoint = list.scrollWidth / 2;

    function animate() {
      position += isRight ? speed : -speed;
      list.style.transform = `translateX(${position}px)`;

      // Reset shartlari (o‘ng/chap tomonga qarab)
      if (isRight && position >= 0) position = -resetPoint / 2;
      if (!isRight && Math.abs(position) >= resetPoint / 2) position = 0;

      requestAnimationFrame(animate);
    }

    animate();
  });
});

const modal = document.querySelector(".modal");
const openModals = document.querySelectorAll(".open_modal"); // barcha tugmalar
const closeModal = document.querySelector(".modal_exit");

// Har bir tugmaga event qo‘shamiz
openModals.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("show");
    document.body.style.overflow = "hidden"; // body scrollni bloklaymiz
  });
});

// Modalni yopish tugmasi
closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
  document.body.style.overflow = ""; // scrollni tiklaymiz
});

// Fonga bosilganda yopish
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }
});
