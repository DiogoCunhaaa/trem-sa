function Perfil() {

  try {
    const API_URL = 'http://localhost:3333';


  } catch(err) {
    console.error(err);
    alert('Erro ao conectar com o servidor.');
  }

  return (
    <div className="container">
      <div>
        <img
          src="/favicon.ico"
          className="mx-auto d-block shadow-sm rounded-circle"
          alt="icone"
          width="200px"
          height="200px"
        />
      </div>

      <div className="text-center my-3">
        <h4>SEU PERFIL</h4>
      </div>

      <div className="center shadow p-4 mb-3 bg-body rounded d-flex justify-content-between align-items-center">
        <span>Seu nome de usuário é "admin"</span>
        <input
          type="text"
          placeholder="Alterar nome usuário"
          className="form-control w-50"
        />
      </div>

      <div className="center shadow p-4 mb-3 bg-body rounded d-flex justify-content-between align-items-center">
        <span>Seu e-mail é "**m**@gmail.com"</span>
        <input
          type="text"
          placeholder="Alterar email"
          className="form-control w-50"
        />
      </div>

       <div className="center shadow p-4 mb-5 bg-body rounded d-flex justify-content-between align-items-center">
        <span>Sua senha é "*****"</span>
        <input
          type="text"
          placeholder="Alterar senha"
          className="form-control w-50"
        />
      </div>
    </div>
  );
}

export default Perfil;