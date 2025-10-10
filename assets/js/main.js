document.addEventListener("DOMContentLoaded", function () {
  // phone inputmask
  const phoneInputs = document.querySelectorAll("input[name=phone]");

  phoneInputs.forEach((input) => {
    IMask(input, {
      mask: "+{7} (000) 000-00-00",
    });
  });

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

// Har bir formani tekshiramiz
document.querySelectorAll(".form_content").forEach((form) => {
  const inputs = form.querySelectorAll("input[required]");
  const submitBtn = form.querySelector(".open_modal");

  // Har bir inputga yozilganda .input_error ni olib tashlash
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value.trim() !== "") {
        input.classList.remove("input_error");
      }
    });
  });

  // Bosilganda tekshirish
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Formani yuborishni to‘xtatamiz

    let allFilled = true;
    let firstEmpty = null;

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        allFilled = false;
        input.classList.add("input_error");

        // Birinchi bo‘sh inputni saqlaymiz
        if (!firstEmpty) firstEmpty = input;
      } else {
        input.classList.remove("input_error");
      }
    });

    // Agar bo‘sh input bo‘lsa — fokus unga o‘tadi
    if (!allFilled && firstEmpty) {
      firstEmpty.focus();
      return;
    }

    // Hammasi to‘ldirilgan bo‘lsa — modal ochiladi
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  });
});

// Modalni yopish tugmasi
closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
  document.body.style.overflow = "";
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }
});
