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
const choiceTextContainer = document.getElementById("choiceTextContainer");
const choiceTextYes = document.getElementById("choiceTextYes");
const choiceTextNo = document.getElementById("choiceTextNo");

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
    choiceTextYes.value = "";
    choiceTextNo.value = "";
    choiceTextContainer.style.display = "block";
    decisionBtn.style.display = "inline";
});

decisionBtn.addEventListener("click", () => {
    const yesText = choiceTextYes.value || "Yes";
    const noText = choiceTextNo.value || "No";

    appendNode(inputText.value);
    if (nodeId > 2) {
        flowchartData += `A${nodeId - 2}-->|${yesText}|A${nodeId - 1};`;
        appendNode("Sample No Text");
        flowchartData += `A${nodeId - 3}-->|${noText}|A${nodeId - 1};`;
    }

    updateFlowchart();
    choiceTextContainer.style.display = "none";
    decisionBtn.style.display = "none";
});
saveAsImageBtn.addEventListener("click", () => {
    const svgElement = flowchartContainer.querySelector("svg");
    if (svgElement) {
        saveSvgAsPng(svgElement, "flowchart.png");
    }
deleteNodeBtn.addEventListener("click", () => {
    if (nodeId > 1) {
        const removedNode = nodes.pop();
        flowchartData = flowchartData.replace(new RegExp(`${removedNode.id}\\("(.+?)"\\);`, "g"), "");
        flowchartData = flowchartData.replace(new RegExp(`A${nodeId - 2}-->.*?${removedNode.id};`, "g"), "");
        nodeId--;
        updateFlowchart();
    }
});

// Add event listeners for highlighting the selected button
[nextStepBtn, loopToBtn, choiceBtn].forEach(btn => {
    btn.addEventListener("click", () => {
        [nextStepBtn, loopToBtn, choiceBtn].forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
    });
});

// Save as Image implementation (Add this to the bottom of the script)
function saveSvgAsPng(svgElement, fileName) {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData));

    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
       
        ctx.drawImage(img, 0, 0);
        const imgURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgURL;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
});
