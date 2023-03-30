

const API_BASE_URL = "https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/";
const request = async (nodeId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${nodeId ? nodeId : ""}`);
        if (!response.ok) {
            throw new Error("서버 요청에서 에러가 발생했습니다.");
        }
        return response.json();
    } catch (err) {
        throw new Error(`Error : ${err}`);
    }
}

export default request;