const express = require('express');
const router = express.Router();
const Finanzas = require('../models/Finanzas'); // Asegúrate de que la ruta sea correcta

// Ruta para obtener todos los registros de Finanzas
router.get('/', async (req, res) => {
  try {
    const registros = await Finanzas.findAll();
    res.json(registros);
  } catch (error) {
    console.error('Error al obtener los registros de finanzas:', error);
    res.status(500).json({ error: 'Error al obtener los registros de finanzas' });
  }
});

// Ruta para crear un nuevo registro de Finanzas
router.post('/', async (req, res) => {
  try {
    const { description, amount, date } = req.body;
    if (!description || !amount || !date) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const nuevoRegistro = await Finanzas.create({
      description,
      amount,
      date,
    });
    res.status(201).json(nuevoRegistro);
  } catch (error) {
    console.error('Error al crear el registro de finanzas:', error);
    res.status(500).json({ error: 'Error al crear el registro de finanzas' });
  }
});

// Ruta para actualizar un registro de Finanzas por ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, date } = req.body;

    const registro = await Finanzas.findByPk(id);
    if (!registro) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    registro.description = description;
    registro.amount = amount;
    registro.date = date;

    await registro.save();
    res.json(registro);
  } catch (error) {
    console.error('Error al actualizar el registro de finanzas:', error);
    res.status(500).json({ error: 'Error al actualizar el registro de finanzas' });
  }
});

// Ruta para eliminar un registro de Finanzas por ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const registro = await Finanzas.findByPk(id);
    if (!registro) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await registro.destroy();
    res.json({ message: 'Registro eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el registro de finanzas:', error);
    res.status(500).json({ error: 'Error al eliminar el registro de finanzas' });
  }
});

module.exports = router;
