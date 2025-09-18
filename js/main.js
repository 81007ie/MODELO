import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    const rol = localStorage.getItem("rol");
    const infoUsuario = document.getElementById("infoUsuario");

    if (rol && infoUsuario) {
      infoUsuario.innerText = "Has iniciado sesión como: " + rol;

      if (rol === "admin") document.getElementById("contenidoAdmin").style.display = "block";
      if (rol === "profesor") document.getElementById("contenidoProfesor").style.display = "block";
    }
  } else {
    window.location.href = "login.html";
  }
});

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    localStorage.clear();
    window.location.href = "login.html";
  });
}
