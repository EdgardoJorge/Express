require("dotenv").config(); // carga la configuración de variables de entorno

const { neon } = require("@neondatabase/serverless"); // trae la instancia de Neon

const express = require('express'); // trae la instancia de express
const app = express(); // configura express
const port = 3000; // define puerto
const sql = neon(process.env.DATABASE_URL); // se crea la conexión con Neon

// Ruta para obtener los datos de la tabla tbl_tareas en formato JSON
app.get('/', async (req, res) => {
  try {
    // Realizamos la consulta a la tabla tbl_tareas
    const result = await sql`SELECT * FROM tbl_tareas`;

    // Verificamos si la tabla tiene datos
    if (result.length === 0) {
      return res.json({ message: 'No hay tareas en la base de datos.' });
    }

    // Respondemos con los datos de la tabla tbl_tareas en formato JSON
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener los datos de la base de datos.' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
