import RectanglePart from '../components/RectanglePart';
import ButtonInfo from '../components/infos/ButtonInfo';
import ButtonManutencao from '../javascript/ButtonManutencao';

function Manutencaocrud(){
    return(
        <div class="container">
                       <div className="row mt-3">
                <div className="col-6">
                    <RectanglePart backgroundColor = {'black'}> 
                        <ButtonInfo
                            title={'Fazer pedido de ajuda'}
                            textColor={'white'}
                            buttonTitle={'Adicionar pedido'}
                            backgroundColor={'#b8b8b8'}
                            onClick={() => ButtonManutencao.add()}
                            />
                    </RectanglePart>
                </div>
                <div className="col-6">
                    <RectanglePart backgroundColor = {''}> 
                        <ButtonInfo
                            title={'Excluir pedido de ajuda'}
                            textColor={'black'}
                            buttonTitle={'Remover pedido'}
                            backgroundColor={'#b8b8b8'}
                            onClick={() => ButtonManutencao.remove()}
                            />
                    </RectanglePart>
                </div>
            </div>
                <div className="row mt-3">
                    <div className="col-6">
                        <RectanglePart backgroundColor = {'black'}> 
                            <ButtonInfo
                                title={'Editar pedidos'}
                                textColor={'white'}
                                buttonTitle={'Editar pedidos'}
                                backgroundColor={'#b8b8b8'}
                                onClick={() => ButtonManutencao.edit()}
                            />
                        </RectanglePart>
                        
                    </div>
                    <div className="col-6">
                        <RectanglePart backgroundColor = {''}> 
                            <ButtonInfo
                                title={'Ver pedido de ajuda'}
                                textColor={'black'}
                                buttonTitle={'Ver pedidos'}
                                backgroundColor={'#b8b8b8'}
                                onClick={() => ButtonManutencao.read()}
                            />
                        </RectanglePart>
                        
                    </div>
                </div>
                
        </div>
    )
}

export default Manutencaocrud;