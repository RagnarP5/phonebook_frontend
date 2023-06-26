import React from 'react'
import Header from './Header'
import Content from "./Content";
import Total from './Total'

const Course = ({ course }) => {
    return (
        <div>
            <h1>Hello</h1>
            <Header title={course["name"]} />
            <Content course={course} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course