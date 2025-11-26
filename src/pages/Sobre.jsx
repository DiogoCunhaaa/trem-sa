import CardAboutUs from "../components/CardAboutUs";

function Sobre() {
    return (
        <div className="container">
            <div className="row mt-3">
                <CardAboutUs>
                    <div className="d-flex flex-row align-items-start gap-4 ps-3">


                        <div
                            style={{
                                padding: "4px",
                                borderRadius: "8px",
                                background: "linear-gradient(135deg,rgb(255, 255, 255),rgb(78, 78, 78))",
                            }}
                        >
                            <img
                                src="/trio_parada_dura.jpg"
                                className="rounded-3"
                                alt="icone"
                                width="300"
                                height="220"
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <div className="flex-grow-1">
                            <h3 className="mb-1"><strong>SambaWare Corporation</strong></h3>
                            <hr className="mt-0 mb-3" style={{ borderTop: "2px solid #555", width: "97" }} />
                            <p className="fs-5">
                                Nossa equipe é composta por: João, Diogo e Matheus Picolli.
                                Somos estudantes da escola Sesi de Referência e possuímos 18 anos.
                                Atualmente estamos focados em desenvolver esse projeto da SA.
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
