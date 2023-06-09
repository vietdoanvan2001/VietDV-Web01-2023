<template>
  <div
    class="detail-combobox__container"
    :class="{ error_input: (errorValueData.class || errorBorder), focus_boder : isFocus}"
    v-click-away="closeOption"
  >
    <div class="detail-combobox__searchField">
      <input
        :value="inputValue != '' ? inputValue : getValue(valueID)"
        @focus="focusIn"
        @focusout="focusOut($event)"
        @input="searchValue($event)"
        v-on:keydown="inputOnKeyDown"
        :ref="name"
        class="detail-combobox__input"
      />
      <div class="detail-combobox__button" @click="clickSelectButton">
        <div :class="iconClass"></div>
      </div>
    </div>
    <div class="detail-combobox-tooltip" v-show="showTooltip">
      {{ errorTitle || errorValueData.title }}
    </div>
    <div class="detail-combobox__selectField" v-if="showSelectField">
      <table class="detail-combobox__selectField--table">
        <tr class="detail-combobox__selectField--item">
          <th class="w-30 item--title">
            {{ this.detailComboboxTitle[this.name].Code }}
          </th>
          <th class="w-70 item--title">
            {{ this.detailComboboxTitle[this.name].Name }}
          </th>
        </tr>
        <tr
          v-for="(item, index) in searchData"
          :key="item.PositionId"
          @click="selectedItem(item, index)"
          :class="{ 'item-row__active': activeOption[index] }"
          class="detail-combobox__selectField--item item-row"
        >
          <td class="w-30 item--data">
            {{
              this.name == this.listComboboxName.PositionId.name ? item.PositionCode : item.DepartmentCode
            }}
          </td>
          <td class="w-70 item--data">
            {{
              this.name == this.listComboboxName.PositionId.name ? item.PositionName : item.DepartmentName
            }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import {
  getAllPositions,
  getAllDepartments,
} from "@/axios/controller/department-controller.js";
import { listValidateField,warningTxt } from "@/js/resources.js";
import { detailComboboxTitle, keyCodeName } from "@/js/enum.js";
import removeAccents from 'remove-accents';
export default {
  name: "DetailCombobox",
  filters: {
    /**
     * Chuyển chữ có dấu thành không dấu phục vụ cho tìm kiếm
     * @param {*} value 
     */
    removeAccents: function (value) {
      return removeAccents(value);
    },
  },
  props: {
    //Biến xác định là combobox Position hay Department
    name: String,
    //Lưu ID truyền vào từ component EmployeeDetail phục vụ cho lấy object đơn vị hoặc chức vụ
    valueID: String,
    //Biến để kiểm tra trường có bắt buộc nhập không truyền từ component Form
    isRequire: {
      type: Boolean,
      default: false,
    },
    //Biến lưu thông tin lỗi của input
    errorValueProp: {
      Type: Object,
      default: {},
    },
    //Kiểm tra xem form đã được reset chưa
    resetData: {
      Type: Boolean,
      default: false,
    },
    //Trường chỉ định focus khi mở form truyền từ component Form
    focusFieldName: {
      type: Boolean,
      default: false,
    },
    //Biến theo dõi sự kiện đóng popup báo lỗi
    watchForm: Boolean,

    //Biến xác định xem có phải form sửa không
    isFix: Boolean
  },
  created() {
    if (this.name == this.listComboboxName.PositionId.name) {
      this.getPositionData();
    } else {
      this.getDepartmentData();
    }
  },
  mounted() {
    this.$nextTick(function () {
      // Focus vào trường ưu tiên
      if (this.focusFieldName && typeof this.$refs[this.focusFieldName] !== 'undefined') {
        this.$refs[this.focusFieldName].focus();
      }
    });
  },
  data() {
    return {
      iconClass: "combobox-icon",
      showSelectField: false,
      comboboxData: [],
      itemSelect: {},
      activeOption: [],
      inputValue: "",
      detailComboboxTitle: detailComboboxTitle,
      showTooltip: false,
      errorTitle: "",
      errorBorder: false,
      errorValueData: {},
      listComboboxName: listValidateField,
      searchData: [],
      indexSelected: -1,
      keyCodeName:keyCodeName,
      warningText: warningTxt,
      isFocus: false
    };
  },
  watch: {
    /**
     * Theo dõi sự thay đổi của errorValueProp để cập nhật errorValueData
     * author: VietDV(3/3/2023)
     */
    errorValueProp: {
      handler() {
        this.errorValueData = this.errorValueProp;
        if (!this.errorValueData.title) {
          this.showTooltip = false;
          this.errorValueData = {};
        } else {
          this.showTooltip = true;
        }
      },
      immediate: true,
      deep: true,
    },

    /**
     * Theo dõi sự kiện nếu form reset thì reset combobox value
     * author: VietDV(4/3/2023)
     */
    resetData: {
      handler() {
        if (this.resetData == true) {
          this.activeOption = {...false};
          this.indexSelected = -1;
          this.inputValue = "";
          this.$emit("resetComboboxDataStatus");
        }
      },
      immediate: true,
      deep: true,
    },

    /**
     * Theo dõi sự kiện đóng popup cảnh báo lỗi để focus vào lỗi đầu tiên
     * author: VietDV(4/3/2023)
     */
    watchForm: {
      handler() {
        if (this.isRequire) {
          this.$nextTick(function () {
            // Focus vào trường ưu tiên
            if (this.focusFieldName && typeof this.$refs[this.focusFieldName] !== 'undefined') {
              this.$refs[this.focusFieldName].focus();
            }
          });
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    /**
     * Sự kiện click vào nút dropdown
     * author: VietDV(3/3/2023)
     */
    clickSelectButton() {
      this.removeError();
      if (this.iconClass == "combobox-icon") {
        this.iconClass = "combobox-icon-up";
      } else {
        this.iconClass = "combobox-icon";
      }
      this.showSelectField = !this.showSelectField;
    },

    /**
     * Hàm call api lấy toàn bộ danh sách chức vụ
     * author: VietDV(3/3/2023)
     */
    getPositionData: async function () {
      try {
        const res = await getAllPositions();
        if (res.data.length > 0) {
          this.comboboxData = res.data;
          this.searchData = { ...this.comboboxData };
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm call api lấy toàn bộ danh sách đơn vị
     * author: VietDV(3/3/2023)
     */
    getDepartmentData: async function () {
      try {
        const res = await getAllDepartments();
        if (res.data.length > 0) {
          this.comboboxData = res.data;
          this.searchData = { ...this.comboboxData };
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm xử lý event chọn một item trong selectedField
     * author: VietDV(3/3/2023)
     * @param {*} item
     * @param {*} index
     */
    selectedItem(item, index) {
      this.activeOption = {...false};
      this.activeOption[index] = true;
      this.indexSelected = index;
      this.itemSelect = item;
      if (this.name == this.listComboboxName.DepartmentId.name) {
        this.inputValue = this.itemSelect.DepartmentName;
        this.$emit("updateValue", this.itemSelect.DepartmentId);
      } else {
        this.inputValue = this.itemSelect.PositionName;
        this.$emit("updateValue", this.itemSelect.PositionId);
      }
      this.showSelectField = false;
    },

    /**
     * Hàm xử lý event focus
     * author: VietDV(3/3/2023)
     */
    focusIn(){
      this.openOption()
      this.isFocus = true
    },

    /**
     * Hàm xử lý event focus out
     * author: VietDV(3/3/2023)
     */
    focusOut(e){
      this.isFocus = false
      //Validate trường đơn vị không để trống
      if (!e.target.value.trim()) {
        if(this.name == this.listComboboxName.DepartmentId.name){
          this.errorTitle = this.listComboboxName.DepartmentId.label + " " + this.warningText.Require;
          this.$emit("addError", this.errorTitle);
          this.errorBorder = true;
          this.showTooltip = true;
        } else {
          this.$emit("removeError", this.errorTitle);
          this.errorBorder = false;
          this.showTooltip = false;
        }
      }
      // if(this.indexSelected>-1)
        this.closeOption()
    },

    /**
     * Hàm đóng selectedField
     * author: VietDV(3/3/2023)
     */
    closeOption() {
      this.iconClass = "combobox-icon";
      this.showSelectField = false;      
    },

    /**
     * Hàm mở selectedField
     * author: VietDV(3/3/2023)
     */
    openOption() {
      this.iconClass = "combobox-icon-up";
      this.showSelectField = true;
      this.removeError();
    },

    /**
     * Hàm tìm kiếm giá trị trong selectedField
     * author: VietDV(4/3/2023)
     * @param {*} $event
     */
    searchValue(event) {
      this.showSelectField = true
      this.searchData = [];
      let s = event.target.value;
      this.inputValue = s;
      if(this.inputValue == ''){
        // this.activeOption[this.indexSelected] = false
        for(let i =0;i<5;i++)
        this.activeOption[i] = false
        this.indexSelected = -1
      }
      if (this.name == this.listComboboxName.PositionId.name) {
        for (let i = 0; i < this.comboboxData.length; i++) {
          let item = this.comboboxData[i];
          if (
            removeAccents(item.PositionCode.toLowerCase()).includes(removeAccents(s.toLowerCase())) ||
            removeAccents(item.PositionName.toLowerCase()).includes(removeAccents(s.toLowerCase()))
          ) {
            this.searchData.push(item);
          }
        }
      } else {
        for (let i = 0; i < this.comboboxData.length; i++) {
          let item = this.comboboxData[i];
          if (
            removeAccents(item.DepartmentCode.toLowerCase()).includes(removeAccents(s.toLowerCase())) ||
            removeAccents(item.DepartmentName.toLowerCase()).includes(removeAccents(s.toLowerCase()))
          ) {
            this.searchData.push(item);
          }
        }
      }
      
    },

    /**
     * Xử lý sự kiện keydown chọn value của combobox
     * author: VietDV(4/3/2023)
     * @param {*} event
     */
    inputOnKeyDown(event) {
      this.activeOption = { ...false };
      //Nhấn nút mũi tên xuống
      if (event.keyCode == this.keyCodeName.Down) {
        this.indexSelected += 1;
        //điều kiện cho indexSelected không vượt quá số lượng dữ liệu
        if(this.indexSelected >= Object.keys(this.searchData).length){
          this.indexSelected = Object.keys(this.searchData).length - 1;
        }
        //gán css active cho item được chọn
        this.activeOption[this.indexSelected] = true;
        //gán value item được chọn cho inputField để hiển thị
        if (this.name == this.listComboboxName.DepartmentId.name) {
          this.inputValue = this.searchData[this.indexSelected].DepartmentName;
        } else {
          this.inputValue = this.searchData[this.indexSelected].PositionName;
        }
      } 
      //nhấn nút mũi tên xuống
      else if (event.keyCode == this.keyCodeName.Up) {
        this.indexSelected -= 1;
        //điều kiện cho indexSelected không vượt quá số lượng dữ liệu
        if(this.indexSelected < 0){
          this.indexSelected = 0;
        }
        this.activeOption[this.indexSelected] = true;
        if (this.name == this.listComboboxName.DepartmentId.name) {
          this.inputValue = this.searchData[this.indexSelected].DepartmentName;
        } else {
          this.inputValue = this.searchData[this.indexSelected].PositionName;
        }
      } 
      //Nhấn enter
      else if (event.keyCode == this.keyCodeName.Enter) {
        this.activeOption[this.indexSelected] = true;
        if (this.name == this.listComboboxName.DepartmentId.name) {
          this.inputValue = this.searchData[this.indexSelected].DepartmentName;
          this.$emit("updateValue", this.searchData[this.indexSelected].DepartmentId);
        } else {
          this.inputValue = this.searchData[this.indexSelected].PositionName;
          this.$emit("updateValue", this.searchData[this.indexSelected].PositionId);
        }
        this.closeOption()
      } 
      //Nhấn tab
      else if (event.keyCode == this.keyCodeName.Tab) {
        this.activeOption[this.indexSelected] = true;
        if (this.name == this.listComboboxName.DepartmentId.name) {
          if(typeof this.searchData[this.indexSelected] !== 'undefined'){
            this.inputValue = this.searchData[this.indexSelected].DepartmentName;
            this.$emit("updateValue", this.searchData[this.indexSelected].DepartmentId);
          }
          else{
            this.inputValue = ''
          }
        } else {
          if(typeof this.searchData[this.indexSelected] !== 'undefined'){
            this.inputValue = this.searchData[this.indexSelected].PositionName;
            this.$emit("updateValue", this.searchData[this.indexSelected].PositionId);
          }
          else{
            this.inputValue = ''
          }
        }
      }
    },

    /**
     * Active item được chọn 
     * author: VietDV(3/3/2023)
     */
    getValue(id) {
      if (this.name == this.listComboboxName.PositionId.name) {
        for (let i = 0; i < this.comboboxData.length; i++) {
          if (id === this.comboboxData[i].PositionId) {
            this.activeOption[i] = true;
            this.indexSelected = i;
          }
        }
        this.getPositionName(id);
      } else {
        for (let i = 0; i < this.comboboxData.length; i++) {
          if (id === this.comboboxData[i].DepartmentId) {
            this.activeOption[i] = true;
            this.indexSelected = i;
          }
        }
        this.getDepartmentName(id);
      }
    },

    /**
     * Hàm lấy tên đơn vị theo id
     * author: VietDV(3/3/2023)
     * @param {*} id
     */
    async getDepartmentName(id) {
      if (id) {
        for (let i = 0; i < this.comboboxData.length; i++) {
          if (id === this.comboboxData[i].DepartmentId) {
            if(this.isFix){
              this.inputValue = this.comboboxData[i].DepartmentName;
            }
          }
        }
      }
    },

    /**
     * Hàm lấy tên chức danh theo id
     * author: VietDV(3/3/2023)
     * @param {*} id
     */
    async getPositionName(id) {
      if (id) {
        for (let i = 0; i < this.comboboxData.length; i++) {
          if (id === this.comboboxData[i].PositionId) {
            if(this.isFix){
              this.inputValue = this.comboboxData[i].PositionName;
            }
          }
        }
      }
    },

    /**
     * Xoá bỏ css lỗi khi focus vào
     * author: VietDV(3/3/2023)
     */
    removeError() {
      this.errorValueData = {};
      this.errorBorder = false;
      this.showTooltip = false;
    },

  },
};
</script>

<style>
@import url(@/css/components/detail-combobox.css);
.error_input {
  /* border: 1px solid var(--input-border-color-warning) !important; */
  border: none;
}

.focus_boder{
  border: 1px solid #50b83c !important;
  /* border: none; */
}

.detail-combobox-tooltip {
  min-width: 140px;
  color: red;
  top: 54px;
  z-index: 2;
  font-size: 12px;
  /* padding: 4px; */
  /* margin-top: -14px; */
}
</style>
