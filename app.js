// ================= DATA =================

const Cat_SITIO = [{ SITIO: "MTY" }, { SITIO: "CDMX" }];

const Cat_SALA = [
  { SITIO: "MTY", SALA: "DC1" },
  { SITIO: "MTY", SALA: "DC2" }
];

const Cat_FILA = [
  { SITIO: "MTY", SALA: "DC1", FILA: "F1" }
];

const Cat_RACK = [
  { SALA: "DC1", FILA: "F1", RACK: "R01" }
];

// ✅ LOCAL STORAGE
let dataInicial = [
  {
    SITIO: "MTY",
    SALA: "DC1",
    FILA: "F1",
    RACK: "R01",
    PRODUCT_NAME: "C9300",
    SERIAL_NUMBER: "SN001",
    STATUS: "Active"
  }
];

let Tablas_Datos = JSON.parse(localStorage.getItem("inventario")) || dataInicial;

// ================= ELEMENTOS =================

const sitio = document.getElementById("sitio");
const sala = document.getElementById("sala");
const fila = document.getElementById("fila");
const rack = document.getElementById("rack");

let selectedItem = null;

// ================= INIT =================

function init() {
  loadSitios();

  sala.innerHTML = "<option value=''>Seleccione</option>";
  fila.innerHTML = "<option value=''>Seleccione</option>";
  rack.innerHTML = "<option value=''>Seleccione</option>";
}

init();

// ================= NAVEGACION =================

function showScreen(id) {
  document.querySelectorAll(".screen")
    .forEach(s => s.classList.remove("active"));

  document.getElementById(id).classList.add("active");
}

function goNuevo() {
  showScreen("nuevo");
}

function volver() {
  showScreen("screen1");
}

// ================= POPUP =================

function confirmarVolver() {
  popupConfirm.style.display = "flex";
}

function cerrarPopup() {
  popupConfirm.style.display = "none";
}

function aceptarVolver() {
  cerrarPopup();
  volver();
}

// ================= LOAD =================

function loadSitios() {
  sitio.innerHTML = "<option value=''>Seleccione</option>";

  Cat_SITIO.forEach(x => {
    sitio.innerHTML += `<option>${x.SITIO}</option>`;
  });
}

// ================= RESET =================

function resetResultados() {
  count.innerText = 0;
  results.innerHTML = "";
}

// ================= FILTROS =================

sitio.onchange = () => {
  resetResultados();

  sala.innerHTML = "<option>Seleccione</option>";
  fila.innerHTML = "<option>Seleccione</option>";
  rack.innerHTML = "<option>Seleccione</option>";

  Cat_SALA
    .filter(x => x.SITIO === sitio.value)
    .forEach(x => sala.innerHTML += `<option>${x.SALA}</option>`);
};

sala.onchange = () => {
  resetResultados();

  fila.innerHTML = "<option>Seleccione</option>";
  rack.innerHTML = "<option>Seleccione</option>";

  Cat_FILA
    .filter(x => x.SALA === sala.value)
    .forEach(x => fila.innerHTML += `<option>${x.FILA}</option>`);
};

fila.onchange = () => {
  resetResultados();

  rack.innerHTML = "<option>Seleccione</option>";

  Cat_RACK
    .filter(x => x.FILA === fila.value)
    .forEach(x => rack.innerHTML += `<option>${x.RACK}</option>`);
};

rack.onchange = loadEquipos;

// ================= EQUIPOS =================

function loadEquipos() {

  if (!rack.value) return resetResultados();

  const filtered = Tablas_Datos.filter(x =>
    x.SITIO === sitio.value &&
    x.SALA === sala.value &&
    x.FILA === fila.value &&
    x.RACK === rack.value
  );

  count.innerText = filtered.length;

  if (filtered.length === 0) {
    results.innerHTML = "<p>No hay datos</p>";
    return;
  }

  let html = "";

  filtered.forEach(item => {
    html += `
      <div class="card" onclick="verDetalle('${item.SERIAL_NUMBER}')">
        ${item.PRODUCT_NAME} - ${item.SERIAL_NUMBER}
      </div>
    `;
  });

  results.innerHTML = html;
}

// ================= DETALLE =================

function verDetalle(serial) {
  const item = Tablas_Datos.find(x => x.SERIAL_NUMBER === serial);

  selectedItem = Tablas_Datos.indexOf(item);

  detalleContent.innerHTML = `
    <p>${item.PRODUCT_NAME}</p>
    <p>${item.SERIAL_NUMBER}</p>
    <p>${item.STATUS}</p>
  `;

  showScreen("detalle");
}

// ================= EDITAR =================

function editar() {
  const item = Tablas_Datos[selectedItem];

  detalleContent.innerHTML = `
    <input id="edit_p" value="${item.PRODUCT_NAME}">
    <input id="edit_s" value="${item.SERIAL_NUMBER}">
    <button onclick="guardarEdicion()">Guardar</button>
  `;
}

function guardarEdicion() {
  Tablas_Datos[selectedItem].PRODUCT_NAME = edit_p.value;

  guardarStorage();

  alert("Actualizado");
  volver();
}

// ================= NUEVO =================

function guardarNuevo() {

  if (!new_producto.value || !new_serial.value) {
    alert("Campos requeridos");
    return;
  }

  const nuevo = {
    SITIO: sitio.value,
    SALA: sala.value,
    FILA: fila.value,
    RACK: rack.value,
    PRODUCT_NAME: new_producto.value,
    SERIAL_NUMBER: new_serial.value,
    STATUS: new_status.value
  };

  Tablas_Datos.push(nuevo);

  guardarStorage();

  // limpiar
  new_producto.value = "";
  new_serial.value = "";
  new_status.value = "";

  alert("Guardado");
  volver();
}

// ================= STORAGE =================

function guardarStorage() {
  localStorage.setItem("inventario", JSON.stringify(Tablas_Datos));
}

