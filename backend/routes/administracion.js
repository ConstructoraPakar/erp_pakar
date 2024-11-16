const express = require('express');
const router = express.Router();
const Administracion = require('../models/Administracion'); // Ajusta la ruta según tu estructura

// Ruta para obtener todos los registros de administración
router.get('/', async (req, res) => {
  try {
    const records = await Administracion.findAll();
    res.status(200).json(records);
  } catch (error) {
    console.error('Error al obtener los registros de administración:', error);
    res.status(500).json({ error: 'Error al obtener los registros de administración' });
  }
});

// Ruta para crear un nuevo registro de administración
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'El campo name es obligatorio' });
    }

    const newRecord = await Administracion.create({
      name
    });
    res.status(201).json(newRecord);
  } catch (error) {
    console.error('Error al crear el registro de administración:', error);
    res.status(500).json({ error: 'Error al crear el registro de administración' });
  }
});

// Ruta para actualizar un registro de administración existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const record = await Administracion.findByPk(id);
    if (!record) {
      return res.status(404).json({ error: 'Registro de administración no encontrado' });
    }
    record.name = name;
    await record.save();
    res.json(record);
  } catch (error) {
    console.error('Error al actualizar el registro de administración:', error);
    res.status(500).json({ error: 'Error al actualizar el registro de administración' });
  }
});

// Ruta para eliminar un registro de administración existente
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const record = await Administracion.findByPk(id);
    if (!record) {
      return res.status(404).json({ error: 'Registro de administración no encontrado' });
    }
    await record.destroy();
    res.json({ message: 'Registro de administración eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el registro de administración:', error);
    res.status(500).json({ error: 'Error al eliminar el registro de administración' });
  }
});

module.exports = router;
