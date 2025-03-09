import type { Card, Collection } from '../types';
import axios from 'axios';

const API_URL = 'https://api.magicthegathering.io/v1/cards';

export const fetchCards = async (): Promise<Card[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data.cards;
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw error;
    }
};

export const fetchCardById = async (id: string): Promise<Card> => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data.card;
    } catch (error) {
        console.error(`Error fetching card with id ${id}:`, error);
        throw error;
    }
};

export const addCardToCollection = (collection: Card[], card: Card): Card[] => {
    return [...collection, card];
};

export const deleteCardFromCollection = (collection: Card[], cardId: string): Card[] => {
    return collection.filter(card => card.id !== cardId);
};

export const updateCollectionName = (collection: Collection, newName: string): Collection => {
    return { ...collection, name: newName };
};