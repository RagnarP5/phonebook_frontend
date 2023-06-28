import {useEffect, useState} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from 'axios'



const Header = ({ text }) => {
    return (
        <h3>{text}</h3>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('Your name')
    const [newNumber, setNewNumber] = useState('Your number')
    const [filterValue, setFilterValue] = useState('')
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

    const hook = () => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }

    useEffect(hook, [])

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