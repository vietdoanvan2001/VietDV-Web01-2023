<template>
  <loading-layer v-if="showLoading"></loading-layer>
  <div class="container"
  >
    <m-popup
      v-if="showPopup"
      @closePopup="closePopup"
      :listErrorPopup="listError"
      :isQuestion="isPopupQuestion"
      :question="popupQuestion"
    ></m-popup>
    <EmployeeDetail
      v-if="showForm"
      :selectedEmployeeID="selectedEmployee.EmployeeId"
      :isFixEmployee="isFixEmployee"
      :popupClosed="popupClosed"
      :serverError="serverErrorReturn"
      @closeForm="closeForm"
      @openForm="openForm"
      @showError="showError"
      @showLoadingLayer="showLoadingLayer"
      @hideLoadingLayer="hideLoadingLayer"
      @postData="postData"
      @updateEmployee="updateEmployee"
      @showQuestion="showQuestion"
      @refreshData="refreshData"
      @showToastMessage="showToastMessage" 
      @closePopup="closePopup"
    ></EmployeeDetail>
    <div class="content-head">
      <div class="content-title">Nhân viên</div>
      <dialog-button
        text="Thêm mới nhân viên"
        class="table-btn"
        @click="openForm"
      ></dialog-button>
    </div>
    <div class="content-body">
      <div class="content-option">
        <div class="content-option__left">
          <div class="selectedAmount">Đã chọn <span style="font-family: Notosans-bold;">{{ tikedAmount }}</span></div>
          <div class="untickedAll">Bỏ chọn</div>
          <div class="tickedAll">Chọn tất cả</div>
          <!-- <sub-dialogButton text="Xoá tất cả" 
          class="mgl-18"
          :class="{'deleteAllButton': disableButton}"></sub-dialogButton> -->
          <m-subButton text="Xoá tất cả"
          :class="{'deleteAllButton': disableButton}"
          ></m-subButton>
        </div>
        <div class="content-option__right">
          <div class="content_search-input">
            <input
              type="text"
              class="inputField"
              placeholder="Tìm theo mã, tên nhân viên"
            />
            <div class="inputIcon"></div>
          </div>
          <div
            class="content_refresh-icon content-icon"
            @click="refreshData"
          ></div>
        </div>
      </div>
      <m-table
        @fixEmployee="fixEmployee"
        @getEmployeeAmount="getEmployeeAmount"
        @refreshData="refreshData"
        @showLoadingLayer="showLoadingLayer"
        @hideLoadingLayer="hideLoadingLayer"
        @deleteSuccessToast="deleteSuccessToast"
        @deleteFailToast="deleteFailToast"
        @showTikedAmount="showTikedAmount"
        @showToastMessage="showToastMessage"
        :employeeList="employeeList"
        :pagingParamsProp="pagingParams"
      ></m-table>
      <m-paging 
      :employeeAmount="employeeAmount"
      @changePageSize="pagingParams.pageSize = $event"
      ></m-paging>
      <toast-message
        :toastStatusTxt="toastStatusTxt"
        :toastActivityTxt="toastActivityTxt"
        v-if="showToast"
      ></toast-message>
    </div>
  </div>
</template>

<script>
import {
  getAllEmployee,
} from "@/axios/controller/employee-controller";
import EmployeeDetail from "@/views/employee/EmployeeDetail.vue";
import { toastActivity } from "@/js/resource.js";
import { toastStatus,defaultPagingParams } from "@/js/enum.js";
export default {
  name: "EmployeeList",
  components: {
    EmployeeDetail, 
  },
  created() {
    this.showLoading = true;
    this.pagingParams = this.defaultPagingParams
    this.loadData();
  },
  data() {
    return {
      showForm: false,
      showPopup: false,
      listError: [],
      selectedEmployee: {},
      employeeAmount: Number,
      isFixEmployee: false,
      showLoading: false,
      employeeList: [],
      showToast: false,
      toastStatusList: toastStatus,
      toastActivityList: toastActivity,
      toastStatusTxt: "",
      toastActivityTxt: "",
      popupClosed:false,
      tikedAmount: 0,
      disableButton: true,
      serverErrorReturn:{
        name:"",
        title:""
      },
      defaultPagingParams:defaultPagingParams,
      pagingParams:{}
    };
  },
  methods: {
    /**
     * Lấy số lượng bản ghi được chọn để hiển thị đồng thời able button xoá nhiều nếu có nhiều hơn 1 bản ghi được chọn
     * author: VietDV(6/3/2023)
     * @param {*} amount 
     */
    showTikedAmount(amount){
      this.tikedAmount = amount;
      if(this.tikedAmount>=1){
        this.disableButton = false
      }
      else{
        this.disableButton = true
      }
    },
    /**
     * Hiển thị form chi tiết nhân viên
     * author:  VietDV(18/2/2023)
     */
    openForm() {
      this.showForm = true;
    },

    /**
     * Đóng form chi tiết nhân viên
     * author: VietDV(18/2/2023)
     */
    closeForm() {
      this.showForm = false;
      this.isFixEmployee = false;
      this.selectedEmployee = {};
    },

    /**
     * Sửa thông tin chi tiết 1 nhân viên
     * author: VietDV(20/2/2023)
     */
    fixEmployee(employee) {
      this.showLoadingLayer();
      this.selectedEmployee = employee;
      this.isFixEmployee = true;
      this.openForm();
    },

    /**
     * Hiển thị popup cảnh báo lỗi
     * author: VietDV(20/2/2023)
     * @param {} inputError
     */
    showError(inputError) {
      this.listError = inputError;
      if (this.listError.length > 0) {
        this.showPopup = true;
      }
    },

    /**
     * Đóng popup Cảnh báo lỗi
     * author: VietDV(20/2/2022)
     */
    closePopup() {
      this.showPopup = false;
      this.popupClosed = !this.popupClosed
    },

    /**
     * Hàm load dữ liệu danh sách nhân viên hiển thị lên bảng
     * author: VietDV(25/2/2023)
     */
    loadData: async function () {
      try {
        const res = await getAllEmployee();
        if (res.status == 200) {
          this.employeeList = res.data;
          this.showLoading = false;
          this.employeeAmount = this.employeeList.length;
        }
      } catch (error) {
        console.log(error);
        this.showLoading = false;
      }
    },

    /**
     * Làm mới dữ liệu trong danh sách nhân viên
     * author: VietDV(28/2/2023)
     */
    refreshData() {
      this.showLoadingLayer();
      this.loadData();
    },

    /**
     * Hiện loading layer
     * author: VietDV(28/2/2023)
     */
    showLoadingLayer() {
      this.showLoading = true;
    },

    /**
     * Ẩn loading layer
     * author: VietDV(28/2/2023)
     */
    hideLoadingLayer() {
      this.showLoading = false;
    },

    /**
     * Hiển thị Toast message
     * author: VietDV(2/3/2023)
     */
    showToastMessage(status,activity) {
      this.toastStatusTxt = status;
      this.toastActivityTxt = activity;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    },
  },
};
</script>
<style>
@import url(../../css/views/employee-list.css);
</style>
