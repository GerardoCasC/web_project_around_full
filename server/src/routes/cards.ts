import { Router } from 'express';
import {
  getCards,
  getCardsById,
  postCards,
  deleteCardsById,
  likeCard,
  dislikeCard,
} from '../controllers/cards.js';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.get('/:card_id', getCardsById);
cardsRouter.post('/', postCards);
cardsRouter.delete('/:card_id', deleteCardsById);
cardsRouter.put('/:id/likes', likeCard);
cardsRouter.delete('/:id/likes', dislikeCard);

export { cardsRouter };
