function Paginator(props) {
    return (
      <nav>
      {props.pageNumbers.map(number => 
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

export default Paginator;
