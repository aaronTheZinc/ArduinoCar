import { Servo } from "johnny-five";
import config from "../config";

const { motorDrivePort, motorPivotPort } = config;
export class MotorController {
  driveServo: any;
  board: any;

  constructor(board) {
    this.driveServo;
    this.board = board;
  }
  initialize() {
    this.driveServo = new Servo(motorDrivePort);
    return this;
  }
}
export const DriveServo = new Servo({
  pin: motorDrivePort,
  controller: "PCA9685",
});
const PivotServo = new Servo(motorDrivePort);

export function Forward() {
  DriveServo.sweep();
}

export function Reverse() {}

export function PivotLeft() {}
export function PivotRight() {}

export const motors = [DriveServo];
