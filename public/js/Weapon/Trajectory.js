class Trajectory {
    constructor({x, y, angle}, context) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.context = context;
        this.currentAngle = -Math.PI / 4; // Initial arc angle
        this.endAngle = Math.PI / 4; // Final arc angle
        this.maxLength = 150;
        this.isAnimating = false;
        this.animationSpeed = 0.1;
    }

    draw() {
        const length = this.maxLength;
        const currentEndX = this.x + length * Math.cos(this.angle + this.currentAngle);
        const currentEndY = this.y + length * Math.sin(this.angle + this.currentAngle);

        this.context.lineWidth = 10;
        this.context.strokeStyle = "red";
        this.context.beginPath();
        this.context.moveTo(this.x, this.y);
        this.context.lineTo(currentEndX, currentEndY);
        this.context.stroke();
    }

    animateStrike(model, isLeftToRight, onAnimationEnd) {
        if (this.isAnimating) return;

        this.isAnimating = true;
        console.log(isLeftToRight);

        const targetAngle = isLeftToRight ? this.endAngle : -Math.PI / 4;
        const stepDirection = isLeftToRight ? -this.animationSpeed : this.animationSpeed;

        const step = () => {
            if ((isLeftToRight && this.currentAngle > -Math.PI / 4) || (!isLeftToRight && this.currentAngle < this.endAngle)) {
                this.currentAngle += stepDirection;
                this.x = model.x;
                this.y = model.y;
                this.draw();
                requestAnimationFrame(step);
            } else {
                this.currentAngle = -Math.PI / 4; // Reset angle for future strikes
                this.isAnimating = false;
                if (onAnimationEnd) {
                    onAnimationEnd();
                }
            }
        };

        this.currentAngle = targetAngle;
        requestAnimationFrame(step);
    }
}

export { Trajectory }
