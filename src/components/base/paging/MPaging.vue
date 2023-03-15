<template>
    <div class="page">
        <div class="page-left">Tổng số: <span class="amount-page">{{ employeeAmount }}</span> bản ghi</div>
        <div class="page-right">
            <m-combobox
            @changePageSize="changePageSize"
            ></m-combobox>
            <div class="page-number">
                <button class="pre-button">Trước</button>
                <button class="number-button"
                :class="index == isActive? 'page-number_active':''"
                v-for="index in amountPage" :key="index"
                @click="chosePage(index)"
                >{{ index }}</button>
                <!-- <button class="number-button page-number_active">1</button>
                <button class="number-button">2</button>
                <button class="number-button">3</button> -->
                <button class="next-button nav-button_active">Sau</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        console.log(this.isActive);
    },
    data() {
        return {
            amountPage:4,
            isActive:1
        }
    },
    props:{
        //Số lượng bản ghi nhận từ EmployeeList
        employeeAmount: Number
    },
    methods: {
        //Cập nhật giá trị param paging filter khi đổi pagesize
        //Author: VietDV(15/3/2023)
        changePageSize(pagesize){
            this.$emit("changePageSize",pagesize); 
        },

        //Cập nhật giá trị param paging filter khi đổi trang
        chosePage(event){
            this.$emit("changePageNumber",event)
            this.isActive = event;
        }
    },
}
</script>

<style>
    @import url(@/css/main.css);
</style>