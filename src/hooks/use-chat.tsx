import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Socket } from "engine.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { isArray } from "@chakra-ui/utils";


export interface Message {
    id: string;
    content: string;
    type: "text" | "option";
    owner: "chatbot" | "client";
    action: "type-cep" | "select-option";
}


export const useChat = () => {
    const [messages, setMessages] = useState<Array<Message>>([]);
    const [action, setAction] = useState<"type-cep" | "select-option">("select-option");

    const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | undefined>(undefined);

    useEffect(() => {
        setSocket(io("http://localhost:3000"));
    }, []);


    useEffect(() => {
        if (socket) {
            socket.on("receive-message", (receivedMessage: Message | Array<Message>) => {
                if (isArray(receivedMessage)) {
                    const lastItemsFromArray = receivedMessage[receivedMessage.length - 1];
                    if (lastItemsFromArray) {
                        setAction(lastItemsFromArray.action);
                    }
                    setMessages(oldState => [...oldState, ...receivedMessage]);
                } else {
                    setAction(receivedMessage.action);
                    setMessages(oldState => [...oldState, receivedMessage]);
                }
            });
        }

        return () => {
            if (socket) {
                socket.off();
            }
        };
    }, [socket]);

    const sendMessage = (message: Message) => {
        if (socket) {
            socket.emit("send-message", message);

            if (message.type == "text") {
                setMessages(oldState => [...oldState, message]);
            }
        }
    };

    return {
        messages,
        sendMessage,
        action
    };
};