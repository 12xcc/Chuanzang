import axiosInstance from "@/utils/axiosInstance.js";

// 根据用户名，电话，部门，时间分页查询用户诊断信息 获取诊断信息列表
export const pageSelectDiagnosis = async (params) => {
  const response = await axiosInstance.post(
    "/medicalStaff/diagnosisManager/pageSelectDiagnosis",
    params
  );
  return response;
};

// 导出诊断信息文件
export const getExcelClinicalInformationExportForm = async () => {
  const response = await axiosInstance.get(
    "/medicalStaff/diagnosisManager/getExcelClinicalInformationExportForm",
    { responseType: "blob" }
  );

  return response;
};

// 添加诊断信息
export const saveDiagnosis = async (params) => {
  const response = await axiosInstance.post(
    "/medicalStaff/diagnosisManager/saveDiagnosis",
    params,
    {
      headers: {
        userId: "your-user-id", // userId通过请求头方式请求
      },
    }
  );
  return response;
};

// 根据诊断ID查询诊断信息
export const selectDiagnosis = async (diagnosisResultsID) => {
  const response = await axiosInstance.get(
    `/medicalStaff/diagnosisManager/selectDiagnosis/${diagnosisResultsID}`
  );
  return response;
};

// 根据ID更新诊断信息
export const updateDiagnosis = async (params) => {
  const response = await axiosInstance.post(
    "/medicalStaff/diagnosisManager/updateDiagnosis",
    params
  );
  return response;
};
