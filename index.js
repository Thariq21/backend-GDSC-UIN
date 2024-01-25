const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000
const posts = []
var{getRandomNumber}=require("../meet3/utils/randomNumber")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({
      "message": "this is home path"
    })
  })

app.get('/post', (req, res) => {
  res.json({
    "message": posts
  })
})

app.post('/post', (req, res) => {
    if (!req.body.title || !req.body.description) {
        res.json({
            "message": "Tidak boleh kosong"
        })
        return
    }
    posts.push({
        id: getRandomNumber(10),
        title: req.body.title,
        description: req.body.description
    })
    res.json({
        "message": "Yeay berhasil"
    })
  })

app.put('/post/:postid', (req, res) => {
    const postid= req.params.postid
    for (let index = 0; index < posts.length; index++) {
        if (postid==posts[index].id) {
            if (!req.body.title || !req.body.description) {
                res.json({
                    "message": "Masukin ulang, Ga boleh kosong!!!"
                })
                return
            }
            posts[index].title= req.body.title
            posts[index].description= req.body.description
            res.json({
                "message": "Berhasil mengupdate post"
            })
            retur
        }  
    }
    res.json({
        "message": "post not found"
    })
  })

app.delete('/post/:postid', (req, res) => {
    const postid= req.params.postid
    for (let index = 0; index < posts.length; index++) {
        if (postid==posts[index].id) {
            posts.splice(index,1)
            res.json({
                "message": "pesan dihapus"
            })            
        }
        
    }
    res.json({
        "message": "post tidak ditemukan"
    })
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})