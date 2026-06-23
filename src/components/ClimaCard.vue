<template>
  <article class="card" :class="claseClima">
    <img :src="ciudad.imagen" :alt="ciudad.nombre" class="card-img" />

    <div class="card-body">
      <h3>{{ ciudad.nombre }}</h3>
      <p class="pais">{{ ciudad.pais }}</p>

      <p class="icono">{{ ciudad.icono }}</p>

      <p>
        Estado:
        <strong>{{ ciudad.descripcion }}</strong>
      </p>

      <p>
        Temperatura:
        <strong>{{ temperaturaConvertida }}°{{ unidad }}</strong>
      </p>

      <p>Humedad: {{ ciudad.humedad }}%</p>
      <p>Viento: {{ ciudad.viento }} km/h</p>

      <RouterLink class="btn" :to="`/detalle/${ciudad.id}`">
        Ver detalle
      </RouterLink>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  ciudad: {
    type: Object,
    required: true,
  },
  unidad: {
    type: String,
    required: true,
  },
})

const temperaturaConvertida = computed(() => {
  if (props.unidad === 'F') {
    return Math.round((props.ciudad.temperatura * 9) / 5 + 32)
  }

  return Math.round(props.ciudad.temperatura)
})

const claseClima = computed(() => {
  const codigo = props.ciudad.codigoClima

  if (codigo === 0) return 'card-soleado'
  if ([1, 2].includes(codigo)) return 'card-parcial'
  if (codigo === 3) return 'card-nublado'
  if ([45, 48].includes(codigo)) return 'card-neblina'
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(codigo)) return 'card-lluvia'
  if ([71, 73, 75].includes(codigo)) return 'card-nieve'
  if (codigo === 95) return 'card-tormenta'

  return 'card-normal'
})
</script>