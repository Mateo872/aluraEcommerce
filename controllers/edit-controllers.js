import { clientServices } from "../services/client-services.js";

const fileProduct = document.querySelector("[data-file]");

let id, image, imageTag;

const getData = async () => {
  const url = new URL(window.location);
  id = url.searchParams.get("id");

  if (id === null) {
    console.log("Hubo error al momento de traer la info de este producto");
  }

  const nameProduct = document.querySelector("[data-name-product]");
  const priceProduct = document.querySelector("[data-price]");
  const categoryProduct = document.querySelector("[data-category]");
  const descProduct = document.querySelector("[data-desc]");

  try {
    const product = await clientServices.detailProduct(id);

    if (
      product.name &&
      product.price &&
      product.descripcion &&
      product.image &&
      product.category
    ) {
      nameProduct.value = product.name;
      priceProduct.value = product.price;
      categoryProduct.value = product.category;
      descProduct.value = product.descripcion;
      image = product.image;

      imageTag = `<img src="${product.image}" alt="" style="width:100%; height:100%; border-radius:5px">`;
      fileProduct.innerHTML = imageTag;
    }
  } catch (error) {
    console.log("catch error", error);
  }
};

getData();

const form = document.querySelector("[data-form]");

const messageError = document.querySelector(".formUpdate-incorrect");
messageError.style.display = "none";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  image = fileProduct.querySelector("img").src;

  const name = document.querySelector("[data-name-product]").value;
  let price = document.querySelector("[data-price]").value;
  price = `$${price}`;
  const category = document.querySelector("[data-category]").value;
  const description = document.querySelector("[data-desc]").value;

  if (fileProduct.querySelector("h2")) {
    messageError.textContent = "Cargue una foto";
    messageError.style.display = "block";
  } else {
    messageError.style.display = "none";
    clientServices
      .updateProduct(name, price, image, id, category, description)
      .then(() => {
        Swal.fire("Perfecto!", "Producto editado!", "success").then(() => {});
        window.location.href = "../pages/allProducts.html";
      });
  }
});
