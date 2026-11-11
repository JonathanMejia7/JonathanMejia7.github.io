// Recursos con varias formas (por ejemplo, prompt y skill): cada tarjeta despliega su sección.
// Uso: <a class="opcion" href="#id-de-la-seccion" aria-controls="id-de-la-seccion">…</a>
// Sin JavaScript se ven todas las secciones y las tarjetas funcionan como enlaces.
// Un enlace con #id-de-la-seccion (por ejemplo, desde la descripción del video) abre esa sección.

(function () {
  var opciones = Array.prototype.slice.call(document.querySelectorAll(".opcion[aria-controls]"));
  if (!opciones.length) return;

  function seccion(opcion) {
    return document.getElementById(opcion.getAttribute("aria-controls"));
  }

  function mostrar(elegida, mover) {
    opciones.forEach(function (opcion) {
      var abierta = opcion === elegida;
      opcion.setAttribute("aria-expanded", abierta ? "true" : "false");
      seccion(opcion).hidden = !abierta;
    });
    if (elegida) {
      history.replaceState(null, "", "#" + elegida.getAttribute("aria-controls"));
      if (mover) {
        // En el celular la sección queda debajo de las tarjetas: se acerca sin saltar de golpe
        var destino = seccion(elegida);
        var arriba = destino.getBoundingClientRect().top;
        if (arriba > window.innerHeight * 0.75) destino.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      history.replaceState(null, "", location.pathname + location.search);
    }
  }

  opciones.forEach(function (opcion) {
    opcion.addEventListener("click", function (evento) {
      evento.preventDefault();
      var yaAbierta = opcion.getAttribute("aria-expanded") === "true";
      mostrar(yaAbierta ? null : opcion, !yaAbierta);
    });
  });

  var inicial = opciones.filter(function (opcion) {
    return "#" + opcion.getAttribute("aria-controls") === location.hash;
  })[0];
  mostrar(inicial || null, false);
})();
