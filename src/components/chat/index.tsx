import React from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatBody } from "@/components/chat/chat-body";

export const Chat: React.FC = () => {
    const { isOpen, onToggle } = useDisclosure();


    return (
        <Box>
            <ChatHeader onToggle={onToggle} open={isOpen} />

            <ChatBody open={isOpen} />
        </Box>
    );
};