//プルダウン
$(function () {
  // プルダウン変更時に遷移
  $('select[name=pulldown]').change(function() {
    if ($(this).val() != '') {
      window.location.href = $(this).val();
    }
  });
});

// option[selected]によって「ソース上の」選択状態を取得。
 var tmpSelect =  $('select[name="pulldown"] option[selected]').val();
// option:selected （見かけ上の選択状態）を削除。
 $('select[name="pulldown"] option:selected').removeAttr('selected');
// 改めて選択を設定しなおす。
 $('select[name="pulldown"]').val(tmpSelect);
 
//三角の幅
$(window).load(function() {
	//画面幅取得
	w = $(window).width();
	$(".triangleUp").css("border-left", w + "px solid transparent");
	$(".triangleDown,.triangleRe").css("border-right", w + "px solid transparent");
	});
	$(window).resize(function() {
	//画面リサイズ時の高さ取得
	w = $(window).width();
	$(".triangleUp").css("border-left", w + "px solid transparent");
	$(".triangleDown,.triangleRe").css("border-right", w + "px solid transparent");
});

// アコーディオン関連
$(function(){
        $('.sub_menu').hide();
        $('.main_menu').click(function(){
                $('span').removeClass('rotate');
                $('ul.sub_menu').slideUp();
                if($('+ul.sub_menu',this).css('display') == 'none'){
                        $('span',this).addClass('rotate');
                        $('+ul.sub_menu',this).slideDown();
                        $('+ul.sub_menu',this).addClass('fadeIn padd-top-lg');
                }
        });
});
$(function(){
        $('.sub_menu-news').hide();
        $('.main_menu').click(function(){
                $('span').removeClass('rotate');
                $('ul.sub_menu-news').slideUp();
                if($('+ul.sub_menu-news',this).css('display') == 'none'){
                        $('span',this).addClass('rotate');
                        $('+ul.sub_menu-news',this).slideDown();
                        $('+ul.sub_menu-news',this).addClass('fadeIn');
                }
        });
});

//ナビゲーション
(function($) {
	$(function() {
		var $header = $('#top-head');

		// Nav Fixed
		$(window).scroll(function() {
			if ($(window).scrollTop() > 150) {
				$header.addClass('fixed');
			} else {
				$header.removeClass('fixed');
			}
		});

		// Nav Toggle Button
		$('#nav-toggle').click(function(){
			$header.toggleClass('open');
		});

	});
})(jQuery);

// 高さ揃え
$(function(){
	$('.js-matchHeigtht').matchHeight();
});

//スライダー
$(function() {
	$('.slider').slick({
		dots:true,
		arrows:true,
		lazyLoad: 'ondemand',
		slidesToShow: 1,
		slidesToScroll: 1
	});
});
//lightboxスライダー
$(function() {
	$('#photos').slickLightbox({
	    images: ['img/photos/1.jpg', 'img/photos/2.jpg', 'img/photos/3.jpg', 'img/photos/4.jpg', 'img/photos/5.jpg', 'img/photos/7.jpg', 'img/photos/8.jpg', 'img/photos/9.jpg', 'img/photos/11.jpg']
  });
});

// アンカーリンク
$(function(){
   // #で始まるアンカーをクリックした場合に処理
   $('a[href^=#]:not(a[href=#menuOsaka], a[href=#menuTokyo])').click(function() {
      // スクロールの速度
      var speed = 400; // ミリ秒
　　　 // 移動先を取得
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      // 移動先を数値で取得
      var position = target.offset().top;
      // スムーススクロール
      $('body,html').animate({scrollTop:position}, speed, 'swing');
      return false;
   });
});
