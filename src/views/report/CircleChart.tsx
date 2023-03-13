import { Skeleton, useTheme } from '@mui/material'
import React , {useEffect } from 'react'
import Chart from 'react-apexcharts'



function CircleChart({ data , isLoading  , title ='' } : {isLoading: boolean , data: {
  labels : string[],
  series :number[]
}, title : string
}) {
  
    const [data2 , setData2] = React.useState<any>({
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }],
          labels :[], 
        },
      series : []
      })

      const theme = useTheme()
      useEffect(() => {
        setData2({
          options: {
            title: {
              text: title,
              align: 'center',
              margin: 10,
              offsetX: 0,
              offsetY: 0,
              floating: false,
              style: {
                fontSize:  '16px',
                fontWeight:  'bold',
                fontFamily:  undefined,
                color:  theme.typography.h4.color
              },
          },
            chart: {
        
              type: 'pie',
            },
            legend: {
              position: 'bottom',
              labels: {
                // colors: 'red',
                useSeriesColors: true
            },

            onItemClick: {
              toggleDataSeries: false
          },
          onItemHover: {
            highlightDataSeries: false
        },
    
            },
            noData: {
              text: 'Chưa có dữ liệu',
              align: 'center',
              verticalAlign: 'middle',
              offsetX: 0,
              offsetY: 0,
              style: {
                color: theme.typography.h4.color,
                fontSize: '16px',
                
              }
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 300
                },
              
              }
            }],
            labels :data.labels, 

            yaxis: {
              labels: {
                  formatter: function (value : number) {

                      const numberFormat = new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        });
                      return numberFormat.format(value)
                    }
              }
          },
          },
        series : data.series
        })
      },[data,theme.typography.h4.color , title])


  return (
    <>
    {
      isLoading ? 
        <div style={{display: 'flex' , alignItems:'center' , justifyContent: 'center'}}>

      <Skeleton variant="circular" width="300px" height="300px" />
        </div>
       : (  <div className="donut">
      <Chart 
      options={data2.options}
      series={data2.series}
      type="pie" width="100%" />
    </div>)
    }
    </>
  
  )
}

export default CircleChart