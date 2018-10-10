(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var listaCursos = document.getElementById('cursos'),
    carritoCompras = document.getElementById('carrito-compras'),
    carrito = document.querySelector('table tbody'),
    botonVaciarCarrito = document.getElementById('vaciar-carrito');

// funciones
var insertarCarrito = function insertarCarrito(infoCurso) {
    var row = document.createElement('tr');
    row.innerHTML = '<td>\n            <img src="' + infoCurso.imagen + '" alt="' + infoCurso.titulo + '">\n        </td>\n        <td>' + infoCurso.titulo + '</td>\n        <td>' + infoCurso.precio + '</td>\n        <td>\n            <a href="#" class="borrar-curso" data-id="' + infoCurso.id + '">X</a>\n        </td>    \n    ';

    carrito.appendChild(row);

    guardarCursoLocalStorage(infoCurso);
};

var leerDatosCurso = function leerDatosCurso(curso) {
    var infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h3').textContent,
        precio: curso.querySelector('.card-precio .card-precio__descuento').textContent,
        id: curso.querySelector('button').getAttribute('data-id')
    };

    insertarCarrito(infoCurso);
};

var comprarCurso = function comprarCurso(e) {
    e.preventDefault();

    // delegacion
    var comprarCurso = e.target.classList.contains('agregar-carrito');
    if (comprarCurso) {
        var curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
}; // fin de comprar curso


var eliminarCurso = function eliminarCurso(e) {
    e.preventDefault();
    var botonEliminar = e.target.classList.contains('borrar-curso');
    var cursoId = void 0,
        curso = void 0;
    curso = e.target.parentElement.parentElement;
    if (botonEliminar) {
        e.target.parentElement.parentElement.remove();
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }
    eliminarCursoLocalStorage(cursoId);
};

var vaciarCarrito = function vaciarCarrito(e) {
    e.preventDefault();
    // carrito.innerHTML = ''; --> forma no recomendada mas lenta
    // forma recomendada mas rapida
    while (carrito.firstElementChild) {
        carrito.removeChild(carrito.firstElementChild);
    }

    vaciarLocalStorage();
    // return false para prevenir algun salto extraño
    return false;
};

// localStorage
// obtener cursos localStorage
var obtenerCursosLocalStorage = function obtenerCursosLocalStorage() {
    var cursosLS = void 0;
    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
};
// guardar en el localstorage
var guardarCursoLocalStorage = function guardarCursoLocalStorage(curso) {
    var cursos = obtenerCursosLocalStorage();

    cursos.push(curso);
    localStorage.setItem('cursos', JSON.stringify(cursos));
};

// leer localStorage
var leerLocalStorage = function leerLocalStorage() {
    var cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function (infoCurso) {
        var row = document.createElement('tr');
        row.innerHTML = '<td>\n            <img src="' + infoCurso.imagen + '" alt="' + infoCurso.titulo + '">\n        </td>\n        <td>' + infoCurso.titulo + '</td>\n        <td>' + infoCurso.precio + '</td>\n        <td>\n            <a href="#" class="borrar-curso" data-id="' + infoCurso.id + '">X</a>\n        </td>    \n    ';
        carrito.appendChild(row);
    });
};

// eliminar curso de localStorage
var eliminarCursoLocalStorage = function eliminarCursoLocalStorage(curso) {
    var cursosLS = void 0;
    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function (cursoLS, index) {
        if (cursoLS.id === curso) {
            cursosLS.splice(index, 1);
        }
    });
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
};

// vaciar localStorage
var vaciarLocalStorage = function vaciarLocalStorage() {
    localStorage.clear();
};

// listeners
var cargarEventListeners = function cargarEventListeners() {
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

},{}]},{},[1]);
