<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Consumir API REST Empleado</h1>

    <!-- Formulario -->
    <div class="border p-4 rounded shadow bg-white mb-6">
      <label class="block mb-2">Id Emp:</label>
      <input
        v-model="idEmpleado"
        type="number"
        placeholder="Ejemplo: 3"
        class="border p-2 w-full mb-4"
      />

      <button
        @click="consultarEmpleado"
        class="bg-black text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-800 transition duration-300 border-2 border-gray-800 w-full md:w-auto"
      >
        Consultar
      </button>

      <!-- Datos del empleado -->
      <div v-if="empleado" class="mt-4 p-4 bg-green-50 border border-green-200 rounded">
        <h3 class="font-bold text-green-800 mb-2">Empleado Encontrado:</h3>
        <p><strong>Nombre:</strong> {{ empleado.employee_name }}</p>
        <p><strong>Salario:</strong> {{ empleado.employee_salary }}</p>
        <p><strong>Edad:</strong> {{ empleado.employee_age }}</p>
      </div>

      <!-- Mensaje de carga -->
      <div v-if="cargando" class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <p class="text-blue-800">Buscando empleado...</p>
      </div>
    </div>

    <!-- Tabla de empleados -->
    <h2 class="text-xl font-semibold mb-2">Lista de Empleados</h2>
    
    <!-- Mensaje de error al cargar lista -->
    <div v-if="errorLista" class="mb-4 p-4 bg-red-50 border border-red-200 rounded">
      <p class="text-red-800 font-semibold">⚠️ {{ errorLista }}</p>
      <p class="text-red-600 text-sm mt-1">
        Esto es normal, la API de prueba tiene límites. Puedes usar el formulario arriba para buscar empleados individualmente.
      </p>
    </div>

    <!-- Tabla -->
    <div v-if="!errorLista">
      <table class="min-w-full border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-2">ID</th>
            <th class="p-2">Nombre del Empleado</th>
            <th class="p-2">Salario</th>
            <th class="p-2">Edad</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in empleados" :key="emp.id" class="border-t">
            <td class="p-2 text-center">{{ emp.id }}</td>
            <td class="p-2">{{ emp.employee_name }}</td>
            <td class="p-2">${{ Number(emp.employee_salary).toLocaleString() }}</td>
            <td class="p-2 text-center">{{ emp.employee_age }}</td>
          </tr>
        </tbody>
      </table>
      <p class="text-gray-600 text-sm mt-2">Total: {{ empleados.length }} empleados</p>
    </div>

    <!-- Mensaje cuando no hay empleados pero tampoco error -->
    <div v-if="empleados.length === 0 && !errorLista" class="p-4 bg-yellow-50 border border-yellow-200 rounded">
      <p class="text-yellow-800">Cargando lista de empleados...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const idEmpleado = ref("");
const empleado = ref(null);
const empleados = ref([]);
const cargando = ref(false);
const errorLista = ref("");

// Consulta de un empleado por ID
const consultarEmpleado = async () => {
  if (!idEmpleado.value) {
    alert("Ingresa un ID de empleado");
    return;
  }
  
  // Validar que sea un número válido
  if (idEmpleado.value < 1) {
    alert("Ingresa un ID válido (mayor a 0)");
    return;
  }
  
  cargando.value = true;
  empleado.value = null;
  
  try {
    const res = await axios.get(
      `https://dummy.restapiexample.com/api/v1/employee/${idEmpleado.value}`,
      { timeout: 10000 } // 10 segundos timeout
    );
    
    if (res.data.status === "success") {
      empleado.value = res.data.data;
    } else {
      empleado.value = null;
      alert("Empleado no encontrado");
    }
  } catch (error) {
    console.error("Error al consultar empleado:", error);
    
    // Manejo específico de diferentes tipos de errores
    if (error.code === 'ECONNABORTED') {
      alert("Tiempo de espera agotado. La API está respondiendo lentamente.");
    } else if (error.response) {
      if (error.response.status === 429) {
        alert("Demasiadas solicitudes. Espera unos minutos antes de intentar nuevamente.");
      } else if (error.response.status === 404) {
        alert(`No se encontró ningún empleado con el ID ${idEmpleado.value}`);
      } else {
        alert(`Error del servidor: ${error.response.status}`);
      }
    } else if (error.request) {
      alert("Error de conexión. Verifica tu conexión a internet.");
    } else {
      alert("Error inesperado al consultar el empleado");
    }
  } finally {
    cargando.value = false;
  }
};

// Cargar lista de empleados al inicio con mejor manejo de errores
onMounted(async () => {
  try {
    const res = await axios.get(
      "https://dummy.restapiexample.com/api/v1/employees",
      { timeout: 15000 } // 15 segundos timeout
    );
    
    if (res.data.status === "success" && res.data.data) {
      empleados.value = res.data.data;
      errorLista.value = "";
    } else {
      errorLista.value = "La API no devolvió datos válidos";
      empleados.value = [];
    }
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    
    if (error.response) {
      if (error.response.status === 429) {
        errorLista.value = "Límite de la API alcanzado - Demasiadas solicitudes";
      } else {
        errorLista.value = `Error del servidor: ${error.response.status}`;
      }
    } else if (error.request) {
      errorLista.value = "Error de conexión - No se pudo conectar a la API";
    } else if (error.code === 'ECONNABORTED') {
      errorLista.value = "Tiempo de espera agotado - La API está lenta";
    } else {
      errorLista.value = "Error inesperado al cargar la lista";
    }
    
    empleados.value = [];
  }
});
</script>