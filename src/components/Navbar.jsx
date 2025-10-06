import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./styles/SideBar.module.css";

function Navbar(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    navigate(props.to);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span
          role="button"
          className="navbar-brand m-0 px-3 fs-3 fw-bold"
          style={{ color: props.corTexto, cursor: "pointer" }}
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleClick();
            }
          }}
        >
          {props.title}
        </span>

        {location.pathname !== "/" && (
          <button
            className="btn btn-link p-0"
            onClick={() => navigate(-1)}
            aria-label="Voltar"
          >
            <i
              className="bi bi-arrow-left-short fs-1"
              style={{ color: "black" }}
            ></i>
          </button>
        )}

        {location.pathname === "/" && (
          <div>
            <button
              className={styles.menuBtn}
              onClick={() => setOpen(!open)}
            >
              {open ? "✖" : "☰"}
            </button>

            {open && (
              <div
                className={styles.overlay}
                onClick={() => setOpen(false)}
              />
            )}

            <div className={`${styles.sidebar} ${open ? styles.open : ""}`}>
              <h2>Menu</h2>
              <ul>
                <li><a href="/cadastropage">Cadastrar-se</a></li>
                <li><a href="/loginpage">Login</a></li>
                <li><a href="#">Sensores</a></li>
                <li><a href="#">Trens</a></li>
                <li><a href="#">Usuários</a></li>
                <li><a href="#">Perfil</a></li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
