import { defineStore } from 'pinia'
import { loginUsuario, registrarUsuario } from '../api/usuariosApi'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    usuario: JSON.parse(localStorage.getItem('usuario')) || null,
    cargando: false,
    error: '',
  }),

  getters: {
    isAuthenticated: state => !!state.usuario,

    nombreUsuario: state => state.usuario?.nombre || '',

    preferencias: state =>
      state.usuario?.preferencias || {
        unidad: 'C',
        tema: 'claro',
      },

    favoritos: state => state.usuario?.favoritos || [],
  },

  actions: {
    async login(email, password) {
      this.cargando = true
      this.error = ''

      try {
        const usuarioEncontrado = await loginUsuario(email, password)

        this.usuario = usuarioEncontrado
        localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado))

        return true
      } catch (error) {
        this.error = error.message
        return false
      } finally {
        this.cargando = false
      }
    },

    async registrar(datosFormulario) {
      this.cargando = true
      this.error = ''

      try {
        const nuevoUsuario = await registrarUsuario(datosFormulario)

        this.usuario = nuevoUsuario
        localStorage.setItem('usuario', JSON.stringify(nuevoUsuario))

        return true
      } catch (error) {
        this.error = error.message
        return false
      } finally {
        this.cargando = false
      }
    },

    logout() {
      this.usuario = null
      this.error = ''
      localStorage.removeItem('usuario')
    },

    actualizarPreferencias(nuevasPreferencias) {
      if (!this.usuario) return

      this.usuario.preferencias = nuevasPreferencias

      localStorage.setItem('usuario', JSON.stringify(this.usuario))

      const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || []

      const usuariosActualizados = usuariosGuardados.map(usuario => {
        if (usuario.id === this.usuario.id) {
          return {
            ...usuario,
            preferencias: nuevasPreferencias,
          }
        }

        return usuario
      })

      localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados))
    },

    agregarFavorito(ciudad) {
      if (!this.usuario) return

      if (!this.usuario.favoritos.includes(ciudad)) {
        this.usuario.favoritos.push(ciudad)
        localStorage.setItem('usuario', JSON.stringify(this.usuario))
        this.actualizarUsuarioEnLista()
      }
    },

    eliminarFavorito(ciudad) {
      if (!this.usuario) return

      this.usuario.favoritos = this.usuario.favoritos.filter(
        favorito => favorito !== ciudad
      )

      localStorage.setItem('usuario', JSON.stringify(this.usuario))
      this.actualizarUsuarioEnLista()
    },

    actualizarUsuarioEnLista() {
      const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || []

      const usuariosActualizados = usuariosGuardados.map(usuario => {
        if (usuario.id === this.usuario.id) {
          return this.usuario
        }

        return usuario
      })

      localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados))
    },
  },
})