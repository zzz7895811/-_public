<template>
  <div>
    <el-form :model="supportModel" :rules="rules" ref="refSupport">
      <el-form-item class="rules" label="供应链字段" prop="stratField">
        <el-select v-model="supportModel.stratField" placeholder="请选择">
          <el-option v-for="e in supportData" :key="e.value" :label="e.label" :value="e.value"></el-option>
        </el-select>
        <el-button
          type="success"
          icon="el-icon-plus"
          v-if="isShow"
          circle
          @click="addMore(0)"
          size="mini"
        ></el-button>
      </el-form-item>
      <div id="moreFormula">
        <div v-for="(item,index) in supportModel.moreField" :key="index">
          <el-form-item
            :prop="'moreField.' + index + '.field'"
            :rules="[{required: true, message: '请选择供应链字段',trigger: 'change'}]"
          >
            <!-- 运算符 -->
            <el-select v-model="item.mark" placeholder="请选择" style="width:60px">
              <el-option v-for="m in markList" :key="m.value" :label="m.label" :value="m.value"></el-option>
            </el-select>
            <!-- 字段 -->
            <el-select v-model="item.field" placeholder="请选择">
              <el-option v-for="s in supportData" :key="s.value" :label="s.label" :value="s.value"></el-option>
            </el-select>
            <el-button
              type="success"
              icon="el-icon-plus"
              circle
              v-if="isHaveNext(index+1)"
              @click="addMore(index+1)"
              size="mini"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="remove(item)" size="mini"></el-button>
          </el-form-item>
        </div>
      </div>
      <el-button type="primary" @click="save">保存</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      supportModel: {
        stratField: "",
        moreField: []
      },
      rules: {
        stratField: [
          { required: true, message: "请选择供应链字段", trigger: "change" }
        ]
      },
      markList: [
        { label: "加", value: "+" },
        { label: "减", value: "-" },
        { label: "乘", value: "*" },
        { label: "除", value: "/" }
      ],
      supportData: [
        {
          value: "mf",
          label: "面粉"
        },
        {
          value: "nn",
          label: "牛奶"
        },
        {
          value: "bt",
          label: "白糖"
        },
        {
          value: "dc",
          label: "大葱"
        },
        {
          value: "syy",
          label: "食用油"
        }
      ]
    };
  },
  props: {
    SetData: {
      type: Function,
      required: true
    },
    params: {
      type: String
    }
  },
  watch: {
    supportModel: {
      handler: function(val, oldval) {
        const _this = this;
        _this.SetData(val);
      },
      deep: true
    }
  },
  computed: {
    isShow: {
      get() {
        if (this.supportModel.moreField.length > 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  },
  methods: {
    isHaveNext(index) {
      if (this.supportModel.moreField.length > index) {
        return false;
      }
      return true;
    },
    remove(item) {
      for (let i = this.supportModel.moreField.length - 1; i >= 0; i--) {
        if (this.supportModel.moreField[i].index == item.index) {
          this.supportModel.moreField.splice(i, 1);
        }
      }
    },
    addMore(index) {
      this.supportModel.moreField.push({
        mark: "+",
        field: "",
        index: index
      });
    },
    save() {
      this.$refs["refSupport"].validate(valid => {
        if (valid) {
          this.SetData(this.supportModel);
        }
      });
    }
  }
};
</script>