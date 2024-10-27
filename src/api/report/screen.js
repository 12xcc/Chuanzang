import axiosInstance from "@/utils/axiosInstance.js";

// 获取当日疾病分布
export const getDiseaseDataToday = async () => {
  const response = await axiosInstance.get(
    "/cdcStaff/statisticsDataView/getDiseaseDataToday"
  );
  return response;
};

// 获取一段时间内的打卡分布
export const getCheckInDailyNumber = async (dateList) => {
  const response = await axiosInstance.post(
    "/cdcStaff/statisticsDataView/getCheckInDailyNumber",
    dateList
  );
  return response;
};

// 获取统计数据（总人数，总打卡数，今日打卡数，今日健康数，今日患病数）
export const getStatisticsData = async () => {
  const response = await axiosInstance.get(
    "/cdcStaff/statisticsDataView/getStatisticsData"
  );
  return response;
};

// 根据手机号筛选
export const getChickInInfoByText = async (params) => {
  const response = await axiosInstance.get(
    "/cdcStaff/statisticsDataView/getChickInInfoByText",
    { params }
  );
  return response;
};

// 重点人员跟踪
export const getImportantUserInfo = async () => {
  const response = await axiosInstance.get(
    "/cdcStaff/statisticsDataView/getImportantUserInfo"
  );
  return response;
};

// 获取全部用户地理位置信息
export const getUserStation = async () => {
  const response = await axiosInstance.get(
    "/cdcStaff/statisticsDataView/getUserStation"
  );
  return response;
};
