// Botón "Copiar" de los recursos.
// Uso: <button class="copiar" data-copiar="id-del-texto">…</button>
// data-mensaje (opcional): el aviso para lectores de pantalla; las páginas en inglés lo traen en inglés.
// Copia el texto tal cual se ve (sin etiquetas HTML) y confirma en el mismo botón.

(function () {
  var DURACION_CONFIRMACION = 2000;

  function copiarConRespaldo(texto) {
    var area = document.createElement("textarea");
    area.value = texto;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {
      ok = false;
    }
    document.body.removeChild(area);
    return ok;
  }

  function copiar(texto) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(texto).then(
        function () { return true; },
        function () { return copiarConRespaldo(texto); }
      );
    }
    return Promise.resolve(copiarConRespaldo(texto));
  }

  document.querySelectorAll("[data-copiar]").forEach(function (boton) {
    var origen = document.getElementById(boton.getAttribute("data-copiar"));
    var anuncio = document.getElementById(boton.getAttribute("data-anuncio"));
    var error = document.getElementById(boton.getAttribute("data-error"));
    var temporizador;

    if (!origen) return;

    boton.addEventListener("click", function () {
      copiar(origen.textContent.trim()).then(function (ok) {
        if (!ok) {
          if (error) error.hidden = false;
          return;
        }
        if (error) error.hidden = true;
        boton.classList.add("copiado");
        if (anuncio) anuncio.textContent = boton.getAttribute("data-mensaje") || "Prompt copiado. Ya puedes pegarlo en tu herramienta de IA.";
        // Si se vuelve a pulsar, el aviso dura otros 2 segundos desde ese clic
        clearTimeout(temporizador);
        temporizador = setTimeout(function () {
          boton.classList.remove("copiado");
          if (anuncio) anuncio.textContent = "";
        }, DURACION_CONFIRMACION);
      });
    });
  });
})();
