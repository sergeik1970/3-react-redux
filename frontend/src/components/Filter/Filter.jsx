import { useDispatch, useSelector } from "react-redux";
import { 
    setTitleFilter, 
    selectTitleFilter, 
    setAuthorFilter, 
    selectAuthorFilter, 
    setOnlyFavoriteFilter, 
    selectOnlyFavoriteFilter, 
    resetFilters 
} from "../../redux/slices/filterSlice";

import "./Filter.css";

const Filter = () => {
    const dispatch = useDispatch();
    const titleFilter = useSelector(selectTitleFilter);
    const authorFilter = useSelector(selectAuthorFilter);
    const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);

    const handleTitleFilterChange = (event) => {
        dispatch(setTitleFilter(event.target.value))
    }

    const handleAuthorFilterChange = (event) => {
        dispatch(setAuthorFilter(event.target.value))
    }

    const handleOnlyFavoriteFilterChange = () => {
        dispatch(setOnlyFavoriteFilter())
    }

    const handleResetFilters = () => {
        dispatch(resetFilters())
    }
    return (
        <div className="app-block filter">
            <div className="filter-row">
                <div className="filter-group">
                    <input
                        onChange={handleTitleFilterChange}
                        value={titleFilter}
                        type="text"
                        placeholder="Filter by title..." />
                </div>
                <div className="filter-group">
                    <input
                        onChange={handleAuthorFilterChange}
                        value={authorFilter}
                        type="text"
                        placeholder="Filter by author..." />
                </div>
                <div className="filter-group">
                    <label>
                        <input type="checkbox" checked={onlyFavoriteFilter} onChange={handleOnlyFavoriteFilterChange} />
                        Only Favorite
                    </label>
                </div>
            </div>
            <button type="button" onClick={handleResetFilters}>Reset Filters</button>
        </div>
    )
}

export default Filter;