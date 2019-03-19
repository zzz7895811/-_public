<template>
  <el-container id="wrap">
    <el-main>
      <el-form>
        <el-form-item class="rules" label="ERP字段" prop="notifyobject">
          <el-select v-model="supportModel.erpField" placeholder="请选择" @change="selChange">
            <el-option v-for="e in erpData" :key="e.value" :label="e.label" :value="e.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <supportCol :SetData="getSupportColData"></supportCol>
      <div>
        <el-input placeholder="请输入内容" v-model="formulaContent" :disabled="true"></el-input>
      </div>
    </el-main>
  </el-container>
</template>

<script>
const COLOR_RED = Symbol("red");
const COLOR_YELLOW = Symbol("yellow");
const COLOR_BLUE = Symbol("blue");
import supportCol from "@/view/colSettingRight";
export default {
  components: {
    supportCol
  },
  data() {
    return {
      titleContent: "ERP字段",
      titleContent2: "供应链字段",
      strList: [],
      supportModel: {
        erpField: ""
      },
      firstSupport: "",
      moreSupportList: [],
      erpData: [
        {
          value: "hjg",
          label: "黄金糕"
        },
        {
          value: "spn",
          label: "双皮奶"
        },
        {
          value: "kzj",
          label: "蚵仔煎"
        },
        {
          value: "lxm",
          label: "龙须面"
        },
        {
          value: "bjky",
          label: "北京烤鸭"
        }
      ]
    };
  },

  methods: {
    test(){
      console.log(this.getConstantName(COLOR_RED))
    },
    getConstantName(color) {
      switch (color) {
        case COLOR_RED:
          return "COLOR_RED";
        case COLOR_YELLOW:
          return "COLOR_YELLOW ";
        case COLOR_BLUE:
          return "COLOR_BLUE";
        default:
         // throw new Exception("Can't find this color");
      }
    },
    selChange(val) {
      this.strList = [];
      this.checkmoreSupportList();
    },
    getSupportColData(d) {
      const _this = this;
      this.moreSupportList = [];
      this.strList = [];
      this.firstSupport = d.stratField;
      d.moreField.forEach(e => {
        //循环写入其余字段
        _this.moreSupportList.push(e);
      });
      _this.checkmoreSupportList();
    },
    checkmoreSupportList() {
      const _this = this;
      this.strList.push(_this.supportModel.erpField); //添加ERP字段
      this.strList.push("=");
      this.strList.push(_this.firstSupport); //添加第一个供应链字段
      //若字段不为空 写入文本集合
      if (_this.moreSupportList.length > 0) {
        _this.moreSupportList.forEach(e => {
          _this.strList.push(e.mark);
          _this.strList.push(e.field);
        });
      }
    }
  },
  mounted: function() {
    this.test()
  },
  computed: {
    formulaContent: {
      get() {
        let str = "";
        this.strList.forEach(el => {
          str += el;
        });
        return str;
      },
      set(newValue) {
        return newValue;
      }
    }
  }
};
</script>

<style scoped lang='less'>
@import "../view/style/style.less";
</style>


