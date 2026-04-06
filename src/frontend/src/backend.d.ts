import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    id: string;
    content: string;
    conversation: string;
    sender: string;
    timestamp: bigint;
}
export interface backendInterface {
    clearAllMessages(): Promise<void>;
    deleteMessage(id: string): Promise<void>;
    getMessages(): Promise<Array<Message>>;
    saveMessages(newMessages: Array<Message>): Promise<void>;
    seedDemoMessages(): Promise<void>;
}
