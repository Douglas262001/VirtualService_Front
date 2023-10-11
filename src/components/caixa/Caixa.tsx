import ComandaList from "@components/caixa/ComandaList"
import './Caixa.modules.css'

const Caixa = () => {
    return (
        <div className="caixa-central">
            <div className="caixa-comandas">
                <ComandaList />
            </div>
            <div className="caixa-pedido">
            
            </div>
        </div>
    )

}

export default Caixa