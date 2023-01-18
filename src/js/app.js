import "../scss/app.scss";

window.addEventListener("DOMContentLoaded", () => {
  // This block will be executed once the page is loaded and ready

  const ul = document.querySelector("ul");
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`)
    .then(responce => responce.json())
    .then(data => {
      const fragment = new DocumentFragment();
      for (let i = 0; i < 10; i++) {
        const li=document.createElement('li');
        li.innerText=data.results[i].name;
        fragment.append(li);
      }
      ul.appendChild(fragment);
    })
    .catch(error => {
      console.error('Error:', error);
    });

});


