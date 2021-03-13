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
  const [items, setItems] = useState(filterItemsByPage(page));

  function handlePageChange(number, event) {
    setPage(number);
    setItems(filterItemsByPage(number));
  }

  function filterItemsByPage(number) {
    return todos.filter((todo, index) => index < itemsPerPage * number && index >= itemsPerPage * (number - 1));
  }

  return (
    <div className="App">
      <Paginator pagesNumbers={pagesNumbers} handlePageChange={handlePageChange}></Paginator>
      <table class="table caption-top">
        <caption>Todos page {page}</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            {Object.keys(items[0]).map(key =>
              <th scope="col" key={key}>{key}</th>
              )}
          </tr>
        </thead>
        <tbody>
          {items.map(todo => 
            <tr key={todo.id}>
              <th scope="row">{todo.id}</th>
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
          console.log(e.target.parentNode.children);
          for (let element of e.target.parentNode.children) {
            element.classList.remove('active');
          }
          e.target.classList.add('active');
          props.handlePageChange(number, e);
        }}>{number}</button>
      )}
    </nav>
  );
}

export default App;
