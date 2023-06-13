//////////////////////////////// DEFINO VARIABLES GLOBALES ////////////////////////////
let codigo_id = 3
let cliente_index = 0
let puntos = 0
let puntos_n = 0
let tabla_r = document.querySelector("#tabla_r");
let tabla_c = document.querySelector("#tabla_c");
let esconder_r = document.querySelector("#esconder_r");
let esconder_c = document.querySelector("#esconder_c");
let tiquet = document.querySelector("#tiquet");


//////////////////////////////// DATOS INICIALES //////////////////////////////////

let clientes = [
    {
        id: 1,
        nombres: "Mario Jose",
        apellidos: "Rojas Rosas",
        correo: "holaa@gmail.com",
        numero_de_cedula: "1098752265",
        telefono: "31531831756",
        nacionalidad: "venezolano",
        fecha: "1960/06/13",
        puntos: 1,
    },
    {
        id: 2,
        nombres: "Juan Jose",
        apellidos: "Roa Gonzales",
        correo: "chaoo@gmail.com",
        numero_de_cedula: "1098753262",
        telefono: "31531838856",
        nacionalidad: "peruano",
        fecha: "1990/04/12",
        puntos: 1,
    },
    {
        id: 3,
        nombres: "Maria Julieta",
        apellidos: "Ramires Gomes",
        correo: "gtrrdf@gmail.com",
        numero_de_cedula: "1098772261",
        telefono: "31531831256",
        nacionalidad: "colombiano",
        fecha: "1999/05/11",
        puntos: 1,
    },
];

let rutas = [
    {
        id: 1,
        vuelo: "Narnia",
        valor: "13000",
        cuidad_o: "bucaramanga",
        cuidad_d: "tunja",
        puntos_f: 50,
    },
    {
        id: 2,
        vuelo: "nevera",
        valor: "13500",
        cuidad_o: "bucaramanga",
        cuidad_d: "bogota",
        puntos_f: 25,
    },
    {
        id: 3,
        vuelo: "calor",
        valor: "11000",
        cuidad_o: "bucaramanga",
        cuidad_d: "cartagena",
        puntos_f: 150,
    },
];

const comprobador_r = rutas
const comprobador_c = clientes
const comprobador_id = codigo_id

////////////////////////////////  FUNCIONES //////////////////////////////////

// limpia y luego imprime en la tabla con la base de datos actual
function mostrar_r() {
    rutas = JSON.parse(localStorage.getItem("rutas"))
    tabla_r.innerHTML = "";

    if (rutas == null) {
        rutas = [];
        codigo_id = 3;
    }
    rutas.forEach((rut) => {
        const rutasHTML = document.createElement("tr");
        rutasHTML.innerHTML = `
                <td>${rut.id}</td>
                <td>${rut.vuelo}</td>
                <td>${rut.valor}</td>
                <td>${rut.cuidad_o}</td>
                <td>${rut.cuidad_d}</td>
                <td>${rut.puntos_f}</td>
                `;
        tabla_r.appendChild(rutasHTML)
    });
}

function mostrar_c() {
    clientes = JSON.parse(localStorage.getItem("clientes"))
    tabla_c.innerHTML = "";

    if (clientes == null) {
        clientes = [];
        codigo_id = 3;
    }
    clientes.forEach((client) => {
        const clientesHTML = document.createElement("tr");
        clientesHTML.innerHTML = `
                <td>${client.id}</td>
                <td>${client.nombres}</td>
                <td>${client.apellidos}</td>
                <td>${client.correo}</td>
                <td>${client.numero_de_cedula}</td>
                <td>${client.telefono}</td>
                <td>${client.nacionalidad}</td>
                <td>${client.fecha}</td>
                `;
        tabla_c.appendChild(clientesHTML)
    });
}

