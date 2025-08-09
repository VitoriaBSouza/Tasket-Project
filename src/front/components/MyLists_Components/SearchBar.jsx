import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

//css file
import '../../CSS_files/myLists.css';

//hooks
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

export const SearchBar = () => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate()
    //grab recipe id from url
    const { id } = useParams()

    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("Title"); // default filter

    const handleFilter = (e) => {
        const searchWord = e.target.value.toLowerCase();
        setSearch(searchWord);

        if (searchWord === "") {
            setFilteredData([]);
        } else {

            //set empty result to store based on the filter used
            let result = [];

            if (filter === 'Title') {
                result = store.recipes?.filter((value) => {
                    return value.title.toLowerCase().includes(searchWord);
                });
            } else if (filter === 'Completed') {
                result = store.recipes?.filter((value) => {
                    return !value.allergens?.some((allergen) =>
                        allergen.toLowerCase().includes(searchWord)
                    );
                });
            } else if (filter === 'Pending') {
                result = store.recipes?.filter((value) => {
                    return value.diet_label?.toLowerCase().includes(searchWord);
                });
            }
            setFilteredData(result);
        }
    }

    const clearInput = () => {
        setFilteredData([])
        setSearch("")
    }

    const handleSearch = (e) => {
        e.preventDefault();

    };

    useEffect(() => {

    }, []);

    return (
        <div className="col-12 col-md-6 position-relative searchBar ms-3">
            <form
                onSubmit={handleSearch}
                className="d-flex align-items-center p-2 rounded-pill border-0 search_box_bg w-100">
                <input
                    className="form-control me-3 p-2 border-0 rounded-pill fs-6 flex-grow-1"
                    value={search}
                    type="search"
                    placeholder={` Search by ${filter}`}
                    onChange={handleFilter}
                    onBlur={() => setTimeout(() => clearInput(), 400)} />
                {search.length === 0 ? null
                    :
                    <button type="button" className="btn-close" aria-label="Close" onClick={clearInput}></button>
                }
                <div className="dropdown border-start ps-2">
                    <button
                        className="btn border-0 dropdown-toggle"
                        type="button"
                        id="filterDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <FontAwesomeIcon icon={faFilter} className="me-1" />
                        <span className="ms-1 text-capitalize fs-6 m-1">{filter}</span>
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="filterDropdown">
                        <li className="m-2">
                            <button className="dropdown-item fs-6" onClick={() => setFilter('Title')}>Title</button>
                        </li>
                        <li className="m-2">
                            <button className="dropdown-item fs-6" onClick={() => setFilter('Completed')}>Completed</button>
                        </li>
                        <li className="m-2">
                            <button className="dropdown-item fs-6" onClick={() => setFilter('Pending')}>Pending</button>
                        </li>
                    </ul>
                </div>

            </form>

            {/* Results from search: will check if there is any match to show mapped data */}
            {filteredData?.length != 0 && (
                <div className="position-absolute bg-white shadow rounded mt-2 searchResult ">

                    {/* we will only show first 10 matches from results to avoid showing too much data */}
                    {filteredData.slice(0, 10).map((value, key) => {
                        return (
                            <Link key={value.id}
                                to={"/recipes/" + value.id}
                                className="dataItem active text-decoration-none fs-6"
                                onClick={() => clearInput}
                            >
                                <p className="ms-3">{value.title} </p>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}