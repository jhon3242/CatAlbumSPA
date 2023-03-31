const BASE_API_URL = "https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/";

export default async function request(nodeId){
    const path = `${BASE_API_URL}${nodeId ? nodeId : ""}`;
    console.log("requesting...");
    const resopens = await fetch(path);
    console.log("request done.");
    if (!resopens.ok){
        throw new Error("API 요청 에러");
    }

    return resopens.json();
}