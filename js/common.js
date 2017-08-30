(function($) {

	//ie css
	set = function() {
		
		$('#topnavi li a,footer li a,#issues a').prepend('≫ ');
		$('#side li a').append(' ●');
		$('.box dt').not('#issues dt').append('：');
		$('.dot dd').prepend('・');
		$('.box2 dt').prepend('―　').append('　―');
		$('article').children('section:not(.half,.one_third,.quarter),div').addClass('contents');		
		$('header#title').append('<p id="scroll">scroll<span class="fa fa-angle-down fa-2x"></span></p>');		
		$('.contents:odd').css('background-color','#e9f2ff');
		$('.contents:even').css('background-color','#FFFFFF');
		$('.contents:eq(0)').css('border-top' , '#012052 7px solid');
		
		$('.contents').each(function() {
			var A = Math.floor(6*Math.random());
            $(this).addClass('bg'+A);
        });
	},
	
	//top button
	goTop = function() {
		
		var flag = false;
		var pagetop = $('#pagetop');
		
		$(window).scroll(function () {
			
			if ($(this).scrollTop() > 300) {
				if (flag == false) {
					flag = true;
					
					if ($(window).width() > 500) {
						pagetop.stop().animate({
							'bottom': '50px'
						}, 200);
					} else {
						pagetop.stop().animate({
							'bottom': '10px'
						}, 200);
					}
				}
			} else {
				if (flag) {
					flag = false;
					pagetop.stop().animate({
						'bottom': '-50px'
					}, 200);
				}
			}			
		});
		
		pagetop.click(function () {
			$('body, html').animate({ scrollTop: 0}, 500);
			return false;
		});
	},
	
	nav = function() {
			
		$('h2').hover(function() {
			$('#global > dl > dd').slideUp(500);
			$('#global > dl > dd > dl').slideUp(500);
			$('#global .on').removeClass('on');
			$('#global').nextAll().removeClass('menu_open');
			$('.menu-trigger i').text('menu');
		});
			
		$('.menu-trigger:not(.on)').hover(function() {
			$('#global > dl > dd').slideDown(500);
			$('#global > dl > dd > dl').slideDown(500);
			$(this).addClass('on');
			$('i' , this).text('close');
			$('.menu-trigger .new').hide();
			$('#global').nextAll().addClass('menu_open');
		} , function() {
			
			$('#global > dl').hover(function() {
				$(this).show();
				$('.menu-trigger i').text('close');
			} , function() {
				$('#global > dl > dd').slideUp(500);
				$('#global > dl > dd > dl').slideUp(500);
				$('#global .on').removeClass('on');
				$('#global').nextAll().removeClass('menu_open');
				$('.menu-trigger i').text('menu');
				$('.menu-trigger .new').show();
			});
			
			$('h2').hover(function() {
				$('#global > dl > dd').slideUp(500);
				$('#global > dl > dd > dl').slideUp(500);
				$('#global .on').removeClass('on');
				$('#global').nextAll().removeClass('menu_open');
				$('.menu-trigger i').text('menu');
				$('.menu-trigger .new').show();
			});
		});
		
		$('.menu-trigger').on('click' , function() {
			$('#global > dl > dd').slideToggle(500);
			$('#global > dl > dd > dl').slideToggle(500)
			$(this).toggleClass('on');
			$('#global').nextAll().toggleClass('menu_open');
			
			if ($('i' , this).text() == 'close'){
				$('i' , this).text('menu');
				$('.menu-trigger .new').show();
		   } else {
			   $('i' , this).text('close');
				$('.menu-trigger .new').hide();
		   }
		});
		
		var	path	= location.href.split('/'),
			loc		= path[path.length-1],
			visit	= new Date(),
			visited = visit.getFullYear() + "-" + "0" + (visit.getMonth() + 1) + "-" + visit.getDate();
			
		$.cookie('visit.' + loc , visited);
		
		$('nav#global a').each(function(e,v){
			var links	= $(this);
			var href	= links.attr('href');
			
			if(loc == '') {
				loc = 'index';
			}
			
			if(href.match('city') && href.match(loc)) {
				$(this).addClass('active');
			}
		});
 
		//JSONファイルを取得
		$.getJSON('/symbol/hp/baseball/games/2017/city/js/update.json').done(function(json, status, request) {
			$(json).each(function(i, data) {
				
				var today	= new Date( $.now() ),
					cnt		= 0,
					elem	= '.' + data.class, // class
					date	= new Date( data.date ), // date
					ago		= date.setDate(date.getDate() + 4); // 更新日 + 5日
		
				if (today < ago) { // 今日(today)がago(更新日 + 5日)より前なら
					if ($.cookie('visit' + elem + '.html') == null || $.cookie('visit' + elem + '.html') < data.date) {
						$('#global').find(elem).not('.top').append('<span class="new">N</span>'); // クラス「new」を付ける
					}
				} else {
					$.cookie('visit' + elem + '.html' , null);						
				}
				
				cnt = $('#global dd').find('.new').length;
		
				if (cnt > 0) {
					$('.menu-trigger').append('<span class="new">' + cnt + '</span>');
				}		
			});
		});
	},
	
	//title
	title = function() {
		
		if ($(window).width() < 500) {
			$('h2 img').attr('src' , 'img/common/logo2.png');
		} else {
			$('h2 img').attr('src' , 'img/common/logo.png');
		}
			
		var ct	= $('.contents:first').offset().top + 7;
		var A	= Math.floor(9*Math.random());
		
		$('body').addClass('bg'+A);
		
		$('header#title #scroll').on('click' , function() {
			$("html, body").stop(true).animate({scrollTop: ct}, 500, "swing");
		});

	},
	
	// SmoothScroll
	smoothScroll = function() {
		
		$('article #side li a[href^="#"]').click(function(){
			var speed = 500;
			var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var position = target.offset().top;
			var body = 'body';
			$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
		});
		
		var set =  $('#global').height() + 1;//ウインドウ上部からどれぐらいの位置で変化させるか
		var boxTop			= new Array;
		var current			= -1;
		var startPosition	= 0;
		
		//各要素の位置
		$(window).on("load resize", function(){
			$('.contents').each(function(i) {
				boxTop[i] = $(this).offset().top;
			});
		});
		//最初の要素にclass="on"をつける
		changeBox(0);
		//スクロールした時の処理
		$(window).scroll(function(){
			
			var scrollPosition	= $(window).scrollTop();	
			var navtop			= $('header#top').offset().top;	
				
			for (var i = boxTop.length - 1 ; i >= 0; i--) {
				if (scrollPosition >= boxTop[i] - set) {
					$('#pan').slideDown('slow');
					$('#side').fadeIn('slow');
								
					changeBox(i);
					break;
				} else if (scrollPosition < boxTop[0] - set) {
					$('#pan').slideUp('slow');
					$('#side').fadeOut('slow');
				}
			};
			
			if (navtop < scrollPosition) {
				$('#global').addClass('fix');
			} else {
				$('#global').removeClass('fix');
			}
					
			if (scrollPosition >= $(document).height() - $(window).height() - $('footer ul').height()) {
				$('#pan').css('position' , 'absolute');
			} else {
				$('#pan').css('position' , 'fixed');
			}
			
			startPosition = scrollPosition;
		});
		
		//ナビの処理
		function changeBox(secNum) {
			if (secNum != current) {
				
				current = secNum;
				secNum2 = secNum + 1;//HTML順序用
				$('article #side li').removeClass('on');
				$('article #side li:nth-child(' + secNum2 +')').addClass('on');
	
				/* 位置によって個別に処理をしたい場合　
				if (current == 0) {
					// 現在地がsection1の場合の処理
				} else if (current == 1) {
					// 現在地がsection2の場合の処理
				} else if (current == 2) {
					// 現在地がsection3の場合の処理
				}*/
			}
		};
	},
	
	//sidemenu
	side = function() {
		$('#side').hover(function() {
			$('body').append('<div id="modal"></div>');
			$('span',this).fadeIn('slow');
		},function() {
			$('div#modal').remove();
			$('span',this).fadeOut('slow');
		});
		
		$('#side').on('touchstart', function(){
			$('body').append('<div id="modal"></div>');
			$('span',this).fadeIn('slow');
    	}).on('touchend', function(){
        	$('div#modal').remove();
			$('span',this).fadeOut('slow');
    	});
	}
	
	$(document).ready(function() {
		set();
		goTop();
		nav();
		title();
		side();
		smoothScroll();
	});	
	
	$(window).resize(function() {
		title();
	});
	
})($);

// JavaScript Document