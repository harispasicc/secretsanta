import axios from 'axios';

const addPerson = async (person) => {
    try {
        const { data } = await axios.post(`/api/people`, person);
        return data;
    } catch (err) {
        console.log(err);
   }
}

const getPeople = async (userId) => {
    try {
        const config = {
            params: {
                userId
            }
        } 
        const { data } = await axios.get(`/api/people`, config)
        return data;
    } catch (err) {
        console.log(err);
    }
}

const getPerson = async (personId) => {
    try {
        const { data } = await axios.get(`/api/people/${personId}`)
        return data;
    } catch (err) {
        console.log(err);
    }
}

const editPerson = async (person) => {
    try {
        const { data } = await axios.put(`/api/people/${person.personId}`,person)
        return data;
    } catch (err) {
        console.log(err);
    }
}

const removePerson = async (personId) => {
    try {
        const { data } = await axios.delete(`/api/people/${personId}`)
        return data;
    } catch (err) {
        console.log(err);
    }
}

export {addPerson, getPerson,getPeople,editPerson, removePerson}
