import axios from 'axios';
import { confs } from '../configurations';

export const updateData = async (id, participantData) => {
    const base_url = confs["base_url"];
    console.log(base_url);
    try {
        const res = await axios.put(`${base_url}/participant/participant/${id}`, {
            _id: participantData._id,
            name: participantData.name,
            breakfast: participantData.breakfast,
            lunch: participantData.lunch,
            snacks: participantData.snacks,
            dinner: participantData.dinner,
            review1: participantData.review1,
            review2: participantData.review2,
            review3: participantData.review3
        });
        console.log(res);
        return res.data;
    }
    catch(e) {
        console.log(e);
    }
}

