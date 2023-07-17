const express = require('express');

const cardsRouter = express.Router();

const {
  createCard, getCards, deleteCard, addLike, deleteLike,
} = require('../controllers/cards');

const {
  validateCards, validateCardId,
} = require('../middlewares/valid');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard, validateCards);
cardsRouter.delete('/cards/:cardId', deleteCard, validateCardId);
cardsRouter.put('/cards/:cardId/likes', addLike, validateCardId);
cardsRouter.delete('/cards/:cardId/likes', deleteLike, validateCardId);

module.exports = cardsRouter;
