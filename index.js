/* === Home Page - Competencies Section === */

const competenciesLinks = document.querySelectorAll(
  ".competencies-links__link"
);
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
