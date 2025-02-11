const path = require('path');

console.log(path.sep) // 打印路徑分隔符

// 構建文件路徑
const  filePath = path.join('/content/', 'subfolder', 'test.txt')
console.log(filePath);

// 獲取文件名
const base = path.basename(filePath)
console.log(base);

// 絕對路徑
const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt');
console.log(absolute);