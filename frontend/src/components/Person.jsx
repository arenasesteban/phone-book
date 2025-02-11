const Person = ({ person, handleRemovePerson }) => {
    return (
        <div>
            {person.name} {person.number}
            <button onClick={() => handleRemovePerson(person.id)}>Delete</button>
        </div>
    );
}

export default Person;