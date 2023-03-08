import { expenseCategory, incomeCategory } from "constans/categories";
import { Transaction, TypeTransaction } from "types/main";


export function formatDataChart(data : Transaction[] , type : TypeTransaction) : {labels: string[] , series: number[]} {
    let labels: string[] = [];
    for (const item of data) {
      if (!labels.includes(item.idCategory)) {
        labels.push(item.idCategory);
      }
    }
    let series: number[] = [];
    for (const label of labels) {
      const dataSeries = data
        .filter((data) => data.idCategory === label)
        .reduce((pre, item) => {
          return pre + item.value;
        }, 0);
      series.push(dataSeries);
    }
    const labelsFormat = labels.map((label) => {
        let name : string = ''
        if(type === 'spending'){
            const cate = expenseCategory.find((item) => item.id === label);
            name = cate?.name || ''
        }else if(type === 'income'){
            const cate = incomeCategory.find((item) => item.id === label);
            name = cate?.name|| ''
        }
        return name
    });
    return {
        labels: labelsFormat , series
    }
  }