//Local storage usuario:

class Usuario {
    constructor(nombre, email, avatar){
        this.nombre = nombre
        this.email = email
        this.resultados = []
        this.avatar = avatar
        this.puntaje = 0
    }
}


const usuarios = JSON.parse(localStorage.getItem("Usuarios")) ?? []

const cartelCrearUsuario = document.getElementById("cartelCrearUsuario")

if((cartelCrearUsuario != null) && (usuarios.length == 0)) {
    cartelCrearUsuario.innerHTML =`
    <h3>Para jugar, tendrás crear un usuario</h3>
    <button><a href="../perfil.html"> Haz click aquí</a></button>
    `
    console.log("true")
}

const idFormulario = document.getElementById("formulario")

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
const divAvatar = document.getElementById("divAvatar")


async function mostrarAvatars(){
    const avatares = await fetch("../json/img-users.json")
    const avataresParseados = await avatares.json()
    avataresParseados.forEach((imagen, indice) => {
        divAvatar.innerHTML += `
            <img id="avatar${indice}" src="../assets/${imagen.url}">
            `
    })
}


const perfil = document.getElementById("perfil")

mostrarAvatars().then( () => {
    const avatar0 = document.getElementById("avatar0")
    const avatar1 = document.getElementById("avatar1")
    const avatar2 = document.getElementById("avatar2")
    const avatar3 = document.getElementById("avatar3")
    const avatar4 = document.getElementById("avatar4")
    const avatar5 = document.getElementById("avatar5")
    const avatar6 = document.getElementById("avatar6")
    const avatar7 = document.getElementById("avatar7")
    const avatar8 = document.getElementById("avatar8")
    avatar0.addEventListener("click", () =>{
        perfil.src = avatar0.src
        perfil.classList.remove("user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8")
        perfil.classList.add("user0")
        console.log(perfil)
    })
    avatar1.addEventListener("click", () =>{
        perfil.src = avatar1.src
        perfil.classList.remove("user0", "user2", "user3", "user4", "user5", "user6", "user7", "user8")
        perfil.classList.add("user1")
        console.log(perfil)
    })
    avatar2.addEventListener("click", () =>{
        perfil.src = avatar2.src
        perfil.classList.remove("user0", "user1", "user3", "user4", "user5", "user6", "user7", "user8")
        perfil.classList.add("user2")
        console.log(perfil)
    })
    avatar3.addEventListener("click", () =>{
        perfil.src = avatar3.src
        perfil.classList.remove("user0", "user1", "user2", "user4", "user5", "user6", "user7", "user8")
        perfil.classList.add("user3")
        console.log(perfil)
    })
    avatar4.addEventListener("click", () =>{
        perfil.src = avatar4.src
        perfil.classList.remove("user0", "user1", "user2", "user3", "user5", "user6", "user7", "user8")
        perfil.classList.add("user4")
        console.log(perfil)
    })
    avatar5.addEventListener("click", () =>{
        perfil.src = avatar5.src
        perfil.classList.remove("user0", "user1", "user2", "user3", "user4", "user6", "user7", "user8")
        perfil.classList.add("user5")
        console.log(perfil)
    })
    avatar6.addEventListener("click", () =>{
        perfil.src = avatar6.src
        perfil.classList.remove("user0", "user1", "user2", "user3", "user4", "user5", "user7", "user8")
        perfil.classList.add("user6")
        console.log(perfil)
    })
    avatar7.addEventListener("click", () =>{
        perfil.src = avatar7.src
        perfil.classList.remove("user0", "user1", "user2", "user3", "user4", "user5", "user6", "user8")
        perfil.classList.add("user7")
        console.log(perfil)
    })
    avatar8.addEventListener("click", () =>{
        perfil.src = avatar8.src
        perfil.classList.remove("user0", "user1", "user2", "user3", "user4", "user5", "user6", "user7")
        perfil.classList.add("user8")
        console.log(perfil)
    })
})
}


if(idFormulario != null){
    idFormulario.addEventListener("submit",(e) => {
        e.preventDefault()
        let nombre = document.getElementById("nombreForm").value
        let email = document.getElementById("emailForm").value
        let avatar = perfil.classList[1] ?? "user0default"
        let usuario = new Usuario (nombre, email, avatar)
        usuarios.push(usuario)
        localStorage.setItem("Usuarios", JSON.stringify(usuarios))
        idFormulario.reset()
        location.href = "../index.html"
        devServer:{
            historyApiFallback: true
        }
    })
    let infoLocalSUsuario
    const infoUsuario = document.getElementById("infoUsuario")
    if (localStorage.getItem("Usuarios")) {
        infoLocalSUsuario = JSON.parse(localStorage.getItem("Usuarios"))
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
        this.id = id
        this.nombre = nombre
        this.tablerojuego = tablerojuego
        this.tamano = tamano
    }
}

//Aumentar en uno el último elemento del array:

function aumentarValorIndiceFinal(horizontal){
    let indiceFinal = horizontal.length - 1
    horizontal[indiceFinal]++
}

//Dice por cada fila del tablero, la cantidad de casilleros que deben pintarse y devuelve un array con la información necesaria:
function informacionFilas(objeto){
    let filaFiltrada
    let arrayFila = []
    for (let i=0 ; i< objeto.tablerojuego.length; i++){
        let fila = [0]
        for (let j=0 ; j<objeto.tablerojuego[i].length; j++){
            // si cada elemento del array que recorremos es un 0, pusheamos un 0 en un nuevo array, si es 1 se lo sumamos al último elemento del array
            if(objeto.tablerojuego[i][j] === 1){
                aumentarValorIndiceFinal(fila)
            }else{
                fila.push(0)
            }
        }
        // filtramos todos los elementos del array que el valor sea 0
        filaFiltrada = fila.filter(valor => valor != 0)
        // pusheo los arrays filtrados a arrayfila
        arrayFila.push(filaFiltrada)
    }
return arrayFila
}

//Función que dice por cada columna del tablero, la cantidad de casilleros que deben pintarse, retorna un array con la info. necesaria.
function informacionColumnas(objeto){
    let columnaFiltrada
    let arrayColumna = []
    for (let i=0 ; i< objeto.tablerojuego.length; i++){
        let columna = [0]
        for (let j=0 ; j<objeto.tablerojuego[i].length; j++){
            if(objeto.tablerojuego[j][i] === 1){
                aumentarValorIndiceFinal(columna)
            }else{
                columna.push(0)
            }
        }
        columnaFiltrada = columna.filter(valor => valor != 0)
        arrayColumna.push(columnaFiltrada)
    }
return arrayColumna
}


//Función para cuando el usuario quiere jugar un juego random/no predeterminado; el usuario podrá elegir la cantidad de filas y columnas. 
function crearTableroRandom (filas,columnas){
arrayTablero =[]
    for(let j = 0 ; j<filas; j++){
        let arrayfilas = []
    for(let i=0 ; i<columnas ; i++){
    const random = (Math.random())
    const redondeado = Math.round(random)
    arrayfilas.push(redondeado)
    }
    arrayTablero.push(arrayfilas)
    }
    return arrayTablero
}

let vidas = 5

//Mostrar en dom el juego:
function dom (nombrediv, tablero){
    let puntajeTablero = document.getElementById("puntajeTablero")
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
    const infoColumn = document.getElementById(`infoColumn`)
    const infoFilas = document.getElementById(`infoFilas`)
    const casilleros = document.getElementById(`casilleros${tablero.id}`)
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
let tableroRandom = crearTableroRandom(5,5) 
const juegoRandom = new JuegoPredeterminado(1000, "random-5x5", tableroRandom, "5x5")
juegoRandom.informacionFilas = informacionFilas(juegoRandom)
juegoRandom.informacionColumnas = informacionColumnas(juegoRandom)

let tableroRandom10x10 = crearTableroRandom(10,10)
const juegoRandom10 = new JuegoPredeterminado(1001, "random-10x10", tableroRandom10x10, "10x10")
juegoRandom10.informacionFilas = informacionFilas(juegoRandom10)
juegoRandom10.informacionColumnas = informacionColumnas(juegoRandom10)

let tableroRandom15x15 = crearTableroRandom(15,15)
const juegoRandom15 = new JuegoPredeterminado(1002, "random-15x15", tableroRandom15x15, "15x15")
juegoRandom15.informacionFilas = informacionFilas(juegoRandom15)
juegoRandom15.informacionColumnas = informacionColumnas(juegoRandom15)

let tableroRandom20x20 = crearTableroRandom(20,20)
const juegoRandom20 = new JuegoPredeterminado(1003, "random-20x20", tableroRandom20x20, "20x20")
juegoRandom20.informacionFilas = informacionFilas(juegoRandom20)
juegoRandom20.informacionColumnas = informacionColumnas(juegoRandom20)


//Creo los tableros:
const tablero1_5x5 = new JuegoPredeterminado (1, "castillo", [
    [1,0,1,0,1],
    [0,1,1,1,0],
    [0,1,1,1,0],
    [0,1,1,1,0],
    [0,1,0,1,0]], "5x5")

const tablero2_5x5 = new JuegoPredeterminado (2, "boton", [
    [0,1,1,1,0],
    [1,1,1,1,1],
    [1,0,1,0,1],
    [1,1,1,1,1],
    [0,1,1,1,0]], "5x5")

const tablero3_5x5 = new JuegoPredeterminado (3, "pausa", [
    [1,1,1,1,1],
    [1,0,1,0,1],
    [1,0,1,0,1],
    [1,0,1,0,1],
    [1,1,1,1,1]], "5x5")

const tablero4_5x5 = new JuegoPredeterminado (4, "cangrejo", [
    [1,0,0,0,1],
    [1,1,1,1,1],
    [0,1,1,1,0],
    [1,1,0,1,1],
    [1,0,0,0,1]], "5x5")

const tablero5_5x5 = new JuegoPredeterminado (5, "beso", [
    [0,0,0,0,0],
    [0,1,0,1,0],
    [1,1,1,1,1],
    [0,1,1,1,0],
    [0,0,0,0,0]], "5x5")

const tablero6_5x5 = new JuegoPredeterminado(6, "e", [
    [0,1,1,1,0],
    [0,1,0,0,0],
    [0,1,1,1,0],
    [0,1,0,0,0],
    [0,1,1,1,0]], "5x5")

const tablero7_5x5 = new JuegoPredeterminado(7, "sonrisa",[
    [1,1,1,1,1],
    [1,0,1,0,1],
    [1,1,1,1,1],
    [1,0,1,0,1],
    [1,1,0,1,1]], "5x5")

const tablero8_5x5 = new JuegoPredeterminado(8, "fantasma", [
    [0,1,1,1,0],
    [1,0,1,0,1],
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,1,1,1,1]], "5x5")

const tablero9_5x5 = new JuegoPredeterminado(9, "vendetta", [
    [0,1,1,1,0],
    [0,1,1,1,0],
    [0,1,1,1,0],
    [1,0,1,0,1],
    [1,1,0,1,1]], "5x5")

const tablero10_5x5 = new JuegoPredeterminado(10,"x", [
    [0,1,1,1,0],
    [1,0,1,0,1],
    [1,1,0,1,1],
    [1,0,1,0,1],
    [0,1,1,1,0]], "5x5")

const tablero11_5x5 = new JuegoPredeterminado(11,"sol",[
    [1,0,1,0,1],
    [0,1,1,1,0],
    [1,1,1,1,1],
    [0,1,1,1,0],
    [1,0,1,0,1]], "5x5")

const tablero12_5x5 = new JuegoPredeterminado(12,"mantel",[
    [1,0,1,0,1],
    [0,1,0,1,0],
    [1,0,1,0,1],
    [0,1,0,1,0],
    [1,0,1,0,1]], "5x5")

const tablero13_5x5 = new JuegoPredeterminado(13,"w",[
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,1,0,1],
    [1,1,0,1,1],
    [1,0,0,0,1]], "5x5")

const tablero14_5x5 = new JuegoPredeterminado(14,"rey",[
    [0,0,1,0,0],
    [1,0,1,0,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [0,0,0,0,0]], "5x5")

const tablero15_5x5 = new JuegoPredeterminado(15,"t",[
    [1,1,1,1,1],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0]], "5x5")

const tablero16_5x5 = new JuegoPredeterminado(16,"tridente",[
    [0,1,0,1,0],
    [0,0,0,0,0],
    [1,1,0,1,1],
    [1,1,0,1,1],
    [1,1,0,1,1]], "5x5")

const tablero17_5x5 = new JuegoPredeterminado(17, "suiza",[
    [1,1,1,1,1],
    [1,1,0,1,1],
    [1,0,0,0,1],
    [1,1,0,1,1],
    [1,1,1,1,1]], "5x5")

const tablero18_5x5 = new JuegoPredeterminado(18, "ocho",[
    [1,1,0,1,1],
    [1,0,1,0,1],
    [1,1,0,1,1],
    [1,0,1,0,1],
    [1,1,0,1,1]], "5x5")

const tablero19_5x5 = new JuegoPredeterminado(19, "cortinas", [
    [1,1,1,1,1],
    [1,1,0,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,0,1,1]], "5x5")

const tablero20_5x5 = new JuegoPredeterminado(20, "escalera", [
    [1,0,0,0,1],
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,1,1,1,1],
    [1,0,0,0,1]], "5x5")

const tablero21_5x5 = new JuegoPredeterminado(21, "estrella",[
    [1,0,1,0,1],
    [0,1,1,1,0],
    [1,1,1,1,1],
    [0,1,1,1,0],
    [1,0,1,0,1]], "5x5")

const tablero22_5x5 = new JuegoPredeterminado(22, "diamante",[
    [0,0,1,0,0],
    [0,1,0,1,0],
    [1,0,1,0,1],
    [0,1,0,1,0],
    [0,0,1,0,0]], "5x5")

const tablero23_5x5 = new JuegoPredeterminado(23, "campanita",[
    [0,0,1,0,0],
    [0,1,1,1,0],
    [0,1,1,1,0],
    [1,1,1,1,1],
    [0,0,1,0,0]], "5x5")

const tablero24_5x5 = new JuegoPredeterminado(24, "buzon",[
    [0,1,0,0,0],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [0,0,1,0,0],
    [0,0,1,0,0]], "5x5")

const tablero25_5x5 = new JuegoPredeterminado(25, "doce",[
    [0,1,0,0,0],
    [0,1,1,1,0],
    [0,1,0,0,0],
    [0,1,0,1,1],
    [0,1,0,0,0]], "5x5")

const tablero26_5x5 = new JuegoPredeterminado(26, "navidad",[
    [0,0,1,0,0],
    [0,1,1,1,0],
    [0,1,1,1,0],
    [1,1,1,1,1],
    [0,0,1,0,0]], "5x5")

const tablero27_5x5 = new JuegoPredeterminado(27, "izquierda",[
    [0,0,1,0,0],
    [0,1,1,0,0],
    [1,1,1,1,1],
    [0,1,1,0,0],
    [0,0,1,0,0]], "5x5")

const tablero28_5x5 = new JuegoPredeterminado(28, "derecha",[
    [0,0,1,0,0],
    [0,0,1,1,0],
    [1,1,1,1,1],
    [0,0,1,1,0],
    [0,0,1,0,0]], "5x5")

