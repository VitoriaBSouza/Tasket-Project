import { useNavigate } from "react-router-dom";

//hooks
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

export const NavbarUser = () => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'logout' })
        navigate('/')
    }


    return (
        <div className="d-flex">
            <button type="button"
                className="btn"
                onClick={() => navigate("/contact-us")}>
                <FontAwesomeIcon icon={faCircleQuestion} className="icon_faq" />
            </button>
            <div className="btn-group border-0">
                <button
                    type="button"
                    className="btn rounded-circle nav_user_btn border-0"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                >
                    <img
                        src={store.user?.photo_url}
                        alt="User"
                        className="user_img"
                        style={{ cursor: 'pointer' }}
                    />
                </button>
                <ul className="dropdown-menu dropdown-menu-end nav_drop p-2">
                    <li><a className="dropdown-item fs-5" href="/profile">My profile</a></li>
                    <li><a className="dropdown-item fs-5" href="/your-collection">Settings</a></li>
                    <li><hr className="dropdown-divider mx-2" /></li>
                    <li className="dropdown-item fs-5 logout_btn" onClick={handleLogout}>Log Out</li>
                </ul>
            </div>
        </div>

    );
};