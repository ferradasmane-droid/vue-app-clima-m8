import { defineStore } from 'pinia'
import { ciudadesBase } from '../data/ciudades'

import {
  obtenerClima,
  obtenerDescripcionClima,
  obtenerIconoClima,
  esCodigoLluvia,
  esCodigoTormenta,
} from '../services/ClimaServices'

export const useClimaStore = defineStore('clima', {
  state: () => ({
    ciudades: [],
    ciudadSeleccionada: null,
    climaSeleccionado: null,
    cargando: false,
    error: '',
    unidad: localStorage.getItem('unidadTemperatura') || 'C',
  }),

  getters: {
    ciudadesDisponibles: (state) => state.ciudades,

    alertaMeteorologica: (state) => {
      if (!state.climaSeleccionado) return ''

      const temperaturasMaximas =
        state.climaSeleccionado.daily.temperature_2m_max

      const codigosClima =
        state.climaSeleccionado.daily.weather_code

      const temperaturaMaxima = Math.max(...temperaturasMaximas)

      const diasConLluvia = codigosClima.filter((codigo) =>
        esCodigoLluvia(codigo)
      ).length

      const hayTormenta = codigosClima.some((codigo) =>
        esCodigoTormenta(codigo)
      )

      if (hayTormenta) {
        return 'Alerta meteorológica: posible tormenta durante la semana.'
      }

      if (diasConLluvia >= 4) {
        return 'Alerta meteorológica: semana mayormente lluviosa.'
      }

      if (temperaturaMaxima >= 28) {
        return 'Alerta meteorológica: posible semana calurosa.'
      }

      return 'Sin alertas meteorológicas importantes para esta semana.'
    },
  },

  actions: {
    cambiarUnidad(nuevaUnidad) {
      this.unidad = nuevaUnidad
      localStorage.setItem('unidadTemperatura', nuevaUnidad)
    },

    convertirTemperatura(temperaturaCelsius) {
      if (this.unidad === 'F') {
        return Math.round((temperaturaCelsius * 9) / 5 + 32)
      }

      return Math.round(temperaturaCelsius)
    },

    async cargarCiudades() {
      this.cargando = true
      this.error = ''

      try {
        const cache = JSON.parse(localStorage.getItem('ciudadesConClima'))
        const cacheFecha = localStorage.getItem('ciudadesConClimaFecha')
        const ahora = Date.now()

        const cacheValido =
          cache &&
          cacheFecha &&
          ahora - Number(cacheFecha) < 15 * 60 * 1000

        if (cacheValido) {
          this.ciudades = cache
          return
        }

        const ciudadesConClima = await Promise.all(
          ciudadesBase.map(async (ciudad) => {
            const clima = await obtenerClima(ciudad.lat, ciudad.lon)

            return {
              ...ciudad,
              temperatura: clima.current.temperature_2m,
              humedad: clima.current.relative_humidity_2m,
              viento: clima.current.wind_speed_10m,
              codigoClima: clima.current.weather_code,
              descripcion: obtenerDescripcionClima(clima.current.weather_code),
              icono: obtenerIconoClima(clima.current.weather_code),
            }
          }),
        )

        this.ciudades = ciudadesConClima

        localStorage.setItem(
          'ciudadesConClima',
          JSON.stringify(ciudadesConClima),
        )

        localStorage.setItem(
          'ciudadesConClimaFecha',
          String(Date.now()),
        )
      } catch (error) {
        this.error = 'No se pudo cargar la información desde Open-Meteo.'
      } finally {
        this.cargando = false
      }
    },

    async cargarDetalleCiudad(id) {
      this.cargando = true
      this.error = ''
      this.ciudadSeleccionada = null
      this.climaSeleccionado = null

      try {
        const ciudad = ciudadesBase.find((item) => item.id === Number(id))

        if (!ciudad) {
          this.error = 'No se encontró la ciudad solicitada.'
          return
        }

        const clima = await obtenerClima(ciudad.lat, ciudad.lon)

        this.ciudadSeleccionada = ciudad
        this.climaSeleccionado = clima
      } catch (error) {
        this.error = 'No se pudo cargar el detalle desde Open-Meteo.'
      } finally {
        this.cargando = false
      }
    },
  },
})