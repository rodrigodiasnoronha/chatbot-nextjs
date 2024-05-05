import React, { useState } from "react";
import { Box, Flex, IconButton, Input } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { ChatInputProps } from "@/components/chat/chat-input/types";

export const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, action }) => {
    const [message, setMessage] = useState<string>("");

    return (
        <Flex>
            <Box flex={1}>
                <Input
                    placeholder="Digite sua mensagem"
                    value={message}
                    onChange={e => setMessage(String(e.target.value))}
                    isDisabled={action != "type-cep"}
                />
            </Box>

            <Flex alignItems="center" justifyContent="center">
                <IconButton
                    isDisabled={action != "type-cep"}
                    aria-label="enviar mensagem"
                    icon={<ArrowRightIcon />}
                    onClick={() => {
                        onSubmit({
                            content: message,
                            id: Math.random().toString(16).slice(2),
                            owner: "client",
                            type: "text",
                            action: action
                        });
                        setMessage("");
                    }}
                />
            </Flex>
        </Flex>
    );
};