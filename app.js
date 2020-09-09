const canvas = document.getElementById("jsCanvas");
// 2d path를 그릴 수 있는 화면 지정 
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("JsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

// 캔버스 크기 지정
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 선의 기본 색상 및 굵기 지정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// painting 변수 지정(기본값 = false)
let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        // 마우스를 클릭하지 않고 움직이는 동안 발생하는 이벤트
        // 단순하게 path를 생성하지만 사용하지는 않음
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        // 마우스를 클릭하고 움직이는 동안 발생하는 이벤트
        // 마우스가 움직이는 포인터에 line 생성
        ctx.lineTo(x, y);
        ctx.stroke();
    }

}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "채우기";
    } else {
        filling = true;
        mode.innerText = "그리기";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataUrl();
    const link = document.createElement("a");
    link.href = image;
    link.download = "paint";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (save) {
    save.addEventListener("click", handleSaveClick)
}