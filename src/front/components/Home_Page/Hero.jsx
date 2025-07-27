
//assets
import TasketHero from "../../assets/img/TasketHero.jpg";


export const Hero = () => {

    return (
        <div className="container-fluid px-0 position-relative text-center hero-container mx-auto">
            <img
                src={TasketHero}
                alt="Hero"
                className="w-100 hero-image"
            />

            <div className="position-absolute top-50 start-50 translate-middle text-overlay">
                <h1 className="display-5 title_hero mb-3">
                    Welcome to <span>Tasket</span>
                </h1>
                <p className="fs-3 fw-semibold mb-4">
                    Manage tasks smarter, not harder
                </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <button type="button"
                        className="btn btn_signUp_hero btn-sm px-4 fw-bold"
                    >
                        Sign Up
                    </button>
                    <button type="button" className="btn btn_logIn_hero btn-sm px-4 fw-bold">
                        Log In
                    </button>
                </div>
            </div>
        </div>

    );
}