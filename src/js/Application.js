import EventEmitter from "eventemitter3";
import anime from "animejs";
export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();
    this.init();
    this.moved=false;
    this.emit(Application.events.READY);
  }
  init() {
    const article=document.querySelector('.article');
    article.addEventListener('click',()=>{
      if (this.moved===false) {
        this.moved=true;
        anime({
          targets: article,
          translateX: 250,
          direction: 'alternate',
          loop: true,
          easing: 'spring(1, 80, 10, 0)'
        })
      } else {
        this.moved=false;
        anime({
          targets: article,
          translateX: 0,
          direction: 'alternate',
          loop: true,
          easing: 'spring(1, 80, 10, 0)'
        })
      }
      
    })
  }
}
