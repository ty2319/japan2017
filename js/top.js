$(function() {
	
	$(".slideFrame").slider({
		direction: "up",
		time: 10,
		speed: 5
	});
	
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
	
	// 使用例
	$.getJSON('/symbol/hp/baseball/games/2017/city/js/update.json').done(function(json, status, request) {
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
				　　body	: '1回戦のマスコットリポートを公開しました。',
				　　icon	: 'icon.gif',
				　　timeout	: 8000, // 通知が消えるタイミング
				　　vibrate	: [100, 100, 100], // モバイル端末でのバイブレーション秒数
				　　onClick	: function() {
				　　　　window.open('http://www.ntt-west.co.jp/symbol/hp/baseball/games/2017/city/gallery.html');
				　　}
				});
			}
		
		});
	});
});

$(window).on('load resize' , function() {
	
	if ($(window).width() > 600) {
		$('main,article').outerHeight($(window).height() - $('header#top').outerHeight() - $('footer').outerHeight());
		$('article').css('padding-top' , $('#global').outerHeight() - 1);
	} else {
		$('article').css('padding-top' , $('article > div').height());
		$('body').css('height' , 'auto');
	}
	
	var num = $('section').length-1;
	
	$('article').css('margin-left' , $('section').outerWidth() * -num);
	
	$('#schedule li').on('click' , function() {
		$('#schedule li').removeClass('current');
		var cur = $('#schedule li').index(this);
		$('article').animate({marginLeft: $('section').outerWidth() * -cur} , 'slow');
		$(this).addClass('current');
	});
});