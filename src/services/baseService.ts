import { AxiosResponse } from 'axios';
import axios from 'axios';

// colocar no env para trabalhar em diferentes ambientes
const urlBase = 'http://localhost:3000/';

const baseService = {

  async getAll<T = any>(resource: string): Promise<AxiosResponse<T>> {
    return await axios.create({}).get(`${urlBase}${resource}`);
  },

  async getById<T = any>(resource: string, id: number): Promise<AxiosResponse<T>> {
    return await axios.create({}).get(`${urlBase}${resource}/${id}`);
  },

  async post<T = any>(resource: string, data?: object): Promise<AxiosResponse<T>> {
    return await axios.create({}).post(`${urlBase}${resource}`, data);
  },

  async put<T = any>(resource: string, id: number, data?: object): Promise<AxiosResponse<T>> {
    return await axios.create({}).put(`${urlBase}${resource}/${id}`, data);
  },

  async delete<T = any>(resource: string, id: number): Promise<AxiosResponse<T>> {
    return await axios.create({}).delete(`${urlBase}${resource}/${id}`);
  },
};

export { baseService };
