function SquarePartInfo({ corTexto, title, description, display, margin, align }) {
    return(
        <div className= {`${margin} ${align}`}>
            <h1 className="fs-5 fw-bold" style={{ color: corTexto }}>{title}</h1>
            <p className="mb-2">{description}</p>
            <i className="bi bi-train-front" style={{display: display}}></i>
        </div>
    )
};

export default SquarePartInfo;