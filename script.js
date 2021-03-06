'use strict';

///////////////////////////////////////
// Modal window
//------------------------- ** -------------------------//
//INIT VALUES
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

//------------------------- ** -------------------------//
//OPEN MODAL
const openModal = function (e) {
  //page does not jump on top
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

//------------------------- ** -------------------------//
//CLOSE MODAL
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//------------------------- ** -------------------------//
//OPEN THE MODAL WITH THE BUTTONS FUNCTIONALITY
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

//------------------------- ** -------------------------//
//CLOSE THE MODAL
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//------------------------- ** -------------------------//
//SCROLL TO FUNCTION
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  //section 1 elements position
  console.log(s1coords);

  //the buttons position
  console.log(e.target.getBoundingClientRect());

  //current scroll
  console.log('current scroll (x/y)', window.pageXOffset, window.pageYOffset);

  //height and width of viewport
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //scrolling - needs the left and top coordinates
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  //for smoot scrolling we need to specify an object
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //MODERN SCROLLING
  section1.scrollIntoView({ behavior: 'smooth' });
});

//------------------------- ** -------------------------//
//PAGE NAVIGATION
// document.querySelectorAll('.nav__link').forEach(function (e) {
//   e.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     const scrollTo = document.querySelector(id);
//     scrollTo.scrollIntoView({ behavior: 'smooth' });
//   });
// });

//EVENT DELEGATION
//good to use when we have dynamic buttons which are loading in , so you cant push a button which is not loaded

//1. Add event listener to common parent element
//2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    const scrollTo = document.querySelector(id);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
  }
});

//------------------------- ** -------------------------//
//TABBED COMPONENT
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //guard caluse, if there is nothing in clicked immediatly finish
  if (!clicked) {
    return;
  }

  //remove the active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  //active tab
  clicked.classList.add('operations__tab--active');

  //activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//------------------------- ** -------------------------//
//PASSING ARGUMENTS TO EVENT HANDLERS
//MENU FADE ANIMATION
const handleHover = function (e) {
  //we dont need the closes element here, because we dont have other elements
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//we use mouseover because mouseenter is not bubbleing
//passing "arguments" to handler function
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//------------------------- ** -------------------------//
//IMPLEMENT STICKY NAVIGATION

// const initialCoord = section1.getBoundingClientRect();
// console.log(initialCoord);

// //scroll evenet, available in window
// //scroll event is bad for performace cause fires every time if its a change in height no matter how little
// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);
//   window.scrollY > initialCoord.top
//     ? nav.classList.add('sticky')
//     : nav.classList.remove('sticky');
// });

//------------------------- ** -------------------------//
//THE INTERSECTION OBSERVER API(APPLICATION PROGRAMMING INTERFACE)

// const obsCallback = function (entries, observer) {
//   //when the target(section1) is intersecting the viewport at 10% then this function will be called
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// //the target(section1) when is 10% visible in root, then will be intersecting
// const obsOptions = {
//   //this is the viewport
//   root: null,
//   //this is the 0 and 10%, how many percent we want to be visible in our root(viewport)
//   threshold: [0, 0.1],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  //this is the height of navigation
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//------------------------- ** -------------------------//
//REVEAL SECTIONS

const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  //reveal the section when is 15% visible
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//------------------------- ** -------------------------//
//LAZY LOADING IMAGES

const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  //replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

imgTargets.forEach(img => imgObserver.observe(img));

//------------------------- ** -------------------------//
//SLIDER

const slider = function () {
  //init values
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let currentSlide = 0;
  const maxSlide = slides.length;
  const dotContainer = document.querySelector('.dots');
  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.5)';
  // slider.style.overflow = 'visible';

  //functions----------------------------------------------

  //create the dots and make them work
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  //active dot
  const activeDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  //slide moving function
  const goToSlide = function (value) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - value)}%)`)
    );
  };

  //go to the next slide, right button functionallity
  const nextSlide = function () {
    currentSlide === maxSlide - 1 ? (currentSlide = 0) : currentSlide++;
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  //go to the previous slide, left button functionallity
  const previousSlide = function () {
    currentSlide === 0 ? (currentSlide = maxSlide - 1) : currentSlide--;
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  //initialize functions
  const init = function () {
    //slides initial
    goToSlide(0);

    //create the dots
    createDots();

    //which dot is active
    activeDot(0);
  };

  //functions end------------------------------------------

  //events, listeners and initialization for sliders-------

  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', previousSlide);

  //keyboard events for right and left arrow
  document.addEventListener('keydown', function (keyPressed) {
    if (keyPressed.key === 'ArrowRight') nextSlide();
    if (keyPressed.key === 'ArrowLeft') previousSlide();
    // console.log(button);
  });

  //dots onclick functionallity
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDot(slide);
    }
  });
};

//call the slider function which makes the whole slider to work
slider();
