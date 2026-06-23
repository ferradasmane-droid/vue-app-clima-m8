<template>
  <section class="estadisticas">
    <h3>Estadísticas de la semana</h3>

    <div class="grid-estadisticas">
      <article class="estadistica-card estadistica-minima">
        <h4>❄️ Temperatura mínima</h4>
        <p>{{ minima }}°C</p>
      </article>

      <article class="estadistica-card estadistica-maxima">
        <h4>☀️ Temperatura máxima</h4>
        <p>{{ maxima }}°C</p>
      </article>

      <article class="estadistica-card estadistica-promedio">
        <h4>🌡️ Promedio semanal</h4>
        <p>{{ promedio }}°C</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  temperaturasMinimas: {
    type: Array,
    required: true,
  },
  temperaturasMaximas: {
    type: Array,
    required: true,
  },
})

const minima = computed(() => {
  return Math.min(...props.temperaturasMinimas)
})

const maxima = computed(() => {
  return Math.max(...props.temperaturasMaximas)
})

const promedio = computed(() => {
  const suma = props.temperaturasMaximas.reduce((total, temp) => total + temp, 0)

  return Math.round(suma / props.temperaturasMaximas.length)
})
</script>
