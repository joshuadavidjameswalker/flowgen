const inputText = document.getElementById("inputText");
const nextStepBtn = document.getElementById("nextStep");
const loopToBtn = document.getElementById("loopTo");
const choiceBtn = document.getElementById("choice");
const decisionBtn = document.getElementById("decision");
const flowchartContainer = document.getElementById("flowchartContainer");

let flowchartData = "graph LR;";

function updateFlowchart() {
    flowchartContainer.innerHTML = `<div class="mermaid">${flowchartData}</div>`;
    mermaid.init(undefined, document.querySelectorAll(".mermaid"));
}

nextStepBtn.addEventListener("click", () => {
    flowchartData += `${inputText.value}-->`;
    updateFlowchart();
});

loopToBtn.addEventListener("click", () => {
    flowchartData += `${inputText.value}---`;
    updateFlowchart();
});

choiceBtn.addEventListener("click", () => {
    flowchartData += `${inputText.value}-->|Choice|`;
    updateFlowchart();
});

decisionBtn.addEventListener("click", () => {
    flowchartData += `${inputText.value}-->|Decision|`;
    updateFlowchart();
});
