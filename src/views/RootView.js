import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
    }

    async getApi(){
        const res = await fetch('/root');
    }

    async getHtml() {
        await this.getApi();

        return `
            <h1> root </h1>
        `
    }
}