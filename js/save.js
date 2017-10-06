function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}
function save(dump)
{
       $.ajax({
              type: "POST",
              url: "https://whatsappanalysis.herokuapp.com/generate/",
              data: {data : dump},
              success: function(url) {
                     fullurl = "Saved! URL to this analytics: https://kalradivyanshu.github.io/?u="+url;
                     $("#save").hide();
                     $("#url").html(fullurl);
              }
       });
}
$("#save").on("click", function() {
       $("#save").html("Saving...");
       save(window.b64);
});
function processDump(data)
{
       if(data != "")
       {
              data = $.parseJSON(data);
              keys = ["name1", "name2", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
              flag = true;
              for(var i = 0; i < keys.length; i++)
              {
                     console.log(data[keys[i]], keys[i])
                     if(data[keys[i]] == undefined)
                     {
                            flag = false;
                            break;
                     }
              }
              console.log("here", flag);
              if(flag)
              {
                     window.total0 = data["0"];
                     window.total1 = data["1"];
                     window.overAllX = data["2"];
                     window.overAll0Dat = data["3"];
                     window.overAll1Dat = data["4"];
                     window.monthMessages0 = data["5"];
                     window.monthMessages1 = data["6"];
                     window.dayMessages0 = data["7"];
                     window.dayMessages1 = data["8"];
                     window.responseMonthMessages0 = data["9"];
                     window.responseMonthMessages1 = data["10"];
                     window.responseDayMessages0 = data["11"];
                     window.responseDayMessages1 = data["12"];
                     window.avgResp0 = data["13"];
                     window.avgResp1 = data["14"];
                     window.totalMessages = data["15"];
                     window.name1 = data["name1"];
                     window.name2 = data["name2"];
                     $("#saveAndShare").hide();
                     generateChart();
              }
       }
}
function fetchDump(url)
{
       url = "https://whatsappanalysis.herokuapp.com/fetch/?url="+url;
       console.log(url);
       $.ajax({url: url, success: function(result){
              dump = result;
              console.log(dump);
              data = atob(dump);
              console.log(data);
              processDump(data);
       }});
       return "";
}

url = findGetParameter("u");
console.log(url);
if(url != null) {
       fetchDump(url);
}
