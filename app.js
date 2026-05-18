// ================= DATOS SIMULADOS =================

const Cat_SITIO = [
  { SITIO: "MTY" },
  { SITIO: "CDMX" }
];

const Cat_SALA = [
  { SITIO: "MTY", SALA: "DC1" },
  { SITIO: "MTY", SALA: "DC2" },
  { SITIO: "CDMX", SALA: "DC3" }
];

const Cat_FILA = [
  { SITIO: "MTY", SALA: "DC1", FILA: "F1" },
  { SITIO: "MTY", SALA: "DC1", FILA: "F2" }
];

const Cat_RACK = [
  { SALA: "DC1", FILA: "F1", RACK: "R01" },
  { SALA: "DC1", FILA: "F1", RACK: "R02" }
];

let Tablas_Datos = [
  {
    SITIO: "MTY",
    SALA: "DC1",
    FILA: "F1",
    RACK: "R01",
    PRODUCT_NAME: "C9300",
    TYPE: "SWITCH",
    SERIAL_NUMBER: "SNt245",
    STATUS: "Active"
  },
  {
    SITIO: "MTY",
    SALA: "DC1",
    FILA: "F1",
    RACK: "R01",
    PRODUCT_NAME: "R740",
    TYPE: "SERVER",
    SERIAL_NUMBER: "SH6790",
    STATUS: "Active"
  }
];

// ================= VARIABLES =================

let selectedItem = null;

// ================= ELEMENTOS =================

const sitio = document.getElementById("sitio");
const sala = document.getElementById("sala");
const fila = document.getElementById("fila");
const rack = document.getElementById("rack");

// ================= NAVEGACIÓN =================

function showScreen(id) {
  document.querySelectorAll(".screen")
    .forEach(x => x.classList.remove("active"));

  document.getElementById(id).classList.add("active");
}

function volver() {
  showScreen("screen1");
}

function goNuevo() {
  showScreen("nuevo");
}

// ================= LOAD SITIOS =================

function loadSitios() {
  sitio.innerHTML = "<option value=''>Seleccione</option>";

  Cat_SITIO.forEach(x => {
    sitio.innerHTML += `<option value="${x.SITIO}">${x.SITIO}</option>`;
  });
}

// ================= FILTROS =================

sitio.addEventListener("change", () => {

  sala.innerHTML = "";
  fila.innerHTML = "";
  rack.innerHTML = "";

  const filtered = Cat_SALA.filter(x => x.SITIO === sitio.value);

  filtered.forEach(x => {
    sala.innerHTML += `<option value="${x.SALA}">${x.SALA}</option>`;
  });

});

sala.addEventListener("change", () => {

  fila.innerHTML = "";
  rack.innerHTML = "";

  const filtered = Cat_FILA.filter(
    x => x.SITIO === sitio.value && x.SALA === sala.value
  );

  filtered.forEach(x => {
    fila.innerHTML += `<option value="${x.FILA}">${x.FILA}</option>`;
  });

});

fila.addEventListener("change", () => {

  rack.innerHTML = "";

  const filtered = Cat_RACK.filter(
    x => x.SALA === sala.value && x.FILA === fila.value
  );

  filtered.forEach(x => {
    rack.innerHTML += `<option value="${x.RACK}">${x.RACK}</option>`;
  });

});

rack.addEventListener("change", loadEquipos);

// ================= GALLERY =================

function loadEquipos() {

  const filtered = Tablas_Datos.filter(x =>
    x.SITIO === sitio.value &&
    x.SALA === sala.value &&
    x.FILA === fila.value &&
    x.RACK === rack.value
  );

  document.getElementById("count").innerText = filtered.length;

  const results = document.getElementById("results");
  results.innerHTML = "";

  filtered.forEach((item, i) => {

    results.innerHTML += `
      <div class="card" onclick="verDetalle(${i})">
        
        <div class="card-title">${item.PRODUCT_NAME}</div>

        <div class="card-row">
          <span>Type: ${item.TYPE}</span>
          <span>Serial: ${item.SERIAL_NUMBER}</span>
        </div>

        <div class="card-row">
          <span>Status:</span>
          <span>${item.STATUS}</span>
        </div>

      </div>
    `;
  });
}

// ================= DETALLE =================

function verDetalle(index) {

  selectedItem = index;
  const item = Tablas_Datos[index];

  document.getElementById("detalleContent").innerHTML = `

    <p><b>CLASS:</b> N/A</p>
    <p><b>TECHNOLOGY:</b> N/A</p>
    <p><b>TYPE:</b> ${item.TYPE}</p>
    <p><b>SUPPLIER:</b> N/A</p>
    <p><b>PRODUCT_NAME:</b> ${item.PRODUCT_NAME}</p>
    <p><b>Sala:</b> ${item.SALA}</p>
    <p><b>Fila:</b> ${item.FILA}</p>
    <p><b>Rack:</b> ${item.RACK}</p>
    <p><b>Serial:</b> ${item.SERIAL_NUMBER}</p>
    <p><b>Status:</b> ${item.STATUS}</p>

  `;

  showScreen("detalle");
}

// ================= EDITAR =================

function editar() {

  const item = Tablas_Datos[selectedItem];

  document.getElementById("detalleContent").innerHTML = `

    <label>Producto</label>
    <input id="edit_producto" value="${item.PRODUCT_NAME}">

    <label>Serial</label>
    <input id="edit_serial" value="${item.SERIAL_NUMBER}">

    <label>Status</label>
    <input id="edit_status" value="${item.STATUS}">

    <button class="btn" onclick="guardarEdicion()">Guardar</button>

  `;
}

function guardarEdicion() {

  Tablas_Datos[selectedItem].PRODUCT_NAME =
    document.getElementById("edit_producto").value;

  Tablas_Datos[selectedItem].SERIAL_NUMBER =
    document.getElementById("edit_serial").value;

  Tablas_Datos[selectedItem].STATUS =
    document.getElementById("edit_status").value;

  alert("✅ Información actualizada");

  volver();
}

// ================= NUEVO =================

function guardarNuevo() {

  const nuevo = {
    SITIO: sitio.value,
    SALA: sala.value,
    FILA: fila.value,
    RACK: rack.value,
    PRODUCT_NAME: document.getElementById("new_producto").value,
    SERIAL_NUMBER: document.getElementById("new_serial").value,
    STATUS: document.getElementById("new_status").value,
    TYPE: "N/A"
  };

  Tablas_Datos.push(nuevo);

  alert("✅ Equipo agregado");

  showScreen("screen1");
}

// ================= INIT =================

loadSitios();
