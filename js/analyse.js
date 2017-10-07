$("#go").on("click", function(){
       $("#inputData").hide();
       runAnalysis();
});

function isEmoji(str) {
    var ranges = [
        '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
        '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
        '\ud83d[\ude80-\udeff]' // U+1F680 to U+1F6FF
    ];
    if (str.match(ranges.join('|'))) {
        return true;
    } else {
        return false;
    }
}
function makeShiftLazyTest(line) {
      //square bracket shit
      // if(line.indexOf("[")==0){
      //
      //   console.log("forwarded message detected");
      //   return false;
      //
      // }
       if(line.indexOf(" P.M. ") >= 0 || line.indexOf(" A.M. ") >= 0 || line.indexOf(" am ") >= 0 || line.indexOf(" pm ") >= 0 || line.indexOf(" AM ") >= 0 || line.indexOf(" PM ") >= 0 || line.indexOf(" a.m. ") >= 0 || line.indexOf(" p.m. ") >= 0)
          if( line.indexOf("/") >= 0 && line.indexOf(":") >= 0 && line.indexOf(" - ") >= 0 && line.indexOf(", ") >= 0)
              return true;
       return false;
}
function setProgress(per) {
       $("#progress").attr("value", per);
}
function toValidDate(datestring){

      if(datestring.includes("a.m.")){
        var newString = datestring.replace("a.m.","AM");
        datestring = newString;
      }

      if(datestring.includes("p.m.")){
        var newString = datestring.replace("p.m.","PM");
        datestring = newString;
      }
       ts = datestring.split("/");

       var year = ts[2].split(",");
       year[0] = year[0].substr(year[0].length-2,year[0].length);
      ts[2]= year.join(",");

       if(ts.length < 2)
              return "";

      if(window.switch == false)
          return ts.join("/");

      // switching month and date
       tmp = ts[0];
       ts[0] = ts[1];
       ts[1] = tmp;

       return ts.join("/");
}
function getDate(str)
{
       org = str;
       str = str.split(" - ");
       if(str.length < 2){
              return "Invalid Date";
       }
       str = str[0];
       str = toValidDate(str);
       //console.log(str);
       d = new Date(str);
       if(d.getFullYear() < 2012)
              console.log(org);
       return d;
}
function detectDateFormat(lines)
{
       window.switch = false;
       for (var i = 0, len = lines.length; i < len; i++) {
              line = lines[i];
              if( (line) == false)
                     continue;
              str = line.split(" - ");
              if(str.length < 2)
                     continue;
              date = str[0];
              ts = date.split("/");
              if(ts.length < 2)
                     continue;
              first = parseInt(ts[0]);
              second = parseInt(ts[1]);

              if(first > 12)
              {
                     console.log("Detected DD/MM/YYYY", line);
                     window.switch = true;
                     break;
              }
              if(second > 12)
              {
                     console.log("Detected MM/DD/YYYY", line);
                     window.switch = false;
                     break;
              }
       }
}
function runAnalysis()
{
       txt = $("#chat").val();
       name1 = $("#name1").val();
       name2 = $("#name2").val();
       if(txt.length < 1 || name1.length < 1 || name2.length < 1) {
              $("#e1").show();
              return 0;
       }
       window.name1 = name1;
       window.name2 = name2;
       var lines = txt.split("\n");
       dateFor = $("#dateFormat").val();
       if(dateFor == "1")
              window.switch = true;
       else if(dateFor == "2")
              window.switch = false;
       else {
              detectDateFormat(lines);
       }
       console.log(lines.length);
       name1Per = 0;
       name2Per = 0;
       var overAll0 = {};
       var overAll1 = {};
       var monthMessages0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
       var monthMessages1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
       var dayMessages0 = [0, 0, 0, 0, 0, 0, 0];
       var dayMessages1 = [0, 0, 0, 0, 0, 0, 0];
       //var numberOfResponse0 = 0;
       //var numberOfResponse1 = 0;
       var lastMessageTime0 = null;
       var lastMessageTime1 = null;
       var responseMonthMessages0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
       var responseMonthMessages1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
       var responseNMonthMessages0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
       var responseNMonthMessages1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
       var responseDayMessages0 = [0, 0, 0, 0, 0, 0, 0];
       var responseDayMessages1 = [0, 0, 0, 0, 0, 0, 0];
       var responseNDayMessages0 = [0, 0, 0, 0, 0, 0, 0];
       var responseNDayMessages1 = [0, 0, 0, 0, 0, 0, 0];
       var whos = null;
       for (var i = 0, len = lines.length; i < len; i++) {
              line = lines[i];
              if(makeShiftLazyTest(line) == false){
                console.log("Skipping iteration number :" + i);
                continue;

              }

              d = getDate(line);

              if(d == "Invalid Date") {
                     continue;
              }
              if(line.indexOf(window.name1+":") >= 0){
                     name1Per += 1;
                     whos = 0;
              }
              else {
                     name2Per += 1;
                     whos = 1;
              }
              monthYear = (d.getMonth()+1)+"/"+d.getFullYear();
              month = d.getMonth();
              day = d.getDay();
              if(whos == 0)
              {
                     if(overAll0[monthYear] == undefined)
                     {
                            console.log(monthYear, line);
                            overAll0[monthYear] = 0;
                     }
                     if(overAll1[monthYear] == undefined)
                     {
                            console.log(monthYear, line);
                            overAll1[monthYear] = 0;
                     }
                     overAll0[monthYear] += 1;
                     monthMessages0[month] += 1;
                     dayMessages0[day] += 1;
              }
              else
              {
                     if(overAll0[monthYear] == undefined)
                     {
                            console.log(monthYear, line);
                            overAll0[monthYear] = 0;
                     }
                     if(overAll1[monthYear] == undefined)
                     {
                            console.log(monthYear, line);
                            overAll1[monthYear] = 0;
                     }
                     overAll1[monthYear] += 1;
                     monthMessages1[month] += 1;
                     dayMessages1[day] += 1;
              }
              if(whos == 0)
              {
                     if(lastMessageTime1 == null)
                     {
                            lastMessageTime1 = null;
                            lastMessageTime0 = d.getTime();
                     }
                     else
                     {
                            lastMessageTime0 = d.getTime();
                            responseTime = lastMessageTime0 - lastMessageTime1;
                            responseMonthMessages0[month] += responseTime;
                            responseNMonthMessages0[month] += 1;
                            responseDayMessages0[day] += responseTime;
                            responseNDayMessages0[day] += 1;
                            lastMessageTime1 = null;
                     }
              }
              else {
                     if(lastMessageTime0 == null)
                     {
                            lastMessageTime0 = null;
                            lastMessageTime1 = d.getTime();
                     }
                     else
                     {
                            lastMessageTime1 = d.getTime();
                            responseTime = lastMessageTime1 - lastMessageTime0;
                            responseMonthMessages1[month] += responseTime;
                            responseNMonthMessages1[month] += 1;
                            responseDayMessages1[day] += responseTime;
                            responseNDayMessages1[day] += 1;
                            lastMessageTime0 = null;
                     }
              }
       }
       overAllX = []
       overAll0Dat = []
       overAll1Dat = []
       for(var key in overAll0)
       {
              overAllX.push(key);
              overAll0Dat.push(overAll0[key]);
              overAll1Dat.push(overAll1[key]);
       }
       totalMessages = name1Per + name2Per;
       total0 = Math.floor(name1Per/totalMessages*100);
       total1 = Math.floor(name2Per/totalMessages*100);

       for(var i = 0; i < 12; i++)
       {
              t = monthMessages0[i] + monthMessages1[i];
              monthMessages0[i] /= t;
              monthMessages1[i] /= t;
              monthMessages0[i] = Math.floor(monthMessages0[i]*100);
              monthMessages1[i] = Math.floor(monthMessages1[i]*100);
       }
       for(var i = 0; i < 7; i++)
       {
              t = dayMessages0[i] + dayMessages1[i];
              dayMessages0[i] /= t;
              dayMessages1[i] /= t;
              dayMessages0[i] = Math.floor(dayMessages0[i]*100);
              dayMessages1[i] = Math.floor(dayMessages1[i]*100);
       }
       for(var i = 0; i < 12; i++)
       {
              if(responseNMonthMessages0[i] == 0)
                     responseNMonthMessages0[i] = 1;
              if(responseNMonthMessages1[i] == 0)
                     responseNMonthMessages1[i] = 1;
              responseMonthMessages0[i] /= responseNMonthMessages0[i];
              responseMonthMessages1[i] /= responseNMonthMessages1[i];
              responseMonthMessages0[i] /= 60000;
              responseMonthMessages1[i] /= 60000;
              responseMonthMessages0[i] = Math.floor(responseMonthMessages0[i]);
              responseMonthMessages1[i] = Math.floor(responseMonthMessages1[i]);
       }
       for(var i = 0; i < 7; i++)
       {
              if(responseNDayMessages0[i] == 0)
                     responseNDayMessages0[i] = 1;
              if(responseNDayMessages1[i] == 0)
                     responseNDayMessages1[i] = 1;
              responseDayMessages0[i] /= responseNDayMessages0[i];
              responseDayMessages1[i] /= responseNDayMessages1[i];
              responseDayMessages0[i] /= 60000;
              responseDayMessages1[i] /= 60000;
              responseDayMessages0[i] = Math.floor(responseDayMessages0[i]);
              responseDayMessages1[i] = Math.floor(responseDayMessages1[i]);
       }
       avgResp0 = 0;
       avgResp1 = 0;
       for(var i = 0; i < 12; i++) {
              avgResp0 += responseMonthMessages0[i];
              avgResp1 += responseMonthMessages1[i];
       }
       avgResp0 = Math.floor(avgResp0/12);
       avgResp1 = Math.floor(avgResp1/12);
       window.totalMessages = totalMessages;
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
       console.log(overAllX);
       //console.log(overAll0Dat);
       //console.log(overAll1Dat);
       generateChart();
}