function cotizacion() {
    const buscador = document.querySelector("#cod_cliente").value;
    const buscado = clientes.filter(buscados => buscados.id == buscador);
    const buscador1 = document.querySelector("#cod_vuelo").value;
    const buscado1 = rutas.filter(buscados => buscados.id == buscador1);
    const valor = buscado1[0].valor;
    puntos = parseInt(buscado1[0].puntos_f)
    const valor1 = calcularValorTotal(valor);

    const id_clientes = buscado[0].id;
    const buscado_id = clientes.findIndex(buscados => buscados.id == id_clientes);
    cliente_index = buscado_id
    puntos_n = parseInt(clientes[cliente_index].puntos)

    tiquet.innerHTML = `                        
            <p>&nbsp;&nbsp;&nbsp; CLIENTE: <br><br>
            &nbsp;&nbsp;&nbsp; NOMBRE:  ${buscado[0].nombres} ${buscado[0].apellidos}<br>
            &nbsp;&nbsp;&nbsp; CORREO:  ${buscado[0].correo} <br>
            &nbsp;&nbsp;&nbsp; CEDULA:  ${buscado[0].numero_de_cedula}<br>
            &nbsp;&nbsp;&nbsp; TELEFONO:  ${buscado[0].telefono}</p>
            <p>&nbsp;&nbsp;&nbsp; VUELO: <br><br>
            &nbsp;&nbsp;&nbsp; VUELO:  ${buscado1[0].vuelo}<br>
            &nbsp;&nbsp;&nbsp; VALOR ${buscado1[0].valor}<br>
            &nbsp;&nbsp;&nbsp; CUIDAD DE ORIGEN:  ${buscado1[0].cuidad_o}<br>
            &nbsp;&nbsp;&nbsp; CUIDAD DE DESTINO:   ${buscado1[0].cuidad_d}<br>
            &nbsp;&nbsp;&nbsp; PUNTOS FIDELIDAD:   ${buscado1[0].puntos_f}<br><br>
            &nbsp;&nbsp;&nbsp; VALOR: ( ${buscado1[0].valor} + TA(4%) ) + IVA(16%)  = ${valor1} $
            </p>
            `; 
    clientes = JSON.parse(localStorage.getItem("clientes"));
}

function calcularValorTotal(valorRuta) {
    const valorTasaAeroportuaria = parseInt(valorRuta)*0.04; 
    const valorIVA = (parseInt(valorRuta) + parseInt(valorTasaAeroportuaria))*0.16; 
    const vTotal = parseInt(valorRuta) + valorIVA + valorTasaAeroportuaria;
    return vTotal;
}
//////////////////////////////////////////////////////////////// EJECUCION //////////////////////////////////////////////////////////////////

// si la base de datos esta sin cambios descarga, luego comprueba si la descarga es  = null,
//  si es true reseta el valor a la base de datos predeterminada, luego carga los datos al localstorage que es nuestra base de datos
if (rutas == comprobador_r || clientes == comprobador_c) {
    rutas = JSON.parse(localStorage.getItem("rutas"));
    clientes = JSON.parse(localStorage.getItem("clientes"));
    codigo_id = JSON.parse(localStorage.getItem("codigo_id"));
}   
if (rutas == null || clientes == null) {
    rutas = comprobador_r
    clientes = comprobador_c
    codigo_id = comprobador_id
}
localStorage.setItem("rutas", JSON.stringify(rutas));
localStorage.setItem("clientes", JSON.stringify(clientes));   
localStorage.setItem("codigo_id", JSON.stringify(codigo_id));

// llamados a botones que asigna al evento click una funcion

esconder_r.classList.add('d-none');
esconder_c.classList.add('d-none');

const ruta_but = document.querySelector("#rutas1");
ruta_but.addEventListener("click", mostrar_r());
ruta_but.addEventListener("click", () => {
    esconder_r.classList.remove('d-none');
    esconder_c.classList.add('d-none');
});

const clientes_but = document.querySelector("#clientes1");
clientes_but.addEventListener("click", mostrar_c());
clientes_but.addEventListener("click", () => {
    esconder_r.classList.add('d-none');
    esconder_c.classList.remove('d-none');
});

const cotizar_but = document.querySelector("#cotizar1");
cotizar_but.addEventListener("click", cotizacion);

const pagar_but = document.querySelector("#pagar1");
pagar_but.addEventListener("click", () => {
clientes[cliente_index].puntos = puntos_n + puntos
localStorage.setItem("clientes", JSON.stringify(clientes));   
console.log(clientes);
});

