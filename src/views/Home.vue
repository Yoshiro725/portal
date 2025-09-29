<template>
  <div class="home">
    <div class="menu-container">
      <h1>🌟 Bienvenido</h1>
      <p>Selecciona una opción para continuar:</p>
      <div class="menu">
        <router-link to="/rfc">
          <button>📝 Generar RFC</button>
        </router-link>
        <router-link to="/ventas">
          <button>💳 Punto de Venta</button>
        </router-link>
        <router-link to="/empleados">
          <button>👥 Consultar Empleados</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style>
/* Fondo degradado dinámico */
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(-45deg, #42b983, #5bc0de, #f9ca24, #ff6b6b);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  font-family: 'Poppins', sans-serif;
}

/* Animación de fondo */
@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.menu-container {
  text-align: center;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 50px 40px;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.15);
  backdrop-filter: blur(8px);
  transition: transform 0.3s ease;
}

.menu-container:hover {
  transform: translateY(-5px);
}

h1 {
  margin-bottom: 15px;
  color: #2c3e50;
  font-size: 2.5rem;
}

p {
  margin-bottom: 35px;
  font-size: 18px;
  color: #555;
}

/* Botones */
.menu button {
  background: linear-gradient(135deg, #42b983, #2ecc71);
  border: none;
  color: white;
  padding: 15px 40px;
  margin: 15px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(66, 184, 131, 0.4);
  transition: all 0.3s ease;
}

.menu button:hover {
  background: linear-gradient(135deg, #369870, #27ae60);
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 10px 25px rgba(66, 184, 131, 0.6);
}

.menu a {
  text-decoration: none;
}
</style>
