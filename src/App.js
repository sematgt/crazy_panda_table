import './App.css';
import todos from './data/todos';
import { useState } from 'react';

function App() {
  const [state, setState] = useState({
    'page': 0,
    'filter': '',
  });

  return (
    <div className="App">
      <table class="table caption-top">
        <caption>Todos page {state.page}</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            {Object.keys(todos[0]).map(key =>
              <th scope="col" key={key}>{key}</th>
              )}
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => 
            <tr key={todo.id}>
              <th scope="row">{todo.id}</th>
                {Object.entries(todo).map(([key, data], index) => 
                  <td key={index}>{data.toString()}</td> // .toString() is used to convert Boolean values to text
                  )}
            </tr>
            )}
        </tbody>
      </table>
      <Paginator></Paginator>
    </div>
  );
}

function Paginator() {
  const itemsCount = todos.length;
  const pagesCount = Math.ceil(itemsCount/50); // 50 is number of items per page 
  const pagesNumbers = Array.from(new Array(pagesCount), (value, index) => index + 1);
  console.log(pagesNumbers)
  return (
    <>
    {pagesNumbers.map(number => 
        <button type="button" class="btn btn-outline-primary" key={number}>{number}</button>
      )}
    </>
  );
}

// function Head(props) {
//   return (
//     {props.rows.map(row => 
//       <Row ></Row>
//     )}
//   )
// }

// function Body(props) {

// }

// function Row(props) {
//   return (
//     <tr>
//       <th scope="row">{props.number}</th>
//       {props.cells.map(cell => 
//         <Cell>{cell}</Cell>
//       )}
//     </tr>
//   )
// }

// function Cell(props) {
//   return (
//     <td>{props.children}</td>
//   )
// }

export default App;
