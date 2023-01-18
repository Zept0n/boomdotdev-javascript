import { formatCurrency } from "./utils";
import classNames from "classnames";
export default class Notification {
  static get types() {
    return {
      PEPPERONI: "pepperoni",
      MARGHERITA: "margherita",
      HAWAIIAN: "hawaiian",
    };
  }

  constructor() {
    this.container = document.createElement("div");
    this.container.classList.add("notification-container");
  }

  render({type,price}) {
    const template = `
<div class="notification type-${type} ${classNames({"is-danger": type === Notification.types.HAWAIIAN,})}">
  <button class="delete"></button>
  🍕 <span class="type">${type}</span> (<span class="price">${formatCurrency(price)}</span>) has been added to your order.
</div>
    `;

    this.container.addEventListener("click", () => {
      this.empty();
    });
    this.container.innerHTML = template;
  }

  empty() {
    this.container.innerHTML = '';
  }
}
/* 
Requirements
The project must run when started via npm run start
There must be a card for each pizza
A notification must be created and added to the page every time a card is clicked
The notification must display the pizza type and the pizza price
The notification must be closed when the close button is clicked
The notification must have an is-danger class if the type is hawaii
The notification must import the formatCurrency method from utils
The notification must import the classNames module. You can read more about it here
The notification must have an empty method that clears the HTML contents of the container
The render method must have a price argument
The render method must have a type argument
The classNames and formatCurrency modules must be used in render() */
