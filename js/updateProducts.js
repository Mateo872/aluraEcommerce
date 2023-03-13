import { clientServices } from "../services/client-services.js";

const formAdd = document.querySelector("[data-form]");

formAdd.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameProduct = document.querySelector("[data-name-product]").value;
  const priceProduct = document.querySelector("[data-price]").value;
  const categoryProduct = document.querySelector("[data-category]").value;
  const descProduct = document.querySelector("[data-desc]").value;

  clientServices.createProduct(
    nameProduct,
    priceProduct,
    fileUrl,
    categoryProduct,
    descProduct
  );
  Swal.fire("Perfecto!", "Producto Creado!", "success").then(() => {});
  setTimeout(function () {
    window.location.href = "../pages/allProducts.html";
  }, 2000);
});
