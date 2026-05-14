const content = document.querySelector('.content');
export function loader() {
  const main = `
<section class="area">
  <div class="ball"></div>
</section>
        `;
  content.innerHTML = main;
}
