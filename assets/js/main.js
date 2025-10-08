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
