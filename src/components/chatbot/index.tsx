import React from "react";
import { Box } from "@chakra-ui/react";
import { Chat } from "@/components/chat";

export const Chatbot: React.FC = () => {
    return (
        <Box position="absolute" bottom={0} right={0}>
            <Chat />
        </Box>
    );
};