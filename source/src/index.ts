import { Board, Servo, Led, Motor, Button, IR } from "johnny-five";
import express from "express";
import http from "http";
import config from "./config";
import { DriveServo, MotorController } from "./motor";
import { Server } from "socket.io";
import Move, { Stop } from "./controller";
const {
  motorDrivePort,
  motorPivotPort,
  forwardLeverPort,
  reverseLeverPort,
  leftLeverPort,
  rightLeverPort,
  maxControllers,
} = config;
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const board = new Board();
let listenerCount = 0;

app.get("/", (req, res) => {
  res.send("arduino car");
});

function Forward(motor, led) {
  led.on();
  motor.to(-180);
}

board.on("ready", () => {
  const driveServo = new Servo({
    pin: 7,
    type: "continuous",
  });
  const pivotServo = new Servo({
    pin: 3,
    type: "continuous",
  });
  // pivotServo.sweep();
  console.log("board connected");
  io.on("connection", (socket) => {
    if (listenerCount >= 2) {
      console.log("to many listeners...");
    }
    listenerCount++;
    console.log(`${listenerCount} listeners`);
    console.log("connection established!");

    socket.on("direction", (directions) => {
      Move(driveServo, pivotServo, directions);
    });

    socket.on("brake", (data) => {
      console.log("brake!");
      Stop(driveServo, pivotServo);
    });

    socket.on("disconnect", () => {
      listenerCount -= 1;
      console.log("socket closed!");
    });
    socket.emit("hello", { hello: "world!" });
  });

  board.repl.inject({ servo: driveServo });
  board.repl.inject({ servo: pivotServo });
});
server.listen(2000, () => {
  console.log("arduino is listening...");
});
