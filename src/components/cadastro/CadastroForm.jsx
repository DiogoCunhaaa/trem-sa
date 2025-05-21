import { useState } from "react"
import InputField from "./InputField";
import LoginButton from "./LoginButton";

function CadastroForm() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Usuário:", usuario);
        console.log("Senha:", senha);
        console.log("Email:", email)
    };

    return (
        <div className="container max-w-md mx-auto mt-10 p-4">
            <div className="text-center my-3">
                <h4 className="text-lg fw-bold">TRAIN TRACKER SYSTEM</h4>
            </div>

            <div className="row mt-2">
                    <InputField 
                    whatFor={'Usuário'}
                    onChange={(e) => setUsuario(e.target.value)}
                />
            </div>
            <div className="row mt-2">
                    <InputField 
                    whatFor={'Email'}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="row mt-2">
                    <InputField 
                    whatFor={'Senha'}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>
            <div className="row mt-2">
                    <InputField 
                    whatFor={'Repetir senha'}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>
        </div>
    );
}

export default CadastroForm;