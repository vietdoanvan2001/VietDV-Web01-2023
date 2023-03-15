<template>
  <div class="detail-background"></div>
  <m-popup
    v-if="showPopup"
    :isQuestion="isPopupQuestion"
    :question="popupQuestion"
    @popupButtonSellect="popupButtonSellect"
    
  ></m-popup>
  <div class="detail" tabindex="0" @keydown="detailKeyDown">
    <div class="detail__head">
      <div class="detail__head-right">
        <h1 class="detail-name">
          {{ isFix ? formTitle.Fix : formTitle.Add }}
        </h1>
        <div class="detail__head-select">
          <input type="checkbox" name="" id="" />
          <div class="select__text">Là khách hàng</div>
        </div>
        <div class="detail__head-select">
          <input type="checkbox" name="" id="" />
          <div class="select__text">Là nhà cung cấp</div>
        </div>
      </div>
      <div class="detail__head-left">
        <div class="help-btn detail-icon"></div>
        <div class="close-btn detail-icon" @click="cancelDetail"></div>
      </div>
    </div>
    <div class="detail__container">
      <div class="block-1">
        <div class="detail-row-100">
          <div class="detail-input small-left">
            <label for="" class="detail-input__label"
              >Mã<span class="compulsory-field">*</span></label
            >
            <m-input
              @updateValue="employeeDetailData.EmployeeCode = $event"
              :value="employeeDetailData.EmployeeCode"
              :isRequire="true"
              @addError="addError"
              @removeError="removeError"
              :firstFocus="true"
              :name="validateForm.EmployeeCode.name"
              :fieldName="validateForm.EmployeeCode.label"
              :focusFieldName="focusField"
              :errorValueProp="validateForm.EmployeeCode"
              :watchForm="watchForm"
            >
            </m-input>
          </div>
          <div class="detail-input">
            <label for="" class="detail-input__label"
              >Tên<span class="compulsory-field">*</span></label
            >
            <m-input
              @updateValue="employeeDetailData.FullName = $event"
              :value="employeeDetailData.FullName"
              :isRequire="true"
              @addError="addError"
              @removeError="removeError"
              :name="validateForm.FullName.name"
              :fieldName="validateForm.FullName.label"
              :focusFieldName="focusField"
              :errorValueProp="validateForm.FullName"
              :watchForm="watchForm"
            />
          </div>
        </div>
        <div class="detail-input">
          <label for="" class="detail-input__label"
            >Đơn vị<span class="compulsory-field">*</span></label
          >
          <!-- <m-input
            @updateValue="employeeDetailData.DepartmentName = $event"
            :value="employeeDetailData.DepartmentName"
            :isRequire="true"
            @addError="addError"
            @removeError="removeError"
            :name="validateForm.DepartmentName.label"
            :errorValueProp="validateForm.DepartmentName"
          ></m-input> -->
          <detail-combobox
            :valueID="employeeDetailData.DepartmentId"
            @updateValue="employeeDetailData.DepartmentId = $event"
            @resetComboboxDataStatus="resetComboboxDataStatus"
            :name="validateForm.DepartmentId.name"
            :fieldName="validateForm.DepartmentId.label"
            :focusFieldName="focusField"
            :isRequire="true"
            :errorValueProp="validateForm.DepartmentId"
            :resetData="resetComboboxData"
            :watchForm="watchForm"
            :isFix="isFix"
          ></detail-combobox>
        </div>
        <div class="detail-input">
          <label for="" class="detail-input__label">Chức danh</label>
          <m-input
            :value="employeeDetailData.LastName"
            @updateValue="employeeDetailData.LastName = $event"
          ></m-input>
          <!-- <detail-combobox
            :name="validateForm.PositionId.name"
            :valueID="employeeDetailData.PositionId"
            :resetData="resetComboboxData"
            :isFix="isFix"
            @updateValue="employeeDetailData.PositionId = $event"
            @resetComboboxDataStatus="resetComboboxDataStatus"
          ></detail-combobox> -->
        </div>
      </div>
      <div class="block-2">
        <div class="detail-row-100">
          <div class="detail-input small-left">
            <label for="" class="detail-input__label">Ngày sinh</label>
            <m-input
              type="date"
              :name="validateForm.DateOfBirth.name"
              :focusFieldName="focusField"
              :watchForm="watchForm"
              :value="
                employeeDetailData.DateOfBirth
                  ? formatDate(employeeDetailData.DateOfBirth)
                  : employeeDetailData.DateOfBirth
              "
              @updateValue="employeeDetailData.DateOfBirth = $event"
              @addError="addError"
              @removeError="removeError"
            />
          </div>
          <div class="detail-input mgl-10">
            <label for="" class="detail-input__label">Giới tính</label>
            <div class="sex-selection">
              <radio-input
                :data="genderList"
                :selected="employeeDetailData.Gender"
                @updateSelectedItem="employeeDetailData.Gender = $event"
              ></radio-input>
            </div>
          </div>
        </div>
        <div class="detail-row-100">
          <div class="detail-input">
            <label class="detail-input__label" title="Số chứng minh nhân dân"
              >Số CMND</label
            >
            <m-input
              @updateValue="employeeDetailData.IdentityNumber = $event"
              :value="employeeDetailData.IdentityNumber"
              isOnlyNumber="true"
              :name="validateForm.IdentityNumber.name"
              :focusFieldName="focusField"
              :watchForm="watchForm"
              @addError="addError"
              @removeError="removeError"
            ></m-input>
          </div>
          <div class="detail-input small-right">
            <label for="" class="detail-input__label">Ngày cấp</label>
            <m-input
              type="date"
              :name="validateForm.IdentityDate.name"
              :focusFieldName="focusField"
              :watchForm="watchForm"
              :value="
                employeeDetailData.IdentityDate
                  ? formatDate(employeeDetailData.IdentityDate)
                  : employeeDetailData.IdentityDate
              "
              @updateValue="employeeDetailData.IdentityDate = $event"
              @addError="addError"
              @removeError="removeError"
            />
          </div>
        </div>
        <div class="detail-input">
          <label for="" class="detail-input__label">Nơi cấp</label>
          <m-input
            @updateValue="employeeDetailData.IdentityPlace = $event"
            :value="employeeDetailData.IdentityPlace"
          ></m-input>
        </div>
      </div>
      <div class="block-3">
        <div class="detail-input">
          <label for="" class="detail-input__label">Địa chỉ</label>
          <m-input
            @updateValue="employeeDetailData.Address = $event"
            :value="employeeDetailData.Address"
          ></m-input>
        </div>
        <div class="detail-row-75">
          <div class="detail-input equal">
            <label for="" class="detail-input__label" title="Điện thoại di động"
              >ĐT di động</label
            >
            <m-input
              @updateValue="employeeDetailData.PhoneNumber = $event"
              :value="employeeDetailData.PhoneNumber"
              :name="validateForm.PhoneNumber.name"
              :focusFieldName="focusField"
              :watchForm="watchForm"
              isOnlyNumber="true"
              @addError="addError"
              @removeError="removeError"
            ></m-input>
          </div>
          <div class="detail-input equal">
            <label for="" class="detail-input__label" title="Điện thoại cố định"
              >ĐT cố định</label
            >
            <m-input></m-input>
          </div>
          <div class="detail-input">
            <label for="" class="detail-input__label">Email</label>
            <m-input
              :value="employeeDetailData.Email"
              :name="'mail'"
              :focusFieldName="focusField"
              :watchForm="watchForm"
              @updateValue="employeeDetailData.Email = $event"
              @addError="addError"
              @removeError="removeError"
              isEmail="true"
            ></m-input>
          </div>
        </div>
        <div class="detail-row-75">
          <div class="detail-input equal">
            <label for="" class="detail-input__label"
              >Tài khoản ngân hàng</label
            >
            <m-input></m-input>
          </div>
          <div class="detail-input equal">
            <label for="" class="detail-input__label">Tên ngân hàng</label>
            <m-input></m-input>
          </div>
          <div class="detail-input">
            <label for="" class="detail-input__label">Chi nhánh</label>
            <m-input></m-input>
          </div>
        </div>
      </div>
    </div>
    <div class="detail__bottom">
      <div class="bottom-left">
        <sub-dialogButton text="Huỷ" @click="cancelDetail"></sub-dialogButton>
      </div>
      <div class="bottom-right">
        <sub-dialogButton text="Cất" @click="saveData"></sub-dialogButton>
        <dialog-button
          text="Cất và Thêm"
          class="save-btn"
          @click="saveAndAddNew"
        ></dialog-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  listValidateField,
  warningTxt,
  questionPopup,
  toastActivity,
} from "../../js/resources.js";
import {
  formTitle,
  genderSelection,
  buttonStatus,
  toastStatus,
  keyCodeName,
} from "@/js/enum.js";
import moment from "moment";
import DxDateBox from 'devextreme-vue/date-box';
import {
  putEmployee,
  addNewEmployee,
  getEmployeeByID,
  getNewEmployeeCode,
} from "@/axios/controller/employee-controller";
export default {
  name: "MForm",
  props: {
    //Biến lưu ID nhân viên đang được chọn trên component EmployeeList để hiển thị thông tin
    selectedEmployeeID: String,
    // Biến xác định xem Form là thêm mới hay sửa
    isFixEmployee: {
      Type: Boolean,
      default: false,
    },
    //Biến theo dõi sự kiện close popup cảnh báo lỗi
    popupClosed: Boolean,
  },
  components: {
    DxDateBox
  },  
  created() {
    this.focusField = this.listValidateField.EmployeeCode.name;
    this.isFix = this.isFixEmployee;
    if (this.isFix) {
      this.getData(this.selectedEmployeeID);
    }
    this.getNewEmployeeCode();
  },
  data() {
    return {
      test: "",
      listValidateField: listValidateField,
      warningText: warningTxt,
      employee: {},
      inputError: [],
      fieldError: [],
      validateForm: listValidateField,
      genderList: genderSelection,
      employeeDetailData: {},
      formTitle: formTitle,
      isSaveAndAddNew: false,
      isFix: false,
      originalData: {},
      isPopupQuestion: false,
      popupQuestion: "",
      showForm: false,
      showPopup: false,
      buttonStatus: buttonStatus,
      questionPopup: questionPopup,
      resetComboboxData: false,
      focusField: "",
      watchForm: Boolean,
      toastStatusList: toastStatus,
      toastActivityList: toastActivity,
      toastStatusTxt: "",
      toastActivityTxt: "",
      keyCodeName: keyCodeName,
    };
  },
  watch: {
    //Bắt sự kiện khi đóng pop up
    popupClosed: {
      handler() {
        this.watchForm = this.popupClosed;
        this.inputError = [];
        this.fieldError = [];
        this.getNewEmployeeCode();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    /**
     * click cancel icon hiển thị popup hỏi nếu dữ liệu thay đổi
     * author: VietDV(18/2/2023)
     */
    cancelDetail() {
      if (
        JSON.stringify(this.originalData) !==
        JSON.stringify(this.employeeDetailData)
      ) {
        this.showQuestion(questionPopup.changeData);
      } else {
        this.closeDetail();
      }
    },

    /**
     * Gọi thuộc tính đóng form chi tiết của EmployeeList khi click button huỷ
     * author: VietDV(2/3/2023)
     */
    closeDetail() {
      if (this.validateForm) {
        for (let item in this.validateForm) {
          this.validateForm[item].class = false;
          this.validateForm[item].title = "";
        }
      }
      this.$emit("closeForm");
    },

    /**
     * Hiển thị popup hỏi
     * author: VietDV(2/3/2023)
     * @param {*} question
     */
    showQuestion(question) {
      this.isPopupQuestion = true;
      this.popupQuestion = question;
      this.showPopup = true;
    },

    /**
     * Xử lý sự kiện click các nút trong popup
     * author: VietDV(2/3/2023)
     * @param {*} status
     */
    popupButtonSellect(status) {
      if (status == buttonStatus.Cancel) {
        this.showPopup = false;
      } else if (status == buttonStatus.No) {
        this.closeDetail();
      } else {
        this.saveData();
        this.showPopup = false;
      }
    },

    /**
     * Thêm lỗi vào danh sách lỗi của Form
     * author: VietDV(18/2/2023)
     * @param {*} title
     */
    addError(title, field) {
      //Thêm phần tử vào mảng lưu các trường lỗi
      if (this.fieldError.includes(field)) return;
      else {
        this.fieldError.push(field);
      }

      //Thêm phần tử vào mảng lưu các title lỗi
      if (this.inputError.includes(title)) return;
      else {
        this.inputError.push(title);
      }
    },

    /**
     * Xoá lỗi trong danh sách lỗi của Form
     * author: VietDV(18/2/2023)
     * @param {*} title
     */
    removeError(title, field) {
      //Xoá phần tử trong mảng lưu các title lỗi
      if (this.inputError.includes(title)) {
        const index = this.inputError.indexOf(title);
        this.inputError.splice(index, 1);
      }

      //Xoá phần tử trong mảng lưu các trường lỗi
      if (this.fieldError.includes(field)) {
        const index = this.fieldError.indexOf(field);
        this.fieldError.splice(index, 1);
      }
    },

    /**
     * Cất dữ liệu Form
     * author: VietDV(18/2/2023)
     */
    saveData() {
      // Kiểm tra các trường cần validate
      for (let item in this.validateForm) {
        if (this.validateForm[item].isRequire == true) {
          //Nếu trường có thông tin thì xoá lỗi trong listError và bỏ các css lỗi
          if (
            this.employeeDetailData[item] !== null &&
            typeof this.employeeDetailData[item] !== "undefined" &&
            this.employeeDetailData[item].trim() !== ""
          ) {
            let title =
              this.validateForm[item].label + " " + this.warningText.Require;
            this.removeError(title, this.validateForm[item].name);
            this.validateForm[item].class = false;
            this.validateForm[item].title = "";
          }
          //Nếu trường trống thì add lỗi vào listError và thêm css lỗi
          else {
            let title =
              this.validateForm[item].label + " " + this.warningText.Require;
            this.addError(title, this.validateForm[item].name);
            this.validateForm[item].class = true;
            this.validateForm[item].title = title;
          }
          if (this.validateForm[item].title) {
            this.validateForm[item].class = true;
          }
        }
      }
      //Nếu listError có lỗi thì emit component EmployeeList hiển thị popup lỗi
      if (this.inputError.length > 0) {
        //Duyệt từ trên xuống dưới nếu trường nào lỗi thì gán ref = tên trường rồi break luôn
        for (let item in this.listValidateField) {
          if (this.fieldError.includes(this.listValidateField[item].name)) {
            this.focusField = this.listValidateField[item].name;
            this.$emit("showError", this.inputError);
            break;
          }
        }
      } else {
        this.$emit("showLoadingLayer");
        //Nếu là form thêm mới thì gọi hàm postData
        if (!this.isFix) {
          this.postData(this.employeeDetailData);
        }
        //Nếu là form sửa thông tin thì gọi hàm updateEmployee
        else {
          this.updateEmployee(
            this.employeeDetailData.EmployeeId,
            this.employeeDetailData
          );
        }
      }
    },

    /**
     * Hàm cất và thêm mới
     * author: VietDV(28/2/2023)
     */
    saveAndAddNew() {
      this.isSaveAndAddNew = true;
      this.saveData();
      //Nếu đang là form sửa thì chuyển thành form thêm mới
      if (this.isFix) {
        this.isFix = false;
      }
      this.employeeDetailData = {};
      this.resetComboboxData = true;

    },

    /**
     * Chuyển trạng thái của resetCombobox sau khi cất
     * author: VietDV(4/3/2023)
     */
    resetComboboxDataStatus() {
      this.resetComboboxData = false;
    },

    /**
     * Hàm format ngày để hiển thị trên input:date
     * author: VietDV(22/2/2023)
     * @param {*} date
     */
    formatDate(data) {
      const date = new Date(data);
      return moment(date).format("YYYY-MM-DD");
    },

    /**
     * Hàm call API lấy thông tin nhân viên theo ID
     * author: VietDV(27/2/2023)
     * @param {selectedID} id
     */
    getData: async function (id) {
      try {
        const res = await getEmployeeByID(id);
        this.originalData = res.data;
        this.employeeDetailData = { ...this.originalData };
      } catch (error) {
        console.log(error);
      }
      this.$emit("hideLoadingLayer");
    },

    /**
     * Hàm call api thêm mới
     * author: VietDV(28/2/2023)
     * @param {*} body
     */
    postData: async function (body) {
      try {
        const res = await addNewEmployee(body);
        if (res.status == 201) {
          this.$emit("refreshData");
          this.toastStatusTxt = this.toastStatusList.Success;
          this.toastActivityTxt = this.toastActivityList.AddSuccess;
          this.$emit(
            "showToastMessage",
            this.toastStatusTxt,
            this.toastActivityTxt
          );
          //Nếu là nút cất thì đóng form sau khi cất
          if (!this.isSaveAndAddNew) {
            this.closeDetail();
          }
          this.isSaveAndAddNew = false;
          this.getNewEmployeeCode();
          this.$emit("closePopup")
        } else {
          // this.toastStatusTxt = this.toastStatusList.Fail;
          // this.toastActivityTxt = this.toastActivityList.AddFail;
          // console.log("error");
          // this.$emit(
          //   "showToastMessage",
          //   this.toastStatusTxt,
          //   this.toastActivityTxt
          // );
          this.isSaveAndAddNew = false;
          // this.getNewEmployeeCode();
          this.resetComboboxData = true;
        }
      } catch (error) {
        console.log(error);
        // bắt lỗi trả về từ server để hiển thị
        let keys = Object.keys(error.response.data.data);
        for (let i = 0; i < keys.length; i++) {
          let fieldError = keys[i];
          let errorText = error.response.data.data[keys[i]];
          this.addError(errorText, fieldError);
        }
        // hiển thị popup lỗi nếu có lỗi
        console.log(this.inputError);
        if (this.inputError.length > 0) {
          for (let item in this.listValidateField) {
            if (this.fieldError.includes(item)) {
              console.log(item);
              break;
            }
          }
          this.focusField = this.fieldError[0];
          this.$emit("showError", this.inputError);
        }
        this.isSaveAndAddNew = false;
        // Hiển thị toast message thất bại
        // this.toastStatusTxt = this.toastStatusList.Fail;
        // this.toastActivityTxt = this.toastActivityList.AddFail;
        // this.$emit(
        //   "showToastMessage",
        //   this.toastStatusTxt,
        //   this.toastActivityTxt
        // );
        this.$emit("hideLoadingLayer");
        // this.getNewEmployeeCode();
        this.resetComboboxData = true;
        // this.$emit("closePopup")
      }
    },

    /**
     * call API lấy mã nhân viên tiếp theo
     * author: VietDV(28/02/2023)
     */
    getNewEmployeeCode: async function () {
      if (!this.isFix)
        try {
          this.employeeDetailData = {};
          if (!this.employeeDetailData.EmployeeCode) {
            this.$emit("showLoadingLayer");
            const res = await getNewEmployeeCode();
            this.employeeDetailData.EmployeeCode
              ? this.employeeDetailData.EmployeeCode
              : (this.employeeDetailData.EmployeeCode = res.data);
            this.originalData = { ...this.employeeDetailData };
            this.$emit("hideLoadingLayer");
          }
        } catch (error) {
          console.log(error);
        }
    },

    /**
     * Hàm call api sửa thông tin nhân viên
     * author: VietDV(2/3/2023)
     * @param {*} id
     * @param {*} body
     */
    updateEmployee: async function (id, body) {
      this.$emit("showLoadingLayer");
      try {
        const res = await putEmployee(id, body);
        if (res.status == 200) {
          this.$emit("refreshData");
          this.toastStatusTxt = this.toastStatusList.Success;
          this.toastActivityTxt = this.toastActivityList.UpdateSuccess;
          this.$emit(
            "showToastMessage",
            this.toastStatusTxt,
            this.toastActivityTxt
          );
          if (!this.isSaveAndAddNew) {
            this.closeDetail();
          }
          this.isSaveAndAddNew = false;
          this.getNewEmployeeCode();
          this.$emit("closePopup")
        } else {
          // this.toastStatusTxt = this.toastStatusList.Fail;
          // this.toastActivityTxt = this.toastActivityList.UpdateFail;
          // this.isSaveAndAddNew = false;
          // this.$emit(
          //   "showToastMessage",
          //   this.toastStatusTxt,
          //   this.toastActivityTxt
          // );
          // this.getNewEmployeeCode();
        }
      } catch (error) {
        console.log(error);
        //bắt lỗi trả về từ server để hiển thị
        let fieldError = this.validateForm.EmployeeCode.name;
        let errorText = this.warningText.DuplicateEmployeeCode;
        this.addError(errorText, fieldError);
        // hiển thị popup lỗi nếu có lỗi
        console.log(this.inputError);
        if (this.inputError.length > 0) {
          for (let item in this.listValidateField) {
            if (this.fieldError.includes(item)) {
              console.log(item);
              break;
            }
          }
          // console.log(this.listValidateField);
          this.focusField = this.fieldError[0];
          this.$emit("showError", this.inputError);
          this.getNewEmployeeCode();
        }

        // Hiển thị toast message thất bại
        // this.toastStatusTxt = this.toastStatusList.Fail;
        // this.toastActivityTxt = this.toastActivityList.UpdateFail;
        // this.$emit(
        //   "showToastMessage",
        //   this.toastStatusTxt,
        //   this.toastActivityTxt
        // );
        this.$emit("hideLoadingLayer");
        this.isSaveAndAddNew = false;
      }
    },

    /**
     * Lập trình các phím tắt cho bảng
     * author: VietDV(9/3/2023)
     * @param {*} event
     */
    detailKeyDown(event) {
      // console.log(event.keyCode);
      //Ctrl + Enter để save
      if (event.ctrlKey && event.keyCode === this.keyCodeName.Enter) {
        event.preventDefault();
        this.saveData();
      }
      // Ctrl + Shift + S để save and Add new
      else if (
        event.ctrlKey &&
        event.shiftKey &&
        event.keyCode === this.keyCodeName.S
      ) {
        event.preventDefault();
        this.saveAndAddNew();
      }
      // Esc để đóng form
      else if (event.keyCode == this.keyCodeName.ESC) {
        event.preventDefault();
        this.cancelDetail();
      }
    },

    
  },
};
</script>

<style>
@import url(@/css/main.css);
</style>
