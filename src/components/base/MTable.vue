<template>
  <m-popup
    v-if="showPopup"
    @closePopup="closePopup"
    :isWarning="isPopupWarning"
    :question="popupQuestion"
    @popupButtonSellect="popupButtonSellect"
  ></m-popup>
  <table class="table">
    <tr class="table-title">
      <th style="min-width: 30px" class="first-column-1">
        <input
          type="checkbox"
          name=""
          id=""
          @click="tickCheckbox"
          v-model="tickedCheckbox"
        />
      </th>
      <th
        v-for="(item, index) in titleTable"
        :key="index"
        :style="{ 'min-width': item.Width }"
        :class="item.Cellclass"
        :title="item.Title"
      >
        {{ item.Name }}
      </th>
      <th style="min-width: 120px" class="last-column last-column-1">
        CHỨC NĂNG
      </th>
    </tr>
    <tr @dblclick="showForm(empl)" v-for="(empl, i) in employeeList" :key="i">
      <td style="min-width: 30px" class="first-column">
        <input type="checkbox" @click="childTicked(i)" v-model="listCheck[i]" />
      </td>
      <td
        v-for="(item, index) in titleTable"
        :key="index"
        :class="item.Cellclass"
        :style="{ 'min-width': item.Width }"
      >
        {{ formatTableDate(item.FieldName, empl[item.FieldName]) }}
      </td>
      <td
        style="min-width: 120px"
        class="last-column"
        :style="
          empl.EmployeeCode === clickedEmployee.EmployeeCode
            ? { 'z-index': trZIndex }
            : ''
        "
      >
        <div class="table-option">
          <div class="fix-empl" @click="showForm(empl)">Sửa</div>
          <div
            class="more-option__btn"
            @click="toggleOption(empl)"
            v-click-away="
              empl.EmployeeCode === clickedEmployee.EmployeeCode
                ? closeOption
                : ''
            "
          ></div>
          <div
            class="more-option"
            v-if="empl.EmployeeCode == clickedEmployee.EmployeeCode"
          >
            <div class="option-items">Nhân bản</div>
            <div
              class="option-items"
              @click="showDeleteWarningPopup(empl.EmployeeId)"
            >
              Xoá
            </div>
            <div class="option-items">Ngưng sử dụng</div>
          </div>
        </div>
      </td>
    </tr>
  </table>
