require('dotenv').config()
const express = require('express')
const app = express()
const pool = require('./config/config')

app.route('/').get((request, response) => {
    response.send('Hello world')
})

app.route('/api/t/:group').get((request, response) => {
    let ngroup = request.params['group']
    response.send(`Hello ${ngroup}`)
})

app.route('/api/students').get((request, response) => {
    pool.query('Select * from students', (err, result, fields) => {
        if (err) throw err
        response.send(result);
    })
})

app.route('/api/students/:n_z').get((request, response) => {
    const n_z = request.params['n_z']
    pool.query('Select * from students where n_z = ?', [n_z],
    (err, result, fields) => {
        if (err) throw err
        response.send(result);
    })
})

app.listen(8080, () => {
    console.log('Server started')
})