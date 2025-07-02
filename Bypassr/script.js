//fuck!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


function bypassencode(str) {
    const inv = ["\uFE2D", "\uFE2B", "\uFE2D"];
    const map = {
        "0": "０", "1": "１", "2": "２", "3": "３", "4": "４",
        "5": "５", "6": "６", "7": "７", "8": "８", "9": "９",
        " ": "\b"
    };

    const r = () => inv[Math.floor(Math.random() * inv.length)];

    return str.replace(/./g, (c) => {
        if (/[a-zA-Z]/.test(c)) {
            return r() + c + r();
        } else if (map[c]) {
            return map[c];
        } else {
            return c;
        }
    });
}

function splitbydelimiter(str, delim) {
    return str.split(delim).filter(part => part.length > 0);
}

function splitbybypassedchunks(bypassed, maxlen) {
    const parts = [];
    let current = "";
    const words = splitbydelimiter(bypassed, "\b");

    for (const word of words) {
        const next = current !== "" ? current + "\b" + word : word;
        if (next.length > maxlen) {
            if (current !== "") parts.push(current);
            current = word;
        } else {
            current = next;
        }
    }

    if (current !== "") parts.push(current);
    return parts;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bypass(message) {
    const firstchar = message[0];
    const skipencoding = ["/", "-", ";", ":", "!"].includes(firstchar);

    const finalmessages = [];

    if (skipencoding) {
        finalmessages.push(message);
    } else {
        const prefix = "\u05BE>ˑ\u0008";
        const suffix = "ˑ\u0008";
        const bypassed = bypassencode(message).replace(/ /g, "\b");
        const chunks = splitbybypassedchunks(bypassed, 140);
        for (const chunk of chunks) {
            finalmessages.push(prefix + chunk + suffix);
        }
    }

    const result = finalmessages.join("\n");

   

    return result;
}

document.getElementById("modifyButton").addEventListener("click", async function () {
    const tb = document.getElementById("textBox");
    const original = tb.value;

    const teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeext = await bypass(original);
    tb.value = teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeext;
    console.log(teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeext);
});
document.getElementById("copyButton").addEventListener("click", async function () {
    const tb = document.getElementById("textBox");
    try {
        await navigator.clipboard.writeText(tb.value);
    } catch (err) {
        console.error("failed (rip): ", err);
    }
});
const bouncingText = document.getElementById("bouncingText");
let x = 100, y = 100;
let dx = 2, dy = 2;

function bounceText() {
    const container = document.getElementById("settingsTab");
    const rect = container.getBoundingClientRect();
    const textrect = bouncingText.getBoundingClientRect();

    if (x + textrect.width >= rect.width || x <= 0) dx = -dx;
    if (y + textrect.height >= rect.height || y <= 0) dy = -dy;

    x += dx;
    y += dy;

    bouncingText.style.left = x + "px";
    bouncingText.style.top = y + "px";

    requestAnimationFrame(bounceText);
}
document.querySelector('[data-tab="settings"]').addEventListener('click', () => {
    requestAnimationFrame(bounceText);
});
