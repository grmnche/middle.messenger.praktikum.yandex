const passwordHider = () => {
  const passwordElements = document.querySelectorAll('.item-value');

  passwordElements.forEach((element) => {
    const password = document.querySelector('.item-value').textContent;
    const hiddenPassword = password.replace(/./g, '.');
    element.textContent = hiddenPassword;
  });
};

passwordHider();
