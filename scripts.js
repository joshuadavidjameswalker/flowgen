const inputText = document.getElementById("inputText");
const nextStepBtn = document.getElementById("nextStep");
const loopToBtn = document.getElementById("loopTo");
const choiceBtn = document.getElementById("choice");
const decisionBtn = document.getElementById("decision");
const loopToSelector = document.getElementById("loopToSelector");
const loopToOptions = document.getElementById("loopToOptions");
const confirmLoopBtn = document.getElementById("confirmLoop");
const flowchartContainer = document.getElementById("flowchartContainer");

let flowchartData = "graph LR;";
let nodeId = 1;
let nodes = [];

function updateFlowchart() {
    flowchartContainer.innerHTML = `<div class="mermaid">${flowchartData}</div>`;
    mermaid.init(undefined, document.querySelectorAll(".mermaid"));
}

function appendNode(nodeLabel) {
    const id = `A${nodeId}`;
    flowchartData += `${id}["${nodeLabel}"];`;
    nodes.push({ id, label: nodeLabel });
    nodeId++;
}

nextStepBtn.addEventListener("click", () => {
    appendNode(inputText.value);
    if (nodeId > 2) {
        flowchartData += `A${nodeId - 2}-->A${nodeId - 1};`;
    }
    updateFlowchart();
});

loopToBtn.addEventListener("click", () => {
    appendNode(inputText.value);
    updateFlowchart();
    loopToSelector.style.display = "block";
    loopToOptions.innerHTML = nodes.map(node => `<option value="${node.id}">${node.label}</option>`).join('');
});

confirmLoopBtn.addEventListener("click", () => {
    const selectedNodeId = loopToOptions.value;
    flowchartData += `A${nodeId - 1}---${selectedNodeId};`;
   
    updateFlowchart();
    loopToSelector.style.display = "none";
});

choiceBtn.addEventListener("click", () => {
    appendNode(inputText.value);
    if (nodeId > 2) {
        flowchartData += `A${nodeId - 2}-->|Yes|A${nodeId - 1};`;
    }
    updateFlowchart();
});

decisionBtn.addEventListener("click", () => {
    appendNode(inputText.value);
    if (nodeId > 2) {
        flowchartData += `A${nodeId - 2}-->|No|A${nodeId - 1};`;
    }
    updateFlowchart();
});
