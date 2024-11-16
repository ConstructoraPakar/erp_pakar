const express = require('express');
const router = express.Router();
const { Proyecto } = require('../models'); // Importamos el modelo Proyecto

// Ruta GET para obtener todos los proyectos
router.get('/', async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll();
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los proyectos' });
  }
});

// Ruta POST para crear un nuevo proyecto
router.post('/', async (req, res) => {
  const { name, description, startDate, endDate, budget } = req.body;
  try {
    const nuevoProyecto = await Proyecto.create({
      name,
      description,
      startDate,
      endDate,
      budget
    });
    res.status(201).json(nuevoProyecto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el proyecto' });
  }
});

// Ruta PUT para actualizar un proyecto existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, startDate, endDate, budget } = req.body;
  try {
    const proyecto = await Proyecto.findByPk(id);
    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    proyecto.name = name;
    proyecto.description = description;
    proyecto.startDate = startDate;
    proyecto.endDate = endDate;
    proyecto.budget = budget;
    await proyecto.save();
    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el proyecto' });
  }
});

// Ruta DELETE para eliminar un proyecto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const proyecto = await Proyecto.findByPk(id);
    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    await proyecto.destroy();
    res.json({ message: 'Proyecto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el proyecto' });
  }
});

module.exports = router;
