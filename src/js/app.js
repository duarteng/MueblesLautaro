import { 
    galeriaDB, 
    cajoneras, 
    cocina, 
    comodas, 
    escaleras, 
    escritorios, 
    modulos, 
    placard, 
    racks, 
    tv, 
    wc 
} from "./db.js"

document.addEventListener('DOMContentLoaded', () => {
    
    if (document.querySelector('#listaProductos')) {
        galeriaProductos({
            selector: '#listaProductos',
            db: galeriaDB,
            imgPath: 'build/img'
        });
    }

    if (document.querySelector('#cajoneras')) {
        galeriaProductos({
            selector: '#cajoneras',
            db: cajoneras,
            imgPath: '../build/img/cajoneras'
        });
    }

    if (document.querySelector('#cocina')) {
        galeriaProductos({
            selector: '#cocina',
            db: cocina,
            imgPath: '../build/img/cocina'
        });
    }

    if (document.querySelector('#comodas')) {
        galeriaProductos({
            selector: '#comodas',
            db: comodas,
            imgPath: '../build/img/comodas'
        });
    }

    if (document.querySelector('#escaleras')) {
        galeriaProductos({
            selector: '#escaleras',
            db: escaleras,
            imgPath: '../build/img/escaleras'
        });
    }

    if (document.querySelector('#escritorios')) {
        galeriaProductos({
            selector: '#escritorios',
            db: escritorios,
            imgPath: '../build/img/escritorios'
        });
    }

    if (document.querySelector('#modulos')) {
        galeriaProductos({
            selector: '#modulos',
            db: modulos,
            imgPath: '../build/img/modulos'
        });
    }

    if (document.querySelector('#placard')) {
        galeriaProductos({
            selector: '#placard',
            db: placard,
            imgPath: '../build/img/placard'
        });
    }

    if (document.querySelector('#racks')) {
        galeriaProductos({
            selector: '#racks',
            db: racks,
            imgPath: '../build/img/racks'
        });
    }

    if (document.querySelector('#tv')) {
        galeriaProductos({
            selector: '#tv',
            db: tv,
            imgPath: '../build/img/tv'
        });
    }

    if (document.querySelector('#wc')) {
        galeriaProductos({
            selector: '#wc',
            db: wc,
            imgPath: '../build/img/wc'
        });
    }

});

/* =================== SHOW MENU ===================== */
const overlay = document.getElementById('nav-overlay');
const toggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav-menu');
const toggleMenu = () => {
    const isMenuActive = nav.classList.toggle('show');
    overlay.style.display = isMenuActive ? 'block' : 'none';
    document.body.style.overflow = isMenuActive ? 'hidden' : 'auto';
    toggle.setAttribute('aria-expanded', isMenuActive);
    nav.setAttribute('aria-hidden', !isMenuActive);
};
if (toggle && nav && overlay) {
    toggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
}
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('show')) {
        toggleMenu()
    }
})

/* =================================== SHOW PRODUCTOS ======================================== */
/**
 * imgPath = rutea desde la raiz hasta la carpeta requerida
 * producto.image = es el nombre del archivo de la img
*/
function galeriaProductos({ selector, db, imgPath }) {
    const productos = document.querySelector(selector)

    db.forEach(producto => {
        const phoneNumber = 5491126679879
        const mensaje = "Hola,cómo estás? para saber sobre un presupuesto."
        const imagen = document.createElement('LI')
        imagen.classList.add('container__list')

        const urlWpp = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(mensaje)}`

        imagen.innerHTML = `
            <div class="container__producto">
                <picture>
                    <img class="producto__imagen" width="200" height="150" src="${imgPath}/${producto.image}.webp" alt="${producto.name}" loading="lazy">
                </picture>
                <p class="producto__description">${producto.description}</p>
                <a href="${urlWpp}" class="btn-comprar" target="_blank">
                    Comprar
                </a>
            </div>
        `;

        handleImageHover(imagen, producto.image, producto.hoverImg, imgPath)

        const productoImg = imagen.querySelector('.producto__imagen')
        productoImg.addEventListener('click', () => {
            crearImgOverlay(productoImg.src)
        })

        productos.appendChild(imagen)
    });
}

/**
 * Manejo del cambio de imagen al dar hover 
 * imageElement = Toma como parametro el nombre de una clase o ID
 * defaultImage = Toma el ruteo de la imagen
 * hoverImg = Toma el ruteo de la imagen que se muestra al dar hover
*/
function handleImageHover(imageElement, defaultImage, hoverImg, imgPath) {
    const productoImg = imageElement.querySelector('.producto__imagen')

    productoImg.addEventListener('mouseover', () => {
        productoImg.classList.add('fade-out')
        setTimeout(() => {
            productoImg.src = `${imgPath}/${hoverImg}.webp`
            productoImg.classList.remove('fade-out')
        }, 200)
    })

    productoImg.addEventListener('mouseout', () => {
        productoImg.classList.add('fade-out')
        setTimeout(() => {
            productoImg.src = `${imgPath}/${defaultImage}.webp`
            productoImg.classList.remove('fade-out')
        }, 200)
    })
}

/**
 * Crear Imagen grande y Overlay al dar click en la imagen 
*/
function crearImgOverlay(imagenSrc) {

    // Bloquear Scroll en el body
    document.body.style.overflow = 'hidden'

    // Crear elemento overlay
    const overlay = document.createElement('DIV');
    overlay.classList.add('overlay');
    
    // Crear la imagen grande
    const imagenGrande = document.createElement('IMG');
    imagenGrande.src = imagenSrc;
    imagenGrande.classList.add('imagen__grande');
    
    // Añadir la imagen al overlay
    overlay.appendChild(imagenGrande);
    document.body.appendChild(overlay);
    
    // Funcion para cerrar el overlay
    const closeOverlay = () => {
        document.body.removeChild(overlay)
        document.body.style.overflow = ''
        document.removeEventListener('keydown', handleKeyDown)
    }

    // Evento para cerrar el overlay al hacer clic fuera de la imagen
    overlay.addEventListener('click', e => {
        if (e.target === overlay) {
            closeOverlay()
        }
    })

    // Evento para cerrar el overlay al presionar la tecla Escape
    const handleKeyDown = e => {
        if (e.key === 'Escape') {
            closeOverlay()
        }
    }

    // Añadir el evento keydown al documento
    document.addEventListener('keydown', handleKeyDown)
}


/* ======================== SCROLL REVEAL ============================== */
const sr = ScrollReveal({
    reset: true,
    origin: 'bottom',
    distance: '200px',
    duration: 1200,
    delay: 250,
})
sr.reveal('.productos__header', {origin: 'top'})

// const productos = document.querySelectorAll('.lista__productos')
// productos.forEach( (producto, index) => {
//     ScrollReveal().reveal(producto, {
//         delay: index * 1000, // Incrementa el retraso en 1000ms (1 segundo) por cada elemento
//         duration: 1000,      // Duración de la animación
//         distance: '50px',    // Distancia desde donde aparecerá el elemento
//         origin: 'bottom',    // Dirección desde la que aparecerá el elemento
//         easing: 'ease-in-out'
//     })
// })


sr.reveal('.lista__productos', {delay: 550})