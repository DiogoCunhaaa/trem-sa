function RectanglePartInfo({ title, horario, data, corTexto, icone }) {
    return (
        <div>
            <h1 className="fs-5 fw-bold" style={{ color: corTexto }}>{title}</h1>
            <p className="mb-2">{horario} {icone}</p>
            <p className="mb-2">{data}</p>
            <i className="bi bi-train-front"></i>
        </div>
    );
}

export default RectanglePartInfo;
