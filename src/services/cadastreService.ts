import { baseService } from './baseService';
import _models from '../pages/cadastres/models/cadastreModel'

const resource = 'cadastres';

export const cadastreService = {

  async getList() {
    return await baseService.getAll<_models.cadastre[]>(`${resource}`);
  },

  async getById(id: number) {
    return await baseService.getById<_models.cadastre>(`${resource}`, id);
  },

  async save(data: _models.cadastre) {
    if(data.id != null && data.id > 0){
      const id = Number(data.id);
      return await baseService.put<_models.cadastre>(`${resource}`, id, data);
    }
    return await baseService.post<_models.cadastre>(`${resource}`, data);
  },

  async delete(id: number) {
    return await baseService.delete<_models.cadastre>(`${resource}`, id);
  },
};

export default cadastreService;
