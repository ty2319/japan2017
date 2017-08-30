$(window).on('load resize' , function() {
	
	$('.issues').width($(window).width()/2 * $('.issues>  section').length);
	
	if ($(window).width() > 940) {
		$('.timeline,.dates,.issues section').width($(window).width()/2);
		$('.score').width($(window).width()/2 - 24);
		$('.issues table').width($(window).width()/2 - 80).css('margin','0 auto');
		$('.member_n,.member_e').width($(window).width()/4 - 24);
	} else {
		$('.timeline,.dates,.issues section').width(470);
		$('.score').width(446);
		$('.issues table').width(366).css('margin','0 auto');
		$('.member_n,.member_e').width(211);
	}
	
	$(".member_e").each(function(){
		$(this).find("tbody tr:nth-child(odd)").addClass('back_gray');
		$(this).find("tbody tr:nth-child(even)").addClass('back_white');
	});
	$(".member_n").each(function(){
		$(this).find("tbody tr:nth-child(odd)").addClass('back_blue');
		$(this).find("tbody tr:nth-child(even)").addClass('back_white');
	});
	$('.head .score').each(function(){
		$(this).find('tbody tr:nth-child(1)').addClass('back_blue');
		$(this).find('tbody tr:nth-child(2)').addClass('back_white');
	});
	$('.tail .score').each(function(){
		$(this).find('tbody tr:nth-child(2)').addClass('back_blue');
		$(this).find('tbody tr:nth-child(1)').addClass('back_white');
	});
	
	$('.head .issues section').each(function(){
		$(this).find('h6:eq(1)').css('color','#666');
		$(this).find('table:eq(0) tbody tr:nth-child(odd)').addClass('back_blue');
		$(this).find('table:eq(0) thead th').css({'background-color':'#5396ff','color':'#FFF'});
		$(this).find('table:eq(1) tbody tr:nth-child(odd)').addClass('back_gray');
		$(this).find('table:eq(1) thead th').css({'background-color':'#666','color':'#FFF'});
		$(this).find('tbody tr:nth-child(even)').addClass('back_white');
	});
	
	$('.tail .issues section').each(function(){
		$(this).find('h6:eq(0)').css('color','#666');
		$(this).find('table:eq(1) tbody tr:nth-child(odd)').addClass('back_blue');
		$(this).find('table:eq(1) thead th').css({'background-color':'#5396ff','color':'#FFF'});
		$(this).find('table:eq(0) tbody tr:nth-child(odd)').addClass('back_gray');
		$(this).find('table:eq(0) thead th').css({'background-color':'#666','color':'#FFF'});
		$(this).find('tbody tr:nth-child(even)').addClass('back_white');
	});
	
	$(".issues tr").hover(function(){
		$(this).css('color','#F90');},
	function(){
		$(this).css('color','#666');
	});
	
	$('section > .half:eq(0) > table:eq(2)').css('margin-right', 0 );
		
	$(".member_e,.member_n").tile();
	$("section > .half").tile();
	
});// JavaScript Document