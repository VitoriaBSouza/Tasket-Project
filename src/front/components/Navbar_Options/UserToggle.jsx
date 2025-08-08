import { useNavigate, Link } from "react-router-dom";

//assets
import TasketLogo from "../../assets/img/TasketLogo.png";

//hooks
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

//components
import { PopOver } from "../popOver.jsx";

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
                aria-expanded="false">
                <img
                    src={store.user?.photo_url}
                    alt="User"
                    className="user_img"
                    style={{ cursor: 'pointer' }}
                />
            </a>
            <ul className="dropdown-menu dropdown-menu-end user_menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a className="dropdown-item" href="#">My Profile</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" onClick={handleLogout}>Log Out</a></li>
            </ul>
        </li>

    );
};