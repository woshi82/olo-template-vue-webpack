/**
 * 服务请求
 */
const API_ROOT = '/api/v1/';

function callApi(endpoint, postParam, method) {
    let fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
    let options = {};
    let parseParams = '';
    for(name in postParam) {
        parseParams += name + '=' + postParam[name] + '&';
    }
    if (method === 'GET'){
        fullUrl += '&' + parseParams;
        options = {
            method: method.toLowerCase()
        };
    } else {
        options = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            },
            method: method && method.toLowerCase() || 'post',
            body: parseParams,
        };
    }
    return new Promise((resolve, reject) => {
        fetch(fullUrl, options)
            .then(response =>
                response.json().then(json => ({ json, response }))
            ).then(({ json, response }) => {
                if (response.status != 200 || json.status !== 0) {
                    return Promise.reject(json);
                }
                return json;
            })
            .then(
                response => (resolve(response)),
                error => (reject(error)),
            );
    });
}

export const fetchToken = () => callApi(`oauth/token?`, {
    grant_type: 'client_credentials',
    client_id: '2_MzEzOTkyMzQ0MDg5YzU5ZWI4YzJkZTdiYjRmMzNjMjJiYjIzYj',
    client_secret: 'MjVjYmI0NDc3MDhjMDg1YjliZTkyOWI5ODY1NGI0YTc1MjlhM2',
    token: 'cea1d17dd1c2ecb69c62be9f18ae3d0a'
});
export const fetchLogin = () => callApi(`login?`);

