function AlertasInfo({title, description, hour}) {
    return(
        <div>
            <span className="d-block small text-end" style={{fontSize: 12, marginTop: -9.00}}>{hour}</span>
            <div className="row">
                <div className="col-md-6">
                    <p className="fw-bold fs-3">{title}<i class="fs-5 px-2 bi bi-exclamation-triangle"></i></p>
                </div>
                <div className="col-md-6">
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
};
export default AlertasInfo;

