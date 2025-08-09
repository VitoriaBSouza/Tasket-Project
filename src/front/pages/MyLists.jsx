import { CreateBtn } from "../components/MyLists_Components/createBtn";
import { SearchBar } from "../components/MyLists_Components/SearchBar";

export const MyLists = () => {

    return (
        <div className="container-fluid bg_page">
            <div className="row py-5">
                <div className="col-12 col-md-8 mb-3 mb-md-0 d-flex justify-content-center">
                    <SearchBar />
                </div>
                <CreateBtn />
            </div>
            <div className="row">
                <div className="col-6">COL1</div>
                <div className="col-6">COL2</div>
            </div>

        </div>
    );
}