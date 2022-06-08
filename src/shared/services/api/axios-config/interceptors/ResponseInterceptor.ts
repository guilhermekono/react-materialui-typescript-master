import { AxiosResponse } from 'axios';


export const responseInterceptor = (response: AxiosResponse) => {
    return response; // caso queira, ao ter um sucesso na consulta do backend por exemplo, dá pra aplicar aqui um mesmo tratamento para todos os dados recebidos
};