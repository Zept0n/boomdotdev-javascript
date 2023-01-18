import EventEmitter from "eventemitter3";
import image from "../images/planet.svg";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();

    const box = document.createElement("div");
    box.classList.add("box");
    this._loading = document.querySelector(".progress");
    this._loading.style.display = "none";
    document.body.querySelector(".main").appendChild(this._loading);
    box.innerHTML = this._render({
      name: "Placeholder",
      terrain: "placeholder",
      population: 0,
    });

    document.body.querySelector(".main").appendChild(box);

    this.emit(Application.events.READY);
  }

  async _load(page=1) {
    this._startLoading();
    let response;
    if (page === 1) {
      response = await fetch("https://swapi.boom.dev/api/planets");
    } else {
      response = await fetch(`https://swapi.boom.dev/api/planets?page=${page}`);
    }
    const data = await response.json();
    if (data.next) {
      // if there is a next page, recursively call this._load with the incremented page number
      const nextPageData = await this._load(page + 1);
      return [...data.results, ...nextPageData];
   } else {
      // if there are no more pages, return the data and hide the loading bar
      this._stopLoading();
      return data.results;
   }
  }


  async _create() {
    const data = await this._load();
    const fragment = new DocumentFragment();
    for (let i = 0; i < data.length; i++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.innerHTML = this._render({
        name: data[i].name,
        terrain: data[i].terrain,
        population: data[i].population,
      });
      fragment.append(box);
    }
    document.body.querySelector(".main").appendChild(fragment);
  }




  _startLoading() {
    this._loading.style.display = "block";
  }

  _stopLoading() {
    this._loading.style.display = "none";
  }

  _render({ name, terrain, population }) {
    return `
<article class="media">
  <div class="media-left">
    <figure class="image is-64x64">
      <img src="${image}" alt="planet">
    </figure>
  </div>
  <div class="media-content">
    <div class="content">
    <h4>${name}</h4>
      <p>
        <span class="tag">${terrain}</span> <span class="tag">${population}</span>
        <br>
      </p>
    </div>
  </div>
</article>
    `;
  }
}
