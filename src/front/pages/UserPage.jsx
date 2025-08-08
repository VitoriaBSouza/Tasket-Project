//hooks
import { UrgentCards } from "../components/Home_Page/UrgentCards.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const UserPage = () => {

    const { store, dispatch } = useGlobalReducer()


    //will make random number so we can sort urgent tasks and shows some of them to the user
    const getRandomItems = (array, count) => {
        if (!Array.isArray(array)) return [];
        return [...array].sort(() => 0.5 - Math.random()).slice(0, count);
    };

    return(
        <div className="container-fluid p-0 mx-auto">
            <h1 className="text-center my-4">Welcome {store.user?.username} !</h1>
            <div>
                ANALITICS HERE
            </div>
            <div>
                <h2 className="m-4">Urgent Tasks</h2>
                {/* maping over urgent tasks to create cards based on the data */}
                        {getRandomItems(store.lists, 10).map((el) => (
                            <UrgentCards
                                key={el.id}
                                id={el.id}
                                url={el.media?.[0]?.url}
                                title={el.title}
                            />
                        ))}
            </div>
            <div>
                <h2 className="m-4">Lists Pinned</h2>
            </div>
        </div>
    );
}