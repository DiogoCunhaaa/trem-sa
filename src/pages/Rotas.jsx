import RectanglePart from '../components/RectanglePart';
import ButtonRotas from '../javascript/ButtonRotas';
import ButtonInfo from '../components/infos/ButtonInfo';

function Rotas(){
    return(
        <div class="container">
                       <div className="row mt-3">
                <div className="col-6">
                    <RectanglePart backgroundColor = {'black'}> 
                        <ButtonInfo
                            title={'Adicionar a rota'}
                            textColor={'white'}
                            buttonTitle={'Adicionar rota'}
                            backgroundColor={'#b8b8b8'}
                            onClick={() => ButtonRotas.add()}
                            />
                    </RectanglePart>
                </div>
                <div className="col-6">
                    <RectanglePart backgroundColor = {''}> 
                        <ButtonInfo
                            title={'Remover a rota'}
                            textColor={'black'}
                            buttonTitle={'Remover rota'}
                            backgroundColor={'#b8b8b8'}
                            onClick={() => ButtonRotas.remove()}
                            />
                    </RectanglePart>
                </div>
            </div>
                <div className="row mt-3">
                    <div className="col-6">
                        <RectanglePart backgroundColor = {'black'}> 
                            <ButtonInfo
                                title={'Editar a rota'}
                                textColor={'white'}
                                buttonTitle={'Editar rota'}
                                backgroundColor={'#b8b8b8'}
                                onClick={() => ButtonRotas.edit()}
                            />
                        </RectanglePart>
                        
                    </div>
                    <div className="col-6">
                        <RectanglePart backgroundColor = {''}> 
                            <ButtonInfo
                                title={'Ver rotas criadas'}
                                textColor={'black'}
                                buttonTitle={'Ver rotas'}
                                backgroundColor={'#b8b8b8'}
                                onClick={() => ButtonRotas.read()}
                            />
                        </RectanglePart>
                        
                    </div>
                </div>
                
        </div>
    )
}

export default Rotas;