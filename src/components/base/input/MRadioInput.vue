<template>
  <div class="sex-selection__item" v-for="(item,index) in data" :key="index">
    <input type="radio" 
    :id="index"
    :value="item.value"
    @input="changeInput($event)"
    v-model="selectedItem"
    class="sex-selection__item--input" />
    <label :for="index" class="sex-selection__item--text">{{ item.labelTxt }}</label>
  </div>
</template>

<script>
export default {
  name: "RadioInput",
  watch:{
    selected: {
            handler() {
              this.selectedItem = this.selected;
            },
            immediate: true,
            deep: true
        }
  },
  props:{
    //Biến lưu dữ liệu các ô radio input truyền vào từ component Form
    data:{
        Type: Array,
        default: [
        {
          value: 0,
          name: "cbxRadio",
          labelTxt: "Giá trị 1",
        },
        {
          value: 1,
          name: "cbxRadio",
          labelTxt: "Giá trị 2",
        },
        {
          value: 2,
          name: "cbxRadio",
          labelTxt: "Giá trị 3",
        },
      ],
    },
    //Biến lưu truyền giá trị đang được chọn từ component Form
    selected: String
  },
  data() {
    return {
        selectedItem: String
    }
  },
  methods: {
    /**
     * Hàm đẩy value được chọn lên component cha để hiển thị
     * author: VietDV(24/2/2023)
     * @param {*} event 
     */
    changeInput(event){
      // console.log(event.target.value);
      this.$emit("updateSelectedItem", parseInt(event.target.value));
    }
  },
};
</script>

<style>
@import url(@/css/main.css);
</style>
