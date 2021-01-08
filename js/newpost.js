const API_URL = "http://localhost:3000/api/posts"

const submitNewPost = () => {
    const title = document.getElementById('new-post-title').value;
    const content = document.getElementById('new-post-content').value;
    const image = document.getElementById('new-post-image');
    let data = new FormData()
    data.append("post_image", image.files[0])
    data.append("title", title)
    data.append("content", content)

    console.log("subnitting..")
    fetch(API_URL, {
        method: "POST",
        body: data
    }).then(() => {
        console.log("ok")
        setTimeout(() => {
            console.log("redirecting..")
            window.location.href = "index.html"
        }, 1000)
    }).catch(err => {
        console.log(err)
    })
}