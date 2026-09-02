const button = document.getElementById("btn");
const panel = document.getElementsByClassName("mob-nav-panel")
const rects = button.children
const offset =  String(Number(window.getComputedStyle(button).getPropertyValue("gap").slice(0, window.getComputedStyle(button).getPropertyValue("gap").indexOf("px"))) + rects[0].clientHeight
).concat("px")

visible = false;

button.onclick = function(){
    visible = !visible;

    panel[0].style.transform = visible ? "translateX(0vw)" : "translateX(-150vw)";

    rects[1].style.background = visible ? "transparent" : window.getComputedStyle(rects[0]).getPropertyValue("background-color");
    rects[0].style.transform = visible ? `translateY(${offset}) rotate(45deg)` : "rotate(0deg)";
    rects[2].style.transform = visible ? `translateY(-${offset}) rotate(-45deg)` : "rotate(0deg)";
}
