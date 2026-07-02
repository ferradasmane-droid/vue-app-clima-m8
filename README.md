# Módulo 8 - App del Clima / Portafolio Final

## Descripción del proyecto

Este proyecto corresponde a la versión final de una App del Clima desarrollada con Vue 3, Vite, Vue Router y Pinia.

La aplicación fue construida a partir de los módulos anteriores, integrando consumo de API real, rutas, componentes reutilizables, estado global, autenticación, favoritos, preferencias de usuario, estadísticas semanales y alertas meteorológicas.

La app consulta información real del clima mediante la API pública de Open-Meteo, utilizando coordenadas de distintas comunas de Chiloé.

Aunque la pauta menciona Vuex, este proyecto utiliza Pinia como alternativa moderna recomendada para Vue 3. Pinia cumple la función de manejar el estado global de la aplicación, permitiendo administrar datos del clima, estados de carga y error, ciudad seleccionada, usuario autenticado, favoritos y preferencias.

## Objetivo del ejercicio

Entregar la versión final de la App del Clima como producto de portafolio profesional, incorporando:

- Aplicación SPA desarrollada con Vue.
- Navegación interna con Vue Router.
- Consumo de API externa real.
- Manejo de estado global con Pinia.
- Vista Home con listado de ciudades y clima actual.
- Vista Detalle con pronóstico semanal.
- Estadísticas de temperatura semanal.
- Alerta meteorológica generada por reglas simples.
- Vista extra de favoritos y perfil de usuario.
- Documentación clara para ejecutar el proyecto en local.
- Pruebas unitarias para validar componentes y estado global.

## Funcionalidades principales

### Funcionalidades del clima

- Listado de comunas de Chiloé.
- Consulta de clima actual usando Open-Meteo.
- Visualización de temperatura, humedad, viento y estado del clima.
- Búsqueda de ciudades mediante v-model.
- Cambio de unidad entre Celsius y Fahrenheit.
- Vista de detalle por ciudad.
- Pronóstico semanal.
- Estadísticas de temperatura mínima, máxima y promedio.
- Alerta meteorológica según condiciones del pronóstico.
- Manejo de estados de carga y error al consultar la API.


### Funcionalidades de usuarios

- Inicio de sesión con usuarios simulados.
- Registro básico de nuevos usuarios.
- Validación de credenciales.
- Mensaje de error cuando el usuario o contraseña son incorrectos.
- Visualización del usuario conectado.
- Cierre de sesión.
- Persistencia de sesión mediante LocalStorage.


### Funcionalidades de personalización

- Ciudades favoritas por usuario.
- Vista protegida de favoritos.
- Vista protegida de perfil.
- Preferencias de usuario:
    - Unidad de temperatura: Celsius o Fahrenheit.
    - Tema visual: claro u oscuro.

## API utilizada

a aplicación utiliza la API pública de Open-Meteo para obtener información real del clima.

Datos consultados:

- Temperatura actual.
- Humedad.
- Velocidad del viento.
- Código del estado del clima.
- Temperatura mínima semanal.
- Temperatura máxima semanal.
- Probabilidad de precipitación.
- Pronóstico diario.

No se requiere API Key para ejecutar este proyecto.

## Estado global con Pinia

El proyecto utiliza Pinia para manejar el estado global.

Se implementan dos stores principales:
```sh
authStore.js
```
Administra la información relacionada con el usuario:

- Usuario autenticado.
- Estado de carga.
- Mensajes de error.
- Login.
- Registro.
- Logout.
- Favoritos.
- Preferencias de temperatura.
- Preferencias de tema visual.

```sh
climaStore.js
```
Administra la información relacionada con el clima:

- Lista de ciudades con clima actual.
- Ciudad seleccionada.
- Pronóstico de la ciudad seleccionada.
- Estado de carga.
- Mensajes de error.
- Unidad de temperatura.
- Conversión Celsius / Fahrenheit.
- Alerta meteorológica.
- Cache básico en LocalStorage para evitar llamadas innecesarias a la API.

Pinia permite compartir estos datos entre distintas vistas sin repetir lógica en cada componente.

## Alertas meteorológicas

La vista de detalle incluye una alerta meteorológica generada a partir de reglas simples.

La aplicación muestra una alerta cuando:

- Hay posible tormenta durante la semana.
- Hay varios días con lluvia.
- Existe una posible semana calurosa.
- No existen condiciones importantes, se informa que no hay alertas relevantes.

Esto permite cumplir con el requisito de generar al menos una alerta meteorológica a partir de los datos obtenidos desde la API.


## Rutas protegidas

Las rutas **/favoritos** y **/perfil** requieren que el usuario haya iniciado sesión.

Si un usuario intenta ingresar a una ruta protegida sin estar autenticado, la aplicación lo redirige automáticamente a **/login**.

