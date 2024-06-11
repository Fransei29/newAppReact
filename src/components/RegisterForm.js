import React from "react";

const RegisterForm = () => (
  <form>
    <fieldset>
      <legend>Registro</legend>
      <label htmlFor="username">Nombre de usuario:</label>
      <input type="text" id="username" name="username" placeholder="Nombre de usuario" required />

      <label htmlFor="password">Contraseña:</label>
      <input type="password" id="password" name="password" placeholder="Contraseña" required />

      <button type="submit">Registrarse</button>
    </fieldset>
  </form>
);

export default RegisterForm;
