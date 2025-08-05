
export const ContactForm = () => {

    return(
        <div className="row">
            <div className="col-11 col-sm-9 col-md-6 col-lg-4 border border-2 rounded p-4 my-2 mx-auto">
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-3">
                        <label htmlFor="Username1" className="form-label fs-5">Username</label>
                        <input type="text"
                            name="username"
                            className="form-control border-2 py-2 fs-5" id="Username1"
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Email1" className="form-label fs-5">Email</label>
                        <input type="email"
                            name="email"
                            className="form-control border-2 py-2 fs-5" id="Email1"
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password1" className="form-label fs-5">Password</label>
                        <input type="password"
                            name="password"
                            className="form-control border-2 py-2 fs-5"
                            id="password1"
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password2" className="form-label fs-5">Repeat password</label>
                        <input type="password"
                            name="repeatPassword"
                            className="form-control border-2 py-2 fs-5"
                            id="password2"
                            onChange={(e) => setRepeatPassword(e.target.value)} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox"
                            className="form-check-input my-2 fs-5 border-2 form_checkbox my-3"
                            id="check1"
                            onChange={(e) => setTermsAccepted(e.target.checked)} />
                        <label className="form-check-label fs-5 my-2" htmlFor="check1">
                            Accept Terms of Service
                        </label>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox"
                            className="form-check-input my-2 fs-5 border-2 form_checkbox my-3"
                            id="check2"
                            onChange={(e) => setPrivacyAccepted(e.target.checked)} />
                        <label className="form-check-label fs-5 my-2" htmlFor="check2">
                            Accept Privacy Policy
                        </label>
                    </div>

                    <div className="d-grid gap-2">
                        <button className="btn fs-5 border-0 signUp_btn py-3" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}