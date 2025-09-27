
export const Pagination = (props) => {

    return (
        <nav aria-label="Page navigation my lists">
            <ul className="pagination justify-content-center m-0 pb-4">
                <li className={`page-item ${props.currentPage === 1 ? "disabled" : ""}`}>
                    <a
                        className="page-link page_item_list_link"
                        href={`?page=${props.currentPage - 1}`}
                        aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {[...Array(props.totalPages)].map((_, i) => (
                    <li key={i} className={`page-item ${props.currentPage === i + 1 ? "page_item_list_link" : ""}`}>
                        <a
                            className="page-link page_item_list_link"
                            href={`?page=${i + 1}`}>{i + 1}</a>
                    </li>
                ))}
                <li className={`page-item ${props.currentPage === props.totalPages ? "disabled" : ""}`}>
                    <a 
                    className="page-link page_item_list_link" 
                    href={`?page=${props.currentPage + 1}`}
                    aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}