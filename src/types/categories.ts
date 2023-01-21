import { Category } from "./main";


// export const expenseCategory: Category[] = [
//   { name: "Ăn uống", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Ffood.png?alt=media&token=67f687ed-df7a-4e1d-8c4c-a5ae72a315bc" },
//   { name: "Quần áo", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Fclothing.png?alt=media&token=11727395-0ff3-4946-9cc4-1ddf061b0e97" },
//   { name: "Mua sắm", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Fshopping.png?alt=media&token=7854c3fd-b0e6-483d-ac25-431c4d21fe72" },
//   { name: "Xe", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Fbike.png?alt=media&token=e496e6d2-eda6-404c-bb96-1bd2a518193d" },
//   { name: "Nhà ở", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Fhouse.png?alt=media&token=4ae48536-a614-4d1e-a078-ab602eb1505d" },
//   { name: "Du lịch", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Ftravel.png?alt=media&token=b07228b1-be79-44b0-96c5-25ccd8220c20" },
//   { name: "Đồ uống", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Fdrink.png?alt=media&token=53115b75-8f65-4433-89dd-8f395abd9293" },
//   { name: "Chi phí điện nước", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Freceipt.png?alt=media&token=02ab1eab-0356-4c0a-bd79-bd72746cce32" },
//   { name: "Làm đẹp", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Fmakeup.png?alt=media&token=73facabf-90a7-45cd-a5d9-dc1703b2f4bd" },
//   { name: "Quà", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Fpresents.png?alt=media&token=c2ac9ec6-d5d8-474a-82ee-2b01fac8d1be" },
//   { name: "Giáo dục", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Feducation.png?alt=media&token=718d67ad-cbbc-4382-908f-3f659b6beec9" },
//   { name: "Đồ ăn vặt", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Fsnack.png?alt=media&token=1b6831e8-06c0-41e0-af73-b15616425c7e" },
//   { name: "Thể thao", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Fsports.png?alt=media&token=a03b5831-3fee-4532-8118-9ce33b750bab" },
//   { name: "Sức khỏe", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Fhealth.png?alt=media&token=6cf28310-7162-4c4c-82c6-b9eebbe4e9cf" },
//   { name: "Giải trí", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Fentertainment.png?alt=media&token=aadb6821-f0cd-4ff4-8523-9c42f939e06d" },
//   { name: "Sách", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Fbook.png?alt=media&token=d0cc0096-8772-477e-b8a3-45a760c8edb9" },
//   { name: "Bảo hiểm", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Finsurance.png?alt=media&token=22084722-ac15-413c-84e8-49d2ea64c7a7" },
//   { name: "Thú cưng", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Fpets.png?alt=media&token=e723a84e-9299-46fc-9f93-88fbb490a838" },
// ];

// export const incomeCategory: Category[] = [
//   { name: "Tiền lương", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Fsalary.png?alt=media&token=f7cf019c-8134-4738-8714-ecd11a65ff3d" },
//   { name: "Tiền được tặng", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Fwages.png?alt=media&token=940be865-ce5c-46a7-8d30-cb9172d74696" },
//   { name: "Bán hàng", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Fselling.png?alt=media&token=a16ede8e-08d1-420d-b8a3-ac66c1e7fc36" },
//   { name: "Cho thuê", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Frent.png?alt=media&token=71a8986d-e31b-4326-8664-04054e02d052" },
//   { name: "Đầu tư", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Fearning.png?alt=media&token=954c5fa0-10c6-4ca1-a430-a47462430093" },
//   { name: "Tiền thưởng", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Fbonus.png?alt=media&token=c091f73f-6a6f-48fd-8188-8d05633215cf" },
//   { name: "Khác", icon: "https://firebasestorage.googleapis.com/v0/b/finace-and-tasks.appspot.com/o/icons%2Fdifferent.png?alt=media&token=5544d36c-04f7-4cde-adf2-eecf6c673d3d" },
// ];
