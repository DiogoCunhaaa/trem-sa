import CardAboutUs from "../components/CardAboutUs";

function Sobre() {
    return (
        <div className="container">
            <div className="row mt-3 mb-3">
                <CardAboutUs>
                    <div className="d-flex flex-row align-items-start gap-4 ps-3 shadow-lg rounded h-100 pt-3 pb-3">
                        <div
                            style={{
                                padding: "4px",
                                borderRadius: "8px",
                                background: "linear-gradient(135deg,rgb(255, 255, 255),rgb(78, 78, 78))",
                            }}
                        >
                            <img
                                src="/favicon.ico"
                                className="rounded-3"
                                alt="icone"
                                height="300px"
                                style={{ objectFit: "cover" }}
                            />
                        </div>

                        <div className="flex-grow-1">
                            <h3 className="mb-1"><strong>SambaWare Corporation</strong></h3>
                            <hr className="mt-0 mb-3" style={{ borderTop: "2px solid #555", width: "100%" }} />
                            <p className="fs-5">
                                O front-end do nosso projeto foi programado em react, bootstrap, css. Já o back-end foi programado em node express, devido a alta similaridade com javascript e ao node express ser compatível com react. O projeto foi desenvolvido ao longo do ano com foco em desenvolver nossas habilidades na programação e a incentivar nossa auto-busca pelos conhecimentos necessários.
                            </p>
                            <p className="fs-6 text-muted">
                                Nosso projeto é focado no desenvolvimento web e arduino a partir do ferrorama.
                            </p>
                        </div>
                    </div>
                </CardAboutUs>
            </div>
        </div>
    );
}

export default Sobre;
