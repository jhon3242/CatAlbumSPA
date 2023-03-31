import request from "./api.js";
import Breadcrumb from "./Breadcrumb.js"
import Nodes from "./Nodes.js"
import ImageViews from "./ImageViews.js"
import Loading from "./Loading.js"

const caches = {

}

export default function App($app) {

    this.target = $app;
    this.state = {
        isRoot : false,
        nodes : [],
        depth : [],
        selectedFilePath : null,
    }

    const breadcrumb = new Breadcrumb({$app, initialState : this.state.depth});
    const nodes = new Nodes({$app, initialState: {
            isRoot : this.state.isRoot,
            nodes : this.state.nodes,
        }, onclick : async (node) => {
            loading.showLoadingToggle();
            if (node.type === "FILE") {
                setState({
                    ...this.state,
                    selectedFilePath : node.filePath
                })
            } else if (node.type === "DIRECTORY") {
                let nextNodes;
                if (caches[node.id]) {
                    nextNodes = caches[node.id];
                } else {
                    nextNodes = await request(node.id);
                    caches[node.id] = nextNodes;
                }
                setState({
                    isRoot : false,
                    nodes : nextNodes,
                    depth : [...this.state.depth, node]
                });
            }
            loading.showLoadingToggle();
        }, onBackClick : async () => {
            loading.showLoadingToggle();
            let prevNode = this.state.depth[this.state.depth.length - 2];
            let prevNodes;
            if (!prevNode) {
                caches["root"] = caches["root"] ? caches["root"] : await request("");
                prevNodes = caches["root"];
            } else if (caches[prevNode.id]) {
                prevNodes = caches[prevNode.id];
            } else if (prevNodes && !caches[prevNode.id]) {
                prevNodes = await request(prevNode?.id);
            }

            setState({
                isRoot : this.state.depth.length <= 1,
                nodes : prevNodes,
                depth : this.state.depth.splice(0, this.state.depth.length - 1)
            })
            loading.showLoadingToggle();
        }})
    const imageViews = new ImageViews({$app, initialState : this.state.selectedFilePath})
    const loading = new Loading({$app, initialState : false});

    const setState = (nextState) => {
        this.state = nextState;
        breadcrumb.setState(this.state.depth)
        nodes.setState({
            isRoot : this.state.isRoot,
            nodes : this.state.nodes,
        })
        imageViews.setState(this.state.selectedFilePath)
    }


    const init = async () => {
        try {
            loading.showLoadingToggle();
            const rootNodes = await request();
            caches["root"] = rootNodes;
            const nextState = {
                ...this.state,
                isRoot : true,
                nodes : rootNodes,
            }
            setState(nextState);
        } catch (err) {
            console.log(`Error : ${err}`);
        } finally {
            loading.showLoadingToggle();
        }
    }
    init();
}