//Local storage usuario:

class Usuario {
    constructor(nombre, email, avatar){
        this.nombre = nombre;
        this.email = email;
        this.resultados = [];
        this.avatar = avatar;
        this.puntaje = 0;
    }
}

const usuarios = JSON.parse(localStorage.getItem("Usuarios")) ?? [];

const cartelCrearUsuario = document.getElementById("cartelCrearUsuario");

if((cartelCrearUsuario != null) && (usuarios.length == 0)) {
    cartelCrearUsuario.innerHTML =`
    <h3>Para jugar, tendrás crear un usuario</h3>
    <button><a href="../perfil.html"> Haz click aquí</a></button>
    `
    console.log("true");
}

const idFormulario = document.getElementById("formulario");

if((usuarios.length <= 0) && (idFormulario != null)){
    idFormulario.innerHTML += `
    <img src="../assets/user0default.svg" alt="" class="perfil" id="perfil">
    <div id="divAvatar"></div>
    <label for="nombreForm" class="label" id="nombreFormLabel">Nombre</label>
    <input type="text" class="input" id="nombreForm" required>
    <label for="emailForm" class="label" id="emailFormLabel">Correo Electrónico</label>
    <input type="email" class="input" id="emailForm" required>
    <button type="submit" class="botonSubmit">Crear Usuario</button>
    `
const divAvatar = document.getElementById("divAvatar");


function mostrarAvatars(){
    const avatares = fetch("../json/img-users.json");
    const avataresParseados = avatares.json();
    avataresParseados.forEach((imagen, indice) => {
        divAvatar.innerHTML += `
            <img id="avatar${indice}" src="../assets/${imagen.url}">
            `
    })
}


const perfil = document.getElementById("perfil");

mostrarAvatars().then( () => {

    const avatar0 = document.getElementById("avatar0");
    const avatar1 = document.getElementById("avatar1");
    const avatar2 = document.getElementById("avatar2");
    const avatar3 = document.getElementById("avatar3");
    const avatar4 = document.getElementById("avatar4");
    const avatar5 = document.getElementById("avatar5");
    const avatar6 = document.getElementById("avatar6");
    const avatar7 = document.getElementById("avatar7");
    const avatar8 = document.getElementById("avatar8");

    avatar0.addEventListener("click", () =>{
        perfil.src = avatar0.src;
        perfil.classList.remove("user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8");
        perfil.classList.add("user0");
        console.log(perfil);
    });
    avatar1.addEventListener("click", () =>{
        perfil.src = avatar1.src
        perfil.classList.remove("user0", "user2", "user3", "user4", "user5", "user6", "user7", "user8");
        perfil.classList.add("user1");
        console.log(perfil);
    });
    avatar2.addEventListener("click", () =>{
        perfil.src = avatar2.src;
        perfil.classList.remove("user0", "user1", "user3", "user4", "user5", "user6", "user7", "user8");
        perfil.classList.add("user2");
        console.log(perfil);
    });
    avatar3.addEventListener("click", () =>{
        perfil.src = avatar3.src;
        perfil.classList.remove("user0", "user1", "user2", "user4", "user5", "user6", "user7", "user8");
        perfil.classList.add("user3");
        console.log(perfil);
    });
    avatar4.addEventListener("click", () =>{
        perfil.src = avatar4.src;
        perfil.classList.remove("user0", "user1", "user2", "user3", "user5", "user6", "user7", "user8");
        perfil.classList.add("user4");
        console.log(perfil);
    });
    avatar5.addEventListener("click", () =>{
        perfil.src = avatar5.src;
        perfil.classList.remove("user0", "user1", "user2", "user3", "user4", "user6", "user7", "user8");
        perfil.classList.add("user5");
        console.log(perfil);
    });
    avatar6.addEventListener("click", () =>{
        perfil.src = avatar6.src;
        perfil.classList.remove("user0", "user1", "user2", "user3", "user4", "user5", "user7", "user8");
        perfil.classList.add("user6");
        console.log(perfil);
    });
    avatar7.addEventListener("click", () =>{
        perfil.src = avatar7.src;
        perfil.classList.remove("user0", "user1", "user2", "user3", "user4", "user5", "user6", "user8");
        perfil.classList.add("user7");
        console.log(perfil);
    });
    avatar8.addEventListener("click", () =>{
        perfil.src = avatar8.src;
        perfil.classList.remove("user0", "user1", "user2", "user3", "user4", "user5", "user6", "user7");
        perfil.classList.add("user8");
        console.log(perfil);
    });
})
}


