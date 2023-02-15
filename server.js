const http = require('http')

const fs = require('fs')
const path = require('path')

let users = [
  {
    id: 1,
    name: 'john',
    password: '12345678',
  },
]

const options = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}

let server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, options)
    res.end(JSON.stringify(users))
  }
  if (req.method === 'POST' && req.url === '/signup') {
    req.on('data', (chank) => {
      let data = JSON.parse(chank)
      let userFind = users.find((e) => e.name === data.name)
      if (
        userFind?.name !== data?.name &&
        userFind?.password !== data?.password
      ) {
        users.push({
          id: users.length + 1,
          ...data,
        })
        res.writeHead(201, options)
        res.end(JSON.stringify('user success crated'))
      } else {
        res.writeHead(404, options)
        res.end(JSON.stringify('user already register'))
      }
    })
  }
  if (req.method === 'POST' && req.url === '/login') {
    req.on('data', (chank) => {
      let data = JSON.parse(chank)
      let userFind = users.find((e) => e.name === data.name)
      if (
        userFind?.name === data?.name &&
        userFind?.password === data?.password
      ) {
        res.writeHead(200, options)
        res.end(JSON.stringify(users))
      } else {
        res.writeHead(404, options)
        res.end(JSON.stringify('user not found'))
      }
    })
  }
})

server.listen(3000, () => {
  console.log('http://localhost/3000', 'is running')
})
