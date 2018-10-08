export function getData(url,callback,json=''){
    fetch(url, {
        method: 'POST', 
        credentials: "include", // 带上 cookie
        body: JSON.stringify(json),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => {
            console.log(data);
            callback(data);
        });
}