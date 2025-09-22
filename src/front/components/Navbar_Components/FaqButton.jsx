//css file
import '../../CSS_files/navbar.css';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

export const FaqButton = () => {


    return (
        <li className="nav-item mx-2 pb-1 mt-3">
            <a className="nav-link mb-0 pb-0 ms-1" aria-current="page" href="/faq">
                <FontAwesomeIcon icon={faCircleQuestion} className="icon_faq" />
            </a>
        </li>
    );
}