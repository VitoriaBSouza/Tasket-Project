import { useNavigate } from "react-router-dom";

export const ContactButton = () => {

    const navigate = useNavigate();

    return (
        <button className="btn rounded-pill contact_btn py-3 fs-3" type="button"
        onClick={() => navigate("/contact")}>
            Contact Us!
        </button>
    );
}