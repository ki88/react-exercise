import {useCallback, useState} from 'react';
import {storage} from '../services/storage';

export const useFavourites = () => {
  const [items, setItems] = useState(storage.get('favorites') || []);

  const update = useCallback((newItems) => {
    setItems(newItems);
    storage.set('favorites', newItems);
  }, []);

  return [
    items,
    update
  ]
};
