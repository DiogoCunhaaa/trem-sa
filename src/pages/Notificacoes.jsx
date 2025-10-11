import RectanglePart from '../components/RectanglePart';
import ButtonNotificacoes from '../javascript/ButtonRotas';
import ButtonInfo from '../components/infos/ButtonInfo';

function Notificacoes(){
    return(
        <div class="container">
                       <div className="row mt-3">
                <div className="col-6">
                    <RectanglePart backgroundColor = {''}> 
                        <ButtonInfo
                            title={'Adicionar'}
                            textColor={'black'}
                            buttonTitle={'Adicionar notificações'}
                            backgroundColor={'#b8b8b8'}
                            onClick={() => ButtonNotificacoes.add()}
                            />
                    </RectanglePart>
                </div>
                <div className="col-6">
                    <RectanglePart backgroundColor = {''}> 
                        <ButtonInfo
                            title={'Remover'}
                            textColor={'black'}
                            buttonTitle={'Remover notificações'}
                            backgroundColor={'#b8b8b8'}
                            onClick={() => ButtonNotificacoes.remove()}
                            />
                    </RectanglePart>
                </div>
            </div>
                <div className="row mt-3">
                    <div className="col-6">
                        <RectanglePart backgroundColor = {'black'}> 
                            <ButtonInfo
                                title={'Editar'}
                                textColor={'white'}
                                buttonTitle={'Editar notificações'}
                                backgroundColor={'#b8b8b8'}
                                onClick={() => ButtonNotificacoes.edit()}
                            />
                        </RectanglePart>
                        
                    </div>
                    <div className="col-6">
                        <RectanglePart backgroundColor = {'black'}> 
                            <ButtonInfo
                                title={'Ver'}
                                textColor={'white'}
                                buttonTitle={'Ver notificações '}
                                backgroundColor={'#b8b8b8'}
                                onClick={() => ButtonNotificacoes.read()}
                            />
                        </RectanglePart>
                        
                    </div>
                </div>
                
        </div>
    )
}

export default Notificacoes;