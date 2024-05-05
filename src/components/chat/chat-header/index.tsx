import React from "react";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { CloseIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { ChatHeaderProps } from "@/components/chat/chat-header/types";

export const ChatHeader: React.FC<ChatHeaderProps> = ({ open, onToggle }) => {
    return (<Flex
        backgroundColor="blue.700"
        color="white"
        px={4}
        py={2}
        borderTopRadius="0.313rem"
        alignItems="center"
        width="400px"
        justifyContent="space-between"
    >
        <Text>
            Novacap chat
        </Text>

        <Box>
            {open && (
                <IconButton
                    color="white"
                    variant="ghost"
                    aria-label="close chat"
                    icon={<CloseIcon />}
                    onClick={onToggle}
                />
            )}

            {!open && (
                <IconButton
                    color="white"
                    variant="ghost"
                    aria-label="open chat"
                    icon={<TriangleUpIcon />}
                    onClick={onToggle}
                />
            )}
        </Box>
    </Flex>);
};