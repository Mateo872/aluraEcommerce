import { clientServices } from "../services/client-services.js";

const productsStarWars = document.querySelector("[data-starwars]");
const productsConsole = document.querySelector("[data-console]");
const productsVarious = document.querySelector("[data-various]");
const productsContainer = document.querySelector(".products");

function showProducts(name, price, descripcion, image, id, category) {
  if (window.innerWidth >= 390 && window.innerWidth <= 768) {
    if (category === "Star wars" && productsStarWars.children.length !== 4) {
      productsStarWars.innerHTML += `
                <div class="product">
                    <div class="product-image">
                        <img src="${image}" alt="Diversos productos" />
                    </div>
                    <h3 class="product-name">${name}</h3>
                    <p class="product-price">${price}</p>
                    <a href="#" class="product-detail">Ver producto</a>
                </div>
      `;
      description();
    } else if (
      category === "Consolas" &&
      productsConsole.children.length !== 4
    ) {
      productsConsole.innerHTML += `
                <div class="product">
                    <div class="product-image">
                        <img src="${image}" alt="Diversos productos" />
                    </div>
                    <h3 class="product-name">${name}</h3>
                    <p class="product-price">${price}</p>
                    <a href="#" class="product-detail">Ver producto</a>
                </div>
      `;
      description();
    } else if (
      category === "Diversos" &&
      productsVarious.children.length !== 4
    ) {
      productsVarious.innerHTML += `
                <div class="product">
                    <div class="product-image">
                        <img src="${image}" alt="Diversos productos" />
                    </div>
                    <h3 class="product-name">${name}</h3>
                    <p class="product-price">${price}</p>
                    <a href="#" class="product-detail">Ver producto</a>
                </div>
      `;
      description();
    }
  } else if (window.innerWidth >= 990) {
    if (category === "Star wars" && productsStarWars.children.length !== 6) {
      productsStarWars.innerHTML += `
                <div class="product">
                    <div class="product-image">
                        <img src="${image}" alt="Diversos productos" />
                    </div>
                    <h3 class="product-name">${name}</h3>
                    <p class="product-price">${price}</p>
                    <a href="#" class="product-detail">Ver producto</a>
                </div>
      `;
      description();
    } else if (
      category === "Consolas" &&
      productsConsole.children.length !== 6
    ) {
      productsConsole.innerHTML += `
                <div class="product">
                    <div class="product-image">
                        <img src="${image}" alt="Diversos productos" />
                    </div>
                    <h3 class="product-name">${name}</h3>
                    <p class="product-price">${price}</p>
                    <a href="#" class="product-detail">Ver producto</a>
                </div>
      `;
      description();
    } else if (
      category === "Diversos" &&
      productsVarious.children.length !== 6
    ) {
      productsVarious.innerHTML += `
                <div class="product">
                    <div class="product-image">
                        <img src="${image}" alt="Diversos productos" />
                    </div>
                    <h3 class="product-name">${name}</h3>
                    <p class="product-price">${price}</p>
                    <a href="#" class="product-detail">Ver producto</a>
                </div>
      `;
      description();
    }
  }
}
const productOverlay = document.querySelector(".product__description--overlay");

function description() {
  const linkDetail = document.querySelectorAll(".product-detail");

  linkDetail.forEach((e) => {
    e.addEventListener("click", showDetail);
  });
}

function showDetail(e) {
  e.preventDefault();

  const nameProduct = e.target.parentElement.querySelector("h3").textContent;

  const productDescriptionFilter = dataProducts.filter(
    (product) => product.name === nameProduct
  );

  productOverlay.style.display = "flex";

  productOverlay.innerHTML = `
  <div class="product__description">
    <i class="bi bi-x-lg"></i>
    <div class="product-description--image">
      <img src="${productDescriptionFilter[0].image}" alt="" />
    </div>
    <h3>${productDescriptionFilter[0].name}</h3>
    <p>
      ${productDescriptionFilter[0].description}
    </p>
  </div>
  `;
  closeProductDescription();
}

productOverlay.addEventListener("click", (e) => {
  if (e.target.className === "product__description--overlay") {
    productOverlay.style.display = "none";
  }
});

function closeProductDescription() {
  const iconDelete = document.querySelector(".bi-x-lg");

  iconDelete.addEventListener("click", () => {
    productOverlay.style.display = "none";
  });
}

let dataProducts = [];

clientServices.listProducts().then((data) => {
  dataProducts.push(...data);
  data.forEach(({ name, price, description, image, id, category }) => {
    if (category === "Star wars") {
      showProducts(name, price, description, image, id, category);
    } else if (category === "Consolas") {
      showProducts(name, price, description, image, id, category);
    } else if (category === "Diversos") {
      showProducts(name, price, description, image, id, category);
    }
  });
});

const inputSearch = document.querySelector(".input-search");

const productEmpty = document.createElement("h2");

productEmpty.classList.add("product-empty");

productEmpty.textContent = "No se encuentra ningún producto con ese título";

inputSearch.addEventListener("keyup", search);

