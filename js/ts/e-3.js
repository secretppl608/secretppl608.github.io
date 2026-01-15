var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "gray";
const s = new Set([[10, 60, 10, 60, 0, 1, 1]]);
const map = [];
const img = new Image();
img.src = "../assets/ms.png";
var v1 = 1;
const game = {
    row: 9,
    column: 9,
    num: 20,
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
        const alpha = Math.random();
        if (alpha >= 0.8)
            game.num--;
        map.push(game.num >= 0 ? alpha : 0.1);
    }
}
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
document.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('done');
});
document.addEventListener("mousemove", (e) => {
    var _a, _b, _c, _d, _e, _f;
    if (localStorage.getItem('done') == 'true') {
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
document.addEventListener("click", (e) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    if (localStorage.getItem('done') == 'true') {
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
            if (((_g = map[k[4]]) !== null && _g !== void 0 ? _g : 1) >= 0.8) {
                // alert("you die");
                //死亡判定
                ctx.drawImage(img, (((_h = k[0]) !== null && _h !== void 0 ? _h : 0) + ((_j = k[1]) !== null && _j !== void 0 ? _j : 0)) / 2 - 25, (((_k = k[2]) !== null && _k !== void 0 ? _k : 0) + ((_l = k[3]) !== null && _l !== void 0 ? _l : 0)) / 2 - 30);
                click.push(k[4]);
                canvas.style.pointerEvents = 'none';
                localStorage.setItem('done', 'true');
                //show all
                for (let r of s) {
                    if (((_m = map[r[4]]) !== null && _m !== void 0 ? _m : 1) >= 0.8) {
                        ctx.drawImage(img, (((_o = r[0]) !== null && _o !== void 0 ? _o : 0) + ((_p = r[1]) !== null && _p !== void 0 ? _p : 0)) / 2 - 25, (((_q = r[2]) !== null && _q !== void 0 ? _q : 0) + ((_r = r[3]) !== null && _r !== void 0 ? _r : 0)) / 2 - 30);
                    }
                }
            }
            else {
                ctx.fillStyle = "whitesmoke";
                ctx.strokeRect(k[0], k[2], 50, 50);
                let n = 0;
                search.forEach((ac) => {
                    var _a, _b, _c, _d, _e;
                    for (let beta of s) {
                        if (beta[5] == ((_a = k[5]) !== null && _a !== void 0 ? _a : 0) + ((_b = ac[0]) !== null && _b !== void 0 ? _b : 0) &&
                            beta[6] == ((_c = k[6]) !== null && _c !== void 0 ? _c : 0) + ((_d = ac[1]) !== null && _d !== void 0 ? _d : 0)) {
                            if (((_e = map[beta[4]]) !== null && _e !== void 0 ? _e : 1) >= 0.8) {
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
                    ctx.fillText(n.toString(), (((_s = k[0]) !== null && _s !== void 0 ? _s : 0) + ((_t = k[1]) !== null && _t !== void 0 ? _t : 0)) / 2 - 6, (((_u = k[2]) !== null && _u !== void 0 ? _u : 0) + ((_v = k[3]) !== null && _v !== void 0 ? _v : 0)) / 2 + 6, 50);
                }
                else {
                    // 辅助翻牌算法
                    let n1 = 0;
                    search.forEach((ac) => {
                        var _a, _b, _c, _d, _e;
                        for (let beta of s) {
                            if (beta[5] == ((_a = k[5]) !== null && _a !== void 0 ? _a : 0) + ((_b = ac[0]) !== null && _b !== void 0 ? _b : 0) &&
                                beta[6] == ((_c = k[6]) !== null && _c !== void 0 ? _c : 0) + ((_d = ac[1]) !== null && _d !== void 0 ? _d : 0)) {
                                if (((_e = map[beta[4]]) !== null && _e !== void 0 ? _e : 1) >= 0.8) {
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
                                        var _a, _b, _c, _d, _e;
                                        for (let beta1 of s) {
                                            if (beta1[5] ==
                                                ((_a = beta[5]) !== null && _a !== void 0 ? _a : 0) +
                                                    ((_b = ac[0]) !== null && _b !== void 0 ? _b : 0) &&
                                                beta1[6] ==
                                                    ((_c = beta[6]) !== null && _c !== void 0 ? _c : 0) +
                                                        ((_d = ac[1]) !== null && _d !== void 0 ? _d : 0)) {
                                                if (((_e = map[beta1[4]]) !== null && _e !== void 0 ? _e : 1) >= 0.8) {
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
            }
        }
    }
});
export {};
//# sourceMappingURL=e-3.js.map