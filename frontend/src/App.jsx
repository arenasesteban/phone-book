import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect } from "react";
import personService from "./services/personService";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]); 
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState({
        type: null,
        content: null
    });

    useEffect(() => { 
        const fetchPersons = async () => {
            const response = await personService.getAll();
            setPersons(response);
        };
        
        fetchPersons();
    }, []);

    const addPerson = async (e) => {
        e.preventDefault();
        const personObject =  { name: newName, number: newNumber }

        if(!persons.some(person => person.name === newName)) {
            const response = await personService.create(personObject);
            setPersons([...persons, response]);
            setMessage(`Added ${newName}`);
            setMessage({ type: 'success', content: `Added ${newName}` });
            setTimeout(() => setMessage({ type: null, content: null}), 5000);
        } else {
            try {
                const confirm = window.confirm(`${newName} is alreay added to phonebook, replace the old number with new one?`);
        
                if(confirm) {
                    const id = persons.find(person => person.name === newName).id;
                    const response = await personService.update(id, personObject);
                    setPersons(persons.map(person => person.id !== id ? person : response));
                    setMessage({ type: 'success', content: `Updated ${newName}` });
                    setTimeout(() => setMessage({ type: null, content: null}), 5000);
                }
            } catch {
                setMessage({ type: 'error', content: `Information of this contact has already been removed from server` });
                setTimeout(() => setMessage({ type: null, content: null }), 5000);
            }
        }
        setNewName('');
        setNewNumber('');
    }

    console.log(persons);
    
    const personsToShow = !search ? persons : persons.filter(person => person.name.toLowerCase().includes(search));

    const handleRemovePerson = async (id) => {
        try {
            const person = persons.find(person => person.id === id);
            const confirm = window.confirm(`Delete ${person.name}?`);
    
            if (confirm) {
                await personService.remove(id);
                setPersons(persons.filter(person => person.id !== id));
            }
        } catch {
            setMessage({ type: 'error', content: `Information of this contact has already been removed from server` });
            setTimeout(() => setMessage({ type: null, content: null }), 5000);
        }
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification type={message.type} content={message.content} />
            <Filter search={search} setSearch={setSearch} />
            <h2>Add a new</h2>
            <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
            <h2>Numbers</h2>
            <Persons personsToShow={personsToShow} handleRemovePerson={handleRemovePerson} />
        </div>
    );
}

export default App;