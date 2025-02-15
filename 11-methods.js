const express = require('express')
const app = express()
let { people } = require('./data')

// static assets
app.use(express.static('./methods-public'))

// parse form data
// 這是 HTML 表單（form）預設的提交格式
// 當你在 <form> 中使用 POST 提交數據時
// 數據會被轉換成 key=value&key=value 這種格式，例如：
// name=Tom&age=25，如果沒有 express.urlencoded()，Express 無法解析這種請求體
app.use(express.urlencoded({ extended: false }))

// parse json
// 當客戶端發送 JSON 格式的請求體（request body） 時，
// 這行代碼會讓 Express 能夠正確解析該數據，
// 並將解析後的 JavaScript 對象 存入 req.body，方便路由處理器使用。
app.use(express.json())

app.post('/login', (req, res) => {
    // 使用urlencoded
    const { name } = req.body
    if (name) {
        return res.status(200).send(`Welcome ${name}`)
    }

    res.status(401).send('Please Provide Credentials')
})

app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people })
})

app.post('/api/people', (req, res) => {
    // res.status(201).send('Success')
    const { name } = req.body
    if (!name) {
        return res
            .status(400)
            .json({ success: false, msg: 'please provide name value' })
    }
    res.status(201).json({ success: true, person: name })
})

app.post('/api/postman/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res
            .status(400)
            .json({ success: false, msg: 'please provide name value' })
    }
    res.status(201).json({ success: true, data: [...people, name] })
})



app.put('/api/people/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body

    // console.log(id, name)
    // res.send(`Welcome ${name}`)

    const person = people.find((person) => person.id === Number(id))

    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `no person with id ${id}` })
    }
    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name
        }
        return person
    })
    res.status(200).json({ success: true, data: newPeople })
})

app.delete('/api/people/:id', (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id))
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `no person with id ${req.params.id}` })
    }
    const newPeople = people.filter(
        (person) => person.id !== Number(req.params.id)
    )
    return res.status(200).json({ success: true, data: newPeople })
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
})