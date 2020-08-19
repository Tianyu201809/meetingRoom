import request from '../utils/request';
// import { Request } from '../utils/axios'
// const axios = new Request()
// export default axios

export const fetchData = query => {
    return request({
        url: query.url,
        method: query.methods,
        params: query.data
    });
};
