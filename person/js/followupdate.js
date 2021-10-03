$(function(){
	var getday=new Date().getDay();
	getday=getday==0?7:getday;
	$('.list').eq(getday-1).css({'border-color':'yellow'});
	$('.list_title').eq(getday-1).css({'color':'yellow'});
})