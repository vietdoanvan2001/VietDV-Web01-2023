//Lựa chọn số bản ghi trên 1 trang

export const pagingOption = [
    { 
        Value: 10,
        Name: "10 bản ghi trên 1 trang" 
    },
    { 
        Value: 20, 
        Name: "20 bản ghi trên 1 trang" 
    },
    { 
        Value: 30, 
        Name: "30 bản ghi trên 1 trang" 
    },
    { 
        Value: 50, 
        Name: "50 bản ghi trên 1 trang" 
    },
    { 
        Value: 100, 
        Name: "100 bản ghi trên 1 trang" 
    },
  ];


//Các lựa chọn mục giới tính trong form chi tiết nhân viên
export const genderSelection = [
    {
        value: 1,
        labelTxt: "Nam"
    },
    {
        value: 0,
        labelTxt: "Nữ"
    },
    {
        value: 2,
        labelTxt: "Khác"
    }
]

//Tên form
export const formTitle ={
    Add : "Thêm mới nhân viên",
    Fix : "Sửa thông tin nhân viên"
}

// Các trạng thái của các nút trong popup
export const buttonStatus = {
    Cancel: "Huỷ",
    Yes: "Có",
    No: "Không"
}

// Trạng thái toast message
export const toastStatus = {
    Success: "Thành Công",
    Fail: "Lỗi"
}

//Các cột trong detail combobox
export const detailComboboxTitle = {
    Position : {
        Code: "Mã chức vụ",
        Name: "Tên chức vụ"
    },
    Department : {
        Code: "Mã đơn vị",
        Name: "Tên đơn vị"
    },
}

//Định ngĩa các keycode
export const keyCodeName = {
    //Phím enter
    Enter: 13,
    //Phím tab
    Tab: 9,
    //Phím mũi tên xuống
    Down: 40,
    //Phím mũi tên lên
    Up: 38,
    //Phím shift
    Shift: 16,
    //Phím N
    N: 78,
    //Phím S
    S:83,
    //Phím ESC
    ESC:27
}

//Giá trị default của phân trang
export const  defaultPagingParams = {
    pageSize: 20,
    pageNumber: 1,
    keyCode: ""
}