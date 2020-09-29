const createElement = (tag, className, text, id) => {
    const element = document.createElement(tag);
    if (id) element.id = id;
    if (text) element.textContent = text;
    if (className) element.classList.add(className);

    return element;
  };

  const getElement = (selector) => {
    const element = document.querySelector(selector);

    return element;
  };

  export { createElement, getElement }