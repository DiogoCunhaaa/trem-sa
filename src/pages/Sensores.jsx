import RectanglePart from '../components/RectanglePart';
import SensoresInfo from '../components/infos/SensoresInfo';
import ButtonSensores from '../javascript/ButtonManutencao';
import ButtonInfo from '../components/infos/ButtonInfo';
import { useState } from 'react';

function Sensores(){

    const [showInput, setShowInput] = useState(false);
    const [value, setValue] = useState('');

    const handleClick = () => setShowInput("showInput");

    const handleConfirm = () => {
        if (onConfirm) onConfirm(value);
        setValue('');
        setShowInput(false);
    }
    return(
        <div className="container">
            <div className="row mt-3">
                <div className="col-6">
                    <RectanglePart backgroundColor = {'black'}> 
                        <ButtonInfo
                            title={'Adicione seu sensor'}
                            textColor={'white'}
                            buttonTitle={'Adicionar sensor'}
                            backgroundColor={'#b8b8b8'}
                            onClick={() => ButtonSensores.add()}
                            />
                    </RectanglePart>
                </div>
                <div className="col-6">
                    <RectanglePart backgroundColor = {'black'}> 
                        <ButtonInfo
                            title={'Remova seu sensor'}
                            textColor={'white'}
                            buttonTitle={'Remover sensor'}
                            backgroundColor={'#b8b8b8'}
                            onClick={() => ButtonSensores.remove()}
                            />
                    </RectanglePart>
                </div>
            </div>
                <div className="row mt-3">
                    <div className="col-6">
                        <RectanglePart backgroundColor = {''}> 
                            <ButtonInfo
                                title={'Editar seu sensor'}
                                textColor={'black'}
                                buttonTitle={'Editar sensor'}
                                backgroundColor={'#b8b8b8'}
                                onClick={() => ButtonSensores.edit()}
                            />
                        </RectanglePart>
                    </div>
                    <div className="col-6">
                        <RectanglePart backgroundColor = {''}> 
                            <ButtonInfo
                                title={'Ver sensores'}
                                textColor={'black'}
                                buttonTitle={'Ver '}
                                backgroundColor={'#b8b8b8'}
                                onClick={() => ButtonSensores.read()}
                            />
                        </RectanglePart>
                        
                    </div>
                </div>
                
        </div>
    )
}

export default Sensores;