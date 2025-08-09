
//css file
import '../../CSS_files/guestHome.css';

//assets
import Tasket_img_1 from "../../assets/img/Tasket_img_1.png";
import Tasket_img_2 from "../../assets/img/Tasket_img_2.png";
import Tasket_img_3 from "../../assets/img/Tasket_img_3.png";

export const Features = () => {

    return (
        <div className="container-fluid mx-auto">
            <div className="row mx-auto">
                <div className="col-12">
                    <h2 className="ms-2 my-4 title_features">Features</h2>
                    <div className="scroll-container d-flex p-3 ps-4 gap-2 overflow-auto">
                        
                        <div className="card text-white m-2 tasket_cards_features position-relative">
                            <img
                                src={Tasket_img_1}
                                className="card-img h-100 object-fit-cover img_features"
                                alt="Features_1"
                            />

                            <div className="position-absolute bottom-0 w-100 card_title_features mb-4">
                                <h5 className="card-title mb-0 text-truncate px-2 fw-bold">
                                    Easy task creation
                                </h5>
                            </div>
                        </div>

                        <div className="card text-white m-2 tasket_cards_features position-relative">
                            <img
                                src={Tasket_img_2}
                                className="card-img h-100 object-fit-cover img_features"
                                alt="Features_2"
                            />

                            <div className="position-absolute bottom-0 w-100 card_title_features mb-4">
                                <h5 className="card-title mb-0 text-truncate px-2 fw-bold">
                                    Track your progress
                                </h5>
                            </div>
                        </div>

                        <div className="card text-white m-2 tasket_cards_features position-relative">
                            <img
                                src={Tasket_img_3}
                                className="card-img h-100 object-fit-cover img_features"
                                alt="Features_3"
                            />

                            <div className="position-absolute bottom-0 w-100 card_title_features mb-4">
                                <h5 className="card-title mb-0 text-truncate px-2 fw-bold">
                                    Organize with priorities
                                </h5>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}