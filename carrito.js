import { productos } from "./producto-data.js";

let resumenDiv = document.querySelector(".resumen");

resumenDiv.innerHTML = ""

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

if (carrito.length === 0) {
    let msgCarritoVacio = document.createElement("p");
    msgCarritoVacio.style.textAlign = "center";
    msgCarritoVacio.style.fontSize = "2rem";
    msgCarritoVacio.style.marginTop = "2rem";
    msgCarritoVacio.textContent = "Tu carrito está vacío.";
    resumenDiv.appendChild(msgCarritoVacio);
} else {
    carrito.forEach(item => {
        let producto = productos.find(p => p.id === item.id);

        let itemDiv = document.createElement("div");
        itemDiv.classList.add("item-carrito");
        itemDiv.innerHTML = `
        <div>
            <img src="img/${producto.id}/${producto.id}.webp" alt="Peluche ${producto.nombre}" class="item-carrito-img">
            <div class="item-carrito-body">
                <h2>${producto.nombre.toUpperCase()}</h2>
                <div>
                    <span class="item-precio-individual">${producto.precio} EUR</span>
                    <div>
                        ${producto.stock ? `<span class="item-stock">EN STOCK</span>` : `<span class="item-no-stock">SIN STOCK</span>`}
                    </div>
                </div>
            </div>
        </div>
        <div class="item-end">
            <div class="item-carrito-select">
                <button type="button" class="btn-eliminar" data-id="${producto.id}">
                    <img src="img/basura.svg" alt="" aria-hidden="true">
                </button>
                <div class="item-carrito-btn">
                    <button type="button" class="btn-decrementar" data-id="${producto.id}">-</button>
                    <div></div>
                    <span aria-label="Cantidad: ${item.cantidad}">${item.cantidad}</span>
                    <div></div>
                    <button type="button" class="btn-incrementar" data-id="${producto.id}">+</button>
                </div>
            </div>
            <span class="item-carrito-total" aria-label="Total: ${producto.precio * item.cantidad} euros">${producto.precio * item.cantidad} EUR</span>
        </div>
    `;

        const btnEliminar = itemDiv.querySelector(".btn-eliminar");
        btnEliminar.setAttribute("aria-label", `Eliminar ${producto.nombre} del carrito`);
        btnEliminar.addEventListener("click", () => {
            if (mostrarConfirmacionEliminar(producto.nombre)) {
                carrito = carrito.filter(i => i.id !== producto.id);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                location.reload();
            }
        });

        const btnDecrementar = itemDiv.querySelector(".btn-decrementar");
        btnDecrementar.setAttribute("aria-label", `Disminuir cantidad de ${producto.nombre}`);
        btnDecrementar.addEventListener("click", () => {
            let itemCarrito = carrito.find(i => i.id === producto.id);
            if (itemCarrito.cantidad > 1) {
                itemCarrito.cantidad--;
                localStorage.setItem("carrito", JSON.stringify(carrito));
                location.reload();
            } else {
                if (mostrarConfirmacionEliminar(producto.nombre)) {
                    carrito = carrito.filter(i => i.id !== producto.id);
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    location.reload();
                }
            }
        });

        const btnIncrementar = itemDiv.querySelector(".btn-incrementar");
        btnIncrementar.setAttribute("aria-label", `Aumentar cantidad de ${producto.nombre}`);
        btnIncrementar.addEventListener("click", () => {
            let itemCarrito = carrito.find(i => i.id === producto.id);
            itemCarrito.cantidad++;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            location.reload();
        });
        resumenDiv.appendChild(itemDiv);
    });
}

let productosDiv = document.querySelector(".carrito-productos");

carrito.forEach(item => {
    let producto = productos.find(p => p.id === item.id);
    let productoDiv = document.createElement("div");
    productoDiv.classList.add("producto-carrito");
    productoDiv.innerHTML = `
        <span>${producto.nombre.toUpperCase()} X${item.cantidad}</span>
        <span>${producto.precio * item.cantidad} EUR</span>
    `;
    productosDiv.appendChild(productoDiv);
});

let subtotalSpan = document.getElementById("carrito-subtotal");
let subtotal = carrito.reduce((acc, item) => {
    let producto = productos.find(p => p.id === item.id);
    return acc + (producto.precio * item.cantidad);
}, 0);
subtotalSpan.textContent = `${subtotal} EUR`;

let envioSpan = document.getElementById("carrito-envio");
let envio = subtotal > 0 ? 20 : 0;
envioSpan.textContent = `${envio} EUR`;

let totalSpan = document.getElementById("carrito-total");
let total = subtotal + envio;
totalSpan.textContent = `${total} EUR`;

function mostrarConfirmacionEliminar(nombre) {
    return confirm(`¿Estás seguro de que deseas eliminar ${nombre} del carrito?`);
}

// Handle form submission
let formulario = document.querySelector("form");
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear cart from localStorage
    localStorage.removeItem("carrito");

    // Reset all form fields
    formulario.reset();

    // Show confirmation and reload page
    alert("¡Compra realizada con éxito! Gracias por tu pedido.");
    location.reload();
});