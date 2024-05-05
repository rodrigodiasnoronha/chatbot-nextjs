import axios from "axios";

const viacepApi = axios.create({
    baseURL: "https://viacep.com.br/ws/"
});

interface Cep {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}


export const getCep = async (cep: string) => {
    const response = await viacepApi.get<Cep>(`${cep}/json/`);
    return response.data;
};