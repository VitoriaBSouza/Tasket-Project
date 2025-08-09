import emailjs from "@emailjs/browser";
import { useState, useEffect } from "react";

//hooks
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";

//services
import { showError, showSuccess } from "../services/toastService.js";

//Defined guestEmail function here to only render once not every change of status.
//This also helps to save memory and process space
//The funtion assigns an email to the guests so we can track if a report is duplicate or sent by different people
//Same guest wil have same email even after page is refreshed
const getGuestEmail = () => {

    //saved email on localStorage so it does not change
	const savedEmail = localStorage.getItem("guest_email");
	if (savedEmail) return savedEmail;

    //generates emails for guests based of combination with basic counting
	const count = parseInt(localStorage.getItem("guest_report_count") || "0", 10) + 1;
	localStorage.setItem("guest_report_count", count);

	const email = `guest${count}@tasket.com`;
	localStorage.setItem("guest_email", email);
	return email;
};

export const ReportButton = () => {

    const { store, dispatch } = useGlobalReducer();
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        //we save on localStorage the time when was sent the last Report
        //this way we avoid multiple spamming
        const last = parseInt(localStorage.getItem("guest_last_report_time") || "0", 10);
        const now = Date.now();
        const wait = 300000;

        //report button will be disable if last time the bug was reported in less than 5 minute
        if (now - last < wait) {
            setIsDisabled(true);
            const remaining = wait - (now - last);
            const timeout = setTimeout(() => setIsDisabled(false), remaining);
            return () => clearTimeout(timeout);
        }
    }, []);

    const handleReport = () => {
        const serviceId = "service_lnepl18";
        const templateId = "template_sl16y2k";
        const publicKey = "xB0dYsu5WUS_RKsmb";

        const userEmail = store.user?.email || getGuestEmail();

        const templateParams = {
            subject: "Contact form not working!",
            email: userEmail,
            time: new Date().toLocaleString(),
            message: `User could not send the contact form.\nEmail: ${userEmail}\nTime: ${new Date().toLocaleString()}`
        };

        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then(() => {
                showSuccess("Bug has been reported. Please wait for us to solve it.");
                localStorage.setItem("guest_last_report_time", Date.now().toString());
                setIsDisabled(true);
                setTimeout(() => setIsDisabled(false), 60000); // 60 sec wait before they can report again
            })
            .catch(() => {
                showError("Error sending report. Please try again.");
            });
    };

    return (
        <button
            className="btn rounded-pill report_btn py-3 fs-6"
            type="button"
            onClick={handleReport}
            disabled={isDisabled}
        >
            Report Bug
        </button>
    );
}