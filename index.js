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

/* === Testimonials Slider === */

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

  let currentIndex = 0;
  schemeWithNavItems[currentIndex].classList.add("active");

  const setActiveItem = (index) => {
    schemeWithNavItems[currentIndex].classList.remove("active");
    currentIndex = index;
    schemeWithNavItems[currentIndex].classList.add("active");
  };

  schemeWithNavRight.addEventListener("click", () => {
    setActiveItem((currentIndex + 1) % schemeWithNavItems.length);
  });

  schemeWithNavLeft.addEventListener("click", () => {
    setActiveItem(
      (currentIndex - 1 + schemeWithNavItems.length) % schemeWithNavItems.length
    );
  });

  schemeWithNavItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (index !== currentIndex) {
        setActiveItem(index);
      }
    });
  });
}

/* Our Services */
const ourServices = document.querySelector(".our-services");

if (ourServices) {

  const ourServicesItems = [...document.querySelectorAll(".our-services__item")];
  const ourServicesItemsContainer = document.querySelector('.our-services__list')
  const popupList = [...document.querySelectorAll('.our-services__popup-item')];

  const openPopup = (index) => {
    const containerWidth = ourServicesItemsContainer.clientWidth;
    const itemWidth = ourServicesItems[0].clientWidth;
    const numberOfColumns = Math.floor(containerWidth / itemWidth);
    const rowIndex = Math.floor(index / numberOfColumns) + 1;
    const insertAfterIndex = rowIndex * numberOfColumns - 1;
    console.log("Clicked item index:", index);
    console.log("Number of columns:", numberOfColumns);
    console.log("Row index:", rowIndex);
    console.log("After Index:", insertAfterIndex);

    const clonedPopup = popupList[index].cloneNode(true);
    insertAfter(ourServicesItems[insertAfterIndex], clonedPopup);
    slideDown(clonedPopup, 400, function(){
      ourServicesItemsContainer.classList.remove('lock');
    })
  };
  
  const clearPopup = () => {
    const activePopup = ourServicesItemsContainer.querySelector('.our-services__popup-item');
    console.log(activePopup);
    if(activePopup){
      slideUp(activePopup, 300, function(){
        activePopup.remove();
      });
    }
  };

  ourServicesItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      if (!item.classList.contains("opened") && !ourServicesItemsContainer.classList.contains('lock')) {
        ourServicesItemsContainer.classList.add('lock')
        ourServicesItems.forEach(item => item.classList.remove('opened'));
        item.classList.add('opened');
        clearPopup();
        openPopup(index);
      } else {
        item.classList.remove('opened');
        clearPopup();
      }
    });
  });


  document.addEventListener("click", function(e){
    const closeBTN = e.target.closest(".our-services__popup-close-btn"); // Or any other selector.
    if(closeBTN){
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

/* Extract and load section (Vertical Scheme) */
const extractAndLoadScheme = document.querySelector(".extract-and-load-scheme");

if (extractAndLoadScheme) {
  function setEqualHeight(selector) {
    const elements = document.querySelectorAll(selector);
    let maxHeight = 0;

    elements.forEach((element) => {
      element.style.height = "auto";
    });

    elements.forEach((element) => {
      maxHeight = Math.max(maxHeight, element.offsetHeight);
    });

    elements.forEach((element) => {
      element.style.height = `${maxHeight}px`;
    });
  }

  function setHeightForVerticalScheme() {
    const minWidth = 992;
    if (window.innerWidth >= minWidth) {
      setEqualHeight(".data-vertical-column__challenge");
      setEqualHeight(".data-vertical-column__solution");
      setEqualHeight(".data-vertical-column__result");
      setEqualHeight(".data-vertical-column__title-wrapper");
    } else {
      const elements = document.querySelectorAll(
        ".data-vertical-column__challenge"
      );
      elements.forEach((element) => {
        element.style.height = "auto";
      });
    }
  }

  setHeightForVerticalScheme();

  setTimeout(function () {
    setHeightForVerticalScheme();
  }, 10);

  setTimeout(function () {
    setHeightForVerticalScheme();
  }, 500);

  window.addEventListener("resize", setHeightForVerticalScheme);
}

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
    console.log(filteredItems);
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

function slideUp(element, duration = 400, callback) {
  if (element.dataset.sliding === "true") return;

  element.dataset.sliding = "true";
  element.style.height = element.offsetHeight + "px";
  element.style.transitionProperty = "height, margin, padding";
  element.style.transitionDuration = duration + "ms";
  element.style.boxSizing = "border-box";
  element.offsetHeight; // force reflow
  element.style.overflow = "hidden";
  element.style.height = 0;
  element.style.paddingTop = 0;
  element.style.paddingBottom = 0;
  element.style.marginTop = 0;
  element.style.marginBottom = 0;

  window.setTimeout(function () {
    element.style.display = "none";
    element.style.removeProperty("height");
    element.style.removeProperty("padding-top");
    element.style.removeProperty("padding-bottom");
    element.style.removeProperty("margin-top");
    element.style.removeProperty("margin-bottom");
    element.style.removeProperty("overflow");
    element.style.removeProperty("transition-duration");
    element.style.removeProperty("transition-property");
    element.dataset.sliding = "false";
    if (typeof callback === "function") callback();
  }, duration);
}

function slideDown(element, duration = 400, callback) {
  if (element.dataset.sliding === "true") return;

  element.dataset.sliding = "true";
  element.style.removeProperty("display");
  let display = window.getComputedStyle(element).display;

  if (display === "none") display = "block";

  element.style.display = display;
  let height = element.offsetHeight;
  element.style.overflow = "hidden";
  element.style.height = 0;
  element.style.paddingTop = 0;
  element.style.paddingBottom = 0;
  element.style.marginTop = 0;
  element.style.marginBottom = 0;
  element.offsetHeight; // force reflow
  element.style.transitionProperty = "height, margin, padding";
  element.style.transitionDuration = duration + "ms";
  element.style.boxSizing = "border-box";
  element.style.height = height + "px";
  element.style.removeProperty("padding-top");
  element.style.removeProperty("padding-bottom");
  element.style.removeProperty("margin-top");
  element.style.removeProperty("margin-bottom");

  window.setTimeout(function () {
    element.style.removeProperty("height");
    element.style.removeProperty("overflow");
    element.style.removeProperty("transition-duration");
    element.style.removeProperty("transition-property");
    element.dataset.sliding = "false";
    if (typeof callback === "function") callback();
  }, duration);
}
