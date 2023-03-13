let file;

const imageTitle = document.querySelector("[data-image-title]");

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
