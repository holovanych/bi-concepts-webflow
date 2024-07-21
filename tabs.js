const valuePropositionTabsSection = document.querySelector('.value-proposition-tabs-section');
if(valuePropositionTabsSection){
  const items = document.querySelectorAll(".value-proposition-tab-item");
  const tabTitleItems = document.querySelectorAll(".value-proposition-tab__tab-title-item");
  const leftButton = document.querySelector(".navigation-arrow-left");
  const rightButton = document.querySelector(".navigation-arrow-right");
  const autoSlideDelay = 5000; 
  const userInterferenceTimeoutDelay = 1000 * 60 * 3;
  
  let currentIndex = 0;
  let autoSlideInterval;
  let userInterferenceTimeout;
  
  function updateActiveItem(index) {
    items.forEach((item, idx) => {
      item.classList.toggle("active", idx === index);
    });
    
    tabTitleItems.forEach((tab, idx) => {
      tab.classList.toggle("active-tab", idx === index);
    });
  }
  
  function setUserInterferenceTimeout() {
    clearTimeout(userInterferenceTimeout);
    clearInterval(autoSlideInterval);
    userInterferenceTimeout = setTimeout(() => {
      startAutoSlide();
    }, userInterferenceTimeoutDelay);
  }
  
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
      updateActiveItem(currentIndex);
    }, autoSlideDelay);
  }
  
  leftButton.addEventListener("click", function () {
    currentIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    updateActiveItem(currentIndex);
    setUserInterferenceTimeout();
  });
  
  rightButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % items.length;
    updateActiveItem(currentIndex);
    setUserInterferenceTimeout();
  });
  
  tabTitleItems.forEach((tab, idx) => {
    tab.addEventListener("click", function () {
      currentIndex = idx;
      updateActiveItem(currentIndex);
      setUserInterferenceTimeout();
    });
  });
  startAutoSlide();
}
