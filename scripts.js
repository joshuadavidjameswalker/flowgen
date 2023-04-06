const inputText = document.getElementById("inputText");
const nextStepBtn = document.getElementById("nextStepBtn");
const loopToBtn = document.getElementById("loopToBtn");
const choiceBtn = document.getElementById("choiceBtn");
const choiceTextContainer = document.getElementById("choiceTextContainer");
const choiceTextYes = document.getElementById("choiceTextYes");
const sampleNoTextInput = document.getElementById("sampleNoTextInput"); // New input field for No option
const decisionBtn = document.getElementById("decisionBtn");
const loopToContainer = document.getElementById("loopToContainer");
const loopToInput = document.getElementById("loopToInput");
const loopToConfirmBtn = document.getElementById("loopToConfirmBtn");
const saveAsImageBtn = document.getElementById("saveAsImageBtn");
const deleteNodeBtn = document.getElementById("deleteNodeBtn");

let nodeId = 1;
let flowchartData = "";

function appendNode(text) {
    flowchartData += `A${nodeId}(${text});`;
    nodeId++;
}

function updateFlowchart() {
    mermaid.render("generatedGraph", `graph TD;${flowchartData}`, (svgCode) => {
        document.getElementById("chart").innerHTML = svgCode;
    });
}

nextStepBtn.addEventListener("click", () => {
    appendNode(inputText.value);
    updateFlowchart();
});

loopToBtn.addEventListener("click", () => {
    loopToContainer.style.display = "block";
});

choiceBtn.addEventListener("click", () => {
    choiceTextContainer.style.display = "block";
    decisionBtn.style.display = "block";
});

decisionBtn.addEventListener("click", () => {
    const yesText = choiceTextYes.value || "Yes";
    const noText = sampleNoTextInput.value || "No"; // Get the value of the new input field, or default to "No"

    appendNode(inputText.value);
    if (nodeId > 2) {
        flowchartData += `A${nodeId - 2}-->|${yesText}|A${nodeId - 1};`;
        appendNode(noText); // Use the value of the new input field for the "No" option
        flowchartData += `A${nodeId - 3}-->|${noText}|A${nodeId - 1};`;
    }

    updateFlowchart();
    choiceTextContainer.style.display = "none";
    decisionBtn.style.display = "none";
});

loopToConfirmBtn.addEventListener("click", () => {
    const loopTo = loopToInput.value;

    if (loopTo < nodeId) {
        flowchartData += `A${nodeId - 1}-->A${loopTo};`;
    }

    updateFlowchart();
    loopToContainer.style.display = "none";
});

saveAsImageBtn.addEventListener("click", () => {
    const svg = document.getElementById("chart").querySelector("svg");
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "flowchart.svg";
    link.click();
    URL.revokeObjectURL(url);
});

deleteNodeBtn.addEventListener("click", () => {
    if (nodeId > 1) {
        nodeId--;
        flowchartData = flowchartData.replace(new RegExp(`A${nodeId}\\([^)]+\\);`), "");
        updateFlowchart();
    }
});

mermaid.initialize({ startOnLoad: true });

updateFlowchart();
