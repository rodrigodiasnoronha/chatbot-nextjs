import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { LayoutProps } from "./types";
import { NCFooter, NCHeader, ProfileOption } from "novacap-components";
import { NavbarItem } from "novacap-components/dist/widgets/NCHeader/types";
import { useRouter } from "next/navigation";
import { useRouter as useRouterLocale } from "next/router";

export const Layout: React.FC<LayoutProps> = ({ children, containerLayoutProps, contentContainerProps }) => {

    const router = useRouter();
    const routerLocale = useRouterLocale();

    const [navbarItems, setNavbarItems] = useState<Array<NavbarItem>>([]);

    const [profileOptions, setProfileOptions] = useState<Array<ProfileOption>>([]);


    return (<Box minHeight="100vh" overflowY="scroll" display="flex" flexDirection="column"
                 justifyContent="space-between" {...containerLayoutProps}>
        <NCHeader
            navbarItems={navbarItems}
            profileOptions={profileOptions}
            logoHeader={"/assets/images/header-novacap-branco.png"}
            profilePicturePlaceholder="/assets/images/user-placeholder.png"
        ></NCHeader>
        <Flex
            flex={1}
            paddingX={{ base: 4, md: 6 }}
            paddingTop={12}
            width="100%"
            maxWidth="1600px"
            marginLeft="auto"
            marginRight="auto"
            direction="column"
            {...contentContainerProps}
        >
            {children}
        </Flex>

        <NCFooter
            logoLeft="/assets/images/footer-novacap-gdf-e-tempo-e-acao.png"
            logoRight="/assets/images/footer-novacap-azul.png"
        />
    </Box>);
};