if(idFormulario != null){
    idFormulario.addEventListener("submit",(e) => {
        e.preventDefault();
        let nombre = document.getElementById("nombreForm").value;
        let email = document.getElementById("emailForm").value;
        let avatar = perfil.classList[1] ?? "user0default"
        let usuario = new Usuario (nombre, email, avatar);
        usuarios.push(usuario);
        localStorage.setItem("Usuarios", JSON.stringify(usuarios));
        idFormulario.reset();
        location.href = "../index.html"
    })
    let infoLocalSUsuario;
    const infoUsuario = document.getElementById("infoUsuario");
    if (localStorage.getItem("Usuarios")) {
        infoLocalSUsuario = JSON.parse(localStorage.getItem("Usuarios"));
        infoLocalSUsuario.forEach((usuario) =>{
            infoUsuario.innerHTML +=`<p>NOMBRE</p>
            <p>TAMAÑO</p><p>TIEMPO</p>`
            usuario.resultados.forEach((resultados) =>{
                infoUsuario.innerHTML +=`
                <p class="infoUsuarioP">${resultados}</p>
                `
            })
        })
    }
}

//Creo una clase para crear un juego predeterminado:

class JuegoPredeterminado{
    constructor(id,nombre,tablerojuego,tamano){
        this.id = id;
        this.nombre = nombre;
        this.tablerojuego = tablerojuego;
        this.tamano = tamano;
    }
}

//Aumentar en uno el último elemento del array:
function aumentarValorIndiceFinal(horizontal){
    let indiceFinal = horizontal.length - 1;
    horizontal[indiceFinal]++;
}

//Dice por cada fila del tablero, la cantidad de casilleros que deben pintarse y devuelve un array con la información necesaria:
function informacionFilas(objeto){
    let filaFiltrada;
    let arrayFila = [];
    for (let i=0 ; i< objeto.tablerojuego.length; i++){
        let fila = [0];
        for (let j=0 ; j<objeto.tablerojuego[i].length; j++){
            // si cada elemento del array que recorremos es un 0, pusheamos un 0 en un nuevo array, si es 1 se lo sumamos al último elemento del array
            if(objeto.tablerojuego[i][j] === 1){
                aumentarValorIndiceFinal(fila);
            }else{
                fila.push(0);
            }
        }
        //Filtro todos los elementos del array que sea 0:
        filaFiltrada = fila.filter(valor => valor != 0);
        //Pusheo los arrays filtrados a las filas:
        arrayFila.push(filaFiltrada);
    }
return arrayFila;
}

//Función que dice por cada columna del tablero, la cantidad de casilleros que deben pintarse, retorna un array con la info. necesaria.


function informacionColumnas(objeto){
    let columnaFiltrada;
    let arrayColumna = [];
    for (let i=0 ; i< objeto.tablerojuego.length; i++){
        let columna = [0];
        for (let j=0 ; j<objeto.tablerojuego[i].length; j++){
            if(objeto.tablerojuego[j][i] === 1){
                aumentarValorIndiceFinal(columna);
            }else{
                columna.push(0);
            }
        }
        columnaFiltrada = columna.filter(valor => valor != 0);
        arrayColumna.push(columnaFiltrada);
    }
return arrayColumna
}

//Función para cuando el usuario quiere jugar un juego random/no predeterminado; el usuario podrá elegir la cantidad de filas y columnas. 
function crearTableroRandom (filas,columnas){
arrayTablero =[];
    for(let j = 0 ; j<filas; j++){
        let arrayfilas = [];
    for(let i=0 ; i<columnas ; i++){
    const random = (Math.random());
    const redondeado = Math.round(random);
    arrayfilas.push(redondeado);
    }
    arrayTablero.push(arrayfilas);
    }
    return arrayTablero;
}

let vidas = 5;

//Mostrar en dom el juego:
function dom (nombrediv, tablero){
    let puntajeTablero = document.getElementById("puntajeTablero");
    puntajeTablero.innerHTML +=`
        <h1 id="nombreJuego">${tablero.nombre}</h1> <p id="puntajeTableroContador"></p>`
        nombrediv.innerHTML +=`
    <div class="gridTablero${tablero.tamano}">
        <button class="botonVerde" id="boton">
            <div class="circuloBoton" id="circuloBoton"></div>
        </button>
        <div class="infoColumn${tablero.tamano}" id="infoColumn" ></div>
        <div class="infoFilas${tablero.tamano}"id="infoFilas" ></div>
        <div class="casilleros${tablero.tamano}"id="casilleros${tablero.id}"></div>
        <div class="reloj">
            <img class="btnPause pause" id="pause" src="../../assets/playpause.png" alt="">
        </div>
    </div>
    `
    const infoColumn = document.getElementById(`infoColumn`);
    const infoFilas = document.getElementById(`infoFilas`);
    const casilleros = document.getElementById(`casilleros${tablero.id}`);
    for(let i = 0 ; i<tablero.informacionColumnas.length ; i++){
        infoColumn.innerHTML +=`
        <p id="infoColumnp${i}">${tablero.informacionColumnas[i].join("</br>")}</p>`
    }
    for(let i = 0 ; i<tablero.informacionFilas.length ; i++){
        infoFilas.innerHTML +=`
        <p id="infoFila${i}">${tablero.informacionFilas[i].join(" ")}</p>`
    }
    for(let i = 0 ; i <tablero.tablerojuego.length ; i++){
        for(let j = 0 ; j<tablero.tablerojuego[i].length ; j++){
            casilleros.innerHTML +=`
            <p class="celdas celdas${tablero.tamano}">${tablero.tablerojuego[i][j]}</p>
        `
        }
    }
}

