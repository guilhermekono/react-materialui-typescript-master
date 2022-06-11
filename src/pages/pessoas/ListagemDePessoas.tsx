import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"
import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { useDebounce } from "../../shared/hooks";
import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { Environment } from "../../shared/enviroment";




export const ListagemDePessoas: React.FC = () => {

    const [searchParams, setSearchParamns] = useSearchParams();
    const { debounce } = useDebounce();

    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);


    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            PessoasService.getAll(1, busca)
            .then((result) => {
            setIsLoading(false); ////Para de mostrar o feedback visual para o usuário}
            
            if (result instanceof Error){
                alert(result.message);
                return;
            }
            console.log(result);


            setTotalCount(result.totalCount);
            setRows(result.data);
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
            <TableContainer component={Paper} variant="outlined" sx={{ margin: 1 , width:"auto"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome Completo</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    {rows.map(row => (
                    <TableRow key={row.id}>
                        <TableCell>Ações</TableCell>
                        <TableCell>{row.nomeCompleto}</TableCell>
                        <TableCell>{row.email}</TableCell>
                    </TableRow>
                    ))}
                    </TableBody>

                        {totalCount === 0 && !isLoading &&(
                            <caption>{Environment.LISTAGEM_VAZIA}</caption>
                        )}

                    <TableFooter>
                    {isLoading && (
                        <TableRow>
                            <TableCell colSpan={3}> 
                                
                                    <LinearProgress variant="indeterminate"/>
                                
                            </TableCell>
                        </TableRow>
                    )}
                    </TableFooter>

                </Table>
            </TableContainer>
        </LayoutBaseDePagina>    
    );
};