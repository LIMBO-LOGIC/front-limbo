import { io } from "socket.io-client";

const urlChat = "https://socket-limbo-logic-app.webpubsub.azure.com/";
const IP_ADRESS_IOT = "40.90.199.82";
const IP_ADRESS_IOT_TESTE = "localhost";
const urlAPIChat = 'https://limbo-logic-app.azurewebsites.net/'
// const baseUrl = "http://localhost:8000";
// const baseUrl = "https://back-limbo.azurewebsites.net";
const baseUrl = "https://back-limbo-production.up.railway.app";
const socket = io(urlChat, {
    path: "/clients/socketio/hubs/Hub",
  });

export { socket, baseUrl, IP_ADRESS_IOT, IP_ADRESS_IOT_TESTE, urlAPIChat };
