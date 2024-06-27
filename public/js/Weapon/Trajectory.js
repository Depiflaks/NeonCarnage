// import {} from "../settings.js";

class Trajectory {
    constructor({x, y, angle}, context) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.context = context;
        this.currentAngle = -Math.PI / 4; // Начальный угол дуги
        this.endAngle = Math.PI / 4; // Конечный угол дуги
        this.maxLength = 150;
        this.isAnimating = false;
        //this.isLeftToRight = true; // Флаг для чередования сторон
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

    animateStrike(model, onAnimationEnd) {
        if (this.isAnimating) return; // Если анимация уже идет, не запускаем новую

        this.isAnimating = true; // Устанавливаем флаг анимации в true

        this.currentAngle = -Math.PI / 4; // Сбрасываем угол для новой анимации

        /*if (this.isLeftToRight === true) {
            this.currentAngle = Math.PI / 4; // Начальный угол дуги
            this.endAngle = -Math.PI / 4; // Конечный угол дуги
            this.animationSpeed = -this.animationSpeed;
        } else {
            this.currentAngle = -Math.PI / 4; // Начальный угол дуги
            this.endAngle = Math.PI / 4; // Конечный угол дуги
            this.animationSpeed = -this.animationSpeed;
        }*/
            const step = () => {
                if (this.currentAngle < this.endAngle) {
                    this.currentAngle += this.animationSpeed;
                    this.x = model.x;
                    this.y = model.y;
                    this.draw();
                    requestAnimationFrame(step);

                } else {
                    this.currentAngle = -Math.PI / 4; // Сбрасываем угол для будущих ударов
                    this.isAnimating = false;
                    if (onAnimationEnd) {
                        onAnimationEnd();
                    }
                }
            };

        /*if(this.isLeftToRight === true) {
            this.isLeftToRight = false;
        } else {
            this.isLeftToRight = true;
        }*/
            requestAnimationFrame(step);



    }

}

export { Trajectory }