import EventEmitter from "eventemitter3";
import Card from "./Card";
import Notification from "./Notification";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();

    const pizzas = [
      {
        type: Card.types.HAWAIIAN,
        price: 8.99,
      },
      {
        type: Card.types.PEPPERONI,
        price: 9.99,
      },
      {
        type: Card.types.MARGHERITA,
        price: 7.99,
      },
    ];

    pizzas.forEach((pizza) => {
      const card = new Card({ ...pizza });
      card.render();
      document.querySelector(".main").appendChild(card.container);
      card.on(Card.events.ADD_TO_CART, data => {
        console.log(data);
        // Create the event handler here
        // You can do something like this:
        const notification = new Notification();
        notification.render(data);
        document.querySelector(".main").appendChild(notification.container);
      });
    });

    this.emit(Application.events.READY);
  }
}
