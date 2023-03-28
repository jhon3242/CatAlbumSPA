const express = require("express");
const path = require("path");

const app = express();
const port = 8080;

app.listen(port, () => console.log("Server running..."));


app.get("/", (req, res) => {
    res.send("hello");
})

app.get("/api/root", (req, res) => {
    const result = [{"id":"1","name":"노란고양이","type":"DIRECTORY","filePath":null,"parent":null},{"id":"3","name":"까만고양이","type":"DIRECTORY","filePath":null,"parent":null},{"id":"10","name":"고등어무늬 고양이","type":"DIRECTORY","filePath":null,"parent":null},{"id":"13","name":"삼색이 고양이","type":"DIRECTORY","filePath":null,"parent":null},{"id":"14","name":"회색고양이","type":"DIRECTORY","filePath":null,"parent":null},{"id":"20","name":"하얀고양이","type":"DIRECTORY","filePath":null,"parent":null}];
    res.send(JSON.stringify(result));
})


app.get("/api/root/*", (req,res) => {
    const infos = {
        1 : [{"id":"5","name":"2021/04","type":"DIRECTORY","filePath":null,"parent":{"id":"1"}},{"id":"19","name":"물 마시는 사진","type":"FILE","filePath":"/images/a2i.jpg","parent":{"id":"1"}}],
        2 : [{"id":"8","name":"1","type":"FILE","filePath":"/images/1.jpg","parent":{"id":"2"}},{"id":"9","name":"2","type":"FILE","filePath":"/images/2.jpg","parent":{"id":"2"}}],
        3 : [{"id":"6","name":"2021/04","type":"DIRECTORY","filePath":null,"parent":{"id":"3"}}],
        4 : [{"id":"21","name":"세숫대야","type":"FILE","filePath":"/images/1mt.jpg","parent":{"id":"4"}}],
        5 : [{"id":"2","name":"2021/04/12","type":"DIRECTORY","filePath":null,"parent":{"id":"5"}}],
        6 : [{"id":"4","name":"2021/04/13","type":"DIRECTORY","filePath":null,"parent":{"id":"6"}},{"id":"7","name":"2021/04/01","type":"DIRECTORY","filePath":null,"parent":{"id":"6"}}],
    }
    const regex = /\/api\/root\/(\d+)/;
    const match = req.path.match(regex);
    const number = match ? match[1] : null;
    if (!number) {
        res.status(404).send("fail");
    }
    res.status(200).send(infos[number])
})
