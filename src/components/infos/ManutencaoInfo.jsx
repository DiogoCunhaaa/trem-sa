function ManutencaoInfo({ title, msg,  textColor }){

    return(
        <div className={`text-center w-100 ${textColor}`}>
            <h1 className="fs-2 fw-bold">{title}</h1>
            <p>{msg}</p>
        </div>
    )  
};

export default ManutencaoInfo;