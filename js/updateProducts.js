import { clientServices } from "../services/client-services.js";

const messageError = document.querySelector(".formUpdate-incorrect");
messageError.style.display = "none";

const formAdd = document.querySelector("[data-form]");

const fileProduct = document.querySelector("[data-file]");

formAdd.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameProduct = document.querySelector("[data-name-product]").value;
  let priceProduct = document.querySelector("[data-price]").value;
  priceProduct = `$${priceProduct}`;
  const categoryProduct = document.querySelector("[data-category]").value;
  const descProduct = document.querySelector("[data-desc]").value;

  if (fileProduct.querySelector("h2")) {
    messageError.textContent = "Cargue una foto";
    messageError.style.display = "block";
  } else {
    messageError.style.display = "none";
    clientServices.createProduct(
      nameProduct,
      priceProduct,
      fileUrl,
      categoryProduct,
      descProduct
    );
    Swal.fire("Perfecto!", "Producto creado!", "success").then(() => {});
    window.location.href = "../pages/allProducts.html";
  }
});
