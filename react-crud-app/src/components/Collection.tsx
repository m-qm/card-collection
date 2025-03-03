import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCard, deleteCard, updateCollectionName } from '../state/actions';
import { RootState, AppDispatch } from '../state/store';
import Card from './Card';
import type { Card as CardType } from '../types';

interface CollectionProps {
  collectionId: string;
}

const Collection: React.FC<CollectionProps> = ({ collectionId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const collection = useSelector((state: RootState) => state.collections.find(c => c.id === collectionId));
  console.log('Current collection:', collection);

  const handleAddToCollection = (card: CardType) => {
    console.log('Adding card to collection:', card);
    dispatch(addCard(collectionId, card));
  };

  const handleDeleteCard = (card: CardType) => {
    dispatch(deleteCard(collectionId, card.id));
  };

  const handleUpdateCollectionName = (newName: string) => {
    dispatch(updateCollectionName(collectionId, newName));
  };

  if (!collection) {
    return <div>Collection not found</div>;
  }

  console.log('Current collection state:', collection);

  return (
    <div className="collection p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-2">{collection.name}</h2>
      <button
        type="button"
        onClick={() => handleUpdateCollectionName(prompt('New collection name') || '')}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        Update Collection Name
      </button>
      <div className="card-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {collection.cards.map((card: CardType) => (
          <Card
            key={card.id}
            card={card}
            onAddToCollection={handleAddToCollection}
            onDelete={handleDeleteCard}
            isInCollection={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Collection;