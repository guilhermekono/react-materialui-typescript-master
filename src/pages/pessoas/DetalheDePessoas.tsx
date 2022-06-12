import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";



export const DetalheDePessoas: React.FC = () => {

    const {id = 'nova'} = useParams<'id'>();
    const navigate = useNavigate(); 


    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');


    useEffect(() => {
        if (id !== 'nova'){
            setIsLoading(true);

            PessoasService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error){
                        alert(result.message);
                        navigate('/pessoas');
                    }else{
                        setNome(result.nomeCompleto);
                        console.log(result);
                    }
                });
        }
        
    }, [id]);

    const handleSave = () => {
        console.log('Save');
    }

    const handleDelete = (id: number) => {
        
        if (window.confirm('Tem certeza que quer deletar o bagulho? Pode ser importante, ou nao, eu sou um aviso digital, não um policial, faça o que quiser')){
            PessoasService.deleteById(id)
            .then(result => {
                if (result instanceof Error){
                    alert(result.message);
                }else{
                    alert('registro apagado com sucesso');
                    navigate('/pessoas');
;                }
            })
        };
    }

    return (
        <LayoutBaseDePagina
            titulo={id === 'nova' ? 'Nova pessoa' : nome}
            barraDeFerramentas={<FerramentasDeDetalhe
                textoBotaoNovo='Nova'
                mostrarBotaoSalvarEFechar
                mostrarBotaoNovo={id !== 'nova'}
                mostrarBotaoApagar={id !== 'nova'}

                aoClicarEmSalvar={handleSave}
                aoClicarEmSalvarEFechar={handleSave}
                aoClicarEmApagar={() => handleDelete(Number(id))}
                aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                aoClicarEmVoltar={() => navigate('/pessoas')} 
                />}


        >

            {isLoading && (
                <LinearProgress variant='indeterminate'/>
            )}

        <p>DetalheDePessoas {id}</p>
        </LayoutBaseDePagina>
    );

};