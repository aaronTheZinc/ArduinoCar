import { Board, Servo, Led, Motor, Button, IR } from "johnny-five";
import config from "./config";
import { DriveServo, MotorController } from "./motor";
const {
  motorDrivePort,
  forwardLeverPort,
  reverseLeverPort,
  leftLeverPort,
  rightLeverPort,
} = config;

const board = new Board();
function Forward(motor, led) {
  led.on();
  motor.to(-180);
}
board.on("ready", () => {
  const led = new Led(2);
  const forwardLever = new Button(2);
  //   const forwardLever = new Button(forwardLeverPort);
  //   const reverseLever = new Button(reverseLeverPort);
  //   const leftLever = new Button(leftLeverPort);
  //   const rightLever = new Button(rightLeverPort);

  //   const buttons = [forwardLever, reverseLever, leftLever, rightLever];

  const driveServo = new Servo(motorDrivePort);

  //   forwardLever.on("down", function () {
  //     console.log("down");
  //   });

  //   forwardLever.on("hold", function () {
  //     console.log("hold");
  //   });

  forwardLever.on("press", () => console.log("clicked"));
  forwardLever.on("release", () => console.log("released!"));
  // "up" the button is released
  //   forwardLever.on("up", function () {
  //     console.log("up");
  //   });
  led.off();

  board.repl.inject({
    servo: driveServo,
  });
  //   buttons.forEach((button) => {
  //     board.repl.inject({
  //       button,
  //     });
  //   });
});
