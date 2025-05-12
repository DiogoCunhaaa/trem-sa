import { useLocation, useNavigate } from "react-router-dom"

function Navbar (props) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a href="#" className="navbar-brand px-3 fs-3" style={{
                color: `${props.corTexto}`
            }}>
                {props.title}
            </a>

            {location.pathname !== '/' && (
                <button
                    className="btn btn-link"
                    onClick={() => navigate(-1)}
                    aria-label="Voltar"
                >
                <i
                    className="bi bi-arrow-left-short fs-1"
                    style={{ color: 'black' }}
                ></i>
                </button>
            )}
        </nav>
    )
}

export default Navbar