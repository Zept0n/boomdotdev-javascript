import "../scss/app.scss";
window.addEventListener("DOMContentLoaded", () => {
  // This block will be executed once the page is loaded and ready

  const ul = document.querySelector("ul");
  const numbersArray = [1, 3, 4, 5, 6, 7];
  const isEven = (n) => n % 2 === 0;
  const filteredArray = numbersArray.filter(isEven);
  const fragment=document.createDocumentFragment();
  for (let index=0;index<filteredArray.length;index++) {
    const li=document.createElement('li');
    li.textContent=filteredArray[index];
    fragment.appendChild(li);
  }
  ul.appendChild(fragment);
});
