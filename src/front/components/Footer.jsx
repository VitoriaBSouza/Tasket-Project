import { Link } from "react-router-dom";

//css file
import '../CSS_files/footer.css';

//assets
import TasketLogo from "../assets/img/TasketLogo.png";

export const Footer = () => (
	
	<footer className="footer py-3 footer_container py-5">
		<div className="row mx-5 ps-5 ps-md-0">
			<div className="col-12 col-md-8 d-block d-md-flex  
			align-items-center text-center text-md-start lh-1">
				<Link to={"/contact"} className="text-decoration-none footer_links">
					<p className="me-4 me-lg-0">Contact</p>
				</Link>
				<span className="footer_divider">|</span>
				<Link to={"/privacy-policy"} className="text-decoration-none footer_links">
					<p className="me-2 ps-2">Privacy Policy</p>
				</Link>
				<span className="footer_divider">|</span>
				<Link to={"/term-services"} className="text-decoration-none footer_links">
					<p className="ps-2">Terms of Service</p>
				</Link>
			</div>
			<div className="col-12 col-md-4 d-block fs-4 text-center align-items-center">
				<Link to="/">
					<img src={TasketLogo} alt="Logo" className="logo_navbar p-2" />
				</Link>
				<p className="fs-5 lh-1">© 2025 Tasket. All rights reserved.</p>
			</div>
		</div>
	</footer>
);
