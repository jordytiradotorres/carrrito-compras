const listaCursos = document.getElementById('cursos'),
    carritoCompras = document.getElementById('carrito-compras'),
    carrito = document.querySelector('table tbody'),
    botonVaciarCarrito = document.getElementById('vaciar-carrito');

// funciones
const insertarCarrito = (infoCurso) => {
    const row = document.createElement('tr');
    row.innerHTML =
        `<td>
            <img src="${infoCurso.imagen}" alt="${infoCurso.titulo}">
        </td>
        <td>${infoCurso.titulo}</td>
        <td>${infoCurso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${infoCurso.id}">X</a>
        </td>    
    `;

    carrito.appendChild(row);

    guardarCursoLocalStorage(infoCurso);
};

const leerDatosCurso = (curso) => {
   const infoCurso = {
       imagen: curso.querySelector('img').src,
       titulo: curso.querySelector('h3').textContent,
       precio: curso.querySelector('.card-precio .card-precio__descuento').textContent,
       id: curso.querySelector('button').getAttribute('data-id')
   };

   insertarCarrito(infoCurso)
};

const comprarCurso = (e) => {
    e.preventDefault();

    // delegacion
    const comprarCurso = e.target.classList.contains('agregar-carrito');
    if (comprarCurso) {
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso)
    }
};  // fin de comprar curso


const eliminarCurso = (e) => {
    e.preventDefault();
    const botonEliminar = e.target.classList.contains('borrar-curso');
    let cursoId, curso;
    curso = e.target.parentElement.parentElement;
    if (botonEliminar) {
        e.target.parentElement.parentElement.remove();
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }
    eliminarCursoLocalStorage(cursoId);
};

const vaciarCarrito = e => {
    e.preventDefault();
   // carrito.innerHTML = ''; --> forma no recomendada mas lenta
    // forma recomendada mas rapida
    while (carrito.firstElementChild) {
        carrito.removeChild(carrito.firstElementChild)
    }

    vaciarLocalStorage();
    // return false para prevenir algun salto extraño
    return false;
};

// localStorage
// obtener cursos localStorage
const obtenerCursosLocalStorage = () => {
    let cursosLS;
    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
};
// guardar en el localstorage
const guardarCursoLocalStorage = (curso) => {
    let cursos = obtenerCursosLocalStorage();

    cursos.push(curso);
    localStorage.setItem('cursos', JSON.stringify(cursos));
};

// leer localStorage
const leerLocalStorage = () => {
    let cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach((infoCurso) => {
        const row = document.createElement('tr');
        row.innerHTML =
            `<td>
            <img src="${infoCurso.imagen}" alt="${infoCurso.titulo}">
        </td>
        <td>${infoCurso.titulo}</td>
        <td>${infoCurso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${infoCurso.id}">X</a>
        </td>    
    `;
        carrito.appendChild(row);
    })
};

// eliminar curso de localStorage
const eliminarCursoLocalStorage = (curso) => {
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach((cursoLS, index) => {
        if (cursoLS.id === curso) {
            cursosLS.splice(index, 1);
        }
    });
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
};

// vaciar localStorage
const vaciarLocalStorage = () => {
    localStorage.clear();
};

// listeners
const cargarEventListeners = () => {
    // agregar al carrito
    if (listaCursos) listaCursos.addEventListener('click', comprarCurso);
    // eliminar un curso del carrito
    if (carritoCompras) carritoCompras.addEventListener('click', eliminarCurso);
    // vaciar el carrito
    if (botonVaciarCarrito) botonVaciarCarrito.addEventListener('click', vaciarCarrito);
    // al cargar el documento, cargar localStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}; // fin de cargarEventListeners

cargarEventListeners();

