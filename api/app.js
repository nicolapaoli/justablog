const express = require("express");
const app = express();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next()
})

app.use('/uploads', express.static('uploads'))

const Post = require('./api/models/posts.js');

const postsData = new Post()

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
})

app.get("/api/posts", (req, res) => {
    res.status(200).send(postsData.get())
})

app.get("/api/posts/:post_id", (req, res) => {
    const id = req.params.post_id
    const post = postsData.getIndividualBlog(id)
    if (post)
        return res.status(200).send(post)
    else
        return res.status(404).error("Not found")
})

app.post("/api/posts", (req, res) => {
    
})

app.listen(3000, () => {
    console.log("Listening on http://localhost:3000")
})