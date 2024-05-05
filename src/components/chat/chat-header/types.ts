export interface ChatHeaderProps {
    open: boolean;
    onToggle: () => Promise<void> | void;
}