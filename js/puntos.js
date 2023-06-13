//////////////////////////////// DEFINO VARIABLES GLOBALES ////////////////////////////
let codigo_id = 3
let cliente_index = 0
let tabla1 = document.querySelector("#tabla1");

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

const comprobador = clientes
const comprobador_id = codigo_id

////////////////////////////////  FUNCIONES //////////////////////////////////

// limpia y luego imprime en la tabla con la base de datos actual
function mostrar() {
    clientes = JSON.parse(localStorage.getItem("clientes"))
    tabla1.innerHTML = "";

    if (clientes == null) {
        clientes = [];
        codigo_id = 3;
    }
    clientes.forEach((client) => {
        const clientesHTML = document.createElement("tr");
        console.log(client.puntos)
        clientesHTML.innerHTML = `

                <td>${client.id}</td>
                <td>${client.nombres}</td>
                <td>${client.apellidos}</td>
                <td>${client.correo}</td>
                <td>${client.numero_de_cedula}</td>
                <td>${client.puntos}</td>
                `;
        tabla1.appendChild(clientesHTML)
    });
}
//////////////////////////////////////////////////////////////// EJECUCION //////////////////////////////////////////////////////////////////

// si la base de datos esta sin cambios descarga, luego comprueba si la descarga es  = null,
//  si es true reseta el valor a la base de datos predeterminada, luego carga los datos al localstorage que es nuestra base de datos
if (clientes == comprobador) {
    clientes = JSON.parse(localStorage.getItem("clientes"));
    codigo_id = JSON.parse(localStorage.getItem("codigo_id"));
}   
if (clientes == null) {
    clientes = comprobador
    codigo_id = comprobador_id
}

localStorage.setItem("clientes", JSON.stringify(clientes));   
localStorage.setItem("codigo_id", JSON.stringify(codigo_id));

mostrar();