const API_URL = "http://localhost:3000/api/posts/";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPost();
}

const getPostIdParams = () => {
    const str = window.location.search
    const urlParams = new URLSearchParams(str)
    if (urlParams.get('id'))
        return urlParams.get('id')
    window.location.href = "/"
}

const getPost = () => {
    const postId = getPostIdParams();
    fetch(API_URL + postId, {
        method: 'GET'
    })
    .then(res => {
        return res.json()
    })
    .then(data => {
        buildPost(data)
    })
    .catch(err => {
        console.log(err);
        window.location.href = "/"
    })

}

const buildPost = (postData) => {
    console.log(postData)
    document.querySelector('header').style.backgroundImage = `url(${API_BASE_URL}${postData.post_image})`
    document.getElementById('individual-post-title').innerText = postData.title;
    document.getElementById('individual-post-text').innerText = postData.content;
    const postDate = "Published on " + new Date(parseInt(postData.added_date)).toDateString();
    document.getElementById('individual-post-date').innerText = postDate;
}
