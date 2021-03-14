import './App.css';
import todos from './data/todos';
import { useState } from 'react';

function App() {
  const itemsCount = todos.length;
  const itemsPerPage = 50;
  const pagesCount = Math.ceil(itemsCount/itemsPerPage); 
  const pagesNumbers = Array.from(new Array(pagesCount), (value, index) => index + 1); // array of pages numbers, starts from 1, i.e. [1, 2, 3, 4]

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState({
    'column': 'userId',
    'order': 'asc',
  });
  const [items, setItems] = useState(todos);

  function handlePageChange(number) {
    setPage(number);
  }
  
  function handleSort(column, order) {
    setSort({column, order});
    setItems(sortItemsBy(column, order));
  }

  function handleTextFilter(text) {
    setFilter(text);
    setItems(todos.filter((item => item['title'].includes(text))));
  }

  function filterItemsByPage(number) {
    return items.filter((item, index) => index < itemsPerPage * number && index >= itemsPerPage * (number - 1));
  }

  function sortItemsBy(column, order) {
    if (items.length === 0) return items;
    if (typeof items[0][column] === 'string') {
      return items.slice().sort((a, b) => {
        if (order === 'asc') {
          return a[column] > b[column] ? 1 : -1;
        } else {
          return a[column] < b[column] ? 1 : -1;
        }
      })
    } else {
      return items.slice().sort((a, b) => order === 'asc' ? a[column] - b[column] : b[column] - a[column]);
    }
  }

  return (
    <div className="App">
      <Paginator pagesNumbers={pagesNumbers} handlePageChange={handlePageChange}></Paginator>
      <FilterInput handleChange={e => handleTextFilter(e.target.value)}></FilterInput>
      <table class="table caption-top">
        <caption>Todos page {page} {sort.column} {sort.order}</caption>
        <thead>
          <tr>
            {Object.keys(items[0]).map((key, index) =>
              <th scope="col" key={index}>
                <button type="button" class="btn btn-light" onClick={e => {
                  handleSort(key, sort.order === 'asc' ? 'desc' : 'asc')
                }}>
                  {key}
                </button>
              </th>
              )}
          </tr>
        </thead>
        <tbody>
          {filterItemsByPage(page).map(todo => 
            <tr key={todo.id}>
                {Object.entries(todo).map(([key, data], index) => 
                  <td key={index}>{data.toString()}</td> // .toString() is used to convert Boolean values to text
                  )}
            </tr>
            )}
        </tbody>
      </table>
    </div>
  );
}

function Paginator(props) {
  return (
    <nav>
    {props.pagesNumbers.map(number => 
        <button type="button" class="btn btn-outline-primary" key={number} onClick={e => {
          for (let element of e.target.parentNode.children) {
            element.classList.remove('active');
          }
          e.target.classList.add('active');
          props.handlePageChange(number);
        }}>{number}</button>
      )}
    </nav>
  );
}

function FilterInput(props) {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <label>
        Title search:
        <input type="text" onChange={e => props.handleChange(e)}></input> 
      </label>
    </form>
  )
}

export default App;
