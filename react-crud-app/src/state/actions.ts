import { Dispatch } from 'redux';
import { Card, Collection } from '../types';

export const addCard = (collectionId: string, card: Card) => (dispatch: Dispatch) => {
  dispatch({ type: 'ADD_CARD', payload: { collectionId, card } });
};

export const deleteCard = (collectionId: string, cardId: string) => (dispatch: Dispatch) => {
  dispatch({ type: 'DELETE_CARD', payload: { collectionId, cardId } });
};

export const addCollection = (collection: Collection) => (dispatch: Dispatch) => {
  dispatch({ type: 'ADD_COLLECTION', payload: collection });
};

export const deleteCollection = (collectionId: string) => (dispatch: Dispatch) => {
  dispatch({ type: 'DELETE_COLLECTION', payload: { id: collectionId } });
};

export const updateCollectionName = (collectionId: string, newName: string) => (dispatch: Dispatch) => {
  dispatch({ type: 'UPDATE_COLLECTION_NAME', payload: { id: collectionId, name: newName } });
};

export const removeCollection = (collectionId: string) => (dispatch: Dispatch) => {
  dispatch({ type: 'DELETE_COLLECTION', payload: { id: collectionId } });
}

export const setInitialCards = (cards: Card[]) => (dispatch: Dispatch) => {
  dispatch({ type: 'SET_INITIAL_CARDS', payload: cards });
};