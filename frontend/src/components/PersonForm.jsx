const PersonForm = ({ addPerson, newName, setNewName, newNumber, setNewNumber}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                Name: <input value={newName} onChange={e => setNewName(e.target.value)} />
            </div>
            <div>
                Number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} />
            </div>
            <div>
                <button type="sumbit">Add</button>
            </div>
        </form>
    );
}

export default PersonForm;