

export const Hero = () => {

    return (
        <div className="container-fluid px-4 py-5 my-5 text-center">

            <div className="row">
                <img className="d-block mx-auto mb-4" src="..." alt="" />
                <p className="display-5 fw-bold fs-1">
                    Welcome to Tasket
                </p>
                <div className="col-6 mx-auto">
                    <p className="fs-3">Manage tasks smarter, not harder</p>
                    <div className=" d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <button type="button" className="btn btn-outline-dark border-2 btn-light btn-sm px-4 gap-3">
                            Sign Up
                        </button>
                        <button type="button" className="btn btn-dark btn-sm px-4">
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}