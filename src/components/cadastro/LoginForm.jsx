import { useState } from "react"
import InputField from "./InputField";
import LoginButton from "./LoginButton";
import ForgotPasswordModal from "./ForgotPasswordModal";

function LoginForm() {

    //VALIDACAO DO FORM
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [logado, setLogado] = useState(false);
    const [erro, setErro] = useState('');

    const handleLogin = () =>{
        if (usuario === 'admin' && senha === 'admin') {
            setLogado(true);
            setErro('');
            console.log("Logou com sucesso!!!");
            
        } else {
            setLogado(false);
            setErro("Usuário ou senha incorretos")
            console.log(erro);
            
        }
        console.log(logado)
    }; 

    //MOSTRAR MODAL DO ESQUECI MINHA SENHA
    const [showModal, setShowModal] = useState(false);

    return(
        <div className="container">
            <div className="row mt-2">
                    <InputField 
                    whatFor={'Usuário'}
                    whatValue={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />
            </div>
            <div className="row">
                    <InputField 
                    whatFor={'Senha'}
                    whatValue={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>

            <div className="row">
                <div className="col">
                    <div className="mb-3 form-check mx-3">
                        <input type="checkbox" className="form-check-input" id="rememberMe"/>
                        <label className="form-check-label" htmlFor="rememberMe">Lembrar de Mim</label>
                    </div>
                </div>
                <div className="col text-end">
                    <div className="mb-3 mx-3 ">
                        <button 
                            type="button" 
                            className="btn btn-link p-0"
                            onClick={() => setShowModal(true)}
                            >Esqueci Minha Senha</button>
                    </div>
                </div>
            </div>
            
                <LoginButton 
                    whatFor={'Login'}
                    onLoginClick={handleLogin}
                />

            <ForgotPasswordModal show={showModal} onClose={() => setShowModal(false)} />
        </div>
    )
}

export default LoginForm;