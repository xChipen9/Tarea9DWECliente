// Variables de las categorías correctas
const categoriasCorrectas = {
    manzana: "frutas",
    plátano: "frutas",
    perro: "animales",
    gato: "animales",
    rojo: "colores",
    azul: "colores"
};

// Habilitar drag-and-drop
const palabras = document.querySelectorAll(".palabra");
const categorias = document.querySelectorAll(".categoria");

palabras.forEach(palabra => {
    palabra.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text", event.target.id);
    });
});

categorias.forEach(categoria => {
    categoria.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    categoria.addEventListener("drop", (event) => {
        event.preventDefault();
        const palabraId = event.dataTransfer.getData("text");
        const palabraElemento = document.getElementById(palabraId);
        categoria.appendChild(palabraElemento);
    });
});

// Validar la clasificación
document.getElementById("validar").addEventListener("click", () => {
    let correctCount = 0;

    palabras.forEach(palabra => {
        const categoriaPadre = palabra.parentElement.id; 
        const palabraId = palabra.id;

        if (categoriasCorrectas[palabraId] === categoriaPadre) {
            palabra.classList.add("correct");
            palabra.classList.remove("incorrect");
            correctCount++;
        } else {
            palabra.classList.add("incorrect");
            palabra.classList.remove("correct");
        }
    });

    const comentario = document.getElementById("comentario");
    if (correctCount === palabras.length) {
        comentario.textContent = "¡Felicidades! Has clasificado todas las palabras correctamente.";
        comentario.style.color = "#4caf50";
    } else {
        comentario.textContent = `Has clasificado ${correctCount} palabras correctamente. ¡Intentalo de nuevo!`;
        comentario.style.color = "#f44336";
    }
});
