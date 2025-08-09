//css file
import '../../CSS_files/navbar.css';

export const NavbarGuest = () => {

    return (
        <nav className="navbar navbar-light navbar_color">
            {store.token ? <NavbarUser />
                :
                <div className="container-fluid">
                    {location.pathname === "/" || location.pathname === "/contact" ?
                        <div className="order-1 m-2 d-flex justify-content-between navbar_tabs">
                            <Link to="/">
                                <img src={TasketLogo} alt="Logo" className="logo_navbar m-2 p-2 order-1" />
                            </Link>
                            <button type="button"
                                className="btn d-sm-none order-2"
                                onClick={() => navigate("/contact")}>
                                <FontAwesomeIcon icon={faCircleQuestion} className="icon_faq" />
                            </button>
                        </div>
                        :
                        <div className="order-1 m-2 d-flex justify-content-between navbar_guest">
                            <Link to="/">
                                <img src={TasketLogo} alt="Logo" className="logo_navbar m-2 p-2 order-1" />
                            </Link>
                            <button type="button"
                                className="btn d-sm-none order-2"
                                onClick={() => navigate("/contact-us")}>
                                <FontAwesomeIcon icon={faCircleQuestion} className="icon_faq" />
                            </button>
                        </div>}
                    {location.pathname === "/reset-password/:token" ||
                        location.pathname === "/forgot-password" ||
                        location.pathname === "/signup" ||
                        location.pathname === "/login" ||
                        location.pathname === "/faq" ?
                        (null)
                        :
                        (<ul className="nav justify-content-center align-self-end mx-auto px-1 order-sm-2 order-3">
                            <li className="nav-item">
                                <a className={`nav-link pb-0 ${location.pathname === "/" ?
                                    "active text_tabs_active"
                                    :
                                    "text_tabs"}`}
                                    aria-current="page"
                                    href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link pb-0 ${location.pathname === "/my-lists" ?
                                    "active text_tabs_active"
                                    :
                                    "text_tabs"}`}
                                    aria-current="page"
                                    href="/my-lists">My Lists</a>
                            </li>
                            <PopOver>
                                <li className="nav-item">
                                    <a className={`nav-link pb-0 ${location.pathname === "/my-budget" ?
                                        "active text_tabs_active"
                                        :
                                        "disabled text_tabs"}`}
                                        aria-current="page"
                                        tabIndex="-1"
                                        aria-disabled="true">Budget</a>
                                </li>
                            </PopOver>

                        </ul>)}
                    {location.pathname === "/" || location.pathname === "/contact" ?
                        <button type="button"
                            className="btn d-none d-sm-block order-sm-3 order-2"
                            onClick={() => navigate("/contact-us")}>
                            <FontAwesomeIcon icon={faCircleQuestion} className="icon_faq" />
                        </button>
                        :
                        <>
                            <div className="d-flex order-sm-2 order-3 mx-auto mx-sm-0 ms-sm-auto">
                                {location.pathname === "/reset-password/:token" || location.pathname === "/forgot-password" ?
                                    (<ul className="nav justify-content-center align-self-end px-1">
                                        <li className="nav-item">
                                            <a className={`nav-link pb-0 me-3 ${location.pathname === "/signup" ?
                                                "active text_tabs_active"
                                                :
                                                "text_tabs"}`}
                                                aria-current="page"
                                                href="/signup">Sign Up</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link pb-0 me-3 ${location.pathname === "/login" ?
                                                "active text_tabs_active"
                                                :
                                                "text_tabs"}`}
                                                aria-current="page"
                                                href="/login">Log In</a>
                                        </li>
                                    </ul>)
                                    :

                                    (<ul className="nav justify-content-center align-self-end px-1">
                                        <li className="nav-item">
                                            <a className={`nav-link pb-0 me-3 ${location.pathname === "/" ?
                                                "active text_tabs_active"
                                                :
                                                "text_tabs"}`}
                                                aria-current="page"
                                                href="/">Home</a>
                                        </li>

                                        {location.pathname === "/signup" ?
                                            (<li className="nav-item">
                                                <a className={`nav-link pb-0 me-4 ${location.pathname === "/login" ?
                                                    "active text_tabs_active"
                                                    :
                                                    "text_tabs"}`}
                                                    aria-current="page"
                                                    href="/login">Log In</a>
                                            </li>)
                                            :
                                            (<li className="nav-item">
                                                <a className={`nav-link pb-0 ${location.pathname === "/signup" ?
                                                    "active text_tabs_active"
                                                    :
                                                    "text_tabs"}`}
                                                    aria-current="page"
                                                    href="/signup">Sign Up</a>
                                            </li>)}

                                    </ul>)
                                }
                            </div>
                            <button type="button"
                                className="btn d-none d-sm-block order-sm-3 order-2"
                                onClick={() => navigate("/contact-us")}>
                                <FontAwesomeIcon icon={faCircleQuestion} className="icon_faq" />
                            </button>
                        </>}
                </div>}
        </nav >
    );
};