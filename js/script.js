const btnLogin = document.querySelector(".btn-login");

document.body.addEventListener("click", (e) => {
  if (window.innerWidth <= 390) {
    if (
      e.target.className.includes("input-search") ||
      e.target.className.includes("bi-search") ||
      e.target.className.includes("btn-search")
    ) {
      btnLogin.style.display = "none";
    } else {
      btnLogin.style.display = "block";
    }
  }
});
