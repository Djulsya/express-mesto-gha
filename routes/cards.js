const express = require('express');

const cardsRouter = express.Router();

const {
  JoiValidateCard, JoiValidateCardId,
} = require('../middlewares/valid');

const {
  createCard, getCards, deleteCard, addLike, deleteLike,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', JoiValidateCard, createCard);
cardsRouter.delete('/cards/:id', JoiValidateCardId, deleteCard);
cardsRouter.put('/cards/:id/likes', JoiValidateCardId, addLike);
cardsRouter.delete('/cards/:id/likes', JoiValidateCardId, deleteLike);

module.exports = cardsRouter;
