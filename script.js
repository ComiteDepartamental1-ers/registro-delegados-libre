
let datos;

fetch("datos.json")
  .then(response => response.json())
  .then(data => {
    datos = data;
    cargarDistritos();
  });

function cargarDistritos() {
  const distritoSelect = document.getElementById("distritoSelect");
  distritoSelect.innerHTML = "<option value=''>Selecciona un distrito</option>";
  Object.keys(datos).forEach(distrito => {
    const option = document.createElement("option");
    option.value = distrito;
    option.textContent = distrito;
    distritoSelect.appendChild(option);
  });
}

document.getElementById("distritoSelect").addEventListener("change", function() {
  const zonaSelect = document.getElementById("zonaSelect");
  zonaSelect.innerHTML = "<option value=''>Selecciona una zona</option>";
  document.getElementById("recintoSelect").innerHTML = "<option value=''>Selecciona un recinto</option>";
  document.getElementById("infoRecinto").innerHTML = "";
  const zonas = datos[this.value];
  if (zonas) {
    Object.keys(zonas).forEach(zona => {
      const option = document.createElement("option");
      option.value = zona;
      option.textContent = zona;
      zonaSelect.appendChild(option);
    });
  }
});

document.getElementById("zonaSelect").addEventListener("change", function() {
  const distrito = document.getElementById("distritoSelect").value;
  const recintoSelect = document.getElementById("recintoSelect");
  recintoSelect.innerHTML = "<option value=''>Selecciona un recinto</option>";
  document.getElementById("infoRecinto").innerHTML = "";
  const recintos = datos[distrito][this.value];
  if (recintos) {
    Object.keys(recintos).forEach(recinto => {
      const option = document.createElement("option");
      option.value = recinto;
      option.textContent = recinto;
      recintoSelect.appendChild(option);
    });
  }
});

document.getElementById("recintoSelect").addEventListener("change", function() {
  const distrito = document.getElementById("distritoSelect").value;
  const zona = document.getElementById("zonaSelect").value;
  const recinto = this.value;
  const info = datos[distrito][zona][recinto];
  if (info) {
    document.getElementById("infoRecinto").innerHTML = `
      <p><strong>Municipio:</strong> ${info.Municipio}</p>
      <p><strong>Asiento Electoral:</strong> ${info.Asiento}</p>
    `;
  }
});

document.getElementById("registroForm").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("registroForm").style.display = "none";
  document.getElementById("mensajeGracias").style.display = "block";
});

function mostrarFormulario() {
  document.getElementById("videoContainer").style.display = "none";
  document.getElementById("formContainer").style.display = "block";
}
