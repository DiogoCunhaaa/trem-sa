function RectanglePartInfo({ title, horario, data, corTexto, icone, display, description, align}) {
    return (
        <div className={`${align} m-2`}>
            <h1 className="fs-5 fw-bold" style={{ color: corTexto }}>{title}</h1>
            <p className="mb-2">{description}</p>
            <p className="mb-2">{horario} {icone}</p>
            <p className="mb-2">{data}</p>
            <i className="bi bi-train-front" style={{display: display}}></i>
        </div>
    );
}

export default RectanglePartInfo;