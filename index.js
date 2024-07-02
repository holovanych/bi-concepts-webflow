/* === Header Events === */

const desktopHeader = document.querySelector(".main-header");
const desktopHeaderInner = document.querySelector(".main-header-inner");
let lastScrollTop = 0;

function setScrollClassToMenu() {
  const st = document.documentElement.scrollTop;
  if (st > 200) {
    desktopHeaderInner.classList.add("header-scrolled");
  } else {
    desktopHeaderInner.classList.remove("header-scrolled");
  }
  if (st > lastScrollTop && st > 500) {
    desktopHeader.classList.add("hide");
  } else {
    desktopHeader.classList.remove("hide");
  }
  lastScrollTop = st <= 0 ? 0 : st;
}

window.addEventListener("scroll", () => {
  setScrollClassToMenu();
});

setScrollClassToMenu();

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

/* === Section Indicators === */

const pageSectionIndicatorBox = document.querySelector(
  ".page-section-indicator"
);

if (pageSectionIndicatorBox) {
  const navLinks = document.querySelectorAll('.indicator-item[href^="#"]');
  const mainHeaderForIndicators = document.querySelector(".main-header");
  const indicatorHeaderOffsetHeight = mainHeaderForIndicators
    ? mainHeaderForIndicators.offsetHeight
    : 0;

  function setActiveClassForIndicators() {
    let scrollPosition = window.scrollY + indicatorHeaderOffsetHeight;

    navLinks.forEach((link) => {
      const sectionId = link.getAttribute("href");
      const section = document.querySelector(sectionId);

      if (section) {
        if (
          scrollPosition >= section.offsetTop - 10 &&
          scrollPosition < section.offsetTop + section.offsetHeight - 10
        ) {
          navLinks.forEach((link) => {
            link.classList.remove("w--current");
          });

          link.classList.add("w--current");
          console.log(scrollPosition, section.offsetTop);
        }
      }
    });
  }

  window.addEventListener("scroll", setActiveClassForIndicators);
  setActiveClassForIndicators();
}

/* === Home Page - Competencies Section === */

const competenciesLinks = document.querySelectorAll(
  ".competencies-links__link"
);

if (competenciesLinks) {
  competenciesLinks.forEach((link) => {
    const referenceElement = link.querySelector(
      ".competencies-links__reference"
    );
    const anchor = referenceElement.dataset.anchor;
    const href =
      referenceElement.getAttribute("href") + "#" + "service-" + anchor;
    link.setAttribute("href", href);
    changeTag(link, "a");
    referenceElement.remove();
  });

  const competenciesLinkTitles = document.querySelectorAll(
    ".competencies-links__title"
  );
  competenciesLinkTitles.forEach((title) => {
    title.innerHTML = removeTagsExceptBr(title.innerHTML);
    changeTag(title, "h3");
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

/* Quote Box Style 1 */

const quoteBoxStyle1 = document.querySelector(".quote-box-style-1__quote");
if (quoteBoxStyle1) {
  const lastQuoteParagraph = quoteBoxStyle1.lastElementChild;
  if (lastQuoteParagraph) {
    const spanQuoteIcon = document.createElement("span");
    spanQuoteIcon.className = "inner-quote-icon";
    spanQuoteIcon.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M2.1799 17.23L0.709902 15.69C1.45657 14.3833 2.1099 13.1 2.6699 11.84C3.2299 10.5333 3.53324 
                               9.27333 3.5799 8.06L0.149902 7.29V0.5H7.7099V5.4C7.7099 8.24667 7.12657 10.58 5.9599 12.4C4.8399 
                               14.22 3.5799 15.83 2.1799 17.23ZM12.6799 17.23L11.2099 15.69C11.9566 14.3833 12.6099 13.1 13.1699 
                               11.84C13.7299 10.5333 14.0332 9.27333 14.0799 8.06L10.6499 7.29V0.5H18.2099V5.4C18.2099 8.24667 
                               17.6266 10.58 16.4599 12.4C15.3399 14.22 14.0799 15.83 12.6799 17.23Z" fill="#050A32"/>
                              </svg>`;
    const wrapSpanQuoteElement = document.createElement("span");
    wrapSpanQuoteElement.className = "inner-quote-icon-wrap";
    wrapSpanQuoteElement.appendChild(spanQuoteIcon);
    lastQuoteParagraph.appendChild(wrapSpanQuoteElement);
  }
}

/* Extract and load section (Vertical Scheme) */

function setEqualHeight(selector) {
  const elements = document.querySelectorAll(selector);
  let maxHeight = 0;

  elements.forEach(element => {
      element.style.height = 'auto';
  });

  elements.forEach(element => {
      maxHeight = Math.max(maxHeight, element.offsetHeight);
  });

  elements.forEach(element => {
      element.style.height = `${maxHeight}px`;
  });
}

function setHeightForVerticalScheme() {
  const minWidth = 992; 
  if (window.innerWidth >= minWidth) {
      setEqualHeight('.data-vertical-column__challenge');
      setEqualHeight('.data-vertical-column__solution');
      setEqualHeight('.data-vertical-column__result');
      setEqualHeight('.data-vertical-column__title-wrapper');
  } else {
      const elements = document.querySelectorAll('.data-vertical-column__challenge');
      elements.forEach(element => {
          element.style.height = 'auto';
      });
  }
}

setHeightForVerticalScheme();

setTimeout(function(){
  setHeightForVerticalScheme();
}, 10)

setTimeout(function(){
  setHeightForVerticalScheme();
}, 500)

window.addEventListener('resize', setHeightForVerticalScheme);


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

const backToTopButton = document.querySelector(".back-to-top__arrow-box");
if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    const startPosition = window.scrollY;
    let startTime = null;

    const scrollToTop = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const scrollY = easeInOutQuad(
        timeElapsed,
        startPosition,
        -startPosition,
        1000
      );

      window.scrollTo(0, scrollY);

      if (timeElapsed < 1000) {
        requestAnimationFrame(scrollToTop);
      }
    };

    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(scrollToTop);
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

function changeTag(oldElement, newTagName) {
  // Create the new element with the desired tag name
  const newElement = document.createElement(newTagName);

  // Copy attributes from the old element to the new one
  for (let attr of oldElement.attributes) {
    newElement.setAttribute(attr.name, attr.value);
  }

  // Copy children from the old element to the new one
  while (oldElement.firstChild) {
    newElement.appendChild(oldElement.firstChild);
  }

  // Replace the old element with the new one in the DOM
  oldElement.parentNode.replaceChild(newElement, oldElement);
}
