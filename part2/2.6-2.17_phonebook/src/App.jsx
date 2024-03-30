/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import personService from "./services/persons";
import "./index.css";

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <Person key={person.id} person={person} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

const Person = ({ person, handleDelete }) => {
  return (
    <div>
      <p>
        {person.name} {person.number}
      </p>
      <button onClick={() => handleDelete(person.name, person.id)}>
        delete
      </button>
    </div>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  if (message.includes("ERROR")) {
    return <div className="error_message">{message}</div>;
  } else {
    return <div className="success_message">{message}</div>;
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      const changedPerson = persons.find((person) => person.name === newName);
      if (changedPerson.number === newNumber) {
        alert(`${newName} is already added to phonebook`);
      } else {
        if (
          confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          const changedContact = { ...changedPerson, number: newNumber };
          personService
            .update(changedPerson.id, changedContact)
            .then((returnedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.id !== changedPerson.id ? person : returnedPerson
                )
              );
              setMessage(`Changed number to ${newNumber}`);
              setTimeout(() => {
                setMessage(null);
              }, 2000);
            })
            .catch(() => {
              setPersons(
                persons.filter((person) => person.id !== changedPerson.id)
              );
              setNewName("");
              setNewNumber("");
              setMessage(
                `ERROR Information of ${changedPerson.name} has already been removed from server`
              );
              setTimeout(() => {
                setMessage(null);
              }, 2000);
            });
        }
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: JSON.stringify(persons.length + 1),
      };

      personService
        .create(nameObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setMessage(`Added ${nameObject.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 2000);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setMessage(`ERROR ${error.response.data.error}`);
          setTimeout(() => {
            setMessage(null);
          }, 2000);
        });
    }

    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (name, id) => {
    if (confirm(`Delete ${name} ?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
