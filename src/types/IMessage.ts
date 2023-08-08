export interface IMessageResponse {
    message: string;
    success: boolean;
    username: string;
    
    id?: string;
    isBot?: boolean;
}

export interface IMessage extends Omit<IMessageResponse, 'success'> {
    timestamp: number;
}