//Creo un tablero random/no predeterminado: 
let tableroRandom = crearTableroRandom(5,5) ;
const juegoRandom = new JuegoPredeterminado(1000, "random-5x5", tableroRandom, "5x5");
juegoRandom.informacionFilas = informacionFilas(juegoRandom);
juegoRandom.informacionColumnas = informacionColumnas(juegoRandom);

let tableroRandom10x10 = crearTableroRandom(10,10);
const juegoRandom10 = new JuegoPredeterminado(1001, "random-10x10", tableroRandom10x10, "10x10");
juegoRandom10.informacionFilas = informacionFilas(juegoRandom10);
juegoRandom10.informacionColumnas = informacionColumnas(juegoRandom10);


//Creo los tableros:
const tablero1_5x5 = new JuegoPredeterminado (1, "castillo", [
    [1,0,1,0,1],
    [0,1,1,1,0],
    [0,1,1,1,0],
    [0,1,1,1,0],
    [0,1,0,1,0]], "5x5");

const tablero2_5x5 = new JuegoPredeterminado (2, "boton", [
    [0,1,1,1,0],
    [1,1,1,1,1],
    [1,0,1,0,1],
    [1,1,1,1,1],
    [0,1,1,1,0]], "5x5");

const tablero3_5x5 = new JuegoPredeterminado (3, "pausa", [
    [1,1,1,1,1],
    [1,0,1,0,1],
    [1,0,1,0,1],
    [1,0,1,0,1],
    [1,1,1,1,1]], "5x5");

const tablero4_5x5 = new JuegoPredeterminado (4, "cangrejo", [
    [1,0,0,0,1],
    [1,1,1,1,1],
    [0,1,1,1,0],
    [1,1,0,1,1],
    [1,0,0,0,1]], "5x5");

const tablero5_5x5 = new JuegoPredeterminado (5, "beso", [
    [0,0,0,0,0],
    [0,1,0,1,0],
    [1,1,1,1,1],
    [0,1,1,1,0],
    [0,0,0,0,0]], "5x5");

const tablero6_5x5 = new JuegoPredeterminado(6, "e", [
    [0,1,1,1,0],
    [0,1,0,0,0],
    [0,1,1,1,0],
    [0,1,0,0,0],
    [0,1,1,1,0]], "5x5");

const tablero7_5x5 = new JuegoPredeterminado(7, "sonrisa",[
    [1,1,1,1,1],
    [1,0,1,0,1],
    [1,1,1,1,1],
    [1,0,1,0,1],
    [1,1,0,1,1]], "5x5");

const tablero8_5x5 = new JuegoPredeterminado(8, "fantasma", [
    [0,1,1,1,0],
    [1,0,1,0,1],
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,1,1,1,1]], "5x5");

const tablero9_5x5 = new JuegoPredeterminado(9, "vendetta", [
    [0,1,1,1,0],
    [0,1,1,1,0],
    [0,1,1,1,0],
    [1,0,1,0,1],
    [1,1,0,1,1]], "5x5");

const tablero10_5x5 = new JuegoPredeterminado(10,"x", [
    [0,1,1,1,0],
    [1,0,1,0,1],
    [1,1,0,1,1],
    [1,0,1,0,1],
    [0,1,1,1,0]], "5x5");

let arrayJuegos5x5 = [juegoRandom,tablero1_5x5,tablero2_5x5,tablero3_5x5,tablero4_5x5,tablero5_5x5,tablero6_5x5,tablero7_5x5,tablero8_5x5,tablero9_5x5,tablero10_5x5];

arrayJuegos5x5.forEach(tablero =>{
    tablero.informacionFilas = informacionFilas(tablero);
    tablero.informacionColumnas = informacionColumnas(tablero);
})


const tablero1_10x10 = new JuegoPredeterminado(41, "computadora", [
    [1,0,1,0,1,1,1,1,1,1],
    [0,1,0,1,1,0,0,0,0,1],
    [1,0,1,0,1,0,1,1,0,1],
    [0,1,0,1,1,0,1,1,0,1],
    [1,1,1,1,1,0,0,0,0,1],
    [0,0,0,1,1,1,1,1,1,1],
    [0,0,1,1,0,0,0,0,0,1],
    [0,1,1,0,1,0,1,0,1,1],
    [1,1,0,0,0,0,0,1,1,0],
    [1,1,1,1,1,1,1,1,0,0]], "10x10");

