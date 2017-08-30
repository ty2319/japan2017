$(window).on('load resize' , function() {
	
	$('article > .head').each(function() {
        $('table.quarter:eq(0)',this).addClass('blue');
        $('table.quarter:eq(1)',this).addClass('border');
		$('table.battery tr:eq(0) th:eq(0)' , this).addClass('b_n');
		$('table.battery tr:eq(1) th:eq(0)' , this).addClass('b_e');
    });	
	$('article > .tail').each(function() {
        $('table.quarter:eq(0)',this).addClass('blue');
        $('table.quarter:eq(1)',this).addClass('border');
		$('table.battery tr:eq(0) th:eq(0)' , this).addClass('b_e');
		$('table.battery tr:eq(1) th:eq(0)' , this).addClass('b_n');
    });
	
	$('.border').each(function(){
		$(this).find('tbody tr:nth-child(even)').addClass('back_gray');
		$(this).find('tbody tr:nth-child(odd)').addClass('back_white');
		$(this).find('tbody th:last-child,tbody td:last-child').css('border','none');
	});
	$('.blue').each(function(){
		$(this).find('tbody tr:nth-child(even)').addClass('back_blue');
		$(this).find('tbody tr:nth-child(odd)').addClass('back_white');
	});
	$('.head .score').each(function(){
		$(this).find('tbody tr:nth-child(1)').addClass('back_blue');
		$(this).find('tbody tr:nth-child(2)').addClass('back_white');
	});
	$('.tail .score').each(function(){
		$(this).find('tbody tr:nth-child(2)').addClass('back_blue');
		$(this).find('tbody tr:nth-child(1)').addClass('back_white');
	});
	
	$('.head > .half > div').each(function(){
		$(this).find('section:nth-child(odd)').addClass('ntt');
		$(this).find('section:nth-child(even)').addClass('enemy');
	});
	$('.tail > .half > div').each(function(){
		$(this).find('section:nth-child(even)').addClass('ntt');
		$(this).find('section:nth-child(odd)').addClass('enemy');
	});
	
/*¢­scoreborad function¢­*/
	
	$('.contents > .half').each(function() {
		
		$('div' , this).width($('section',this).length * $(this).parent().width());
		$('div' , this).children().width($('.half').width()).css('margin-right' , $('.half').width() * 0.1);
		
		$('.score a,.prev a,.next a' , this).click(function() {
			
			$(this).parents('.half').find('td').removeClass('current');
			
			var num = $(this).parents('.half').find('section').length;
			var lockon = $(this).attr('href');
			var num2 = $(this).parents('.half').find('section').index($(lockon));
			var preid = $(lockon).prev().attr('id');
			var nextid = $(lockon).next().attr('id');
			
			$(this).parents('.half').find('.score a').each(function() {
                if ($(this).attr('href') == lockon) {
					$(this).parent().addClass('current');
				}
            });
			
			$(this).parents('.half').children('div').stop().animate({'margin-left' : $(lockon).outerWidth(true) * -num2} , 500 , function() {
				if (num2 <= 0) {
					$(this).parents('.half').find('.prev').fadeOut('fast');
				} else {
					$(this).parents('.half').find('.prev').fadeIn('fast');
				}
				
				if (num2+1 == num) {
					$(this).parents('.half').find('.next').fadeOut('fast');
				} else {
					$(this).parents('.half').find('.next').fadeIn('fast');
				}
			
				$(this).parents('.half').find('.prev a').attr('href' , '#' + preid);
				$(this).parents('.half').find('.next a').attr('href' , '#' + nextid);
				
			});
			return false;
		});
	});
	
	$('.ntt h6').css('color','#2c7eff');
	$('.enemy h6').css('color','#666');
	
	$('.ntt table').each(function(){
		var numTh = $('thead th' , this).length;
		var isEven = true;
		// $("table tr").each(function() {
		$('tbody tr' , this).each(function() {
			if (numTh == $(this).children().length || $(this).children().length == 1) {
			  isEven = !isEven;
			}
			$(this).addClass(isEven ? 'back_blue' : 'back_white');
		});
	});
	
	$('.enemy table').each(function(){
		var numTh = $('thead th' , this).length;
		var isEven = true;
		// $("table tr").each(function() {
		$('tbody tr' , this).each(function() {
			if (numTh == $(this).children().length || $(this).children().length == 1) {
			  isEven = !isEven;
			}
			$(this).addClass(isEven ? 'back_gray' : 'back_white');
		});
	});
	
	$('.half > div tr').hover(function(){
		$(this).css('color','#F90');},
	function(){
		$(this).css('color','#666');
	});
	
¡¡¡¡$('img.half').css('height','auto');
	
	$('article > section').each(function() {
        $(this).find('.half:eq(0) > table:eq(2)').css('margin-right', 0 );
    });
	
});// JavaScript Document