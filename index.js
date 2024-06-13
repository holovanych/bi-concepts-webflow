  /* === COMMON JS FUNCTIONS === */

  // This function removes all HTML tags from the input string except <br> tags.

  function removeTagsExceptBr(htmlString) {
    // Create a temporary div element
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    // Function to recursively process nodes
    function processNode(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName.toLowerCase() === 'br') {
                return node.outerHTML;
            } else {
                var result = '';
                var children = Array.prototype.slice.call(node.childNodes);
                for (var i = 0; i < children.length; i++) {
                    result += processNode(children[i]);
                }
                return result;
            }
        } else if (node.nodeType === Node.TEXT_NODE) {
            return node.nodeValue;
        } else {
            return '';
        }
    }

    // Process the content of the temporary div
    var result = '';
    var children = Array.prototype.slice.call(tempDiv.childNodes);
    for (var i = 0; i < children.length; i++) {
        result += processNode(children[i]);
    }

    // Remove HTML entities (Unicode symbols)
    result = result.replace(/&[a-zA-Z0-9#]+;/g, '');

    return result;
}