const tablero29_5x5 = new JuegoPredeterminado(29, "plus",[
    [0,0,0,1,1],
    [0,1,0,0,1],
    [1,1,1,0,1],
    [0,1,0,0,1],
    [0,0,0,0,1]], "5x5")

const tablero30_5x5 = new JuegoPredeterminado(30, "cometa",[
    [0,1,1,1,1],
    [0,0,1,1,1],
    [0,1,1,1,1],
    [1,0,0,0,1],
    [1,1,1,0,0]], "5x5")

const tablero31_5x5 = new JuegoPredeterminado(31, "iglesia",[
    [0,0,1,0,0],
    [0,1,1,1,0],
    [0,0,1,0,0],
    [0,1,1,1,0],
    [1,1,1,1,1]], "5x5")

const tablero32_5x5 = new JuegoPredeterminado(32, "perro",[
    [0,0,0,1,0],
    [1,0,0,1,1],
    [1,1,1,1,0],
    [1,0,0,1,0],
    [1,0,0,1,0]], "5x5")

const tablero33_5x5 = new JuegoPredeterminado(33, "ola",[
    [0,0,0,1,1],
    [0,1,1,1,0],
    [1,1,1,0,0],
    [1,1,1,0,0],
    [1,1,1,1,0]], "5x5")

const tablero34_5x5 = new JuegoPredeterminado(34, "on",[
    [0,0,1,0,0],
    [1,0,1,0,1],
    [1,0,1,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]], "5x5")

const tablero35_5x5 = new JuegoPredeterminado(35, "abajo",[
    [0,0,1,0,0],
    [0,0,1,0,0],
    [1,1,1,1,1],
    [0,1,1,1,0],
    [0,0,1,0,0]], "5x5")

const tablero36_5x5 = new JuegoPredeterminado(36, "flor",[
    [0,0,1,0,0],
    [0,1,0,1,0],
    [1,0,1,0,1],
    [0,1,1,1,0],
    [0,0,1,0,0]], "5x5")

const tablero37_5x5 = new JuegoPredeterminado(37, "corazon",[
    [0,1,0,1,0],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [0,1,1,1,0],
    [0,0,1,0,0]], "5x5")

const tablero38_5x5 = new JuegoPredeterminado(38, "pi",[
    [1,1,1,0,0],
    [1,0,1,0,1],
    [1,1,1,0,0],
    [1,0,0,0,1],
    [1,0,0,0,1]], "5x5")

const tablero39_5x5 = new JuegoPredeterminado(39, "femenino",[
    [0,0,1,0,0],
    [0,1,0,1,0],
    [0,0,1,0,0],
    [0,1,1,1,0],
    [0,0,1,0,0]], "5x5")

const tablero40_5x5 = new JuegoPredeterminado(40, "arriba",[
    [0,0,1,0,0],
    [0,1,1,1,0],
    [1,1,1,1,1],
    [0,0,1,0,0],
    [0,0,1,0,0]], "5x5")

let arrayJuegos5x5 = [juegoRandom,tablero1_5x5,tablero2_5x5,tablero3_5x5,tablero4_5x5,tablero5_5x5,tablero6_5x5,tablero7_5x5,tablero8_5x5,tablero9_5x5,tablero10_5x5,tablero11_5x5,tablero12_5x5,tablero13_5x5,tablero14_5x5,tablero15_5x5,tablero16_5x5,tablero17_5x5,tablero18_5x5,tablero19_5x5,tablero20_5x5,tablero21_5x5,tablero22_5x5,tablero23_5x5,tablero24_5x5,tablero25_5x5,tablero26_5x5,tablero27_5x5,tablero28_5x5,tablero29_5x5,tablero30_5x5,tablero31_5x5,tablero32_5x5,tablero33_5x5,tablero34_5x5,tablero35_5x5,tablero36_5x5,tablero37_5x5,tablero38_5x5,tablero39_5x5,tablero40_5x5]

arrayJuegos5x5.forEach(tablero =>{
    tablero.informacionFilas = informacionFilas(tablero)
    tablero.informacionColumnas = informacionColumnas(tablero)
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
    [1,1,1,1,1,1,1,1,0,0]], "10x10")

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
    [0,1,1,1,1,1,0,1,1,1]], "10x10")

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
    [1,1,1,0,1,1,1,1,1,0]], "10x10")

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
    [0,0,1,0,0,0,1,1,1,0]], "10x10")

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
    [1,1,1,1,0,1,1,1,1,1]], "10x10")

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
    [1,1,1,1,1,1,1,1,1,1]], "10x10")

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
    [1,1,1,1,1,1,1,1,1,1]], "10x10")

const tablero8_10x10 = new JuegoPredeterminado(48, "malvado", [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,1,1,1,1,1,1,0,1],
    [1,0,0,1,1,1,1,0,0,1],
    [1,0,0,0,1,1,0,0,0,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,1,1,1,1,1,1,1,0],
    [0,0,1,1,1,1,1,0,1,0],
    [1,0,0,1,1,1,1,0,0,1],
    [1,1,0,0,0,0,0,0,1,1],
    [1,1,1,0,0,0,0,1,1,1]], "10x10")

const tablero9_10x10 = new JuegoPredeterminado(49, "bosque", [
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,0,1,1,1,1,1,1],
    [1,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,1,1,1,0,0,1],
    [1,0,0,0,0,1,1,0,0,1],
    [1,0,0,0,0,1,1,0,0,1],
    [1,0,0,0,0,1,1,0,0,1],
    [1,0,0,0,0,1,1,0,0,1],
    [1,1,0,0,0,1,1,0,1,1],
    [1,1,1,0,1,1,1,1,1,1]], "10x10")

const tablero10_10x10 = new JuegoPredeterminado(50, "no-fumar", [
    [1,1,1,0,0,0,0,1,1,1],
    [1,1,0,1,1,1,1,0,1,1],
    [1,0,0,1,1,1,1,1,0,1],
    [0,1,1,0,1,1,0,1,1,0],
    [0,1,1,1,0,1,1,0,1,0],
    [0,1,0,0,0,0,0,0,1,0],
    [0,1,1,1,1,1,0,1,1,0],
    [1,0,1,1,1,1,1,0,0,1],
    [1,1,0,1,1,1,1,0,1,1],
    [1,1,1,0,0,0,0,1,1,1]], "10x10")

const tablero11_10x10 = new JuegoPredeterminado(51, "halloween", [
    [0,0,0,0,0,0,1,1,0,0],
    [0,0,0,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,0,0],
    [0,1,0,1,1,1,0,1,1,0],
    [0,1,0,0,1,0,0,1,1,0],
    [0,1,1,1,1,1,1,1,1,0],
    [0,1,1,0,1,0,0,1,1,0],
    [0,0,1,1,0,0,1,1,0,0],
    [0,0,0,1,1,1,1,0,0,0],
    [1,1,1,1,1,1,1,1,1,1]], "10x10")

const tablero12_10x10 = new JuegoPredeterminado(52, "fuego", [
    [1,1,1,0,0,1,0,1,0,0],
    [0,1,1,0,0,0,0,1,1,0],
    [0,0,1,1,0,1,0,1,1,0],
    [1,1,1,0,1,1,0,0,1,0],
    [1,1,0,0,1,1,0,1,0,0],
    [0,1,1,0,1,0,1,1,0,0],
    [1,1,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [0,1,1,1,1,1,1,1,1,0]], "10x10")

const tablero13_10x10 = new JuegoPredeterminado(53, "pava", [
    [0,0,0,1,1,0,1,1,1,1],
    [0,0,1,1,0,0,1,0,0,1],
    [0,0,1,0,0,1,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1],
    [0,1,1,1,1,1,1,1,0,1],
    [0,1,1,1,1,1,1,1,1,1],
    [0,1,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,0,0],
    [0,0,1,1,1,1,1,0,0,0],
    [1,1,1,1,1,1,1,1,1,1]], "10x10")

const tablero14_10x10 = new JuegoPredeterminado(54, "avestruz", [
    [0,0,0,0,0,0,0,0,1,1],
    [0,0,0,0,0,0,0,0,1,0],
    [0,0,0,0,0,0,0,0,1,0],
    [0,1,1,1,0,0,0,0,1,0],
    [1,1,1,1,1,0,0,1,1,0],
    [1,0,1,1,1,1,1,1,1,0],
    [1,0,0,0,1,1,1,1,0,0],
    [1,1,1,1,1,1,1,0,0,0],
    [0,1,0,1,0,0,0,0,0,0],
    [0,1,0,1,0,0,0,0,0,0]], "10x10")

const tablero15_10x10 = new JuegoPredeterminado(55, "robot", [
    [1,1,0,1,1,1,1,1,1,1],
    [1,1,0,1,0,0,0,0,0,1],
    [0,0,1,1,0,1,0,1,0,1],
    [0,0,1,1,0,0,0,0,0,1],
    [0,0,0,1,0,0,0,0,0,1],
    [0,0,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,1,0,1,0,0],
    [0,0,1,1,1,1,1,1,1,1],
    [0,1,1,0,1,1,1,1,1,0],
    [1,0,1,0,0,1,1,1,0,0]], "10x10")

const tablero16_10x10 = new JuegoPredeterminado(56, "naturaleza-muerta", [
    [0,0,0,0,1,0,0,0,1,0],
    [0,1,1,1,1,1,1,0,1,1],
    [0,0,1,1,1,1,0,0,0,1],
    [0,0,0,1,1,0,0,0,0,1],
    [0,0,1,1,1,1,0,0,0,1],
    [0,1,1,1,1,1,1,0,0,0],
    [0,1,1,1,1,1,1,0,0,0],
    [1,1,1,1,1,1,1,1,1,1],
    [0,1,1,1,1,1,1,0,1,0],
    [1,0,1,1,1,1,0,1,0,1]], "10x10")

const tablero17_10x10 = new JuegoPredeterminado(57, "amanecer", [
    [1,0,0,0,0,1,0,0,0,1],
    [1,1,0,0,0,1,0,0,0,1],
    [1,1,0,0,0,1,0,0,1,1],
    [0,1,1,0,0,1,0,0,1,0],
    [0,0,1,0,0,1,0,1,1,0],
    [1,0,1,1,0,1,0,1,0,0],
    [1,1,0,0,0,0,0,0,0,1],
    [0,1,1,0,1,1,1,0,1,1],
    [0,0,0,1,1,1,1,1,0,0],
    [1,1,0,1,1,1,1,1,0,1]], "10x10")

const tablero18_10x10 = new JuegoPredeterminado(58, "tv", [
    [0,1,1,0,0,0,0,0,1,1],
    [0,0,1,1,0,0,0,1,1,0],
    [0,0,0,1,1,0,1,1,0,0],
    [0,0,0,0,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,1,0],
    [0,0,1,0,0,0,0,1,1,0],
    [0,0,1,0,0,0,0,1,1,0],
    [0,0,1,0,0,0,0,1,1,0],
    [0,0,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1,1]], "10x10")

const tablero19_10x10 = new JuegoPredeterminado(59, "jardin", [
    [0,0,0,0,0,0,0,1,1,0],
    [0,0,0,0,0,0,1,0,0,1],
    [1,0,1,0,0,1,0,1,1,0],
    [1,1,1,1,0,1,0,1,1,0],
    [1,1,1,0,0,0,1,0,0,1],
    [0,1,0,1,0,0,0,1,1,0],
    [0,1,0,0,0,0,0,0,1,0],
    [0,1,0,1,0,0,1,0,1,0],
    [1,1,1,0,1,0,1,1,1,1],
    [0,1,0,1,1,1,0,1,1,1]], "10x10")

const tablero20_10x10 = new JuegoPredeterminado(60, "vino", [
    [0,0,1,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,0],
    [0,0,1,0,0,1,1,1,1,1],
    [0,1,1,1,0,0,1,1,1,0],
    [0,1,0,1,0,0,1,1,1,0],
    [0,1,0,1,0,0,0,1,0,0],
    [0,1,0,1,0,0,0,1,0,0],
    [0,1,0,1,0,0,0,1,0,0],
    [0,1,1,1,0,0,0,1,0,0],
    [0,1,1,1,0,0,1,1,1,0]], "10x10")

const tablero21_10x10 = new JuegoPredeterminado(61, "superman", [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,1,1,1,0,0],
    [0,1,1,0,0,0,0,1,1,0],
    [1,1,0,1,1,1,1,0,1,1],
    [1,1,0,1,1,1,1,1,1,1],
    [1,1,1,0,0,0,0,1,1,1],
    [0,1,1,1,1,1,1,0,1,0],
    [0,0,1,0,0,0,0,1,0,0],
    [0,0,0,1,1,1,1,0,0,0],
    [0,0,0,0,1,1,0,0,0,0]], "10x10")

const tablero22_10x10 = new JuegoPredeterminado(62, "hogar", [
    [0,0,0,0,1,0,0,0,0,0],
    [0,0,0,1,1,1,0,1,0,0],
    [0,0,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,0,0],
    [1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,1,0,0,1,0,0],
    [0,1,0,0,1,0,0,1,0,0],
    [0,1,1,1,1,1,1,1,0,0],
    [0,1,1,0,0,1,1,1,0,0],
    [0,1,1,0,0,1,1,1,0,0]], "10x10")

const tablero23_10x10 = new JuegoPredeterminado(63, "ojo", [
    [0,0,0,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,0,0],
    [0,1,1,1,0,0,1,1,1,0],
    [1,1,0,0,1,1,0,0,1,1],
    [1,0,0,1,0,1,1,0,0,1],
    [1,0,0,1,1,1,1,0,0,1],
    [1,1,0,0,1,1,0,0,1,1],
    [0,1,1,1,0,0,1,1,1,0],
    [0,0,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,1,0,0,0]], "10x10")

const tablero24_10x10 = new JuegoPredeterminado(64, "barbudo", [
    [0,0,0,0,0,1,1,1,1,1],
    [0,0,0,0,0,1,0,0,0,1],
    [0,0,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,1,0,0,0,1],
    [0,0,1,1,0,1,0,0,0,1],
    [0,0,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,1,1,0,1,1],
    [1,1,0,0,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,0,0,0]], "10x10")

const tablero25_10x10 = new JuegoPredeterminado(65, "caverna", [
    [1,0,0,0,0,0,1,0,0,0],
    [1,1,0,0,0,1,1,1,0,0],
    [1,1,0,0,0,1,1,1,0,1],
    [1,1,1,0,1,1,1,1,0,1],
    [0,1,1,0,1,1,0,1,1,1],
    [0,1,1,1,1,1,0,0,1,1],
    [0,1,1,1,1,1,0,0,1,1],
    [0,0,1,1,1,0,0,0,1,1],
    [0,0,1,1,1,0,0,0,1,1],
    [0,0,0,1,0,0,0,0,0,1]], "10x10")

const tablero26_10x10 = new JuegoPredeterminado(66, "cocodrilo", [
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,0,0,1,1,1,0],
    [0,1,0,1,0,0,1,0,1,0],
    [0,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,0],
    [0,1,0,1,0,0,1,0,1,0],
    [0,0,1,0,1,1,0,1,0,0],
    [0,0,0,1,0,0,1,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]], "10x10")

