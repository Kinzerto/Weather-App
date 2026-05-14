import faildImg from '../assets/images/f-mark.svg';

const content = document.querySelector('.content');
const cityLoc = document.querySelector('.city');

export function failed() {
  cityLoc.textContent = '';
  const main = `
<div class="failedContainer">
  <img src="${faildImg}" alt="" />
  <div class="shadow"></div>
  <p>Failed to locate location, Try Again!</p>
</div>
        `;
  content.innerHTML = main;
}
