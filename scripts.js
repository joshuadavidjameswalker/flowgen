const mermaidDiv = document.querySelector(".mermaid");
const inputText = document.getElementById("inputText");
const choiceTextYes = document.getElementById("choiceTextYes");
const choiceTextNo = document.getElementById("choiceTextNo");
const loopText = document.getElementById("loopText");
const loopToNode = document.getElementById("loopToNode");
const nextStepBtn = document.getElementById("nextStepBtn");
const addDecisionPointBtn = document.getElementById("addDecisionPointBtn");
const addLoopBtn = document.getElementById("addLoopBtn");
const deleteNodeBtn = document.getElementById("deleteNodeBtn");
const saveAsImageBtn = document.getElementById("saveAsImageBtn");

let flowchartData = "graph LR;";
let nodeId = 1;

function updateFlowchart() {
    mermaidDiv.innerHTML = flowchartData;
    mermaid.init(undefined, mermaidDiv);
}

function appendNode(text, id) {
    flowchartData += `${id || "A" + nodeId}("${text}");`;
    nodeId++;
}

nextStepBtn.addEventListener("click", () => {
    appendNode(inputText.value);
    updateFlowchart();
});

addDecisionPointBtn.addEventListener("click", () => {
    const yesText = choiceTextYes.value || "Yes";
    const noText = choiceTextNo.value || "No";
    appendNode(inputText.value);
    flowchartData += `A${nodeId - 1}-->|${yesText}|A${nodeId};`;
    appendNode(yesText);
    flowchartData += `A${nodeId - 2}-->|${noText}|A${nodeId};`;
    appendNode(noText);
    updateFlowchart();
});

addLoopBtn.addEventListener("click", () => {
    const loopNodeId = loopToNode.value;
    if (!loopNodeId) return;
    flowchartData += `A${nodeId - 1}-->|${loopText.value || "Back"}|${loopNodeId};`;
    updateFlowchart();
});

deleteNodeBtn.addEventListener("click", () => {
    flowchartData = flowchartData.replace(/A\d+\("\w*"\);/g, "").replace(/A\d+-->\|\w*\|A\d+;/g, "");
    nodeId--;
    updateFlowchart();
});

saveAsImageBtn.addEventListener("click", () => {
    const svg = mermaidDiv.querySelector("svg");
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const img = new Image();
    img.src = "data:image/svg+xml;base64," + btoa(source);
    const link = document.createElement("a");
    link.href = img.src;
    link.download = "flowchart.png";
    link.click();
});
