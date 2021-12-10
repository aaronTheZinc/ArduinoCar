/**
 * 0 = fwd
 * 3 rev
 *
 */
/**
 *
 * @param motorForward
 * @param motorPivot
 * @param param2
 */
export default function Move(motorForward, motorPivot, { angle, speed }) {
  if (angle < 0.25 && angle > -0.25 && angle != 0) {
    Forward(motorForward, motorPivot, speed);
  } else if (angle > -2.5 && angle > 2.75 && speed > 0) {
    Reverse(motorForward, motorPivot, speed.toFixed(2));
  } else if (angle <= -0.25 && angle > -1) {
    ForwardLeft(motorPivot, speed.toFixed(2));
  } else if (angle <= 1 && angle >= 0.5) {
    ReverseRight(motorForward, motorPivot, speed.toFixed());
  } else if (angle < 1 && angle < 2.75) {
    ForwardRight(motorPivot, speed.toFixed(2));
  } else if (angle > -2.5 && angle < -0.25) {
  } else if (angle == 0) {
    Stop(motorForward, []);
  }

  if (speed === 0) {
  }
}
function Forward(motor, pivotMotor, speed) {
  motor.cw(speed);
  pivotMotor.ccw(0);
  console.log(`fwd at speed ${speed.toFixed(2) / 2}`);
}

function Reverse(motor, pivot, speed) {
  pivot.ccw(0);
  motor.ccw(speed);
  console.log(`reverse at speed ${speed}`);
}
function ReverseRight(motor, pivotMotor, speed) {
  console.log(`reverse right at speed ${speed}`);
}

function ReverseLeft(motor, speed) {
  console.log(`reverse left at speed ${speed}`);
}

function ForwardLeft(motor, speed) {
  motor.ccw(speed);
  console.log(`fordward left at speed ${speed}`);
}

function ForwardRight(motor, speed) {
  motor.cw(speed);
}

export const Stop = (driveServo, pivotServo) => {
  driveServo.stop();
  pivotServo.stop();
};
