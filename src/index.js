import Handlebars from 'handlebars';
import button from './partials/button/button.hbs';
import greet from './partials/greet.hbs';

Handlebars.registerPartial('button', button);

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');

  const result = greet({ username: 'John Snow' });
  root.innerHTML = result;
});
