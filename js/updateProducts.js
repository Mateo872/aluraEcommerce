import { clientServices } from "../services/client-services.js";

const imageTitle = document.querySelector("[data-image-title]");

const formAdd = document.querySelector("[data-form]");

let file;

const inputDrag = document.querySelector("[data-drag]");

const fileProduct = document.querySelector("[data-file]");

inputDrag.addEventListener("change", function () {
  file = this.files[0];

  showFile();
});

fileProduct.addEventListener("drop", (e) => {
  e.preventDefault();
  file = e.dataTransfer.files[0];
  showFile();
});

fileProduct.addEventListener("dragover", (e) => {
  e.preventDefault();
  imageTitle.textContent = "Suelte el archivo para cargarlo";
});

fileProduct.addEventListener("dragleave", (e) => {
  e.preventDefault();
  imageTitle.textContent = "Arrastra una imágen";
});

fileProduct.addEventListener("drop", (e) => {
  e.preventDefault();
  file = e.dataTransfer.files[0];
  showFile();
});

let fileUrl;

function showFile() {
  const typeFile = file.type;

  const extensions = ["image/jpeg", "image/jpg", "image/png"];

  if (extensions.includes(typeFile)) {
    let fileReader = new FileReader();

    fileReader.onload = () => {
      fileUrl = fileReader.result;

      const imageTag = `<img src="${fileUrl}" alt="" style="width:100%; height:100%; border-radius:5px">`;

      fileProduct.innerHTML = imageTag;
    };

    fileReader.readAsDataURL(file);
  } else {
    Swal.fire({
      title: "La imagen no tiene un formato valido, debe ser jpeg, jpg o png",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }
}

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
});

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
