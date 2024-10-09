import axiosInstance from "@/utils/axiosInstance.js";

// 获取用户列表
export const pageSelectDiseaseLearningMaterials = async (params) => {
  const response = await axiosInstance.post("/cdcStaff/promotionalMaterialsManager/pageSelectDiseaseLearningMaterials", 
    params,
    {
        headers: {
          'Content-Type': 'application/json', 
        },
    }
  );
  return response;
};

// 切换材料状态
export const startOrStopMaterial = async (materialId, isDelete) => {
  const response = await axiosInstance.put("/cdcStaff/promotionalMaterialsManager/startOrStopMaterial", 
    null, // 使用 PUT 方法时，通常没有 body
    {
      params: { materialId, isDelete }, // 传递参数
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response;
};
