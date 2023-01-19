import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router'
import Secret from './Secret';

const SecretInput = () => {
  const [errorPrice, setErrorPrice] = useState('');
  const [errPart, setErrPart] = useState('');
  const [participants, setPartcipants] = useState({ submitted: false, number: '' })
  const [maxPrice, setMaxPrice] = useState({ submitted: false, number: '' });
  const [submittedPerson, setSubmittedPerson] = useState(0);
  const [insertedPeople, setInsertedPeople] = useState([]);
  const navigate = useNavigate();
  const [secretData, setSecretData] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('secretPairs'));
    if (data) {
      setSecretData(data);
    }
  }, []);

  const getPeople = (people) => {
    let count = 0;
    people.forEach(person => {
      if (person.submitted) {
        count++;
      }
      setSubmittedPerson(count);
    })
    setInsertedPeople(people);
  }

  const submit = (e) => {
    e.preventDefault();
    if (!maxPrice.number) {
      setErrorPrice('Max price is required')
    } else if (maxPrice.number <= 0 || !Number.isInteger(+(maxPrice.number))) {
      setErrorPrice('Max price needs to be positive whole number')
    } else {
      setMaxPrice({ ...maxPrice, submitted: true });
      setErrorPrice('');
    }
    if (!participants.number) {
      setErrPart('Number of participants is required')
    } else if (participants.number < 4) {
      setErrPart('Number of participants needs to be at least 4')
    } else if (!Number.isInteger(+(participants.number)) || (participants.number) % 2 === 1) {
      setErrPart('Number of participants needs to be even whole number')
    } else {
      setPartcipants({ ...participants, submitted: true });
      setErrPart('');
    }
  }

  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  const randomPairs = () => {
    let arr = insertedPeople.map(person => person.fullName);
    const random = shuffle(arr);
    const firstHalf = random.slice(0, insertedPeople.length / 2);
    const secondHalf = random.slice(insertedPeople.length / 2, insertedPeople.length);
    let pairs = firstHalf.map((person, i) => {
      return { 0: person, 1: secondHalf[i] };
    })
    return pairs;
  }

  const done = () => {
    let pairs = randomPairs();
    const secretPairs = { participants: participants.number, maxPrice: maxPrice.number, pairs, insertedPeople }
    localStorage.setItem('secretPairs', JSON.stringify(secretPairs));
    navigate('/secret-santa-pairs')
  }
  
  const resetForm = (createNew) => {
    if (createNew) {
      setSecretData({});
    }
  }

  return (
    <Card sx={{backgroundColor:'#DF0000',textAlign:'center'}}>
       <Box className="titleBox">
      <Typography variant="h4" color='white'>
        Secret Santa
      </Typography>
      </Box>
      <CardContent sx={{ p: 6, color:'white', display:'flex', justifyContent:'center',marginBottom:'60px'}}>
        <Grid container direction='column' spacing={2} sx={{maxWidth:'750px'}}>
          <Grid item>
            <form onSubmit={submit}>
              <Grid container direction='row' spacing={2} sx={{justifyContent:'space-evenly'}}>
                <Grid item>
                  <Typography>How many people?</Typography>
                  {
                    (Object.keys(secretData).length) ?
                      <Typography>{secretData.participants}/{secretData.participants}</Typography>
                      :
                      (participants.submitted && participants.number) ?
                        <Typography>{submittedPerson}/{participants.number}</Typography>
                        :
                        <>
                          <TextField variant='outlined' value={participants.number}
                            onChange={(e) => {
                              setPartcipants({ ...participants, submitted: false, number: e.target.value })
                            }}
                            name="participants" sx={{ width: "180px", borderRadius: "6px",backgroundColor:'white' }} />
                          {errPart && <Typography sx={{ fontSize: '12px', color: 'white' }}>{errPart}</Typography>}
                        </>
                  }
                </Grid>
                <Grid item>
                  <Typography>Max price (BAM)</Typography>
                  {
                    (Object.keys(secretData).length) ?
                      <Typography>{secretData.maxPrice}</Typography>
                      :
                      (maxPrice.submitted && maxPrice.number) ?
                        <Typography>{maxPrice.number}</Typography>
                        :
                        <>
                          <TextField variant='outlined' value={maxPrice.number}
                            onChange={(e) => {
                              setMaxPrice({ ...maxPrice, submitted: false, number: e.target.value });
                            }}
                            name="maxPrice" sx={{ width: "180px", borderRadius: "6px", backgroundColor:'white' }} />
                          {errorPrice && <Typography sx={{ fontSize: '12px', color: 'white' }}>{errorPrice}</Typography>}
                        </>
                  }
                </Grid>
              </Grid>
              <input type='submit' hidden />
            </form>
          </Grid>
          <Grid item>
            <Secret getPeople={getPeople} participants={participants.number} maxPrice={maxPrice.number}
              resetForm={ resetForm} />
            <Box sx={{ textAlign: 'right',marginTop:'-40px'}}>
              {
                !Object.keys(secretData).length ?
                  <Button type="submit" variant='contained' color='success' size='large' className='doneButton'
                    disabled={(submittedPerson === 0 || submittedPerson !== +(participants.number)) ? true : false}
                    onClick={done}>Done</Button>
                  :
                  <Button type="button" variant='contained' color='success' size='large'
                    onClick={() => navigate('/secret-santa-pairs')}>See Pairs</Button>
              }
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SecretInput;
