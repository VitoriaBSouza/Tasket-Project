import { useState } from 'react';

//Components
import { ContactButton } from "../components/Contact_Page/contactButton";
import { FaqCard } from "../components/Contact_Page/faqCard";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

export const PrivacyPolicy = () => {

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);

    return (
        <div className="container-fluid pb-5">
            <h1 className="m-5 p-3 p-md-5 title_policy text-center text-md-start">Privacy Policy</h1>
            <div className="card m-5 w-75 mx-auto">
                <div className="card-header fw-bold fs-4 lh-sm p-4 d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#cardContent1"
                    onClick={() => setOpen1(!open1)}>
                    <p>1. What data we collect</p>
                    {open1 ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </div>
                <div id="cardContent1" className="collapse">
                    <div className="card-body fs-4">
                        <ul>
                            <li className="my-3 m-1 lh-sm">Username and email (if you register).</li>
                            <li className="my-3 m-1 lh-sm">Tasks and lists you create (private to you).</li>
                            <li className="my-3 m-1 lh-sm">Anonymous usage statistics.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="card m-5 w-75 mx-auto">
                <div className="card-header fw-bold fs-4 lh-sm p-4 d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#cardContent2"
                    onClick={() => setOpen2(!open2)}>
                    <p>2. How we use your data</p>
                    {open2 ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </div>
                <div id="cardContent2" className="collapse">
                    <div className="card-body fs-4">
                        <ul>
                            <li className="my-3 m-1 lh-sm">To save and manage your tasks.</li>
                            <li className="my-3 m-1 lh-sm">To improve app performance and experience.</li>
                            <li className="my-3 m-1 lh-sm fw-bold">We do not sell or share your data with third parties.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="card m-5 w-75 mx-auto">
                <div className="card-header fw-bold fs-4 lh-sm p-4 d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#cardContent3"
                    onClick={() => setOpen3(!open3)}>
                    <p>3. Cookies</p>
                    {open3 ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </div>
                <div id="cardContent3" className="collapse">
                    <div className="card-body fs-4">
                        <ul>
                            <li className="my-3 m-1 lh-sm">We use cookies to keep you logged in.</li>
                            <li className="my-3 m-1 lh-sm">We do not use tracking or third-party cookies.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="card m-5 w-75 mx-auto">
                <div className="card-header fw-bold fs-4 lh-sm p-4 d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#cardContent4"
                    onClick={() => setOpen4(!open4)}>
                    <p>4. Who can see your data</p>
                    {open4 ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </div>
                <div id="cardContent4" className="collapse">
                    <div className="card-body fs-4">
                        <ul>
                            <li className="my-3 m-1 lh-sm">Only you can see your tasks and lists.</li>
                            <li className="my-3 m-1 lh-sm">No one else has access, except for basic maintenance (if necessary).</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="card m-5 w-75 mx-auto">
                <div className="card-header fw-bold fs-4 lh-sm p-4 d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    data-bs-target="#cardContent5"
                    onClick={() => setOpen5(!open5)}>
                    <p>5. Your rights</p>
                    {open5 ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </div>
                <div id="cardContent5" className="collapse">
                    <div className="card-body fs-4">
                        <ul>
                            <li className="my-3 m-1 lh-sm">You can edit or delete your data anytime.</li>
                            <li className="my-3 m-1 lh-sm">You can delete your account permanently if you choose.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='d-flex flex-column align-items-center mx-auto'>
                <p className="text-center fs-4 lh-sm fw-bold fst-italic p-2 py-3">
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