"use strict";

const STRING_COLTHES_TYPE = "clothesType";
const STRING_COLOR_TYPE = "colorType";
const productContainer = document.getElementById("product-continer");

const loadProducts = async () => {
  console.log("[loadProducts]");
  const res = await fetch("/data/data.json");
  const json = await res.json();
  return json.products;
};

const displayProducts = (products) => {
  console.log("[displayProducts]");
  productContainer.innerHTML = products.map((product) =>
    createHTMLString(product),
  );
};

const createHTMLString = ({ img, type, size }) => {
  console.log("[createHTMLString]");
  return `
    <li class="bg-white w-[400px] flex items-center p-4 rounded-sm">
      <img class="w-[40px] mr-4" src="${img}" alt="${type} img" />
      <h2><span class="capitalize">${type}</span>, ${size}</h2>
    </li>
  `;
};

const onHandleNav = (e, products) => {
  console.log("[onHandleNav]");
  const key = e.target.dataset.key;
  const value = e.target.dataset.value;

  if (!key || !value) return;

  const filteredProducts = products.filter((cV) =>
    key === "clothes" ? cV.type === value : cV.color === value,
  );

  displayProducts(filteredProducts);
};

const setEventListeners = (products) => {
  const navContainer = document.getElementById("nav-container");
  navContainer.addEventListener("click", (e) => onHandleNav(e, products));
};

// main 로직
loadProducts() //
  .then((products) => {
    displayProducts(products);
    setEventListeners(products);
  })
  .catch((err) => console.log(err));
