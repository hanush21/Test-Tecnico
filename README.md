# Dashboard de Clientes y Productos

## Descripción del Proyecto
Este proyecto es una aplicación web desarrollada en React para la administración de clientes y productos. Permite gestionar información clave sobre los clientes, los productos contratados y visualizar estadísticas interactivas. La aplicación está diseñada para ser fácil de usar y altamente funcional, utilizando Firebase para la persistencia de datos.

## Tecnologías Utilizadas
- **React**: Para la construcción de la interfaz de usuario.
- **Firebase**: Para la base de datos y persistencia de información.
- **Zustand**: Para la gestión del estado global, evitando el uso de Context API, ya que ofrece un rendimiento más óptimo y una sintaxis más simple.
- **Styled Components**: Para los estilos personalizados de los componentes.
- **Recharts**: Para la generación de gráficas interactivas.

## Instalación

### Prerrequisitos
- Node.js (v16 o superior)
- Una cuenta de Firebase con un proyecto configurado

### Pasos
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/hanush21/Test-Tecnico.git
   cd Test-Tecnico
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar la aplicación:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173/`.

## Estructura de la Aplicación

### 1. **Clientes**
- **Funcionalidad:**
  - Listar todos los clientes registrados.
  - Filtrar clientes por nombre o cualquier otro campo clave.
  - Visualizar el detalle de cada cliente, incluyendo sus productos contratados.
- **Uso:**
  - Ve a la pestaña "Clientes" desde la barra lateral para acceder a la lista de clientes.

### 2. **Productos**
- **Funcionalidad:**
  - Ver una lista de todos los productos contratados por los clientes.
  - Filtrar productos por tipo (e.g., Fibra, Móvil).
  - Al hacer clic en un producto, verás sus características detalladas y la cantidad de clientes que lo han contratado.
- **Uso:**
  - Ve a la pestaña "Productos" desde la barra lateral.

### 3. **Estadísticas**
- **Funcionalidad:**
  - Visualizar gráficas interactivas sobre los productos más vendidos.
  - Consultar datos procesados directamente desde Firebase.
- **Uso:**
  - Ve a la pestaña "Estadísticas" para explorar las gráficas.

## Gestión del Estado con Zustand
- Use Zustand en lugar de Context API para gestionar el estado global de la aplicación debido a su:
  - **Simplicidad:** La sintaxis es más limpia y fácil de mantener.
  - **Rendimiento:** Evita renderizados innecesarios de componentes.
- **Implementación:**
  - El store centralizado en `clientStore.js` almacena los datos de clientes y facilita su actualización.
  - Esto permite que los componentes accedan a los datos globales de manera eficiente.

## Mejoras Futuras
1. **Autenticación:** Agregar autenticación para restringir el acceso a usuarios autorizados.
2. **Ordenación avanzada:** Permitir ordenar los datos de clientes y productos por diferentes campos de forma interactiva.
3. **Paginación:** Implementar paginación para manejar listas grandes de clientes o productos.
4. **Reportes:** Agregar exportación de datos en formatos como CSV o PDF.
