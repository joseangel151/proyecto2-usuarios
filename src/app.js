const express = require('express')
const app = express()

app.use(express.json())

//! CREAR BD FICTICIA
const usersDB = [
    {
        id: 1,
        firstName: 'José',
        lastName: 'Gonzalez',
        email: 'joseangel151@gmail.com',
        password: '12345',
        age: 32
    },
    {
        id: 2,
        firstName: 'Angel',
        lastName: 'Sanchez',
        email: 'angeljose151@gmail.com',
        password: '654321',
        age: 23
    }
]

let  baseId = 3

app.get('/', (req,res) => {
    res.status(200).json({
        message: 'Server Ok!'
    })
})

//! CREAR LA PRIMERA RUTA QUE MUESTRE TODOS LOS USUARIOS
app.get('/users', (req, res) =>{
    res.status(200).json(usersDB)
})



//! CREAR LA PRIMERA RUTA QUE MUESTRE UN USUARIO DEPENDIENDO DEL ID

app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const data = usersDB.find((item) =>id === item.id)

    if(data){
        res.json(data)  
    } else {
        res.status(404).json({
            message: 'Invalid ID'
        })
    }  
})


//! CREAR LA PRIMERA RUTA QUE AGREGUE UN USUARIOS

app.post('/users', (req, res) =>{
  const data = req.body

  const newUsers = {
    id: baseId++,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    age: data.age
  }
  usersDB.push(newUsers)
  res.status(201).json(newUsers)  
})


app.listen(9000, () => {
    console.log('server started at port 9000')
})

module.exports = app
