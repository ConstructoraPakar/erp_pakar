// routes/obra.js

const express = require('express');
const router = express.Router();
const Obra = require('../models/Obra'); // Importamos el modelo de Obra

// Ruta GET para mostrar un mensaje de bienvenida
router.get('/', (req, res) => {
  res.send('Bienvenido al módulo de Obra');
});

// Ruta POST para crear un nuevo registro de Obra
router.post('/', async (req, res) => {
  try {
    const { name, description, startDate, endDate } = req.body;

    if (!name || !description || !startDate) {
      return res.status(400).json({ error: 'Los campos name, description y startDate son obligatorios' });
    }

    const newObra = await Obra.create({
      name,
      description,
      startDate,
      endDate,
    });

    res.status(201).json(newObra);
  } catch (error) {
    console.error('Error al crear el registro de Obra:', error);
    res.status(500).json({ error: 'Error al crear el registro de Obra' });
  }
});

// Ruta PUT para actualizar un registro de Obra por ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, startDate, endDate } = req.body;

    const obra = await Obra.findByPk(id);
    if (!obra) {
      return res.status(404).json({ error: 'Obra no encontrada' });
    }

    obra.name = name || obra.name;
    obra.description = description || obra.description;
    obra.startDate = startDate || obra.startDate;
    obra.endDate = endDate || obra.endDate;

    await obra.save();

    res.status(200).json(obra);
  } catch (error) {
    console.error('Error al actualizar el registro de Obra:', error);
    res.status(500).json({ error: 'Error al actualizar el registro de Obra' });
  }
});

// Ruta DELETE para eliminar un registro de Obra por ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const obra = await Obra.findByPk(id);
    if (!obra) {
      return res.status(404).json({ error: 'Obra no encontrada' });
    }

    await obra.destroy();

    res.status(200).json({ message: 'Obra eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar el registro de Obra:', error);
    res.status(500).json({ error: 'Error al eliminar el registro de Obra' });
  }
});

module.exports = router;
