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
