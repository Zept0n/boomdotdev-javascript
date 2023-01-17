import EventEmitter from "eventemitter3";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();
    this.emojis = [];
    this.banana = "🍌";
    this.emit(Application.events.READY);
  }
  addBananas(emojis) {
    this.emojis = emojis;
    this.emojis=this.emojis.map((x)=>{
      return x+this.banana;
    })
  }

  setEmojis() {
    const wrapper = document.getElementById("emojis");
    wrapper.innerHTML = "";
    const p = document.createElement("p");
    p.textContent = this.emojis;
    wrapper.appendChild(p);
  }
}
