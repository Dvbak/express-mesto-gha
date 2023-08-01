const router = require('express').Router();
const {
  createUser, getListUsers, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getListUsers);
router.get('/:userId', getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
