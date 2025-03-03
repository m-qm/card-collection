import React from 'react';
import type { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onAddToCollection?: (card: CardType) => void;
  onDelete?: (card: CardType) => void;
  isInCollection?: boolean;
}

const Card: React.FC<CardProps> = ({ card, onAddToCollection, onDelete, isInCollection }) => {
  const placeholderImageUrl = 'https://placehold.co/233x310?text=No+Image+Available';

  return (
    <div className="card p-4 border rounded shadow">
      <h3 className="text-lg font-semibold mb-2">{card.name}</h3>
      <img
        src={card.imageUrl ?? placeholderImageUrl}
        alt={card.name}
        className="mb-2"
        onError={(e) => {
          e.currentTarget.src = placeholderImageUrl;
        }}
      />
      <p className="mb-2">{card.description}</p>
      {onAddToCollection && !isInCollection && (
        <button
          type="button"
          onClick={() => onAddToCollection(card)}
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Add to Collection
        </button>
      )}
      {isInCollection && onDelete && (
        <button
          type="button"
          onClick={() => onDelete(card)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Card;