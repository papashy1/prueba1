//////////////////////////////// DEFINO VARIABLES GLOBALES ////////////////////////////
let codigo_id = 3

let ruta_index = 0
let tabla1 = document.querySelector("#tabla1");

//////////////////////////////// DATOS INICIALES //////////////////////////////////

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

const comprobador = rutas
const comprobador_id = codigo_id

////////////////////////////////  FUNCIONES //////////////////////////////////

// limpia y luego imprime en la tabla con la base de datos actual
function mostrar() {
    rutas = JSON.parse(localStorage.getItem("rutas"))
    tabla1.innerHTML = "";

    if (rutas == null) {
        rutas = [];
        codigo_id = 3;
        console.log(rutas);
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
                <div class=" justify-end align-items-end">
                    <button class="btn btn-danger" onclick="eliminar_rutas(${rut.id})">
                        <i class="fa-regular fa-trash-can fa-lg" style="color: #ffffff;"></i>
                    </button>
                </div>
                `;
        tabla1.appendChild(rutasHTML)
    });
}

// agrega un nuevo elemento a la base de datos(array) manteniendo un id unico para cada elemento nuevo creado con la variable codigo_id,
// carga al localstorage y luego actaliza la tabla con mostrar()
function agregar_rutas() {
    codigo_id += 1;
    let vuelo = document.querySelector("#vuelo1").value;
    let valor = document.querySelector("#valor1").value;
    let cuidad_o = document.querySelector("#cuidad_o1").value;
    let cuidad_d = document.querySelector("#cuidad_d1").value;
    let puntos_f = document.querySelector("#puntos_fid1").value;

    let nuevo_ruta = {
        id: codigo_id,
        vuelo: vuelo,
        valor: valor,
        cuidad_o: cuidad_o,
        cuidad_d: cuidad_d,
        puntos_f: puntos_f,
    };

    rutas.push(nuevo_ruta);
    localStorage.setItem("rutas", JSON.stringify(rutas));
    localStorage.setItem("codigo_id", JSON.stringify(codigo_id));
    mostrar();
}

// busca el indice del ruta que seleccionamos por su id en el input y lo guarda en una variable global
function selec_editar_rutas() {
    rutas = JSON.parse(localStorage.getItem("rutas"))

    const id_editar = document.querySelector("#editado").value;
    const buscado_edit = rutas.findIndex(buscados => buscados.id == id_editar);
    ruta_index = buscado_edit
}

// usa el indice contenido en ruta_index para sobreescribir valores en la base de datos (rutas) ,
// carga al localstorage y luego actaliza la tabla con mostrar()
function editar_rutas() {
    rutas = JSON.parse(localStorage.getItem("rutas"))

    rutas[ruta_index].vuelo = document.querySelector("#vuelo2").value;
    rutas[ruta_index].valor = document.querySelector("#valor2").value;
    rutas[ruta_index].cuidad_o = document.querySelector("#cuidad_o2").value;
    rutas[ruta_index].cuidad_d = document.querySelector("#cuidad_d2").value;
    rutas[ruta_index].puntos_f = document.querySelector("#puntos_fid2").value;

    localStorage.setItem("rutas", JSON.stringify(rutas));
    mostrar();
}

// elimina un ruta de la base de datos buscando el indice por el id que ingresamos en el input ,
// carga al localstorage y luego actaliza la tabla con mostrar()
function eliminar_rutas() {
    const id_eliminar = document.querySelector("#eliminado").value;
    const buscado_eliminar = rutas.findIndex(buscados => buscados.id == id_eliminar);
    rutas.splice(buscado_eliminar, 1);

    localStorage.setItem("rutas", JSON.stringify(rutas))
    mostrar();
};

//////////////////////////////////////////////////////////////// EJECUCION //////////////////////////////////////////////////////////////////

// si la base de datos esta sin cambios descarga, luego comprueba si la descarga es  = null,
//  si es true reseta el valor a la base de datos predeterminada, luego carga los datos al localstorage que es nuestra base de datos
if (rutas == comprobador) {
    rutas = JSON.parse(localStorage.getItem("rutas"));
    codigo_id = JSON.parse(localStorage.getItem("codigo_id"));
}
if (rutas == null) {
    rutas = comprobador
    codigo_id = comprobador_id
}   
localStorage.setItem("rutas", JSON.stringify(rutas));
localStorage.setItem("codigo_id", JSON.stringify(codigo_id));

// llamados a botones que asigna al evento click una funcion
const agregar_ruta_but = document.querySelector("#agregar1");
agregar_ruta_but.addEventListener("click", agregar_rutas);

const editar_ruta_but = document.querySelector("#editar1");
editar_ruta_but.addEventListener("click", selec_editar_rutas);

const editar_ruta_but_r = document.querySelector("#editar_r");
editar_ruta_but_r.addEventListener("click", editar_rutas);

mostrar();