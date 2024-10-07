import axiosInstance from "@/utils/axiosInstance.js";

// 获取反馈信息列表
export const fetchFeedbackData = async (params) => {
  const response = await axiosInstance.post(
    "/feedBackManager/pageSelectFeedBack",
    params
  );
  return response;
};

// 根据userId查看反馈信息
export const fetchFeedbackDataById = async (feedbackId) => {
  const response = await axiosInstance.get(
    `/feedBackManager/getUserFeedBack/${feedbackId} `
  );
  return response;
};

// 导出反馈信息表
export const exportFeedbackData = async () => {
  const response = await axiosInstance.get(
    "/feedBackManager/getExcelUserFeedbackInformationExportTable",
    { responseType: "blob" }
  );

  return response;
};
