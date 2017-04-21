var rootUrl = "/work-3-lvYouJiTuan";

// 获取页面url信息
function GetUrlParms(){
    var args=new Object();
    var query=location.search.substring(1);//获取查询串
    var pairs=query.split("&");//在逗号处断开
    for(var   i=0;i<pairs.length;i++){
        var pos=pairs[i].indexOf('=');//查找name=value
        if(pos==-1){
	        continue;//如果没有找到就跳过
        }
        var argname=pairs[i].substring(0,pos);//提取name
        var value=pairs[i].substring(pos+1);//提取value
        args[argname]=decodeURI(value);//存为属性
    }
    return args;
}

// 获取时间
function getTodayDate(symbol){
    var timedate = {};
    timedate.now = new Date;
    timedate.year = timedate.now.getFullYear();
    timedate.month = timedate.now.getMonth()+1;
    timedate.date = timedate.now.getDate();
    timedate.day = timedate.now.getDay()+1;
    var nowDate = timedate.year + symbol + timedate.month + symbol + timedate.date;
    return nowDate;
}

// 获取时间对象
function getTodayDateObj(){
    var timedate = {};
    timedate.now = new Date;
    timedate.year = timedate.now.getFullYear();
    timedate.month = timedate.now.getMonth()+1;
    if(timedate.month < 10){
    	timedate.omonth = "0" +timedate.month;
    }else{
    	timedate.omonth = timedate.month;
    }
    timedate.date = timedate.now.getDate();
    if(timedate.date < 10){
    	timedate.odate = "0" +timedate.date;
    }else{
    	timedate.odate = timedate.date;
    }
    timedate.day = timedate.now.getDay()+1;
    return timedate;
}

/*
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * getnowtime(id)  加载当前日期
 *
 * id             需要显示时间的标签id
 *
 * 使用方法
 * getnowtime("#labelid");
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */
// >>>>>>>>>>>>>>>>>>>>>>>>>>> start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function getnowtime(id){
	var timedate = {};
	timedate.now = new Date;
	timedate.year = timedate.now.getFullYear();
	timedate.month = timedate.now.getMonth()+1;
	timedate.date = timedate.now.getDate();
	timedate.day = timedate.now.getDay()+1;

	switch(timedate.day){
		case 1:
		timedate.week = "星期日";
		break;
		case 2:
		timedate.week = "星期一";
		break;
		case 3:
		timedate.week = "星期二";
		break;
		case 4:
		timedate.week = "星期三";
		break;
		case 5:
		timedate.week = "星期四";
		break;
		case 6:
		timedate.week = "星期五";
		break;
		case 7:
		timedate.week = "星期六";
		break;
	}
	$(id).html("今天是&nbsp;"+ timedate.year +"年"+ timedate.month +"月"+ timedate.date +"日&nbsp;"+ timedate.week);
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>> over  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>