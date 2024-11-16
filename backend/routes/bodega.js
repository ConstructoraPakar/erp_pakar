const express = require('express');
const router = express.Router();
const Bodega = require('../models/Bodega'); // Asegúrate de que la ruta sea correcta

// Ruta para obtener todas las bodegas
router.get('/', async (req, res) => {
  try {
    const bodegas = await Bodega.findAll();
    res.status(200).json(bodegas);
  } catch (error) {
    console.error("Error al obtener las bodegas:", error);
    res.status(500).json({ error: 'Error al obtener las bodegas' });
  }
});

// Ruta para crear una nueva bodega
router.post('/', async (req, res) => {
  try {
    const { nombre, ubicacion, capacidad } = req.body;
    if (!nombre || !ubicacion || capacidad === undefined) {
      return res.status(400).json({ error: 'Los campos nombre, ubicacion y capacidad son obligatorios' });
    }

    const nuevaBodega = await Bodega.create({ nombre, ubicacion, capacidad });
    res.status(201).json(nuevaBodega);
  } catch (error) {
    console.error("Error al crear la bodega:", error);
    res.status(500).json({ error: 'Error al crear la bodega' });
  }
});

// Ruta para actualizar una bodega por su ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, ubicacion, capacidad } = req.body;

    const bodega = await Bodega.findByPk(id);
    if (!bodega) {
      return res.status(404).json({ error: 'Bodega no encontrada' });
    }

    bodega.nombre = nombre || bodega.nombre;
    bodega.ubicacion = ubicacion || bodega.ubicacion;
    bodega.capacidad = capacidad !== undefined ? capacidad : bodega.capacidad;

    await bodega.save();
    res.status(200).json(bodega);
  } catch (error) {
    console.error("Error al actualizar la bodega:", error);
    res.status(500).json({ error: 'Error al actualizar la bodega' });
  }
});

// Ruta para eliminar una bodega por su ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const bodega = await Bodega.findByPk(id);
    if (!bodega) {
      return res.status(404).json({ error: 'Bodega no encontrada' });
    }

    await bodega.destroy();
    res.status(200).json({ message: 'Bodega eliminada correctamente' });
  } catch (error) {
    console.error("Error al eliminar la bodega:", error);
    res.status(500).json({ error: 'Error al eliminar la bodega' });
  }
});

module.exports = router;
