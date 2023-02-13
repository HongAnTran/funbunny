
/**
 * Hàm tính milisecons giây lúc 00h00 của thời gian truyền vào 
 * 
 * @param {number} day truyền vào ngày muốn tính nêu ko truyền lấy mặc định là ngày hiện tại
 * @param {number} month truyền vào ngày muốn tính nêu ko truyền lấy mặc định là ngày hiện tại
 * @param {number} year truyền vào năm muốn tính nêu ko truyền lấy mặc định là ngày hiện tại
 */
export function calculateMillisecondDate( day? : number , month? : number , year? : number){
    const date =  new Date()
    const yearCurrent = year ||  date.getFullYear()
    const monthCurrent = month ||  date.getMonth() + 1
    const dayCurrent = day ||  date.getDate()
    const time =  new Date(`${yearCurrent}-${monthCurrent}-${dayCurrent} 00:00:00`).getTime() // milisecons lúc 0h00 ngày hôm nay
    return time
}