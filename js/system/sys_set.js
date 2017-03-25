$(function(){
	// 初始化表格
	initSetDatagrid();
	// 绑定添加系统事件
	addBtnClickEvent();
	// 绑定编辑系统事件
	editBtnClickEvent();
});
// 表格列名
var datacolumn = [[
			{
				"field":"",
				"checkbox":true
			},{
				"field":"sysName",
				"title":"系统名称",
				"align":"left",
				"width":100,
				"iscp":1
			},{
				"field":"sysSite",
				"title":"系统地址",
				"align":"left",
				"width":200,
				"iscp":1
			},{
				"field":"plateSize",
				"title":"板块大小",
				"align":"left",
				"width":50,
				"iscp":0
			},{
				"field":"orderNum",
				"title":"顺序号",
				"align":"left",
				"width":50,
				"iscp":0
			}
]];

// 初始化表格
function initSetDatagrid(){
	$("#sys_set").datagrid({
		method: "get",
		url: rootUrl + "/html/system/sys_list.json",
		toolbar:"#tb",
		fitColumns: true,
		columns:datacolumn,
		resizeHandle: "both",
		striped: true,
		loadMsg: "请稍后...",
		// pagination: true,
		// pageNumber: 1,
		// pageSize: 20,
		// pageList: [20,40,60],
		rownumbers: true
	});
}

// 绑定添加系统事件
function addBtnClickEvent(){
	$("#btn_add").on("click",function(){
		// 编辑地址
		var src = "/html/system/sys_edit.html";
		// 刷新页面
		window.top.refreshOptinsWindow(src);
	});
}

// 绑定编辑系统事件
function editBtnClickEvent(){
	$("#btn_edit").on("click",function(){
		// 排除没有选中行
		var checkerow = $("#sys_set").datagrid("getChecked");
		if(checkerow.length < 1){
			alert("请先选中一个系统！");
			return false;
		}
		// 排除多选行
		if(checkerow.length > 1){
			alert("请只选一个系统！");
			return false;
		}
		// 获取选中行id
		var rowid = checkerow[0].id;
		// 编辑地址
		var src = "/html/system/sys_edit.html"
					+"?rowid="+rowid;
		// 刷新页面
		window.top.refreshOptinsWindow(src);
	});
}