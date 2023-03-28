import RootView from "./views/RootView.js";

const $ = (path) => document.querySelector(path);
const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
}
const router = () => {
    // const routes = [
    //     { path : "/", view : RootView},
    // ];
    //
    // let match = routes
    //     .map(route => {
    //         return {
    //             isMatch : location.pathname === route.path,
    //             route
    //         }})
    //     .find(route => route.isMatch);
    // if (!match) {
    //     alert("No match route.");
    //     match = {
    //         route : routes[0],
    //         isMatch: true,
    //     };
    // }
    fetch("/api/root")
        .then(response => response.json())
        .then(data => console.log(data));
    // const view = new match.route.view();
    // console.log(view.getHtml());
    // $("#myApp").innerHTML = view.getHtml();
}

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.dataset.url);
        }
    })
    router();
})