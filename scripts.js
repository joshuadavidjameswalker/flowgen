const inputText = document.getElementById("inputText");
const nextBtn = document.getElementById("nextBtn");
const loopBtn = document.getElementById("loopBtn");
const choiceBtn = document.getElementById("choiceBtn");
const saveBtn = document.getElementById("saveBtn");
const deleteNodeBtn = document.getElementById("deleteNodeBtn");
const loopOptions = document.getElementById("loopOptions");
const choiceTextYes = document.getElementById("choiceTextYes");
const choiceTextNo = document.getElementById("choiceTextNo");
const decisionBtn = document.getElementById("decisionBtn");
const flowchartContainer = document.getElementById("flowchartContainer");

let nodeId = 1;
let flowchartData = "";

function updateFlowchart() {
    flowchartContainer.innerHTML = flowchartData;
    mermaid.init(undefined, ".flowchart");
}

function appendNode(text) {
    flowchartData += `A${nodeId}("${text}");`;
    nodeId++;
}

nextBtn.addEventListener("click", () => {
    appendNode(inputText.value);
    if (nodeId > 2) {
        flowchartData += `A${nodeId - 2}-->A${nodeId - 1};`;
    }
    updateFlowchart();
});

loopBtn.addEventListener("click", () => {
    appendNode(inputText.value);
    if (nodeId > 2) {
        flowchartData += `A${nodeId - 2}-->A${nodeId - 1};`;
    }
    updateFlowchart();
    loopOptions.style.display = "block";
});

choiceBtn.addEventListener("click", () => {
    appendNode(inputText.value);
    if (nodeId > 2) {
        flowchartData += `A${nodeId - 2}-->|Yes|A${nodeId - 1};`;
    }
    updateFlowchart();
    choiceTextYes.style.display = "block";
    choiceTextNo.style.display = "block";
    decisionBtn.style.display = "block";
});

decisionBtn.addEventListener("click", () => {
    const yesText = choiceTextYes.value || "Yes";
    const noText = choiceTextNo.value || "No";
    flowchartData += `A${nodeId - 1}-->|${yesText}|A${nodeId};`;
    appendNode("Yes");
    flowchartData += `A${nodeId - 2}-->|${noText}|A${nodeId};`;
    appendNode("No");
    updateFlowchart();
    choiceTextYes.style.display = "none";
    choiceTextNo.style.display = "none";
    decisionBtn.style.display = "none";
});

deleteNodeBtn.addEventListener("click", () => {
    nodeId--;
    flowchartData = flowchartData.split(";").slice(0, -1).join(";") + ";";
    updateFlowchart();
});

saveBtn.addEventListener("click", () => {
    const flowchartSVG = document.querySelector("svg");
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(flowchartSVG);

    const a = document.createElement("a");
    const url = URL.createObjectURL(new Blob([source], { type: "image/svg+xml" }));
    a.href = url;
    a.download = "flowchart.svg";
    a.click();
    URL.revokeObjectURL(url);
});
