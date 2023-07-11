const express = require('express');
const cardsRouter = express.Router();

const { createCard, getCards, deleteCard, addLike, deleteLike } = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:cardId', deleteCard);
cardsRouter.put('/cards/:cardId/likes', addLike);
cardsRouter.delete('/cards/:cardId/likes', deleteLike);

module.exports = cardsRouter;
