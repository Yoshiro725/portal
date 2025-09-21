<template>
  <div class="rfc-container">
    <h2>Generar RFC</h2>
    <form @submit.prevent="generarRFC">
      <div class="form-group">
        <label>Nombre(s):</label>
        <input v-model="nombre" type="text" required />
      </div>

      <div class="form-group">
        <label>Apellido Paterno:</label>
        <input v-model="apellidoP" type="text" required />
      </div>

      <div class="form-group">
        <label>Apellido Materno:</label>
        <input v-model="apellidoM" type="text" />
      </div>

      <div class="form-group">
        <label>Fecha de Nacimiento:</label>
        <input v-model="fecha" type="date" required />
      </div>

      <button type="submit">Generar RFC</button>
    </form>

    <div v-if="rfc" class="resultado">
      <h3>RFC Generado:</h3>
      <p>{{ rfc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "GenerarRFCView",
  data() {
    return {
      nombre: "",
      apellidoP: "",
      apellidoM: "",
      fecha: "",
      rfc: ""
    };
  },
  methods: {
    limpiarTexto(texto) {
      // Eliminar acentos y convertir Ñ → N, Ü → U
      return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/Ñ/g, "N")
        .replace(/Ü/g, "U")
        .toUpperCase();
    },
    primeraVocalInterna(texto) {
      const t = this.limpiarTexto(texto).slice(1);
      const vocal = t.match(/[AEIOU]/);
      return vocal ? vocal[0] : "X";
    },
    generarRFC() {
      if (!this.nombre || !this.apellidoP || !this.fecha) {
        alert("Completa los campos obligatorios.");
        return;
      }

      const nombreLimpio = this.limpiarTexto(this.nombre).split(" ")[0]; // primer nombre
      const apellidoPLimpio = this.limpiarTexto(this.apellidoP);
      const apellidoMLimpio = this.apellidoM ? this.limpiarTexto(this.apellidoM) : "X";

      // Primera letra y vocal interna del apellido paterno
      const pLetra = apellidoPLimpio.charAt(0);
      const pVocal = this.primeraVocalInterna(apellidoPLimpio);

      // Primera letra del apellido materno
      const mLetra = apellidoMLimpio.charAt(0);

      // Primera letra del nombre
      const nLetra = nombreLimpio.charAt(0);

      // Fecha de nacimiento (usamos el string directamente: YYYY-MM-DD)
      const [anio, mes, dia] = this.fecha.split("-");
      const anio2 = anio.slice(-2);

      // Homoclave simulada (3 caracteres aleatorios: letras y números)
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let homoclave = "";
      for (let i = 0; i < 3; i++) {
        homoclave += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      // RFC final
      this.rfc = `${pLetra}${pVocal}${mLetra}${nLetra}${anio2}${mes}${dia}${homoclave}`;
    }
  }
};
</script>

<style>
.rfc-container {
  max-width: 400px;
  margin: 50px auto;
  background-color: #f9f9f9;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  text-align: center;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

h2 {
  margin-bottom: 20px;
  color: #42b983;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 12px 25px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  margin-top: 15px;
  transition: all 0.3s;
}

button:hover {
  background-color: #369870;
  transform: translateY(-2px);
}

.resultado {
  margin-top: 25px;
  padding: 15px;
  background-color: #e8f5ef;
  border-radius: 8px;
  font-weight: bold;
  font-size: 18px;
}
</style>
