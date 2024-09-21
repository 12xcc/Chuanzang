<template>
  <div class="container">
    <el-form
      :model="form"
      label-width="360px"
      class="form-container"
      ref="form"
      :rules="rules"
    >
      <div class="GeneralSymptoms">
        <!------------------------------- 接触情况 ---------------------------------->
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">接触情况</span>
          </div>

          <el-form-item
            label="是否接触过发热或有呼吸道症状的患者"
            label-position="left"
            style="margin-left: 15px"
          >
            <div>
              <el-radio-group v-model="form.ContactWithFeverPatient">
                <el-radio :value="'是'">是</el-radio>
                <el-radio :value="'否'">否</el-radio>
                <el-radio :value="'不清楚'">不清楚</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>

          <el-form-item
            label="是否接触过有腹泻症状的患者"
            label-position="left"
            style="margin-left: 15px"
          >
            <div>
              <el-radio-group v-model="form.ContactWithDiarrheaPatient">
                <el-radio :value="'是'">是</el-radio>
                <el-radio :value="'否'">否</el-radio>
                <el-radio :value="'不清楚'">不清楚</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>

          <el-form-item
            label="是否接触过有皮疹的患者"
            label-position="left"
            style="margin-left: 15px"
          >
            <div>
              <el-radio-group v-model="form.ContactWithRashPatient">
                <el-radio :value="'是'">是</el-radio>
                <el-radio :value="'否'">否</el-radio>
                <el-radio :value="'不清楚'">不清楚</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>

          <el-form-item
            label="是否接触过诊断为结核病的患者"
            label-position="left"
            style="margin-left: 15px"
          >
            <div>
              <el-radio-group v-model="form.ContactWithTuberculosisPatient">
                <el-radio :value="'是'">是</el-radio>
                <el-radio :value="'否'">否</el-radio>
                <el-radio :value="'不清楚'">不清楚</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>

          <!------------------------------- 就餐情况 ---------------------------------->
          <div class="Condition">
            <div class="title-container">
              <div class="blue-box"></div>
              <span class="title-text">就餐情况(五天内)</span>
            </div>

            <el-form-item label="" style="display: flex; margin-left: -340px">
              <el-checkbox v-model="form.IsGroupDining" value="集体堂食就餐"
                >集体堂食就餐</el-checkbox
              >
              <el-checkbox v-model="form.IsDiningOut" value="外出就餐"
                >外出就餐</el-checkbox
              >
              <el-checkbox v-model="form.IsDiningUnclear" value="不清楚"
                >不清楚</el-checkbox
              >
            </el-form-item>
          </div>

          <div class="Condition">
            <div class="title-container">
              <div class="blue-box"></div>
              <span class="title-text">食物情况(五天内)</span>
            </div>
          </div>
          <el-form-item label="" style="display: flex; margin-left: -340px">
            <el-checkbox v-model="form.HasDrinkingRawWater" value="饮生水"
              >饮生水</el-checkbox
            >
            <el-checkbox v-model="form.HasEatingRawFood" value="吃生冷食品"
              >吃生冷食品</el-checkbox
            >
            <el-checkbox v-model="form.HasEatingColdCookedFood" value="熟食冷吃"
              >熟食冷吃</el-checkbox
            >
            <el-checkbox v-model="form.HasEatingSeafood" value="海水产品"
              >海水产品</el-checkbox
            >
          </el-form-item>

          <el-form-item label="食物名字" style="margin-left: -270px">
            <el-input
              v-model="form.FoodNames"
              placeholder="请输入食物名字"
              style="width: 200px"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label="就餐地点" style="margin-left: -270px">
            <el-input
              v-model="form.DiningPlace"
              placeholder="请输入就餐地点"
              style="width: 200px"
              clearable
            ></el-input>
          </el-form-item>
        </div>

        <!------------------------------- 聚集性发病 ---------------------------------->
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">聚集性发病</span>
          </div>
          <el-form-item
            label="同一家庭、办公室、车间等集体单位是否有聚集性发病"
            label-position="left"
            style="margin-left: 20px"
          >
            <div>
              <el-radio-group v-model="form.ContactWithRashPatient">
                <el-radio :value="'是'">是</el-radio>
                <el-radio :value="'否'">否</el-radio>
                <el-radio :value="'不清楚'">不清楚</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </div>

        <!------------------------------- 野外活动史 ---------------------------------->
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">野外活动史</span>
          </div>
          <el-form-item
            label="发病前1月内是否在野外/户外住宿或工作"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group
              v-model="form.OutdoorStayOrWorkWithinMonth"
              @change="handleOutdoorChange"
            >
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>

          <div class="NextContainer">
          <el-form-item
            v-if="form.OutdoorStayOrWorkWithinMonth === '是'"
            label="野外/户外活动史"
            label-position="left"
            style="display: block; margin-left: 40px; padding:15px 0 5px 0"
          >
            <div>
              <el-radio-group
                v-model="form.WildActivityHistory"
                style="width: 600px"
                @change="handleOtherActivityChange"
              >
                <el-radio value="种地">种地</el-radio>
                <el-radio value="割草">割草</el-radio>
                <el-radio value="打猎">打猎</el-radio>
                <el-radio value="采茶">采茶</el-radio>
                <el-radio value="放牧">放牧</el-radio>
                <el-radio value="采伐">采伐</el-radio>
                <el-radio value="旅游">旅游</el-radio>
                <el-radio value="其他">其他</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
           <el-form-item
            label="其他活动名称"
            v-if="form.WildActivityHistory === '其他'"
            label-position="left"
            style="margin-left: 60px;padding-bottom:15px"
          >
            <el-input
              v-model="form.OtherWildActivityName"
              placeholder="请输入其他活动名称"
              style="width: 200px; margin-left: -60px"
            ></el-input>
          </el-form-item>
          </div>

        </div>

        <!------------------------------- 疾病流行区 ---------------------------------->
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">疾病流行区</span>
          </div>

          <el-form-item
            label="是否到过鼠疫流行区"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group
              v-model="form.PlagueArea"
              @change="clearPlagueLocation"
            >
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>

          <div class="NextContainer">
            <el-form-item
              label="具体地点"
              v-if="form.PlagueArea === '是'"
              label-position="left"
              style="margin-left:40px;padding-top:15px;padding-bottom:15px"
            >
              <el-input
                v-model="form.SpecificPlagueLocation"
                placeholder="请输入具体地点"
                style="width: 200px; margin-left: -40px"
              ></el-input>
            </el-form-item>
            </div>

          <el-form-item
            label="是否到过炭疽流行区"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group
              v-model="form.AnthraxArea"
              @change="clearAnthraxLocation"
            >
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>
          
           <div class="NextContainer">
            <el-form-item
              label="具体地点"
              v-if="form.AnthraxArea === '是'"
              label-position="left"
              style="margin-left:40px;padding-top:15px;padding-bottom:15px"
            >
              <el-input
                v-model="form.SpecificAnthraxLocation"
                placeholder="请输入具体地点"
                style="width: 200px; margin-left: -40px"
              ></el-input>
            </el-form-item>
            </div>


          <el-form-item
            label="是否到过疟疾流行区"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group
              v-model="form.MalariaArea"
              @change="clearMalariaLocation"
            >
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="NextContainer">
            <el-form-item
              label="具体地点"
              v-if="form.MalariaArea === '是'"
              label-position="left"
              style="margin-left:40px;padding-top:15px;padding-bottom:15px"
            >
              <el-input
                v-model="form.SpecificMalariaLocation"
                placeholder="请输入具体地点"
                style="width: 200px; margin-left: -40px"
              ></el-input>
            </el-form-item>
            </div>

        </div>

        <!------------------------------- 动物接触史 ---------------------------------->
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">动物接触史</span>
          </div>

          <el-form-item
            label="接触过动物制品"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group
              v-model="form.ContactWithAnimalProducts"
              @change="clearContactDate"
            >
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
            </el-form-item>
            <div class="NextContainer">
            <el-form-item
              v-if="form.ContactWithAnimalProducts === '是'"
              v-model="form.ContactDate"
              style="width: 200px; padding:15px 0 15px 0"
              label="接触时间"
              label-position="left"
            >
              <Dateselection />
            </el-form-item>
            </div>

          <el-form-item
            label="接触过动物"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group
              v-model="form.ContactWithAnimals"
              @change="clearContactPlace"
            >
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="NextContainer">
            <el-form-item
              label="接触地点"
              v-if="form.ContactWithAnimals === '是'"
              label-position="left"
              style="margin-left: 40px; padding-top: 15px"
            >
              <el-input
                v-model="form.ContactPlace"
                placeholder="请输入接触地点"
                style="width: 200px; margin-left: -40px"
              >
              </el-input>
            </el-form-item>
            <div>
              <el-form-item
                v-if="form.ContactWithAnimals === '是'"
                label="接触动物名"
                label-position="left"
                style="
                  margin-left: 40px;
                  display: block;
                  width: 560px;
                  padding-bottom: 5px;
                "
              >
                <el-checkbox v-model="form.HasContactWithRat" value="'鼠'"
                  >鼠</el-checkbox
                >
                <el-checkbox v-model="form.HasContactWithMarmot" value="'旱獭'"
                  >旱獭</el-checkbox
                >
                <el-checkbox v-model="form.HasContactWithLice" value="'虱'"
                  >虱</el-checkbox
                >
                <el-checkbox v-model="form.HasContactWithFlea" value="'蚤'"
                  >蚤</el-checkbox
                >
                <el-checkbox v-model="form.HasContactWithCat" value="'猫'"
                  >猫</el-checkbox
                >
                <el-checkbox v-model="form.HasContactWithBird" value="'鸟'"
                  >鸟</el-checkbox
                >
                <el-checkbox v-model="form.HasContactWithPig" value="'猪'"
                  >猪</el-checkbox
                >
                <el-checkbox v-model="form.HasContactWithHorse" value="'马'"
                  >马</el-checkbox
                >
                <el-checkbox v-model="form.HasContactWithMule" value="'骡'"
                  >骡</el-checkbox
                >
                <el-checkbox v-model="form.HasContactWithDonkey" value="'驴'"
                  >驴</el-checkbox
                >
                <el-checkbox v-model="form.HasContactWithCow" value="'牛'"
                  >牛</el-checkbox
                >
                <el-checkbox v-model="form.HasContactWithSheep" value="'羊'"
                  >羊</el-checkbox
                >
                <el-checkbox v-model="form.HasContactWithDog" value="'狗'"
                  >狗</el-checkbox
                >
                <el-checkbox v-model="form.HasContactWithRabbit" value="'兔'"
                  >兔</el-checkbox
                >
                <el-checkbox v-model="form.HasContactWithWolf" value="'狼'"
                  >狼</el-checkbox
                >
                <el-checkbox v-model="form.HasContactWithTiger" value="'虎'"
                  >虎</el-checkbox
                >
                <el-checkbox
                  v-model="form.HasContactWithOtherAnimal"
                  @change="handleOtherChange"
                  value="'其他'"
                  >其他</el-checkbox
                >
              </el-form-item>
            </div>
            <el-form-item
              label="其他动物名称"
              v-if="form.HasContactWithOtherAnimal"
              label-position="left"
              style="margin-left: 60px"
            >
              <el-input
                v-model="form.OtherAnimalName"
                placeholder="请填写其他动物名称"
                style="width: 200px; margin-left: -60px; padding-bottom: 15px"
              ></el-input>
            </el-form-item>
          </div>
        </div>

        <!------------------------------- 发病前情况调查 ---------------------------------->
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">发病前情况调查</span>
          </div>

          <el-form-item
            label="发病前一个月居住地类型"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-checkbox value="丘陵或山区" v-model="form.IsHillyOrMountainous"
              >丘陵或山区</el-checkbox
            >
            <el-checkbox value="平原" v-model="form.IsPlain">平原</el-checkbox>
            <el-checkbox value="其他" v-model="form.IsOtherResidenceType"
              >其他</el-checkbox
            >
          </el-form-item>

          <el-form-item
            label="14天内是否明确被蚊虫叮咬过"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group v-model="form.HasMosquitoBite">
              <el-radio :value="true">是</el-radio>
              <el-radio :value="false">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="发病前2周内是否被蜱叮咬过"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group v-model="form.TickBite">
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不知道">不知道</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="发病是否被跳蚤叮咬过"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group v-model="form.FleaBite">
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不知道">不知道</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="发病前2个月内是否接触鼠类"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group
              v-model="form.ContactWithRatIn2Months"
              @change="clearRatContactMethod"
            >
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="NextContainer">
          <el-form-item
            label="接触方式"
            label-position="left"
            style="margin-left: 40px; display: block;padding:15px 0 15px 0"
            v-if="form.ContactWithRatIn2Months === '是'"
          >
            <el-radio-group v-model="form.RatContactMethod">
              <el-radio value="挖鼠洞">挖鼠洞</el-radio>
              <el-radio value="拿鼠">拿鼠</el-radio>
              <el-radio value="鼠咬">鼠咬</el-radio>
              <el-radio value="鼠尿">鼠尿</el-radio>
              <el-radio value="鼠粪">鼠粪</el-radio>
              <el-radio value="鼠血污染手">鼠血污染手</el-radio>
              <el-radio value="手被鼠夹打伤">手被鼠夹打伤</el-radio>
              <el-radio value="其他">其他</el-radio>
            </el-radio-group>
          </el-form-item>
          </div>

          <el-form-item
            label="发病前1月内是否吃过被鼠排泄物污染的食物"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group v-model="form.EatenFoodContaminatedByRatFeces">
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="发病前1月内是否在野外喝过沟（塘）水"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group v-model="form.DrunkWaterFromDitchesOrPonds">
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="发病前9天内是否在鼠洞附近坐卧"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group v-model="form.RestedNearRatHoles">
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="工作场所有无鼠或鼠排泄物"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group v-model="form.RatOrRatDroppingsAtWorkplace">
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="发病前1月内是否接触过病人排泄物（血、尿、便等）"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group v-model="form.ContactWithPatientExcreta">
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import Dateselection from "@/components/date.vue";
export default {
  components: {
    Dateselection,
  },
  data() {
    return {
      visible: false, // 控制弹窗显示
      form: {
        ContactWithFeverPatient: "", // 与发热患者接触情况
        ContactWithDiarrheaPatient: "", // 与腹泻患者接触情况
        ContactWithRashPatient: "", // 与皮疹患者接触情况
        ContactWithTuberculosisPatient: "", // 与结核病患者接触情况

        IsGroupDining: false, // 5天内是否集体堂食就餐
        IsDiningOut: false, // 5天内是否外出就餐
        IsDiningUnclear: false, // 5天内就餐情况不清楚

        HasDrinkingRawWater: false, // 是否饮生水
        HasEatingRawFood: false, // 是否吃生冷食品
        HasEatingColdCookedFood: false, // 是否熟食冷吃
        HasEatingSeafood: false, // 是否吃海水产品

        FoodNames: "", // 食物名字
        DiningPlace: "", // 就餐地点

        GroupOutbreak: "", // 同一家庭、办公室、车间等集体单位是否有聚集性发病
        OutdoorStayOrWorkWithinMonth: "", // 发病前1月内是否在野外住宿或工作
        WildActivityHistory: "", // 野外/户外活动史
        OtherWildActivityName: "", // 其他活动名称

        PlagueArea: "", // 是否到过鼠疫流行区
        SpecificPlagueLocation: "", // 具体地点

        AnthraxArea: "", // 是否到过炭疽流行区
        SpecificAnthraxLocation: "", // 具体地点

        MalariaArea: "", // 是否到过疟疾流行区
        SpecificMalariaLocation: "", // 具体地点

        ContactWithAnimalProducts: "", // 是否接触过动物制品
        ContactDate: "", //接触时间

        ContactWithAnimals: "", // 是否接触过动物
        ContactPlace: "", //  接触地点
        HasContactWithRat: false,
        HasContactWithMarmot: false,
        HasContactWithLice: false,
        HasContactWithFlea: false,
        HasContactWithCat: false,
        HasContactWithBird: false,
        HasContactWithPig: false,
        HasContactWithHorse: false,
        HasContactWithMule: false,
        HasContactWithDonkey: false,
        HasContactWithCow: false,
        HasContactWithSheep: false,
        HasContactWithDog: false,
        HasContactWithRabbit: false,
        HasContactWithWolf: false,
        HasContactWithTiger: false,
        HasContactWithOtherAnimal: false, // 是否接触其他动物
        OtherAnimalName: "",

        IsHillyOrMountainous: false, // 是否居住在丘陵或山区
        IsPlain: false, //是否居住在平原
        IsOtherResidenceType: false, // 是否居住在其他地区

        // 如果这里设置成null，那么这个选项必选
        HasMosquitoBite: null, // 14天内是否明确被蚊虫叮咬过
        TickBite: "", //发病前2周内是否被蜱叮咬过
        FleaBite: "", // 发病是否被跳蚤叮咬过
        ContactWithRatIn2Months: "", // 发病前2个月内是否接触鼠类
        RatContactMethod: "", // 接触方式
        EatenFoodContaminatedByRatFeces: "", //发病前1月内是否吃过被鼠排泄物污染的食物
        DrunkWaterFromDitchesOrPonds: "", // ENUM('是', '否', '不清楚'), -- 19. 发病前1月内是否在野外喝过沟（塘）水
        RestedNearRatHoles: "", // ENUM('是', '否', '不清楚'), -- 20. 发病前9天内是否在鼠洞附近坐卧
        RatOrRatDroppingsAtWorkplace: "", // ENUM('是', '否', '不清楚'), -- 21. 工作场所有无鼠或鼠排泄物
        ContactWithPatientExcreta: "", // ENUM('是', '否', '不清楚') -- 22. 发病前1月内是否接触过病人排泄物（血、尿、便等）
      },

      rules: {},
    };
  },
  methods: {
    toggleTag(field) {
      this.form[field] = !this.form[field];
    },
    showDrawer(user) {
      this.form = { ...user };
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
      this.handleReset();
    },
    handleSubmit() {
      console.log("触发");
      this.$refs.form.validate((valid) => {
        console.log("Form is valid:", valid);
        if (valid) {
          console.log("Form data:", this.form);
          this.visible = false;
          ElMessage({
            message: "提交成功",
            type: "success",
          });
          this.handleReset();
        } else {
          console.log("表单验证失败");
          ElMessage({
            message: "提交失败",
            type: "error",
          });
          return false;
        }
      });
    },

    // 是否在野外活动，若否/不清楚，则野外活动史清除
    handleOutdoorChange() {
      if (this.form.OutdoorStayOrWorkWithinMonth != "是") {
        this.form.WildActivityHistory = "";
        this.form.OtherWildActivityName = "";
      }
    },

    handleOtherActivityChange() {
      if (this.form.WildActivityHistory != "其他") {
        // this.WildActivityHistory="";
        this.form.OtherWildActivityName = "";
      }
    },

    // 疾病流行区
    clearPlagueLocation() {
      if (this.form.PlagueArea !== "是") {
        this.form.SpecificPlagueLocation = ""; // 清空具体地点
      }
    },
    clearAnthraxLocation() {
      if (this.form.AnthraxArea !== "是") {
        this.form.SpecificAnthraxLocation = ""; // 清空具体地点
      }
    },
    clearMalariaLocation() {
      if (this.form.MalariaArea !== "是") {
        this.form.SpecificMalariaLocation = ""; // 清空具体地点
      }
    },
    clearContactDate() {
      if (this.form.ContactWithAnimalProducts !== "是") {
        this.form.ContactDate = "";
      }
    },
    clearContactPlace() {
      if (this.form.ContactWithAnimals !== "是") {
        this.form.ContactPlace = "";
        this.form.HasContactWithRat = false;
        this.form.HasContactWithMarmot = false;
        this.form.HasContactWithLice = false;
        this.form.HasContactWithFlea = false;
        this.form.HasContactWithCat = false;
        this.form.HasContactWithBird = false;
        this.form.HasContactWithPig = false;
        this.form.HasContactWithHorse = false;
        this.form.HasContactWithMule = false;
        this.form.HasContactWithDonkey = false;
        this.form.HasContactWithCow = false;
        this.form.HasContactWithSheep = false;
        this.form.HasContactWithDog = false;
        this.form.HasContactWithRabbit = false;
        this.form.HasContactWithWolf = false;
        this.form.HasContactWithTiger = false;
        this.form.HasContactWithOtherAnimal = false; // 是否接触其他动物
      }
    },

    handleOtherChange() {
      if (!this.form.HasContactWithOtherAnimal) {
        this.form.OtherAnimalName = "";
      }
    },
    clearRatContactMethod() {
      if (this.form.ContactWithRatIn2Months !== "是") {
        this.form.RatContactMethod = "";
      }
    },
    handleReset() {
      this.form = this.getInitialForm();
      this.message = "";
    },
    getInitialForm() {
      return {
        ContactWithFeverPatient: "", // 与发热患者接触情况
        ContactWithDiarrheaPatient: "", // 与腹泻患者接触情况
        ContactWithRashPatient: "", // 与皮疹患者接触情况
        ContactWithTuberculosisPatient: "", // 与结核病患者接触情况

        IsGroupDining: false, // 5天内是否集体堂食就餐
        IsDiningOut: false, // 5天内是否外出就餐
        IsDiningUnclear: false, // 5天内就餐情况不清楚

        HasDrinkingRawWater: false, // 是否饮生水
        HasEatingRawFood: false, // 是否吃生冷食品
        HasEatingColdCookedFood: false, // 是否熟食冷吃
        HasEatingSeafood: false, // 是否吃海水产品

        FoodNames: "", // 食物名字
        DiningPlace: "", // 就餐地点

        GroupOutbreak: "", // 同一家庭、办公室、车间等集体单位是否有聚集性发病
        OutdoorStayOrWorkWithinMonth: "", // 发病前1月内是否在野外住宿或工作
        WildActivityHistory: "", // 野外/户外活动史
        OtherWildActivityName: "", // 其他活动名称

        PlagueArea: "", // 是否到过鼠疫流行区
        SpecificPlagueLocation: "", // 具体地点

        AnthraxArea: "", // 是否到过炭疽流行区
        SpecificAnthraxLocation: "", // 具体地点

        MalariaArea: "", // 是否到过疟疾流行区
        SpecificMalariaLocation: "", // 具体地点

        ContactWithAnimalProducts: "", // 是否接触过动物制品
        ContactDate: "", //接触时间

        ContactWithAnimals: "", // 是否接触过动物
        ContactPlace: "", //  接触地点
        HasContactWithRat: false,
        HasContactWithMarmot: false,
        HasContactWithLice: false,
        HasContactWithFlea: false,
        HasContactWithCat: false,
        HasContactWithBird: false,
        HasContactWithPig: false,
        HasContactWithHorse: false,
        HasContactWithMule: false,
        HasContactWithDonkey: false,
        HasContactWithCow: false,
        HasContactWithSheep: false,
        HasContactWithDog: false,
        HasContactWithRabbit: false,
        HasContactWithWolf: false,
        HasContactWithTiger: false,
        HasContactWithOtherAnimal: false, // 是否接触其他动物
        OtherAnimalName: "",
      };
    },

    getData() {
      return this.form; // 返回当前组件的表单数据
    },
  },
};
</script>


<style src="@/styles/NextContainer.css" scoped></style>
<style  scoped>
.custom-drawer {
  height: 100%;
}
.form-container {
  margin-top: 10px;
}
.title {
  position: fixed;
  top: 0;
  right: 0;
  width: 700px;
  background: #ffffff;
  padding-bottom: 25px;
  z-index: 100;
  border: 3px solid #fafafa;
}
.custom-input {
  margin-bottom: 10px;
}
.el-dropdown-link:focus {
  outline: none;
}

.el-check-tag {
  margin: 10px;
  font-weight: normal;
}
.el-check-tag.is-checked {
  background-color: #285ac8 !important;
  color: #fff !important;
  font-weight: normal;
}
.GeneralSymptoms {
  margin-top: 20px;
  margin-left: 20px;
}
.Condition {
  margin-top: 30px;
}
.el-form-item {
  display: flex;
  /* flex-direction: column; */
}

.el-radio-group {
  margin-top: 5px;
}

.title-container {
    display: flex;
    margin-left: 0px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  
  .blue-box {
    width: 6px;
    height: 18px;
    background-color: #285ac8;
    margin-right: 10px;
  }
  
  .title-text {
    font-size: 12px;
    font-weight: bold;
    color: #4a4a4a;
  }


</style>