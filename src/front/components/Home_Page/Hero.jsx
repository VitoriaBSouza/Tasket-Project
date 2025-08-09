import { useNavigate } from "react-router-dom";

//css file
import '../../CSS_files/guestHome.css';

//assets
import TasketHero from "../../assets/img/TasketHero.jpg";


export const Hero = () => {

    const navigate = useNavigate();

    return (
        <div className="container-fluid px-0 position-relative text-center hero_container mx-auto">
            <img
                src={TasketHero}
                alt="Hero"
                className="w-100 hero_image"
            />

            <div className="position-absolute top-50 start-50 translate-middle text_overlay">
                <h1 className="display-5 title_hero mb-3">
                    Welcome to <span className="ms-2"> Tasket</span>
                </h1>
                <p className="fs-3 fw-bold mb-4 lh-sm">
                    Your rhythm. Your priorities. Tasked to perfection.
                </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <button type="button"
                        className="btn btn_signUp_hero btn-sm px-4 fw-bold"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </button>
                    <button type="button" 
                    className="btn btn_logIn_hero btn-sm px-4 fw-bold"
                    onClick={() => navigate("/login")}>
                        Log In
                    </button>
                </div>
            </div>
        </div>

    );
}