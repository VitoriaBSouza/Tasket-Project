import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

//css file
import '../CSS_files/navbar.css';

//assets
import TasketLogo from "../assets/img/TasketLogo.png";

//hooks
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


//components
import { UserToggle } from "./Navbar_Components/UserToggle.jsx";
import { PopOver } from "./popOver.jsx";
import { GuestTabs } from "./Navbar_Components/GuestTabs.jsx";
import { FaqButton } from "./Navbar_Components/faqButton.jsx";

export const Navbar = () => {

	const { store } = useGlobalReducer();
	const location = useLocation();

	const showTabs =
		location.pathname === "/signup" ||
		location.pathname === "/login" ||
		location.pathname === "/forgot-password" ||
		location.pathname.startsWith("/reset-password/");

	//will make the toggle collapse close when not on focus
	useEffect(() => {
		const handleClick = (e) => {
			const menu = document.getElementById("navbarNavDropdown");
			const btn = document.querySelector(".navbar-toggler");
			const bsCollapse = bootstrap.Collapse.getInstance(menu);
			if (!bsCollapse) return;
			if (!menu.contains(e.target) && !btn.contains(e.target)) {
				bsCollapse.hide();
			}
		};

		document.addEventListener("click", handleClick);
		return () => document.removeEventListener("click", handleClick);
	}, []);

	return (
		<nav className="navbar navbar-expand-md navbar-light bg-light p-0">
			<div className="container-fluid navbar_color p-2">
				<Link to="/">
					<img src={TasketLogo} alt="Logo" className="logo_navbar order-1" />
				</Link>

				<ul className="navbar-nav flex-row ms-auto me-3 me-md-0 order-2 order-md-3">
					{showTabs ? null : (
						<>
							{location.pathname === "/faq" ?
								null : <FaqButton />}
							{store.token && <UserToggle />}
						</>
					)}
				</ul>

				<button className="navbar-toggler m-0 order-3 order-md-2 border-0 no_outline"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<FontAwesomeIcon icon={faBars} className="fs-1" />
				</button>

				<div className="collapse navbar-collapse order-3 order-md-2 align-self-end" id="navbarNavDropdown">
					{showTabs ?
						(store.token ?
							<UserToggle />
							:
							<GuestTabs />
						)
						:
						(<div className="d-flex flex-grow-1 justify-content-center">
							<ul className="navbar-nav py-3 py-md-0">
								<li className="nav-item">
									<a className={`nav-link ${location.pathname === "/" ?
										"active text_tabs_active"
										:
										"text_tabs"}`}
										aria-current="page"
										href="/">Home</a>
								</li>
								<li className="nav-item">
									<a className={`nav-link mx-3 mx-md-2 ${location.pathname === "/my-lists" ?
										"active text_tabs_active"
										:
										"text_tabs"}`}
										aria-current="page"
										href="/my-lists">My Lists</a>
								</li>
								<PopOver>
									<li className="nav-item">
										<a className={`nav-link ${location.pathname === "/my-budget" ?
											"active text_tabs_active"
											:
											"disabled text_tabs"}`}
											aria-current="page"
											tabIndex="-1"
											aria-disabled="true">Budget</a>
									</li>
								</PopOver>
							</ul>
						</div>)}

				</div>

			</div>
		</nav>
	);
};