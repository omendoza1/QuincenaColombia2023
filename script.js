// Deshabilitar el botón limpiar al cargar la página
document.getElementById("btn-limpiar").disabled = true;
document.getElementById("btn-calcular").disabled = true;

// Función para calcular el sueldo final
function calcularSueldo() {
  // Obtener los valores de los campos del formulario
  const sueldoBase = 1160000;
  const subsidioTransporte = 70000;
  const deduccionSalud = 47218;
  const deduccionPension = 47218;
  const horasExtraDiurnasOrdinarias = document.getElementById("horas-extra-diurnas-ordinarias").value;
  const horasExtraNocturnasOrdinarias = document.getElementById("horas-extra-nocturnas-ordinarias").value;
  const horasRecargoNocturnoOrdinario = document.getElementById("horas-recargo-nocturno-ordinario").value;
  const horasExtraDiurnasFestivas = document.getElementById("horas-extra-diurnas-festivas").value;
  const horasExtraNocturnasFestivas = document.getElementById("horas-extra-nocturnas-festivas").value;
  const horasRecargoNocturnoFestivo = document.getElementById("horas-recargo-nocturno-festivo").value;
  const diasFestivosTrabajados = document.getElementById("dias-festivos-trabajados").value;
  const tarifas = [6041, 8457, 1691, 9665, 12081, 10149];

  // Calcular el total devengado
  let totalDevengado = sueldoBase / 2;
  totalDevengado += tarifas[0] * horasExtraDiurnasOrdinarias;
  totalDevengado += tarifas[1] * horasExtraNocturnasOrdinarias;
  totalDevengado += tarifas[2] * horasRecargoNocturnoOrdinario;
  totalDevengado += tarifas[3] * horasExtraDiurnasFestivas;
  totalDevengado += tarifas[4] * horasExtraNocturnasFestivas;
  totalDevengado += tarifas[5] * horasRecargoNocturnoFestivo;
  totalDevengado += 67665 * diasFestivosTrabajados;

  // Calcular el sueldo final
  const sueldo = totalDevengado - deduccionSalud - deduccionPension + subsidioTransporte;

  // Mostrar el resultado
  document.getElementById("resultado").innerHTML = `El sueldo final a recibir es: $${sueldo.toLocaleString()}`;
}

// Deshabilitar el botón calcular si hay algún campo vacío
function validarFormulario() {
  const campos = document.querySelectorAll("#formulario-liquidacion .form-control");
  let formularioValido = true;
  for (let i = 0; i < campos.length; i++) {
    if (campos[i].value === "") {
      formularioValido = false;
      break;
    }
  }
  document.getElementById("btn-calcular").disabled = !formularioValido;
}

// Limpiar el formulario y habilitar los campos
function limpiarFormulario() {

  const campos = document.querySelectorAll("#formulario-liquidacion .form-control");
  for (let i = 0; i < campos.length; i++) {
    campos[i].value = "0";
    campos[i].disabled = false;
  }
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("btn-limpiar").disabled = true;
  document.getElementById("btn-calcular").disabled = true;
}

// Eventos al cargar la página
window.addEventListener("load", () => {
  // Deshabilitar el spin de los campos de tipo number
  const campos = document.querySelectorAll("#formulario-liquidacion .form-control[type=number]");
  for (let i = 0; i < campos.length; i++) {
    campos[i].addEventListener("input", e => {
      e.target.value = parseInt(e.target.value) || "";
    });
  }

  // Validar el formulario al cambiar el valor de algún campo
  const formulario = document.getElementById("formulario-liquidacion");
  formulario.addEventListener("input", validarFormulario);

  // Calcular el sueldo al hacer clic en el botón calcular
  const btnCalcular = document.getElementById("btn-calcular");
  btnCalcular.addEventListener("click", () => {
    calcularSueldo();
    btnCalcular.disabled = true;
    document.getElementById("btn-limpiar").disabled = false;
    formulario.querySelectorAll(".form-control").forEach(campo => {
      campo.disabled = true;
    });
  });

  // Limpiar el formulario al hacer clic en el botón limpiar
  const btnLimpiar = document.getElementById("btn-limpiar");
  btnLimpiar.addEventListener("click", limpiarFormulario);
});
const formulario = document.getElementById('formulario-liquidacion');
const botonEnviar = formulario.querySelector('.btn-primary');

botonEnviar.addEventListener('click', () => {
  formulario.classList.add('active');
});
const inputs = document.querySelectorAll(".form-control");


inputs.forEach(input => {
    let noBorrar = false;

    input.addEventListener("focus", function() {
      if (this.value === "0") {
        noBorrar = true;
      }
    });

    input.addEventListener("keydown", function(event) {
      if (event.key === "Backspace" && noBorrar) {
        event.preventDefault();
      }

      if (this.value > "0") {
        noBorrar = false;
      }
    });

    input.addEventListener("keyup", function() {
      if (this.value === "") {
        this.value = "0";
      }
    });
  });
