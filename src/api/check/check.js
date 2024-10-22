import axiosInstance from "@/utils/axiosInstance.js";

// 根据用户名，电话，部门，时间分页查询用户检查信息
export const pageSelectLabTest = async (params) => {
  const response = await axiosInstance.post(
    "/medicalStaff/labTestManager/pageSelectLabTest",
    params
  );
  return response;
};

// 导出检测信息导出表
export const getDetectionInformationExportFormExcel = async () => {
  const response = await axiosInstance.get(
    "/medicalStaff/labTestManager/getDetectionInformationExportFormExcel",
    { responseType: "blob" }
  );
  return response;
};

// 根据用户名，性别，联系电话，年龄查找对应用户信息
export const getUserByBaseInfo = async (params) => {
  const response = await axiosInstance.post(
    "/medicalStaff/labTestManager/getUserByBaseInfo",
    params
  );
  return response;
};

// 添加检查信息
export const saveLabTestReport = async (params,userId) => {
  const response = await axiosInstance.post(
    "/medicalStaff/labTestManager/saveLabTestReport",
    params,
    {
      headers: {
        userId: userId, // 请求头中传递 userId
      },
    }
  );
  return response;
};

// 根据诊断ID查询检查信息
export const selectLabTest = async (labTestReportID) => {
  const response = await axiosInstance.get(
    `/medicalStaff/labTestManager/selectLabTest/${labTestReportID}`
  );
  return response;
};

// 上传文件通用接口
export const saveLabTestFile = (formData) => {
  return axios.post('/common/file/saveLabTestFile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};