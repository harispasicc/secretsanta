import axios from 'axios';

const addChild = async (child) => {
    try {
        const { data } = await axios.post(`/api/children`, child);
        return data;
    } catch (err) {
        console.log(err);
   }
}

const getChildren = async (parentId) => {
    try {
        const config = {
            params: {
                parentId
            }
        } 
        const { data } = await axios.get(`/api/children`, config)
        return data;
    } catch (err) {
        console.log(err);
    }
}

const getChild = async (childId) => {
    try {
        const { data } = await axios.get(`/api/children/${childId}`)
        return data;
    } catch (err) {
        console.log(err);
    }
}

const editChild = async (child) => {
    try {
        const { data } = await axios.put(`/api/children/${child.childId}`,child)
        return data;
    } catch (err) {
        console.log(err);
    }
}

const removeChild = async (childId) => {
    try {
        const { data } = await axios.delete(`/api/children/${childId}`)
        return data;
    } catch (err) {
        console.log(err);
    }
}

export {addChild, getChildren,getChild,editChild, removeChild}
