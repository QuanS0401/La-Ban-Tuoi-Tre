document.addEventListener("DOMContentLoaded", () => {
  // ===== NAV ACTIVE ON SCROLL =====
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + id);
    });
  };

  // chỉ setup observer nếu có đủ sections + navLinks
  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
      },
      {
        threshold: [0.25, 0.4, 0.55, 0.7],
        rootMargin: "-20% 0px -55% 0px",
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    // hash load
    if (location.hash) {
      const id = location.hash.slice(1);
      setActive(id);
    }
  }

  // ===== FAQ ACCORDION =====
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-question");

    if (!btn) return;

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // đóng các item khác (muốn mở nhiều cái cùng lúc thì xóa đoạn này)
      document.querySelectorAll(".faq-item.open").forEach((x) => {
        if (x !== item) {
          x.classList.remove("open");
          const b = x.querySelector(".faq-question");
          if (b) b.setAttribute("aria-expanded", "false");
        }
      });

      if (isOpen) {
        item.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
});