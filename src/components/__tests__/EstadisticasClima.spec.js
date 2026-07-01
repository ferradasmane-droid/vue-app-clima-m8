import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EstadisticasClima from '../EstadisticasClima.vue'

describe('EstadisticasClima.vue', () => {
  it('calcula y muestra temperatura mínima, máxima y promedio en Celsius', () => {
    const wrapper = mount(EstadisticasClima, {
      props: {
        temperaturasMinimas: [5, 7, 4, 6],
        temperaturasMaximas: [10, 12, 14, 16],
        unidad: 'C',
      },
    })

    expect(wrapper.text()).toContain('4°C')
    expect(wrapper.text()).toContain('16°C')
    expect(wrapper.text()).toContain('13°C')
  })

  it('muestra la unidad Fahrenheit cuando recibe unidad F', () => {
    const wrapper = mount(EstadisticasClima, {
      props: {
        temperaturasMinimas: [40, 42, 39],
        temperaturasMaximas: [50, 52, 54],
        unidad: 'F',
      },
    })

    expect(wrapper.text()).toContain('39°F')
    expect(wrapper.text()).toContain('54°F')
    expect(wrapper.text()).toContain('52°F')
  })

  it('muestra el título de estadísticas de la semana', () => {
    const wrapper = mount(EstadisticasClima, {
      props: {
        temperaturasMinimas: [5, 7, 4, 6],
        temperaturasMaximas: [10, 12, 14, 16],
        unidad: 'C',
      },
    })

    expect(wrapper.text()).toContain('Estadísticas de la semana')
  })
})