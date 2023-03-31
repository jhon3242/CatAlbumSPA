export default function Loading({$app, initialState}) {
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "Loading Modal";
    $app.appendChild(this.$target);

    this.showLoadingToggle = () => {
        console.log(`status : ${this.state}`);
        this.state = !this.state;
        render();
    }

    const render = () => {
        this.$target.innerHTML = `<div class="content"><img src="./assets/nyan-cat.gif"></div>`;
        this.$target.style.display = this.state ? "block" : "none";
    }
}