// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARmeHwr-A-Tyv7AY2l7DopUOP5jRJrurU",
  authDomain: "huelllita.firebaseapp.com",
  projectId: "huelllita",
  storageBucket: "huelllita.firebasestorage.app",
  messagingSenderId: "869836811352",
  appId: "1:869836811352:web:3435154009a24cf86c2e2d",
  measurementId: "G-HNW37F01B9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Inicializamos la base de datos
const db = getDatabase(app);


let inputDni = document.querySelector("#dni")
let inputNombre = document.querySelector("#numero")
let inputRaza= document.querySelector("#raza")
let inputEdad = document.querySelector("#edad")
let inputDueño = document.querySelector("#dueño")
let inputNumero = document.querySelector("#numero")
let btnAgregar = document.querySelector("#Registrar")


btnAgregar.onclick = function () {
    //Esto asegura que cada estudiante se almacene bajo su dni
    let mascotasRef = ref(db, 'mascotas/' + inputDni.value);

    set(mascotasRef, {
        //Tomamos cada dato desde los inputs del formulario
        dni: inputDni.value,
        nombre: inputNombre.value,
        raza: inputRaza.value,
        edad: inputEdad.value,
        dueño: inputDueño.value,
        numero: inputNumero.value
    })

        .then(() => {
            alert("Mascota agregada correctamente");
        })
       
        .catch((error) => {
            alert("Error al agregar a la mascota: " + error.message);
        }); 

}
let tabla = document.querySelector('.tabla-mascotas')
let mascotasRef = ref(db, 'mascotas/');
onValue(mascotasRef, (datos) => {
    console.log(datos)
    //Obtenemos la información de los estudiantes
    let dueño = datos.val();
    console.log(dueño)
    //Limpiamos la lista antes de actualizarla
    tabla.innerHTML = "";
    //Recorremos los datos obtenidos de los estudiantes
    for (let dni in dueño) {
        tabla.innerHTML += `
        <tr>
            <td>${dni}</td>
            <td>${dueño[dni].nombre}</td>
            <td>${dueño[dni].raza}</td>
            <td>${dueño[dni].edad}</td>
            <td>${dueño[dni].dueño}</td>
            <td>${dueño[dni].numero}</td>
        </tr>
        `;
        
    }

})


    