import axios from 'axios'; 

export default async function API(endPoint,method,bodyData){
        let url = 'https://template-backend.vercel.app/api/';
        return await axios({
                method: method,
                url: url+endPoint,
                data: bodyData
        })
        .then(res => res)
        .catch(err => err);
}