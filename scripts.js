const inputText = document.getElementById("inputText");
const nextStepBtn = document.getElementById("nextStepBtn");
const loopBtn = document.getElementById("loopBtn");
const choiceBtn = document.getElementById("choiceBtn");
const choiceTextContainer = document.getElementById("choiceTextContainer");
const choiceTextYes = document.getElementById("choiceTextYes");
const choiceTextNo = document.getElementById("choiceTextNo");
const decisionBtn = document.getElementById("decisionBtn");
const deleteNodeBtn = document.getElementById("deleteNodeBtn");
const saveAsImageBtn = document.getElementById("saveAsImageBtn");
const flowchartContainer = document.getElementById("flowchartContainer");
const lineStyle = document.getElementById("lineStyle");
const boxShape = document.getElementById("boxShape");
const boxColor = document.getElementById("boxColor");

let nodeId = 1;
let flowchartData = "";

function updateFlowchart() {
    mermaid.mermaidAPI.initialize({
        startOnLoad: false,
        theme: "default",
        flowchart: {
            curve: lineStyle.value,
            useMaxWidth: true,
            htmlLabels: true
        },
        shapeDefaults: {
            node: {
                shape: boxShape.value,
                style: `fill:${boxColor.value};stroke:${boxColor.value};`
            }
        }
    });

    const graphDefinition = "graph LR;" + flowchartData;
    const svgGraph = mermaid.mermaidAPI.render("graphDiv", graphDefinition, () => { });
    flowchartContainer.innerHTML = svgGraph;
}

function appendNode(text) {
    flowchartData += `A${nodeId++}("${text}");`;
}

nextStepBtn.addEventListener("click", () => {
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
        flowchartData += `A${nodeId - 1}-->A1;`;
    }
    updateFlowchart();
});

choiceBtn.addEventListener("click", () => {
    choiceTextContainer.style.display = "inline";
    decisionBtn.style.display = "inline";
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

deleteNodeBtn.addEventListener("click", () => {
    if (nodeId > 1) {
        flowchartData = flowchartData.slice(0, -14);
        nodeId--;
        updateFlowchart();
    }
});

saveAsImageBtn.addEventListener("click", () => {
    const svg = flowchartContainer.querySelector("svg");
    const serializer = new XMLSerializer();
    const svgBlob = new Blob([serializer.serializeToString(svg)], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "flowchart.svg";
    a.click();

    URL.revokeObjectURL(url);
});