const tablero2_10x10 = new JuegoPredeterminado(42, "shorts", [
    [0,0,0,1,0,0,0,0,0,1],
    [0,0,0,1,0,1,1,1,0,1],
    [0,0,0,1,1,1,0,1,1,1],
    [0,0,0,1,0,1,0,1,0,1],
    [0,0,0,1,0,1,0,1,0,1],
    [0,0,0,1,0,1,0,1,0,1],
    [0,0,0,1,0,1,0,1,0,1],
    [0,0,0,1,0,1,0,1,0,1],
    [0,0,1,1,1,1,0,1,1,1],
    [0,1,1,1,1,1,0,1,1,1]], "10x10");

const tablero3_10x10 = new JuegoPredeterminado(43, "cena", [
    [1,0,1,0,1,0,1,1,1,0],
    [1,0,1,0,1,0,1,1,0,0],
    [1,0,1,0,1,0,1,0,0,0],
    [1,0,1,0,1,0,1,0,0,0],
    [1,0,0,0,0,0,1,0,0,0],
    [1,1,0,0,0,1,1,0,0,0],
    [1,1,1,0,1,1,1,1,0,0],
    [1,1,1,0,1,1,1,1,0,0],
    [1,1,1,0,1,1,1,1,1,0],
    [1,1,1,0,1,1,1,1,1,0]], "10x10");

const tablero4_10x10 = new JuegoPredeterminado(44, "juego-ruso", [
    [1,1,1,1,1,1,0,0,0,0],
    [1,1,0,1,1,1,1,1,1,1],
    [1,1,0,1,1,1,1,0,1,1],
    [1,0,0,1,1,1,1,0,0,1],
    [1,1,1,1,1,1,1,0,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,0,1,0],
    [0,1,1,1,1,1,0,0,1,0],
    [0,1,1,1,0,1,1,1,1,0],
    [0,0,1,0,0,0,1,1,1,0]], "10x10");

const tablero5_10x10 = new JuegoPredeterminado(45, "monstruo", [
    [1,1,0,0,0,0,0,0,0,1],
    [1,1,0,1,1,1,1,1,0,1],
    [1,0,0,1,0,1,0,1,0,0],
    [0,0,1,1,1,1,1,1,1,0],
    [0,1,1,1,0,0,0,1,1,0],
    [1,1,1,1,1,1,1,1,0,0],
    [1,1,1,1,1,1,1,0,0,1],
    [1,1,1,1,1,1,1,0,0,1],
    [1,1,1,0,0,1,1,1,0,0],
    [1,1,1,1,0,1,1,1,1,1]], "10x10");

const tablero6_10x10 = new JuegoPredeterminado(46, "congelado", [
    [0,0,0,1,0,0,0,0,0,0],
    [0,0,1,1,1,0,0,0,0,0],
    [0,0,1,1,1,0,0,0,0,0],
    [0,0,0,1,0,0,0,1,0,0],
    [0,0,1,1,1,1,1,0,0,0],
    [0,0,1,0,1,0,0,0,0,0],
    [0,1,1,1,1,1,0,0,0,0],
    [0,1,1,0,1,1,0,0,0,0],
    [1,1,1,1,1,1,0,1,1,1],
    [1,1,1,1,1,1,1,1,1,1]], "10x10");

const tablero7_10x10 = new JuegoPredeterminado(47, "egipto", [
    [1,0,0,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,1],
    [0,0,1,0,0,0,0,0,1,1],
    [0,1,1,1,0,0,0,1,1,1],
    [1,1,1,1,1,0,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1]], "10x10");


let arrayJuegos10x10 = [juegoRandom10,tablero1_10x10,tablero2_10x10,tablero3_10x10,tablero4_10x10,tablero5_10x10,tablero6_10x10,tablero7_10x10];

arrayJuegos10x10.forEach(tablero =>{
    tablero.informacionFilas = informacionFilas(tablero);
    tablero.informacionColumnas = informacionColumnas(tablero);
})


// Mostrar en DOM

const ulLista5x5 = document.getElementById("ulLista5x5");
const ulLista10x10 = document.getElementById("ulLista10x10");

let infoLocalSUsuario = JSON.parse(localStorage.getItem("Usuarios"));

