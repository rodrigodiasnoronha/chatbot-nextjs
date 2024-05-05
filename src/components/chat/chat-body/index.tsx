import React from "react";
import { ChatBodyProps } from "@/components/chat/chat-body/types";
import { Flex } from "@chakra-ui/react";
import { useChat } from "@/hooks/use-chat";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";

export const ChatBody: React.FC<ChatBodyProps> = ({ open }) => {
    const { sendMessage, messages, action } = useChat();

    if (!open) {
        return null;
    }

    return (
        <Flex
            height="400px"
            background="white"
            direction="column"
            width="400px"
            overflowX="hidden"
        >
            <ChatMessages messages={messages} onSelectOption={sendMessage} />

            <ChatInput onSubmit={sendMessage} action={action} />
        </Flex>
    );
};