const tablero27_10x10 = new JuegoPredeterminado(67, "pixel", [
    [1,1,1,0,1,1,0,0,0,1],
    [1,0,1,0,0,1,1,0,1,1],
    [1,1,1,0,1,0,1,1,1,0],
    [1,0,0,0,1,0,1,1,1,0],
    [1,0,0,0,1,1,1,0,1,1],
    [0,1,1,1,0,1,0,0,0,1],
    [0,1,0,0,0,1,0,0,0,0],
    [0,1,1,0,0,1,0,0,0,0],
    [0,1,0,0,0,1,0,0,0,0],
    [0,1,1,1,0,1,1,1,0,0]], "10x10")

const tablero28_10x10 = new JuegoPredeterminado(68, "iphone", [
    [1,0,0,1,1,1,1,1,1,1],
    [1,1,0,1,0,0,0,0,0,1],
    [0,1,1,1,0,1,0,1,0,1],
    [0,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,0,1,0,1,0,1],
    [0,0,0,1,0,0,1,0,0,1],
    [0,1,1,1,0,0,0,0,0,1],
    [1,1,0,1,1,1,1,1,1,1],
    [1,0,0,1,1,1,0,1,1,1],
    [0,0,0,0,1,1,1,1,1,0]], "10x10")

const tablero29_10x10 = new JuegoPredeterminado(69, "hamburguesa", [
    [0,0,0,1,1,1,1,0,0,0],
    [0,1,1,0,0,0,0,1,1,0],
    [1,0,0,1,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1],
    [0,1,0,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,0,0,1,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1]], "10x10")

const tablero30_10x10 = new JuegoPredeterminado(70, "exclamacion", [
    [0,0,0,1,1,1,1,0,0,0],
    [0,1,1,1,0,0,1,1,1,0],
    [1,1,1,1,0,0,1,1,1,1],
    [1,1,1,1,0,0,1,1,1,1],
    [1,1,1,1,0,0,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [0,1,1,1,0,0,1,1,1,0],
    [0,0,1,1,1,1,1,1,0,0],
    [0,0,0,0,0,1,1,0,0,0],
    [0,0,0,0,1,0,0,0,0,0]], "10x10")

const tablero31_10x10 = new JuegoPredeterminado(71, "campamento", [
    [0,0,0,0,0,0,1,1,1,0],
    [0,0,0,0,0,0,0,1,1,1],
    [0,0,0,1,0,1,0,1,1,1],
    [0,0,0,0,1,0,1,1,1,0],
    [0,0,0,1,1,1,0,0,0,0],
    [0,0,1,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,0,0,0],
    [0,1,1,1,0,1,1,1,0,0],
    [0,1,1,1,0,1,1,1,0,0],
    [1,1,1,1,0,1,1,1,1,0]], "10x10")

const tablero32_10x10 = new JuegoPredeterminado(72, "aerostatico", [
    [0,0,0,1,1,1,1,1,1,1],
    [0,0,0,0,1,1,1,1,1,1],
    [0,0,0,0,1,1,1,1,1,1],
    [0,0,0,0,1,1,1,1,1,1],
    [0,0,0,0,0,1,1,1,1,0],
    [1,0,0,0,0,0,1,1,0,0],
    [1,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,1,1,0,0],
    [0,0,1,1,0,0,1,1,0,0],
    [0,1,1,1,1,0,0,0,0,0]], "10x10")

const tablero33_10x10 = new JuegoPredeterminado(73, "luna", [
    [0,0,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,0,0,0,1,1],
    [1,1,1,1,0,0,0,0,0,0],
    [1,1,1,1,0,0,0,0,0,0],
    [1,1,1,1,0,0,0,0,0,1],
    [1,1,1,1,0,0,0,0,1,1],
    [0,1,1,1,1,0,0,1,1,1],
    [0,0,1,1,1,1,1,1,1,0],
    [0,0,0,1,1,1,1,1,0,0]], "10x10")


let arrayJuegos10x10 = [juegoRandom10,tablero1_10x10,tablero2_10x10,tablero3_10x10,tablero4_10x10,tablero5_10x10,tablero6_10x10,tablero7_10x10,tablero8_10x10,tablero9_10x10,tablero10_10x10,tablero11_10x10,tablero12_10x10,tablero13_10x10,tablero14_10x10,tablero15_10x10,tablero16_10x10,tablero17_10x10,tablero18_10x10,tablero19_10x10,tablero20_10x10,tablero21_10x10,tablero22_10x10,tablero23_10x10,tablero24_10x10,tablero25_10x10,tablero26_10x10,tablero27_10x10,tablero28_10x10,tablero29_10x10,tablero30_10x10,tablero31_10x10,tablero32_10x10,tablero33_10x10]

arrayJuegos10x10.forEach(tablero =>{
    tablero.informacionFilas = informacionFilas(tablero)
    tablero.informacionColumnas = informacionColumnas(tablero)
})


const tablero1_15x15 = new JuegoPredeterminado(81, "flor", [
    [0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,0,0,0,0,0,0,0,0,0,1,1,0],
    [1,1,0,1,1,1,1,0,1,1,1,1,0,1,1],
    [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
    [1,0,1,1,0,1,1,1,1,1,0,1,1,0,1],
    [1,0,1,1,1,1,1,1,1,0,1,1,1,0,1],
    [1,0,1,1,1,1,0,0,0,1,1,1,1,0,1],
    [1,0,0,0,1,1,0,0,0,1,1,0,0,0,1],
    [1,0,1,1,1,1,0,0,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,1,0,1,1,1,1,1,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
    [1,1,0,1,1,1,1,0,1,1,1,1,0,1,1],
    [0,1,1,0,0,0,0,0,0,0,0,0,1,1,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,0,0]], "15x15")

const tablero2_15x15 = new JuegoPredeterminado(82, "arbol", [
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,0,1,1,0,0,1,0,0,1,1,1,1],
    [1,1,1,0,1,0,0,1,1,0,1,1,0,1,1],
    [1,0,1,1,1,1,0,1,1,0,1,1,0,0,1],
    [1,1,0,1,1,1,1,1,0,1,1,0,0,1,1],
    [0,1,1,0,1,1,1,0,1,1,0,0,1,1,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,0,0,1,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,0,0,0,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,0,0,0,0,0,0]], "15x15")

const tablero3_15x15 = new JuegoPredeterminado(83, "corbata", [
    [1,0,0,0,0,1,1,1,1,1,0,0,0,0,1],
    [1,1,0,0,0,1,1,1,1,1,0,0,0,1,1],
    [1,0,1,0,1,1,1,1,1,1,1,0,1,0,1],
    [1,0,0,1,0,0,1,1,1,0,0,1,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,1,0,0,0,0,0,1,0,0,0,0,0,1,1],
    [1,1,0,0,0,0,1,1,1,0,0,0,0,1,1],
    [1,1,0,0,0,0,1,1,1,0,0,0,0,1,1],
    [1,1,1,0,0,1,1,1,1,1,0,0,1,1,1],
    [1,1,1,0,0,1,1,1,1,1,0,0,1,1,1],
    [1,1,1,0,0,1,1,1,1,1,0,0,1,1,1],
    [1,1,1,0,1,1,1,1,1,1,1,0,1,1,1],
    [1,1,1,0,1,1,1,1,1,1,1,0,1,1,0],
    [1,1,1,0,1,1,1,1,1,1,1,0,1,0,0],
    [1,1,1,0,1,1,1,1,1,1,1,0,1,1,1]], "15x15")

const tablero4_15x15 = new JuegoPredeterminado(84, "unlock", [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,0,0,0,0,1,1,0,0,0],
    [1,1,1,1,1,1,0,0,0,1,1,1,1,0,0],
    [1,1,1,1,1,1,0,0,0,1,1,1,1,0,0],
    [1,1,1,1,1,1,1,1,0,0,1,1,0,0,0],
    [0,0,0,0,0,0,0,1,0,0,1,1,0,0,0],
    [0,0,0,0,0,0,0,1,0,0,1,1,0,0,0],
    [1,1,0,1,1,0,0,1,0,1,1,1,1,0,0],
    [1,1,0,1,1,0,0,1,0,1,1,1,1,0,0],
    [1,1,0,1,1,0,0,1,0,1,1,1,1,0,0],
    [1,1,1,1,1,1,1,1,0,1,1,1,1,0,0],
    [1,1,1,1,1,1,0,0,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,0,0,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,0,0,1,1,1,1,1,1,0]], "15x15")

const tablero5_15x15 = new JuegoPredeterminado(85, "luz", [
    [1,1,1,0,1,1,1,1,1,1,1,0,1,1,1],
    [1,1,1,1,0,1,0,0,0,1,0,1,1,1,1],
    [0,1,1,1,1,0,0,0,0,0,1,1,1,1,0],
    [1,0,1,1,0,0,0,0,0,0,0,1,0,0,1],
    [1,1,0,1,0,0,0,0,0,0,0,1,1,1,1],
    [1,1,1,1,0,0,1,1,1,0,0,1,1,1,1],
    [1,1,1,1,0,0,1,0,1,0,0,1,1,1,1],
    [1,1,1,0,1,0,0,1,0,0,1,0,1,1,1],
    [0,0,0,1,1,1,0,1,0,1,1,1,0,0,0],
    [1,1,1,1,1,1,0,1,0,1,1,1,1,1,1],
    [1,1,1,1,0,1,0,1,0,1,0,1,1,1,1],
    [1,1,1,0,1,1,1,1,1,1,1,0,1,1,1],
    [1,1,0,1,1,1,0,0,0,1,1,1,0,1,1],
    [1,0,1,1,1,1,1,0,1,1,1,1,1,0,1],
    [0,1,1,1,1,1,0,0,0,1,1,1,1,1,0]], "15x15")

const tablero6_15x15 = new JuegoPredeterminado(86, "fuerza", [
    [1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,0,1,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0],
    [1,1,0,0,0,1,1,1,1,1,1,1,1,0,0],
    [0,0,0,0,0,0,1,1,1,1,1,1,0,0,0],
    [0,1,0,0,0,0,0,1,1,1,1,0,0,0,0],
    [0,1,0,0,0,0,0,1,1,0,0,0,0,0,1],
    [0,1,0,0,0,0,0,1,0,0,0,0,0,1,1],
    [0,1,1,0,0,1,1,0,0,0,0,0,1,1,1],
    [0,1,1,1,0,0,0,0,0,0,0,1,1,1,1],
    [0,1,1,1,1,0,0,0,0,0,1,1,1,1,1],
    [1,1,1,1,1,1,0,0,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1]], "15x15")

const tablero7_15x15 = new JuegoPredeterminado(87, "muuuu", [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,1,1,0,1,1,1,0,0,0,0,1,0,1],
    [1,0,1,1,1,1,1,0,1,1,1,1,1,0,1],
    [0,0,1,0,1,0,1,1,1,1,0,0,1,0,0],
    [0,0,1,1,1,1,1,1,0,1,1,0,1,1,0],
    [0,0,1,1,1,1,1,1,0,0,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,0,0,1,0],
    [0,1,1,0,1,0,1,1,1,1,1,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,0,1,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,1,1,1,1,1,0,0,1,0,0,1,0],
    [0,0,0,1,0,1,0,0,0,0,1,0,0,1,0],
    [0,0,0,1,0,1,0,0,0,0,1,0,0,1,0],
    [0,0,0,1,0,1,0,0,0,0,1,0,0,1,0]], "15x15")

const tablero8_15x15 = new JuegoPredeterminado(88, "hormiga", [
    [1,1,1,1,1,0,0,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,0,1,1,1,1,1,1],
    [1,1,0,0,0,1,0,1,0,1,1,1,1,1,1],
    [1,1,0,0,0,1,0,1,0,1,1,1,1,1,1],
    [0,1,0,0,0,1,1,0,1,1,1,1,1,1,1],
    [1,0,1,1,1,0,0,0,1,1,0,0,0,0,0],
    [1,1,0,0,1,0,1,1,0,0,1,1,1,1,0],
    [0,1,1,1,0,0,1,1,0,1,1,1,1,1,1],
    [1,0,0,0,1,1,0,0,0,1,0,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,0,0,1,1,1],
    [1,1,1,1,1,0,1,1,0,0,0,0,0,1,1],
    [1,1,1,1,1,0,1,1,1,0,0,0,1,0,1],
    [1,1,1,1,1,0,1,1,1,1,0,1,1,1,1],
    [1,1,1,1,1,0,1,1,1,1,1,0,1,1,1],
    [1,1,1,1,1,1,0,1,1,1,1,1,1,1,1]], "15x15")

const tablero9_15x15 = new JuegoPredeterminado(89, "boom", [
    [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,1,0,0,0,1,1,0,0],
    [1,1,0,1,1,0,1,1,1,0,1,1,0,1,1],
    [0,1,1,0,0,1,1,1,1,1,0,0,1,1,0],
    [0,0,1,1,0,0,0,1,0,0,0,1,1,0,1],
    [1,0,0,1,0,0,1,1,1,0,0,1,0,1,1],
    [1,1,0,0,0,0,1,1,1,0,0,0,0,1,1],
    [1,1,1,0,0,1,1,1,1,1,0,0,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]], "15x15")

const tablero10_15x15 = new JuegoPredeterminado(90, "fuente", [
    [1,1,0,0,0,1,1,0,1,0,0,1,1,1,1],
    [1,0,1,1,1,0,0,0,0,1,1,0,0,1,1],
    [1,1,0,0,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,1,1,1,0],
    [0,1,1,1,1,1,0,0,0,0,1,1,0,0,1],
    [1,0,0,0,0,0,1,0,1,1,0,0,1,1,0],
    [0,1,1,1,1,1,0,0,0,0,1,1,1,1,1],
    [1,1,1,0,0,0,1,0,1,1,0,0,1,1,1],
    [1,0,0,1,1,1,0,0,0,0,1,1,0,1,1],
    [0,1,1,0,0,0,0,0,1,1,0,1,1,0,0],
    [1,1,0,1,0,1,0,0,0,1,1,0,1,1,0],
    [1,0,1,0,1,1,1,0,1,1,1,1,0,1,0],
    [1,0,1,0,1,0,0,0,0,0,1,1,0,1,1],
    [1,0,0,1,1,1,0,0,0,1,1,1,0,1,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,1,1,1]], "15x15")

const tablero11_15x15 = new JuegoPredeterminado(91, "cactus", [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
    [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0],
    [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0],
    [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0],
    [0,0,1,1,0,0,1,1,1,1,1,1,0,0,0],
    [0,0,1,1,1,0,1,1,1,1,1,1,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0]], "15x15")

const tablero12_15x15 = new JuegoPredeterminado(92, "crucero", [
    [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,1,0,0,1,0,1,0,1,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,1,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,1,1,0,1,0,1,0,1,0,1,0,1],
    [0,1,0,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1]], "15x15")


