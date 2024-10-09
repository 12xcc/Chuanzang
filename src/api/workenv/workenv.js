
import axiosInstance from "@/utils/axiosInstance.js";

// 获取工作环境列表
export const fetchWorkenvData = async (params) => {
  const response = await axiosInstance.post("/cdcStaff/workEnvironment/pageSelectWorkEnvironment", {
    params,
  });
  return response;
};
