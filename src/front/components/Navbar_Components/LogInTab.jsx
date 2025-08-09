//css file
import '../../CSS_files/navbar.css';

import { useLocation } from "react-router-dom";

export const LogInTab = () => {

    const location = useLocation();

    return (
        <li className="nav-item align-self-end">
            <a className={`nav-link mb-0 pb-0 ${location.pathname === "/login" ?
                "active text_tabs_active"
                :
                "text_tabs"}`}
                aria-current="page"
                href="/login">Log In</a>
        </li>
    );
}