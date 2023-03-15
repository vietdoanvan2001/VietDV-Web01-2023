<template>
    <div class="combobox-container" v-click-away="closeOption">
        <div class="combobox-input">
            <div class="combobox-input__sellect">{{ comboboxOption[selectedOption].Name }}</div>
            <div class="combobox-input__item" @click="toggleOption">
                <div class="combobox-input__icon"></div>
            </div>
        </div>
        <div class="combobox-option" v-show="showOption">
            <div class="combobox-option__items" 
            v-for="(item,index) in comboboxOption" :key="index"
            :class="{'combobox-option__active':activeOption[index]}"
            @click="activeItem(index,item)"
            >
                {{ item.Name }}
            </div>
        </div>
    </div>
</template>

<script>
import {pagingOption} from '@/js/enum.js'
export default {
    name:"MCombobox",
    data() {
        return {
            comboboxOption: [],
            showOption: false,
            activeOption: [],
            selectedOption: 1
        }
    },
    created(){
        this.comboboxOption = pagingOption;
        this.activeOption[this.selectedOption] = true
    },
    methods: {
        /**
         * Toggle lựa chọn số bản ghi trên 1 trang
         * author: VietDV(18/2/2023)
         */
         toggleOption(){
            this.showOption = !this.showOption
         },
         /**
          * Đóng lựa chọn số bản ghi khi click ra ngoài
          * author: VietDV(18/2/2023)
          */
         closeOption(){
            this.showOption = false
         },

        /**
         * set item được chọn active class
         * author: VietDV(18/2/2023)
         * @param {*} index 
         */ 
         activeItem(index,item){
            this.$emit("changePageSize",item.Value)
            for(let i=0; i<this.activeOption.length;i++){
                this.activeOption[i] = false
            }
            this.activeOption[index] = true
            this.selectedOption = index
            this.showOption = false
         }
    },
}
</script>

<style>
    @import url(@/css/main.css);
</style>