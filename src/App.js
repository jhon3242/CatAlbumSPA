import request from "./api.js";
import Breadcrumb from "./Breadcrumb.js"
import Nodes from "./Nodes.js"
import ImageViews from "./ImageViews.js"

export default function App($app) {

    this.target = $app;
    this.state = {
        isRoot : false,
        nodes : [],
        depth : [],
        selectedFilePath : null,
    }
    const imageViews = new ImageViews({$app, initialState :
        this.state.selectedFilePath
        , onclick : () => {

        }})
    const breadcrumb = new Breadcrumb({$app, initialState : this.state.depth});
    const nodes = new Nodes({$app, initialState: {
            isRoot : this.state.isRoot,
            nodes : this.state.nodes,
        }, onclick : async (node) => {
            if (node.type === "FILE") {
                setState({
                    ...this.state,
                    selectedFilePath : node.filePath
                })
            } else if (node.type === "DIRECTORY") {
                const nextNodes = await request(node.id);
                setState({
                    isRoot : false,
                    nodes : nextNodes,
                    depth : [...this.state.depth, node]
                });
            }
        }, onBackClick : async () => {
            const prevNode = this.state.depth[this.state.depth.length - 2];
            const prevNodes = await request(prevNode?.id);
            setState({
                isRoot : this.state.depth.length <= 1,
                nodes : prevNodes,
                depth : this.state.depth.splice(0, this.state.depth.length - 1)
            })
        }})

    const setState = (nextState) => {
        this.state = nextState;
        breadcrumb.setState(this.state.depth)
        nodes.setState({
            isRoot : this.state.isRoot,
            nodes : this.state.nodes,
        })
        imageViews.setState(
            this.state.selectedFilePath
        )
    }


    const init = async () => {
        try {
            const rootNodes = await request();
            const nextState = {
                ...this.state,
                isRoot : true,
                nodes : rootNodes,
            }
            setState(nextState);
        } catch (err) {
            console.log(`Error : ${err}`);
        }
    }
    init();
}