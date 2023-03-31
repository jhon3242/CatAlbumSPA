export default function Nodes({$app, initialState, onclick, onBackClick}) {
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "Nodes";
    this.onclick = onclick;
    this.onBackClick = onBackClick;
    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        render();
    }

    const render = () => {
        if (this.state.nodes) {
            let nodeTemplates = "";

            !this.state.isRoot ? nodeTemplates += `<div class="Node">
            <img src="./assets/prev.png">
          </div>` : "";

            nodeTemplates += this.state.nodes.map((node) => {
                const iponPath = node.type === "FILE" ? "./assets/file.png" : "./assets/directory.png";
                return `<div class="Node" data-node-id="${node.id}">
                <img src=${iponPath} data-node-id="${node.id}">
                <div>${node.name}</div>
              </div>`
            }).join("");
            this.$target.innerHTML = nodeTemplates;
        }

        this.$target.querySelectorAll(".Node").forEach($node => {
            $node.addEventListener("click", (e) => {
                const nodeId = e.target.dataset.nodeId;
                if (!nodeId) {
                    this.onBackClick();
                    return ;
                }
                const selectedNode = this.state.nodes.find(node => node.id === nodeId);
                if (selectedNode){
                    this.onclick(selectedNode);
                }
            })
        })
    }
}