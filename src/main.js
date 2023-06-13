import { getUsers, db } from './lib/firebase.js';
import { register } from './components.js/register.js';
// import { feed } from './components.js/feed.js';
import { welcome } from './components.js/welcome.js';
// import { sobre } from './components.js/sobre.js';

const root = document.querySelector('#root');

const init = () => {
  root.innerHTML = '';
  switch (window.location.hash) {
    case '':
      root.appendChild(welcome());
      break;
    case '#register':
      root.appendChild(register());
      break;
    default:
      root.appendChild(welcome());
  }
};
window.addEventListener('load', () => {
  getUsers(db).then((data) => console.log(data));
  init();
});
window.addEventListener('hashchange', init);
