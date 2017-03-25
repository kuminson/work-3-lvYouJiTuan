$(function(){
	// 高度
	countHeight();
	// 初始化输入框
	initTextbox();
	// 绑定点击跳转事件
	addLoginBtnClickEvent();
})

// 高度
function countHeight(){
	var lh = $(window).height() - $("#header").height()
								- $("#footer").height()
								- parseInt($("#footer").css("padding-bottom"))
								- parseInt($("#footer").css("border-top-width"));
	$("#main").height(lh);
}

// 初始化输入框
function initTextbox(){
	// 初始化用户名
	$("#username").textbox({
		label:"用户名：",
		labelWidth:"80px",
		iconWidth:"30px",
		prompt:"请输入用户名..."
	});

	// 初始化密码
	$("#password").passwordbox({
		label:"密码：",
		labelWidth:"80px",
		iconWidth:"30px",
		prompt:"请输入密码..."
	});
}

// 绑定点击跳转事件
function addLoginBtnClickEvent(){
	$("#m_login").on("click",function(){
		window.location.href = rootUrl + "/index.html";
	});
}