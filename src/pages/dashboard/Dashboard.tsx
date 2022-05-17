import { BarraDeFerramentas } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"

export const Dashboard = () => {

    return (
        <LayoutBaseDePagina 
            titulo='Páginal inicial' 
            barraDeFerramentas={(
                <BarraDeFerramentas
                    mostrarInputBusca
                    textoBotaoNovo="Novas"
                />)}>
            Testando
        </LayoutBaseDePagina>
    );


};