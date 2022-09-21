import React from 'react';
import './index.scss';
import data from './assets/data.json';
const pagination = [1, 2, 3];

function Collection({ name, photos }) {
  return (
    <div className="collection">
      <img className="collection__big" src={photos[0]} alt="Item" />
      <div className="collection__bottom">
        {photos.map(
          (img) => img !== photos[0] && <img className="collection__mini" src={img} alt="Item" />,
        )}
      </div>
      <h4>{name}</h4>
    </div>
  );
}

function App() {
  const [category, setCategory] = React.useState('Все');
  const onChangeCategory = (cat) => {
    setCategory(cat);
  };

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {data.categories.map((cat) => (
            <li
              key={cat}
              onClick={() => onChangeCategory(cat)}
              className={category === cat ? 'active' : ''}>
              {cat.name}
            </li>
          ))}
        </ul>
        <input className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {data.collections.map((obj) => (
          <Collection {...obj} />
        ))}
      </div>
      <ul className="pagination">
        {pagination.map((p) => (
          <li className={p === Math.round(pagination.length / 2) ? 'active' : ''}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
