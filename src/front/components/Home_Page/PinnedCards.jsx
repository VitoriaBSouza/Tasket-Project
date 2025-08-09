//assets
import PinnedCard from "../../assets/img/Pinned_card.png";

export const PinnedCards = (props) => {

    return (
        <div className="card postit-card m-2">
            <h3 className="card-title urgent_card_title">{props.title}</h3>
            <p className="card-subtitle urgent_card_text">{props.description}</p>
        </div>
    );
}