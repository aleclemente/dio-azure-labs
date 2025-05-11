function calculateRotationSpeed(initialSpeed, friction, time) {
    return initialSpeed * Math.exp(-friction * time);
}

function calculateBallPosition(initialPosition, speed, angle, time) {
    const gravity = 9.81; // acceleration due to gravity in m/s^2
    const x = initialPosition.x + speed * Math.cos(angle) * time;
    const y = initialPosition.y + speed * Math.sin(angle) * time - 0.5 * gravity * time * time;
    return { x, y };
}

function calculateFrictionEffect(speed, frictionCoefficient) {
    return speed * (1 - frictionCoefficient);
}