if((ulLista5x5 != null) && (usuarios.length != 0)){
    arrayJuegos5x5.forEach(juego =>{
        let infoLocalSUsuario = JSON.parse(localStorage.getItem("Usuarios"));
        if(infoLocalSUsuario[0].resultados.some ((el) => el == juego.nombre.toUpperCase())){
            let indice = infoLocalSUsuario[0].resultados.indexOf(juego.nombre.toUpperCase());
            ulLista5x5.innerHTML += `
            <li>
                <a class="listaTablero"href="./${juego.nombre}.html">
                    <img src="../../assets/listo.svg" alt="">
                    ${juego.nombre};
                    <p>${infoLocalSUsuario[0].resultados[indice + 2]}</p>
                </a>
            </li>
            `
        } else{
            ulLista5x5.innerHTML += `
            <li>
                <a class="listaTablero"href="./${juego.nombre}.html">
                    <img src="../../assets/nolisto.svg" alt="">
                    ${juego.nombre};
                    <p></p>
                </a>
            </li>
            `
        }
    })
}

if(ulLista10x10 != null){
    arrayJuegos10x10.forEach(juego =>{
        let infoLocalSUsuario = JSON.parse(localStorage.getItem("Usuarios"))
        if(infoLocalSUsuario[0].resultados.some ((el) => el == juego.nombre.toUpperCase())){
            let indice = infoLocalSUsuario[0].resultados.indexOf(juego.nombre.toUpperCase());
            ulLista10x10.innerHTML += `
            <li>
                <a class="listaTablero"href="./${juego.nombre}.html">
                    <img src="../../assets/listo.svg" alt="">
                    ${juego.nombre};       
                    <p>${infoLocalSUsuario[0].resultados[indice + 2]}</p>
                </a>
            </li>
            `
        } else{
            ulLista10x10.innerHTML += `
            <li>
                <a class="listaTablero"href="./${juego.nombre}.html">
                    <img src="../../assets/nolisto.svg" alt="">
                    ${juego.nombre};
                    <p></p>
                </a>
            </li>
            `
        }
    })
}


// creo constantes de divs que tengo en el HTML (5x5):

const aleatorioDiv = document.getElementById("aleatorioDiv");
const castilloDiv = document.getElementById("castilloDiv");
const botonDiv = document.getElementById("botonDiv");
const pausaDiv = document.getElementById("pausaDiv");
const cangrejoDiv = document.getElementById("cangrejoDiv");
const besoDiv = document.getElementById("besoDiv");
const eDiv = document.getElementById("eDiv");
const sonrisaDiv = document.getElementById("sonrisaDiv");
const fantasmaDiv = document.getElementById("fantasmaDiv");
const vendettaDiv = document.getElementById("vendettaDiv");
const xDiv = document.getElementById("xDiv");


// aplico la funcion DOM, para que mis tableros se muestren en el HTML:

if(aleatorioDiv != null){
    dom(aleatorioDiv, juegoRandom);
}

if(castilloDiv != null){
    dom(castilloDiv, tablero1_5x5);
}

if(botonDiv != null){
    dom(botonDiv, tablero2_5x5);
}

if(pausaDiv != null){
    dom(pausaDiv, tablero3_5x5);
}

if(cangrejoDiv != null){
    dom(cangrejoDiv, tablero4_5x5)
}

if(besoDiv != null){
    dom(besoDiv, tablero5_5x5);
}

if(eDiv != null){
    dom(eDiv, tablero6_5x5);
}
if(sonrisaDiv != null){
    dom(sonrisaDiv, tablero7_5x5);
}
if(fantasmaDiv != null){
    dom(fantasmaDiv, tablero8_5x5);
}
if(vendettaDiv != null){
    dom(vendettaDiv, tablero9_5x5);
}
if(xDiv != null){
    dom(xDiv, tablero10_5x5);
}

// 10x10
const aleatorio10Div = document.getElementById("aleatorio10Div");
const computadoraDiv = document.getElementById("computadoraDiv");
const shortsDiv = document.getElementById("shortsDiv");
const cenaDiv = document.getElementById("cenaDiv");
const juegoDiv = document.getElementById("juegoDiv");
const monstruoDiv = document.getElementById("monstruoDiv");
const congeladoDiv = document.getElementById("congeladoDiv");
const egiptoDiv = document.getElementById("egiptoDiv");


if(aleatorio10Div != null){
    dom(aleatorio10Div, juegoRandom10);
}
if(computadoraDiv != null){
    dom(computadoraDiv, tablero1_10x10);
}
if(shortsDiv != null){
    dom(shortsDiv, tablero2_10x10);
}
if(cenaDiv != null){
    dom(cenaDiv, tablero3_10x10)
}
if(juegoDiv != null){
    dom(juegoDiv, tablero4_10x10);
}
if(monstruoDiv != null){
    dom(monstruoDiv, tablero5_10x10);
}
if(congeladoDiv != null){
    dom(congeladoDiv, tablero6_10x10);
}
if(egiptoDiv != null){
    dom(egiptoDiv, tablero7_10x10);
}


// Traigo los elementos del DOM al JS:

