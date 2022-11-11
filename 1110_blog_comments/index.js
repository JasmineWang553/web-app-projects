const express = require("express");
// const { rmSync } = require("fs");
const app = express();
const path = require("path")
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
// const { redirect } = require("express/lib/response");

app.use(express.json());
app.use(express.urlencoded());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'))

///// STYLING /////
app.set('public', path.join(__dirname, '/public'));
app.use(express.static(path.join(__dirname, '/public')));
// app.use(express.static(path.join(__dirname, '/node_modules')));
// app.use(express.static(path.join(__dirname, '/node_modules')));
// app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

///// SHOW COMMENTS /////
app.get("/comments", (req, res) => {
    res.render("index", { comments })
})

///// CREATE COMMENTS /////
app.get("/comments/post", (req, res) => {
    res.render("newComment");
})

app.post("/comments/post", (req, res) => {
    const { username, content } = req.body
    const id = uuid()
    comments.push({ id: id, username: username, comment: content })
    res.redirect("/comments");
})

////// SHOW COMMENTS DETAIL /////
app.get("/comments/:id", (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id == id)
    res.render("show", { comment })
})

////// DELETE COMMENT //////
app.delete("/comments/:id", (req, res) => {
    const { id } = req.params
    comments = comments.filter(c => c.id !== id)
    res.redirect("/comments");
})

////// EDIT COMMENT //////
app.get("/comments/:id/edit", (req, res) => {
    const { id } = req.params;
    let comment = comments.find(c => c.id == id);
    res.render("edit", { comment })
})

app.patch("/comments/:id/edit", (req, res) => {
    const { id } = req.params;
    let newComment = req.body.comment;
    let comment = comments.find(c => c.id == id);
    comment.comment = newComment;
    res.redirect("/comments")
})

app.listen(8000, () => {
    console.log("listening on port 8000")
})