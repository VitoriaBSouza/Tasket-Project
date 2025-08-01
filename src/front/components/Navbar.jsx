import { Link, useLocation } from "react-router-dom";

//assets
import TasketLogo from "../assets/img/TasketLogo.png";

//hooks
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

//components
import { NavbarGuest } from "./Navbar_Options/NavbarGuest";
import { NavbarUser } from "./Navbar_Options/NavbarUser.jsx";
import { PopOver } from "./popOver.jsx";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();
	const location = useLocation();

	console.log(store.token);


	return (
		<nav className="navbar navbar-light navbar_color">
			<div className="container-fluid">
				<Link to="/">
					<img src={TasketLogo} alt="Logo" className="logo_navbar ms-2" />
				</Link>
				{location.pathname === "/reset-password/:token" ||
					location.pathname === "/forgot-password" ||
					location.pathname === "/signup" ||
					location.pathname === "/login" ?
					(null)
					:
					(<ul className="nav justify-content-center align-self-end mx-auto px-1">
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
				{store.token ? <NavbarUser /> : location.pathname === "/" ?

					<button type="button"
						className="btn"
						onClick={() => navigate("/contact-us")}>
						<FontAwesomeIcon icon={faCircleQuestion} className="icon_faq" />
					</button>
					:

					<NavbarGuest />}
			</div>
		</nav >
	);
};