import axios from 'axios';

const addGift = async ({personId,name}) => {
    try {
        const { data } = await axios.post(`/api/people/${personId}/gifts`, { name });
        return data;
    } catch (err) {
        console.log(err);
   }
}

const getGifts = async (personId) => {
    try {
        const { data } = await axios.get(`/api/people/${personId}/gifts`);
        data.sort((a, b) => new Date(b.updatedAt).getTime() -new Date(a.updatedAt).getTime());
        return data;
    } catch (err) {
        console.log(err);
    }
}

const getGift = async ({ personId, giftId}) => {
    try {
        const { data } = await axios.get(`/api/people/${personId}/gifts/${giftId}`)
        return data;
    } catch (err) {
        console.log(err);
    }
}

const editGift = async ({ personId, giftId,name}) => {
    try {
        const { data } = await axios.put(`/api/people/${personId}/gifts/${giftId}`, { name })
        return data;
    } catch (err) {
        console.log(err);
    }
}

const removeGift = async ({ personId, giftId}) => {
    try {
        const { data } = await axios.delete(`/api/people/${personId}/gifts/${giftId}`)
        return data;
    } catch (err) {
        console.log(err);
    }
}

export {addGift, getGifts,getGift,editGift, removeGift}
