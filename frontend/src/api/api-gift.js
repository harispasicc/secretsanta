import axios from 'axios';

const addGift = async ({childId,name}) => {
    try {
        const { data } = await axios.post(`/api/children/${childId}/gifts`, { name });
        return data;
    } catch (err) {
        console.log(err);
   }
}

const getGifts = async (childId) => {
    try {
        const { data } = await axios.get(`/api/children/${childId}/gifts`)
        data.sort((a, b) => new Date(b.updatedAt).getTime() -new Date(a.updatedAt).getTime());
        return data;
    } catch (err) {
        console.log(err);
    }
}

const getGift = async ({ childId, giftId}) => {
    try {
        const { data } = await axios.get(`/api/children/${childId}/gifts/${giftId}`)
        return data;
    } catch (err) {
        console.log(err);
    }
}

const editGift = async ({ childId, giftId,name}) => {
    try {
        const { data } = await axios.put(`/api/children/${childId}/gifts/${giftId}`, { name })
        return data;
    } catch (err) {
        console.log(err);
    }
}

const removeGift = async ({ childId, giftId}) => {
    try {
        const { data } = await axios.delete(`/api/children/${childId}/gifts/${giftId}`)
        return data;
    } catch (err) {
        console.log(err);
    }
}

export {addGift, getGifts,getGift,editGift, removeGift}
