import axios from 'axios';
import { confs } from '../configurations';

export const getData = async (id) => {
    const base_url = confs['base_url'];
    axios
        .get(`${base_url}/participant/participant/${id}`)
        .then((res) => {
            // console.log(res.data.data[0]);
            return res.data.data[0];
        })
        .catch((err) => {
            console.log(err.message);
        });
};
