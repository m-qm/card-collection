import type React from 'react';
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
      <div>
        Error fetching cards
        <button type="button"
          onClick={() => refetch()} className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
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
    </div>
  );
};

export default CardList;