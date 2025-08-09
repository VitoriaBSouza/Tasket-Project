
//css file
import '../../CSS_files/guestHome.css';

export const Demonstration = () => {

    return (
        <div className="container-fluid mt-4">
            <div className="row mx-auto">
                <div className="col-12 my-4">
                    <div className="scroll-container d-flex p-3">
                        <div className="card bg-dark text-white m-2 tasket_cards">
                            <img src="https://picsum.photos/400/300?random=1" 
                            className="card-img" alt="Tasket_img_1"/>
                                <div className="card-img-overlay">
                                    <h5 className="card-title">Card title</h5>
                                </div>
                        </div>
                        <div className="card bg-dark text-white m-2 tasket_cards">
                            <img src="https://picsum.photos/400/300?random=2" 
                            className="card-img" alt="Tasket_img_2"/>
                                <div className="card-img-overlay">
                                    <h5 className="card-title">Card title</h5>
                                </div>
                        </div>
                        <div className="card bg-dark text-white m-2 tasket_cards">
                            <img src="https://picsum.photos/400/300?random=3" 
                            className="card-img" alt="Tasket_img_3"/>
                                <div className="card-img-overlay">
                                    <h5 className="card-title">Card title</h5>
                                </div>
                        </div>
                        <div className="card bg-dark text-white m-2 tasket_cards">
                            <img src="https://picsum.photos/400/300?random=4" 
                            className="card-img" alt="Tasket_img_4"/>
                                <div className="card-img-overlay">
                                    <h5 className="card-title">Card title</h5>
                                </div>
                        </div>
                        <div className="card bg-dark text-white m-2 tasket_cards">
                            <img src="https://picsum.photos/400/300?random=5" 
                            className="card-img" alt="Tasket_img_5"/>
                                <div className="card-img-overlay">
                                    <h5 className="card-title">Card title</h5>
                                </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}