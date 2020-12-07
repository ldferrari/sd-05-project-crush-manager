const express = require('express');
const authMiddleware = require('../middlewares/authentication');
const crud = require('../models');
const validateCrush = require('../utils/crush');
const searchCrush = require('../services/search');

const crushRouter = express.Router();

crushRouter.get('/', authMiddleware, async (_, response) => {
  const allCrushes = await crud.read();

  return response.status(200).json(allCrushes);
});

crushRouter.get('/search', authMiddleware, async (request, response) => {
  const query = request.query.q;

  const result = await searchCrush(query);

  return response.status(200).json(result);
});

crushRouter.get('/:id', authMiddleware, async (request, response) => {
  const { id } = request.params;

  const crush = await crud.read(id);

  if (!crush) {
    return response.status(404).json({ message: 'Crush não encontrado' });
  }

  return response.status(200).json(crush);
});

crushRouter.post('/', authMiddleware, async (request, response) => {
  const crush = validateCrush(request.body);
  if (!crush.isValid) return response.status(400).json({ message: crush.message });

  const crushList = await crud.read();

  const newCrush = { id: crushList.length + 1, ...request.body };

  await crud.create(newCrush);

  return response.status(201).json(newCrush);
});

crushRouter.put('/:id', authMiddleware, async (request, response) => {
  const { id } = request.params;

  const crush = validateCrush(request.body);
  if (!crush.isValid) return response.status(400).json({ message: crush.message });

  await crud.update(id, request.body);
  return response.status(200).json({ id: Number(id), ...request.body });
});

crushRouter.delete('/:id', authMiddleware, async (request, response) => {
  const { id } = request.params;

  await crud.delete(id);

  return response.status(200).json({ message: 'Crush deletado com sucesso' });
});

module.exports = crushRouter;
