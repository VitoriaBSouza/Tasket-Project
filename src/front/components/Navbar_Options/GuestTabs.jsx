import { Link, useLocation, useNavigate } from "react-router-dom";

//hooks
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";

//components
import { LogInTab } from "./LogInTab.jsx";
import { SignUpTab } from "./SignUpTab.jsx";
import { FaqButton } from "./faqButton.jsx";

export const GuestTabs = () => {

    const { store, dispatch } = useGlobalReducer();
    const location = useLocation();

    const showTabs =
        location.pathname === "/forgot-password" ||
        location.pathname.startsWith("/reset-password/");

    return (
        <>
            {showTabs ? (
                <ul className="navbar-nav ms-auto">
                    <LogInTab />
                    <SignUpTab />
                    <FaqButton />
                </ul>
            )
                :
                <ul className="navbar-nav ms-auto">
                    {location.pathname === "/login" ?
                    <SignUpTab />
                    :
                    <LogInTab />}
                    <FaqButton />
                </ul>}
        </>



    );
}