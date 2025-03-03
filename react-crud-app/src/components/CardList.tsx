import React from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { fetchCards } from '../services/api';
import { addCard, deleteCard, updateCollectionName } from '../state/actions';
import Card from './Card';
import type { Card as CardType } from '../types';

const CardList: React.FC = () => {
  const dispatch = useDispatch();
  const { data: cards, error, isLoading } = useQuery('cards', fetchCards);

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

  const handleUpdateCollectionName = (newName: string) => {
    const collectionId = prompt('Enter collection ID to update the name:');
    if (collectionId) {
      dispatch(updateCollectionName(collectionId, newName));
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
      {cards.slice(0, 10).map((card: CardType) => (
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