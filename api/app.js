const express = require("express");
const app = express();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
})

const getExt = (mimeType => {
        switch (mimeType) {
            case "image/png":
                return ".png"
            default:
                return ".jpg"
        }
    })

const upload = multer({ storage: storage })


app.use(express.json());

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

app.post("/api/posts", upload.single('post_image'), (req, res) => {    
    const newPost = {
        "id": `${Date.now()}`,
        "title": req.body.title,
        "post_image": req.file.path,
        "content": req.body.content,
        "added_dates": `${Date.now()}`
    }
    postsData.add(newPost)
    res.status(201).send(newPost)
})

app.listen(3000, () => {
    console.log("Listening on http://localhost:3000")
})