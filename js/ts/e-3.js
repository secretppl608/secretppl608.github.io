var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "gray";
const s = new Set([[10, 60, 10, 60, 0, 1, 1]]);
var map = [];
const img = new Image();
let step = 0;
img.src = "../assets/ms.png";
let t = null;
let t1 = 0;
var v1 = 1;
const deal = (k, s) => {
    var _a, _b, _c, _d;
    ctx.fillStyle = "whitesmoke";
    ctx.strokeRect(k[0], k[2], 50, 50);
    let n = 0;
    search.forEach((ac) => {
        var _a, _b, _c, _d;
        for (let beta of s) {
            if (beta[5] == ((_a = k[5]) !== null && _a !== void 0 ? _a : 0) + ((_b = ac[0]) !== null && _b !== void 0 ? _b : 0) &&
                beta[6] == ((_c = k[6]) !== null && _c !== void 0 ? _c : 0) + ((_d = ac[1]) !== null && _d !== void 0 ? _d : 0)) {
                if (map.some((ck) => ck.join() === [beta[5], beta[6]].join())) {
                    n++;
                }
            }
        }
    });
    if (n !== 0) {
        ctx.fillStyle =
            n >= 9
                ? "brown"
                : n >= 8
                    ? "red"
                    : n >= 7
                        ? "purple"
                        : n >= 6
                            ? "blue"
                            : n >= 5
                                ? "skyblue"
                                : n >= 4
                                    ? "orange"
                                    : n >= 3
                                        ? "gold"
                                        : n >= 2
                                            ? "green"
                                            : n >= 1
                                                ? "black"
                                                : "gray";
        ctx.font = "bold 30px serif";
        ctx.fillText(n.toString(), (((_a = k[0]) !== null && _a !== void 0 ? _a : 0) + ((_b = k[1]) !== null && _b !== void 0 ? _b : 0)) / 2 - 6, (((_c = k[2]) !== null && _c !== void 0 ? _c : 0) + ((_d = k[3]) !== null && _d !== void 0 ? _d : 0)) / 2 + 6, 50);
    }
    else {
        // 辅助翻牌算法
        let n1 = 0;
        search.forEach((ac) => {
            var _a, _b, _c, _d;
            for (let beta of s) {
                if (beta[5] == ((_a = k[5]) !== null && _a !== void 0 ? _a : 0) + ((_b = ac[0]) !== null && _b !== void 0 ? _b : 0) &&
                    beta[6] == ((_c = k[6]) !== null && _c !== void 0 ? _c : 0) + ((_d = ac[1]) !== null && _d !== void 0 ? _d : 0)) {
                    if (map.some((ck) => ck.join() === [beta[5], beta[6]].join())) {
                        n1++;
                    }
                }
            }
        });
        if (n1 == 0) {
            search.forEach((ac) => {
                var _a, _b, _c, _d;
                for (let beta of s) {
                    if (beta[5] == ((_a = k[5]) !== null && _a !== void 0 ? _a : 0) + ((_b = ac[0]) !== null && _b !== void 0 ? _b : 0) &&
                        beta[6] == ((_c = k[6]) !== null && _c !== void 0 ? _c : 0) + ((_d = ac[1]) !== null && _d !== void 0 ? _d : 0)) {
                        //! 这里用于重复遍历邻居的邻居的雷数
                        //! ==============================================
                        let n1 = 0;
                        search.forEach((ac) => {
                            var _a, _b, _c, _d;
                            for (let beta1 of s) {
                                if (beta1[5] == ((_a = beta[5]) !== null && _a !== void 0 ? _a : 0) + ((_b = ac[0]) !== null && _b !== void 0 ? _b : 0) &&
                                    beta1[6] == ((_c = beta[6]) !== null && _c !== void 0 ? _c : 0) + ((_d = ac[1]) !== null && _d !== void 0 ? _d : 0)) {
                                    if (map.some((ck) => ck.join() ===
                                        [beta1[5], beta1[6]].join())) {
                                        n1++;
                                    }
                                }
                            }
                        });
                        //! ===============================================
                        if (n1 == 0) {
                            ctx.fillStyle = "whitesmoke";
                            ctx.fillRect(beta[0], beta[2], 50, 50);
                            ctx.strokeRect(beta[0], beta[2], 50, 50);
                            click.push(beta[4]);
                        }
                    }
                }
            });
        }
    }
    click.push(k[4]);
};
function getRandomInt(max = 1, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
}
const game = {
    row: 8,
    column: 8,
    num: 10,
};
const search = [
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
];
const click = [];
for (let j = 0; j <= game.column - 1; j++) {
    for (let i = 0; i <= game.row - 1; i++) {
        ctx.fillRect(10 + i * 50 + i * 5, 10 + j * 50 + j * 5, 50, 50);
        if (!(i == 0 && j == 0)) {
            s.add([
                10 + 55 * i,
                60 + 55 * i,
                10 + 55 * j,
                60 + 55 * j,
                v1,
                i + 1,
                j + 1,
            ]);
            v1++;
        }
    }
}
function clickH(e) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    if (t === null) {
        t = setInterval(() => {
            t1++;
            document.querySelector("#time").innerText =
                `%l${t1.toString()}`.replace("%l", t1 > 99 ? "" : t1 > 9 ? "0" : "00");
        }, 1000);
    }
    step++;
    if (localStorage.getItem("done") == "true") {
        return;
    }
    const idk = Object.assign({}, z(e.clientX, e.clientY, "rtc"));
    for (let k of s) {
        if (((_a = idk.cx) !== null && _a !== void 0 ? _a : 0) - k[0] <= 50 &&
            ((_b = idk.cy) !== null && _b !== void 0 ? _b : 0) - k[2] <= 50 &&
            ((_c = idk.cx) !== null && _c !== void 0 ? _c : 0) - k[0] >= 0 &&
            ((_d = idk.cy) !== null && _d !== void 0 ? _d : 0) - k[2] >= 0 &&
            ((_e = idk.cx) !== null && _e !== void 0 ? _e : 0) <= k[1] &&
            ((_f = idk.cy) !== null && _f !== void 0 ? _f : 0) <= k[3]) {
            if (map.some((ck) => ck.join() === [k[5], k[6]].join())) {
                //死亡判定
                if (step !== 1) {
                    if (typeof t === "number") {
                        clearInterval(t);
                        // (document.querySelector('#time') as HTMLSpanElement).innerText = '000';
                    }
                    ctx.drawImage(img, (((_g = k[0]) !== null && _g !== void 0 ? _g : 0) + ((_h = k[1]) !== null && _h !== void 0 ? _h : 0)) / 2 - 25, (((_j = k[2]) !== null && _j !== void 0 ? _j : 0) + ((_k = k[3]) !== null && _k !== void 0 ? _k : 0)) / 2 - 30);
                    click.push(k[4]);
                    canvas.style.pointerEvents = "none";
                    localStorage.setItem("done", "true");
                    //show all
                    for (let r of s) {
                        if (map.some((ck) => ck.join() === [r[5], r[6]].join())) {
                            ctx.drawImage(img, (((_l = r[0]) !== null && _l !== void 0 ? _l : 0) + ((_m = r[1]) !== null && _m !== void 0 ? _m : 0)) / 2 - 25, (((_o = r[2]) !== null && _o !== void 0 ? _o : 0) + ((_p = r[3]) !== null && _p !== void 0 ? _p : 0)) / 2 - 30);
                        }
                    }
                }
                else {
                    map = [];
                    for (let ms = 1; ms <= game.num; ms++) {
                        let f = 0;
                        while (f !== 1) {
                            let x = getRandomInt(game.row + 1, 1);
                            let y = getRandomInt(game.column + 1, 1);
                            if (x == k[5] && y == k[6]) {
                                f = 0;
                            }
                            else {
                                map.push([x, y]);
                                f++;
                            }
                        }
                    }
                    deal(k, s);
                }
            }
            else {
                deal(k, s);
            }
        }
    }
}
for (let ms = 1; ms <= game.num; ms++) {
    let f = 0;
    while (f !== 1) {
        let x = getRandomInt(game.row + 1, 1);
        let y = getRandomInt(game.column + 1, 1);
        if (map.some((el) => el[0] == x && el[1] == y)) {
            f = 0;
        }
        else {
            map.push([x, y]);
            f++;
        }
    }
}
// console.log(map)
//! ======================================================
//! 请注意，此处雷区算法已经完全变更，后续所有判断踩雷逻辑必须完全重写
//! ======================================================
const z = (x, y, mod = "rtc") => {
    const a = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();
    if (mod == "rtc") {
        return {
            cx: (x - (a === null || a === void 0 ? void 0 : a.left)) *
                (canvas.width / (a === null || a === void 0 ? void 0 : a.width)),
            cy: (y - (a === null || a === void 0 ? void 0 : a.top)) *
                (canvas.height / (a === null || a === void 0 ? void 0 : a.height)),
        };
    }
    else {
        return {
            rx: x / (canvas.width / (a === null || a === void 0 ? void 0 : a.width)) +
                (a === null || a === void 0 ? void 0 : a.left),
            ry: y / (canvas.height / (a === null || a === void 0 ? void 0 : a.height)) +
                (a === null || a === void 0 ? void 0 : a.top),
        };
    }
};
document.addEventListener("mousemove", (e) => {
    var _a, _b, _c, _d, _e, _f;
    if (localStorage.getItem("done") == "true") {
        return;
    }
    const idk = Object.assign({}, z(e.clientX, e.clientY, "rtc"));
    for (let k of s) {
        if (((_a = idk.cx) !== null && _a !== void 0 ? _a : 0) - k[0] <= 50 &&
            ((_b = idk.cy) !== null && _b !== void 0 ? _b : 0) - k[2] <= 50 &&
            ((_c = idk.cx) !== null && _c !== void 0 ? _c : 0) - k[0] >= 0 &&
            ((_d = idk.cy) !== null && _d !== void 0 ? _d : 0) - k[2] >= 0 &&
            ((_e = idk.cx) !== null && _e !== void 0 ? _e : 0) <= k[1] &&
            ((_f = idk.cy) !== null && _f !== void 0 ? _f : 0) <= k[3]) {
            if (!click.includes(k[4])) {
                ctx.fillStyle = "whitesmoke";
                ctx.fillRect(k[0], k[2], 50, 50);
            }
        }
        else {
            if (!click.includes(k[4])) {
                ctx.fillStyle = "gray";
                ctx.fillRect(k[0], k[2], 50, 50);
            }
        }
    }
});
document.addEventListener("click", (e) => { clickH(e); });
document.addEventListener("DOMContentLoaded", () => {
    localStorage.removeItem("done");
    const ele = document.querySelector("#number");
    ele.innerText = game.num.toString();
    document.querySelector("#time").innerText = "000";
});
document.addEventListener('contextmenu', (e) => {
    e.stopPropagation();
    e.preventDefault();
});
export {};
//# sourceMappingURL=e-3.js.map