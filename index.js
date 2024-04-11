import pg from "pg";
import express from "express";
import data from "./data.json" assert { type: "json" };

const { Pool } = pg;
const app = express();
const port = 3000;

const config = {
  user: "postgres",
  host: "localhost",
  database: "estudiantes",
  password: "1234",
  port: 5432,
};
const pool = new Pool(config);

app.use(express.json());

//función para agregar estudiantes
const agregar = async (req, res) => {
  const { nombre, rut, curso, nivel } = req.body;
  try {
    const result = await pool.query(
      data.agregarEstudiante.text,
      data.agregarEstudiante.values
    );
    console.log("¡Registro agregado exitosamente!");
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error");
  }
};

//función para consultar estudiantes registrados
const consultar = async (req, res) => {
  const { nombre, rut, curso, nivel } = req.body;
  try {
    const result = await pool.query(data.consultarEstudiantes.text);
    console.log(result.rows);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error");
  }
};

//función para actualizar registro estudiante
const actualizar = async (req, res) => {
  try {
    const result = await pool.query(
      data.actualizarEstudiante.text,
      data.actualizarEstudiante.values
    );
    console.log("¡Registro actualizado exitosamente!");
    res.status(200).send(result);
    return result;
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error");
  }
};

//función para eliminar registro estudiante
const eliminar = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(data.eliminarEstudiante.text, [id]);
    console.log("¡Registro eliminado exitosamente!");
    res.status(200).send(result);
    return result;
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error");
  }
};

//ruta apara agregar estudiantes
app.post("/agregar", async (req, res) => {
  await agregar(req, res);
});

//ruta para consultar estudiantes resgistrados
app.get("/consultar", async (req, res) => {
  await consultar(req, res);
});

//ruta para consultar estudiantes por rut
app.get("/rut/:rut", async (req, res) => {
  await rut(req, res);
});

//ruta para actualizar registro estdiante
app.patch("/actualizar/:id", async (req, res) => {
  await actualizar(req, res);
});

//ruta para eliminar registro estudiante
app.delete("/eliminar/:id", async (req, res) => {
  await eliminar(req, res);
});

//servidor
app.listen(port, () => {
  console.log("Servidor levantado correctamente");
});
