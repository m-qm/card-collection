import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { fetchCards } from '../services/api';
import { addCard, deleteCard, setInitialCards } from '../state/actions';
import Card from './Card';
import type { Card as CardType } from '../types';
import { RootState } from '../state/store';

const CardList: React.FC = () => {
  const dispatch = useDispatch();
  const initialCards = useSelector((state: RootState) => state.collectionState.initialCards);
  const { data: cards, error, isLoading } = useQuery('cards', fetchCards);

  useEffect(() => {
    if (cards) {
      dispatch(setInitialCards(cards));
    }
  }, [cards, dispatch]);

  const handleAddToCollection = (card: CardType) => {
    const collectionId = prompt('Enter collection ID to add this card to:');
    if (collectionId) {
      console.log('Adding card to collection:', card);
      dispatch(addCard(collectionId, card));
    }
  };

  const handleDeleteCard = (card: CardType) => {
    const collectionId = prompt('Enter collection ID to delete this card from:');
    if (collectionId) {
      dispatch(deleteCard(collectionId, card.id));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching cards</div>;
  }

  return (
    <div className="card-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {initialCards.slice(0, 10).map((card: CardType) => (
        <Card
          key={card.id}
          card={card}
          onAddToCollection={handleAddToCollection}
          onDelete={handleDeleteCard}
          isInCollection={false}
        />
      ))}
    </div>
  );
};

export default CardList;