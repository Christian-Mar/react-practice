import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = props => {
	const [enteredUsername, setEnteredUsername] = useState(''); //initial state
	const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();

	const addUserHandler = (event) => {
		event.preventDefault(); //preventDefault om te voorkomen dat de submit meteen zou uitgevoerd worden en bij submit een reloading zou gebeuren
        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age'
            });
            return;
        }
        if(+enteredAge < 1) {
            setError({
							title: 'Invalid age',
							message: 'Please enter a valid age (>0)',
						});
            return;
        }
		props.onAddUser(enteredUsername, enteredAge); // can be executed as a function 
        setEnteredUsername('');
		setEnteredAge('');
	};

	const usernameChangeHandler = (event) => {
		setEnteredUsername(event.target.value);
	};

	const ageChangeHandler = event => {
		setEnteredAge(event.target.value);
	};

    const errorHandler = () => {
        setError(null);
    }

	return (
		<div>
			{error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
			<Card className={classes.input}>
				<form onSubmit={addUserHandler}>
					<label htmlFor="username">Username</label>
					<input
						id="username"
						type="text"
						value={enteredUsername}
						onChange={usernameChangeHandler}
					/>
					<label htmlFor="age">Age (Years)</label>
					<input
						id="age"
						type="number"
						value={enteredAge}
						onChange={ageChangeHandler}
					/>
					<Button type="submit">Add User</Button>
				</form>
			</Card>
		</div>
	);
};

export default AddUser;

// htmlFor is hetzelfde als 'for' in html om het label te verbinden met de input - belangrijk voor screenreaders

// AddUser wordt hier gedefinieerd als een functie die eerst een event genereert en dan een form returnt
// deze component wordt in App.js binnengebracht via import (1) en via <AddUser /> (2)