function search(e) {
  const value = e.target.value;

  if (e.key === "Enter" && value != 0) {
    const dataFilter = dataProducts.filter((letter) =>
      letter.name.toLowerCase().includes(value.toLowerCase())
    );

    if (dataFilter.length == 0) {
      productsContainer.innerHTML = `
          <div class="product-empty-container">
          <h2 class="product-empty">${productEmpty.textContent}</h2>
          <a href="./index.html" class="link-arrow display">
          <img src="./img/Vector (1).png" alt="Flecha derecha" />
          </a>
          </div
          `;
    } else {
      productsContainer.innerHTML = `
          <div class="products-title">
          <h2>Todos los productos</h2>
          <a href="./index.html" class="link-arrow display">
          <img src="./img/Vector (1).png" alt="Flecha derecha" />
          </a>
          </div>
          `;
    }

    dataFilter.forEach(({ name, image, price }) => {
      productsContainer.innerHTML += `
              <div class="product">
                  <div class="product-image">
                      <img src="${image}" alt="Productos" />
                  </div>
                  <h3 class="product-name">${name}</h3>
                  <p class="product-price">${price}</p>
                  <a href="#" class="product-detail">Ver producto</a>
              </div>
                `;

      if (
        productsContainer.children.length <= 4 ||
        productsContainer.children.length === 8
      ) {
        productsContainer.style.justifyContent = "center";
        productsContainer.style.gap = "3rem";
      } else {
        productsContainer.style.justifyContent = "space-between";
        productsContainer.style.gap = "0";
      }
    });
    productsContainer.appendChild(productOverlay);
    description();
  }
}

const bannerImage = document.querySelector(".banner");

const allProductsBtn = document.querySelectorAll(".allProducts");

allProductsBtn.forEach((btn) => btn.addEventListener("click", allProducts));

function allProducts(e) {
  bannerImage.querySelector("h1").style.display = "none";
  bannerImage.querySelector("h3").style.display = "none";
  bannerImage.querySelector("a").style.display = "none";

  const arrowBack = document.querySelectorAll(".link-arrow");

  const titleStarWars = document.querySelector(".title-starwars");
  const titleConsole = document.querySelector(".title-console");
  const titleVarious = document.querySelector(".title-various");

  const productCategory = document.querySelector(".product__category");

  const allTitle = e.currentTarget.parentElement
    .querySelector("h2")
    .textContent.toLowerCase();

  allProductsBtn.forEach((e) => (e.style.display = "none"));

  arrowBack.forEach((e) => (e.style.display = "block"));

  if (allTitle == "star wars") {
    productsStarWars.style.display = "flex";
    productsConsole.style.display = "none";
    productsVarious.style.display = "none";
    titleStarWars.style.display = "flex";
    titleVarious.style.display = "none";
    titleConsole.style.display = "none";
    bannerImage.style.backgroundImage =
      "url(../img/daniel-k-cheung-cPF2nlWcMY4-unsplash.jpg)";

    const categoryStar = dataProducts.filter(
      (category) => category.category == "Star wars"
    );

    productCategory.innerHTML = "";

    categoryStar.map((product) => {
      productCategory.innerHTML += `
        <div class="product">
            <div class="product-image">
                <img src="${product.image}" alt="Star wars productos" />
            </div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${product.price}</p>
            <a href="#" class="product-detail">Ver producto</a>
        </div>
          `;
    });
  } else if (allTitle == "consolas") {
    productsStarWars.style.display = "none";
    productsConsole.style.display = "flex";
    productsVarious.style.display = "none";
    titleStarWars.style.display = "none";
    titleVarious.style.display = "none";
    titleConsole.style.display = "flex";
    bannerImage.style.backgroundImage =
      "url(../img/louis-philippe-poitras-WMMh6BtmTMo-unsplash.jpg)";

    const categoryConsole = dataProducts.filter(
      (category) => category.category == "Consolas"
    );

    productsConsole.innerHTML = "";

    categoryConsole.map((product) => {
      productsConsole.innerHTML += `
        <div class="product">
            <div class="product-image">
                <img src="${product.image}" alt="Consolas productos" />
            </div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${product.price}</p>
            <a href="#" class="product-detail">Ver producto</a>
        </div>
          `;
    });
  } else if (allTitle == "diversos") {
    productsVarious.style.display = "flex";
    productsStarWars.style.display = "none";
    productsConsole.style.display = "none";
    titleVarious.style.display = "flex";
    titleStarWars.style.display = "none";
    titleConsole.style.display = "none";
    bannerImage.style.backgroundImage =
      "url(../img/parker-burchfield-tvG4WvjgsEY-unsplash.jpg)";

    const categoryVarious = dataProducts.filter(
      (category) => category.category == "Diversos"
    );

    productsVarious.innerHTML = "";

    categoryVarious.map((product) => {
      productsVarious.innerHTML += `
        <div class="product">
            <div class="product-image">
                <img src="${product.image}" alt="Diversos productos" />
            </div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${product.price}</p>
            <a href="#" class="product-detail">Ver producto</a>
        </div>
          `;
    });
  }
  description();
}
