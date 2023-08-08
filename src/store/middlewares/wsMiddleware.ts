import { Middleware, MiddlewareAPI } from "redux";
import { API } from "../../services/api";
import { AppDispatch, RootState, TApplicationActions } from "../../types";

interface IWSActions {
    wsStart: string;
    wsStop: string;
    
    onOpen: (event: Event) => TApplicationActions;
    onMessage: (event: MessageEvent) => TApplicationActions;
    onError: (event: Event) => TApplicationActions;
    onClose: (event: Event) => TApplicationActions;
}

export const wsMiddleware = (WSActions: IWSActions): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let wsUrl: string | null = null;
        
        return next => (action: TApplicationActions) => {
            const { dispatch } = store;
            
            
            if (action.type === WSActions.wsStart) {
                wsUrl = (action as { payload: string }).payload;
                
                socket = new WebSocket(wsUrl);
                console.log("сокет старт");
            }
            
            if (socket) {
                socket.onopen = event => {
                    dispatch(WSActions.onOpen(event));
                };
                
                socket.onerror = event => {
                    dispatch(WSActions.onError(event));
                };
                
                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    
                    if (parsedData.message === "Invalid or missing token") {
                        console.log(parsedData.message);
                        
                        socket?.close();
                        
                        new API().refreshToken()
                            .then(() => {
                                const newToken = localStorage.getItem('accessToken');
                                
                                const socketUrl = wsUrl?.split("?")[0];
                                
                                const newWsUrl = `${socketUrl}?token=${newToken}`;
                                
                                dispatch({
                                    type: WSActions.wsStart,
                                    payload: newWsUrl,
                                } as TApplicationActions);
                            });
                    } else {
                        dispatch(WSActions.onMessage(event));
                    }
                };
                socket.onclose = event => {
                    socket?.close();
                    dispatch(WSActions.onClose(event));
                };
                
                if (action.type === WSActions.wsStop) {
                    socket.close();
                }
            }
            
            next(action);
        };
    };
};