const PREFIX_IMG_PATH = `https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public`;

export default function ImageViews ({$app, initialState}) {
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "Modal ImageView";
    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        render();
    }

    const render = () => {
        this.$target.innerHTML = `<div class="content">${
            this.state ? `<img src = "${PREFIX_IMG_PATH}${this.state}" />` : ""
        }</div>`;
        this.$target.style.display = this.state ? "block" : "none";
        document.addEventListener("keydown", (e) => {
            if (e.key === 'Escape') {
                this.$target.style.display = "none";
            }
        })
    }
}