import { Message } from "@/hooks/use-chat";

export interface ChatInputProps {
    onSubmit: (message: Message) => Promise<void> | void;
    action: "type-cep" | "select-option";
}