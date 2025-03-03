import { Card } from '../types';
import { AnyAction } from 'redux';

const initialState: Card[] = [];

export const cardReducer = (state = initialState, action: AnyAction): Card[] => {
    switch (action.type) {
        case 'ADD_CARD':
            return [...state, action.payload.card];
        case 'DELETE_CARD':
            return state.filter(card => card.id !== action.payload.cardId);
        default:
            return state;
    }
};