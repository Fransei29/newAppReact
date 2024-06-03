document.addEventListener('DOMContentLoaded', function () {
  // Manejo del formulario de registro
  document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    // Guardar el usuario en local storage
    localStorage.setItem(username, JSON.stringify({ password }))
    document.getElementById('registerForm').style.display = 'none'
    document.getElementById('loginForm').style.display = 'none'

    alert('Usuario registrado con éxito!')
  })

  // Manejo del formulario de inicio de sesión
  document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault()
    const username = document.getElementById('loginUsername').value
    const password = document.getElementById('loginPassword').value

    // Verificar usuario y contraseña
    const storedUser = JSON.parse(localStorage.getItem(username))
    if (storedUser && storedUser.password === password) {
      alert('Inicio de sesión exitoso!')
      document.getElementById('loginForm').style.display = 'none'
      document.getElementById('registerForm').style.display = 'none'

      const welcomeMsg = document.getElementById('welcomeMessage')
      welcomeMsg.style.display = 'block'
      welcomeMsg.textContent = 'Bienvenido, ' + username + '!'
    } else {
      alert('Usuario o contraseña incorrectos.')
    }
  })
})
