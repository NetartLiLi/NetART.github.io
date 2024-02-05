// remplis les espaces vides formés par des éléments
// grand qui ont du être déplacés à la page suivante

let classElemFloat = "elem-float-top"; // ← class of floated elements

class elemFloatTop extends Paged.Handler {
  constructor(chunker, polisher, caller) {
    super(chunker, polisher, caller);
    this.floatPageEls = [];
    this.token;
  }

  layoutNode(node) {
    // If you find a float page element, move it in the array,
    if (node.nodeType == 1 && node.classList.contains(classElemFloat)) {
      let clone = node.cloneNode(true);
      this.floatPageEls.push(clone);
      // Remove the element from the flow by hiding it.
      node.style.display = "none";
    }
  }

  beforePageLayout(page, content, breakToken) {
    // If there is an element in the floatPageEls array,
    if (this.floatPageEls.length >= 1) {
      // Put the first element on the page.
      page.element.querySelector(".pagedjs_page_content").insertAdjacentElement("afterbegin", this.floatPageEls[0]);
      this.floatPageEls.shift();
    }
  }
}
Paged.registerHandlers(elemFloatTop);