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
			{store.token ? <NavbarUser />
				:
				<div className="container-fluid">
					{location.pathname === "/" ?
						<div className="order-1 m-2 d-flex justify-content-between navbar_tabs">
							<Link to="/">
								<img src={TasketLogo} alt="Logo" className="logo_navbar m-2 p-2 order-1" />
							</Link>
							<button type="button"
								className="btn d-sm-none order-2"
								onClick={() => navigate("/contact-us")}>
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
						location.pathname === "/login" ?
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
					{location.pathname === "/" ?
						<button type="button"
							className="btn d-none d-sm-block order-sm-3 order-2"
							onClick={() => navigate("/contact-us")}>
							<FontAwesomeIcon icon={faCircleQuestion} className="icon_faq" />
						</button>
						:
						<>
							<NavbarGuest />
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