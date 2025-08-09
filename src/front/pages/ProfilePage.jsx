

export const ProfilePage = () => {

    const { store, dispatch } = useGlobalReducer()

    return(
        <div className="container-fluid">
            <h1>Welcome {store.user?.username}</h1>
        </div>
    );
}