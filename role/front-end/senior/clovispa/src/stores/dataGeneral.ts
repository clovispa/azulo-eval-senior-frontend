import { defineStore } from 'pinia';
import generalService from 'src/service/generalService';

export const useDataGeneralStore = defineStore('dataGeneral', {
  state: () => ({
    dataGeneral: '',
  }),
  getters: {
    objGeneral: (state) => state.dataGeneral ,
  },
  actions: {
    async getDataGeneral() {
      try {
        const {data} = await generalService.apiDataGeneral();
        this.dataGeneral = data?.story?.content?.body[0]
      } catch (error) {
        console.log(error);
      }
    },
  },
})