const p = document.getElementsByClassName("celdas");
const vidasP = document.getElementById("vidas");
let resultado = document.getElementById("resultado");
let infoFila0 = document.getElementById("infoFila0");
let infoFila1 = document.getElementById("infoFila1");
let infoFila2 = document.getElementById("infoFila2");
let infoFila3 = document.getElementById("infoFila3");
let infoFila4 = document.getElementById("infoFila4");
let infoFila5 = document.getElementById("infoFila5");
let infoFila6 = document.getElementById("infoFila6");
let infoFila7 = document.getElementById("infoFila7");
let infoFila8 = document.getElementById("infoFila8");
let infoFila9 = document.getElementById("infoFila9");

let infoColumnp0 = document.getElementById("infoColumnp0");
let infoColumnp1 = document.getElementById("infoColumnp1");
let infoColumnp2 = document.getElementById("infoColumnp2");
let infoColumnp3 = document.getElementById("infoColumnp3");
let infoColumnp4 = document.getElementById("infoColumnp4");
let infoColumnp5 = document.getElementById("infoColumnp5");
let infoColumnp6 = document.getElementById("infoColumnp6");
let infoColumnp7 = document.getElementById("infoColumnp7");
let infoColumnp8 = document.getElementById("infoColumnp8");
let infoColumnp9 = document.getElementById("infoColumnp9");


//Para verificar las celdas que se clickean: 
//si vale 0 o si vale 1 y si además está activo, de filas y columnas y por ultimo lo junto todo en una función:

function verificacionF(desde, hasta, datodom, tamanoTablero){
    let condicion = [];
    let filtrado;
    for(let i = desde ; i < hasta ; i++){
        if((p[i].innerText == 1 && p[i].classList[2] == "activo") || (p[i].innerText == 0 )){
            condicion.push("listo");
        }
    }
    filtrado = condicion.filter(valor => valor == "listo");
    if(filtrado.length == tamanoTablero){
        datodom.innerText = `✓`
        
    }
}

function verificacionC(desde, hasta, datodom, tamanoTablero){
    let condicion = [];
    let filtrado;
    for(let i = desde ; i < hasta ; i = i + tamanoTablero){
        if((p[i].innerText == 1 && p[i].classList[2] == "activo") || (p[i].innerText == 0 )){
            condicion.push("listo");
        }
    }
    filtrado = condicion.filter(valor => valor == "listo");
    if(filtrado.length == tamanoTablero){
        datodom.innerText = `✓`
    }
}


function verificacionFYC5(){
    verificacionF(0, 5, infoFila0, 5);
    verificacionF(5, 10, infoFila1, 5);
    verificacionF(10, 15, infoFila2, 5);
    verificacionF(15, 20, infoFila3, 5);
    verificacionF(20, 25, infoFila4, 5);


    verificacionC(0, 25, infoColumnp0, 5);
    verificacionC(1, 25, infoColumnp1, 5);
    verificacionC(2, 25, infoColumnp2, 5);
    verificacionC(3, 25, infoColumnp3, 5);
    verificacionC(4, 25, infoColumnp4, 5);
}

function verificacionFYC10(){
    verificacionF(0, 10, infoFila0, 10);
    verificacionF(10, 20, infoFila1, 10);
    verificacionF(20, 30, infoFila2, 10);
    verificacionF(30, 40, infoFila3, 10);
    verificacionF(40, 50, infoFila4, 10);
    verificacionF(50, 60, infoFila5, 10);
    verificacionF(60, 70, infoFila6, 10);
    verificacionF(70, 80, infoFila7, 10);
    verificacionF(80, 90, infoFila8, 10);
    verificacionF(90, 100, infoFila9, 10);

    verificacionC(0, 100, infoColumnp0, 10);
    verificacionC(1, 100, infoColumnp1, 10);
    verificacionC(2, 100, infoColumnp2, 10);
    verificacionC(3, 100, infoColumnp3, 10);
    verificacionC(4, 100, infoColumnp4, 10);
    verificacionC(5, 100, infoColumnp5, 10);
    verificacionC(6, 100, infoColumnp6, 10);
    verificacionC(7, 100, infoColumnp7, 10);
    verificacionC(8, 100, infoColumnp8, 10);
    verificacionC(9, 100, infoColumnp9, 10);
}


//Saber cuando ganó el usuario: 

let win = new Audio("../../assets/win.wav");
win.volume = 0.2;

let estadoJuego = ""

function ganar5(){
    if(infoColumnp0.innerText == `✓` && 
    infoColumnp1.innerText == `✓` && 
    infoColumnp2.innerText == `✓` && 
    infoColumnp3.innerText == `✓` && 
    infoColumnp4.innerText == `✓`){
        estadoJuego = "gana";
        win.play();
        setTimeout(() => {
            location.href = "./juegos5x5.html"
        }, 2999)
        Swal.fire({
            html:'<h3 class="h3ganaste">Ganaste !</h3>',
            padding: '3em',
            confirmButtonText: 'seguir',
            timer: 3000,
            timerProgressBar: true,
            background: '#E6E2D0',
            backdrop: `
                #314975E6
            `,
            customClass:{
                popup: 'popUp-class'
            }
        })
    }
}

