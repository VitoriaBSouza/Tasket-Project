import { useState } from "react";
import emailjs from "@emailjs/browser";

export const ContactForm = () => {

    const [formData, setFormData] = useState({
        reason: "",
        fullName: "",
        email: "",
        message: "",
        time: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "message") {
            const wordCount = value.trim().split(/\s+/).length;
            if (wordCount > 200) return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const now = new Date();
        const time = now.toLocaleString();

        const payload = {
            ...formData,
            time
        };

        try {
            await emailjs.send(
                "service_lnepl18",
                "template_e1khdtq",
                payload,
                "xB0dYsu5WUS_RKsmb"
            );
            alert("Message sent!");
            setFormData({ reason: "", fullName: "", email: "", message: "" });
        } catch (err) {
            console.error("Error sending email:", err);
            alert("Error sending message. Try again later.");
        }
    };

    return (
        <div className="row mt-3">
            <div className="col-11 col-md-7 col-lg-6 border border-2 rounded p-4 mb-5 mx-auto">
                <form onSubmit={handleSubmit} className="p-4">
                    <h3 className="pb-4 text-center contact_form_title">Send Us a Message!</h3>
                    <select
                        className="form-select mb-3 fs-6 border-2"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select your reason of contact</option>
                        <option value="Feedback and Suggestions">Feedback and Suggestions</option>
                        <option value="Queries">Queries</option>
                        <option value="Report a bug">Report a bug</option>
                        <option value="Complaints">Complaints</option>
                    </select>

                    <div className="mb-3">
                        <label htmlFor="fullName" className="form-label fs-6">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            className="form-control border-2 py-2 fs-6"
                            id="fullName"
                            onChange={handleChange}
                            value={formData.fullName}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Email1" className="form-label fs-6">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control border-2 py-2 fs-6"
                            id="Email1"
                            onChange={handleChange}
                            value={formData.email}
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="message" className="form-label fs-6">Message</label>
                        <textarea
                            className="form-control border-2"
                            name="message"
                            onChange={handleChange}
                            value={formData.message}
                            required
                            rows={7}
                        />
                        <div className="text-end w-100">
                            <small className="text-muted">
                                {formData.message.trim().split(/\s+/).filter(w => w).length} / 200 words
                            </small>
                        </div>
                    </div>

                    <div className="d-grid gap-2">
                        <button className="btn fs-6 border-0 btn-dark py-3" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
