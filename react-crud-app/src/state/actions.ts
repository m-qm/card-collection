import type { Dispatch } from 'redux';
import type { Card, Collection } from '../types';

export const addCard = (collectionId: string, card: Card) => (dispatch: Dispatch) => {
  console.log('Dispatching ADD_CARD action:', { collectionId, card });
  dispatch({ type: 'ADD_CARD', payload: { collectionId, card } });
};

export const deleteCard = (collectionId: string, cardId: string) => (dispatch: Dispatch) => {
  dispatch({ type: 'DELETE_CARD', payload: { collectionId, cardId } });
};

export const addCollection = (collection: Collection) => (dispatch: Dispatch) => {
  console.log('Dispatching ADD_COLLECTION action:', collection);
  dispatch({ type: 'ADD_COLLECTION', payload: collection });
};

export const deleteCollection = (collectionId: string) => (dispatch: Dispatch) => {
  dispatch({ type: 'DELETE_COLLECTION', payload: { id: collectionId } });
};

export const updateCollectionName = (collectionId: string, newName: string) => (dispatch: Dispatch) => {
  dispatch({ type: 'UPDATE_COLLECTION_NAME', payload: { id: collectionId, name: newName } });
};