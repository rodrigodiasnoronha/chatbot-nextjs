import React from "react";
import { Box } from "@chakra-ui/react";
import { ChatMessagesProps } from "@/components/chat/chat-messages/types";
import { ChatMessage } from "@/components/chat/chat-message";

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, onSelectOption }) => {
    return (
        <Box flex={1} overflowY="scroll" p={2}>
            {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} onSelectOption={onSelectOption} />
            ))}
        </Box>
    );
};