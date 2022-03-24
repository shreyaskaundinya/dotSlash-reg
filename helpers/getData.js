import axios from 'axios';
import { confs } from '../configurations';

export const getData = async (id) => {
    const base_url = confs["base_url"];
    try {
        const res = await axios.get(`${base_url}/participant/participant/${id}`);
        return res.data;
    }
    catch(e) {
        console.log(e);
    }
}

