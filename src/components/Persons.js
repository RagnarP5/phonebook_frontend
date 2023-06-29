import React from "react"
import Person from './Person'

const Persons = ({personsToShow, deletePerson}) => {
    return (
        <div>
        <ul>
            {personsToShow.map(person => <Person key={person.name} person={person} deletePerson={() => deletePerson(person.id)}/>)}
        </ul>
    </div>
    )
}

export default Persons

