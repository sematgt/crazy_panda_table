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

export default FilterInput;