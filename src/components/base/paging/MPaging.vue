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
                v-for="index in Array.from({ length: 4 })" :key="index"
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
    props:{
        //Số lượng bản ghi nhận từ EmployeeList
        employeeAmount: Number
    },
    methods: {
        changePageSize(pagesize){
            this.$emit("changePageSize",pagesize);
        }
    },
}
</script>

<style>
    @import url(@/css/main.css);
</style>