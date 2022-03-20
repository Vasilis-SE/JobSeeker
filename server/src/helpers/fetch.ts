const axios = require('axios').default;

export default class Fetch {
    static async get(url: string, header: object = {}) {
        try {
            const response = await axios.post(url)
            const responseData = response.data;
            responseData.httpCode = response.status;
            return responseData;
        } catch (error) {
            const responseData = error.response.data;
            responseData.httpCode = error.response.status;
            return responseData;
        }
    }

    static async post(url: string, data: any, header: object = {}) {
        try {
            const response = await axios.post(url, data, {headers: header})
            const responseData = response.data;            
            responseData.httpCode = response.status;
            return responseData;
        } catch (error) {
            const responseData = error.response.data;
            responseData.httpCode = error.response.status;
            return responseData;
        }
    }

    static async patch(url: string, data: any, header: object = {}) {
        try {
            const response = await axios.patch(url, data, {headers: header})
            const responseData = response.data;
            responseData.httpCode = response.status;
            return responseData;
        } catch (error) {
            const responseData = error.response.data;
            responseData.httpCode = error.response.status;
            return responseData;
        }
    }

    static async delete(url: string, header: object = {}) {
        try {
            const response = await axios.delete(url, {headers: header})
            const responseData = response.data;
            responseData.httpCode = response.status;
            return responseData;
        } catch (error) {
            const responseData = error.response.data;
            responseData.httpCode = error.response.status;
            return responseData;
        }
    }
}
