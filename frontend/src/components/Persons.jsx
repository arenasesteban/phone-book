import Person from "./Person";

const Persons = ({ personsToShow, handleRemovePerson }) => {
    return (
        <div>
            {personsToShow.map(person =>
                <Person key={person.id} person={person} handleRemovePerson={handleRemovePerson} />
            )}
        </div>
    );
}

export default Persons;