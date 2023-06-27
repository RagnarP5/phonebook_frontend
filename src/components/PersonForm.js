import React from "react"

const PersonForm = ({onSubmit, nameValue, onNameChange, numberValue, onNumberChange}) => {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    name: <input value={nameValue} onChange={onNameChange}/><br/>
                    number: <input value={numberValue} onChange={onNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm