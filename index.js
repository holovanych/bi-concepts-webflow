/* === Animations === */

let typeSplit = new SplitType("[text-split]", {
  types: "words, chars",
  tagName: "span",
});

function createScrollTrigger(triggerElement, timeline) {
  ScrollTrigger.create({
    trigger: triggerElement,
    start: "top bottom",
  });
  ScrollTrigger.create({
    trigger: triggerElement,
    start: "top 80%",
    onEnter: () => timeline.play(),
  });
}

[...document.querySelectorAll("[slide-up]")].forEach(function (element, index) {
  gsap.set(element, { opacity: 0, y: "30px" });
});

[...document.querySelectorAll("[slide-up]")].forEach(function (element, index) {
  let tl = gsap.timeline({ paused: true });
  tl.to(element, {
    opacity: 1,
    y: "0",
    duration: 1.0,
    ease: "power2.out",
    stagger: { amount: 0.2 },
  });
  createScrollTrigger(element, tl);
});

[...document.querySelectorAll("[words-slide-from-right]")].forEach(function (
  element,
  index
) {
  let tl = gsap.timeline({ paused: true });
  tl.fromTo(
    element.querySelectorAll(".word"),
    { opacity: 0, x: "-40px" },
    {
      opacity: 1,
      x: "0",
      duration: 1.0,
      ease: "power2.out",
      stagger: { amount: 0.2 },
    }
  );
  createScrollTrigger(element, tl);
});

/* === Header Events === */

const desktopHeader = document.querySelector(".main-header");
const desktopHeaderInner = document.querySelector(".main-header-inner");
let lastScrollTop = 0;

