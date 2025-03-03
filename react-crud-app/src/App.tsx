import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CardList from "./components/CardList";
import Collection from "./components/Collection";
import { addCollection } from "./state/actions";
import { RootState } from "./state/store";
import { Collection as CollectionType } from "types";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const collections = useSelector(
    (state: RootState) => state.collectionState.collections,
  );

  const handleAddCollection = () => {
    const newCollectionId = prompt("Enter new collection ID:");
    if (newCollectionId) {
      dispatch(
        addCollection({
          id: newCollectionId,
          name: `Collection ${newCollectionId}`,
          cards: [],
        }),
      );
    }
  };

  return (
    <div className="app container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Magic The Gathering Card Collection
      </h1>

      <div className="app container mx-auto p-4">
        <h2 className="text-2xl font-semibold mt-4 mb-2">Collections</h2>
        <button
          type="button"
          onClick={handleAddCollection}
          className="m-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Add New Collection
        </button>
      </div>
      <div className="container mx-auto p-4">
        {Array.isArray(collections) && collections?.length === 0 ? (
          <div className="container mx-auto p-4">
            <div>No collections found</div>
          </div>
        ) : (
          Array.isArray(collections) &&
          collections?.map((collection: CollectionType) => (
            <Collection key={collection.id} collectionId={collection.id} />
          ))
        )}
        <CardList />
      </div>
    </div>
  );
};

export default App;
