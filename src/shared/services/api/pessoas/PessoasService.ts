import { Environment } from '../../../enviroment';
import { Api } from '../axios-config';


interface IListagemPessoa {
    id: number;
    email: string;
    cidadeId: number;
    nomeCompleto: string;
}

interface IDetalhePessoa {
    id: number;
    email: string;
    cidadeId: number;
    nomeCompleto: string;
}

type TPessoasComTotalCount = {
    data: IListagemPessoa[];
    totalCount: number;
}


const getAll = async (page = 1, filter = ''): Promise<TPessoasComTotalCount | Error> => {
    try {

        const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
        
        const {data, headers } = await Api.get('urlRelativa');

        if (data){
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS), //limite de linhas serve para que não dê xabu na hora que não retornar o headers, como pede para retornar um número, retornar o limite de linhas é uma forma de dar esse número, ainda que não seja um retorno correto
            };
        }

        return new Error('Erro ao listar os registros');

    }catch (error){

        console.error(error);
        return new Error((error as {message: string}).message || 'Erro ao listar os registros');
    }
    
};

const getById = async (): Promise<any> => {};

const create = async (): Promise<any> => {};

const updateById = async (): Promise<any> => {};

const deleteById = async (): Promise<any> => {};


export const PessoasService = {

    getAll,
    getById,
    create,
    updateById,
    deleteById,


};