import { Router } from 'express';
import {
  getCards,
  getCardsById,
  postCards,
  deleteCardsById,
  likeCard,
  dislikeCard,
} from '../controllers/cards.js';
import { auth } from '../middleware/auth.js';

const cardsRouter = Router();

cardsRouter.get('/', auth, getCards);
cardsRouter.get('/:card_id', auth, getCardsById);
cardsRouter.post('/', auth, postCards);
cardsRouter.delete('/:card_id', auth, deleteCardsById);
cardsRouter.put('/:id/likes', auth, likeCard);
cardsRouter.delete('/:id/likes', auth, dislikeCard);

export { cardsRouter };
