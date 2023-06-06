/**
 Copyright 2018

 Licensed under the Apache License, Version 2.0(the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 Author: Ewa Gasperowicz(@devnook)
 */
class Animation {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = ctx.canvas.width / 2;
    this.y = ctx.canvas.height / 2;
    this.rMax = Math.min(this.x - 20, this.y - 20, 60);
    this.r = 40;
    this.grow = true;
    this.run = true;

    this.boundAnimate = this.animate.bind(this);
  }

  static fibonacci(num) {
    return (num <= 1) ? 1 : ThemedAnimation.fibonacci(num - 1) + ThemedAnimation.fibonacci(num - 2);
  }

  drawCircle() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    this.ctx.fill();
  };

  animate() {
    if (!this.run) {
      return;
    }
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    if (this.r === this.rMax || this.r === 0) {
      this.grow = !this.grow;
    };
    this.r = this.grow ? this.r + 1 : this.r - 1;
    this.drawCircle();
    requestAnimationFrame(this.boundAnimate);
  }

  stop() {
    this.run = false;
  }

  start() {
    this.run = true;
    this.animate();
  }
}

class ThemedAnimation extends Animation {
  constructor(ctx) {
    super(ctx);
    this.counter = 1;
    this.themeColors = ['red', 'gold'];
    this.theme = this.themeColors;
  }

  set theme(colors) {
    Animation.fibonacci(40);
    const ctx = new OffscreenCanvas(100, 1).getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(0.5, colors[1]);
    gradient.addColorStop(1, colors[0]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, 1);
    const imgd = ctx.getImageData(0, 0, ctx.canvas.width, 1);
    const theme = [].slice.call(imgd.data);
    this.theme_ = theme;
  }

  get theme() {
    return this.theme_;
  }

  changeColor(counter) {
    let colorCounter = counter % 100;
    let pixArr = this.theme.slice(colorCounter * 4, colorCounter * 4 + 4);
    let color = `rgba(${pixArr[0]}, ${pixArr[1]}, ${pixArr[2]}, ${pixArr[3]} )`;
    this.ctx.fillStyle = color;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    if (!this.run) {
      return;
    }
    if (this.r === this.rMax || this.r === 0) {
      this.grow = !this.grow;
    };
    if (this.r === 1 && this.grow === false) {
      this.ctx.fillText('Preparing theme... Thread busy', this.x - 60, this.ctx.canvas.height - 10);
    } else {
      this.ctx.fillText('UI interactive', this.x - 30, this.ctx.canvas.height - 10);
    }
    if (this.r === 0 && this.grow) {
      this.themeColors = (this.themeColors[0] === 'red') ? ['blue', 'green'] : ['red', 'gold'];
      this.theme = this.themeColors;
    };
    this.changeColor(this.counter);
    this.counter++;

    this.r = this.grow ? this.r + 1 : this.r - 1;

    this.drawCircle();
    requestAnimationFrame(this.boundAnimate);
  }
}