export type TOrder = {
    number: number;
}

export type TWsOrderMessage = { orders: TWsOrder[], total: number, totalToday: number }

export type TWsOrder = {
    ingredients: string[];
    _id: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
    name: string;
}

export type TWsActions = {
    wsInit: string;
    wsSendOrder: string;
    onOpen: string;
    onClose: string;
    onError: string;
    onMessage: string;
}