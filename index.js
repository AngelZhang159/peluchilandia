let btnLeft = document.getElementById("index-carrusel-left")
let btnRight = document.getElementById("index-carrusel-right")
let imgCarrusel = document.getElementById("index-carrusel-img")

const imagenes = [
    { img: "./img/luna/luna.webp", alt: "Peluche de gato Luna" },
    { img: "./img/tom/tom.webp", alt: "Peluche de gato Tom" },
    { img: "./img/alberto/alberto.webp", alt: "Peluche de gorila Alberto" },
    { img: "./img/max/max.webp", alt: "Peluche de cáctus Max" },
    { img: "./img/trompi/trompi.webp", alt: "Peluche de elefante Trompi" },
    { img: "./img/coco/coco.webp", alt: "Peluche de delfín Coco" }
]

let currImgIndex = 0

imgCarrusel.src = imagenes[currImgIndex].img
imgCarrusel.alt = imagenes[currImgIndex].alt

function cambiarImagen(direccion) {
    if (direccion === 'anterior') {
        currImgIndex = (currImgIndex - 1 + imagenes.length) % imagenes.length
    } else {
        currImgIndex = (currImgIndex + 1) % imagenes.length
    }
    imgCarrusel.src = imagenes[currImgIndex].img
    imgCarrusel.alt = imagenes[currImgIndex].alt
}

btnLeft.addEventListener("click", () => cambiarImagen('anterior'))
btnRight.addEventListener("click", () => cambiarImagen('siguiente'))

btnLeft.addEventListener("keydown", (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        cambiarImagen('anterior')
    }
})

btnRight.addEventListener("keydown", (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        cambiarImagen('siguiente')
    }
})

document.addEventListener("keydown", (e) => {
    if (document.activeElement === btnLeft || document.activeElement === btnRight || document.activeElement === imgCarrusel) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault()
            cambiarImagen('anterior')
        } else if (e.key === 'ArrowRight') {
            e.preventDefault()
            cambiarImagen('siguiente')
        }
    }
})