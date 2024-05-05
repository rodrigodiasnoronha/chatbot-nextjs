import { Layout } from "@/components/layout";
import { Box, Flex } from "@chakra-ui/react";
import { NCPageTitle } from "novacap-components";
import { IconType } from "react-icons";
import { NextPage } from "next";
import React from "react";
import { Chatbot } from "@/components/chatbot";

export interface HomepageButton {
    titulo: string;
    Icone: IconType;
    url: string;
    disabled: boolean;
}

const Home: NextPage = () => {


    return (<Layout contentContainerProps={{ maxWidth: "auto" }}>
        <Box
            as="main"
            backgroundImage="/assets/images/icon01.png"
            backgroundPosition={{ base: "bottom center", md: "right center" }}
            backgroundSize={{ base: "cover", md: "contain" }}
            backgroundRepeat="no-repeat"
            flex={1}
            display="flex"
            position="relative"
        >

            <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
                maxW={{ base: "100%", lg: "60%" }}
                width="100%"
                gap={20}
                padding={{ base: 4, md: 0 }}
            >
                <NCPageTitle
                    textAlign="center"
                    fontFamily="Inter"
                    color="blue.700"
                    fontWeight={600}
                    fontSize="1.563rem"
                >
                    Novacap
                </NCPageTitle>

                <Flex
                    justifyContent="space-between"
                    gap={10}
                    flexDirection={{ base: "column", lg: "row" }}
                >
                </Flex>
            </Flex>

            <Chatbot />
        </Box>
    </Layout>);
};


export default Home;
