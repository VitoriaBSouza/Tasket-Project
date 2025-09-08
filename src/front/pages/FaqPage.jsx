import { useState } from 'react';
import { Link } from "react-router-dom";

//Components
import { ContactButton } from "../components/Contact_Page/ContactButton";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

export const FaqPage = () => {

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open6, setOpen6] = useState(false);
    const [open7, setOpen7] = useState(false);
    const [open8, setOpen8] = useState(false);

    return (
        <div className="container-fluid pb-5">
            <h1 className="m-5 p-3 p-md-5 title_policy text-center text-md-start lh-sm">
                Frequently Asked Questions
            </h1>
            <div className="card m-5 w-75 mx-auto">
                <div className="card-header fw-bold fs-4 lh-1 p-4 d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#cardContent1"
                    onClick={() => setOpen1(!open1)}>
                    <p>1. Is my data private?</p>
                    {open1 ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </div>
                <div id="cardContent1" className="collapse">
                    <div className="card-body fs-4">
                        <p className='my-3 m-1 lh-sm'>
                            Yes. Only you can see your tasks and lists. We don’t share or sell your data.
                            <br />
                            <br />
                            See our <Link to={"/privacy-policy"}>Privacy Policy</Link> for more details.
                        </p>
                    </div>
                </div>
            </div>

            <div className="card m-5 w-75 mx-auto">
                <div className="card-header fw-bold fs-4 lh-1 p-4 d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#cardContent2"
                    onClick={() => setOpen2(!open2)}>
                    <p>2. Do I need an account to use the app?</p>
                    {open2 ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </div>
                <div id="cardContent2" className="collapse">
                    <div className="card-body fs-4">
                        <p className='my-3 m-1 lh-sm'>You can browse some parts of the app without an account,
                            but to create and save tasks, you’ll need to register.
                        </p>
                    </div>
                </div>
            </div>

            <div className="card m-5 w-75 mx-auto">
                <div className="card-header fw-bold fs-4 lh-1 p-4 d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#cardContent3"
                    onClick={() => setOpen3(!open3)}>
                    <p>3. Can I edit or delete tasks?</p>
                    {open3 ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </div>
                <div id="cardContent3" className="collapse">
                    <div className="card-body fs-4">
                        <p className='my-3 m-1 lh-sm'>
                            Yes. You can edit, mark as complete, or delete any of your tasks at any time.
                        </p>
                    </div>
                </div>
            </div>

            <div className="card m-5 w-75 mx-auto">
                <div className="card-header fw-bold fs-4 lh-1 p-4 d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#cardContent4"
                    onClick={() => setOpen4(!open4)}>
                    <p>4. How do I delete my account?</p>
                    {open4 ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </div>
                <div id="cardContent4" className="collapse">
                    <div className="card-body fs-4">
                        <p className='my-3 m-1 lh-sm'>
                            Go to your profile settings and click “Delete Account.”
                            This will permanently remove your data.
                        </p>
                    </div>
                </div>
            </div>

            <div className="card m-5 w-75 mx-auto">
                <div className="card-header fw-bold fs-4 lh-1 p-4 d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#cardContent5"
                    onClick={() => setOpen5(!open5)}>
                    <p>5. What happens if I forget my password?</p>
                    {open5 ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </div>
                <div id="cardContent5" className="collapse">
                    <div className="card-body fs-4">
                        <p className='my-3 m-1 lh-sm'>
                            Use the “Forgot password?” link on the login or signup page to reset it.
                        </p>
                    </div>
                </div>
            </div>

            <div className="card m-5 w-75 mx-auto">
                <div className="card-header fw-bold fs-4 lh-1 p-4 d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#cardContent6"
                    onClick={() => setOpen6(!open6)}>
                    <p>6. Is the app free?</p>
                    {open6 ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </div>
                <div id="cardContent6" className="collapse">
                    <div className="card-body fs-4">
                        <p className='my-3 m-1 lh-sm'>
                            Yes, the app is free to use. Some features may be added in the future with optional upgrades.
                        </p>
                    </div>
                </div>
            </div>

            <div className="card m-5 w-75 mx-auto">
                <div className="card-header fw-bold fs-4 lh-1 p-4 d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#cardContent7"
                    onClick={() => setOpen7(!open7)}>
                    <p>7. Can I use the app on mobile?</p>
                    {open6 ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </div>
                <div id="cardContent7" className="collapse">
                    <div className="card-body fs-4">
                        <p className='my-3 m-1 lh-sm'>
                            Yes. The app is fully responsive and works on any mobile browser.
                        </p>
                    </div>
                </div>
            </div>

            <div className="card m-5 w-75 mx-auto">
                <div className="card-header fw-bold fs-4 lh-1 p-4 d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#cardContent8"
                    onClick={() => setOpen8(!open8)}>
                    <p>8. Who can I contact for support?</p>
                    {open6 ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </div>
                <div id="cardContent8" className="collapse">
                    <div className="card-body fs-4">
                        <p className='my-3 m-1 lh-sm'>
                            You can reach out to us through our contact form link below.
                        </p>
                    </div>
                </div>
            </div>

            <div className='d-flex flex-column align-items-center mx-auto mb-5'>
                <p className="text-center fs-4 lh-1 fw-bold fst-italic p-2 py-3">
                    Have any more questions?
                </p>
                <ContactButton />
            </div>

        </div>
    );
}