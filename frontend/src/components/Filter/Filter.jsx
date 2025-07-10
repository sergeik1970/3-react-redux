import { useDispatch, useSelector } from "react-redux";
import { setTitleFilter, selectTitleFilter, resetFilters } from "../../redux/slices/filterSlice";

import "./Filter.css";

const Filter = () => {
    const dispatch = useDispatch();
    const titleFilter = useSelector(selectTitleFilter);

    const handleTitleFilterChange = (event) => {
        dispatch(setTitleFilter(event.target.value))
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
            </div>
            <button type="button" onClick={handleResetFilters}>Reset Filters</button>
        </div>
    )
}

export default Filter;