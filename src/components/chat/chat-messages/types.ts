import { Message } from "@/hooks/use-chat";

export interface ChatMessagesProps {
    messages: Array<Message>;
    onSelectOption: (message: Message) => Promise<void> | void;
}