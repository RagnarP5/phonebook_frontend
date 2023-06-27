import { useState } from 'react'

const Person = ({ person }) => {
    return (
        <li>{person.name} {person.number}</li>
    )
}

const Header = ({ text }) => {
    return (
        <h2>{text}</h2>
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
            <Header text='Phonebook' />
            <div>filter shown with <input value={filterValue} onChange={handleFilterChange}/></div>
            <Header text='add a new' />
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/><br/>
                    number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <Header text='Numbers'/>
            <div>
                <ul>
                    {personsToShow.map(person => <Person key={person.name} person={person}/>)}
                </ul>
            </div>
        </div>
    )
}

export default App