</template>
<script>
import moment from "moment";
import { titleTable, questionPopup, toastActivity } from "@/js/resource.js";
import { buttonStatus, toastStatus, defaultPagingParams } from "@/js/enum.js";
import { deleteEmoloyeeByID } from "@/axios/controller/employee-controller.js";
export default {
  props: {
    //danh sách nhân viên truyền từ component EmployeeList
    employeeList: {
      Type: Array,
      default: [],
    },

    pagingParamsProp: {
      Type: Object,
    },
  },
  watch:{
    pagingParamsProp: {
      handler(){
        console.log("change");
        console.log(this.pagingParamsProp);
      },
      immediate: true,
      deep: true,
    }
  },
  data() {
    return {
      titleTable: titleTable,
      tickedCheckbox: false,
      clickedEmployee: {},
      listCheck: [],
      trZIndex: 2,
      employeeDataList: [],
      isPopupWarning: false,
      showPopup: false,
      questionPopup: questionPopup,
      popupQuestion: "",
      buttonStatusList: buttonStatus,
      employeeSelectedID: "",
      tikedAmount: 0,
      toastStatusList: toastStatus,
      toastActivityList: toastActivity,
      toastStatusTxt: "",
      toastActivityTxt: "",
      defaultPagingParams: defaultPagingParams,
      pagingParams: {},
    };
  },
  methods: {
    /**
     * Hàm format ngày để hiển thị trên bảng
     * author: VietDV(25/2/2023)
     */
    formatTableDate(name, data) {
      if (name == "DateOfBirth" && data) {
        const date = new Date(data);
        return moment(date).format("DD/MM/YYYY");
      }
      return data;
    },

    /**
     * Hiển thị các chức năng với 1 nhân viên nếu đang ẩn
     * Hoặc ẩn các chức năng với 1 nhân viên nếu đang hiện
     * author: VietDV(18/2/2023)
     */
    toggleOption(employee) {
      if (this.clickedEmployee.EmployeeCode === employee.EmployeeCode) {
        this.trZIndex = 2;
        this.clickedEmployee = {};
      } else {
        this.trZIndex = 3;
        this.clickedEmployee = employee;
      }
    },
    /**
     * Ẩn các chức năng với 1 nhân viên khi click ra ngoài
     * author: VietDV(18/2/2023)
     */
    closeOption() {
      this.trZIndex = 2;
      this.clickedEmployee = {};
    },
    /**
     * Hiển thị form sửa thông tin nhân viên
     * author: VietDV(18/2/2023)
     */
    showForm(empl) {
      this.$emit("showLoadingLayer");
      this.$emit("fixEmployee", empl);
    },
    /**
     * Tích chọn toàn bộ nhân viên trong bảng hoặc bỏ chọn toàn bộ
     * author: VietDV(23/2/2023)
     */
    tickCheckbox() {
      this.tickedCheckbox = !this.tickedCheckbox;
      if (this.tickedCheckbox == true) {
        for (let i = 0; i < this.employeeList.length; i++) {
          this.listCheck[i] = true;
          this.tikedAmount = this.employeeList.length;
        }
      } else {
        for (let i = 0; i < this.employeeList.length; i++) {
          this.listCheck[i] = false;
          this.tikedAmount = 0;
        }
      }
      this.$emit("showTikedAmount", this.tikedAmount);
    },
    /**
     * Khi bỏ chọn 1 nhân viên bất kì thì ô chọn tất cả bỏ chọn
     * author: VietDV(23/2/2023)
     * @param {*} index
     */
    childTicked(index) {
      if (this.listCheck[index] == true) {
        this.listCheck[index] = false;
        this.tickedCheckbox = false;
      } else {
        this.listCheck[index] = true;
        for (let i = 0; i < this.employeeList.length; i++) {
          if (typeof this.listCheck[i] == "undefined") {
            this.listCheck[i] = false;
          }
        }
        if (!this.listCheck.includes(false)) {
          this.tickedCheckbox = true;
        }
      }
      this.tikedAmount = 0;
      for (let index = 0; index < this.employeeList.length; index++) {
        if (this.listCheck[index] == true) {
          this.tikedAmount += 1;
        }
      }
      this.$emit("showTikedAmount", this.tikedAmount);
    },

    /**
     * call API xoá nhân viên theo ID
     * author: VietĐV(1/3/2023)
     * @param {EmployeeID} id
     */
    deleteEmployee: async function (id) {
      try {
        const res = await deleteEmoloyeeByID(id);
        console.log(res);
        if (res.status == 200) {
          // this.$emit("deleteSuccessToast");
          this.toastStatusTxt = this.toastStatusList.Success;
          this.toastActivityTxt = this.toastActivityList.DeleteSuccess;
          this.$emit(
            "showToastMessage",
            this.toastStatusTxt,
            this.toastActivityTxt
          );
          this.$emit("refreshData");
        } else {
          // this.$emit("deleteFailToast")
          this.toastStatusTxt = this.toastStatusList.Fail;
          this.toastActivityTxt = this.toastActivityList.DeleteFail;
          this.$emit(
            "showToastMessage",
            this.toastStatusTxt,
            this.toastActivityTxt
          );
          this.$emit("hideLoadingLayer");
        }
      } catch (error) {
        console.log(error);
        this.$emit("deleteFailToast");
        this.$emit("hideLoadingLayer");
      }
    },

    /**
     * Hiển thị cảnh báo khi xoá nhân viên
     * author: VietDV(2/3/2023)
     */
    showDeleteWarningPopup(id) {
      this.employeeSelectedID = id;
      this.showPopup = true;
      this.isPopupWarning = true;
      this.popupQuestion = questionPopup.deleteData;
    },

    /**
     * Xử lý sự kiện click các nút trong popup
     * author: VietDV(2/3/2023)
     * @param {*} status
     */
    popupButtonSellect(status) {
      if (status == this.buttonStatusList.No) {
        this.showPopup = false;
      } else {
        this.$emit("showLoadingLayer");
        this.deleteEmployee(this.employeeSelectedID);
        this.showPopup = false;
      }
    },
  },
};
</script>

<style>
@import url(../../css/main.css);
</style>
