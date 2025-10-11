import RectanglePart from '../components/RectanglePart';
import ButtonRelatorios from '../javascript/ButtonRelatorios';
import ButtonInfo from '../components/infos/ButtonInfo';


function Relatorioscrud(){
    return(
        <div class="container">
                       <div className="row mt-3">
                <div className="col-6">
                    <RectanglePart backgroundColor = {''}> 
                        <ButtonInfo
                            title={'Adicionar'}
                            textColor={'black'}
                            buttonTitle={'Adicionar relatório'}
                            backgroundColor={'#b8b8b8'}
                            onClick={() => ButtonRelatorios.add()}
                            />
                    </RectanglePart>
                </div>
                <div className="col-6">
                    <RectanglePart backgroundColor = {'black'}> 
                        <ButtonInfo
                            title={'Remover'}
                            textColor={'white'}
                            buttonTitle={'Remover relatórios'}
                            backgroundColor={'#b8b8b8'}
                            onClick={() => ButtonRelatorios.remove()}
                            />
                    </RectanglePart>
                </div>
            </div>
                <div className="row mt-3">
                    <div className="col-6">
                        <RectanglePart backgroundColor = {''}> 
                            <ButtonInfo
                                title={'Editar'}
                                textColor={'black'}
                                buttonTitle={'Editar relatórios'}
                                backgroundColor={'#b8b8b8'}
                                onClick={() => ButtonRelatorios.edit()}
                            />
                        </RectanglePart>
                        
                    </div>
                    <div className="col-6">
                        <RectanglePart backgroundColor = {'black'}> 
                            <ButtonInfo
                                title={'Ver'}
                                textColor={'white'}
                                buttonTitle={'Ver relatórios'}
                                backgroundColor={'#b8b8b8'}
                                onClick={() => ButtonRelatorios.read()}
                            />
                        </RectanglePart>
                        
                    </div>
                </div>
                
        </div>
    )
}

export default Relatorioscrud;