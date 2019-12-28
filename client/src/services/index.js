import axios from 'axios';
import { url } from "@/urls";

export const service = {

    async onPost(api_url, payload) {
        var config = {
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        };
        let access_token = localStorage.getItem("token");
        if (access_token) config['headers']['Authorization'] = 'Bearer ' + access_token;
        return await axios.create().post(url.baseUrl + api_url, payload, config);
    },
    async onGet(baseUrl, app_url) {
        return await axios.get(baseUrl + app_url);
    },
    async  onUpload(app_url, payload, progress) {
        return await axios.post(url.baseUrl + app_url, payload, progress);
    },
    async onDownload(app_url) {
        return await axios.get(url.baseUrl + app_url);
    }
}
