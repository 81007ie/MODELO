// ================= IMPORTS =================
import { auth, db } from "./firebase-config.js";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

import { doc, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// ================= REGISTRO =================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("registerNombre").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const rol = document.getElementById("registerRol").value;

    if (!nombre || !email || !password || !rol) {
      alert("⚠️ Completa todos los campos.");
      return;
    }

    if (rol !== "admin" && rol !== "profesor") {
      alert("❌ Solo se permiten roles de Profesor o Administrador.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "usuarios", uid), {
        nombre,
        email,
        rol,
        creadoEn: serverTimestamp()
      });

      alert("✅ Usuario registrado con rol: " + rol);
      window.location.href = "login.html";
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("❌ Ese correo ya está registrado.");
      } else if (error.code === "auth/weak-password") {
        alert("❌ La contraseña debe tener al menos 6 caracteres.");
      } else {
        alert("❌ Error: " + error.message);
      }
    }
  });
}

// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
      alert("⚠️ Completa todos los campos");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const docSnap = await getDoc(doc(db, "usuarios", uid));
      if (docSnap.exists()) {
        const userData = docSnap.data();
        localStorage.setItem("rol", userData.rol);
        window.location.href = "inicio.html"; // Redirige a inicio
      } else {
        alert("❌ No se encontró el perfil en Firestore");
      }
    } catch (error) {
      alert("❌ Error: " + error.message);
    }
  });
}

// ================= PERFIL =================
const bienvenida = document.getElementById("bienvenida");
const panelAdmin = document.getElementById("panelAdmin");
const panelProfesor = document.getElementById("panelProfesor");
const logoutBtn = document.getElementById("logoutBtn");

if (bienvenida) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const docSnap = await getDoc(doc(db, "usuarios", user.uid));
      if (docSnap.exists()) {
        const userData = docSnap.data();
        bienvenida.innerText = `Hola ${userData.nombre} (${userData.rol})`;

        if (userData.rol === "admin") panelAdmin.style.display = "block";
        if (userData.rol === "profesor") panelProfesor.style.display = "block";
      }
    } else {
      window.location.href = "login.html";
    }
  });
}

// ================= LOGOUT =================
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    localStorage.removeItem("rol");
    window.location.href = "login.html";
  });
}
