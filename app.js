// DATA SIMULADA (como Power Apps)
const Cat_SITIO = [
  { SITIO: "MTY" },
  { SITIO: "CDMX" }
];

const Cat_SALA = [
  { SITIO: "MTY", SALA: "SALA1" },
  { SITIO: "MTY", SALA: "SALA2" },
  { SITIO: "CDMX", SALA: "SALA3" }
];

const Cat_FILA = [
  { SITIO: "MTY", SALA: "SALA1", FILA: "F1" },
  { SITIO: "MTY", SALA: "SALA1", FILA: "F2" }
];

const Cat_RACK = [
  { SALA: "SALA1", FILA: "F1", RACK: "R1" },
  { SALA: "SALA1", FILA: "F1", RACK: "R2" }
];

const Tablas_Datos = [
  {
    SITIO: "MTY",
    SALA: "SALA1",
    FILA: "F1",
    RACK: "R1",
    PRODUCT_NAME: "Router",
    TYPE: "Cisco",
    SERIAL_NUMBER: "ABC123",
    STATUS: "Activo",
    POSICION: "U1"
  }
];

// ELEMENTOS
const sitio = document.getElementById("sitio");
const sala = document.getElementById("sala");
const fila = document.getElementById("fila");
const rack = document.getElementById("rack");

// LOAD SITIOS
function loadSitios() {
  sitio.innerHTML = "<option value=''>Seleccione</option>";
  Cat_SITIO.forEach(x => {
    sitio.innerHTML += `<option value="${x.SITIO}">${x.SITIO}</option>`;
  });
}

// SITIO → SALA
sitio.addEventListener("change", () => {
  sala.innerHTML = "";
  fila.innerHTML = "";
  rack.innerHTML = "";

  const filtered = Cat_SALA.filter(x => x.SITIO === sitio.value);

  filtered.forEach(x => {
    sala.innerHTML += `<option value="${x.SALA}">${x.SALA}</option>`;
  });
});

// SALA → FILA
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

// FILA → RACK
fila.addEventListener("change", () => {
  rack.innerHTML = "";

  const filtered = Cat_RACK.filter(
    x => x.SALA === sala.value && x.FILA === fila.value
  );

  filtered.forEach(x => {
    rack.innerHTML += `<option value="${x.RACK}">${x.RACK}</option>`;
  });
});

// RACK → RESULTADOS (Gallery)
rack.addEventListener("change", () => {
  const results = Tablas_Datos.filter(x =>
    x.SITIO === sitio.value &&
    x.SALA === sala.value &&
    x.FILA === fila.value &&
    x.RACK === rack.value
  );

  document.getElementById("count").innerText = results.length;

  const container = document.getElementById("results");
  container.innerHTML = "";

  results.forEach(x => {
    container.innerHTML += `
      <div style="border:1px solid #ccc; margin:10px; padding:10px;">
        <b>${x.PRODUCT_NAME}</b><br>
        Tipo: ${x.TYPE}<br>
        Serial: ${x.SERIAL_NUMBER}<br>
        Estatus: ${x.STATUS}
      </div>
    `;
  });
});

// INICIALIZAR
loadSitios();