import { Box, Button, Flex, Image, Text, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { Message } from "@/hooks/use-chat";
import { motion } from "framer-motion";

interface MessageProps {
    message: Message,
    onSelectOption: (message: Message) => Promise<void> | void
}

export const ChatMessage: React.FC<MessageProps> = ({ message, onSelectOption }) => {
    const { colorMode } = useColorMode();
    const bgColor = { light: "gray.300", dark: "gray.600" };
    const textColor = { light: "black", dark: "white" };

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    if (message.type == "text") {
        return (
            <motion.div
                animate={{ scale: [0, 1] }}
                transition={{ duration: 0.3 }}
            >

                <Flex alignItems="center" gap={2} ref={ref}>
                    {message.owner == "chatbot" && (
                        <Image
                            src="/apple-touch-icon.png"
                            width="30px"
                            height="30px"
                            borderRadius="15px"
                            backgroundColor="white"
                        />
                    )}
                    <Box
                        bg={message.owner == "client" ? "blue.500" : bgColor[colorMode]}
                        w="fit-content"
                        py={1}
                        px={3}
                        rounded="xl"
                        margin={2}
                        ml={message.owner == "client" ? "auto" : "0"}
                        position="relative"
                        textAlign={message.owner == "client" ? "right" : "left"}
                        wordBreak="break-word"
                        color={message.owner == "client" ? "white" : textColor[colorMode]}
                        textOverflow="ellipsis"
                    >


                        <Text>
                            {message.content}
                        </Text>
                    </Box>
                </Flex>
            </motion.div>
        );
    }

    if (message.type == "option") {
        return (
            <Flex alignItems="center" gap={2}>
                <Box width="30px">
                </Box>

                <Button
                    bg="blue.700"
                    w="fit-content"
                    py={1}
                    px={3}
                    rounded="xl"
                    margin={2}
                    position="relative"
                    wordBreak="break-word"
                    color="white"
                    onClick={() => onSelectOption({ ...message, owner: "client" })}
                >
                    <Text>
                        {message.content}
                    </Text>
                </Button>
            </Flex>
        );
    }

};

