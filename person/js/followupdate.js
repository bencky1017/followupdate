$(function(){
	/*列表初始化*/
	var weekday=['周日','周一','周二','周三','周四','周五','周六'];
	for (var i = 0; i < 7; i++) {
		var div_list='<div class="list"><div class="list_title">'+weekday[i]+'</div></div>';
		$('.table').append(div_list);
	}
	$('.btn_div').remove();/*防测试移除*/
	var div_btn_add='<div class="btn_div" style="display:none;"><input type="button" value="添加" class="btn_add"></div>';
	$('.list').append(div_btn_add);

	/*日期状态*/
	var getday=new Date().getDay();
	// getday=getday==0?7:getday; //*0为周日*
	$('.list').eq(getday).css({'border-color':'yellow'});
	$('.list_title').eq(getday).css({'color':'yellow'});

	/*资源引用*/
	for (var i = 0; i < 7; i++) {
		for (var j = 0; j < link[i].list.length; j++) {
			var alink='<a class="item-'
			+(i+1)+'" href="'
			+link[i].list[j].url+'">'
			+link[i].list[j].name.slice(0,5)+'</a>';//*获取前5个字*
			$('.list').eq(i).append(alink);
		}
	}
	if (window.localStorage.getItem('bk_update_table')!=null) {
		$('.table').html(window.localStorage.getItem('bk_update_table'));
	}
})
$(function(){
	/*进入编辑模式*/
	$('.btn_edit').on('click',function(){
		if ($('.btn_edit').val()=='编辑') {
			$('.btn_edit').val('保存');
			$('.btn_div').css('display','');
			$('[class*=item-]').attr('onclick','return false;');//*禁止点击*
		}else
		if ($('.btn_edit').val()=='保存') {
			$('.btn_edit').val('编辑');
			$('.btn_div').css('display','none');
			$('[class*=item-]').removeAttr('onclick');//*允许点击*
			window.localStorage.setItem('bk_update_table',$('.table').html());
		}
	});
})
$(function(){
	/*编辑模块内容功能*/
	/*添加链接*/
	var item_id=0;
	$('.btn_add').on('click',function(){
		item_id=$(this).parents('.list').index();
		console.log(item_id);
		$('.nti-name,.nti-url').val('');
		$('.nti-name').attr('placeholder','名称(5字以内)');
		$('.nti-url').attr('placeholder','网址链接');
		$('.ndd-table').css('display','');
		$('.mask').css({'display':'','background-color':'rgb(0, 0, 0, 0.5)'});
	});

	/*取消添加*/
	$('.btn-cancel').on('click',function(){
		$('.ndd-table').css('display','none');
		$('.mask').css('display','none');
	});

	/*确认添加*/
	$('.btn-sure').on('click',function(){
		var name=$('.nti-name');
		var url=$('.nti-url');
		var reg=/^[http|https|file|chrome]{4,}:\/\/[\S]*/;//*匹配表达式*
		if (name.val()=='') {name.attr('placeholder','名称未填写');}
		if (url.val()=='') {url.attr('placeholder','链接未填写');}
		else if (!reg.test(url.val())) {
			url.val('').attr('placeholder','链接定义错误');
		}
		if (name.val()!=''&url.val()!=''&reg.test(url.val())){
			var link_a='<a class="item-'
			+(item_id+1)+'" href="'
			+url.val()+'" onclick="return false;">'
			+name.val()+'</a>';
			$('.ndd-table').css('display','none');
			$('.mask').css('display','none');
			$('.list').eq(item_id).append(link_a);
		}

		/*删除网址*/
		$('[class*=item-]').off().on('dblclick',function(){
			let delconfirm=confirm('确认删除 “'+$(this).text()+'” 吗？');
			if (delconfirm) {$(this).remove();}
		})
	});

	/*删除网址*/
	$('[class*=item-]').off().on('dblclick',function(){
		let delconfirm=confirm('确认删除 “'+$(this).text()+'” 吗？');
		if (delconfirm) {$(this).remove();}
	})
});
var reset=(function(){
	for (var i = 0; i < 7; i++) {
		for (var j = 0; j < link[i].list.length; j++) {
			var alink='<a class="item-'
			+(i+1)+'" href="'
			+link[i].list[j].url+'">'
			+link[i].list[j].name.slice(0,5)+'</a>';//*获取前5个字*
			$('.list').eq(i).append(alink);
		}
	}
	$('[class*=item-]').off().on('dblclick',function(){
		let delconfirm=confirm('确认删除 “'+$(this).text()+'” 吗？');
		if (delconfirm) {$(this).remove();}
	})
})