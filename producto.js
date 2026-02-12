import { productos } from "./producto-data.js";

let producto = location.search.substring(4)

let prod = productos.find(p => p.id === producto)
if (prod != null) {
    loadPage(prod)
}

function loadPage(prod) {

    let prodDivPrincipal = document.getElementById("prod-img-principal")
    let prodDivCarrusel = document.getElementById("prod-img-carrusel")

    let prodNombre = document.getElementById("prod-nombre")
    let prodPrecio = document.getElementById("prod-precio")
    let prodMedidas = document.getElementById("prod-medidas")
    let prodMateriales = document.getElementById("prod-materiales")
    let prodStock = document.getElementById("prod-stock")
    let prodDescTitulo = document.getElementById("prod-desc-titulo")
    let prodDesc = document.getElementById("prod-desc")
    let prodDescImg = document.getElementById("prod-desc-img")
    let prodBtnCompra = document.getElementById("prod-btn-compra")

    prodDivPrincipal.innerHTML = ""
    let imgPrincipal = document.createElement("img")
    imgPrincipal.src = prod.img[0]
    imgPrincipal.alt = `Imagen principal del producto ${prod.nombre}`
    prodDivPrincipal.appendChild(imgPrincipal)

    prodDivCarrusel.innerHTML = ""
    prod.img.forEach((imgSrc, index) => {
        let img = document.createElement("img")
        img.src = imgSrc
        img.alt = `Imagen ${index + 1} del producto ${prod.nombre}`
        img.setAttribute("role", "button")
        img.setAttribute("tabindex", "0")

        const cambiarImagen = () => {
            imgPrincipal.src = imgSrc
            imgPrincipal.alt = `Imagen principal del producto ${prod.nombre}`
        }

        img.addEventListener("click", cambiarImagen)

        img.addEventListener("keydown", (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                cambiarImagen()
            }
        })

        prodDivCarrusel.appendChild(img)
    })

    prodNombre.textContent = prod.nombre.toUpperCase()
    prodPrecio.textContent = `${prod.precio} EUR`
    prodMedidas.textContent = `H ${prod.medidas[0]} W ${prod.medidas[1]} D ${prod.medidas[2]}`
    prod.materiales.forEach(mat => {
        let li = document.createElement("li")
        li.textContent = mat
        prodMateriales.appendChild(li)
    })
    if (prod.stock) {
        let spanStock = document.createElement("span")
        spanStock.classList.add("item-stock")
        spanStock.textContent = "EN STOCK"
        prodStock.appendChild(spanStock)
        prodBtnCompra.disabled = false
    } else {
        let spanStock = document.createElement("span")
        spanStock.classList.add("item-no-stock")
        spanStock.textContent = "SIN STOCK"
        prodStock.appendChild(spanStock)
        prodBtnCompra.disabled = true
    }
    prodDescTitulo.textContent = prod.descTitulo
    prodDesc.textContent = prod.desc
    prodDescImg.src = prod.descImg
    prodDescImg.alt = prod.descImgAlt
    prodBtnCompra.addEventListener("click", (e) => {
        e.preventDefault()

        let carrito = JSON.parse(localStorage.getItem("carrito")) || []

        let itemEnCarrito = carrito.find(item => item.id === prod.id)

        if (itemEnCarrito) {
            itemEnCarrito.cantidad += 1
        } else {
            carrito.push({ id: prod.id, cantidad: 1 })
        }

        localStorage.setItem("carrito", JSON.stringify(carrito))
        mostrarNotificacionCompra()
    })
}


function mostrarNotificacionCompra() {
    let notificacionCompra = document.getElementById("notificacionCompra")

    notificacionCompra.classList.add("notificacionCompra")

    if (notificacionCompra.classList.contains("notificacionCompra")) {
        setTimeout(() => {
            notificacionCompra.classList.remove("notificacionCompra")
        }, 2000);
    }
}