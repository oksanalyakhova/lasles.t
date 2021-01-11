import Swiper, { Navigation, Pagination } from 'swiper';

let timer;

export default class InitApp {
  constructor() {
    this.DOM = { body: document.querySelector('body') };
    this.menu = this.DOM.body.querySelector('.site-nav');
    this.menuMob = this.DOM.body.querySelector('.mobile-nav');
    this.menuWrDesk = this.DOM.body.querySelector('.header__nav');
    this.signWrDesk = this.DOM.body.querySelector('.header__auth');
    this.sign = this.DOM.body.querySelector('.auth');
    this.burger = this.DOM.body.querySelector('.burger');
  }

  initEvents() {
    this.setSizes();
    this.initHelpSlider();
    this.manipulateMenu();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.setSizes();
    this.manipulateMenu();
    this.reinitHelpSlider();
  }

  setSizes() {
    const footer = this.DOM.body.querySelector('.footer');
    const footerWrapper = footer.querySelector('.footer__wrapper');
    footer.style.paddingTop = `${this.getSizes()}px`;
    footerWrapper.style.paddingTop = `${this.getSizes()}px`;

    const headerHeight = this.DOM.body.querySelector('.header').offsetHeight;
    const main = this.DOM.body.querySelector('main');
    main.style.paddingTop = `${headerHeight}px`;
  }

  getSizes() {
    return this.DOM.body.querySelector('.subscribe').offsetHeight * 0.5;
  }

  manipulateMenu() {
    if (window.innerWidth < 1024) {
      this.menuMob.prepend(this.menu);
      this.menuMob.prepend(this.sign);

      this.switchMobileNav();
    } else {
      this.menuWrDesk.prepend(this.menu);
      this.signWrDesk.prepend(this.sign);
    }
  }

  initHelpSlider() {
    Swiper.use([Navigation, Pagination]);
    this.swiper = new Swiper('.help-slider-container', {
      loop: true,
      speed: 400,
      slidesPerView: 'auto',
      spaceBetween: 20,
      lazy: true,
      grabCursor: true,
      navigation: {
        prevEl: '.help-prev',
        nextEl: '.help-next'
      },
      pagination: {
        el: '.swiper-pagination',
      },
      breakpoints: {
        1024: {
          spaceBetween: 50,
        }
      }
    });
  }

  reinitHelpSlider() {
    if (this.swiper)
      this.swiper.destroy();
    clearTimeout(timer);
    timer = setTimeout(this.initHelpSlider(), 200);
  }

  switchMobileNav() {
    this.burger.addEventListener('click', () => this.mobileNav());
  }

  mobileNav() {
    if (this.burger.classList.contains('is-active')) {
      this.burger.classList.remove('is-active');
      this.menuMob.classList.remove('is-animated');
      setTimeout(() => {
        this.menuMob.classList.remove('is-visible')
      }, 200);
    } else {
      this.burger.classList.add('is-active');
      this.menuMob.classList.add('is-animated');
      setTimeout(() => {
        this.menuMob.classList.add('is-visible')
      }, 250);
    }
  }
}
