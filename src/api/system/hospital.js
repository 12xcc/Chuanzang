import axiosInstance from "@/utils/axiosInstance.js"; // 修正拼写错误

// 根据医院名称，分页查询医院信息
export const fetchHospitalData = async (params) => {
  const response = await axiosInstance.post(
    "/systemHospitalManager/pageSelectHospitalInfo",
    params,
    {
      headers: {
        'Content-Type': 'application/json', // 确保发送 JSON 数据
      },
    }
  );
  return response;
};

// 导出文件：导出医院基础信息导出表
export const exportHospitalData = async () => {
  const response = await axiosInstance.get(
    "/systemHospitalManager/getExcelHospitalBasicInformationImportForm",
    { responseType: "blob" }
  );
  return response;
};

// 获取导入模板
export const getExcelHospitalTemplate = async () => {
  const response = await axiosInstance.get(
    "/systemHospitalManager/getExcelHospitalBasicInformationImportFormTemplate",
    { responseType: "blob" } // 确保以 blob 格式处理文件
  );
  return response;
};

// 根据ID获取医院信息
export const fetchHospitalDataById = async (hospitalId) => {
  const response = await axiosInstance.get(
    `systemHospitalManager/getHospitalInfo/${hospitalId}`
  );
  return response;
};

// 修改医院信息
export const editHospitalDataById = async (params) => {
  const response = await axiosInstance.post(
    `/systemHospitalManager/updateHospitalInfo`,
    params,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response;
};
