// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Configuración de Firebase (copiada de la consola Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyCc69igkfssss8-OJZx9BMvRKMn1grayHs",
  authDomain: "modelo-f1cf3.firebaseapp.com",
  projectId: "modelo-f1cf3",
  storageBucket: "modelo-f1cf3.appspot.com", // 👈 corregido
  messagingSenderId: "747645003544",
  appId: "1:747645003544:web:65422cf0f1c343d39de06d"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar los servicios que usas en auth.js y main.js
export const auth = getAuth(app);
export const db = getFirestore(app);
