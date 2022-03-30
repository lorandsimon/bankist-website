//------------------------- ** -------------------------//
//SELECTING ELEMENTS

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSecions = document.querySelectorAll('.section');
// console.log(allSecions);

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

//------------------------- ** -------------------------//
//CREATING AND INSERTING ELEMENTS
// .insertAdjacentHTML

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent =
// //   'We use cookies for improved functionality nad analyitics!';
// message.innerHTML =
//   'We use cookies for improved functionality nad analyitics! <button class="btn btn--close-cookie"> Got it</button>';

// //prepend means first child, append means last child
// //can be just in one place at a time just if we clone
// // header.prepend(message);
// // header.append(message);
// // header.append(message.cloneNode(true));

// //before and after
// header.before(message);
// // header.after(message);

// //delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

//------------------------- ** -------------------------//
//STYLES
//styles set directly in the dom are inline styles
//we can not get a style that is not inline style, only with the get method (see below)

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// console.log(message.style.backgroundColor);
// console.log(message.style.color);

// //to get all the styles on the element even
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// //increase the height by 40px
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// console.log(getComputedStyle(message).height);

// //variables defined in root
// document.documentElement.style.setProperty('--color-primary', 'orangered');

//------------------------- ** -------------------------//
//ATTRIBUTES

// //works with the standard properties
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// //set attribute
// logo.setAttribute('designer', 'simon');

// //get non-standard attribute
// console.log(logo.getAttribute('designer'));

// //absolute version
// console.log(logo.src);

// //relative version - just like in the html
// console.log(logo.getAttribute('src'));

//------------------------- ** -------------------------//
//CLASSES

// logo.classList.add('asd');
// logo.classList.remove('asd');
// logo.classList.toggle('asd');
// //called containes and not includes like in arrays
// logo.classList.contains('asd');

// //dont use - overwrites all classes
// logo.classList = 'simon';

//------------------------- ** -------------------------//
//EVENTS AND EVENT HANDLERS
// const h1 = document.querySelector('h1');

// //eventlisteners is better cause you can add multiple events to the same element and we can also remove event handlers
// const alertH1 = function (e) {
//   alert('addEventlistener: Great!');

//   //we listen to the event only once
//   // h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

// //remove event listener after 3sec
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// //like a hover effect
// // h1.addEventListener('mouseenter', function (e) {
// //   alert('addEventlistener: Great!');
// // });

// //same as the top one, but this is the old way
// // h1.onmouseenter = function (e) {
// //   alert('addEventlistener: Great!');
// // };

//------------------------- ** -------------------------//
//BUBBLING AND CAPTURING (EVENT PROPAGATING)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('link', e.target, e.currentTarget);

//   //Stop event propagation
//   e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('container', e.target, e.currentTarget);
// });

// document.querySelector('.nav ').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('nav', e.target, e.currentTarget);
// });

//------------------------- ** -------------------------//
//DOM TRAVERSING
// const h1 = document.querySelector('h1');

// //going downwards, selecting childes
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'white';

// //going upwards, selecting parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// //find the first parent element for the h1 (first parent with .header class)
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// //going sideways, siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function (e) {
//   if (e !== h1) {
//     e.style.transform = 'scale(0.5)';
//   }
// });

// console.log([...h1.parentElement.children]);

//------------------------- ** -------------------------//
//LIFECYCLE DOM EVENTS

//all the HTML content load, can be seen in network tab
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree build', e);
});

//page fully load, this is available on the window
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

//message before leaving the page, available in the window
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);

//   //has a standard message and cant be changed
//   e.returnValue = '';
// });
