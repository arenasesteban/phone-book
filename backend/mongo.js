const mongoose = require('mongoose');

if(process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://arenasesteban:${password}@arenasesteban-cluster.w9r5d.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);

mongoose.connect(url).then(() => {
    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    });

    const Person = mongoose.model('Person', personSchema);

    if (process.argv.length === 3) {
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`);
            });

            mongoose.connection.close();
        }).catch(error => {
            console.log('Error fetching persons:', error);
        });
    } else if (process.argv === 5) {
        const person = new Person({
            name: process.argv[3],
            number: process.argv[4]
        });

        person.save().then(() => {
            console.log(`Added ${person.name} number ${person.number} to phonebook`);

            mongoose.connection.close();
        }).catch(error => {
            console.log('Error saving person:', error);
        });
    }
}).catch(error => {
    console.log('Error connecting to MongoDB:', error);
});

/* 
const main = async () => {
    try {
        await mongoose.connect(url);

        const personSchema = new mongoose.Schema({
            name: String,
            number: String
        });

        const Person = mongoose.model('Person', personSchema);

        if (process.argv.length === 3) {
            const persons = await Person.find({});

            console.log('Phonebook:');
            persons.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            });
        } else if (process.argv.length === 5) {
            const newPerson = new Person({
                name: process.argv[4],
                number: process.argv[5]
            });
    
            await newPerson.save();
            console.log(`Added ${newPerson.name} number ${newPerson.number} to phonebook`);
        }

        mongoose.connection.close();
    } catch(error) {
        console.log('Error connecting to MongoDB:', error);
    }
}

main(); */