import axios from 'axios';

const URL = 'https://backendauction.mydriven.ae/';

export async function GetCars() {
    const response = await axios.get(URL);
    const data = await response.data;
    return data;
}
