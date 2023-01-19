import React, { useEffect, useState } from 'react';
import { Grid, TextField, Card, CardContent, Typography, Button, Avatar, Box } from "@mui/material";
import { Add, Delete } from '@mui/icons-material';
import '../../assets/styles/SecretSanta.css';
import { produce } from 'immer';

const Secret = ({ getPeople, participants, maxPrice, resetForm }) => {
    const [error, setError] = useState('');
    const [people, setPeople] = useState(Array(4).fill({ fullName: '', email: '' }));
    const [secretData, setSecretData] = useState({});

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('secretPairs'));
        if (data) {
            setSecretData(data);
            setPeople(data.insertedPeople);
        }
    }, []);

    useEffect(() => {
        setError('')
    }, [participants, maxPrice])

    useEffect(() => {
        getPeople(people);
        //eslint-disable-next-line
    }, [people])

    const handleAdd = (index) => {
        setPeople([...people, { fullName: '', email: '' }]);
    }

    const remove = (index) => {
        const arr = [...people];
        arr.splice(index, 1);
        setPeople(arr);
    }

    const handleSubmit = (e, index) => {
        e.preventDefault();
        if (!participants || !maxPrice) {
            setError('First you need to enter number of participants and max price');
        } else {
            if (people[index].fullName === '' || people[index].email === '') {
                setPeople((prevPerson) =>
                    prevPerson.map((p, i) =>
                        i === index ? { ...p, errMsg: 'Please provide data about paticipant' } : p
                    ))
            } else if (!(/.+@.+\..+/.test(people[index].email))) {
                setPeople((prevPerson) =>
                    prevPerson.map((p, i) =>
                        i === index ? { ...p, errMsg: 'Invalid email format!' } : p
                    ))
            } else
                setPeople((prevPerson) =>
                    prevPerson.map((p, i) =>
                        i === index ? { ...p, submitted: true, errMsg: '' } : p
                    ))
        }
    }

    const createNew = () => {
        localStorage.removeItem('secretPairs');
        setSecretData({});
        setPeople(Array(4).fill({ fullName: '', email: '' }));
        resetForm(true)
    }

    return (
        <><Grid container spacing={2} direction='column'>
            <Grid item>
                {error && <Typography sx={{ fontSize: '12px', color: 'white' }}>{error}</Typography>}
            </Grid>
            <Grid item>
                <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
                    {people.length > 0 && people.map((person, index) => (
                        <Grid item md={6} key={index} sx={{ minWidth: '320px' }}>
                            <Card >
                                <CardContent sx={{ p: 5 }}>
                                    <form onSubmit={(e) => handleSubmit(e, index)}>
                                        <Grid container direction='column' spacing={2}>
                                            <Typography variant='h6' sx={{ color: 'green' }}>
                                                Person {index + 1}</Typography>
                                            {
                                                (person && person.submitted) || Object.keys(secretData).length ?
                                                    <Grid item >
                                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <Typography>{person.fullName}</Typography>
                                                            {!Object.keys(secretData).length &&
                                                                <Button color="error" onClick={() => remove(index)}>
                                                                    <Delete />
                                                                </Button>
                                                            }
                                                        </Box>
                                                        <Typography sx={{ p: '5px' }}>{person.email}</Typography>
                                                    </Grid>
                                                    :
                                                    <>
                                                        <Grid item >
                                                            <TextField
                                                                fullWidth
                                                                label="Full name"
                                                                variant='filled'
                                                                value={person.fullName}
                                                                onChange={(e) => {
                                                                    setPeople(currentPerson =>
                                                                        produce(currentPerson, v => {
                                                                            v[index].fullName = e.target.value;
                                                                        }))
                                                                }}
                                                                name="fullName"
                                                                sx={{ borderRadius: "6px" }} />
                                                        </Grid>
                                                        <Grid item >
                                                            <TextField
                                                                fullWidth
                                                                label="Email"
                                                                variant='filled'
                                                                value={person.email}
                                                                onChange={(e) => {
                                                                    setPeople(currentPerson =>
                                                                        produce(currentPerson, v => {
                                                                            v[index].email = e.target.value;
                                                                        }))
                                                                }}
                                                                name="email"
                                                                sx={{ borderRadius: "6px" }} />

                                                        </Grid>
                                                        {person.errMsg &&
                                                            <Typography sx={{ fontSize: '12px', color: 'red' }}>
                                                                {person.errMsg}
                                                            </Typography>}
                                                    </>
                                            }
                                            <input type='submit' hidden />
                                        </Grid>
                                    </form>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}{" "}
                </Grid>
                {
                    !Object.keys(secretData).length &&
                    <Box className="add" sx={{ justifyContent: 'center', marginTop: '30px' }}>
                        <Avatar /> &nbsp;
                        <Button size='large' className='addPersonSS' onClick={handleAdd}
                            disabled={(participants > people.length) ? false : true}>
                            Add Person &nbsp;
                            <Add />
                        </Button>
                    </Box>
                }
                {
                    Object.keys(secretData).length ?
                        <Box sx={{ textAlign: 'left' }}>
                            <Button type="button" variant='contained' color='success' size='large' sx={{ marginTop: '50px' }}
                                onClick={createNew}>Create a new list</Button>
                        </Box>
                        : null
                }
            </Grid>
        </Grid>
        </>
    )
}
export default Secret;

