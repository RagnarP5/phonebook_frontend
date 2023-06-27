import { useState } from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";



const Header = ({ text }) => {
    return (
        <h3>{text}</h3>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'James Bond', number: '007', id: 1},
        { name: 'Arto Hellas', number: '040-123456', id: 2 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 3 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 4 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 5 }
    ])
    const [newName, setNewName] = useState('Your name')
    const [newNumber, setNewNumber] = useState('Your number')
    const [filterValue, setFilterValue] = useState('')
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))



    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.some(e => e.name === newName)){
            alert(`${newName} is already added to phonebook`)
        }
        else {
            const personObject = {
                name: newName,
                number: newNumber,
            }
            setPersons(persons.concat(personObject))
        }
    }

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value)
    }


    return (
        <div>
            <h1>Phonebook</h1>
            {/*<div>filter shown with <input value={filterValue} onChange={handleFilterChange}/></div>*/}
            <Filter value={filterValue} onChange={handleFilterChange}/>
            <Header text='add a new' />
            <PersonForm onSubmit={addPerson}
                        nameValue={newName}
                        numberValue={newNumber}
                        onNameChange={handleNameChange}
                        onNumberChange={handleNumberChange}/>
            <Header text='Numbers'/>
            <Persons personsToShow={personsToShow}/>
        </div>
    )
}

export default App