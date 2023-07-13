const express = require('express');
const router = express.Router();
const db = require('./db');

// Obtener todos los registros
router.get('/registros', (req, res) => {
  db.query('SELECT * FROM employees', (error, results) => {
    if (error) {
      console.error('Error al obtener los registros: ', error);
      res.status(500).send('Error al obtener los registros.');
    } else {
      res.json(results);
    }
  });
});



//attendance

router.get('/attendance', (req, res) => {
  db.query('SELECT a.id, e.nombre AS empleado, a.fecha, a.hora FROM attendances AS a INNER JOIN employees AS e ON a.empleado = e.id', (error, results) => {
    if (error) {
      console.error('Error al obtener los registros: ', error);
      res.status(500).send('Error al obtener los registros.');
    } else {
      res.json(results);
    }
  });
});



router.get('/attendance/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM attendances WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Error al obtener el registro: ', error);
      res.status(500).send('Error al obtener el registro.');
    } else if (results.length === 0) {
      res.status(404).send('Registro no encontrado.');
    } else {
      res.json(results[0]);
    }
  });
});

router.get('/attendanceSearch/:id', (req, res) => {
  const id = req.params.id;

  // Obtener la fecha actual
  const currentDate = new Date().toISOString().slice(0, 10);

  // Consultar si ya existe una asistencia para el empleado en la fecha actual
  db.query('SELECT * FROM attendances WHERE empleado = ? AND DATE(fecha) = ?', [id, currentDate], (error, results) => {
    if (error) {
      console.error('Error al obtener el registro: ', error);
      res.status(500).send('Error al obtener el registro.');
    } else if (results.length === 0) {
      res.json(null); // No hay registros encontrados
    } else {
      res.json(results[0]);
    }
  });
});





// Obtener un registro por ID
router.get('/registros/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM employees WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Error al obtener el registro: ', error);
      res.status(500).send('Error al obtener el registro.');
    } else if (results.length === 0) {
      res.status(404).send('Registro no encontrado.');
    } else {
      res.json(results[0]);
    }
  });
});

// Crear un nuevo registro
router.post('/registros', (req, res) => {
  const { nombre, departamento } = req.body;
  db.query('INSERT INTO employees (nombre, departamento) VALUES (?, ?)', [nombre, departamento], (error, result) => {
    if (error) {
      console.error('Error al crear el registro: ', error);
      res.status(500).send('Error al crear el registro.');
    } else {
      res.status(201).json({ id: result.insertId });
    }
  });
});

router.post('/registroA', (req, res) => {
  const { empleado} = req.body;
  db.query('INSERT INTO attendances (empleado) VALUES (?)', [empleado], (error, result) => {
    if (error) {
      console.error('Error al crear el registro: ', error);
      res.status(500).send('Error al crear el registro.');
    } else {
      res.status(201).json({ id: result.insertId });
    }
  });
});

// Actualizar un registro existente
router.put('/registros/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, departamento } = req.body;
  db.query('UPDATE employees SET nombre = ?, departamento = ? WHERE id = ?', [nombre, departamento, id], (error) => {
    if (error) {
      console.error('Error al actualizar el registro: ', error);
      res.status(500).send('Error al actualizar el registro.');
    } else {
      res.status(200).send('Registro actualizado exitosamente.');
    }
  });
});

// Eliminar un registro
router.delete('/registros/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM employees WHERE id = ?', [id], (error) => {
    if (error) {
      console.error('Error al eliminar el registro: ', error);
      res.status(500).send('Error al eliminar el registro.');
    } else {
      res.status(200).send('Registro eliminado exitosamente.');
    }
  });
});





module.exports = router;
