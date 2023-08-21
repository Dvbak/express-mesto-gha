const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getListUsers, getUserById, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const { urlRegAvatar } = require('../utils/constants');

router.get('/', getListUsers);
router.get('/me', getCurrentUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegAvatar),
  }),
}), updateAvatar);

module.exports = router;
