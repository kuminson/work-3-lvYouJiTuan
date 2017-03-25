$(function(){
	// 初始化 板块大小下拉框
	initPlateSizeCombobox();
	// 初始化 图标样式下拉框
	initIconStyleCombobox();
	// 绑定保存按钮点击事件
	addSaveBtnClickEvent();
	// 绑定取消按钮点击事件
	addCancelBtnClickEvent();
	// 初始化页面
	initForm();
});

// 板块大小 下拉框数据
var plateSizeData = [{
			text: '大版块',
			value: 'big'
		},{
			text: '小版块',
			value: 'small'
		}];

// 图标样式 下拉框数据
var iconStyleicon = "car,wifi,cogs,desktop,clipboard,envelope"
					+",bar-chart,address-book-o,briefcase,cloud-download,cloud-upload"
					+",cog,cube,database,folder-open,users"
					+",home,map-marker,print,rss,search"
					+",server,sliders,user-circle,wrench,file-text-o";

// 生成图标样式数据列表
function createIconData(icon){
	var icons = icon.split(",");
	var iconStyleData = [];
	for(i in icons){
		var obj = {};
		obj.text = icons[i];
		obj.value = icons[i];
		iconStyleData.push(obj);
	}
	return iconStyleData;
}

// 初始化 板块大小下拉框
function initPlateSizeCombobox(){
	$("#plateSize").combobox({
		data: plateSizeData,
		label:"板块大小：",
		labelWidth:"100px",
		panelHeight:"auto",
		value:"small",
		panelMaxHeight:"100"
	});
}

// 初始化 顺序号下拉框
function initOrderNumCombobox(all){
	// 获取系统总个数
	var orderNumData = [];
	for(var i=0; i<all; i++){
		var obj = {};
		obj.text = i+1;
		obj.value = i+1;
		orderNumData.push(obj);
	}
	$("#orderNum").combobox({
		data: orderNumData,
		label:"顺序号：",
		labelWidth:"100px",
		panelHeight:"auto",
		value:all,
		panelMaxHeight:"100"
	});
}

// 初始化 图标样式下拉框
function initIconStyleCombobox(){
	var iconStyleData = createIconData(iconStyleicon);
	$("#iconStyle").combobox({
		data: iconStyleData,
		label:"图标样式：",
		labelWidth:"100px",
		// panelHeight:"auto",
		value:"car",
		panelMaxHeight:"100",
		formatter:function(row){
			var tag = '<span class="fa fa-'+row.value+'"></span>'
						+'<span class="">&nbsp;&nbsp;&nbsp;'+row.text+'</span>';
			return tag;
		},
		onChange:function(newval,oldval){
			$("#sfl_icon").removeClass("fa-"+oldval);
			$("#sfl_icon").addClass("fa-"+newval);
		}
	});
}

// 绑定保存按钮点击事件
function addSaveBtnClickEvent(){
	$("#btn_save").on("click",function(){
		alert("提交成功！");
		// 刷新页面
		window.top.refreshOptinsWindow("/html/system/sys_set.html");
	});
}

// 绑定取消按钮点击事件
function addCancelBtnClickEvent(){
	$("#btn_cancel").on("click",function(){
		// 刷新页面
		window.top.refreshOptinsWindow("/html/system/sys_set.html");
	});
}

// 初始化页面
function initForm(){
	// 获取URL参数
	var mode = GetUrlParms();
	// 空白初始化
	if(mode.rowid == undefined){
		getSystemNum(function(allnum){
			// 初始化 顺序号下拉框
			initOrderNumCombobox(allnum+1);
		});
		$("#sysName").textbox("clear");
		$("#sysSite").textbox("clear");
		$("#sysSite").textbox("clear");
		$("#plateSize").combobox("select","small");
		$("#iconStyle").combobox("select","car");
		$("#sfl_icon").attr("class","fa fa-car sfl_icon");
		return false;
	}
	// 加载信息初始化
	var id = parseInt(mode.rowid,10);
	$.ajax({
		url: rootUrl + "/html/system/sys_list.json",
		type: "GET",
		dataType: "json",
		success:function(data){
			// 临时获取方法 链接后端需重写
			var idata = data.rows[id-1];
			getSystemNum(function(allnum){
				// 初始化 顺序号下拉框
				initOrderNumCombobox(allnum);
				$("#orderNum").combobox("select",idata.orderNum);
			});
			$("#sysName").textbox("setValue",idata.sysName);
			$("#sysSite").textbox("setValue",idata.sysSite);
			if(idata.plateSize == "大板块"){
				$("#plateSize").combobox("select","big");
			}else{
				$("#plateSize").combobox("select","small");
			}
			$("#iconStyle").combobox("select",idata.iconStyle);
			$("#sfl_icon").attr("class","fa fa-"+idata.iconStyle+" sfl_icon");
		},
		error:function(){
			alert("系统调用失败!");
		}
	});
}

// 获取系统个数
function getSystemNum(func){
	$.ajax({
		url: rootUrl + "/html/system/sys_num.json",
		type: "GET",
		dataType: "json",
		success:function(data){
			func(parseInt(data.num,10));
		},
		error:function(){
			alert("系统方法调用失败！");
		}
	});
}