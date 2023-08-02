const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id)
        .populate('owner')
        .then((data) => res.status(201).send(data))
        .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере' }));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

const getListCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере' }));
};

const deleteCardById = (req, res) => {
  if (/^[a-f\d]{24}$/.test(req.params.cardId)) {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Карточка по данному _id не найдена' });
          return;
        }
        res.send({ message: 'Карточка удалена' });
      })
      .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере' }));
  } else {
    res.status(400).send({ message: 'Неправильный _id' });
  }
};

const addLikeCard = (req, res) => {
  if (/^[a-f\d]{24}$/.test(req.params.cardId)) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .populate(['owner', 'likes'])
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Карточка по данному _id не найдена' });
          return;
        }
        res.send(card);
      })
      .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере' }));
  } else {
    res.status(400).send({ message: 'Неправильный _id' });
  }
};

const disLikeCard = (req, res) => {
  if (/^[a-f\d]{24}$/.test(req.params.cardId)) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .populate(['owner', 'likes'])
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Карточка по данному _id не найдена' });
          return;
        }
        res.send(card);
      })
      .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере' }));
  } else {
    res.status(400).send({ message: 'Неправильный _id' });
  }
};

module.exports = {
  createCard,
  getListCards,
  deleteCardById,
  addLikeCard,
  disLikeCard,
};
