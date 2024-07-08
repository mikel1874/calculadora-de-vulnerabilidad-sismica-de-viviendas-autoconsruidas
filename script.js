function calcularFaltaMantenimiento() {
  let salitre = parseInt(document.getElementById("salitre").value);
  let fisuras = parseInt(document.getElementById("fisuras").value);
  let humedad = parseInt(document.getElementById("humedad").value);
  let pintura = parseInt(document.getElementById("pintura").value);
  let techo = parseInt(document.getElementById("techo").value);
  let electrica = parseInt(document.getElementById("electrica").value);
  let agua = parseInt(document.getElementById("agua").value);

  let faltaMantenimiento = 1 + 
    0.5 * salitre +
    0.5 * fisuras +
    0.4 * humedad +
    0.3 * pintura +
    0.3 * techo +
    0.2 * electrica +
    0.2 * agua;

  document.getElementById("resultadoFaltaMantenimiento").innerHTML = `Falta de Mantenimiento: ${faltaMantenimiento.toFixed(2)}`; 
}

function calcularVulnerabilidad() {
  let resistencia = parseFloat(document.getElementById("resistencia").value);
  let altura = parseFloat(document.getElementById("altura").value);
  let edad = parseInt(document.getElementById("edad").value);

  // Calcula la falta de mantenimiento aquí
  let faltaMantenimiento = 1 + 
    0.5 * parseInt(document.getElementById("salitre").value) +
    0.5 * parseInt(document.getElementById("fisuras").value) +
    0.4 * parseInt(document.getElementById("humedad").value) +
    0.3 * parseInt(document.getElementById("pintura").value) +
    0.3 * parseInt(document.getElementById("techo").value) +
    0.2 * parseInt(document.getElementById("electrica").value) +
    0.2 * parseInt(document.getElementById("agua").value);

  // Mostrar la falta de mantenimiento debajo del input de edad
  document.getElementById("resultadoFaltaMantenimiento").innerHTML = `Falta de Mantenimiento: ${faltaMantenimiento.toFixed(2)}`;

  // Corrección de la ecuación de la vulnerabilidad
  let vulnerabilidad = 1.5 - 0.02 * resistencia + 0.4 * altura + 0.2 * edad + 0.5 * faltaMantenimiento;

  document.getElementById("resultadoVulnerabilidad").innerHTML = ''; // Limpia el contenido actual

  let resultado = document.createElement('p'); // Crea un nuevo elemento <p>
  resultado.textContent = `La vulnerabilidad sísmica del edificio es: ${vulnerabilidad.toFixed(2)}`;

  if (vulnerabilidad <= 10) {
    resultado.style.color = 'green'; // Verde si está más cerca de 0
    mostrarRecomendaciones('green');
    mostrarImagen("https://i.pinimg.com/564x/75/ce/9b/75ce9b7d1d11ab349453185929e9ef91.jpg"); // URL de la imagen verde
  } else if (vulnerabilidad >= 25) {
    resultado.style.color = 'red'; // Rojo si está más cerca de 38
    mostrarRecomendaciones('red');
    mostrarImagen("https://img.freepik.com/fotos-premium/destruye-edificio-palabra-edificio-esta-pared_546042-393.jpg?w=826"); // URL de la imagen roja
  } else {
    resultado.style.color = 'yellow'; // Amarillo si está en el medio
    mostrarRecomendaciones('yellow');
    mostrarImagen("https://i.pinimg.com/564x/bc/76/e6/bc76e67aaabf35fde25c3f2235c4af9a.jpg"); // URL de la imagen amarilla
  }

  document.getElementById("resultadoVulnerabilidad").appendChild(resultado); // Agrega el <p> al div

  // Crear el gráfico de barras apilables
  let chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Componentes de la Vulnerabilidad Sísmica"
    },
    axisY: {
      title: "Valor"
    },
    data: [{
      type: "stackedBar",
      showInLegend: "true",
      legendText: "Edificio",
      dataPoints: [
        { y: 1.5, label: "Base", color: "#fdd" },
        { y: -0.02 * resistencia, label: "Resistencia del Concreto", color: "#e0ffff" }, // Corrección
        { y: 0.4 * altura, label: "Altura del Edificio", color: "#fff0e0" },
        { y: 0.2 * edad, label: "Edad del Edificio", color: "#e0ffff" },
        { y: 0.5 * faltaMantenimiento, label: "Falta de Mantenimiento", color: "#ffe0e0" },
      ]
    }]
  });
  chart.render();

}

function mostrarImagen(urlImagen) {
  let contenedorImagen = document.getElementById("interpretacion-imagen");
  // contenedorImagen.innerHTML = ''; // No limpiamos el contenedor, ya que la imagen y el texto deben estar juntos
  let imagen = document.createElement("img");
  imagen.src = urlImagen;
  contenedorImagen.appendChild(imagen);
}

function mostrarRecomendaciones(color) {
  let contenedorRecomendaciones = document.getElementById("interpretacion-recomendaciones");
  contenedorRecomendaciones.innerHTML = ''; // Limpiamos el contenedor solo para las recomendaciones

  let recomendaciones;
  if (color === 'red') {
    recomendaciones = "Consulta con un ingeniero estructural para evaluar y reforzar la estructura de tu casa utilizando técnicas modernas de construcción antisísmica. Considera una remodelación significativa que incluya el uso de materiales de alta calidad y refuerzos en las áreas críticas.";
  } else if (color === 'yellow') {
    recomendaciones = "Realiza mejoras en las ventanas y puertas instalando versiones más resistentes a impactos y con marcos reforzados. Asegúrate de anclar adecuadamente los elementos no estructurales y revisa periódicamente la estructura para realizar reparaciones menores que fortalezcan la resistencia sísmica.";
  } else if (color === 'green') {
    recomendaciones = "Mantén un programa de mantenimiento regular y realiza inspecciones periódicas para asegurar que la estructura se mantiene en buen estado. Considera instalar sistemas adicionales de amortiguación sísmica y mantente actualizado con los códigos de construcción sísmica para realizar mejoras cuando sea necesario.";
  }

  let parrafo = document.createElement('p');
  parrafo.textContent = recomendaciones;
  contenedorRecomendaciones.appendChild(parrafo);
}

function mostrarDefinicion(variable) {
  let definicion = document.getElementById(`definicion-${variable}`);
  definicion.classList.toggle("hidden");
}

function resetearCalculadora() {
  // Resetear inputs de falta de mantenimiento
  document.getElementById("salitre").value = 0;
  document.getElementById("fisuras").value = 0;
  document.getElementById("humedad").value = 0;
  document.getElementById("pintura").value = 0;
  document.getElementById("techo").value = 0;
  document.getElementById("electrica").value = 0;
  document.getElementById("agua").value = 0;
  document.getElementById("resultadoFaltaMantenimiento").innerHTML = ''; // Limpia el resultado

  // Resetear inputs de vulnerabilidad sísmica
  document.getElementById("resistencia").value = '';
  document.getElementById("altura").value = '';
  document.getElementById("edad").value = '';
  document.getElementById("resultadoVulnerabilidad").innerHTML = ''; // Limpia el resultado

  // Limpiar el gráfico
  let chart = new CanvasJS.Chart("chartContainer", {}); // Crea un nuevo gráfico vacío
  chart.render();

  // Limpiar la interpretación
  document.getElementById("interpretacion-recomendaciones").innerHTML = '';
  document.getElementById("interpretacion-imagen").innerHTML = '';
}