const router = require('express').Router();
const {
  createCard, getListCards, deleteCardById, addLikeCard, disLikeCard,
} = require('../controllers/cards');

router.post('/', createCard);
router.get('/', getListCards);
router.get('/:cardId', deleteCardById);
router.put('/:cardId/likes', addLikeCard);
router.delete('/:cardId/likes', disLikeCard);

module.exports = router;
