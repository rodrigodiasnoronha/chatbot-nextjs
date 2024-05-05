const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const http = require("http");
const socketIO = require("socket.io");
const axios = require("axios");


const viacepApi = axios.create({
    baseURL: "https://viacep.com.br/ws/"
});

const getCep = async (cep) => {
    const response = await viacepApi.get(`${cep}/json/`);
    return response.data;
};

app.prepare().then(async () => {
    const server = express();
    const httpServer = http.createServer(server);
    const io = socketIO(httpServer);

    io.on("connection", (socket) => {
        console.log("Client connected");

        io.emit("receive-message", [{
            content: "Olá, em que posso ajudar?",
            id: Math.random().toString(16).slice(2),
            owner: "chatbot",
            type: "text",
            action: "select-option"
        }, {
            content: "Selecione uma das opções abaixo para prosseguir",
            id: Math.random().toString(16).slice(2),
            owner: "chatbot",
            type: "text",
            action: "select-option"
        }, {
            content: "Estou com buracos na minha rua",
            id: `${Math.random().toString(16).slice(2)}-option-buraco-rua`,
            owner: "chatbot",
            type: "option",
            action: "select-option"
        }]);


        socket.on("send-message", async (data) => {

            console.log(data);

            // usuário selecinou alguma opção
            if (data.type == "option") {
                if (data.id.includes("option-buraco-rua")) {
                    io.emit("receive-message", {
                        content: "Por favor, digite o seu CEP",
                        id: Math.random().toString(16).slice(2),
                        owner: "chatbot",
                        type: "text",
                        action: "type-cep"
                    });
                } else if (data.id.includes("option-cep-incorreto")) {
                    io.emit("receive-message", {
                        content: "Por favor, digite o seu CEP",
                        id: Math.random().toString(16).slice(2),
                        owner: "chatbot",
                        type: "text",
                        action: "type-cep"
                    });
                } else if (data.id.includes("option-reiniciar-atendimento")) {
                    io.emit("receive-message", [{
                        content: "Selecione uma das opções abaixo para prosseguir",
                        id: Math.random().toString(16).slice(2),
                        owner: "chatbot",
                        type: "text",
                        action: "select-option"
                    }, {
                        content: "Estou com buracos na minha rua",
                        id: `${Math.random().toString(16).slice(2)}-option-buraco-rua`,
                        owner: "chatbot",
                        type: "option",
                        action: "select-option"
                    }]);
                } else if (data.id.includes("option-encerrar-atendimento")) {
                    io.emit("receive-message", {
                        content: "Agradecemos sua visita!",
                        id: Math.random().toString(16).slice(2),
                        owner: "chatbot",
                        type: "text",
                        action: "disabled"
                    });
                } else if (data.id.includes("option-cep-correto")) {
                    io.emit("receive-message", [{
                        content: "Estou abrindo uma ordem de serviço para verificar e dar andamento ao serviço.",
                        id: Math.random().toString(16).slice(2),
                        owner: "chatbot",
                        type: "text",
                        action: "type-cep"
                    }, {
                        content: `A ordem de serviço é a ${numeroAleatorio()}. Ajudo em algo mais?`,
                        id: Math.random().toString(16).slice(2),
                        owner: "chatbot",
                        type: "text",
                        action: "type-cep"
                    }, {
                        content: "Sim",
                        id: `${Math.random().toString(16).slice(2)}-option-reiniciar-atendimento`,
                        owner: "chatbot",
                        type: "option",
                        action: "select-option"
                    }, {
                        content: "Não",
                        id: `${Math.random().toString(16).slice(2)}-option-encerrar-atendimento`,
                        owner: "chatbot",
                        type: "option",
                        action: "select-option"
                    }]);
                }
            }


            if (data.type == "text") {

                if (data.action == "type-cep") {
                    try {
                        const cepData = await getCep(data.content);
                        io.emit("receive-message", [{
                            content: "O seu endereço é:",
                            id: Math.random().toString(16).slice(2),
                            owner: "chatbot",
                            type: "text",
                            action: "select-option"
                        }, {
                            content: `${cepData.logradouro}, ${cepData.complemento}, ${cepData.bairro}, ${cepData.localidade} - ${cepData.uf}`,
                            id: Math.random().toString(16).slice(2),
                            owner: "chatbot",
                            type: "text",
                            action: "select-option"
                        }, {
                            content: "O endereço esta correto?",
                            id: `${Math.random().toString(16).slice(2)}-option-buraco-rua`,
                            owner: "chatbot",
                            type: "text",
                            action: "select-option"
                        }, {
                            content: "Sim",
                            id: `${Math.random().toString(16).slice(2)}-option-cep-correto`,
                            owner: "chatbot",
                            type: "option",
                            action: "select-option"
                        }, {
                            content: "Não",
                            id: `${Math.random().toString(16).slice(2)}-option-cep-incorreto`,
                            owner: "chatbot",
                            type: "option",
                            action: "select-option"
                        }]);

                    } catch (err) {
                        io.emit("receive-message", {
                            content: "Ocorreu um erro ao buscar por este CEP.",
                            id: Math.random().toString(16).slice(2),
                            owner: "chatbot",
                            type: "text",
                            action: "error"
                        });
                    }
                }


            }
        });
    });

    server.all("*", (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});

function numeroAleatorio() {
    // Gera um número aleatório entre 1 e 1000000
    let numero = Math.floor(Math.random() * 1000000) + 1;

    // Converte o número para uma string
    let numeroString = numero.toString();

    // Verifica o comprimento da string e preenche zeros à esquerda se necessário
    while (numeroString.length < 7) {
        numeroString = "0" + numeroString;
    }

    return numeroString;
}