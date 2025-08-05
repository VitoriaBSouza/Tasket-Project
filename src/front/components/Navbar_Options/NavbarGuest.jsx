
export const NavbarGuest = () => {

    return (
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
    );
};