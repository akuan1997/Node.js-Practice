const {readFile, writeFile} = require('fs');

console.log('start')
readFile('./content/first.txt', 'utf-8', (err, result)=>{
    if (err) {
        console.log(err)
        return
    }
    // console.log(result)
    // 讀取成功：如果讀取成功，文件內容會被存儲在 result 變量中，並賦值給 first。
    const first = result;
    // 讀取第二個文件：在讀取第一個文件成功後，readFile 函式再次被調用
    readFile('./content/second.txt', 'utf-8', (err, result)=>{
        if (err) {
            console.log(err)
            return
        }
        // 讀取成功：如果讀取成功，文件內容會被存儲在 result 變量中，並賦值給 second。
        const second = result;
        // 寫入結果文件：在讀取第二個文件成功後，writeFile 函式被調用
        writeFile('./content/result-async.txt',
            `Here is the result: ${first}, ${second}`,
            (err, result) => {
            if (err) {
                console.log(err)
                return
            }
            console.log('done with this task')
            }
        )
    })
})
console.log('starting next task')