## Usuario de prueba

Para probar el inicio de sesión se puede utilizar:

|Campo | Valor |
|---|---|
|Correo | `nelly@test.com`|
|Contraseña| `123456` |


## Rutas de la aplicación

| Ruta | Descripción |
|---|---|
| `/` |	               Página principal con listado de ciudades y clima actual. |
| `/about` |         Información general del proyecto. | 
|`/detalle/:id` |     Detalle del clima de una ciudad, pronóstico semanal, estadísticas y alerta meteorológica. |
|`/login` |	         Inicio de sesión. |
|`/registro` |       Registro de usuario. |
|`/favoritos`|	     Ruta protegida con ciudades favoritas. |
|`/perfil` |	           Ruta protegida con preferencias del usuario. |


## Protección de rutas

La aplicación utiliza Vue Router para la navegación interna y cuenta con rutas protegidas para las vistas de usuario.

Las rutas privadas son:

- `/favoritos`
- `/perfil`

Estas rutas utilizan la propiedad:

```js
meta: { requiresAuth: true }
```

El **guard** de navegación revisa si existe un usuario autenticado en authStore. Si el usuario no ha iniciado sesión, la aplicación lo redirige automáticamente a la vista de login.

## Tecnologías utilizadas

- Vue 3
- Vite
- Composition API
- <script setup>
- Vue Router
- Pinia
- JavaScript
- CSS
- Open-Meteo API
- LocalStorage
- Vitest
- Vue Test Utils
- jsdom
- Git
- GitHub


## Estructura principal del proyecto

```bash
vue-app-clima-m8/
├── docs/
│   └── test-unitarios-m8.png
├── src/
│   ├── api/
│   │   └── usuariosApi.js
│   ├── assets/
│   │   ├── img/
│   │   └── main.css
│   ├── components/
│   │   ├── __tests__/
│   │   │   ├── ClimaCard.spec.js
│   │   │   └── EstadisticasClima.spec.js
│   │   ├── ClimaCard.vue
│   │   └── EstadisticasClima.vue
│   ├── data/
│   │   ├── ciudades.js
│   │   └── usuariosMock.js
│   ├── router/
│   │   └── index.js
│   ├── services/
│   │   └── ClimaServices.js
│   ├── stores/
│   │   ├── __tests__/
│   │   │   └── authStore.spec.js
│   │   └── authStore.js
│   │   └── climaStore.js
│   ├── views/
│   │   ├── AboutView.vue
│   │   ├── DetalleView.vue
│   │   ├── FavoritosView.vue
│   │   ├── HomeView.vue
│   │   ├── LoginView.vue
│   │   ├── PerfilView.vue
│   │   └── RegistroView.vue
│   ├── App.vue
│   └── main.js
├── package.json
├── vite.config.js
└── README.md
```

## Pruebas unitarias

Se implementaron pruebas unitarias utilizando Vitest y Vue Test Utils para verificar el correcto funcionamiento de componentes reutilizables y del estado global de la aplicación.

Las pruebas realizadas validan:

- Renderizado correcto del componente `ClimaCard.vue`.
- Conversión de temperatura entre Celsius y Fahrenheit.
- Enlace de navegación hacia el detalle de una ciudad.
- Cálculo de temperatura mínima, máxima y promedio en `EstadisticasClima.vue`.
- Visualización de unidad Celsius y Fahrenheit en estadísticas.
- Funcionamiento del `authStore.js` para agregar, evitar duplicados y eliminar favoritos.

Archivos testeados:

- `ClimaCard.vue`
- `EstadisticasClima.vue`
- `authStore.js`


Para ejecutar las pruebas unitarias:

```sh
npm run test:unit
```
Resultado Obtenido:

![Resultado pruebas unitarias](./docs/test-unitarios.png)


## Instalación del proyecto

### Clonar el repositorio:

Para descargar el proyecto en tu computador, ejecuta el siguiente comando:

git clone https://github.com/ferradasmane-droid/vue-app-clima-m8.git

Entrar a la carpeta del proyecto:

**cd vue-app-clima-m8**

Instalar dependencias:
```sh
npm install
```

## Ejecutar en modo desarrollo
```sh
npm run dev
```

Luego abrir en el navegador la URL indicada por Vite, por ejemplo:

http://localhost:5173/


## Crear versión de producción
```sh
npm run build
```
## Ejecutar pruebas unitarias
```sh
npm run test:unit
```

### Configuración de variables de entorno

Este proyecto no requiere archivo .env, ya que la API utilizada, Open-Meteo, es pública y no necesita API Key.

## Repositorio

[Ver epositorio público en GitHub](https://github.com/ferradasmane-droid/vue-app-clima-m8)


## Autora

Nelly Ferrada

