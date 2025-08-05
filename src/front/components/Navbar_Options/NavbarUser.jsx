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

export const NavbarUser = () => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'logout' })
        navigate('/')
    }


    return (
        <div className="container-fluid">
            <div className="order-1 m-2 d-flex justify-content-between navbar_tabs w-100 flex-wrap">

                <Link to="/" className="order-1">
                    <img src={TasketLogo} alt="Logo" className="logo_navbar m-2 p-2" />
                </Link>

                <ul className="nav justify-content-center align-self-end mx-auto px-1 order-3 order-sm-2">
                    <li className="nav-item">
                        <Link className={`nav-link pb-0 ${location.pathname === "/" ? "active text_tabs_active" : "text_tabs"}`} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link pb-0 ${location.pathname === "/my-lists" ? "active text_tabs_active" : "text_tabs"}`} to="/my-lists">My Lists</Link>
                    </li>
                    <PopOver>
                        <li className="nav-item">
                            <span className={`nav-link pb-0 ${location.pathname === "/my-budget" ? "active text_tabs_active" : "disabled text_tabs"}`} aria-disabled="true">Budget</span>
                        </li>
                    </PopOver>
                </ul>

                <div className="d-flex order-2 order-sm-2 mx-auto mx-sm-0">
                    <button type="button" className="btn" onClick={() => navigate("/contact-us")}>
                        <FontAwesomeIcon icon={faCircleQuestion} className="icon_faq" />
                    </button>
                    <div className="btn-group border-0">
                        <button
                            type="button"
                            className="btn rounded-circle nav_user_btn border-0"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src={store.user?.photo_url}
                                alt="User"
                                className="user_img"
                                style={{ cursor: 'pointer' }}
                            />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end nav_drop p-2">
                            <li><Link className="dropdown-item fs-5" to="/profile">My profile</Link></li>
                            <li><Link className="dropdown-item fs-5" to="/your-collection">Settings</Link></li>
                            <li><hr className="dropdown-divider mx-2" /></li>
                            <li className="dropdown-item fs-5 logout_btn" onClick={handleLogout}>Log Out</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>

    );
};