function setScrollClassToMenu() {
  const st = document.documentElement.scrollTop;
  if (st > 5) {
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

/* === Section Indicators Custom Class === */

const dotsParentElement = document.querySelector(
  ".page-section-indicator__inner"
);

if (dotsParentElement) {

  dotsParentElement.addEventListener("mouseover", function () {
    dotsParentElement.classList.add("active");
  });

  dotsParentElement.addEventListener("mouseout", function () {
    dotsParentElement.classList.remove("active");
  });
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

/* === Value Proposition Tabs Slider === */
const valuePropositionTabsSection = document.querySelector(
  ".value-proposition-tabs-section"
);
if (valuePropositionTabsSection) {
  const items = document.querySelectorAll(".value-proposition-tab-item");
  const leftButton = document.querySelector(".navigation-arrow-left");
  const rightButton = document.querySelector(".navigation-arrow-right");
  let currentIndex = 0;

  function updateActiveItem(index) {
    items.forEach((item, idx) => {
      if (idx === index) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  leftButton.addEventListener("click", function () {
    currentIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    updateActiveItem(currentIndex);
  });

  rightButton.addEventListener("click", function () {
    currentIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    updateActiveItem(currentIndex);
  });
}

/* === Testimonials Slider === */

const testimonialSlider = document.querySelector(".swiper.testimonials-slider");

if (testimonialSlider) {
  const testimonialSwiper = new Swiper(testimonialSlider, {
    loop: true,
    autoplay: {
      delay: 4000,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
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

/* === Horizontal Scheme with Navigation === */

const horizontalScheme = document.querySelector(".home-value__scheme");

if (horizontalScheme) {
  const schemeWithNavItems = [
    ...document.querySelectorAll(".scheme-with-nav__item"),
  ];
  const schemeWithNavLeft = document.querySelector(
    ".home-value__scheme-nav .navigation-arrow-left"
  );
  const schemeWithNavRight = document.querySelector(
    ".home-value__scheme-nav .navigation-arrow-right"
  );

  const delayBetweenSlides = 6000;

  let currentIndex = 0;
  let autoplayInterval;

  schemeWithNavItems[currentIndex].classList.add("active");

  const setActiveItem = (index) => {
    schemeWithNavItems[currentIndex].classList.remove("active");
    currentIndex = index;
    schemeWithNavItems[currentIndex].classList.add("active");
  };

  const startAutoplay = () => {
    autoplayInterval = setInterval(() => {
      setActiveItem((currentIndex + 1) % schemeWithNavItems.length);
    }, delayBetweenSlides);
  };

  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
  };

  schemeWithNavRight.addEventListener("click", () => {
    setActiveItem((currentIndex + 1) % schemeWithNavItems.length);
    stopAutoplay();
    startAutoplay();
  });

  schemeWithNavLeft.addEventListener("click", () => {
    setActiveItem(
      (currentIndex - 1 + schemeWithNavItems.length) % schemeWithNavItems.length
    );
    stopAutoplay();
    startAutoplay();
  });

  schemeWithNavItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (index !== currentIndex) {
        setActiveItem(index);
        stopAutoplay();
        startAutoplay();
      }
    });
  });

  // Start autoplay when the page loads
  startAutoplay();

  function setItemsHeight() {
    const minWidth = 992;
    if (window.innerWidth >= minWidth) {
      setEqualHeight(".scheme-with-nav__item");
    } else {
      const elements = document.querySelectorAll(".scheme-with-nav__item");
      elements.forEach((element) => {
        element.style.height = "auto";
      });
    }
  }

  window.addEventListener("resize", function () {
    setItemsHeight();

    setTimeout(function () {
      setItemsHeight();
    }, 500);
  });

  setItemsHeight();

  setTimeout(function () {
    setItemsHeight();
  }, 500);

  setTimeout(function () {
    setItemsHeight();
  }, 3000);
}

/* Our Services */
const ourServices = document.querySelector(".our-services");

if (ourServices) {
  const ourServicesItems = [
    ...document.querySelectorAll(".our-services__item"),
  ];
  const ourServicesItemsContainer = document.querySelector(
    ".our-services__list"
  );
  const popupList = [...document.querySelectorAll(".our-services__popup-item")];

  const openPopup = (index) => {
    const containerWidth = ourServicesItemsContainer.clientWidth;
    const itemWidth = ourServicesItems[0].clientWidth;
    const numberOfColumns = Math.floor(containerWidth / itemWidth);
    const rowIndex = Math.floor(index / numberOfColumns) + 1;
    let insertAfterIndex = rowIndex * numberOfColumns - 1;
    if (insertAfterIndex >= ourServicesItems.length) {
      insertAfterIndex = ourServicesItems.length - 1;
    }

    const clonedPopup = popupList[index].cloneNode(true);
    insertAfter(ourServicesItems[insertAfterIndex], clonedPopup);
    slideDown(clonedPopup, 400, function () {
      ourServicesItemsContainer.classList.remove("lock");
    });
  };

  const clearPopup = () => {
    const activePopup = ourServicesItemsContainer.querySelector(
      ".our-services__popup-item"
    );
    if (activePopup) {
      slideUp(activePopup, 300, function () {
        activePopup.remove();
      });
    }
  };

  ourServicesItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      if (
        !item.classList.contains("opened") &&
        !ourServicesItemsContainer.classList.contains("lock")
      ) {
        ourServicesItemsContainer.classList.add("lock");
        ourServicesItems.forEach((item) => item.classList.remove("opened"));
        item.classList.add("opened");
        clearPopup();
        openPopup(index);
      } else {
        item.classList.remove("opened");
        clearPopup();
      }
    });
  });

  document.addEventListener("click", function (e) {
    const closeBTN = e.target.closest(".our-services__popup-close-btn"); // Or any other selector.
    if (closeBTN) {
      clearPopup();
    }
  });

  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
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

/* Value Proposition data Scheme */
const collapseButtons = document.querySelectorAll(
  ".data-scheme__collapse-button"
);

collapseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const hiddenContent = button.nextElementSibling;

    if (hiddenContent.classList.contains("lock")) return;

    if (window.getComputedStyle(hiddenContent).display === "none") {
      slideDown(hiddenContent, 400, () => {
        hiddenContent.classList.remove("lock");
      });
    } else {
      slideUp(hiddenContent, 400, () => {
        hiddenContent.classList.remove("lock");
      });
    }
  });
});

/* CREDENTIALS Section */

