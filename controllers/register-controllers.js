import { clientServices } from "../services/client-services.js";

const products = document.querySelector(".products");

const showProductsAdmin = (name, price, image, id, category, description) => {
  products.innerHTML += `
    <div class="product">
    <div class="product__delete--edit">
    <i id="${id}" class="bi bi-trash3"></i>
    <a href="../pages/editProduct.html?id=${id}">
      <i class="bi bi-pencil"></i>
    </a>
    </div>

    <div class="product-image">
      <img
        src="${image}"
        alt="Productos"
      />
    </div>
    <h3 class="product-name">${name}</h3>
    <p class="product-price">${price}</p>
  </div>`;

  showDelete();
};

function showDelete() {
  const deleteBtn = products.querySelectorAll(".bi-trash3");

  deleteBtn.forEach((btn) => btn.addEventListener("click", deleteProduct));
}

function deleteProduct(e) {
  const titleProduct =
    e.target.parentElement.parentElement.querySelector("h3").textContent;

  const id = e.target.id;

  Swal.fire({
    title: "Estas seguro?",
    text: `Estás seguro de eliminar el producto ${titleProduct}? Esta acción es irreversible!`,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminarlo!",
  }).then((result) => {
    if (result.isConfirmed) {
      clientServices
        .deleteProduct(id)
        .then((respuesta) => {
          console.log(respuesta);
        })
        .catch((error) => alert("Ocurrio un error al momento de eliminar"));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "El producto ha sido eliminado",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(function () {
        const clearContent = ``;
        products.innerHTML = clearContent;
        showProducts();
      }, 1700);
    }
  });
}
let dataProducts = [];

const showProducts = () => {
  clientServices
    .listProducts()
    .then((data) => {
      dataProducts.push(...data);
      data.forEach(({ name, price, image, id, category, description }) => {
        showProductsAdmin(name, price, image, id, category, description);
      });
    })
    .catch((error) => alert("ocurrio un error"));
};
showProducts();

const btnSubmit = document.querySelector("[data-submit]");
const inputName = document.querySelector("[data-name]");
const inputMessage = document.querySelector("[data-message]");
const message = document.querySelector(".form-incorrect");

message.style.display = "none";

btnSubmit.disabled = true;
btnSubmit.style.opacity = 0.6;

inputName.addEventListener("blur", inputValidateName);
inputMessage.addEventListener("blur", inputValidateMessage);

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  setTimeout(() => {
    inputName.value = "";
    inputMessage.value = "";
    inputName.style.border = "none";
    inputMessage.style.border = "none";
    btnSubmit.disabled = true;
    btnSubmit.style.opacity = 0.6;
  }, 2000);
});

function inputValidateName() {
  const value = inputName.value;

  if (value.length === 0) {
    inputName.style.border = "2px solid red";
    message.style.display = "block";
  } else {
    inputName.style.border = "2px solid green";
    message.style.display = "none";
  }
  if (
    inputName.style.border === "2px solid green" &&
    inputMessage.style.border === "2px solid green"
  ) {
    btnSubmit.disabled = false;
    btnSubmit.style.opacity = 1;
  } else {
    btnSubmit.disabled = true;
    btnSubmit.style.opacity = 0.6;
  }
}
function inputValidateMessage() {
  const value = inputMessage.value;

  if (value.length === 0) {
    inputMessage.style.border = "2px solid red";
    message.style.display = "block";
  } else {
    inputMessage.style.border = "2px solid green";
    message.style.display = "none";
  }
  if (
    inputName.style.border === "2px solid green" &&
    inputMessage.style.border === "2px solid green"
  ) {
    btnSubmit.disabled = false;
    btnSubmit.style.opacity = 1;
  } else {
    btnSubmit.disabled = true;
    btnSubmit.style.opacity = 0.6;
  }
}

const productsContainer = document.querySelector(".products-container");

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
      products.innerHTML = `
          <div class="product-empty-container">
          <h2 class="product-empty">${productEmpty.textContent}</h2>
          <a href="./allProducts.html" class="link-arrow display">
          <img src="../img/Vector (1).png" alt="Flecha derecha" />
          </a>
          </div
          `;
    } else {
      products.innerHTML = `
          <div class="products-title">
          <h2>Todos los productos</h2>
          <a href="./allProducts.html" class="link-arrow display">
          <img src="../img/Vector (1).png" alt="Flecha derecha" />
          </a>
          </div>
          `;
    }

    dataFilter.forEach(({ name, image, price, id }) => {
      products.innerHTML += `
      <div class="product">
      <div class="product__delete--edit">
      <i id="${id}" class="bi bi-trash3"></i>
      <a href="../pages/editProduct.html?id=${id}">
        <i class="bi bi-pencil"></i>
      </a>
      </div>
  
      <div class="product-image">
        <img
          src="${image}"
          alt="Productos"
        />
      </div>
      <h3 class="product-name">${name}</h3>
      <p class="product-price">${price}</p>
    </div>`;

      showDelete();

      if (products.children.length <= 4 || products.children.length === 8) {
        products.style.justifyContent = "center";
        products.style.gap = "3rem";
      } else {
        products.style.justifyContent = "space-between";
        products.style.gap = "0";
      }
    });
  }
}
