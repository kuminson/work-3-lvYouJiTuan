$(function(){
	// 高度
	countHeight();
	// 初始化textbox
	$("#username").textbox({
		labelWidth:80
	});
	$("#password").textbox({
		labelWidth:80
	});
})

// 高度
function countHeight(){
	var lh = $(window).height() - $("#header").height()
								- $("#footer").height()
								- parseInt($("#footer").css("padding-bottom"))
								- parseInt($("#footer").css("border-top-width"));
	$("#main").height(lh);
}