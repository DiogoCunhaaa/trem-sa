import { useState } from "react"
import InputField from "./InputField";

function LoginForm() {
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
    };

    return(
        <div>
            <InputField 
                whatFor={'Usuário'}
                whatValue={usuario}
                onChange={(e) => setUsuario(e.target.value)}
            />
            <InputField 
                whatFor={'Senha'}
                whatValue={senha}
                onChange={(e) => setSenha(e.target.value)}
            />


            <button onClick={handleLogin}>Entrar</button>
        </div>
    )
}

export default LoginForm