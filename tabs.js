const valuePropositionTabsSection = document.querySelector('.value-proposition-tabs-section');
if(valuePropositionTabsSection){

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
