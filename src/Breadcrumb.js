export default function Breadcumb({$app, initialState}) {

    this.state = initialState;
    this.$target = document.createElement("nav");
    this.$target.className = "Breadcrumb";

    $app.appendChild(this.$target);

    this.setState = (nextState) => { // this. 으로 함수를 생성하는 이유는 App 에서 호출하기 위해
        this.state = nextState;
        render();
    }

    const render = () => {
        this.$target.innerHTML = `<div>root</div>`;
        if (this.state.length > 0) {
            this.$target.innerHTML += this.state.map(node => {
                return `<div>${node.name}</div>`;
            }).join("");
        }
    };
}