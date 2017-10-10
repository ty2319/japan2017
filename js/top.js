(function($) {
	
	Random = function() {
		var rBox = [];
		
		$('.slideCell').each(function() {
			rBox.push($(this).html());
		});
		
		rBox.sort(function() {
			return Math.random() - Math.random();
		});
		
		$('.slideCell').empty();
	 
		i = 0;
		$('.slideCell').each(function() {
			$(this).append(rBox[i]);
			i++;
		});
		
		$('.slideFrame').slider();
	},
	
	Schedule = function() {
		var num = $('section').length-1;
		
		$('article').css('margin-left' , $('section').outerWidth() * -num);
		$('h3').css('margin-left' , $('section').outerWidth() * num);
		
		$('#schedule li').on('click' , function() {
			var cur = $('#schedule li').index(this);
			
			if (num >= cur) {
				
				$('#schedule li').removeClass('current');
				$('article').animate({marginLeft: $('section').outerWidth() * -cur} , 'slow');
				$('h3').css('margin-left' , $('section').outerWidth() * cur);
				$(this).addClass('current');
			}
		});
	},
	
	Psh = function() {
		// 使用例
		$.getJSON('/symbol/hp/baseball/games/2017/japan/js/update.json').done(function(json, status, request) {
			$(json).each(function(i, data) {
					
				var today	= new Date( $.now() ); // 今日の日付を取得
				var ua = navigator.userAgent.toLowerCase();
		
				// iPhone
				var isiPhone = (ua.indexOf('iphone') > -1);
				// iPad
				var isiPad = (ua.indexOf('ipad') > -1);
				// iPod
				var isiPod = (ua.indexOf('ipod') > -1);
				// Android
				var isAndroid = (ua.indexOf('android') > -1) && (ua.indexOf('mobile') > -1);
				// Android Tablet
				var isAndroidTablet = (ua.indexOf('android') > -1) && (ua.indexOf('mobile') == -1);
					
				var elem	= '.' + data.class, // class
					date	= new Date( data.date ), // date
					ago		= date.setDate(date.getDate() + 1); // 更新日 + 1日
		
				if (elem == '.index' && today < ago && !isiPhone && !isiPad && !isiPod) { // 今日(today)がago(更新日 + 1日)より前なら
						
					Push.Permission.request();
					
					Push.create('日本選手権特設サイト', {
					　　body	: 'マスコットの意気込みを公開しました。',
					　　icon	: 'icon.gif',
					　　timeout	: 8000, // 通知が消えるタイミング
					　　vibrate	: [100, 100, 100], // モバイル端末でのバイブレーション秒数
					　　onClick	: function() {
					　　　　window.open('http://www.ntt-west.co.jp/symbol/hp/baseball/games/2017/japan/mascot.html');
					　　}
					});
				}
			
			});
		});
	},
	
	Slider = function() {
		
		if ($(window).width() > 600) {
			$('main > div , .slideFrame').outerHeight($(window).height() - $('header#top').outerHeight() - $('footer').outerHeight());
			$('.slideFrame > ul').attr('class' , 'slideGuide up').width($(window).width() * 0.4);
			$('.slideCtrl:first').attr('class' , 'slideCtrl up').html('↑<br />prev')
			$('.slideCtrl:last').attr('class' , 'slideCtrl down').html('next<br />↓');
		} else {
			$('body , main > div').css('height' , 'auto');
			$('.slideFrame > ul').attr('class' , 'slideGuide left').css('height' , 'auto');
			$('.slideCtrl:first').attr('class' , 'slideCtrl left').html('prev<br />←')
			$('.slideCtrl:last').attr('class' , 'slideCtrl right').html('next<br />→');
		}
	
	}

	$(document).ready(function() {
		Random();
		Schedule();
		Psh();
		Slider();
	});	
	
	$(window).resize(function() {
		Slider();
	});
	
})($);