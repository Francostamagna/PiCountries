import react from "react";
import '../Styles/Paginated.css'

export default function Paginated ({countriesPerPage,display, paginated}){
    const pageNumbers = [1];

    for (let i = 2; i <= Math.ceil(display/countriesPerPage); i++ ){
        pageNumbers.push(i)
    }

    return (
        <nav className="paginatedMain">
            <ul className="paginated">
            { pageNumbers && pageNumbers.map(p =>
            
            <li className="number" key={p}>
                <a onClick={() => paginated(p)}>{p}</a>  
                </li>
            
            
            )}    

            </ul>
        </nav>
    )
}