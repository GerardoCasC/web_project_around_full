import type { RequestHandler } from 'express';
import { Card } from '../models/card.js';

export const getCards: RequestHandler = async (req, res) => {
  const userId = req.user?._id?.toString();

  const cards = await Card.find({ owner: userId! }).sort({ createdAt: -1 });

  const cardsWithIsLiked = cards.map((card) => ({
    ...card.toObject(),
    isLiked: card.likes.some((id) => id.toString() === userId),
  }));
  res.send(cardsWithIsLiked);
};

export const getCardsById: RequestHandler = async (req, res) => {
  const card = await Card.findById(req.params.card_id);
  if (!card) {
    throw Object.assign(
      new Error(`No se encontró ninguna tarjeta con ese id`),
      {
        statusCode: 404,
      },
    );
  }

  res.status(200).json(card);
};

export const postCards: RequestHandler = async (req, res) => {
  const owner = req.user?._id;

  if (!owner) {
    res
      .status(401)
      .json({ message: 'Necesitas iniciar sesión para realizar esta acción' });
    return;
  }

  const newCard = await Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: owner,
  });
  res.status(201).json(newCard);
};

export const deleteCardsById: RequestHandler = async (req, res) => {
  const card = await Card.findById(req.params.card_id);

  if (!card) {
    throw Object.assign(
      new Error('No se encontró ninguna tarjeta con ese id'),
      { statusCode: 404 },
    );
  }
  if (card.owner.toString() !== req.user?._id?.toString()) {
    throw Object.assign(
      new Error('No tienes permiso para eliminar esta tarjeta'),
      { statusCode: 403 },
    );
  }

  await card.deleteOne();

  res.status(200).json(card);
};

export const likeCard: RequestHandler = async (req, res) => {
  const card = await Card.findById(req.params.id);

  if (!card) {
    throw Object.assign(
      new Error('No se encontró ninguna tarjeta con ese id'),
      {
        statusCode: 404,
      },
    );
  }
  if (card.owner.toString() !== req.user?._id?.toString()) {
    res.status(403).json({
      message: 'No tienes permiso para modificar los likes de esta tarjeta',
    });
    return;
  }

  const updatedCard = await Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user?._id } },
    { returnDocument: 'after' },
  );

  res.status(200).send({
    ...updatedCard!.toObject(),
    isLiked: updatedCard!.likes.some(
      (id) => id.toString() === req.user?._id?.toString(),
    ),
  });
};

export const dislikeCard: RequestHandler = async (req, res) => {
  const card = await Card.findById(req.params.id);
  if (!card) {
    throw Object.assign(
      new Error('No se encontró ninguna tarjeta con ese id'),
      {
        statusCode: 404,
      },
    );
  }
  if (card.owner.toString() !== req.user?._id?.toString()) {
    res.status(403).json({
      message: 'No tienes permiso para modificar los likes de esta tarjeta',
    });
    return;
  }
  const updatedCard = await Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user?._id } },
    { returnDocument: 'after' },
  );

  res.status(200).send({
    ...updatedCard!.toObject(),
    isLiked: updatedCard!.likes.some(
      (id) => id.toString() === req.user?._id?.toString(),
    ),
  });
};
