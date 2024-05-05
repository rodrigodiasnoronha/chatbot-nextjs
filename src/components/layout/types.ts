import { BoxProps } from "@chakra-ui/react";

export type LayoutProps = BoxProps & {
    containerLayoutProps?: BoxProps
    contentContainerProps?: BoxProps
}