import React from "react";

const LoginForm = () => (
  <form>
    <fieldset>
      <legend>Iniciar sesión</legend>
      <label htmlFor="loginUsername">Nombre de usuario:</label>
      <input type="text" id="loginUsername" name="loginUsername" placeholder="Nombre de usuario" required />

      <label htmlFor="loginPassword">Contraseña:</label>
      <input type="password" id="loginPassword" name="loginPassword" placeholder="Contraseña" required />

      <button type="submit">Iniciar sesión</button>
    </fieldset>
  </form>
);

export default LoginForm;
