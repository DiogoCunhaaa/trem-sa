import RectanglePart from '../components/RectanglePart';
import ButtonTrens from '../javascript/ButtonManutencao';
import ButtonInfo from '../components/infos/ButtonInfo';

function Trens(){
    return(
        <div class="container">
                       <div className="row mt-3">
                <div className="col-6">
                    <RectanglePart backgroundColor = {''}> 
                        <ButtonInfo
                            title={'Adicione o trem'}
                            textColor={'black'}
                            buttonTitle={'Adicionar trem'}
                            backgroundColor={'#b8b8b8'}
                            onClick={() => ButtonTrens.add()}
                            />
                    </RectanglePart>
                </div>
                <div className="col-6">
                    <RectanglePart backgroundColor = {'black'}> 
                        <ButtonInfo
                            title={'Remova o trem'}
                            textColor={'white'}
                            buttonTitle={'Remover trem'}
                            backgroundColor={'#b8b8b8'}
                            onClick={() => ButtonTrens.remove()}
                            />
                    </RectanglePart>
                </div>
            </div>
                <div className="row mt-3">
                    <div className="col-6">
                        <RectanglePart backgroundColor = {'black'}> 
                            <ButtonInfo
                                title={'Editar o trem'}
                                textColor={'white'}
                                buttonTitle={'Editar trem'}
                                backgroundColor={'#b8b8b8'}
                                onClick={() => ButtonTrens.edit()}
                            />
                        </RectanglePart>
                        
                    </div>
                    <div className="col-6">
                        <RectanglePart backgroundColor = {''}> 
                            <ButtonInfo
                                title={'Ver trens criados'}
                                textColor={'black'}
                                buttonTitle={'Ver trens'}
                                backgroundColor={'#b8b8b8'}
                                onClick={() => ButtonTrens.read()}
                            />
                        </RectanglePart>
                        
                    </div>
                </div>
                
        </div>
    )
}

export default Trens;