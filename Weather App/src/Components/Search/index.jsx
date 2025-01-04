
export default function Search({ search, setSearch, HandleSearch }) {
    return <div className="search-engine">
        <input
            type="text"
            className="city-search"
            placeholder="Enter city name"
            name="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
        />
        <button  onClick={HandleSearch}>Search Weather</button>
    </div>

}