const credentialsSection = document.querySelector(".credentials");
if (credentialsSection) {
  // Filter Items
  const credentialsCategories = [
    ...document.querySelectorAll(".credentials__category-item"),
  ];
  const allCredentialItems = [...document.querySelectorAll(".credential-item")];

  function clickOnCredentialCategory() {
    if (this.classList.contains("active-category")) return;
    credentialsCategories.forEach((item) =>
      item.classList.remove("active-category")
    );
    this.classList.add("active-category");
    const clickedCategory = this.querySelector(
      ".credentials__category-item-text"
    ).textContent.trim();
    const filteredItems = allCredentialItems.filter((item) => {
      const category = item.querySelector(
        ".credential-item__category-filter"
      ).textContent;
      if (clickedCategory === "All") return true;
      return category.includes(clickedCategory);
    });
    allCredentialItems.forEach((item) => item.classList.add("hidden-item"));
    filteredItems.forEach((item) => item.classList.remove("hidden-item"));
  }
  credentialsCategories.forEach((category) => {
    category.addEventListener("click", clickOnCredentialCategory);
  });

  // Slide Down Item
  const allCredentialHeadings = [
    ...document.querySelectorAll(".credential-item__head"),
  ];

  function clickOnCredentialHeading() {
    const currentItem = this.closest(".credential-item");
    const hiddenBody = currentItem.querySelector(".credential-item__body");
    if (currentItem.classList.contains("lock")) return;
    currentItem.classList.add("lock");
    if (!currentItem.classList.contains("opened")) {
      currentItem.classList.add("opened");
      slideDown(hiddenBody, 400, function () {
        currentItem.classList.remove("lock");
      });
    } else {
      currentItem.classList.remove("opened");
      slideUp(hiddenBody, 400, function () {
        currentItem.classList.remove("lock");
      });
    }
  }

  allCredentialHeadings.forEach((heading) => {
    heading.addEventListener("click", clickOnCredentialHeading);
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
function removeTagsExceptBr(e) {
  var t = document.createElement("div");
  function o(e) {
    if (e.nodeType === Node.ELEMENT_NODE) {
      if ("br" === e.tagName.toLowerCase()) return e.outerHTML;
      for (
        var t = "", r = Array.prototype.slice.call(e.childNodes), i = 0;
        i < r.length;
        i++
      )
        t += o(r[i]);
      return t;
    }
    return e.nodeType === Node.TEXT_NODE ? e.nodeValue : "";
  }
  t.innerHTML = e;
  for (
    var r = "", i = Array.prototype.slice.call(t.childNodes), n = 0;
    n < i.length;
    n++
  )
    r += o(i[n]);
  return r.replace(/&[a-zA-Z0-9#]+;/g, "");
}
function changeTag(e, t) {
  let o = document.createElement(t);
  for (let r of e.attributes) o.setAttribute(r.name, r.value);
  for (; e.firstChild; ) o.appendChild(e.firstChild);
  e.parentNode.replaceChild(o, e);
}
function slideUp(e, t = 400, o) {
  "true" !== e.dataset.sliding &&
    ((e.dataset.sliding = "true"),
    (e.style.height = e.offsetHeight + "px"),
    (e.style.transitionProperty = "height, margin, padding"),
    (e.style.transitionDuration = t + "ms"),
    (e.style.boxSizing = "border-box"),
    e.offsetHeight,
    (e.style.overflow = "hidden"),
    (e.style.height = 0),
    (e.style.paddingTop = 0),
    (e.style.paddingBottom = 0),
    (e.style.marginTop = 0),
    (e.style.marginBottom = 0),
    window.setTimeout(function () {
      (e.style.display = "none"),
        e.style.removeProperty("height"),
        e.style.removeProperty("padding-top"),
        e.style.removeProperty("padding-bottom"),
        e.style.removeProperty("margin-top"),
        e.style.removeProperty("margin-bottom"),
        e.style.removeProperty("overflow"),
        e.style.removeProperty("transition-duration"),
        e.style.removeProperty("transition-property"),
        (e.dataset.sliding = "false"),
        "function" == typeof o && o();
    }, t));
}
function slideDown(e, t = 400, o) {
  if ("true" === e.dataset.sliding) return;
  (e.dataset.sliding = "true"), e.style.removeProperty("display");
  let r = window.getComputedStyle(e).display;
  "none" === r && (r = "block"), (e.style.display = r);
  let i = e.offsetHeight;
  (e.style.overflow = "hidden"),
    (e.style.height = 0),
    (e.style.paddingTop = 0),
    (e.style.paddingBottom = 0),
    (e.style.marginTop = 0),
    (e.style.marginBottom = 0),
    e.offsetHeight,
    (e.style.transitionProperty = "height, margin, padding"),
    (e.style.transitionDuration = t + "ms"),
    (e.style.boxSizing = "border-box"),
    (e.style.height = i + "px"),
    e.style.removeProperty("padding-top"),
    e.style.removeProperty("padding-bottom"),
    e.style.removeProperty("margin-top"),
    e.style.removeProperty("margin-bottom"),
    window.setTimeout(function () {
      e.style.removeProperty("height"),
        e.style.removeProperty("overflow"),
        e.style.removeProperty("transition-duration"),
        e.style.removeProperty("transition-property"),
        (e.dataset.sliding = "false"),
        "function" == typeof o && o();
    }, t);
}
function setEqualHeight(e) {
  let t = document.querySelectorAll(e),
    o = 0;
  t.forEach((e) => {
    e.style.height = "auto";
  }),
    t.forEach((e) => {
      o = Math.max(o, e.offsetHeight);
    }),
    t.forEach((e) => {
      e.style.height = `${o}px`;
    });
}