const tablero13_15x15 = new JuegoPredeterminado(93, "cartwheel", [
    [0,0,0,0,0,1,1,1,1,1,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,1,0,0,1],
    [0,0,0,0,0,1,1,1,1,1,1,0,0,1,1],
    [1,0,0,0,1,1,1,1,1,1,0,0,1,1,1],
    [1,1,0,1,1,0,1,1,1,0,0,1,1,1,1],
    [1,1,0,1,1,1,0,1,1,0,1,1,0,0,1],
    [1,1,0,1,1,1,1,1,0,0,0,0,0,0,1],
    [1,1,0,1,1,1,1,0,0,0,0,1,0,0,1],
    [1,1,0,1,1,1,0,0,0,0,0,1,1,1,1],
    [1,1,1,1,1,0,0,0,0,1,1,0,1,1,1],
    [1,1,1,1,1,0,0,0,0,1,1,1,0,1,1],
    [1,1,1,1,0,0,0,1,0,0,1,1,1,0,1],
    [1,1,1,0,0,0,1,1,1,0,0,1,1,1,0],
    [1,0,0,0,0,1,1,1,1,1,0,0,1,1,1],
    [1,0,0,0,1,1,1,1,1,1,1,0,0,0,1]], "15x15")

const tablero14_15x15 = new JuegoPredeterminado(94, "wizard", [
    [1,1,1,0,1,1,1,1,1,1,1,0,1,1,1],
    [1,1,0,1,1,0,0,0,0,0,0,1,0,1,1],
    [1,0,1,0,0,1,0,0,0,0,1,0,1,0,1],
    [0,1,0,0,1,0,0,0,0,0,0,1,0,1,0],
    [1,0,0,0,1,1,0,0,0,1,1,1,0,0,1],
    [1,1,0,0,1,1,0,0,0,1,1,1,0,0,1],
    [1,1,1,0,0,0,1,0,0,1,0,0,0,1,1],
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,0,0,0,0,1,1,1,1],
    [1,1,1,1,1,1,1,1,0,1,1,1,1,1,1],
    [1,1,1,0,0,0,0,1,1,1,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,1,1,0,0,0,0,0],
    [1,0,0,0,0,0,0,1,1,1,1,0,0,0,1],
    [1,1,0,0,0,1,1,0,1,1,0,1,1,1,1],
    [1,1,1,1,1,1,1,1,0,0,1,1,1,1,1]], "15x15")

const tablero15_15x15 = new JuegoPredeterminado(95, "sombras", [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
    [0,0,0,1,1,1,1,0,1,1,1,1,1,0,0],
    [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,1,1,0,1,1,1,1,0,0,1,1,0,1],
    [1,0,0,1,1,0,1,1,1,1,0,0,1,1,0],
    [1,1,0,0,1,1,1,0,1,1,1,0,0,1,1],
    [1,1,1,0,0,1,1,0,1,1,1,1,0,0,1],
    [1,1,1,1,1,1,0,0,0,1,1,1,1,1,1],
    [0,1,1,1,1,1,0,0,0,1,1,1,1,1,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,1,0,0,0,0,0]], "15x15")

const tablero16_15x15 = new JuegoPredeterminado(96, "yendo", [
    [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,1,1,0,0,0,1,0,0,0],
    [0,0,0,0,0,1,1,0,0,0,0,1,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
    [1,1,1,1,0,0,0,0,0,0,0,1,1,1,0],
    [1,0,0,0,0,0,0,1,1,1,0,1,0,0,0],
    [1,0,0,0,0,0,1,1,1,1,1,1,0,0,0],
    [1,1,1,1,1,1,1,1,0,1,1,1,1,1,1],
    [0,0,0,0,0,0,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,1,1,0,0,1,1,0,0,1,1,0,0,1]], "15x15")

const tablero17_15x15 = new JuegoPredeterminado(97, "casa", [
    [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
    [0,0,0,0,0,1,1,1,1,1,1,1,0,1,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0],
    [0,0,0,1,0,1,0,1,1,1,0,1,0,1,0],
    [0,0,0,1,0,1,0,1,0,1,0,1,0,1,0],
    [0,0,0,1,0,0,0,1,0,1,0,0,0,1,0],
    [0,0,0,1,0,0,0,1,0,1,0,0,0,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0]], "15x15")

const tablero18_15x15 = new JuegoPredeterminado(98, "pascuas", [
    [0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,1,1,0,0,1,1,1,0,0,0,0],
    [0,0,1,1,1,0,0,0,0,0,1,1,1,0,0],
    [0,1,1,1,0,1,1,0,1,1,0,1,1,1,0],
    [0,1,1,1,0,1,1,0,1,1,0,1,1,1,1],
    [1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,0,1,0,1,0,1,0,1,0,1,0,1,1],
    [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,1,1,1,1,0,1,1,0,1,1,0,0,1,1],
    [0,0,1,1,1,0,1,1,0,1,1,0,1,1,0],
    [0,0,1,1,0,0,0,0,0,0,0,1,1,0,0],
    [0,0,0,1,1,0,0,0,0,1,1,1,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,0,0,0,0]], "15x15")

const tablero19_15x15 = new JuegoPredeterminado(99, "surfing", [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,1,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,0,0,0,0,0,0],
    [0,0,1,1,1,1,1,1,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]], "15x15")

const tablero20_15x15 = new JuegoPredeterminado(100, "wiii", [
    [0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
    [0,1,0,0,0,0,1,1,0,1,1,0,0,0,0],
    [0,1,0,0,1,0,1,0,1,0,1,1,0,0,0],
    [0,1,1,0,1,0,1,1,0,1,0,1,1,1,0],
    [0,1,0,0,1,0,1,0,1,0,1,0,1,1,0],
    [0,1,0,0,1,0,1,1,0,1,0,1,0,1,0],
    [0,1,0,0,1,0,1,0,1,0,1,0,1,1,0],
    [0,1,0,0,1,0,1,1,0,1,0,1,0,1,0],
    [0,1,0,0,1,0,1,0,1,0,1,0,1,1,0],
    [0,1,0,0,1,0,1,1,0,1,0,1,0,1,0],
    [0,1,0,0,1,0,1,0,1,0,1,0,1,1,1],
    [0,1,0,0,1,0,1,1,0,1,0,1,1,0,1],
    [1,1,0,0,0,0,1,0,1,1,1,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,0,0,0,0,1,1],
    [1,0,0,0,0,0,1,0,0,0,0,0,1,1,1]], "15x15")

const tablero21_15x15 = new JuegoPredeterminado(101, "cafecito", [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,1,1,1,1,0],
    [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,1,1,0,0,1,0,1,1,1,0,0,0],
    [0,0,1,0,0,0,1,0,1,1,0,0,1,0,0],
    [0,0,1,0,1,1,1,1,1,1,1,0,1,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [1,0,1,0,0,1,1,1,1,1,0,0,1,0,0],
    [1,0,1,0,0,0,0,0,0,0,0,0,1,1,1],
    [1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
    [1,1,1,1,0,0,0,0,0,0,0,1,1,1,1],
    [1,1,1,1,0,0,0,0,0,0,0,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]], "15x15")

const tablero22_15x15 = new JuegoPredeterminado(102, "lampara", [
    [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,0,1,1,1,0,1,1,1,1,1],
    [1,1,1,1,0,1,0,1,0,1,0,1,1,1,1],
    [1,1,1,0,0,1,0,1,0,1,0,0,1,1,1],
    [1,0,0,0,1,0,0,1,0,0,1,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,0,0,0,0,1,0,0,0,0,1,1,1],
    [1,1,0,0,0,0,1,0,1,0,0,0,0,1,1],
    [1,0,0,0,0,1,0,0,0,1,0,0,0,0,1],
    [0,0,0,0,1,0,1,0,1,0,1,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,1,0,1,1,1,0,1,0,0,0,0],
    [0,0,0,0,1,0,0,1,0,0,1,0,0,0,0],
    [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0]], "15x15")

    const tablero23_15x15 = new JuegoPredeterminado(103, "telefono", [
    [0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,1,1,1,0,0,1,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,0,0,1],
    [0,0,0,0,0,0,1,1,1,1,1,1,1,0,1],
    [0,0,0,0,0,0,0,1,1,1,1,1,0,0,1],
    [0,0,0,0,0,0,0,0,1,1,1,0,0,0,1],
    [0,0,0,0,0,0,0,1,1,1,0,0,0,1,0],
    [0,0,1,0,0,0,1,1,1,0,0,0,0,1,0],
    [0,1,1,1,0,1,1,1,0,0,1,1,0,0,1],
    [1,1,1,1,1,1,1,0,0,1,0,1,1,0,1],
    [1,1,1,1,1,1,0,0,0,1,1,0,1,1,1],
    [1,1,1,1,1,0,0,0,0,0,0,1,0,1,1],
    [0,1,1,1,1,1,0,1,0,1,0,1,0,1,1],
    [0,0,1,1,0,1,1,0,1,0,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]], "15x15")

    const tablero24_15x15 = new JuegoPredeterminado(104, "octopus", [
    [0,1,1,0,0,0,0,0,0,0,1,0,0,0,0],
    [0,0,1,1,0,0,0,0,0,0,1,1,1,0,0],
    [0,0,0,1,0,0,0,1,0,0,0,0,1,0,1],
    [0,0,0,1,0,0,1,1,1,0,0,1,1,0,1],
    [0,0,1,1,0,0,1,1,1,0,0,1,0,0,1],
    [0,0,1,1,0,0,1,1,1,0,1,1,0,1,1],
    [0,0,0,1,1,0,0,1,0,1,1,0,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,1,0,0,1,1,1,1,1,1,1,1,0,1,1],
    [1,0,0,1,1,0,1,1,1,0,0,1,1,1,0],
    [0,0,1,1,0,0,1,1,1,1,0,0,0,0,0],
    [0,0,1,1,0,1,1,0,1,1,0,0,0,0,0],
    [0,1,1,0,0,1,1,0,1,1,0,0,0,0,1],
    [0,1,0,0,0,1,0,0,0,1,1,0,0,1,1],
    [0,1,0,0,0,1,0,0,0,1,1,1,1,1,0]], "15x15")

const tablero25_15x15 = new JuegoPredeterminado(105, "gnomo", [
    [1,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1,1,1,1,1,0],
    [1,0,0,0,0,0,0,0,1,1,1,1,1,0,0],
    [1,1,0,0,0,0,0,1,1,1,1,1,1,0,0],
    [0,1,0,0,0,0,0,1,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,1,1,0,1,0,1,0,0],
    [0,1,1,0,0,0,0,1,0,0,0,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,0,0,1,1,0,1,1,1,0,0],
    [0,0,0,1,1,0,1,0,1,1,1,1,0,1,0],
    [0,0,0,1,0,1,0,1,1,1,1,1,1,0,1],
    [0,0,0,0,1,0,1,1,0,1,1,0,1,1,0],
    [0,0,0,0,0,1,0,1,0,1,0,0,1,0,1],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,0,0],
    [0,0,0,0,0,0,0,1,0,0,0,0,1,0,0]], "15x15")

const tablero26_15x15 = new JuegoPredeterminado(106, "hongo", [
    [0,0,0,0,1,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,1,1,0,0,1,1,0,0,0,0,0,0],
    [0,0,1,1,0,0,1,0,1,1,0,0,0,0,0],
    [0,0,1,1,0,0,1,0,1,1,1,1,0,0,0],
    [0,1,1,1,0,0,0,0,0,1,1,1,1,0,0],
    [1,1,0,0,0,0,1,1,0,0,0,0,1,1,0],
    [1,1,0,1,0,0,1,1,1,0,0,0,0,1,1],
    [1,0,0,1,1,0,0,0,0,0,0,0,1,1,1],
    [1,0,0,0,0,0,0,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,1,1,0,0,1,1,0,0,0,0,1,1],
    [1,0,0,1,1,0,0,1,1,0,0,0,1,1,1],
    [1,1,1,1,0,0,0,0,1,1,1,1,1,1,1],
    [1,1,1,0,0,0,0,0,0,1,1,1,1,1,1]], "15x15")



let arrayJuegos15x15 = [juegoRandom15,tablero1_15x15,tablero2_15x15,tablero3_15x15,tablero4_15x15,tablero5_15x15,tablero6_15x15,tablero7_15x15,tablero8_15x15,tablero9_15x15,tablero10_15x15,tablero11_15x15,tablero12_15x15,tablero13_15x15,tablero14_15x15,tablero15_15x15,tablero16_15x15,tablero17_15x15,tablero18_15x15,tablero19_15x15,tablero20_15x15,tablero21_15x15,tablero22_15x15,tablero23_15x15,tablero24_15x15,tablero25_15x15,tablero26_15x15]

arrayJuegos15x15.forEach(tablero =>{
    tablero.informacionFilas = informacionFilas(tablero)
    tablero.informacionColumnas = informacionColumnas(tablero)
})


const tablero1_20x20 = new JuegoPredeterminado(121, "como-una-lluvia", [
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1],
    [0,1,1,0,0,0,1,1,1,1,1,1,0,1,1,1,0,0,1,1],
    [0,1,1,0,0,1,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
    [1,0,0,0,1,1,0,0,0,1,0,0,0,0,0,1,1,1,0,0],
    [1,1,0,1,1,1,1,0,1,1,0,0,0,0,1,1,1,1,0,0],
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,0,0],
    [1,0,0,0,1,1,0,1,1,1,1,1,1,1,1,0,0,0,0,1],
    [0,0,1,0,0,0,1,0,1,1,0,1,1,1,0,0,0,0,1,1],
    [0,1,1,0,0,1,1,0,0,0,0,0,1,1,1,0,0,0,1,1],
    [1,1,1,1,0,1,1,0,1,0,0,0,0,1,1,1,0,0,0,1],
    [1,1,1,1,0,0,0,1,1,0,0,0,1,0,1,1,1,0,0,0],
    [0,1,1,0,1,0,1,1,1,1,0,1,1,0,0,1,1,0,0,0],
    [0,0,0,0,1,0,1,1,1,1,0,1,1,0,1,1,0,0,0,0],
    [0,0,1,0,0,1,0,1,1,0,0,0,0,0,1,1,0,0,1,0],
    [0,1,1,0,1,1,0,0,0,0,1,0,0,1,1,0,0,1,1,0],
    [1,1,1,1,0,0,0,1,0,1,1,0,1,1,0,0,1,1,1,1],
    [1,1,1,1,0,0,1,1,0,1,1,0,1,0,0,0,1,1,1,1],
    [0,1,1,0,0,1,1,1,1,0,0,0,0,1,0,0,0,1,1,0]], "20x20")

const tablero2_20x20 = new JuegoPredeterminado(122, "albert", [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,0,0,0,1,0,0,0,1,1,0,0,0,1,0,1,0,0,1],
    [1,0,1,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,1],
    [0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0],
    [1,0,0,1,1,1,0,0,1,1,0,0,0,0,1,1,0,1,1,0],
    [0,1,1,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,1,1],
    [1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,1],
    [1,0,0,0,1,1,1,0,0,1,1,1,0,1,1,0,1,1,0,0],
    [1,0,0,1,0,0,1,0,1,1,1,1,0,1,1,1,1,0,1,0],
    [0,0,0,1,0,1,1,0,0,0,1,0,0,1,1,0,1,0,1,0],
    [0,0,1,1,0,0,1,0,0,0,0,1,0,1,0,0,1,0,1,0],
    [0,1,1,0,1,0,1,0,0,0,0,1,0,1,0,0,1,0,1,0],
    [1,1,0,0,1,1,1,0,0,0,1,1,0,1,0,0,1,1,0,0],
    [1,0,0,1,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0],
    [0,0,1,1,0,0,1,0,0,0,0,1,1,1,0,0,1,0,1,1],
    [0,1,0,0,0,0,1,1,0,1,1,1,1,1,1,1,1,0,0,1],
    [0,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,0,1,0,1],
    [1,0,1,1,0,0,1,1,1,0,0,0,0,0,0,1,0,0,1,0],
    [1,1,1,0,0,1,1,1,1,1,1,0,0,0,1,1,1,0,1,1],
    [1,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1]], "20x20")

