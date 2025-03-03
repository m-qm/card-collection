import { Collection } from '../types';
import { AnyAction } from 'redux';

const initialState: Collection[] = [];

export const collectionReducer = (state = initialState, action: AnyAction): Collection[] => {
    switch (action.type) {
        case 'ADD_COLLECTION':
            return [...state, action.payload];
        case 'DELETE_COLLECTION':
            return state.filter(collection => collection.id !== action.payload.id);
        case 'UPDATE_COLLECTION_NAME':
            return state.map(collection =>
                collection.id === action.payload.id
                    ? { ...collection, name: action.payload.name }
                    : collection
            );
        case 'ADD_CARD':
            return state.map(collection =>
                collection.id === action.payload.collectionId
                    ? { ...collection, cards: [...collection.cards, action.payload.card] }
                    : collection
            );
        case 'DELETE_CARD':
            return state.map(collection =>
                collection.id === action.payload.collectionId
                    ? { ...collection, cards: collection.cards.filter(card => card.id !== action.payload.cardId) }
                    : collection
            );
        default:
            return state;
    }
};