import { useState } from 'react';
import { Link } from "react-router-dom";

//Components
import { ContactButton } from "../components/Contact_Page/contactButton";
import { FaqCard } from "../components/Contact_Page/faqCard";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

export const TermServices = () => {

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open6, setOpen6] = useState(false);

    return (
        <div className="container-fluid pb-5">
            <h1 className="m-5 p-3 p-md-5 title_policy text-center text-md-start lh-sm">Terms of Service</h1>
            <div className="card m-5 w-75 mx-auto">
                <div className="card-header fw-bold fs-4 lh-1 p-4 d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#cardContent1"
                    onClick={() => setOpen1(!open1)}>
                    <p>1. Acceptance of Terms</p>
                    {open1 ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </div>
                <div id="cardContent1" className="collapse">
                    <div className="card-body fs-4">
                        <p className='my-3 m-1 lh-sm'>
                            By using this app, you agree to these Terms of Service.
                            If you do not agree, please do not make use of this app.
                        </p>
                    </div>
                </div>
            </div>

            <div className="card m-5 w-75 mx-auto">
                <div className="card-header fw-bold fs-4 lh-1 p-4 d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#cardContent2"
                    onClick={() => setOpen2(!open2)}>
                    <p>2. Use of the App</p>
                    {open2 ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </div>
                <div id="cardContent2" className="collapse">
                    <div className="card-body fs-4">
                        <ul>
                            <li className="my-3 m-1 lh-sm">You are responsible for the content you add (tasks, lists, etc.).</li>
                            <li className="my-3 m-1 lh-sm">Do not use the app for illegal activities or harmful content.</li>
                            <li className="my-3 m-1 lh-sm">We may limit or suspend access if terms are violated.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="card m-5 w-75 mx-auto">
                <div className="card-header fw-bold fs-4 lh-1 p-4 d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#cardContent3"
                    onClick={() => setOpen3(!open3)}>
                    <p>3. Account</p>
                    {open3 ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </div>
                <div id="cardContent3" className="collapse">
                    <div className="card-body fs-4">
                        <ul>
                            <li className="my-3 m-1 lh-sm">You are responsible for keeping your account secure.</li>
                            <li className="my-3 m-1 lh-sm">You may delete your account at any time.</li>
                            <li className="my-3 m-1 lh-sm">We may remove inactive accounts after extended periods.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="card m-5 w-75 mx-auto">
                <div className="card-header fw-bold fs-4 lh-1 p-4 d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#cardContent4"
                    onClick={() => setOpen4(!open4)}>
                    <p>4. Data and Privacy</p>
                    {open4 ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </div>
                <div id="cardContent4" className="collapse">
                    <div className="card-body fs-4">
                        <ul>
                            <li className="my-3 m-1 lh-sm">Your data is private and not shared.</li>
                            <li className="my-3 m-1 lh-sm">
                                Refer to our <Link to={"/privacy-policy"}>Privacy Policy</Link> for full details.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="card m-5 w-75 mx-auto">
                <div className="card-header fw-bold fs-4 lh-1 p-4 d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#cardContent5"
                    onClick={() => setOpen5(!open5)}>
                    <p>5. Availability</p>
                    {open5 ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </div>
                <div id="cardContent5" className="collapse">
                    <div className="card-body fs-4">
                        <ul>
                            <li className="my-3 m-1 lh-sm">We strive to keep the app running smoothly.</li>
                            <li className="my-3 m-1 lh-sm">Downtime or updates may occur without notice.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="card m-5 w-75 mx-auto">
                <div className="card-header fw-bold fs-4 lh-1 p-4 d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#cardContent6"
                    onClick={() => setOpen6(!open6)}>
                    <p>6. Changes to Terms</p>
                    {open6 ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </div>
                <div id="cardContent6" className="collapse">
                    <div className="card-body fs-4">
                        <ul>
                            <li className="my-3 m-1 lh-sm">We strive to keep the app running smoothly.</li>
                            <li className="my-3 m-1 lh-sm">Downtime or updates may occur without notice.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='d-flex flex-column align-items-center mx-auto'>
                <p className="text-center fs-4 lh-1 fw-bold fst-italic p-2 py-3">
                    Have any more questions?
                </p>
                <ContactButton />
            </div>
            <div className='mt-5 w-75 mx-auto'>
                <FaqCard />
            </div>

        </div>
    );
}