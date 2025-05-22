import { useLocation, useNavigate } from "react-router-dom"

function Navbar (props) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        navigate(props.to);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#f5f5f5'}}>
            <span
                role="button"
                className="navbar-brand px-3 fs-3 fw-bold"
                style={{ color: props.corTexto, cursor: 'pointer'}}
                onClick={handleClick}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handleClick();
                    }
                }}
            >
                {props.title}
            </span>

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