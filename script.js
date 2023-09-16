const selectElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error(`Cannot find the element ${selector}`);
};

const form = selectElement("form");
const input = selectElement("input");
const result = selectElement(".result");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = input.value;
  shortenUrl(url);
});

const newUrl = document.createElement("div");
async function shortenUrl(url) {
  try {
    const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
    const data = await res.json();
    newUrl.classList.add("item");
    newUrl.innerHTML = `
   <p>${data.result.short_link}</p>
   <button class="newUrl-btn" >Copy</button>
   `;
    result.prepend(newUrl);
    const copyBtn = result.querySelector(".newUrl-btn");
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(copyBtn.previousElementSibling.textContent);
    });
    input.value = "";
  } catch (err) {
    newUrl.innerHTML = `<p>Something Went Wrong :(</p>`;
    result.prepend(newUrl);
  }
}
