const mongoose = require('mongoose');

if(process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://arenasesteban:${password}@cluster0.w9r5d.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url).then(() => {
    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    });

    const Person = mongoose.model('Person', personSchema);

    if (process.argv.length === 3) {
        console.log('Phonebook:');
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`);
            });

            mongoose.connection.close();
        }).catch(error => {
            console.log('Error fetching persons:', error);
        });
    } else if (process.argv.length === 5) {
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