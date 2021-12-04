import { Board, Servo, Led, Motor, Button, IR } from "johnny-five";
import express from "express"
import http from "http"
import config from "./config";
import { DriveServo, MotorController } from "./motor";
import { Server } from "socket.io"
import Move from "./controller"
const {
  motorDrivePort,
  forwardLeverPort,
  reverseLeverPort,
  leftLeverPort,
  rightLeverPort,
  maxControllers
} = config;
const app = express();
const server = http.createServer(app);
const io = new Server(server)

let listenerCount = 0;

app.get('/', (req, res) => {
  res.send('arduino car');
});

function Forward(motor, led) {
  led.on();
  motor.to(-180);
}

io.on("connection", socket => {
  if (listenerCount >= 2) {
    console.log('to many listeners...')
  }
  listenerCount++
  console.log(`${listenerCount} listeners`)
  console.log("connection established!");
  socket.on("direction", directions => {
    Move([], [], directions)
  })
  socket.on("disconnect", () => {
    listenerCount -= 1
    console.log("socket closed!")
  })
  socket.emit("hello", { hello: "world!" });
})
// board.on("ready", () => {
//   const led = new Led(2);
//   const forwardLever = new Button(2);
//   const driveServo = new Servo(motorDrivePort);
//     driveServo.cw
//   led.off();

//   board.repl.inject({
//     servo: driveServo,
//   });
//   //   buttons.forEach((button) => {
//   //     board.repl.inject({
//   //       button,
//   //     });
//   //   });
// });
server.listen(80, () => {
  console.log("arduino is listening...")
});