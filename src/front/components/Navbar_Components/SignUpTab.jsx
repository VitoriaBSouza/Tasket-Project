//css file
import '../../CSS_files/navbar.css';

import { useLocation } from "react-router-dom";

export const SignUpTab = () => {

    const location = useLocation();

    return (
        <li className="nav-item align-self-end">
            <a className={`nav-link mb-0 pb-0 ${location.pathname === "/signup" ?
                "active text_tabs_active"
                :
                "text_tabs ms-2"}`}
                aria-current="page"
                href="/signup">Sign Up</a>
        </li>
    );
}