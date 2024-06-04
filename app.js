const express = require("express"); // Importa el módulo Express.
const app = express(); // Crea una instancia de la aplicación Express.
const cookieParser = require("cookie-parser"); // Middleware para manejar cookies
const session = require("express-session"); // Middleware que facilita el manejo de sessiones
require("dotenv").config(); // Importar y cargar las variables de entorno desde el archivo .env
const bodyParser = require("body-parser");
const path = require("path");
const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  port: process.env.DB_PORT || 5432,
  dialect: "postgres",
  logging: false // Cambia esto a false en producción
});
// Definir el modelo Products
class Products extends Model {}

Products.init({
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "Products",
  timestamps: false
});

// Definir el modelo Compras
class Compras extends Model {}

Compras.init({
  compra_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "Compras",
  timestamps: false
});

// Sincronizar modelos
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Modelos sincronizados");
  })
  .catch(err => console.error("Error al sincronizar modelos:", err));

// Sirve archivos estáticos desde la carpeta 'public'!!
app.use(express.static(path.join(__dirname, "public")));

// Integrar el middleware a la app para el manejo de cookies
app.use(cookieParser());

// Configurar body-parser para analizar las solicitudes JSON
app.use(bodyParser.json());

// Configuración de express-session
app.use(session({
  secret: "tu secreto muy secreto",
  resave: false, // Definir explícitamente resave como false
  saveUninitialized: true, // Definir explícitamente saveUninitialized como true
  cookie: { secure: true }
}));

// Configura EJS para renderizar archivos .html.
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html"); // Establece 'html' como el motor de plantillas.

app.set("views", "./views"); // Establece './views' como el directorio de plantillas.

app.get("/", (req, res) => { // Ruta para '/index' que renderiza 'index.html'.
  res.render("index");
});

// Ruta POST para procesar la compra
// Ruta POST para procesar la compra
app.post("/comprar", async (req, res) => {
  const { cart } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const results = [];

    for (const item of cart) {
      const { id, cantidad } = item;

      // Crear una compra
      const compra = await Compras.create({
        producto_id: id,
        cantidad
      }, { transaction });

      // Actualizar la cantidad en el inventario
      const product = await Products.findByPk(id, { transaction });
      if (product) {
        product.cantidad -= cantidad;
        await product.save({ transaction });
      }

      results.push(compra);
    }

    // Si todo sale bien, confirma la transacción
    await transaction.commit();

    console.log("Resultados de la inserción:", results);
    res.status(200).json({ message: "Compra realizada exitosamente" });
  } catch (error) {
    // Si hay algún error, revierte la transacción
    await transaction.rollback();
    console.error("Error realizando la compra:", error);
    res.status(500).json({ message: "Error al procesar la compra" });
  }
});

// Prueba para corroborar el correcto entrelazamiento de las variables de entorno
console.log(process.env.PASSWORD);

app.listen(3000, () => console.log("Server ready")); // Inicia el servidor en el puerto 3000 y registra un mensaje.
