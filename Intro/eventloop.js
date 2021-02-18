const fs = require('fs')

console.log('Начало работы')

setImmediate(() => {
  console.log('immediate happened')
})

setTimeout(() => {
  console.log('setTimeout happened')
}, 0)

Promise.resolve().then(() => console.log('promise 1 happened'))
Promise.resolve().then(() => {
  console.log('promise 2 happened')
  process.nextTick(() => {
    console.log('nextTick in promise happened')
  })
})
Promise.resolve().then(() => console.log('promise 3 happened'))

new Promise((resolve) => {
  resolve('Promise happened')
  process.nextTick(() => {
    console.log('nextTick before')
  })
}).then(console.log)

process.nextTick(() => {
  console.log('nextTick 1 happened')
})
process.nextTick(() => {
  console.log('nextTick 2 happened')
})
process.nextTick(() => {
  console.log('nextTick 3 happened')
})

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout')
  }, 0)
  setImmediate(() => {
    console.log('immediate')
  })
})

console.log('Конец файла')
