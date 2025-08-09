//assets
import TaskCard from "../../assets/img/Task_card.png";

export const UrgentCards = (props) => {

    return (
        <div className="card postit-card m-2">
            <h3 className="card-title my-2 mb-3 urgent_card_title">{props.title}</h3>
            <h5 className="card-subtitle my-2 urgent_card_text">{props.task}</h5>
        </div>
    );
}