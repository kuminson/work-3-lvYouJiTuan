$(function(){
	// 弹性高度
	autoHeight();
	// 点击nav获得active事件
	navGetActiveEvent();
});

// 弹性高度
function autoHeight(){
	var $main = $("#main");
	var ah = $(window).height();
	for(var i=0; i<$main.siblings().length; i++){
		var $box = $main.siblings().eq(i);
		ah -= $box.height()
		      + parseInt($box.css("margin-top"),10)
		      + parseInt($box.css("margin-bottom"),10)
		      + parseInt($box.css("padding-top"),10)
		      + parseInt($box.css("padding-bottom"),10)
		      + parseInt($box.css("border-top-width"),10)
		      + parseInt($box.css("border-bottom-width"),10);
		console.log($box,ah);
	}
	$("#main").height(ah);
	$(window).resize();
}

// 点击nav获得active事件
function navGetActiveEvent(){
	$(".mln_list").on("click",function(){
		$(".mln_list").removeClass("active");
		$(this).addClass("active");
	})
}