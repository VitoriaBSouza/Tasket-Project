//css file
import '../../CSS_files/myLists.css';

export const CreateBtn = () => {

    return (
        <div className="col-12 col-md-3 d-flex justify-content-end me-3">
            
            <button type="button" 
            className="btn btn-warning rounded-pill create_btn p-3" 
            data-bs-toggle="modal" 
            data-bs-target="#crateBtnModal" 
            data-bs-whatever="@mdo">
                Create List
            </button>
        
            <div className="modal fade" id="crateBtnModal" tabIndex="-1" aria-labelledby="createBtnModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content modal_bg">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold fs-3 title_modal" id="createBtnModalLabel">New List</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label fs-5">Title:</label>
                                    <input type="text" className="form-control fs-5" id="recipient-name"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label fs-5">Description:</label>
                                    <input type="text" className="form-control fs-5" id="recipient-name"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button 
                            type="button" 
                            className="btn btn-outline-danger border-2 fs-5 fw-bold" 
                            data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn_create fs-5">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}