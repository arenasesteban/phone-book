const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());  
app.use(express.static('dist'));  

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const Person = require('./modules/person');

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
    });
});

app.get('/info', (req, res) => {
    Person.find({}).then(persons => {
        res.send(`<p>Phonebook has info for ${persons.length} people</p>
                  <p>${new Date()}</p>`);
    });
});

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        if(person) {
            res.json(person);
        } else {
            res.status(404).end();
        }
    });
});


app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id).then(() => {
        res.status(204).end();
    });
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    /*     
    if(phoneBook.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        });
    }; 
    */

    if(!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        });
    }

    const person = new Person({
        id: Math.floor(Math.random() * 1000),
        name: body.name,
        number: body.number
    });

    person.save().then(savedPerson => {
        res.json(savedPerson);
    });
});

app.put('/api/persons/:id', (req, res) => {
    const body = req.body;

    const person = {
        name: body.name,
        number: body.number
    };

    Person.findByIdAndUpdate(req.params.id, person, { new: true})
        .then(updatePerson => {
            res.json(updatePerson);
        });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});