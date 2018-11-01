//https://github.com/mzabriskie/react-draggable/blob/master/lib/utils/domFns.js

const { is, indexOf } = require("ramda");
const { findInArray } = require("./FunctionsUtils");

let matchesSelectorFunc = "";
const matchesSelector = (el, selector) => {
  if (!matchesSelectorFunc) {
    matchesSelectorFunc = findInArray(
      [
        "matches",
        "webkitMatchesSelector",
        "mozMatchesSelector",
        "msMatchesSelector",
        "oMatchesSelector"
      ],
      function(method) {
        // $FlowIgnore: Doesn't think elements are indexable
        return is(Function, el[method]);
      }
    );
  }

  // Might not be found entirely (not an Element?) - in that case, bail
  // $FlowIgnore: Doesn't think elements are indexable
  if (!is(Function, el[matchesSelectorFunc])) return false;

  // $FlowIgnore: Doesn't think elements are indexable
  return el[matchesSelectorFunc](selector);
};

// Works up the tree to the draggable itself attempting to match selector.
const matchesSelectorAndParentsTo = (el, selector, baseNode) => {
  let node = el;
  do {
    if (matchesSelector(node, selector)) return true;
    if (node === baseNode) return false;
    node = node.parentNode;
  } while (node);

  return false;
};

const addEvent = (el, event, handler) => {
  if (!el) {
    return;
  }
  if (el.attachEvent) {
    el.attachEvent("on" + event, handler);
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, true);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el["on" + event] = handler;
  }
};

const removeEvent = (el, event, handler) => {
  if (!el) {
    return;
  }
  if (el.detachEvent) {
    el.detachEvent("on" + event, handler);
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, true);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el["on" + event] = null;
  }
};

const DomFnsUtils = {
  addEvent,
  removeEvent,
  matchesSelectorAndParentsTo
};

module.exports = DomFnsUtils;
