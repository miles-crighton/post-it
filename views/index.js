let sendMessage = () => {
    console.log(document.getElementById('message').value)
    fetch("http://127.0.0.1:3000/add", {
        method: "POST",
        body: JSON.stringify(document.getElementById('message').value)
    }).then(res => {
        console.log("Request complete! response:", res);
    });
}