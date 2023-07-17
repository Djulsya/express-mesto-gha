const express = require('express');

const cardsRouter = express.Router();

const {
  createCard, getCards, deleteCard, addLike, deleteLike,
} = require('../controllers/cards');

const {
  joiValidateCards, joiValidateCardId,
} = require('../middlewares/valid');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard, joiValidateCards);
cardsRouter.delete('/cards/:cardId', deleteCard, joiValidateCardId);
cardsRouter.put('/cards/:cardId/likes', addLike, joiValidateCardId);
cardsRouter.delete('/cards/:cardId/likes', deleteLike, joiValidateCardId);

module.exports = cardsRouter;
