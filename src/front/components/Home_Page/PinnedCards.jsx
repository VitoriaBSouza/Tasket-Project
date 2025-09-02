import { useNavigate } from "react-router-dom";

//css file
import '../../CSS_files/userHome.css';

export const PinnedCards = (props) => {

    const navigate = useNavigate();

    return (
        <div 
        className="card postit-card m-2"
        onClick={() => navigate(`/list/${props.id}/tasks`)}>
            <h3 className="card-title urgent_card_title">{props.title}</h3>
            <p className="card-subtitle urgent_card_text">{props.description}</p>
        </div>
    );
}