const tablero3_20x20 = new JuegoPredeterminado(123, "frank", [
    [0,0,0,0,1,1,0,1,1,1,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0],
    [0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,0,0],
    [0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0],
    [0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0,0],
    [0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0],
    [0,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,0,0],
    [0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0],
    [0,1,1,1,1,0,0,0,0,1,1,0,0,0,1,1,1,1,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,0,0,1,1,1,0,0,0,0,0,0],
    [0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,1,1,1,0,0,1,1,1,1,1,1,1,0,0,1,1,1,0,0],
    [1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0],
    [1,0,0,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,1],
    [1,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1]], "20x20")

const tablero4_20x20 = new JuegoPredeterminado(124, "transmitiendo", [
    [1,1,1,0,1,1,0,1,0,1,0,0,1,0,0,1,0,1,1,0],
    [1,1,0,1,1,0,1,0,1,0,0,1,1,1,0,0,1,0,1,1],
    [1,0,0,1,0,0,1,0,1,0,1,1,1,1,1,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,1,0,0,1,1,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,0,1,1],
    [1,0,0,1,0,0,1,1,0,0,1,1,1,1,1,0,0,1,1,0],
    [1,0,0,1,1,0,0,1,0,1,1,0,1,0,1,1,0,0,0,1],
    [1,0,0,0,1,1,0,0,1,1,1,0,1,0,1,1,1,0,1,1],
    [1,1,0,0,0,1,1,0,1,1,0,1,1,1,0,1,1,0,1,0],
    [0,1,1,0,0,0,0,1,1,1,1,0,1,0,1,1,1,1,0,0],
    [0,0,1,1,0,0,0,1,1,0,1,1,1,1,1,0,1,1,0,1],
    [1,0,0,1,1,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0],
    [1,1,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,1,0],
    [0,1,1,0,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1],
    [0,0,1,1,0,1,1,0,0,1,1,1,1,1,1,1,0,0,1,1],
    [1,0,0,0,1,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1],
    [1,1,0,0,1,1,1,1,1,1,0,0,1,0,0,1,1,1,1,1],
    [0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1],
    [0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0]], "20x20")

const tablero5_20x20 = new JuegoPredeterminado(125, "pancakes", [
    [0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0],
    [0,0,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0,0,1,0],
    [0,0,0,1,1,1,0,0,0,1,1,0,0,1,1,1,1,1,0,0],
    [0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0],
    [0,0,1,0,1,1,0,0,0,0,1,1,0,0,1,1,0,1,1,0],
    [1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,1,1,1,1,0,0,0,0,0,1,0,0,0,1,1,1,1,0],
    [0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0],
    [0,1,1,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,1,1],
    [0,1,1,1,0,1,1,0,0,0,0,1,1,0,0,0,1,1,1,1],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0]], "20x20")

