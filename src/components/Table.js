import './Table.css';
import todos from '../data/todos';
import { useState } from 'react';
import Paginator from './Paginator';
import FilterInput from './FilterInput';

function Table() {

  // state
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState({
    'column': 'userId',
    'order': 'asc',
  });
  const [items, setItems] = useState(todos);

  // constants and settings
  const columnHeadings = todos[0] ? Object.keys(todos[0]) : ["no headings in data"];
  const itemsPerPage = 50;
  var pageNumbers = getPageNumbers(); // array of page numbers, starts from 1, i.e. [1, 2, 3, 4]

  // handlers  
  function handlePageChange(number) {
    setPage(number);
  }
  
  function handleSort(column, order) {
    setSort({column, order});
    setItems(sortItemsBy(column, order));
  }

  function handleTextFilter(text) {
    pageNumbers = getPageNumbers();
    setPage(1);
    setFilter(text);
    setItems(todos.filter((item => item['title'].includes(text))));
  }

  // helper functions
  function getPageNumbers() {
    const itemsCount = items.length;
    const pagesCount = Math.ceil(itemsCount/itemsPerPage); 
    const pageNumbers = Array.from(new Array(pagesCount), (value, index) => index + 1); 
    return pageNumbers;
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
      <Paginator pageNumbers={pageNumbers} handlePageChange={handlePageChange}></Paginator>
      <FilterInput handleChange={e => handleTextFilter(e.target.value)}></FilterInput>
      <table class="table caption-top">
        <caption>Todos page {page} sorted by {sort.column} {sort.order} {filter !== '' && <span>filtered by {filter}</span>}</caption>
        <thead>
          <tr>
            {columnHeadings.map((key, index) =>
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
          { items[0] 
          ? filterItemsByPage(page).map(todo => 
            <tr key={todo.id}>
                {Object.entries(todo).map(([key, data], index) => 
                  <td key={index}>{data.toString()}</td> // .toString() is used to convert Boolean values to text
                  )}
            </tr>
            )
          : <span>No items</span>
          }
        </tbody>
      </table>   
    </div>
  );
}

export default Table;