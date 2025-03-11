import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { fetchCards } from '../services/api';
import { addCard, deleteCard, setInitialCards } from '../state/actions';
import Card from './Card';
import type { Card as CardType } from '../types';
import type { RootState } from '../state/store';

const CardList: React.FC = () => {
  const dispatch = useDispatch();
  const initialCards = useSelector((state: RootState) => state.collectionState.initialCards || []);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [collectionId, setCollectionId] = useState<string>('');

  const { data: cards, error, isLoading, isFetching, refetch } = useQuery('cards', fetchCards, {
    cacheTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 3, // Retry failed requests up to 3 times
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });

  useEffect(() => {
    if (cards) {
      dispatch(setInitialCards(cards));
    }
  }, [cards, dispatch]);

  const handleAddToCollection = (card: CardType) => {
    const collectionId = prompt('Enter collection ID to add this card to:');
    if (collectionId) {
      dispatch(addCard(collectionId, card));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCard) {
      dispatch(addCard(collectionId, selectedCard));
      setSelectedCard(null);
      setCollectionId('');
    }
  }
  

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
    return (
      <div role="alert">
        Error fetching cards
        <button type="button"
          onClick={() => refetch()} className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          aria-label="Retry fetching cards"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {isFetching && <div>Updating...</div>}
      <div className="card-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {initialCards.map((card: CardType) => (
          <Card
            key={card.id}
            card={card}
            onAddToCollection={handleAddToCollection}
            onDelete={handleDeleteCard}
            isInCollection={false}
          />
        ))}
      </div>
      {selectedCard && (
        <form onSubmit={handleSubmit} className="mt-4">
          <label htmlFor="collectionId" className="block text-sm font-medium text-gray-700">
            Enter collection ID to add "{selectedCard.name}" to:
          </label>
          <input
            type="text"
            id="collectionId"
            value={collectionId}
            onChange={(e) => setCollectionId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Add to Collection
          </button>
        </form>
      )}
    </div>
  );
};

export default CardList;