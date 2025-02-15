// socketService.js
import { io } from "socket.io-client";

const userId = JSON.parse(localStorage.getItem('user'))._id; // Assuming user info is stored in localStorage
const socket = io('http://localhost:3000', { query: { userId } })
socket.on("connect", () => {
    console.log(`Connected with socket ID: ${socket.id}`);
});



export default socket;
