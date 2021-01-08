const API_URL = "http://localhost:3000/api/posts"
const API_BASE_URL = "http://localhost:3000/"

window.onload = () => {
    getPosts();
}

const getPosts = () => {
    console.log('getting posts')
    fetch(API_URL, {
        method: 'GET'
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        buildPosts(data);
    })
    .catch(err => {
        console.log(err)
    })
}

const buildPosts = (blogPosts) => {
    let postContent = ""
    for (let post of blogPosts) {
        postContent += buildPostHTML(post)
    }
    document.getElementById('posts').innerHTML = postContent
}



const buildPostHTML = (post) => {
    const postDate = new Date(parseInt(post.added_date)).toDateString()
    return `<a href="/post.html?id=${post.id}" class="post-link">
    <div id="${post.id}" class="post">
<div class="post-image" style="background-image: url(${API_BASE_URL}${post.post_image})"></div>
<div class="post-content">
    <div class="post-date">${postDate}</div>
    <div class="post-title"><h4>${post.title}</h4></div>
    <div class="post-text">${post.content}</div>
</div>
</div>
</a>`
}