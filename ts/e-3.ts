var canvas = document.getElementById("canvas");
var ctx = (canvas! as HTMLCanvasElement).getContext("2d")!;
ctx.fillStyle = "gray";
const s = new Set([[10, 60, 10, 60, 0, 1, 1]]);
var map: number[][] = [];
const img = new Image();
let step = 0;
img.src = "../assets/ms.png";
let t: number | null = null;
let t1 = 0;
var v1 = 1;
const deal = (k: number[], s: Set<number[]>) => {
    ctx.fillStyle = "whitesmoke";
    ctx.strokeRect(k[0] as number, k[2] as number, 50, 50);
    let n = 0;
    search.forEach((ac) => {
        for (let beta of s) {
            if (
                beta[5] == (k[5] ?? 0) + (ac[0] ?? 0) &&
                beta[6] == (k[6] ?? 0) + (ac[1] ?? 0)
            ) {
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
        ctx.fillText(
            n.toString(),
            ((k[0] ?? 0) + (k[1] ?? 0)) / 2 - 6,
            ((k[2] ?? 0) + (k[3] ?? 0)) / 2 + 6,
            50
        );
    } else {
        // 辅助翻牌算法
        let n1 = 0;
        search.forEach((ac) => {
            for (let beta of s) {
                if (
                    beta[5] == (k[5] ?? 0) + (ac[0] ?? 0) &&
                    beta[6] == (k[6] ?? 0) + (ac[1] ?? 0)
                ) {
                    if (
                        map.some(
                            (ck) => ck.join() === [beta[5], beta[6]].join()
                        )
                    ) {
                        n1++;
                    }
                }
            }
        });
        if (n1 == 0) {
            search.forEach((ac) => {
                for (let beta of s) {
                    if (
                        beta[5] == (k[5] ?? 0) + (ac[0] ?? 0) &&
                        beta[6] == (k[6] ?? 0) + (ac[1] ?? 0)
                    ) {
                        //! 这里用于重复遍历邻居的邻居的雷数
                        //! ==============================================
                        let n1 = 0;
                        search.forEach((ac) => {
                            for (let beta1 of s) {
                                if (
                                    beta1[5] == (beta[5] ?? 0) + (ac[0] ?? 0) &&
                                    beta1[6] == (beta[6] ?? 0) + (ac[1] ?? 0)
                                ) {
                                    if (
                                        map.some(
                                            (ck) =>
                                                ck.join() ===
                                                [beta1[5], beta1[6]].join()
                                        )
                                    ) {
                                        n1++;
                                    }
                                }
                            }
                        });
                        //! ===============================================
                        if (n1 == 0) {
                            ctx.fillStyle = "whitesmoke";
                            ctx.fillRect(
                                beta[0] as number,
                                beta[2] as number,
                                50,
                                50
                            );
                            ctx.strokeRect(
                                beta[0] as number,
                                beta[2] as number,
                                50,
                                50
                            );
                            click.push(beta[4] as number);
                        }
                    }
                }
            });
        }
    }
    click.push(k[4] as number);
};
function getRandomInt(max: number = 1, min: number = 0) {
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
const click: number[] = [];
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
function clickH(e:PointerEvent) {
    if (t === null) {
        t = setInterval(() => {
            t1++;
            (document.querySelector("#time") as HTMLSpanElement).innerText =
                `%l${t1.toString()}`.replace(
                    "%l",
                    t1 > 99 ? "" : t1 > 9 ? "0" : "00"
                );
        }, 1000);
    }
    step++;
    if (localStorage.getItem("done") == "true") {
        return;
    }
    const idk = {
        ...z(e.clientX, e.clientY, "rtc"),
    };
    for (let k of s) {
        if (
            (idk.cx ?? 0) - (k[0] as number) <= 50 &&
            (idk.cy ?? 0) - (k[2] as number) <= 50 &&
            (idk.cx ?? 0) - (k[0] as number) >= 0 &&
            (idk.cy ?? 0) - (k[2] as number) >= 0 &&
            (idk.cx ?? 0) <= (k[1] as number) &&
            (idk.cy ?? 0) <= (k[3] as number)
        ) {
            if (map.some((ck) => ck.join() === [k[5], k[6]].join())) {
                //死亡判定
                if (step !== 1) {
                    if (typeof t === "number") {
                        clearInterval(t);
                        // (document.querySelector('#time') as HTMLSpanElement).innerText = '000';
                    }
                    ctx.drawImage(
                        img,
                        ((k[0] ?? 0) + (k[1] ?? 0)) / 2 - 25,
                        ((k[2] ?? 0) + (k[3] ?? 0)) / 2 - 30
                    );
                    click.push(k[4] as number);
                    canvas!.style.pointerEvents = "none";
                    localStorage.setItem("done", "true");
                    //show all
                    for (let r of s) {
                        if (
                            map.some((ck) => ck.join() === [r[5], r[6]].join())
                        ) {
                            ctx.drawImage(
                                img,
                                ((r[0] ?? 0) + (r[1] ?? 0)) / 2 - 25,
                                ((r[2] ?? 0) + (r[3] ?? 0)) / 2 - 30
                            );
                        }
                    }
                } else {
                    map = [];
                    for (let ms = 1; ms <= game.num; ms++) {
                        let f = 0;
                        while (f !== 1) {
                            let x = getRandomInt(game.row + 1, 1);
                            let y = getRandomInt(game.column + 1, 1);
                            if (x == k[5] && y == k[6]) {
                                f = 0;
                            } else {
                                map.push([x, y]);
                                f++;
                            }
                        }
                    }
                    deal(k, s);
                }
            } else {
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
        } else {
            map.push([x, y]);
            f++;
        }
    }
}
// console.log(map)
//! ======================================================
//! 请注意，此处雷区算法已经完全变更，后续所有判断踩雷逻辑必须完全重写
//! ======================================================
const z = (x: number, y: number, mod: "rtc" | "ctr" = "rtc") => {
    const a = canvas?.getBoundingClientRect();
    if (mod == "rtc") {
        return {
            cx:
                (x - a!?.left) *
                ((canvas as HTMLCanvasElement).width / a!?.width),
            cy:
                (y - a!?.top) *
                ((canvas as HTMLCanvasElement).height / a!?.height),
        };
    } else {
        return {
            rx:
                x / ((canvas as HTMLCanvasElement).width / a!?.width) +
                a!?.left,
            ry:
                y / ((canvas as HTMLCanvasElement).height / a!?.height) +
                a!?.top,
        };
    }
};
document.addEventListener("mousemove", (e) => {
    if (localStorage.getItem("done") == "true") {
        return;
    }
    const idk = {
        ...z(e.clientX, e.clientY, "rtc"),
    };
    for (let k of s) {
        if (
            (idk.cx ?? 0) - (k[0] as number) <= 50 &&
            (idk.cy ?? 0) - (k[2] as number) <= 50 &&
            (idk.cx ?? 0) - (k[0] as number) >= 0 &&
            (idk.cy ?? 0) - (k[2] as number) >= 0 &&
            (idk.cx ?? 0) <= (k[1] as number) &&
            (idk.cy ?? 0) <= (k[3] as number)
        ) {
            if (!click.includes(k[4] as number)) {
                ctx.fillStyle = "whitesmoke";
                ctx.fillRect(k[0] as number, k[2] as number, 50, 50);
            }
        } else {
            if (!click.includes(k[4] as number)) {
                ctx.fillStyle = "gray";
                ctx.fillRect(k[0] as number, k[2] as number, 50, 50);
            }
        }
    }
});
document.addEventListener("click", (e)=>{clickH(e)});
document.addEventListener("DOMContentLoaded", () => {
    localStorage.removeItem("done");
    const ele = document.querySelector("#number") as HTMLSpanElement;
    ele.innerText = game.num.toString();
    (document.querySelector("#time") as HTMLSpanElement).innerText = "000";
});
document.addEventListener('contextmenu',(e)=>{
    e.stopPropagation();
    e.preventDefault();
    
})
