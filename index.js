/* === Header Events === */

const desktopHeader = document.querySelector(".main-header");
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const st = document.documentElement.scrollTop;
  if (st > 200) {
    desktopHeader.classList.add("header-scrolled");
  } else {
    desktopHeader.classList.remove("header-scrolled");
  }
  if (st > lastScrollTop && st > 500) {
    desktopHeader.classList.add("hide");
  } else {
    desktopHeader.classList.remove("hide");
  }
  lastScrollTop = st <= 0 ? 0 : st;
});

window.scroll();

const dropdownMenuActiveLinks = [
  ...document.querySelectorAll(".rl_navbar1_dropdown-link.w--current"),
];
if (dropdownMenuActiveLinks) {
  dropdownMenuActiveLinks.forEach((item) => {
    const dropDown = item.closest(".rl_navbar1_menu-dropdown");
    const dropdownParentLink = dropDown.querySelector(".rl_navbar1_link-text");
    setTimeout(function () {
      dropdownParentLink.classList.add("w--current");
    }, 100);
  });
}

/* === Home Page - Competencies Section === */

const competenciesLinks = document.querySelectorAll(
  ".competencies-links__link"
);

if (competenciesLinks) {
  competenciesLinks.forEach((link) => {
    const anchor = link.dataset.anchor;
    const href = link.getAttribute("href") + "#" + anchor;
    link.setAttribute("href", href);
  });

  const competenciesLinkTitles = document.querySelectorAll(
    ".competencies-links__title"
  );
  competenciesLinkTitles.forEach((title) => {
    const listItem = title.closest(".competencies-links__item");
    const hiddenTitle = listItem.querySelector(
      ".competencies-links__hidden-title-with-line-break"
    );
    title.innerHTML = removeTagsExceptBr(hiddenTitle.innerHTML);
  });
}

/* === Home Page - Testimonials Slider === */

const testimonialSlider = document.querySelector(".swiper.testimonials-slider");

if (testimonialSlider) {
  const testimonialSwiper = new Swiper(testimonialSlider, {
    loop: true,
    /*autoplay: {
      delay: 5000,
    },*/
    breakpoints: {
      320: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      980: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
    },

    navigation: {
      prevEl: ".testimonials-slider-arrows .navigation-arrow-left",
      nextEl: ".testimonials-slider-arrows .navigation-arrow-right",
    },

    pagination: {
      el: ".testimonials-slider-dots",
      clickable: true,
    },
  });
}

/* Footer */

const footerSubMenuActiveLinks = [
  ...document.querySelectorAll(
    ".footer__menu-child-wrapper .footer__child-link.w--current"
  ),
];
if (footerSubMenuActiveLinks) {
  footerSubMenuActiveLinks.forEach((item) => {
    const subMenu = item.closest(".footer__sub-menu-wrapper");
    const subMenuMainLink = subMenu.querySelector(
      ".footer__link.sub-menu-main-link"
    );
    setTimeout(function () {
      subMenuMainLink.classList.add("w--current");
    }, 100);
  });
}

/* === COMMON JS FUNCTIONS === */

// This function removes all HTML tags from the input string except <br> tags.
function removeTagsExceptBr(htmlString) {
  var tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;

  function processNode(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName.toLowerCase() === "br") {
        return node.outerHTML;
      } else {
        var result = "";
        var children = Array.prototype.slice.call(node.childNodes);
        for (var i = 0; i < children.length; i++) {
          result += processNode(children[i]);
        }
        return result;
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      return node.nodeValue;
    } else {
      return "";
    }
  }

  var result = "";
  var children = Array.prototype.slice.call(tempDiv.childNodes);
  for (var i = 0; i < children.length; i++) {
    result += processNode(children[i]);
  }

  result = result.replace(/&[a-zA-Z0-9#]+;/g, "");
  return result;
}