import * as signalR from "@microsoft/signalr";

export enum EnumAcaoHub {
  ChamarGarcom = 0,
}

class Connector {
    private connection: signalR.HubConnection;
    public events: (onActionReceived: (acao: EnumAcaoHub) => void) => void;
    static instance: Connector;
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl('https://virtualservice.azurewebsites.net/hub')
            .withAutomaticReconnect()
            .build();
        this.connection.start().catch(err => console.error(err));
        this.events = (onActionReceived) => {
            this.connection.on("ReceivedAction", (acao) => {
                onActionReceived(acao);
            });
        };
    }
    public static getInstance(): Connector {
        if (!Connector.instance)
            Connector.instance = new Connector();
        return Connector.instance;
    }
}
export default Connector.getInstance;