import { math } from "./math.js";

window.onload = () => {

    /**
     * @description 生成地图游戏线程，开场动画结束后应当调用此线程
     * @type {HTMLCanvasElement}
     */
    const map = document.querySelector('#map');
    const style = document.createElement('style');
    style.innerText = '#map,#client { cursor: crosshair;}';
    document.head.appendChild(style);
    const ctx = map.getContext('2d');
    let r = map.getBoundingClientRect();
    let rx = r.width;
    let ry = r.height;
    let scaleX = map.width /rx;
    let scaleY = map.height/ry;
    document.addEventListener('mousemove', (e) => {
        const old = document.getElementsByClassName('showPosition');
        for (let i of old) {
            i.remove();
        }
        let div = document.createElement('span');
        let mouseX = e.clientX - r.left;
        let mouseY = e.clientY - r.top;
        let x = mouseX * scaleX;
        let y = mouseY * scaleY;
        div.id = 'client';
        div.classList.add('showPosition');
        div.innerText = `position: x${x.toFixed(2)},y${y.toFixed(2)}`;
        div.style.padding = '2px 3px';
        div.style.fontSize = '10px';
        div.style.position = 'absolute';
        div.style.top = Math.round(e.clientY) + 'px';
        div.style.left = Math.round(e.clientX) + 'px';
        document.body.appendChild(div);
        if (x !== ((JSON.parse(localStorage.getItem('point') ?? '{"x":0}')).x ?? 0) || y !== ((JSON.parse(localStorage.getItem('point') ?? '{"y":0}')).y ?? 0)) {
            const distance = ` / distance: ${Math.sqrt(Math.pow(x - ((JSON.parse(localStorage.getItem('point') ?? '{"x":0}')).x ?? 0), 2)+Math.pow(y - ((JSON.parse(localStorage.getItem('point') ?? '{"y":0}')).y ?? 0), 2)).toFixed(2)}`;
            div.insertAdjacentText('beforeend', distance);
        }
        if (window.innerWidth - e.clientX < 20 || window.innerHeight - e.clientY < 20) {
            if (window.innerWidth - e.clientX < 20) {
                div.style.left = (e.clientX - 60) + 'px';
            }
            if (window.innerHeight - e.clientY < 20) {
                div.style.top = (e.clientY - 20) + 'px';
            }
        }
    });
    document.addEventListener('click', (e) => {
        let mouseX = e.clientX - r.left;
        let mouseY = e.clientY - r.top;
        let x = mouseX * scaleX;
        let y = mouseY * scaleY;
        ctx.setLineDash([5,5]);
        ctx.moveTo((JSON.parse(localStorage.getItem('point') ?? '{"x":0}')).x ?? 0, (JSON.parse(localStorage.getItem('point') ?? '{"y":0}')).y ?? 0);
        if (localStorage.getItem('point') !== null) ctx.lineTo(x,y);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x,y,1, math.angle(0), math.angle(360));
        ctx.fillStyle = 'orange';
        ctx.fill();
        ctx.save();
        localStorage.setItem('point', JSON.stringify({ x: x, y: y }));
    });
    document.addEventListener('contextmenu', (e)=>{
        e.stopPropagation();
        e.preventDefault();
        ctx.restore();
        localStorage.removeItem('point');
    });
    document.addEventListener('keydown', (e)=>{
        if (e.key == 'r') {
            e.preventDefault();
            ctx.reset();
            localStorage.removeItem('point');
        }
    });
    document.ontouchstart = (e)=>{
        const t = setInterval(()=>{e.preventDefault()},1);
        const t1 = setTimeout(()=>{
            ctx.reset();
            localStorage.removeItem('point');
            clearInterval(t);
            clearTimeout(t1);
        },2000);
    }
}

