import { useNavigate } from "react-router-dom";

//css file
import '../../CSS_files/userHome.css';

export const UrgentCards = (props) => {

    const navigate = useNavigate();

    console.log(props.id);
    

    return (
        <div 
        className="card postit-card m-2"
        onClick={() => navigate(`/list/${props.list_id}/tasks`)}>
            <h3 className="card-title my-2 mb-3 urgent_card_title">{props.title}</h3>
            <h5 className="card-subtitle my-2 urgent_card_text">{props.task}</h5>
        </div>
    );
}