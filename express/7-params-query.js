const express = require('express')
const app = express()
const { products } = require('../data')

app.get('/', (req, res) => {
    res.send('<h1> Home Page</h1><a href="/api/products">products</a>')
})
app.get('/api/products', (req, res) => {
    // .map() 是 JavaScript 数组方法之一
    // 专门用于遍历数组并返回一个新数组
    // 它不会修改原数组，而是基于原数组生成一个新的数组。
    const newProducts = products.map((product) => {
        const { id, name, image } = product
        return { id, name, image }
    })

    res.json(newProducts)
})
// http://localhost:5000/api/products/2
app.get('/api/products/:productID', (req, res) => {
    // console.log(req)
    // console.log(req.params)
    const { productID } = req.params
    // .find() 是 JavaScript 陣列的方法，用來找到符合條件的第一個元素。
    // array.find((element) => condition);
    const singleProduct = products.find(
        (product) => product.id === Number(productID)
    )
    // /api/products/abc
    if (!singleProduct) {
        return res.status(404).send('Product Does Not Exist')
    }

    return res.json(singleProduct)
})

app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    console.log(req.params)
    res.send('hello world')
})
// http://localhost:5000/api/v1/query?limit=2
// http://localhost:5000/api/v1/query?search=a&limit=3
app.get('/api/v1/query', (req, res) => {
    console.log(req.query)
    // req.query 是 Express 提供的一個屬性，用來獲取 URL 查詢參數。
    // 只有當 URL 包含 ?key=value 格式的查詢參數時，req.query 才會有內容。
    const { search, limit } = req.query
    // sortedProducts 會變成一個新的陣列，但內容與 products 相同，不會影響原始數據。
    let sortedProducts = [...products]

    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search)
        })
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    if (sortedProducts.length < 1) {
        // res.status(200).send('no products matched your search');
        return res.status(200).json({ success: true, data: [] })
    }
    res.status(200).json(sortedProducts)
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
})