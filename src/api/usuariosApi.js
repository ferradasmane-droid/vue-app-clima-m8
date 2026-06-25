import { usuariosMock } from '../data/usuariosMock'

export const loginUsuario = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || usuariosMock

      const usuarioEncontrado = usuariosGuardados.find(
        usuario => usuario.email === email && usuario.password === password
      )

      if (usuarioEncontrado) {
        resolve(usuarioEncontrado)
      } else {
        reject(new Error('Usuario o contraseña incorrectos'))
      }
    }, 500)
  })
}

export const registrarUsuario = async nuevoUsuario => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || usuariosMock

      const existeUsuario = usuariosGuardados.some(
        usuario => usuario.email === nuevoUsuario.email
      )

      if (existeUsuario) {
        reject(new Error('El correo ya se encuentra registrado'))
        return
      }

      const usuarioCreado = {
        id: Date.now(),
        ...nuevoUsuario,
        preferencias: {
          unidad: 'C',
          tema: 'claro',
        },
        favoritos: [],
      }

      const nuevaLista = [...usuariosGuardados, usuarioCreado]

      localStorage.setItem('usuarios', JSON.stringify(nuevaLista))

      resolve(usuarioCreado)
    }, 500)
  })
}