function ganar10(){
    if(infoColumnp0.innerText == `✓` && 
    infoColumnp1.innerText == `✓` && 
    infoColumnp2.innerText == `✓` && 
    infoColumnp3.innerText == `✓` && 
    infoColumnp4.innerText == `✓` &&
    infoColumnp5.innerText == `✓` && 
    infoColumnp6.innerText == `✓` && 
    infoColumnp7.innerText == `✓` && 
    infoColumnp8.innerText == `✓` && 
    infoColumnp9.innerText == `✓`){
        estadoJuego = "gana"
        win.play()
        setTimeout(() => {
            location.href = "./juegos10x10.html"
        }, 2999)
        Swal.fire({
            html:'<h3 class="h3ganaste">Ganaste !</h3>',
            padding: '3em',
            confirmButtonText: 'seguir',
            timer: 3000,
            timerProgressBar: true,
            background: '#E6E2D0',
            backdrop: `
                #314975E6
            `,
            customClass:{
                popup: 'popUp-class'
            }
        })
    }
}


//Img. de las vidas:

const corazonesDiv = document.getElementById("corazon");

function mostrarVidas(){
    switch(vidas){
    case 5 :
        corazonesDiv.innerHTML = `
        <img src="../../assets/vidas.png" alt="">
        <img src="../../assets/vidas.png" alt="">
        <img src="../../assets/vidas.png" alt="">
        <img src="../../assets/vidas.png" alt="">
        <img src="../../assets/vidas.png" alt="">
        `
    break
    case 4 :
        corazonesDiv.innerHTML = `
        <img src="../../assets/vidas.png" alt="">
        <img src="../../assets/vidas.png" alt="">
        <img src="../../assets/vidas.png" alt="">
        <img src="../../assets/vidas.png" alt="">
        <img src="../../assets/sinvida.png" alt="">
        `
    break
    case 3 :
        corazonesDiv.innerHTML = `
        <img src="../../assets/vidas.png" alt="">
        <img src="../../assets/vidas.png" alt="">
        <img src="../../assets/vidas.png" alt="">
        <img src="../../assets/sinvida.png" alt="">
        <img src="../../assets/sinvida.png" alt="">
        `
    break
    case 2 :
        corazonesDiv.innerHTML = `
        <img src="../../assets/vidas.png" alt="">
        <img src="../../assets/vidas.png" alt="">
        <img src="../../assets/sinvida.png" alt="">
        <img src="../../assets/sinvida.png" alt="">
        <img src="../../assets/sinvida.png" alt="">
        `
    break
    case 1 :
        corazonesDiv.innerHTML = `
        <img src="../../assets/vidas.png" alt="">
        <img src="../../assets/sinvida.png" alt="">
        <img src="../../assets/sinvida.png" alt="">
        <img src="../../assets/sinvida.png" alt="">
        <img src="../../assets/sinvida.png" alt="">
        `
    break
    case 0 :
        corazonesDiv.innerHTML = `
        <img src="../../assets/sinvida.png" alt="">
        <img src="../../assets/sinvida.png" alt="">
        <img src="../../assets/sinvida.png" alt="">
        <img src="../../assets/sinvida.png" alt="">
        <img src="../../assets/sinvida.png" alt="">
        `
    break
}
}

//La música en las celdas/ Verificar / Las vidas / Mostrar el resultado
let sound = new Audio("../../assets/plop.flac");
sound.volume = 0.5;
let error = new Audio("../../assets/error.flac");
error.volume = 0.5;
let lose = new Audio("../../assets/lose.wav");
lose.volume = 0.5;


let puntajeTotal = document.getElementById("puntajeTotal");
let puntajeTableroContador = document.getElementById("puntajeTableroContador");

let contadorTablero = 0;
function contarPuntosTablero(){
    puntajeTableroContador.innerText = `: ${contadorTablero}`
}


function perder(){
    estadoJuego = "pierde"
    lose.play();
    setTimeout(() => {
        location.reload();
    }, 3000);
    Swal.fire({
        html:'<h3 class="h3perdiste">PERDISTE :( </h3>',
        padding: '3em',
        confirmButtonText: 'intentar de nuevo',
        confirmButtonColor: '#E6E2D073',
        timer: 3000,
        timerProgressBar: true,
        background: '#B33951',
        backdrop: `
        #314975E6
        `,
        customClass:{
            popup: 'popUp-class'
        }
    })
}

