$(function(){
	// 刷新天气数据
	refreshWeatherData();
	// 刷新天气数据
	refreshAirData();
	// 获取系统板块数据
	getSystemPlate(function(){
		// 加载系统板块瀑布布局
		addFallLayout("#ml_sys",3);
	});
	// 加载公共信息瀑布布局
	addFallLayout("#ml_info",1);
	// 加载日历
	initData();
	// 显示时间
	getnowtime("#hid_date");
	// 绑定加号点击事件
	bindPlusClickEvent();
	// 初始化 维护弹出框
	initOptionsWindow();
	// 绑定系统维护点击事件
	addMaintainLinkClickEvent();
});

// 插入系统模块
function getSystemPlate(func){
	// 获取数据
	$.ajax({
		url: rootUrl + "/html/system/sys_list.json",
		type: "GET",
		dataType: "json",
		success:function(data){
			var idata = data.rows;
			var tags = "";
			for(var i=0; i<idata.length; i++){
				// 获取顺序
				for(var j=0; j<idata.length; j++){
					if(idata[j].orderNum == (i + 1)){
						break;
					}
				}
				// 获取板块大小
				if( idata[j].plateSize == "小板块"){
					var plateSize = "hx1";
				}else{
					var plateSize = "hx2";
				}
				tags += '<li class="mll_btn '+plateSize+'" yg_id="'
						+idata[j].id+'" yg_url="'+idata[j].sysSite+'">'
							+'<span class="mllb_num hide"></span>'
							+'<span class="mllb_icon fa fa-'+idata[j].iconStyle+'"></span>'
							+'<h3 class="mllb_title">'+idata[j].sysName+'</h3>'
						+'</li>';
			}
			$("#ml_sys").append(tags);
			// 回调函数
			func();
		},
		error:function(){
			alert("系统调用失败!");
		}
	});
}

// 加载瀑布布局
function addFallLayout(boxid,num){
	// 获取容器
	var $box = $(boxid);
	// 获取所有列表
	var $list = $box.children("li");
	// 根据参数加载瀑布流数
	num = parseInt(num);
	var tags = "";
	for(var i=0; i<num; i++){
		tags += '<li class="mll_fall">'
					+'<ul class="mllf_btnbox">'
					+'</ul>'
				+'</li>';
	}
	$box.append(tags);
	// 循环列表
	for(var i=0; i<$list.length; i++){
		// 判断最短瀑布
		var $fall = $(".mll_fall");
		var $short = $fall.eq(0);
		for(var j=1; j<$fall.length; j++){
			if($short.height() > $fall.eq(j).height()){
				$short = $fall.eq(j);
			}
		}
		// 随机颜色
		// var rannum = Math.floor(Math.random()*10)%5 +1;
		// $list.eq(i).addClass("magnet"+rannum);
		// 顺序颜色
		$list.eq(i).addClass("magnet"+(i+1));
		// 添加序号
		$list.eq(i).find(".mllb_num").html(i+1);
		// 移动列表
		$short.find(".mllf_btnbox").append($list.eq(i));
	}
}

// 加载日历
function initData(){
	$(".i_btn","#ml_info").eq(0).glDatePicker({
		showAlways: true,
		format : 'yyyy-mm-dd'
	});
	$("body").on("click",".cover",function(){
		return false;
	});
}

// 绑定加号点击事件
function bindPlusClickEvent(){
	$("#mlt_icon").on("click",function(){
		// 显示窗口
		$("#pop_options").window("open");
		// 刷新页面
		$("#po_frame").attr("src",rootUrl + "/html/system/sys_set.html");
	});
}

// 初始化 维护弹出框
function initOptionsWindow(){
	$("#pop_options").window({
		onClose:function(){
			// 显示序号
			$(".mllb_num").addClass("hide");
			// 清空页面
			$("#po_frame").attr("src","");
		},
		onOpen:function(){
			// 显示序号
			$(".mllb_num").removeClass("hide");
		}
	});
}

// 刷新 维护弹出窗
function refreshOptinsWindow(src){
	$("#po_frame").attr("src",rootUrl + src);
}

// 绑定系统维护点击事件
function addMaintainLinkClickEvent(){
	$("#fi_maintain").on("click",function(){
		var src = $(this).attr("yg_url");
		window.location.href = rootUrl + src;
	});
}

// 刷新天气数据
function refreshWeatherData(){
	// 判断有cookie 且未过时
	if($.cookie("weather")){
		var jsondata = $.cookie("weather");
		var wdata = $.parseJSON(jsondata);
		var tdate = getTodayDateObj();
		if(wdata.date.search(tdate.date) > -1){
			// 加载数据
			addWeatherData(wdata);
			return false;
		}
	}
	// 判断没有cookie 或 cookie过时
	$.ajax({
		url: "http://wthrcdn.etouch.cn/weather_mini",
		type: "GET",
		dataType: "json",
		data: {city: "青岛"},
		success:function(data){
			// 判定数据是否获取成功
			if(data.desc != "OK"){
				return false;
			}
			// 加载数据
			var wdata = data.data.forecast[0];
			addWeatherData(wdata);
			// 缓存数据
			var jsondata = JSON.stringify(wdata);
			$.cookie("weather",jsondata,{ expires: 1 });
		},
		error:function(){
			alert("服务器链接失败！");
		}
	});
}

// 加载天气数据
function addWeatherData(wdata){
	$("#weather").find(".i_info").remove();
	var tags = '<p class="i_info">天气：'+wdata.type+'</p>'
				+'<p class="i_info">温度：'+wdata.high.slice(2)+'-'+wdata.low.slice(2)+'</p>'
				+'<p class="i_info">风向：'+wdata.fengxiang + wdata.fengli+'</p>';
	$("#weather").append(tags);
}

// 刷新天气数据
function refreshAirData(){
	// 判断有cookie 且未过时
	if($.cookie("air")){
		var jsondata = $.cookie("air");
		var adata = $.parseJSON(jsondata);
		var tdate = getTodayDateObj();
		if(adata.date.search(tdate.year+"-"+tdate.omonth+"-"+tdate.odate) > -1){
			// 加载数据
			addAirData(adata);
			return false;
		}
	}
	// 判断没有cookie 或 cookie过时
	$.ajax({
		url: "http://www.help.bj.cn/apis/aqilist/",
		type: "GET",
		dataType: "json",
		success:function(data){
			// 判定数据是否获取成功
			if(data.status != "0"){
				return false;
			}
			// 加载数据
			var num; //青岛所在位置数
			for(var i=0; i<data.aqidata.length; i++){
				if(data.aqidata[i].city == "青岛"){
					num = i;
					break;
				}
			}
			var adata = data.aqidata[num];
			addAirData(adata);
			// 缓存数据
			adata.date = data.update;
			var jsondata = JSON.stringify(adata);
			$.cookie("air",jsondata,{ expires: 1 });
		},
		error:function(){
			alert("服务器链接失败！");
		}
	});
}

// 加载天气数据
function addAirData(adata){
	$("#air").find(".i_info").remove();
	var tags = '<p class="i_info">AQI指数：'+adata.aqi+'</p>'
				+'<p class="i_info">PM2.5：'+adata.pm2_5+' μg/m³</p>'
				+'<p class="i_info">PM10：'+adata.pm10+' μg/m³</p>';
	$("#air").append(tags);
}