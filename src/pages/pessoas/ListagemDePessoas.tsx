import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"
import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { useDebounce } from "../../shared/hooks";
import { LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
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

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);


    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            PessoasService.getAll(pagina, busca)
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
    }, [busca, pagina]);

    return (
        <LayoutBaseDePagina 
            titulo='Listagem de pessoas'
            barraDeFerramentas={
            <FerramentasDaListagem
                mostrarInputBusca
                textoBotaoNovo="Nova"
                textoDaBusca={busca}
                aoMudarTextoDeBusca={texto => setSearchParamns({ busca: texto, pagina: '1'}, {replace:true})} 
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
                    {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
                        <TableRow>
                            <TableCell colSpan={3}> 
                                
                                <Pagination 
                                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                                    page={pagina}
                                    onChange={(_, newPage) => setSearchParamns({ busca, pagina: newPage.toString()}, { replace:true})}
                                />

                            </TableCell>
                        </TableRow>
                    )}
                    </TableFooter>

                </Table>
            </TableContainer>
        </LayoutBaseDePagina>    
    );
};