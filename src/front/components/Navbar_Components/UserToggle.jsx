//css file
import '../../CSS_files/navbar.css';

import { useNavigate } from "react-router-dom";

//hooks
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";


export const UserToggle = () => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'logout' })
        navigate('/')
    }


    return (
        <li className="nav-item dropdow order-2">
            <a className="nav-link"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >
                <img
                    src={store.user?.photo_url}
                    alt="User"
                    className="user_img"
                    style={{ cursor: 'pointer' }}
                />
            </a>
            <ul className="dropdown-menu dropdown-menu-end user_menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a className="dropdown-item user_menu_items" href="/my-profile">My Profile</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item logout_btn" onClick={handleLogout}>Log Out</a></li>
            </ul>
        </li>

    );
};