function marcarTableroYContarVidas5(){
    verificacionFYC5();
    mostrarVidas();
    contarPuntosTablero();
    puntajeTotal.innerText = `TOTAL : ${usuarios[0].puntaje}`
    for(let i = 0 ; i<25; i++){
        p[i].addEventListener("click", () => {
            if((estadoJuego != "gana") && (estadoJuego!= "pierde")){
                if(boton.classList[0] != "botonVerde"){
                    if(p[i].classList[1] == "ocultarCelda"){
                        p[i].classList.remove("ocultarCelda");
                    } else{
                        p[i].classList.add("ocultarCelda");
                    }
                }else {
                    if(p[i].innerText == 1){
                        sound.play();
                        contadorTablero ++;
                        contarPuntosTablero();
                        p[i].classList.remove("ocultarCelda");
                        p[i].classList.add("activo");
                        verificacionFYC5();
                        ganar5();
                    } else{
                        error.play();
                        contadorTablero--;
                        contarPuntosTablero();
                        p[i].classList.add("cambiarColorIncorrecto5");
                        vidas --;
                        mostrarVidas();
                    }
                }
                if(vidas <= 0){
                    perder();
                }
            }
        })
    }
}

function marcarTableroYContarVidas10(){
    puntajeTotal.innerText = `TOTAL : ${usuarios[0].puntaje}`
for(let i = 0 ; i<100; i++){
    verificacionFYC10();
    mostrarVidas();
    contarPuntosTablero();
    p[i].addEventListener("click", () => {
        if((estadoJuego != "gana") && (estadoJuego!= "pierde")){
            if(boton.classList[0] != "botonVerde"){
                if(p[i].classList[1] == "ocultarCelda"){
                    p[i].classList.remove("ocultarCelda");
                } else{
                    p[i].classList.add("ocultarCelda");
                }
            }else {
                if(p[i].innerText == 1){
                    sound.play()
                    contadorTablero ++
                    contarPuntosTablero()
                    p[i].classList.remove("ocultarCelda");
                    p[i].classList.add("activo");
                    verificacionFYC10();
                    ganar10();
                } else{
                    error.play();
                    contadorTablero--
                    contarPuntosTablero();
                    p[i].classList.add("cambiarColorIncorrecto10");
                    vidas --
                    mostrarVidas();
                }
            }
            if(vidas <= 0){
                perder();
            }
        }
    })
}
}


// Guardar resultados del usuario en el local storage cuando gana:
function guardarResultados(tamano){
    let infoLocalSUsuario;
    let nombreJuego = document.getElementById("nombreJuego");
    if(estadoJuego == "gana"){
        infoLocalSUsuario = JSON.parse(localStorage.getItem("Usuarios"));
        infoLocalSUsuario[0].puntaje = infoLocalSUsuario[0].puntaje + contadorTablero;
        let puntajeTotal = document.getElementById("puntajeTotal");
        puntajeTotal.innerText = `TOTAL:${infoLocalSUsuario[0].puntaje}`
        infoLocalSUsuario[0].resultados.unshift(nombreJuego.innerText, tamano, tiempoTotal);
        localStorage.setItem("Usuarios", JSON.stringify(infoLocalSUsuario));
    }
}

//Marco el tablero según los distintos tamaños que hay:

let marcarTablero5 = document.getElementsByClassName("marcarTablero5");
let marcarTablero10 = document.getElementsByClassName("marcarTablero10");

if(marcarTablero5[0] != null){
    let {tamano} = tablero1_5x5
    marcarTableroYContarVidas5();
    reloj(tamano ?? "5x5");
}

if(marcarTablero10[0] != null){
    let {tamano} = tablero1_10x10
    marcarTableroYContarVidas10();
    reloj(tamano ?? "10x10");
}


// info. del usuario

let nombreUsuario = document.getElementById("nombreUsuario")
let avatarUsuario = document.getElementById("avatarUsuario")
let avatarUsuario2 = document.getElementById("avatarUsuario2")
let avatarUsuario3 = document.getElementById("avatarUsuario3")


if((puntajeTotal != null) && (infoLocalSUsuario != null)) {
    puntajeTotal.innerText = `TOTAL:${infoLocalSUsuario[0].puntaje}`
}

if((nombreUsuario != null) && (infoLocalSUsuario != null) ){
    nombreUsuario.innerText = `${infoLocalSUsuario[0].nombre.toUpperCase()}`
    if(avatarUsuario != null){
        avatarUsuario.src = `./assets/${infoLocalSUsuario[0].avatar}.svg`
        avatarUsuario.alt = "avatar-usuario"
    } else if(avatarUsuario2 != null){
        avatarUsuario2.src = `../assets/${infoLocalSUsuario[0].avatar}.svg`
        avatarUsuario2.alt = "avatar-usuario"
    } else if(avatarUsuario3 != null){
        avatarUsuario3.src = `../../assets/${infoLocalSUsuario[0].avatar}.svg`
        avatarUsuario3.alt = "avatar-usuario"
    }
}