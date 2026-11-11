// Detalles de la portada y de la lista de recursos, adaptados de Magic UI, Aceternity y shadcn/ui
// sin React. Sin JavaScript la página se ve completa: las cifras con su valor final y todos los recursos.

(function () {
  var sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var conCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // 1. Cifras que suben de 0 a su valor la primera vez que se ven (Number Ticker)
  //    Uso: <strong data-contar>15 %</strong>. El número sale del propio texto.
  var cifras = Array.prototype.slice.call(document.querySelectorAll("[data-contar]"));

  function contar(elemento) {
    var original = elemento.textContent;
    var partes = original.match(/^(\D*)(\d+)(.*)$/);
    if (!partes) return;
    var meta = parseInt(partes[2], 10);
    var duracion = 900;
    var inicio = null;

    function paso(tiempo) {
      if (inicio === null) inicio = tiempo;
      var avance = Math.min((tiempo - inicio) / duracion, 1);
      var suave = 1 - Math.pow(1 - avance, 3); // frena al final
      elemento.textContent = partes[1] + Math.round(meta * suave) + partes[3];
      if (avance < 1) requestAnimationFrame(paso);
      else elemento.textContent = original;
    }

    requestAnimationFrame(paso);
  }

  if (cifras.length && !sinMovimiento && "IntersectionObserver" in window) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        observador.unobserve(entrada.target);
        contar(entrada.target);
      });
    }, { threshold: 0.6 });

    cifras.forEach(function (cifra) {
      // El lector de pantalla oye el valor final, no la cuenta
      cifra.setAttribute("aria-label", cifra.textContent);
      observador.observe(cifra);
    });
  }

  // 2 y 3. Luz que sigue el cursor: en la portada (Spotlight) y en el borde de las tarjetas (Magic Card)
  //        Solo en computadora; el CSS lee --x y --y.
  function seguirCursor(elemento) {
    var pendiente = null;
    elemento.addEventListener("pointermove", function (evento) {
      pendiente = evento;
      if (elemento._cuadro) return;
      elemento._cuadro = requestAnimationFrame(function () {
        var caja = elemento.getBoundingClientRect();
        elemento.style.setProperty("--x", pendiente.clientX - caja.left + "px");
        elemento.style.setProperty("--y", pendiente.clientY - caja.top + "px");
        elemento._cuadro = null;
      });
    });
  }

  if (conCursor && !sinMovimiento) {
    Array.prototype.slice
      .call(document.querySelectorAll(".heroe, .lista-recursos .tarjeta"))
      .forEach(seguirCursor);
  }

  // 4. Filtro por tipo en la lista de recursos (al estilo de shadcn/ui)
  //    Los botones salen de las etiquetas (.chip) de cada tarjeta, así que un recurso nuevo
  //    aparece en el filtro sin tocar este archivo. Se muestra solo si hay dos tipos o más.
  var filtro = document.querySelector(".filtro");
  var lista = document.querySelector(".lista-recursos");
  if (!filtro || !lista) return;

  var items = Array.prototype.slice.call(lista.children);
  var tipos = [];
  items.forEach(function (item) {
    var chip = item.querySelector(".chip");
    var tipo = chip ? chip.textContent.trim() : "";
    item.dataset.tipo = tipo;
    if (tipo && tipos.indexOf(tipo) === -1) tipos.push(tipo);
  });
  if (tipos.length < 2) return;

  var botones = [];

  function crearBoton(texto, tipo) {
    var boton = document.createElement("button");
    boton.type = "button";
    boton.className = "filtro__opcion";
    boton.textContent = texto;
    boton.dataset.tipo = tipo;
    boton.setAttribute("aria-pressed", tipo === "" ? "true" : "false");
    boton.addEventListener("click", function () { elegir(tipo); });
    filtro.appendChild(boton);
    botones.push(boton);
  }

  function elegir(tipo) {
    botones.forEach(function (boton) {
      boton.setAttribute("aria-pressed", boton.dataset.tipo === tipo ? "true" : "false");
    });
    items.forEach(function (item) {
      item.hidden = tipo !== "" && item.dataset.tipo !== tipo;
    });
  }

  crearBoton(filtro.dataset.todos || "Todos", "");
  tipos.forEach(function (tipo) { crearBoton(tipo, tipo); });
  filtro.hidden = false;
})();
