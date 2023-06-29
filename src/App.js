import {useEffect, useState} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'


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
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const getAllHook = () => {
        personService.getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }

    useEffect(getAllHook, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.some(e => e.name.toLowerCase() === newName.toLowerCase())){
            const confirmNewNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

            if (confirmNewNumber){
                const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
                const updatedPerson = {...person, number: newNumber}
                personService
                    .update(updatedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
                    })
                setNotificationMessage(
                    `'${person.name}' was updated`
                )
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 5000)
            }
        }
        else {
            const personObject = {
                name: newName,
                number: newNumber,
            }

            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewNumber('Your number')
                    setNewName('Your name')
                })

            setPersons(persons.concat(personObject))
            setNotificationMessage(
                `'${personObject.name}' was added`
            )
            setTimeout(() => {
                setNotificationMessage(null)
            }, 5000)
        }
    }

    const deletePerson = (id) => {
        const personToDelete = persons.find(p => p.id === id)
        const confirmDelete = window.confirm(`Are you sure you want to delete ${personToDelete.name}`)

        if (confirmDelete) {
            personService.remove(id)
                .catch(error => {
                setErrorMessage(
                    `${personToDelete.name} has already been deleted`
                )
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 5000)
            })


            setPersons(persons.filter(person => person.id !== id))

        }

    }

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value)
    }


    return (
        <div>
            <h1>Phonebook</h1>
            <Error message={errorMessage} />
            <Notification message={notificationMessage} />
            <Filter value={filterValue} onChange={handleFilterChange}/>
            <Header text='add a new' />
            <PersonForm onSubmit={addPerson}
                        nameValue={newName}
                        numberValue={newNumber}
                        onNameChange={handleNameChange}
                        onNumberChange={handleNumberChange}/>
            <Header text='Numbers'/>
            <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
        </div>
    )
}

export default App