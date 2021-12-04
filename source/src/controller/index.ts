

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
        Forward([], speed)
    } else if (angle > -2.5 && angle > 2.75 && speed > 0) {
        Reverse([], speed.toFixed(2))
    } else if (angle <= -0.25 && angle > -1) {
        ForwardLeft([], speed.toFixed(2))
    } else if (angle <= 1 && angle >= 0.5) {
        ReverseRight([], speed.toFixed())
    } else if (angle < 1 && angle < 2.75) {
        ForwardRight([], speed.toFixed(2))
    } else if (angle > -2.5 && angle < -0.25) {

    } else if (angle == 0) {
        Stop([], [])
    }
}
function Forward(motor, speed) {
    console.log(`fwd at speed ${speed.toFixed(2)}`);
}

function Reverse(motor, speed) {
    console.log(`reverse at speed ${speed}`)
}
function ReverseRight(motor, speed) {
    console.log(`reverse right at speed ${speed}`)
}

function ReverseLeft(motor, speed) {
    console.log(`reverse left at speed ${speed}`)
}

function ForwardLeft(motor, speed) {
    console.log(`fordward left at speed ${speed}`)
}

function ForwardRight(motor, speed) {
    console.log(`forward right at speed ${speed}`)
}

function Stop(driveMotor, stopMotor) {
    console.log(`%c stopping...`, "color: #FF0000")
}