const fs = require ("fs");
const express = require("express");

const path = require("path");
const app = express();

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/api/notes", function(req, res){
    fs.readFile("./db/db.json", "utf-8", function(err, data){
        if(err){
            throw err;
        }
       const notes = JSON.parse(data);
       console.log(notes);
       return res.json(notes);
    });
})

app.post("/api/notes",function(req, res){
    const note = req.body;
    fs.readFile("./db/db.json", "utf-8", function(err, data){
        if(err){
            throw err;
        }
       let notes = JSON.parse(data);
       notes.push(note);
       notes = JSON.stringify(notes);
    fs.writeFile("./db/db.json", notes, function(err){
        if(err){
            throw err;
        }
    })
    });
    return res.json(note);
})
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, '../Develop/public/notes.html'));
})

app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, '../Develop/public/index.html'));
})

app.listen(PORT, function(){
    console.log("app listening...", PORT);
})

