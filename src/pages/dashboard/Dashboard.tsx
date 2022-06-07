import {  FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"

export const Dashboard = () => {

    return (
        <LayoutBaseDePagina 
            titulo='Páginal inicial' 
            barraDeFerramentas={(
                <FerramentasDeDetalhe/>)}>
            Testando
        </LayoutBaseDePagina>
    );

};