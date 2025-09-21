<template>
  <div class="home">
    <div class="menu-container">
      <h1>🚀 Portal Principal</h1>
      <p>Elige una opción:</p>
      <div class="menu">
        <router-link to="/rfc"><button>Generar RFC</button></router-link>
        <router-link to="/ventas"><button>Punto de Venta</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView"
}
</script>

<style>
/* Centrar todo el contenedor en pantalla */
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.menu-container {
  text-align: center;
  background-color: white;
  padding: 50px 40px;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

h1 {
  margin-bottom: 10px;
  color: #42b983;
}

p {
  margin-bottom: 30px;
  font-size: 18px;
  color: #555;
}

.menu button {
  background-color: #42b983;
  border: none;
  color: white;
  padding: 15px 35px;
  margin: 15px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(66,184,131,0.4);
  transition: all 0.3s ease;
}

.menu button:hover {
  background-color: #369870;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(66,184,131,0.5);
}

.menu a {
  text-decoration: none; /* Quitar subrayado de router-link */
}
</style>
