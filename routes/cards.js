const express = require('express');

const cardsRouter = express.Router();

const {
  JoiValidateCard, JoiValidateCardId,
} = require('../middlewares/valid');

const {
  createCard, getCards, deleteCard, addLike, deleteLike,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', JoiValidateCard, createCard);
cardsRouter.delete('/:id', JoiValidateCardId, deleteCard);
cardsRouter.put('/:id/likes', JoiValidateCardId, addLike);
cardsRouter.delete('/:id/likes', JoiValidateCardId, deleteLike);

module.exports = cardsRouter;
