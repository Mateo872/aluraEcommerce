const user = "alura872@alura.com";
const password = "alura872";

const inputEmail = document.querySelector("[data-email]");

const inputPassword = document.querySelector("[data-password]");

const btnLogin = document.querySelector("[data-login]");

const messageError = document.querySelector(".message-error");

inputEmail.addEventListener("blur", validateInput);
inputPassword.addEventListener("blur", validatePassword);

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputEmail.value !== user || inputPassword.value !== password) {
    messageError.style.display = "block";
    messageError.textContent = "Datos incorrectos";
  } else {
    messageError.style.display = "none";
    window.location.href = "./allProducts.html";
  }
});

function validateInput() {
  if (inputEmail.value.length === 0) {
    inputEmail.style.border = "2px solid red";
  }

  if (this.type === "email") {
    validateEmail(this);
  }
}

function validatePassword() {
  if (inputPassword.value.length > 0) {
    messageError.style.display = "none";
    inputPassword.style.border = "2px solid green";
  } else {
    inputPassword.style.border = "2px solid red";
    messageError.style.display = "block";
    messageError.textContent = "Complete los campos";
  }
}

function validateEmail(e) {
  const message = e.value;

  const er =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (er.test(message.toLowerCase())) {
    messageError.style.display = "none";
    e.style.border = "2px solid green";
  } else {
    e.style.border = "2px solid red";
    messageError.style.display = "block";
    messageError.textContent = "Complete los campos";
  }
}

const btnSubmit = document.querySelector("[data-submit]");
const inputName = document.querySelector("[data-name]");
const inputMessage = document.querySelector("[data-message]");
const message = document.querySelector(".form-incorrect");
const form = document.querySelector("form");

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
