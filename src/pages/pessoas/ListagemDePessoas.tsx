import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { useDebounce } from "../../shared/hooks";




export const ListagemDePessoas: React.FC = () => {

    const [searchParams, setSearchParamns] = useSearchParams();


    const { debounce } = useDebounce(3000, false);


    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);


    useEffect(() => {

        debounce(() => {
            PessoasService.getAll(1, busca)
            .then((result) => {
            if (result instanceof Error){
                alert(result.message);
                return;
            }
            console.log(result);
        })

        
        })
    }, [busca]);

    return (
        <LayoutBaseDePagina 
            titulo='Listagem de pessoas'
            barraDeFerramentas={
            <FerramentasDaListagem
                mostrarInputBusca
                textoBotaoNovo="Nova"
                textoDaBusca={busca}
                aoMudarTextoDeBusca={texto => setSearchParamns({ busca: texto}, {replace:true})} 
            />}        
        >

        </LayoutBaseDePagina>    
    );
};