const nodes = [];
const connections = [];

function appendNode(text) {
  const node = {
    id: nodes.length + 1,
    text: text,
  };
  nodes.push(node);
}

function addConnection(source, target, label) {
  connections.push({ source, target, label });
}

function updateFlowchart() {
  let flowchartData = "graph LR;\n";
  for (const node of nodes) {
    flowchartData += `A${node.id}("${node.text}");\n`;
  }

  for (const connection of connections) {
    flowchartData += `A${connection.source}-->|${connection.label}|A${connection.target};\n`;
  }

  document.querySelector("#flowchart").innerHTML = flowchartData;
  mermaid.init(undefined, "#flowchart");
}

nextStepBtn.addEventListener("click", () => {
  appendNode(inputText.value);
  if (nodes.length > 1) {
    addConnection(nodes.length - 1, nodes.length, "");
  }
  updateFlowchart();
});

decisionBtn.addEventListener("click", () => {
  const yesText = choiceTextYes.value || "Yes";
  const noText = choiceTextNo.value || "No";

  appendNode(inputText.value);
  addConnection(nodes.length - 1, nodes.length, yesText);
  appendNode(yesText);
  addConnection(nodes.length - 1, nodes.length, "");

  appendNode(noText);
  addConnection(nodes.length - 3, nodes.length, noText);
  updateFlowchart();
  choiceTextContainer.style.display = "none";
  decisionBtn.style.display = "none";
});

addDecisionPointBtn.addEventListener("click", () => {
  choiceTextContainer.style.display = "block";
  decisionBtn.style.display = "block";
});

addLoopBtn.addEventListener("click", () => {
  const loopTo = parseInt(loopToNode.value);
  if (loopTo >= 1 && loopTo < nodes.length) {
    addConnection(nodes.length, loopTo, "");
    updateFlowchart();
  }
});

deleteNodeBtn.addEventListener("click", () => {
  if (nodes.length > 0) {
    nodes.pop();
    connections.pop();
    updateFlowchart();
  }
});
