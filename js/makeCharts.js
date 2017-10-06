function generateChart()
{
       $("#inputData").hide();
       $("#showAnalytics").show();
       /*
       window.total0 = total0;
       window.total1 = total1;
       window.overAllX = overAllX;
       window.overAll0Dat = overAll0Dat;
       window.overAll1Dat = overAll1Dat;
       window.monthMessages0 = monthMessages0;
       window.monthMessages1 = monthMessages1;
       window.dayMessages0 = dayMessages0;
       window.dayMessages1 = dayMessages1;
       window.responseMonthMessages0 = responseMonthMessages0;
       window.responseMonthMessages1 = responseMonthMessages1;
       window.responseDayMessages0 = responseDayMessages0;
       window.responseDayMessages1 = responseDayMessages1;
       window.avgResp0 = avgResp0;
       window.avgResp1 = avgResp1;
       */
       data = {};
       data["name1"] = window.name1;
       data["name2"] = window.name2;
       data["0"] = window.total0;
       data["1"] = window.total1;
       data["2"] = window.overAllX;
       data["3"] = window.overAll0Dat;
       data["4"] = window.overAll1Dat;
       data["5"] = window.monthMessages0;
       data["6"] = window.monthMessages1;
       data["7"] = window.dayMessages0;
       data["8"] = window.dayMessages1;
       data["9"] = window.responseMonthMessages0;
       data["10"] = window.responseMonthMessages1;
       data["11"] = window.responseDayMessages0;
       data["12"] = window.responseDayMessages1;
       data["13"] = window.avgResp0;
       data["14"] = window.avgResp1;
       data["15"] = window.totalMessages ;
       dataJSON = JSON.stringify(data);
       b64 = btoa(dataJSON);
       //console.log(b64);
       console.log(b64.length);
       window.b64 = b64;
       $("#totalmess").html(window.totalMessages);
       $("#startTime").html(window.overAllX[0]);
       $("#stopTime").html(window.overAllX[window.overAllX.length - 1]);
       $("#analyticTitle").html(window.name1 + " & " + window.name2 + " | Chat Analysis")
       var piePercent = document.getElementById("piePercent").getContext("2d");
       var monthsPercent = document.getElementById("months").getContext("2d");
       var daysPercent = document.getElementById("days").getContext("2d");
       var total = document.getElementById("totalMessages").getContext("2d");
       var pieTime = document.getElementById("timeTotal").getContext("2d");
       var monthsTime = document.getElementById("timemonths").getContext("2d");
       var daysTime = document.getElementById("timedays").getContext("2d");
       var totalMessagesData = {
              labels: window.overAllX,
              datasets: [{
                   label: window.name1,
                   borderColor: "rgb(198, 212, 87)",
                   backgroundColor: "rgba(198, 212, 87, 0.5)",
                   fill: false,
                   data: window.overAll0Dat,
                   yAxisID: "y-axis-1",
              }, {
                   label: window.name2,
                   borderColor: "rgb(100, 149, 237)",
                   backgroundColor: "rgba(100, 149, 237, 0.5)",
                   fill: false,
                   data: window.overAll1Dat,
                   yAxisID: "y-axis-2"
              }]
       };
       var totalMessages = new Chart(total, {
           type: 'line',
           data: totalMessagesData,
           options: {
                       responsive: true,
                       hoverMode: 'index',
                       stacked: false,
                       scales: {
                            yAxes: [{
                                  type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                  display: true,
                                  position: "left",
                                  id: "y-axis-1",
                            },{
                            type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                            display: true,
                            position: "right",
                            id: "y-axis-2",

                               // grid line settings
                            gridLines: {
                                   drawOnChartArea: false, // only want the grid lines for one axis to show up
                            },
                            }],
                     }
              }
       });
       var myPieChart = new Chart(piePercent, {
              "type" : "pie",
              "data": {
                     "labels": [ window.name1, window.name2],
                     "datasets":[{
                            "label":"My First Dataset",
                            "data":[window.total0, window.total1],
                            "backgroundColor":["rgba(255, 99, 132, 0.5)", "rgba(255, 205, 86, 0.5)"],
                            "fill": false,
                            "borderWidth": 1,
                            borderColor: ["rgb(255, 99, 132)", "rgb(255, 205, 86)"]
                     }]
              }
       });
       var dataMonthsPercent = {
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
              datasets: [{
                            label: window.name1,
                            backgroundColor: "rgba(153, 102, 255, 0.5)",
                            data: window.monthMessages0,
                            "fill": false,
                            "borderWidth": 1,
                            borderColor: "rgb(153, 102, 255)"
                         },
                         {
                            label: window.name2,
                            backgroundColor: "rgba(255, 159, 64, 0.5)",
                            data: window.monthMessages1,
                            "fill": false,
                            "borderWidth": 1,
                            borderColor: "rgb(255, 159, 64)"
              }]
       };
       var dataDaysPercent = {
              labels: ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"],
              datasets: [{
                            label: window.name1,
                            backgroundColor: "rgba(198, 212, 87, 0.5)",
                            data: window.dayMessages0,
                            "fill": false,
                            "borderWidth": 1,
                            borderColor: "rgb(198, 212, 87)"
                         },{
                            label: window.name2,
                            backgroundColor: "rgba(100, 149, 237, 0.5)",
                            data: window.dayMessages1,
                            "fill": false,
                            "borderWidth": 1,
                            borderColor: "rgb(100, 149, 237)"
              }]
       };
       var mp = new Chart(monthsPercent, {
              "type" : "bar",
              "data": dataMonthsPercent,
              "options":{
                     "scales":{
                            "xAxes": [{"stacked": true}],
                            "yAxes": [{"stacked": true, "ticks":{ "beginAtZero":true}}]
                     }
              }
       });
       var dp = new Chart(daysPercent, {
              "type" : "bar",
              "data": dataDaysPercent,
              "options":{
                     "scales":{
                            "xAxes": [{"stacked": true}],
                            "yAxes": [{"stacked": true, "ticks":{ "beginAtZero":true}}]
                     }
              }
       });
       //["rgba(255, 99, 132, 0.5)", "rgba(255, 205, 86, 0.5)"]
       //"rgba(255, 99, 132, 0.5)", "rgba(255, 205, 86, 0.5)"
       var responseTimeTotal = new Chart(pieTime, {
              "type": 'horizontalBar',
              "data": {
                     labels: [window.name1, window.name2],
                     "datasets": [{
                       label: "Average Response Time",
                       backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(255, 205, 86, 0.5)"],
                       borderColor: ["rgb(255, 99, 132)", "rgb(255, 205, 86)"],
                       borderWidth: 1,
                       data: [window.avgResp0, window.avgResp1]
                     }]
              },
              "options":{"scales":{"xAxes":[{"ticks":{"beginAtZero":true}}]}}
       });
       var dataMonthsPercent = {
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
              datasets: [{
                            label: window.name1,
                            backgroundColor: "rgba(153, 102, 255, 0.5)",
                            data: window.responseMonthMessages0,
                            "fill": false,
                            "borderWidth": 1,
                            borderColor: "rgb(153, 102, 255)"
                         },
                         {
                            label: window.name2,
                            backgroundColor: "rgba(255, 159, 64, 0.5)",
                            data: window.responseMonthMessages1,
                            "fill": false,
                            "borderWidth": 1,
                            borderColor: "rgb(255, 159, 64)"
              }]
       };
       var dataDaysPercent = {
              labels: ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"],
              datasets: [{
                            label: window.name1,
                            backgroundColor: "rgba(198, 212, 87, 0.5)",
                            data: window.responseDayMessages0,
                            "fill": false,
                            "borderWidth": 1,
                            borderColor: "rgb(198, 212, 87)"
                         },{
                            label: window.name2,
                            backgroundColor: "rgba(100, 149, 237, 0.5)",
                            data: window.responseDayMessages1,
                            "fill": false,
                            "borderWidth": 1,
                            borderColor: "rgb(100, 149, 237)"
              }]
       };
       var mpt = new Chart(monthsTime, {
              "type" : "bar",
              "data": dataMonthsPercent,
              "options":{
                     "scales":{
                            "xAxes": [{"stacked": false}],
                            "yAxes": [{"stacked": false, "ticks":{ "beginAtZero":true}}]
                     }
              }
       });
       var dpt = new Chart(daysTime, {
              "type" : "bar",
              "data": dataDaysPercent,
              "options":{
                     "scales":{
                            "xAxes": [{"stacked": false}],
                            "yAxes": [{"stacked": false, "ticks":{ "beginAtZero":true}}]
                     }
              }
       });
       //new Chart(document.getElementById("emoji"),{"type":"radar","data":{"labels":["😂","😎","😧","😰","😝","😱","😳"],"datasets":[{"label":window.name1,"data":[65,59,90,81,56,55,40],"fill":true,"backgroundColor":"rgba(255, 99, 132, 0.2)","borderColor":"rgb(255, 99, 132)","pointBackgroundColor":"rgb(255, 99, 132)","pointBorderColor":"#fff","pointHoverBackgroundColor":"#fff","pointHoverBorderColor":"rgb(255, 99, 132)"},{"label":window.name2,"data":[28,48,40,19,96,27,100],"fill":true,"backgroundColor":"rgba(54, 162, 235, 0.2)","borderColor":"rgb(54, 162, 235)","pointBackgroundColor":"rgb(54, 162, 235)","pointBorderColor":"#fff","pointHoverBackgroundColor":"#fff","pointHoverBorderColor":"rgb(54, 162, 235)"}]},"options":{"elements":{"line":{"tension":0,"borderWidth":3}}}});
}
