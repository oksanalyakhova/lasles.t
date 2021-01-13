import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function transitionProps(el, d, direction) {
  const x = 0;
  const y = direction * 100;
  const st = direction * 0.15;

  gsap.fromTo(el, {x, y, autoAlpha: 0}, {
    duration: 1.25,
    x: 0,
    y: 0,
    autoAlpha: 1,
    ease: 'expo',
    overwrite: 'auto',
    stagger: st,
    delay: d
  });
}

function hide(el) {
  gsap.set(el, {autoAlpha: 0});
}

function show(el) {
  gsap.to(el, {
    duration: 1,
    autoAlpha: 1,
    ease: 'expo',
    overwrite: 'auto',
    delay: 0.5
  });
}

function triggerProps(el, tr) {
  ScrollTrigger.create({
    trigger: tr,
    onEnter() { transitionProps(el, 0, 1) },
    onEnterBack() { transitionProps(el, 0, -1) },
    onLeave() { hide(el) }
  });
}

function delayTriggerProps(el, tr) {
  ScrollTrigger.create({
    trigger: tr,
    onEnter() { transitionProps(el, 0.3, 1) },
    onEnterBack() { transitionProps(el, 0.3, -1) },
    onLeave() { hide(el) }
  });
}

export default class ScrollAnimApp {
  constructor() {
    this.DOM = { body: document.querySelector('body') };
    this.header = this.DOM.body.querySelector('.header');
    this.sections = [...this.DOM.body.querySelectorAll('.section')];
    this.texts = [...this.DOM.body.querySelectorAll('.block-text')];
    this.btns = [...this.DOM.body.querySelectorAll('.btn-theme')];
    this.media = [...this.DOM.body.querySelectorAll('.media')];
    this.cards = [...this.DOM.body.querySelectorAll('.card')];
  }

  initEvents() {
    this.animate();
  }

  animate() {
    this.animateHeader();
    this.animateTexts();
    this.animateBtns();
    this.animateMedia();
    this.animateCards();
  }

  animateHeader() {
    ScrollTrigger.create({
      start: 'top -200',
      end: 99999,
      toggleClass: {className: 'is-scrolled', targets: this.header}
    });
  }

  animateTexts() {
    gsap.utils.toArray(this.texts).forEach(el => {
      const childs = [...el.querySelectorAll('.title, .text, li')];
      hide(childs);
      triggerProps(childs, el);
    });
  }

  animateBtns() {
    gsap.utils.toArray(this.btns).forEach(el => {
      hide(el);
      triggerProps(el, el);
    });
  }

  animateMedia() {
    gsap.utils.toArray(this.media).forEach(el => {
      hide(el);
      delayTriggerProps(el, el);
    });
  }

  animateCards() {
    gsap.utils.toArray(this.cards).forEach(el => {
      hide(el);
      ScrollTrigger.create({
        trigger: el,
        onEnter() { show(el) },
        onEnterBack() { show(el) },
        onLeave() { hide(el) }
      });
    });
  }
}
