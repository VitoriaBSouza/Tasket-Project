//assets
import TaskCard from "../../assets/img/Task_card.png";

export const UrgentCards = (props) => {

    return (
        <div className="card m-3 urgent_cards border-0">
            <img src={TaskCard} className="card-img" alt="task_default_img" />
            <div className="card-img-overlay mt-4 ms-2">
                <h3 className="card-title mt-5 ms-5">{props.title}</h3>
                <h5 className="card-subtitle mt-1 ms-5">{props.task}</h5>
            </div>
        </div>
    );
}