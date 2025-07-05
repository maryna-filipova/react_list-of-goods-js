import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const getPreparedGoods = (goods, sortField) => {
  const prepGoods = [...goods];

  switch (sortField) {
    case 'is-info':
      return prepGoods.sort((a, b) => a.localeCompare(b));
    case 'is-success':
      return prepGoods.sort((a, b) => a.length - b.length);
    default:
      return prepGoods;
  }
};

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const isOriginalOrder = sortType === '' && !isReversed;

  const updateGoods = (newSortType = sortType, newIsReversed = isReversed) => {
    const sorted = getPreparedGoods([...goodsFromServer], newSortType);

    if (newIsReversed) {
      sorted.reverse();
    }

    setGoods(sorted);
  };

  const handleSort = newSortType => {
    setSortType(newSortType);
    updateGoods(newSortType, isReversed);
  };

  const handleReverse = () => {
    const newIsReversed = !isReversed;

    setIsReversed(newIsReversed);
    updateGoods(sortType, newIsReversed);
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSort('is-info')}
          type="button"
          className={`button is-info ${sortType !== 'is-info' ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSort('is-success')}
          type="button"
          className={`button is-success ${sortType !== 'is-success' ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
