//assets
import PinnedCard from "../../assets/img/Pinned_card.png";

export const PinnedCards = (props) => {

    return (
        <div className="card pinned_cards border-0">
            <img src={PinnedCard} className="card-img" alt="list_default_img" />
            <div className="card-img-overlay mt- ms-3">
                <h3 className="card-title mt-5 ms-5">{props.title}</h3>
                <p className="card-subtitle mt-2 ms-5 fs-5">{props.description}</p>
            </div>
        </div>
    );
}