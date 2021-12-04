import { io } from "socket.io-client"
import { SocketEndpoint } from "../../controller/config"

export const socket = io(SocketEndpoint)
