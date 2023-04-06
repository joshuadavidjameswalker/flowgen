const inputText = document.getElementById("inputText");
const nextStepBtn = document.getElementById("nextStep");
const loopToBtn = document.getElementById("loopTo");
const choiceBtn = document.getElementById("choice");
const decisionBtn = document.getElementById("decision");
const loopToSelector = document.getElementById("loopToSelector");
const loopToOptions = document.getElementById("loopToOptions");
const confirmLoopBtn = document.getElementById("confirmLoop");
const flowchartContainer = document.getElementById("flowchartContainer");
const saveAsImageBtn = document.getElementById("saveAsImage");
const deleteNodeBtn = document.getElementById("deleteNode");

let flowchartData = "graph LR;";
let nodeId = 1;
let nodes = [];

function updateFlowchart() {
    flowchartContainer.innerHTML = `<div class="mermaid">${flowchartData}</div>`;
    mermaid.init(undefined, document.querySelectorAll(".mermaid"));
}

function appendNode(text) {
    flowchartData += `A${nodeId}("${text}");`;
    nodes.push({ id: `A${nodeId}`, text: text });
    nodeId++;
}

function populateLoopToOptions() {
    loopToOptions.innerHTML = "";
    nodes.forEach(node => {
        const option = document.createElement("option");
        option.value = node.id;
        option.text = node.text;
        loopToOptions.add(option);
    });
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
    if (nodeId > 2) {
        populateLoopToOptions();
        loopToSelector.style.display = "block";
    }
});

confirmLoopBtn.addEventListener("click", () => {
    const selectedNodeId = loopToOptions.value;
    flowchartData += `A${nodeId - 1}-->${selectedNodeId};`;
    updateFlowchart();
    loopToSelector.style.display = "none";
});

choiceBtn.addEventListener("click", () => {
    appendNode(inputText.value);
    if (nodeId > 2) {
        flowchartData += `A${nodeId - 2}-->|Yes|A${nodeId - 1};`;
        appendNode("Sample No Text");
        flowchartData += `A${nodeId - 3}-->|No|A${nodeId - 1};`;
    }
    updateFlowchart();
});

decisionBtn.addEventListener("click", () => {
    appendNode(inputText.value);
    if (nodeId > 2) {
        flowchartData += `A${nodeId - 2}-->|No|A${nodeId - 1};`;
        appendNode("Sample Yes Text");
        flowchartData += `A${nodeId - 3}-->|Yes|A${nodeId - 1};`;
    }
    updateFlowchart();
});

// Save as Image and Delete Node buttons
// ...
