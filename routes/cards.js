const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard, getListCards, deleteCardById, addLikeCard, disLikeCard,
} = require('../controllers/cards');
const { urlRegAvatar } = require('../utils/constants');

router.get('/', getListCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegAvatar),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), deleteCardById);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), addLikeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), disLikeCard);

module.exports = router;
