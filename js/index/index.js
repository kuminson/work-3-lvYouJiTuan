$(function(){
	// 加载瀑布布局
	addFallLayout("#ml_sys",3);
	addFallLayout("#ml_info",1);
	// 加载日历
	$(".i_btn","#ml_info").eq(0).glDatePicker({
		showAlways: true,
		format : 'yyyy-mm-dd'
	})
	$("body").on("click",".cover",function(){
		return false;
	})
	// 显示时间
	getnowtime("#hid_date");

	// 登录
	// $("#hil_login").on("click",function(){
	// 	window.location.href = rootUrl + "/html/login/login.html";
	// });
});

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
		// 移动列表
		$short.find(".mllf_btnbox").append($list.eq(i));
	}
}