const Filter = ({ search, setSearch }) => {
    return (
        <div>
            Filter shown with: <input value={search} onChange={e => setSearch(e.target.value)} /> 
        </div>
    );
}

export default Filter;