export const obtenerClima = async (lat, lon) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&timezone=auto`

  const respuesta = await fetch(url)

  if (!respuesta.ok) {
    throw new Error('No se pudo obtener el clima')
  }

  return await respuesta.json()
}

export const obtenerDescripcionClima = (codigo) => {
  const codigos = {
    0: 'Despejado',
    1: 'Mayormente despejado',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Neblina',
    48: 'Neblina con escarcha',
    51: 'Llovizna ligera',
    53: 'Llovizna moderada',
    55: 'Llovizna intensa',
    61: 'Lluvia ligera',
    63: 'Lluvia moderada',
    65: 'Lluvia intensa',
    71: 'Nieve ligera',
    73: 'Nieve moderada',
    75: 'Nieve intensa',
    80: 'Chubascos ligeros',
    81: 'Chubascos moderados',
    82: 'Chubascos fuertes',
    95: 'Tormenta',
  }

  return codigos[codigo] || 'Clima no disponible'
}

export const obtenerIconoClima = (codigo) => {
  if (codigo === 0) return '☀️'
  if ([1, 2].includes(codigo)) return '🌤️'
  if (codigo === 3) return '☁️'
  if ([45, 48].includes(codigo)) return '🌫️'
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(codigo)) return '🌧️'
  if ([71, 73, 75].includes(codigo)) return '❄️'
  if (codigo === 95) return '⛈️'

  return '🌦️'
}
