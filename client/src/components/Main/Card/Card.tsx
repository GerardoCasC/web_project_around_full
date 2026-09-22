import type { CardData, PopupConfig } from '../../../types/types.ts';
import ImagePopup from '../Popup/ImagePopup/ImagePopup.tsx';

type CardProps = {
  card: CardData;
  onOpen: (popup: PopupConfig) => void;
  onClose: () => void;
  handleCardLike: (card: CardData) => void;
  handleCardDelete: (card: CardData) => void;
};

export default function Card(props: CardProps): React.JSX.Element {
  const { link, name } = props.card;
const imagePopupConfig: PopupConfig = {
        children: <ImagePopup card={props.card} />
    };
const cardLikeButtonClassName = `card__like-button ${
  props.card.isLiked ? "card__like-button_is-active" : ""
}`;
  return (
    <li className='card'>
      <img className='card__image' src={link} alt={name} onClick={() => props.onOpen(imagePopupConfig)} />
      <button
        aria-label='Delete card'
        className='card__delete-button'
        type='button'
        onClick={() => props.handleCardDelete(props.card)}
      />
      <div className='card__description'>
        <h2 className='card__title'>{name}</h2>
        <button
          aria-label='Like card'
          type='button'
          className={cardLikeButtonClassName}
          onClick={() => props.handleCardLike(props.card)}
        />
      </div>
    </li>
  );
}