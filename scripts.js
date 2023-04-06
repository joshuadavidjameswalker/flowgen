const inputText = document.getElementById("inputText");
const nextStepBtn = document.getElementById("nextStepBtn");
const loopBtn = document.getElementById("loopBtn");
const choiceBtn = document.getElementById("choiceBtn");
const choiceTextContainer = document.getElementById("choiceTextContainer");
const choiceTextYes = document.getElementById("choiceTextYes");
const choiceTextNo = document.getElementById("choiceTextNo");
const decisionBtn = document.getElementById("decisionBtn");
const loopSelect = document.getElementById("loopSelect");
const loopText = document.getElementById("loopText");
const saveAsImageBtn = document.getElementById("saveAsImageBtn");
const deleteNodeBtn = document.getElementById("deleteNodeBtn");
const nodesContainer = document.getElementById("nodesContainer");
const flowchart = document.getElementById("flowchart");

let nodeId = 1;
let flowchartData = "";

mermaid.initialize({ startOnLoad: true });

function updateFlowchart() {
    flowchart.innerHTML = `graph LR
        ${flowchartData}
    `;
    mermaid.init(undefined, flowchart);
}

function appendNode(text) {
    nodesContainer.innerHTML += `<div>A${nodeId}: ${text}</div>`;
    nodeId++;
}

nextStepBtn.addEventListener("click", () => {
    appendNode(inputText.value);
    flowchartData += `A${nodeId - 2}-->A${nodeId - 1};`;
    updateFlowchart();
});

loopBtn.addEventListener("click", () => {
    choiceTextContainer.style.display = "none";
    decisionBtn.style.display = "none";
    loopSelect.style.display = "block";
    loopText.style.display = "block";
});

choiceBtn.addEventListener("click", () => {
    choiceTextContainer.style.display = "block";
    decisionBtn.style.display = "block";
    loopSelect.style.display = "none";
    loopText.style.display = "none";
});

decisionBtn.addEventListener("click", () => {
    const yesText = choiceTextYes.value || "Yes";
    const noText = choiceTextNo.value || "No";

    appendNode(inputText.value);
    if (nodeId > 2) {
        flowchartData += `A${nodeId - 2}-->|${yesText}|A${nodeId - 1};`;
        appendNode(noText);
        flowchartData += `A${nodeId - 3}-->|${noText}|A${nodeId - 1};`;
    }

    updateFlowchart();
    choiceTextContainer.style.display = "none";
    decisionBtn.style.display = "none";
});

loopSelect.addEventListener("change", () => {
    const loopToNodeId = loopSelect.value;
    const loopLineText = loopText.value || "Loop";
    flowchartData += `A${nodeId - 1}-->|${loopLineText}|A${loopToNodeId};`;
    updateFlowchart();
    loopSelect.style.display = "none";
    loopText.style.display = "none";
});

saveAsImageBtn.addEventListener("click", () => {
    const svgElement = flowchart.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);

    const link = document.createElement("a");
    link.href = svgUrl;
    link.download = "flowchart.svg";
    link.click();
});

deleteNodeBtn.addEventListener("click", () => {
    if (nodeId > 1) {
        nodesContainer.removeChild(nodesContainer.lastChild);
        nodeId--;
        flowchartData = flowchartData.split(';').slice(0, -1).join(';') + ';';
        updateFlowchart();
    }
});

updateFlowchart();
