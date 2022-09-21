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
          (img) =>
            img !== photos[0] && (
              <img className="collection__mini" src={img} alt="Item" key={img} />
            ),
        )}
      </div>
      <h4>{name}</h4>
    </div>
  );
}

function App() {
  const [category, setCategory] = React.useState('Все');
  const [categoryId, setCategoryId] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');
  const onChangeCategory = (cat, id) => {
    setCategory(cat);
    setCategoryId(id);
  };
  const onChangeSearch = (event) => {
    setSearchValue(event.target.value);
  };
  React.useEffect(() => {
    setCategoryId(categoryId);
  }, [categoryId]);
  console.log(categoryId);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {data.categories.map((cat, i) => (
            <li
              key={cat.name}
              onClick={() => onChangeCategory(cat, i)}
              className={category === cat ? 'active' : ''}>
              {cat.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => onChangeSearch(e)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {data.collections
          .filter((obj) => obj.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
          .filter((obj) => (categoryId === 0 ? obj : obj.category === categoryId))
          .map((obj) => (
            <Collection {...obj} key={obj.name} />
          ))}
      </div>
      <ul className="pagination">
        {pagination.map((p) => (
          <li key={p} className={p === Math.round(pagination.length / 2) ? 'active' : ''}>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
