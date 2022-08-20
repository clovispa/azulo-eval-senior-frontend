import apiClient from 'src/plugins/axios';

const apiDataGeneral = function () {
  return apiClient.get('notes?version=draft&token=eY7xsPoYuhmLUSA3GorPSgtt&cv=1660786834');
}

export default {
  apiDataGeneral

}
