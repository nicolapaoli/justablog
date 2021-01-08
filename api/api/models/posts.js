const { raw } = require('express')
const fs = require('fs')

const PATH = 'data.json'

class Post {

    readData() {
        const rawdata = fs.readFileSync(PATH)
        return JSON.parse(rawdata)
    }

    get() {
        return this.readData()
    }

    getIndividualBlog(post_id) {
        const currentPosts = this.readData()
        return currentPosts.find(post => post.id == post_id);
    }

    add(newPost) {
        const currentPosts = this.readData();
        currentPosts.unshift(newPost);
        this.storeData(currentPosts);
    }

    storeData(rawdata) {
        let data = JSON.stringify(rawdata)
        fs.writeFileSync(PATH, data)
    }
}

module.exports = Post