const tablero6_20x20 = new JuegoPredeterminado(126, "nerd", [
    [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0],
    [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,1,1,1,1,1,1,0,0,0,0,1,0,0,1,0,0,0],
    [0,0,1,1,1,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0],
    [0,0,1,1,1,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0],
    [0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1],
    [0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0],
    [0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,1,0,0,0,0,1,0,0,0,1,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,0,0,0]], "20x20")

    const tablero7_20x20 = new JuegoPredeterminado(127, "dragon", [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1],
    [0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1],
    [0,1,1,1,1,0,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
    [1,0,1,0,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,1,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
    [0,1,1,1,0,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1],
    [1,1,0,1,1,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,1,1,1],
    [0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0]], "20x20")

const tablero8_20x20 = new JuegoPredeterminado(128, "venecia", [
    [1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,0],
    [1,1,0,0,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,1],
    [0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1],
    [0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0],
    [0,1,1,1,0,0,0,1,1,1,0,1,1,0,0,0,0,0,1,0],
    [0,0,1,1,1,0,0,1,1,1,0,0,1,1,0,0,0,0,1,0],
    [0,1,0,1,1,1,0,1,0,1,0,0,0,1,1,0,0,0,1,0],
    [1,1,1,1,1,1,1,1,0,1,0,0,0,0,1,1,0,1,1,0],
    [1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
    [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0],
    [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [0,1,0,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
    [0,0,0,0,0,0,0,1,0,1,0,0,0,0,1,0,1,1,0,1],
    [0,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1]], "20x20")

    const tablero9_20x20 = new JuegoPredeterminado(129, "vroom", [
    [1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,0],
    [1,0,1,0,1,1,0,0,1,0,1,0,1,0,1,0,1,1,1,0],
    [0,1,0,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,0,1,0],
    [1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,1,0],
    [1,0,0,0,1,0,1,1,1,1,1,1,1,0,0,0,1,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0],
    [0,1,0,0,1,1,0,1,0,0,0,0,0,0,1,1,0,0,1,0],
    [0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,1,0,0,0],
    [0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0],
    [0,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [0,1,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0,1,1,1],
    [0,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,1,1,1,1],
    [1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,0,1],
    [1,1,1,0,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]], "20x20")

    const tablero10_20x20 = new JuegoPredeterminado(130, "bajo-el-mar", [
    [1,1,1,1,1,0,1,0,1,1,1,0,1,1,0,0,0,1,0,1],
    [0,1,1,1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,0,0],
    [0,0,0,0,1,0,1,0,1,1,1,0,0,1,1,1,1,1,1,0],
    [0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
    [0,0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,1,1,0],
    [0,1,0,1,1,1,0,0,1,0,1,1,1,0,0,1,1,1,1,0],
    [1,0,0,0,0,1,0,0,0,1,1,1,1,1,0,1,1,1,0,0],
    [1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,0,0],
    [1,0,0,1,1,1,1,1,0,0,0,0,0,1,1,0,0,1,1,0],
    [0,0,1,0,1,1,1,0,0,0,0,0,0,1,0,0,0,1,1,0],
    [1,1,0,0,0,0,0,1,0,1,0,0,1,1,0,1,0,0,1,1],
    [1,1,1,0,1,1,0,1,1,0,0,1,1,0,0,1,1,0,1,1],
    [1,1,0,0,0,1,0,0,1,1,0,0,1,1,0,0,1,1,1,0],
    [0,0,1,0,0,1,1,0,0,1,1,0,1,0,0,0,0,1,0,0],
    [1,0,1,1,0,0,1,1,0,0,1,1,1,0,0,1,0,0,0,1],
    [1,0,0,1,1,0,0,1,1,0,0,1,0,1,0,1,1,0,0,1],
    [1,1,0,0,1,0,0,0,1,0,1,1,0,0,1,1,0,0,1,1],
    [0,1,0,1,1,0,1,0,1,0,1,0,0,1,0,1,1,1,0,0],
    [0,0,1,1,0,0,1,0,1,1,1,0,1,1,0,0,1,0,1,1],
    [1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1]], "20x20")

    const tablero11_20x20 = new JuegoPredeterminado(131, "contando-ovejitas", [
    [0,1,0,0,1,1,1,0,1,0,0,0,1,0,0,1,1,1,1,0],
    [1,1,1,0,0,1,0,0,0,1,1,1,0,0,1,1,1,0,1,1],
    [0,1,0,0,0,0,0,0,1,1,1,0,1,0,1,1,0,0,0,0],
    [1,0,0,1,0,1,1,1,1,1,1,1,1,0,1,1,0,0,0,1],
    [1,1,0,0,1,1,0,0,0,0,1,1,0,0,1,1,1,0,1,1],
    [1,0,1,1,1,0,0,0,0,0,0,1,0,0,0,1,1,1,1,1],
    [0,0,1,1,0,0,0,0,0,0,1,1,1,1,0,0,1,1,1,0],
    [1,0,0,1,1,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1],
    [0,0,1,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1],
    [0,1,1,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,0,0],
    [1,1,0,1,1,0,1,0,0,1,1,1,1,1,0,0,1,1,0,1],
    [1,0,1,1,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1],
    [0,1,1,0,0,1,1,1,1,1,0,0,1,1,1,0,1,1,0,0],
    [0,0,0,1,1,1,1,1,1,0,1,1,1,0,0,0,1,1,1,0],
    [0,1,1,1,1,1,0,1,1,1,1,0,0,0,0,0,1,1,1,1],
    [1,1,1,1,0,0,1,1,1,0,0,0,1,0,1,0,1,1,0,1],
    [1,1,0,0,1,1,0,1,1,0,1,0,0,1,1,0,0,0,0,0],
    [1,1,1,1,0,0,0,1,1,1,1,0,1,0,0,0,1,1,0,1],
    [1,1,0,1,0,1,0,1,1,1,0,0,1,1,0,1,0,1,1,1],
    [1,1,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,1,1]], "20x20")

    const tablero12_20x20 = new JuegoPredeterminado(132, "payaso", [
    [0,0,0,1,0,1,1,0,0,0,1,1,0,0,0,0,0,1,1,0],
    [1,1,0,1,1,1,1,0,0,1,0,1,1,0,0,0,1,0,1,1],
    [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,0,1,1,1,1],
    [1,1,1,0,1,1,0,0,0,1,1,1,1,0,0,1,1,1,1,1],
    [1,1,1,0,0,1,1,0,0,0,1,1,0,1,1,1,0,1,1,0],
    [1,1,0,0,1,0,1,1,0,0,0,1,0,1,0,0,0,0,0,0],
    [0,1,1,0,1,1,1,1,0,0,1,0,1,0,1,1,0,0,0,0],
    [1,0,1,1,0,1,1,0,0,1,1,1,0,1,1,1,1,0,0,0],
    [1,1,1,1,0,0,1,1,0,1,0,0,1,1,0,0,1,1,0,0],
    [0,1,1,0,0,0,0,1,1,1,0,1,1,1,0,0,1,1,1,0],
    [0,0,1,1,1,1,0,0,1,1,0,0,0,1,0,0,1,0,0,0],
    [1,1,0,0,0,1,1,1,0,1,1,0,0,0,1,1,0,0,0,0],
    [0,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,1,1,1,0],
    [1,1,1,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,1,1],
    [1,1,1,0,0,0,0,1,0,1,1,1,0,0,0,1,0,0,0,1],
    [1,1,0,0,0,0,1,1,0,0,1,0,1,0,0,0,0,1,0,1],
    [0,1,1,1,1,1,1,0,0,0,1,0,1,0,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1]], "20x20")

    const tablero13_20x20 = new JuegoPredeterminado(133, "peanut-butter-jelly-time", [
    [0,1,1,1,1,1,0,0,1,1,1,1,0,0,0,0,1,1,1,1],
    [0,0,0,1,1,1,0,0,1,1,1,1,1,0,0,1,1,1,1,0],
    [1,0,0,0,1,1,1,0,1,0,0,1,1,0,1,1,0,0,0,0],
    [1,1,0,0,0,0,1,0,1,0,0,1,1,1,0,0,0,0,0,1],
    [1,1,1,0,0,0,0,0,1,0,0,0,1,1,1,0,0,0,1,1],
    [0,0,1,1,1,0,1,1,1,1,1,0,0,1,1,0,0,1,1,1],
    [1,0,0,0,1,0,1,0,1,0,1,0,0,1,1,0,1,1,0,0],
    [1,1,0,0,0,0,1,1,1,1,1,0,0,1,1,0,0,0,0,1],
    [1,1,1,1,0,0,0,0,1,0,0,1,0,1,1,0,0,0,1,1],
    [0,0,1,1,1,1,0,0,1,1,1,1,0,1,1,0,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0],
    [1,1,1,0,1,1,1,0,1,0,0,0,0,1,1,1,1,1,0,0],
    [1,1,0,1,0,0,1,1,1,0,0,0,1,1,0,0,1,1,0,0],
    [0,0,0,1,0,0,1,1,0,0,0,0,1,1,0,0,1,1,1,1],
    [0,1,1,0,1,1,0,1,0,0,0,1,1,1,1,1,1,1,0,0],
    [1,1,1,0,0,0,1,0,0,0,1,1,1,1,0,0,0,0,0,0],
    [1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0],
    [1,0,0,1,1,1,1,1,0,0,1,1,0,0,0,1,1,0,1,1],
    [0,0,1,0,0,0,0,1,1,0,1,0,0,0,0,1,1,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]], "20x20")

    const tablero14_20x20 = new JuegoPredeterminado(134, "bzzzz", [
    [0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0],
    [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,0],
    [0,0,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0],
    [0,1,1,0,0,1,1,0,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,1,1,0,0,0,1,0,1,0,0,1,1,1,1,0,0,0,0,0],
    [0,0,1,0,1,0,1,0,1,1,1,1,0,0,1,1,1,0,0,0],
    [1,1,1,1,0,1,1,0,0,0,0,1,0,0,1,0,1,1,0,0],
    [1,0,0,0,1,0,1,1,0,0,0,1,1,1,1,0,1,1,1,0],
    [1,0,1,1,0,1,1,1,1,1,0,0,0,1,0,1,1,1,1,0],
    [1,0,0,0,1,1,1,1,0,1,1,0,0,1,1,1,0,1,1,0],
    [0,1,1,1,0,0,1,1,1,0,1,0,0,1,1,0,1,1,1,0],
    [0,0,1,1,1,0,1,0,1,0,1,1,0,0,1,1,0,1,1,0],
    [0,1,1,1,1,0,1,0,1,0,0,1,1,0,0,1,1,1,0,0],
    [0,1,1,0,1,0,1,0,1,1,0,0,1,0,0,0,1,0,0,0],
    [1,1,1,0,1,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0],
    [1,1,0,0,0,1,0,1,1,0,0,0,0,0,0,0,1,0,0,0],
    [1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0]], "20x20")

    const tablero15_20x20 = new JuegoPredeterminado(135, "hokie-bird", [
    [0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,1,1,0,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,1,1,1,0,1,1,1,0,0,0,1,1,0,0,0,0],
    [0,0,0,1,1,0,1,1,1,1,0,0,1,0,1,1,0,0,0,0],
    [0,0,0,1,0,0,0,1,1,1,0,1,1,0,1,1,0,0,0,0],
    [0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0],
    [0,0,0,0,1,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0],
    [0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,0,0,1,0,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,0,1,1,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0],
    [0,0,0,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,0,0],
    [0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]], "20x20")

    const tablero16_20x20 = new JuegoPredeterminado(136, "gladiador", [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,1,0,0,0,0,0,0,1,1,1,0,0,0,0],
    [0,1,0,0,1,0,1,1,0,0,0,0,0,1,1,1,1,1,0,0],
    [0,1,0,1,1,1,1,1,0,0,0,0,0,1,0,1,1,1,1,0],
    [0,1,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,1],
    [1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1],
    [1,0,1,0,1,1,0,1,0,1,0,0,1,1,0,1,0,1,0,1],
    [1,0,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1],
    [1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,1,0,0,0,1],
    [1,0,1,1,1,0,0,1,1,1,0,1,0,0,0,1,0,1,0,1],
    [1,0,1,1,1,0,0,1,1,1,0,1,0,0,0,1,0,1,0,1],
    [1,0,1,1,1,0,0,1,1,1,0,0,1,0,0,1,0,1,0,1],
    [1,0,1,1,1,0,0,1,1,1,0,0,0,1,1,1,0,1,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]], "20x20")


let arrayJuegos20x20 = [juegoRandom20,tablero1_20x20,tablero2_20x20,tablero3_20x20,tablero4_20x20,tablero5_20x20,tablero6_20x20,tablero7_20x20,tablero8_20x20,tablero9_20x20,tablero10_20x20,tablero11_20x20,tablero12_20x20,tablero13_20x20,tablero14_20x20,tablero15_20x20,tablero16_20x20]

arrayJuegos20x20.forEach(tablero =>{
    tablero.informacionColumnas = informacionColumnas(tablero)
    tablero.informacionFilas = informacionFilas(tablero)
    
})

// Mostrar en DOM

const ulLista5x5 = document.getElementById("ulLista5x5")
const ulLista10x10 = document.getElementById("ulLista10x10")
const ulLista15x15 = document.getElementById("ulLista15x15")
const ulLista20x20 = document.getElementById("ulLista20x20")

let infoLocalSUsuario = JSON.parse(localStorage.getItem("Usuarios"))


if((ulLista5x5 != null) && (usuarios.length != 0)){
    arrayJuegos5x5.forEach(juego =>{
        let infoLocalSUsuario = JSON.parse(localStorage.getItem("Usuarios"))
        if(infoLocalSUsuario[0].resultados.some ((el) => el == juego.nombre.toUpperCase())){
            let indice = infoLocalSUsuario[0].resultados.indexOf(juego.nombre.toUpperCase())
            ulLista5x5.innerHTML += `
            <li>
                <a class="listaTablero"href="./${juego.nombre}.html">
                    <img src="../../assets/listo.svg" alt="">
                    ${juego.nombre}         
                    <p>${infoLocalSUsuario[0].resultados[indice + 2]}</p>
                </a>
            </li>
            `
        } else{
            ulLista5x5.innerHTML += `
            <li>
                <a class="listaTablero"href="./${juego.nombre}.html">
                    <img src="../../assets/nolisto.svg" alt="">
                    ${juego.nombre}
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
            let indice = infoLocalSUsuario[0].resultados.indexOf(juego.nombre.toUpperCase())
            ulLista10x10.innerHTML += `
            <li>
                <a class="listaTablero"href="./${juego.nombre}.html">
                    <img src="../../assets/listo.svg" alt="">
                    ${juego.nombre}         
                    <p>${infoLocalSUsuario[0].resultados[indice + 2]}</p>
                </a>
            </li>
            `
        } else{
            ulLista10x10.innerHTML += `
            <li>
                <a class="listaTablero"href="./${juego.nombre}.html">
                    <img src="../../assets/nolisto.svg" alt="">
                    ${juego.nombre}
                    <p></p>
                </a>
            </li>
            `
        }
    })
}

if(ulLista15x15 != null){
    arrayJuegos15x15.forEach(juego =>{
        let infoLocalSUsuario = JSON.parse(localStorage.getItem("Usuarios"))
        if(infoLocalSUsuario[0].resultados.some ((el) => el == juego.nombre.toUpperCase())){
            let indice = infoLocalSUsuario[0].resultados.indexOf(juego.nombre.toUpperCase())
            ulLista15x15.innerHTML += `
            <li>
                <a class="listaTablero"href="./${juego.nombre}.html">
                    <img src="../../assets/listo.svg" alt="">
                    ${juego.nombre}         
                    <p>${infoLocalSUsuario[0].resultados[indice + 2]}</p>
                </a>
            </li>
            `
        } else{
            ulLista15x15.innerHTML += `
            <li>
                <a class="listaTablero"href="./${juego.nombre}.html">
                    <img src="../../assets/nolisto.svg" alt="">
                    ${juego.nombre}
                    <p></p>
                </a>
            </li>
            `
        }
    })
}

if(ulLista20x20 != null){
    arrayJuegos20x20.forEach(juego =>{
        let infoLocalSUsuario = JSON.parse(localStorage.getItem("Usuarios"))
        if(infoLocalSUsuario[0].resultados.some ((el) => el == juego.nombre.toUpperCase())){
            let indice = infoLocalSUsuario[0].resultados.indexOf(juego.nombre.toUpperCase())
            ulLista20x20.innerHTML += `
            <li>
                <a class="listaTablero"href="./${juego.nombre}.html">
                    <img src="../../assets/listo.svg" alt="">
                    ${juego.nombre}         
                    <p>${infoLocalSUsuario[0].resultados[indice + 2]}</p>
                </a>
            </li>
            `
        } else{
            ulLista20x20.innerHTML += `
            <li>
                <a class="listaTablero"href="./${juego.nombre}.html">
                    <img src="../../assets/nolisto.svg" alt="">
                    ${juego.nombre}
                    <p></p>
                </a>
            </li>
            `
        }
    })
}

// creo constantes de divs que tengo en el HTML (5x5):

const aleatorioDiv = document.getElementById("aleatorioDiv")
const castilloDiv = document.getElementById("castilloDiv")
const botonDiv = document.getElementById("botonDiv")
const pausaDiv = document.getElementById("pausaDiv")
const cangrejoDiv = document.getElementById("cangrejoDiv")
const besoDiv = document.getElementById("besoDiv")
const eDiv = document.getElementById("eDiv")
const sonrisaDiv = document.getElementById("sonrisaDiv")
const fantasmaDiv = document.getElementById("fantasmaDiv")
const vendettaDiv = document.getElementById("vendettaDiv")
const xDiv = document.getElementById("xDiv")
const solDiv = document.getElementById("solDiv")
const mantelDiv = document.getElementById("mantelDiv")
const wDiv = document.getElementById("wDiv")
const reyDiv = document.getElementById("reyDiv")
const tDiv = document.getElementById("tDiv")
const tridenteDiv = document.getElementById("tridenteDiv")
const suizaDiv = document.getElementById("suizaDiv")
const ochoDiv = document.getElementById("ochoDiv")
const cortinasDiv = document.getElementById("cortinasDiv")
const escaleraDiv = document.getElementById("escaleraDiv")
const estrellaDiv = document.getElementById("estrellaDiv")
const diamanteDiv = document.getElementById("diamanteDiv")
const campanitaDiv = document.getElementById("campanitaDiv")
const buzonDiv = document.getElementById("buzonDiv")
const doceDiv = document.getElementById("doceDiv")
const navidadDiv = document.getElementById("navidadDiv")
const izquierdaDiv = document.getElementById("izquierdaDiv")
const derechaDiv = document.getElementById("derechaDiv")
const plusDiv = document.getElementById("plusDiv")
const cometaDiv = document.getElementById("cometaDiv")
const iglesiaDiv = document.getElementById("iglesiaDiv")
const perroDiv = document.getElementById("perroDiv")
const olaDiv = document.getElementById("olaDiv")
const onDiv = document.getElementById("onDiv")
const abajoDiv = document.getElementById("abajoDiv")
const florDiv = document.getElementById("florDiv")
const corazonDiv = document.getElementById("corazonDiv")
const piDiv = document.getElementById("piDiv")
const femeninoDiv = document.getElementById("femeninoDiv")
const arribaDiv = document.getElementById("arribaDiv")


// aplico la funcion DOM, para que mis tableros se muestren en el HTML:

if(aleatorioDiv != null){
    dom(aleatorioDiv, juegoRandom)
}

if(castilloDiv != null){
    dom(castilloDiv, tablero1_5x5)
}

if(botonDiv != null){
    dom(botonDiv, tablero2_5x5)
}

if(pausaDiv != null){
    dom(pausaDiv, tablero3_5x5)
}

if(cangrejoDiv != null){
    dom(cangrejoDiv, tablero4_5x5)
}

if(besoDiv != null){
    dom(besoDiv, tablero5_5x5)
}

if(eDiv != null){
    dom(eDiv, tablero6_5x5)
}
if(sonrisaDiv != null){
    dom(sonrisaDiv, tablero7_5x5)
}
if(fantasmaDiv != null){
    dom(fantasmaDiv, tablero8_5x5)
}
if(vendettaDiv != null){
    dom(vendettaDiv, tablero9_5x5)
}
if(xDiv != null){
    dom(xDiv, tablero10_5x5)
}
if(solDiv != null){
    dom(solDiv, tablero11_5x5)
}
if(mantelDiv != null){
    dom(mantelDiv, tablero12_5x5)
}
if(wDiv != null){
    dom(wDiv, tablero13_5x5)
}
if(reyDiv != null){
    dom(reyDiv, tablero14_5x5)
}
if(tDiv != null){
    dom(tDiv, tablero15_5x5)
}
if(tridenteDiv != null){
    dom(tridenteDiv, tablero16_5x5)
}
if(suizaDiv != null){
    dom(suizaDiv, tablero17_5x5)
}
if(ochoDiv != null){
    dom(ochoDiv, tablero18_5x5)
}
if(cortinasDiv != null){
    dom(cortinasDiv, tablero19_5x5)
}
if(escaleraDiv != null){
    dom(escaleraDiv, tablero20_5x5)
}
if(estrellaDiv != null){
    dom(estrellaDiv, tablero21_5x5)
}
if(diamanteDiv != null){
    dom(diamanteDiv, tablero22_5x5)
}
if(campanitaDiv != null){
    dom(campanitaDiv, tablero23_5x5)
}
if(buzonDiv != null){
    dom(buzonDiv, tablero24_5x5)
}
if(doceDiv != null){
    dom(doceDiv, tablero25_5x5)
}
if(navidadDiv != null){
    dom(navidadDiv, tablero26_5x5)
}
if(izquierdaDiv != null){
    dom(izquierdaDiv, tablero27_5x5)
}
if(derechaDiv != null){
    dom(derechaDiv, tablero28_5x5)
}
if(plusDiv != null){
    dom(plusDiv, tablero29_5x5)
}
if(cometaDiv != null){
    dom(cometaDiv, tablero30_5x5)
}
if(iglesiaDiv != null){
    dom(iglesiaDiv, tablero31_5x5)
}
if(perroDiv != null){
    dom(perroDiv, tablero32_5x5)
}
if(olaDiv != null){
    dom(olaDiv, tablero33_5x5)
}
if(onDiv != null){
    dom(onDiv, tablero34_5x5)
}
if(abajoDiv != null){
    dom(abajoDiv, tablero35_5x5)
}
if(florDiv != null){
    dom(florDiv, tablero36_5x5)
}
if(corazonDiv != null){
    dom(corazonDiv, tablero37_5x5)
}
if(piDiv != null){
    dom(piDiv, tablero38_5x5)
}
if(femeninoDiv != null){
    dom(femeninoDiv, tablero39_5x5)
}
if(arribaDiv != null){
    dom(arribaDiv, tablero40_5x5)
}

// 10x10
const aleatorio10Div = document.getElementById("aleatorio10Div")
const computadoraDiv = document.getElementById("computadoraDiv")
const shortsDiv = document.getElementById("shortsDiv")
const cenaDiv = document.getElementById("cenaDiv")
const juegoDiv = document.getElementById("juegoDiv")
const monstruoDiv = document.getElementById("monstruoDiv")
const congeladoDiv = document.getElementById("congeladoDiv")
const egiptoDiv = document.getElementById("egiptoDiv")
const malvadoDiv = document.getElementById("malvadoDiv")
const bosqueDiv = document.getElementById("bosqueDiv")
const noDiv = document.getElementById("noDiv")
const halloweenDiv = document.getElementById("halloweenDiv")
const fuegoDiv = document.getElementById("fuegoDiv")
const pavaDiv = document.getElementById("pavaDiv")
const avestruzDiv = document.getElementById("avestruzDiv")
const robotDiv = document.getElementById("robotDiv")
const naturalezaDiv = document.getElementById("naturalezaDiv")
const amanecerDiv = document.getElementById("amanecerDiv")
const tvDiv = document.getElementById("tvDiv")
const jardinDiv = document.getElementById("jardinDiv")
const vinoDiv = document.getElementById("vinoDiv")
const supermanDiv = document.getElementById("supermanDiv")
const hogarDiv = document.getElementById("hogarDiv")
const ojoDiv = document.getElementById("ojoDiv")
const barbudoDiv = document.getElementById("barbudoDiv")
const cavernaDiv = document.getElementById("cavernaDiv")
const cocodriloDiv = document.getElementById("cocodriloDiv")
const pixelDiv = document.getElementById("pixelDiv")
const iphoneDiv = document.getElementById("iphoneDiv")
const hamburguesaDiv = document.getElementById("hamburguesaDiv")
const exclamacionDiv = document.getElementById("exclamacionDiv")
const campamentoDiv = document.getElementById("campamentoDiv")
const aerostaticoDiv = document.getElementById("aerostaticoDiv")
const lunaDiv = document.getElementById("lunaDiv")


if(aleatorio10Div != null){
    dom(aleatorio10Div, juegoRandom10)
}
if(computadoraDiv != null){
    dom(computadoraDiv, tablero1_10x10)
}
if(shortsDiv != null){
    dom(shortsDiv, tablero2_10x10)
}
if(cenaDiv != null){
    dom(cenaDiv, tablero3_10x10)
}
if(juegoDiv != null){
    dom(juegoDiv, tablero4_10x10)
}
if(monstruoDiv != null){
    dom(monstruoDiv, tablero5_10x10)
}
if(congeladoDiv != null){
    dom(congeladoDiv, tablero6_10x10)
}
if(egiptoDiv != null){
    dom(egiptoDiv, tablero7_10x10)
}
if(malvadoDiv != null){
    dom(malvadoDiv, tablero8_10x10)
}
if(bosqueDiv != null){
    dom(bosqueDiv, tablero9_10x10)
}
if(noDiv != null){
    dom(noDiv, tablero10_10x10)
}
if(halloweenDiv != null){
    dom(halloweenDiv, tablero11_10x10)
}
if(fuegoDiv != null){
    dom(fuegoDiv, tablero12_10x10)
}
if(pavaDiv != null){
    dom(pavaDiv, tablero13_10x10)
}
if(avestruzDiv != null){
    dom(avestruzDiv, tablero14_10x10)
}
if(robotDiv != null){
    dom(robotDiv, tablero15_10x10)
}
if(naturalezaDiv != null){
    dom(naturalezaDiv, tablero16_10x10)
}
if(amanecerDiv != null){
    dom(amanecerDiv, tablero17_10x10)
}
if(tvDiv != null){
    dom(tvDiv, tablero18_10x10)
}
if(jardinDiv != null){
    dom(jardinDiv, tablero19_10x10)
}
if(vinoDiv != null){
    dom(vinoDiv, tablero20_10x10)
}
if(supermanDiv != null){
    dom(supermanDiv, tablero21_10x10)
}
if(hogarDiv != null){
    dom(hogarDiv, tablero22_10x10)
}
if(ojoDiv != null){
    dom(ojoDiv, tablero23_10x10)
}
if(barbudoDiv != null){
    dom(barbudoDiv, tablero24_10x10)
}
if(cavernaDiv != null){
    dom(cavernaDiv, tablero25_10x10)
}
if(cocodriloDiv != null){
    dom(cocodriloDiv, tablero26_10x10)
}
if(pixelDiv != null){
    dom(pixelDiv, tablero27_10x10)
}
if(iphoneDiv != null){
    dom(iphoneDiv, tablero28_10x10)
}
if(hamburguesaDiv != null){
    dom(hamburguesaDiv, tablero29_10x10)
}
if(exclamacionDiv != null){
    dom(exclamacionDiv, tablero30_10x10)
}
if(campamentoDiv != null){
    dom(campamentoDiv, tablero31_10x10)
}
if(aerostaticoDiv != null){
    dom(aerostaticoDiv, tablero32_10x10)
}
if(lunaDiv != null){
    dom(lunaDiv, tablero33_10x10)
}

// 15x15
const aleatorio15Div = document.getElementById("aleatorio15Div")
const flor15Div = document.getElementById("flor15Div")
const arbolDiv = document.getElementById("arbolDiv")
const corbataDiv = document.getElementById("corbataDiv")
const unlockDiv = document.getElementById("unlockDiv")
const luzDiv = document.getElementById("luzDiv")
const fuerzaDiv = document.getElementById("fuerzaDiv")
const muuuuDiv = document.getElementById("muuuuDiv")
const hormigaDiv = document.getElementById("hormigaDiv")
const boomDiv = document.getElementById("boomDiv")
const fuenteDiv = document.getElementById("fuenteDiv")
const cactusDiv = document.getElementById("cactusDiv")
const cruceroDiv = document.getElementById("cruceroDiv")
const cartwheelDiv = document.getElementById("cartwheelDiv")
const wizardDiv = document.getElementById("wizardDiv")
const sombrasDiv = document.getElementById("sombrasDiv")
const yendoDiv = document.getElementById("yendoDiv")
const casaDiv = document.getElementById("casaDiv")
const pascuasDiv = document.getElementById("pascuasDiv")
const surfingDiv = document.getElementById("surfingDiv")
const wiiiDiv = document.getElementById("wiiiDiv")
const cafecitoDiv = document.getElementById("cafecitoDiv")
const lamparaDiv = document.getElementById("lamparaDiv")
const telefonoDiv = document.getElementById("telefonoDiv")
const ocutopusDiv = document.getElementById("ocutopusDiv")
const gnomoDiv = document.getElementById("gnomoDiv")
const hongoDiv = document.getElementById("hongoDiv")

if(aleatorio15Div != null){
    dom(aleatorio15Div, juegoRandom15)
}
if(flor15Div != null){
    dom(flor15Div, tablero1_15x15)
}
if(arbolDiv != null){
    dom(arbolDiv, tablero2_15x15)
}
if(corbataDiv != null){
    dom(corbataDiv, tablero3_15x15)
}
if(unlockDiv != null){
    dom(unlockDiv, tablero4_15x15)
}
if(luzDiv != null){
    dom(luzDiv, tablero5_15x15)
}
if(fuerzaDiv != null){
    dom(fuerzaDiv, tablero6_15x15)
}
if(muuuuDiv != null){
    dom(muuuuDiv, tablero7_15x15)
}
if(hormigaDiv != null){
    dom(hormigaDiv, tablero8_15x15)
}
if(boomDiv != null){
    dom(boomDiv, tablero9_15x15)
}
if(fuenteDiv != null){
    dom(fuenteDiv, tablero10_15x15)
}
if(cactusDiv != null){
    dom(cactusDiv, tablero11_15x15)
}
if(cruceroDiv != null){
    dom(cruceroDiv, tablero12_15x15)
}
if(cartwheelDiv != null){
    dom(cartwheelDiv, tablero13_15x15)
}
if(wizardDiv != null){
    dom(wizardDiv, tablero14_15x15)
}
if(sombrasDiv != null){
    dom(sombrasDiv, tablero15_15x15)
}
if(yendoDiv != null){
    dom(yendoDiv, tablero16_15x15)
}
if(casaDiv != null){
    dom(casaDiv, tablero17_15x15)
}
if(pascuasDiv != null){
    dom(pascuasDiv, tablero18_15x15)
}
if(surfingDiv != null){
    dom(surfingDiv, tablero19_15x15)
}
if(wiiiDiv != null){
    dom(wiiiDiv, tablero20_15x15)
}
if(cafecitoDiv != null){
    dom(cafecitoDiv, tablero21_15x15)
}
if(lamparaDiv != null){
    dom(lamparaDiv, tablero22_15x15)
}
if(telefonoDiv != null){
    dom(telefonoDiv, tablero23_15x15)
}
if(ocutopusDiv != null){
    dom(ocutopusDiv, tablero24_15x15)
}
if(gnomoDiv != null){
    dom(gnomoDiv, tablero25_15x15)
}
if(hongoDiv != null){
    dom(hongoDiv, tablero26_15x15)
}





//20x20
const aleatorio20Div = document.getElementById("aleatorio20Div")
const comoDiv = document.getElementById("comoDiv")
const albertDiv = document.getElementById("albertDiv")
const frankDiv = document.getElementById("frankDiv")
const transmitiendoDiv = document.getElementById("transmitiendoDiv")
const pancakesDiv = document.getElementById("pancakesDiv")
const nerdDiv = document.getElementById("nerdDiv")
const dragonDiv = document.getElementById("dragonDiv")
const veneciaDiv = document.getElementById("veneciaDiv")
const vroomDiv = document.getElementById("vroomDiv")
const bajoDiv = document.getElementById("bajoDiv")
const contandoDiv = document.getElementById("contandoDiv")
const payasoDiv = document.getElementById("payasoDiv")
const peanutDiv = document.getElementById("peanutDiv")
const bzzzzDiv = document.getElementById("bzzzzDiv")
const hokieDiv = document.getElementById("hokieDiv")
const gladiadorDiv = document.getElementById("gladiadorDiv")

if(aleatorio20Div != null){
    dom(aleatorio20Div, juegoRandom20)
}

if(comoDiv != null){
    dom(comoDiv, tablero1_20x20)
}

if(albertDiv != null){
    dom(albertDiv, tablero2_20x20)
}

if(frankDiv != null){
    dom(frankDiv, tablero3_20x20)
}

if(transmitiendoDiv != null){
    dom(transmitiendoDiv, tablero4_20x20)
}

if(pancakesDiv != null){
    dom(pancakesDiv, tablero5_20x20)
}

if(nerdDiv != null){
    dom(nerdDiv, tablero6_20x20)
}

if(dragonDiv != null){
    dom(dragonDiv, tablero7_20x20)
}

if(veneciaDiv != null){
    dom(veneciaDiv, tablero8_20x20)
}

if(vroomDiv != null){
    dom(vroomDiv, tablero9_20x20)
}

if(bajoDiv != null){
    dom(bajoDiv, tablero10_20x20)
}

if(contandoDiv != null){
    dom(contandoDiv, tablero11_20x20)
}

if(payasoDiv != null){
    dom(payasoDiv, tablero12_20x20)
}

if(peanutDiv != null){
    dom(peanutDiv, tablero13_20x20)
}

if(bzzzzDiv != null){
    dom(bzzzzDiv, tablero14_20x20)
}

if(hokieDiv != null){
    dom(hokieDiv, tablero15_20x20)
}

if(gladiadorDiv != null){
    dom(gladiadorDiv, tablero16_20x20)
}


// Funciones para el mouse:

const boton = document.getElementById("boton")
if(boton != null){
    boton.addEventListener("click", () => {
    if(boton.classList[0] == "botonVerde"){
        boton.classList.remove("botonVerde")
        boton.classList.add("boton")
        
    } else{
        boton.classList.remove("boton")
        boton.classList.add("botonVerde")
    }
})
}

// Traigo los elementos del DOM al JS:

const p = document.getElementsByClassName("celdas")
const vidasP = document.getElementById("vidas")
let resultado = document.getElementById("resultado")
let infoFila0 = document.getElementById("infoFila0")
let infoFila1 = document.getElementById("infoFila1")
let infoFila2 = document.getElementById("infoFila2")
let infoFila3 = document.getElementById("infoFila3")
let infoFila4 = document.getElementById("infoFila4")
let infoFila5 = document.getElementById("infoFila5")
let infoFila6 = document.getElementById("infoFila6")
let infoFila7 = document.getElementById("infoFila7")
let infoFila8 = document.getElementById("infoFila8")
let infoFila9 = document.getElementById("infoFila9")
let infoFila10 = document.getElementById("infoFila10")
let infoFila11 = document.getElementById("infoFila11")
let infoFila12 = document.getElementById("infoFila12")
let infoFila13 = document.getElementById("infoFila13")
let infoFila14 = document.getElementById("infoFila14")
let infoFila15 = document.getElementById("infoFila15")
let infoFila16 = document.getElementById("infoFila16")
let infoFila17 = document.getElementById("infoFila17")
let infoFila18 = document.getElementById("infoFila18")
let infoFila19 = document.getElementById("infoFila19")

let infoColumnp0 = document.getElementById("infoColumnp0")
let infoColumnp1 = document.getElementById("infoColumnp1")
let infoColumnp2 = document.getElementById("infoColumnp2")
let infoColumnp3 = document.getElementById("infoColumnp3")
let infoColumnp4 = document.getElementById("infoColumnp4")
let infoColumnp5 = document.getElementById("infoColumnp5")
let infoColumnp6 = document.getElementById("infoColumnp6")
let infoColumnp7 = document.getElementById("infoColumnp7")
let infoColumnp8 = document.getElementById("infoColumnp8")
let infoColumnp9 = document.getElementById("infoColumnp9")
let infoColumnp10 = document.getElementById("infoColumnp10")
let infoColumnp11 = document.getElementById("infoColumnp11")
let infoColumnp12 = document.getElementById("infoColumnp12")
let infoColumnp13 = document.getElementById("infoColumnp13")
let infoColumnp14 = document.getElementById("infoColumnp14")
let infoColumnp15 = document.getElementById("infoColumnp15")
let infoColumnp16 = document.getElementById("infoColumnp16")
let infoColumnp17 = document.getElementById("infoColumnp17")
let infoColumnp18 = document.getElementById("infoColumnp18")
let infoColumnp19 = document.getElementById("infoColumnp19")

//Para verificar las celdas que se clickean: 
//si vale 0 o si vale 1 y si además está activo, de filas y columnas y por ultimo lo junto todo en una función:
function verificacionF(desde, hasta, datodom, tamanoTablero){
    let condicion = []
    let filtrado 
    for(let i = desde ; i < hasta ; i++){
        if((p[i].innerText == 1 && p[i].classList[2] == "activo") || (p[i].innerText == 0 )){
            condicion.push("listo")
        }
    }
    filtrado = condicion.filter(valor => valor == "listo")
    if(filtrado.length == tamanoTablero){
        datodom.innerText = `✓`
        
    }
}


function verificacionC(desde, hasta, datodom, tamanoTablero){
    let condicion = []
    let filtrado
    for(let i = desde ; i < hasta ; i = i + tamanoTablero){
        if((p[i].innerText == 1 && p[i].classList[2] == "activo") || (p[i].innerText == 0 )){
            condicion.push("listo")
        }
    }
    filtrado = condicion.filter(valor => valor == "listo")
    if(filtrado.length == tamanoTablero){
        datodom.innerText = `✓`
    }
}




function verificacionFYC5(){
    verificacionF(0, 5, infoFila0, 5)
    verificacionF(5, 10, infoFila1, 5)
    verificacionF(10, 15, infoFila2, 5)
    verificacionF(15, 20, infoFila3, 5)
    verificacionF(20, 25, infoFila4, 5)


    verificacionC(0, 25, infoColumnp0, 5)
    verificacionC(1, 25, infoColumnp1, 5)
    verificacionC(2, 25, infoColumnp2, 5)
    verificacionC(3, 25, infoColumnp3, 5)
    verificacionC(4, 25, infoColumnp4, 5)
}


function verificacionFYC10(){
    verificacionF(0, 10, infoFila0, 10)
    verificacionF(10, 20, infoFila1, 10)
    verificacionF(20, 30, infoFila2, 10)
    verificacionF(30, 40, infoFila3, 10)
    verificacionF(40, 50, infoFila4, 10)
    verificacionF(50, 60, infoFila5, 10)
    verificacionF(60, 70, infoFila6, 10)
    verificacionF(70, 80, infoFila7, 10)
    verificacionF(80, 90, infoFila8, 10)
    verificacionF(90, 100, infoFila9, 10)

    verificacionC(0, 100, infoColumnp0, 10)
    verificacionC(1, 100, infoColumnp1, 10)
    verificacionC(2, 100, infoColumnp2, 10)
    verificacionC(3, 100, infoColumnp3, 10)
    verificacionC(4, 100, infoColumnp4, 10)
    verificacionC(5, 100, infoColumnp5, 10)
    verificacionC(6, 100, infoColumnp6, 10)
    verificacionC(7, 100, infoColumnp7, 10)
    verificacionC(8, 100, infoColumnp8, 10)
    verificacionC(9, 100, infoColumnp9, 10)
}

function verificacionFYC15(){
    verificacionF(0, 15, infoFila0, 15)
    verificacionF(15, 30, infoFila1, 15)
    verificacionF(30, 45, infoFila2, 15)
    verificacionF(45, 60, infoFila3, 15)
    verificacionF(60, 75, infoFila4, 15)
    verificacionF(75, 90, infoFila5, 15)
    verificacionF(90, 105, infoFila6, 15)
    verificacionF(105, 120, infoFila7, 15)
    verificacionF(120, 135, infoFila8, 15)
    verificacionF(135, 150, infoFila9, 15)
    verificacionF(150, 165, infoFila10, 15)
    verificacionF(165, 180, infoFila11, 15)
    verificacionF(180, 195, infoFila12, 15)
    verificacionF(195, 210, infoFila13, 15)
    verificacionF(210, 225, infoFila14, 15)

    verificacionC(0, 225, infoColumnp0, 15)
    verificacionC(1, 225, infoColumnp1, 15)
    verificacionC(2, 225, infoColumnp2, 15)
    verificacionC(3, 225, infoColumnp3, 15)
    verificacionC(4, 225, infoColumnp4, 15)
    verificacionC(5, 225, infoColumnp5, 15)
    verificacionC(6, 225, infoColumnp6, 15)
    verificacionC(7, 225, infoColumnp7, 15)
    verificacionC(8, 225, infoColumnp8, 15)
    verificacionC(9, 225, infoColumnp9, 15)
    verificacionC(10, 225, infoColumnp10, 15)
    verificacionC(11, 225, infoColumnp11, 15)
    verificacionC(12, 225, infoColumnp12, 15)
    verificacionC(13, 225, infoColumnp13, 15)
    verificacionC(14, 225, infoColumnp14, 15)
}

function verificacionFYC20(){
    verificacionF(0, 20, infoFila0, 20)
    verificacionF(20, 40, infoFila1, 20)
    verificacionF(40, 60, infoFila2, 20)
    verificacionF(60, 80, infoFila3, 20)
    verificacionF(80, 100, infoFila4, 20)
    verificacionF(100, 120, infoFila5, 20)
    verificacionF(120, 140, infoFila6, 20)
    verificacionF(140, 160, infoFila7, 20)
    verificacionF(160, 180, infoFila8, 20)
    verificacionF(180, 200, infoFila9, 20)
    verificacionF(200, 220, infoFila10, 20)
    verificacionF(220, 240, infoFila11, 20)
    verificacionF(240, 260, infoFila12, 20)
    verificacionF(260, 280, infoFila13, 20)
    verificacionF(280, 300, infoFila14, 20)
    verificacionF(300, 320, infoFila15, 20)
    verificacionF(320, 340, infoFila16, 20)
    verificacionF(340, 360, infoFila17, 20)
    verificacionF(360, 380, infoFila18, 20)
    verificacionF(380, 400, infoFila19, 20)

    verificacionC(0, 400, infoColumnp0, 20)
    verificacionC(1, 400, infoColumnp1, 20)
    verificacionC(2, 400, infoColumnp2, 20)
    verificacionC(3, 400, infoColumnp3, 20)
    verificacionC(4, 400, infoColumnp4, 20)
    verificacionC(5, 400, infoColumnp5, 20)
    verificacionC(6, 400, infoColumnp6, 20)
    verificacionC(7, 400, infoColumnp7, 20)
    verificacionC(8, 400, infoColumnp8, 20)
    verificacionC(9, 400, infoColumnp9, 20)
    verificacionC(10, 400, infoColumnp10, 20)
    verificacionC(11, 400, infoColumnp11, 20)
    verificacionC(12, 400, infoColumnp12, 20)
    verificacionC(13, 400, infoColumnp13, 20)
    verificacionC(14, 400, infoColumnp14, 20)
    verificacionC(15, 400, infoColumnp15, 20)
    verificacionC(16, 400, infoColumnp16, 20)
    verificacionC(17, 400, infoColumnp17, 20)
    verificacionC(18, 400, infoColumnp18, 20)
    verificacionC(19, 400, infoColumnp19, 20)
}

//Saber cuando ganó el usuario: 

let win = new Audio("../../assets/win.wav")
win.volume = 0.2

let estadoJuego = ""

function ganar5(){
    if(infoColumnp0.innerText == `✓` && 
    infoColumnp1.innerText == `✓` && 
    infoColumnp2.innerText == `✓` && 
    infoColumnp3.innerText == `✓` && 
    infoColumnp4.innerText == `✓`){
        estadoJuego = "gana"
        win.play()
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

function ganar15(){
    if(infoColumnp0.innerText == `✓` && 
    infoColumnp1.innerText == `✓` && 
    infoColumnp2.innerText == `✓` && 
    infoColumnp3.innerText == `✓` && 
    infoColumnp4.innerText == `✓` &&
    infoColumnp5.innerText == `✓` && 
    infoColumnp6.innerText == `✓` && 
    infoColumnp7.innerText == `✓` && 
    infoColumnp8.innerText == `✓` && 
    infoColumnp9.innerText == `✓` &&
    infoColumnp10.innerText == `✓` && 
    infoColumnp11.innerText == `✓` && 
    infoColumnp12.innerText == `✓` && 
    infoColumnp13.innerText == `✓` && 
    infoColumnp14.innerText == `✓`){
        estadoJuego = "gana"
        win.play()
        setTimeout(() => {
            location.href = "./juegos15x15.html"
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

function ganar20(){
    if(infoColumnp0.innerText == `✓` && 
    infoColumnp1.innerText == `✓` && 
    infoColumnp2.innerText == `✓` && 
    infoColumnp3.innerText == `✓` && 
    infoColumnp4.innerText == `✓` &&
    infoColumnp5.innerText == `✓` && 
    infoColumnp6.innerText == `✓` && 
    infoColumnp7.innerText == `✓` && 
    infoColumnp8.innerText == `✓` && 
    infoColumnp9.innerText == `✓` &&
    infoColumnp10.innerText == `✓` && 
    infoColumnp11.innerText == `✓` && 
    infoColumnp12.innerText == `✓` && 
    infoColumnp13.innerText == `✓` && 
    infoColumnp14.innerText == `✓` &&
    infoColumnp15.innerText == `✓` && 
    infoColumnp16.innerText == `✓` && 
    infoColumnp17.innerText == `✓` && 
    infoColumnp18.innerText == `✓` && 
    infoColumnp19.innerText == `✓`){
        estadoJuego = "gana"
        win.play()
        setTimeout(() => {
            location.href = "./juegos20x20.html"
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

const corazonesDiv = document.getElementById("corazon")

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
let sound = new Audio("../../assets/plop.flac")
sound.volume = 0.5
let error = new Audio("../../assets/error.flac")
error.volume = 0.5
let lose = new Audio("../../assets/lose.wav")
lose.volume = 0.5


let puntajeTotal = document.getElementById("puntajeTotal")
let puntajeTableroContador = document.getElementById("puntajeTableroContador")

let contadorTablero = 0
function contarPuntosTablero(){
    puntajeTableroContador.innerText = `: ${contadorTablero}`
}



function perder(){
    estadoJuego = "pierde"
    lose.play()
    setTimeout(() => {
        location.reload()
    }, 3000)
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
    verificacionFYC5()
    mostrarVidas()
    contarPuntosTablero()
    puntajeTotal.innerText = `TOTAL : ${usuarios[0].puntaje}`
    for(let i = 0 ; i<25; i++){
        p[i].addEventListener("click", () => {
            if((estadoJuego != "gana") && (estadoJuego!= "pierde")){
                if(boton.classList[0] != "botonVerde"){
                    if(p[i].classList[1] == "ocultarCelda"){
                        p[i].classList.remove("ocultarCelda")
                    } else{
                        p[i].classList.add("ocultarCelda")
                    }
                }else {
                    if(p[i].innerText == 1){
                        sound.play()
                        contadorTablero ++
                        contarPuntosTablero()
                        p[i].classList.remove("ocultarCelda")
                        p[i].classList.add("activo")
                        verificacionFYC5()
                        ganar5()
                    } else{
                        error.play()
                        contadorTablero--
                        contarPuntosTablero()
                        p[i].classList.add("cambiarColorIncorrecto5")
                        vidas --
                        mostrarVidas()
                    }
                }
                if(vidas <= 0){
                    perder()
                }
            }
        })
    }
}
function marcarTableroYContarVidas10(){
    puntajeTotal.innerText = `TOTAL : ${usuarios[0].puntaje}`
for(let i = 0 ; i<100; i++){
    verificacionFYC10()
    mostrarVidas()
    contarPuntosTablero()
    p[i].addEventListener("click", () => {
        if((estadoJuego != "gana") && (estadoJuego!= "pierde")){
            if(boton.classList[0] != "botonVerde"){
                if(p[i].classList[1] == "ocultarCelda"){
                    p[i].classList.remove("ocultarCelda")
                } else{
                    p[i].classList.add("ocultarCelda")
                }
            }else {
                if(p[i].innerText == 1){
                    sound.play()
                    contadorTablero ++
                    contarPuntosTablero()
                    p[i].classList.remove("ocultarCelda")
                    p[i].classList.add("activo")
                    verificacionFYC10()
                    ganar10()
                } else{
                    error.play()
                    contadorTablero--
                    contarPuntosTablero()
                    p[i].classList.add("cambiarColorIncorrecto10")
                    vidas --
                    mostrarVidas()
                }
            }
            if(vidas <= 0){
                perder()
            }
        }
    })
}
}

function marcarTableroYContarVidas15(){
    puntajeTotal.innerText = `TOTAL : ${usuarios[0].puntaje}`
for(let i = 0 ; i<225; i++){
    verificacionFYC15()
    mostrarVidas()
    contarPuntosTablero()
    p[i].addEventListener("click", () => {
        if((estadoJuego != "gana") && (estadoJuego!= "pierde")){
            if(boton.classList[0] != "botonVerde"){
                if(p[i].classList[1] == "ocultarCelda"){
                    p[i].classList.remove("ocultarCelda")
                } else{
                    p[i].classList.add("ocultarCelda")
                }
            }else {
                if(p[i].innerText == 1){
                    sound.play()
                    contadorTablero ++
                    contarPuntosTablero()
                    p[i].classList.remove("ocultarCelda")
                    p[i].classList.add("activo")
                    verificacionFYC15()
                    ganar15()
                } else{
                    error.play()
                    contadorTablero--
                    contarPuntosTablero()
                    p[i].classList.add("cambiarColorIncorrecto15")
                    vidas --
                    mostrarVidas()
                }
            }
            if(vidas <= 0){
                perder()
            }
        }
    })
}
}
function marcarTableroYContarVidas20(){
    puntajeTotal.innerText = `TOTAL : ${usuarios[0].puntaje}`
for(let i = 0 ; i<400; i++){
    verificacionFYC20()
    mostrarVidas()
    contarPuntosTablero()
    p[i].addEventListener("click", () => {
        if((estadoJuego != "gana") && (estadoJuego!= "pierde")){
            if(boton.classList[0] != "botonVerde"){
                if(p[i].classList[1] == "ocultarCelda"){
                    p[i].classList.remove("ocultarCelda")
                } else{
                    p[i].classList.add("ocultarCelda")
                }
            }else {
                if(p[i].innerText == 1){
                    sound.play()
                    contadorTablero ++
                    contarPuntosTablero()
                    p[i].classList.remove("ocultarCelda")
                    p[i].classList.add("activo")
                    verificacionFYC20()
                    ganar20()
                } else{
                    error.play()
                    contadorTablero--
                    contarPuntosTablero()
                    p[i].classList.add("cambiarColorIncorrecto20")
                    vidas --
                    mostrarVidas()
                }
            }
            if(vidas <= 0){
                estadoJuego = "pierde"
                lose.play()
                setTimeout(() => {
                    location.reload()
                }, 3000)
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
        }
    })
}
}

// Guardar resultados del usuario en el local storage cuando gana:
function guardarResultados(tamano){
    let infoLocalSUsuario
    let nombreJuego = document.getElementById("nombreJuego")
    if(estadoJuego == "gana"){
        infoLocalSUsuario = JSON.parse(localStorage.getItem("Usuarios"))
        infoLocalSUsuario[0].puntaje = infoLocalSUsuario[0].puntaje + contadorTablero
        let puntajeTotal = document.getElementById("puntajeTotal")
        puntajeTotal.innerText = `TOTAL:${infoLocalSUsuario[0].puntaje}`
        infoLocalSUsuario[0].resultados.unshift(nombreJuego.innerText, tamano, tiempoTotal)
        localStorage.setItem("Usuarios", JSON.stringify(infoLocalSUsuario))
    }
}

// Crear cronómetro:
const infoColumn = document.getElementById(`infoColumn`)
const infoFilas = document.getElementById(`infoFilas`)

let segundosP = document.getElementById("segundos")
let minutosP = document.getElementById("minutos")
let pause = document.getElementById("pause")
let infoColumnDiv = document.getElementById("infoColumn1000")
let divPause = document.getElementById("divPause")

let tiempoTotal 
function reloj (tamano){
    let segundos = 00
    let minutos = 00
    let contar = function(){
        segundos++
        // si el contador de segundos llega a 60 que se '0nga de nuevo en 0 y sume 1 en minutos
        if (segundos == 60){
            segundos = 0
            minutos++
            // si minutos es menor a 10 agregar un 0 antes en el dom
            if(minutos < 10){
                minutosP.innerText = `0${minutos}`
            }else{
                minutosP.innerText = `${minutos}`
            }
            // minutosP.innerText = `${minutos} `
        }
        // si segundos es menor a 10 agregar un 0 antes en el dom
        if(segundos < 10){
            segundosP.innerText = `:0${segundos}`
        }else{
            segundosP.innerText = `:${segundos}`
        }
        if((estadoJuego == "gana") || ( estadoJuego == "pierde")){
            clearInterval(intervalo)
            tiempoTotal = `${minutos}:${segundos}`
            guardarResultados(tamano)
        }
    }
    let intervalo = setInterval(contar, 1000)
    pause.addEventListener("click", () => {
        if(pause.classList[1] == "pause"){
            clearInterval(intervalo)
            infoColumn.classList.add("esconder")
            infoFilas.classList.add("esconder")
            pause.classList.remove("pause")
            pause.classList.add("play")
        } else if (pause.classList[1] == "play"){
            intervalo = setInterval(contar, 1000)
            infoColumn.classList.remove("esconder")
            infoFilas.classList.remove("esconder")
            pause.classList.remove("play")
            pause.classList.add("pause")
        }
    })
}

//Marco el tablero según los distintos tamaños que hay:

let marcarTablero5 = document.getElementsByClassName("marcarTablero5")
let marcarTablero10 = document.getElementsByClassName("marcarTablero10")
let marcarTablero15 = document.getElementsByClassName("marcarTablero15")
let marcarTablero20 = document.getElementsByClassName("marcarTablero20")


if(marcarTablero5[0] != null){
    let {tamano} = tablero1_5x5
    marcarTableroYContarVidas5()
    reloj(tamano ?? "5x5")
}

if(marcarTablero10[0] != null){
    let {tamano} = tablero1_10x10
    marcarTableroYContarVidas10()
    reloj(tamano ?? "10x10")
}

if(marcarTablero15[0] != null){
    let {tamano} = tablero1_15x15
    marcarTableroYContarVidas15()
    reloj(tamano ?? "15x15")
}

if(marcarTablero20[0] != null){
    let {tamano} = tablero1_20x20
    marcarTableroYContarVidas20()
    reloj(tamano ?? "20x20")
}

// LOCAL STORAGE THEME
const toggleTheme = document.getElementById("toggleTheme")
const circuloTheme = document.getElementById("circuloTheme")
const fondo = document.getElementById("fondo")
const circuloBoton = document.getElementById("circuloBoton")


let infoLocalS

if(localStorage.getItem("theme")){
    infoLocalS = localStorage.getItem("theme")
    if(infoLocalS == "oscuro"){
        document.body.classList.add("oscuro")
        toggleTheme.classList.add("themeOscuro")
        toggleTheme.classList.remove("theme")
        circuloTheme.classList.add("circuloOscuro")
        circuloTheme.classList.remove("circulo")
        if(circuloBoton != null){
            circuloBoton.classList.add("circuloBotonOscuro")
            circuloBoton.classList.remove("circuloBoton")
        }
    }
} else{
    localStorage.setItem("theme", "claro")
}



toggleTheme.addEventListener("click", () =>{
    if(toggleTheme.classList[0] == "theme"){
        document.body.classList.add("oscuro")
        toggleTheme.classList.add("themeOscuro")
        toggleTheme.classList.remove("theme")
        circuloTheme.classList.add("circuloOscuro")
        circuloTheme.classList.remove("circulo")
        localStorage.setItem("theme", "oscuro")
        if(circuloBoton != null){
            circuloBoton.classList.add("circuloBotonOscuro")
            circuloBoton.classList.remove("circuloBoton")
        }
    } else{
        document.body.classList.remove("oscuro")
        toggleTheme.classList.add("theme")
        toggleTheme.classList.remove("themeOscuro")
        circuloTheme.classList.add("circulo")
        circuloTheme.classList.remove("circuloOscuro")
        localStorage.setItem("theme", "claro")
        if(circuloBoton != null){
            circuloBoton.classList.add("circuloBoton")
            circuloBoton.classList.remove("circuloBotonOscuro")
        }
    }
})

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