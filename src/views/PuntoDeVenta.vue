
<template>
  <div class="pos-container">
    <Toast />
    <ConfirmDialog />

    <!-- Header -->
    <div class="header">
      <h2>PUNTO DE VENTA (POS)</h2>
    </div>

    <!-- Formulario -->
    <div class="card form-card">
      <div class="form-row">
        <InputText v-model="producto.nombre" placeholder="Nombre del producto..." class="product-input" />
        
        <InputNumber v-model="producto.cantidad" :min="1" showButtons placeholder="Cant" class="quantity-input" />
        
        <InputNumber v-model="producto.precio" mode="currency" currency="MXN" locale="es-MX" placeholder="$ Precio U." class="price-input" />
        
        <Button label="Registrar" icon="pi pi-plus" class="p-button-success add-btn" @click="agregarProducto" />
      </div>
    </div>

    <!-- Tabla + Totales -->
    <div class="card table-card">
      <DataTable :value="productos" responsiveLayout="scroll" :paginator="false">
        <Column field="id" header="Cns" style="width: 70px"></Column>
        <Column field="nombre" header="Nombre del Producto"></Column>
        <Column field="precio" header="Precio U." style="width: 120px">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.precio) }}
          </template>
        </Column>
        <Column field="cantidad" header="Cant." style="width: 100px"></Column>
        <Column header="Precio P." style="width: 140px">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.precio * slotProps.data.cantidad) }}
          </template>
        </Column>
        <Column header="Acciones" style="width: 140px">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" class="p-button-sm p-button-success" @click="editarProducto(slotProps.index)" />
            <Button icon="pi pi-trash" class="p-button-sm p-button-danger" @click="eliminarProducto(slotProps.index)" />
          </template>
        </Column>
      </DataTable>

      <!-- Totales al estilo factura -->
      <div class="totals">
        <div class="total-row">
          <label>Subtotal:</label>
          <InputText :value="formatCurrency(subtotal)" readonly />
        </div>
        <div class="total-row">
          <label>IVA (16%):</label>
          <InputText :value="formatCurrency(iva)" readonly />
        </div>
        <div class="total-row final">
          <label>Total:</label>
          <InputText :value="formatCurrency(total)" readonly />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'

export default {
  components: { DataTable, Column, InputText, InputNumber, Button, Toast, ConfirmDialog },
  setup() {
    const toast = useToast()
    const confirm = useConfirm()
    return { toast, confirm }
  },

        // Datos y estado, métodos de la lógica
  data() {
    return {
      productos: [
       
      ],
      producto: { id: null, nombre: "", precio: 0, cantidad: 1 },
      nextId: 3,
      editIndex: null
    }
  },
  computed: {
    subtotal() {
      return this.productos.reduce((sum, p) => sum + (p.precio * p.cantidad), 0)
    },
    iva() {
      return this.subtotal * 0.16
    },
    total() {
      return this.subtotal + this.iva
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
      }).format(value)
    },
    agregarProducto() {
      if (!this.producto.nombre || this.producto.precio <= 0 || this.producto.cantidad <= 0) {
        this.toast.add({ severity: 'error', summary: 'Error', detail: 'Complete todos los campos', life: 3000 })
        return
      }
      if (this.editIndex !== null) {
        this.productos[this.editIndex] = { ...this.producto }
        this.editIndex = null
      } else {
        this.productos.push({ ...this.producto, id: this.nextId++ })
      }
      this.producto = { id: null, nombre: "", precio: 0, cantidad: 1 }
    },
    editarProducto(index) {
      this.producto = { ...this.productos[index] }
      this.editIndex = index
    },
    eliminarProducto(index) {
      this.confirm.require({
        message: '¿Eliminar este producto?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.productos.splice(index, 1)
          this.toast.add({ severity: 'success', summary: 'Eliminado', detail: 'Producto eliminado', life: 3000 })
        }
      })
    }
  }
}
</script>

<style scoped>
.pos-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 15px;
}

.header {
  text-align: center;
  margin-bottom: 15px;
}

.header h2 {
  color: #2c3e50;
}

.card {
  background: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 2fr 0.7fr 1fr auto;
  gap: 12px;
}

.totals {
  display: grid;
  gap: 8px;
  max-width: 400px;
  margin-left: auto;
  margin-top: 20px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-row.final {
  font-weight: bold;
  border-top: 2px solid #333;
  padding-top: 10px;
  margin-top: 5px;
}
</style>
