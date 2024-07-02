class Trajectory {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.currentAngle = 0;
        this.deltaAngle = Math.PI / 4;
        this.maxLength = 150;
        this.isAnimating = false;
        this.animationSpeed = 0.1;
        this.direction = 0;
    }

    draw(context) {
        const length = this.maxLength;
        const currentEndX = this.x + length * Math.cos(this.angle + this.currentAngle);
        const currentEndY = this.y + length * Math.sin(this.angle + this.currentAngle);

        context.lineWidth = 10;
        context.strokeStyle = "red";
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(currentEndX, currentEndY);
        context.stroke();
    }

    toLeft() {
        this.isAnimating = true;
        this.currentAngle = -this.deltaAngle;
        this.direction = 1;
    }

    toRight() {
        this.isAnimating = true;
        this.currentAngle = this.deltaAngle;
        this.direction = -1;
    }

    update() {
        if (!this.isAnimating) return
        this.currentAngle += this.animationSpeed * this.direction;
        if (this.direction === 1 && this.currentAngle > this.deltaAngle) {
            this.isAnimating = false;
        }
        if (this.direction === -1 && this.currentAngle < -this.deltaAngle) {
            this.isAnimating = false;
        }
    }
    

    animateStrike(model, isLeftToRight, onAnimationEnd) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const targetAngle = isLeftToRight ? this.deltaAngle : -this.deltaAngle;
        const stepDirection = isLeftToRight ? -this.animationSpeed : this.animationSpeed;

        const step = () => {
            if ((isLeftToRight && this.currentAngle > -this.deltaAngle) || (!isLeftToRight && this.currentAngle < this.deltaAngle)) {
                this.currentAngle += stepDirection;
                this.x = model.x;
                this.y = model.y;
                this.angle = model.angle;
                this.draw();
                requestAnimationFrame(step);
            } else {
                this.currentAngle = -this.deltaAngle;
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
