//components
import { Hero } from "../components/Home_Page/Hero.jsx";
import { Demonstration } from "../components/Home_Page/Demonstration.jsx";
import { Features } from "../components/Home_Page/Features.jsx";

export const GuestPage = () => {

    return (
        <div className="container-fluid p-0 mx-auto">
            <Hero />
            <Demonstration />
            <Features />
        </div>
    );
}