import { LinearProgress, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { VTextField } from "../../shared/form";


interface IFormData {
    email: string;
    cidadeId: number;
    nomeCompleto: string;

}

export const DetalheDePessoas: React.FC = () => {

    const {id = 'nova'} = useParams<'id'>();
    const navigate = useNavigate(); 

    const formRef = useRef<FormHandles>(null);

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
                        formRef.current?.setData(result);
                    }
                });
        }
        
    }, [id]);

    const handleSave = (dados: IFormData) => {
        
        setIsLoading(true);

        if(id === 'nova'){
            PessoasService.create(dados).then((result) => {
                setIsLoading(false);

                if(result instanceof Error){
                    alert(result.message);
                }else{
                    navigate(`/pessoas/detalhe/${result}`);
                }
            });

        }else{
            PessoasService.updateById(Number(id), {id: Number(id), ...dados}).then((result) => {
                setIsLoading(false);

                if(result instanceof Error){
                    alert(result.message);
                }
            });
        }

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

                aoClicarEmSalvar={() => formRef.current?.submitForm()}
                aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
                aoClicarEmApagar={() => handleDelete(Number(id))}
                aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                aoClicarEmVoltar={() => navigate('/pessoas')} 
                />}


        >
            <Form ref={formRef} onSubmit={handleSave}>
                
                <VTextField placeholder='Nome Completo' name='nomeCompleto'/>
                <VTextField placeholder='Email' name='email'/>
                <VTextField placeholder='Id da cidade' name='cidadeId'/>

            </Form>
            

        </LayoutBaseDePagina>
    );

};