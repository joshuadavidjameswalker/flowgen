const inputText = document.getElementById("inputText");
const nextStepBtn = document.getElementById("nextStepBtn");
const addLoopBtn = document.getElementById("addLoopBtn");
const addDecisionPointBtn = document.getElementById("addDecisionPointBtn");
const choiceTextContainer = document.getElementById("choiceTextContainer");
const choiceTextYes = document.getElementById("choiceTextYes");
const choiceTextNo = document.getElementById("choiceTextNo");
const decisionBtn = document.getElementById("decisionBtn");
const deleteNodeBtn = document.getElementById("deleteNodeBtn");
const saveAsImageBtn = document.getElementById("saveAsImageBtn");
const flowchart = document.getElementById("flowchart");

let nodeId = 0;
let flowchartData = "";

function updateFlowchart() {
    flowchart.innerHTML = flowchartData;
    // Add your preferred flowchart library to render the flowchart
}

function appendNode(text) {
    flowchartData += `A${nodeId++}->|${text}|A${nodeId};`;
}

nextStepBtn.addEventListener("click", () => {
    appendNode(inputText.value);
    updateFlowchart();
});

addLoopBtn.addEventListener("click", () => {
    // Add your loop creation logic here
});

addDecisionPointBtn.addEventListener("click", () => {
    choiceTextContainer.style.display = "block";
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
});

deleteNodeBtn.addEventListener("click", () => {
    // Add your node deletion logic here
});

saveAsImageBtn.addEventListener("click", () => {
    // Add your save as image logic here
});
