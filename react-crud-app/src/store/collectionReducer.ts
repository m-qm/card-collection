import type { Collection, Card } from '../types';
import type { AnyAction } from 'redux';

interface CollectionState {
    collections: Collection[];
    initialCards: Card[];
}


export const collectionReducer = (state: CollectionState, action: AnyAction): CollectionState => {
    switch (action.type) {
        case 'ADD_COLLECTION':
            return {
                ...state,
                collections: [...state.collections, action.payload]
            };
        case 'DELETE_COLLECTION':
            return {
                ...state,
                collections: state.collections.filter(collection => collection.id !== action.payload.id)
            };
        case 'UPDATE_COLLECTION_NAME':
            return {
                ...state,
                collections: state.collections.map(collection =>
                    collection.id === action.payload.id
                        ? { ...collection, name: action.payload.name }
                        : collection
                )
            };
        case 'ADD_CARD': {
            const collectionExists = state.collections.find(collection => collection.id === action.payload.collectionId);
            const updatedInitialCards = state.initialCards.filter(card => card.id !== action.payload.card.id);
            if (collectionExists) {
                return {
                    ...state,
                    collections: state.collections.map(collection =>
                        collection.id === action.payload.collectionId
                            ? { ...collection, cards: [...collection.cards, action.payload.card] }
                            : collection
                    ),
                    initialCards: updatedInitialCards
                };
            }
            const newCollection: Collection = {
                id: action.payload.collectionId,
                name: `Collection ${action.payload.collectionId}`,
                cards: [action.payload.card]
            };
            return {
                ...state,
                collections: [...state.collections, newCollection],
                initialCards: updatedInitialCards
            };
        }
        case 'DELETE_CARD': {
            const cardToRemove = state.collections
                .find(collection => collection.id === action.payload.collectionId)
                ?.cards.find(card => card.id === action.payload.cardId);

            return {
                ...state,
                collections: state.collections.map(collection =>
                    collection.id === action.payload.collectionId
                        ? { ...collection, cards: collection.cards.filter(card => card.id !== action.payload.cardId) }
                        : collection
                ),
                initialCards: cardToRemove ? [...state.initialCards, cardToRemove] : state.initialCards
            };
        }
        case 'SET_INITIAL_CARDS':
            return {
                ...state,
                initialCards: action.payload
            };
        case 'persist/PERSIST':
            // Handle the persist action without non-serializable values
            return {
                ...state,
                // No changes needed for state, just ensuring action is handled
            };
        default:
            return state;
    }
};
