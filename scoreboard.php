<?php

//�ǡ����١�����³
$conn = "host='pgdb' dbname='westofc' user='westofc' password='ofc0610'";
if(!$db = pg_connect($conn)) {
echo '��³���顼<br>';
exit;
}
//���ܾ����ɤ߽Ф�
$str_sql = "select * from symbol_score_game;";
$rs = pg_query($db, $str_sql);
$game = pg_fetch_assoc($rs);

if ($game['myself']=="b") {
$jibun = $game['bottom'];
$taisen = $game['top'];
$game_set = "tail";
} else {
$jibun = $game['top'];
$taisen = $game['bottom'];
$game_set = "head";
}

$str_sql1 = "select max(inning) from symbol_score_develop_detail;";
$rs1 = pg_query($db, $str_sql1);
$count_ini = pg_fetch_result($rs1,0,0);

?>

<!DOCTYPE html>
<html>
<head>
<meta charset="euc-jp">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<title>���в����88���Ի��й��������NTT������</title>
<meta name="keywords" content="NTT������,�������긢,2015,����ܥ�,���в�" />
<meta name="description" content="
��88���Ի��й�������ǤΡ�NTT�����ܤλ��в�Ǥ���" />
<meta property="og:type" content="website" />
<meta property="og:title" content="��88���Ի��й�������" />
<meta property="og:description" content="�Ҳ�����
��88���Ի��й�������ǤΡ�NTT�����ܤλ��в�Ǥ���" />
<meta property="og:url" content="http://www.ntt-west.co.jp/symbol/hp/baseball/games/2017/city/" />
<meta property="og:site_name" content="��88���Ի��й�������" />
<meta property="og:country-name" content="Japan,����" />
<meta property="og:locality" content="Osaka,���" />
<meta property="og:image" content="http://www.ntt-west.co.jp/favicon.ico" />
<link rel="stylesheet" href="css/import.css" />
<link rel="stylesheet" href="css/results.css" media="screen" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="js/common2.js"></script>
<script type="text/javascript" src="js/results2.js"></script>
<script type="text/javascript">
	$(function() {
		$("html, body").stop().animate({scrollTop: $('article > section').offset().top}, 500, "linear");
		
		var cnt = $('.half div section').length;
		var w = $('.half').outerWidth() - $('.contents').width()*0.0165;
		var w2 = $('.half').outerWidth();
		var now = $('.half div section').eq(cnt-1).attr('id');
		var pre = $('.half div section').eq(cnt-2).attr('id');
		
		if ($('.half div section:last td').length < 1) {
			$('.half div section:last').hide();
			cnt = cnt-1;
			now = $('.half div section').eq(cnt-1).attr('id');
			pre = $('.half div section').eq(cnt-2).attr('id');
		}
		
		if(cnt <= 1) {
			$('.prev').hide();
		} else {
			$('.prev').show();
		}
		
		if ($(window).width() > 940) {
			$('.half div section').width(w);
			$('.half').children('div').css('margin-left' , w * -(cnt-1));
		} else {
			$('.half div section').width(w2);
			$('.half').children('div').css('margin-left' , w2 * -(cnt-1));
		}
		$('.next').hide();
		$('.prev a').attr('href' , '#' + pre);
		
		$('.score a').each(function() {
            if ($(this).attr('href') == '#' + now) {
				$(this).parent().addClass('current');
			}
		});
		
		setInterval(function(){
            location.reload();
        }, 60000);
	});
</script>
<script type="text/javascript" src="js/jquery.cookie.js"></script> 

<!--[if lt IE 7]>
<script type="text/javascript" src="/symbol/hp/baseball/games/2012/city/js/jquery.exfixed-1.3.2.js" type="text/javascript"></script>
<script type="text/javascript">
$(function(){
	$('#pagetop').exFixed();
});
</script>
<![endif]-->
</head>

<body>

<?php   //��$file_name�ե������ʸ�������ɤ�SJIS����EUC-JP���Ѵ������󥯥롼��
  $string = get_include_contents( "./templates/header-nav.inc" );  // �ɤ߹��ߥե�����
// SJIS("ASCII,JIS,UTF-8,EUC-JP,SJIS")����EUC-JP���Ѵ�
  $string_header = mb_convert_encoding($string, "EUC-JP", "auto");

  $string = get_include_contents( "./templates/footer.inc" );
  $string_footer = mb_convert_encoding($string, "EUC-JP", "auto");

  // get_include_contents()�ؿ�
  function get_include_contents($filename) {
    if (is_file($filename)) {
    ob_start();
    include $filename;
    $contents = ob_get_contents();
    ob_end_clean();
    return $contents;
    }
    return false;
  }

  echo $string_header;  //���֤��������ƥ����Ȥ�ɽ��

?>

<article role="main">
  <header id="title">
    <h3>Live Broadcasting</h3>
    <p>���ߤλ��в�</p>
  </header>
  <section class="<?php print $game_set; ?>">
    <header>
      <h4><?php print $game['month']; ?>��<?php print $game['day']; ?>����<?php print $game['week']; ?>�� VS��<?php print $taisen; ?></h4>
      <p>�� ���Υڡ�����1ʬ���Ȥ˹�������ޤ��Τǡ�����դ���������</p>
    </header>

<?php

if ($game['myself'] == "t") {
$str_sql1 = "select lineup,position,name from symbol_score_member where tb='t'";
} else {
$str_sql1 = "select lineup,position,name from symbol_score_member where tb='b'";
}
$rs1 = pg_query($db, $str_sql1);
$count1 = pg_num_rows($rs1);
for($i=0;$i<$count1;$i++){
$mem1[$i] = pg_fetch_assoc($rs1);
}

?>


    <table class="quarter">
      <caption>
      <?php print $jibun; ?> <span>�������</span>
      </caption>
      <thead>
        <tr>
          <th scope="col">�ǽ�</th>
          <th scope="col">�ݥ������</th>
          <th scope="col">̾��</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"><?php print $mem1[0]['lineup']; ?></th>
          <td><?php print $mem1[0]['position']; ?></td>
          <td><?php print $mem1[0]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[1]['lineup']; ?></th>
          <td><?php print $mem1[1]['position']; ?></td>
          <td><?php print $mem1[1]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[2]['lineup']; ?></th>
          <td><?php print $mem1[2]['position']; ?></td>
          <td><?php print $mem1[2]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[3]['lineup']; ?></th>
          <td><?php print $mem1[3]['position']; ?></td>
          <td><?php print $mem1[3]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[4]['lineup']; ?></th>
          <td><?php print $mem1[4]['position']; ?></td>
          <td><?php print $mem1[4]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[5]['lineup']; ?></th>
          <td><?php print $mem1[5]['position']; ?></td>
          <td><?php print $mem1[5]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[6]['lineup']; ?></th>
          <td><?php print $mem1[6]['position']; ?></td>
          <td><?php print $mem1[6]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[7]['lineup']; ?></th>
          <td><?php print $mem1[7]['position']; ?></td>
          <td><?php print $mem1[7]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[8]['lineup']; ?></th>
          <td><?php print $mem1[8]['position']; ?></td>
          <td><?php print $mem1[8]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[9]['lineup']; ?></th>
          <td><?php print $mem1[9]['position']; ?></td>
          <td><?php print $mem1[9]['name']; ?></td>
        </tr>
      </tbody>
    </table>

<?php

if ($game['myself'] == "t") {
$str_sql1 = "select lineup,position,name from symbol_score_member where tb='b'";
} else {
$str_sql1 = "select lineup,position,name from symbol_score_member where tb='t'";
}
$rs1 = pg_query($db, $str_sql1);
$count1 = pg_num_rows($rs1);
for($i=0;$i<$count1;$i++){
$mem1[$i] = pg_fetch_assoc($rs1);
}

?>

    <table class="quarter">
      <caption>
      <?php print $taisen; ?> <span>�������</span>
      </caption>
      <thead>
        <tr>
          <th scope="col">�ǽ�</th>
          <th scope="col">�ݥ������</th>
          <th scope="col">̾��</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"><?php print $mem1[0]['lineup']; ?></th>
          <td><?php print $mem1[0]['position']; ?></td>
          <td><?php print $mem1[0]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[1]['lineup']; ?></th>
          <td><?php print $mem1[1]['position']; ?></td>
          <td><?php print $mem1[1]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[2]['lineup']; ?></th>
          <td><?php print $mem1[2]['position']; ?></td>
          <td><?php print $mem1[2]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[3]['lineup']; ?></th>
          <td><?php print $mem1[3]['position']; ?></td>
          <td><?php print $mem1[3]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[4]['lineup']; ?></th>
          <td><?php print $mem1[4]['position']; ?></td>
          <td><?php print $mem1[4]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[5]['lineup']; ?></th>
          <td><?php print $mem1[5]['position']; ?></td>
          <td><?php print $mem1[5]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[6]['lineup']; ?></th>
          <td><?php print $mem1[6]['position']; ?></td>
          <td><?php print $mem1[6]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[7]['lineup']; ?></th>
          <td><?php print $mem1[7]['position']; ?></td>
          <td><?php print $mem1[7]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[8]['lineup']; ?></th>
          <td><?php print $mem1[8]['position']; ?></td>
          <td><?php print $mem1[8]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[9]['lineup']; ?></th>
          <td><?php print $mem1[9]['position']; ?></td>
          <td><?php print $mem1[9]['name']; ?></td>
        </tr>
      </tbody>
    </table>



<?php

$str_sql1 = "select * from symbol_score_board where tb='t'";
$rs1 = pg_query($db, $str_sql1);
$brd_t = pg_fetch_assoc($rs1);

if (!($brd_t['i20']=="")) {
	$inning = 20;
	$width = 18;
} else if (!($brd_t['i19']=="")) {
	$inning = 19;
	$width = 18;
} else if (!($brd_t['i18']=="")) {
	$inning = 18;
	$width = 18; 
} else if (!($brd_t['i17']=="")) {
	$inning = 17;
	$width = 18;
} else if (!($brd_t['i16']=="")) {
	$inning = 16;
	$width = 20;
} else if (!($brd_t['i15']=="")) {
	$inning = 15;
	$width = 20;
} else if (!($brd_t['i14']=="")) {
	$inning = 14;
	$width = 20;
} else if (!($brd_t['i13']=="")) {
	$inning = 13;
	$width = 22;	
} else if (!($brd_t['i12']=="")) {
	$inning = 12;
	$width = 24;	
} else if (!($brd_t['i11']=="")) {
	$inning = 11;
	$width = 26;
} else if (!($brd_t['i10']=="")) {
	$inning = 10;
	$width = 28;
} else {
	$inning = 9;
	$width = 30;
}

$str_sql1 = "select * from symbol_score_board where tb='b'";
$rs1 = pg_query($db, $str_sql1);
$brd_b = pg_fetch_assoc($rs1);

?>

    <section class="half">
      <h5>������</h5>
      <p class="zerofive">�� �ƥ��˥󥰤Υ������򥯥�å�����ȡ����ˤ��β�����Ƥ�ɽ�����ޤ���</p>
      <table class="score">
        <thead>
          <tr>

<?php

//1����
print "<th scope=\"col\">TEAM</th>\n";

for ($i=1;$i<=$inning;$i++) {
print "<th scope=\"col\" width=\"". $width ."\">". $i ."</th>\n";
}

print "<th scope=\"col\">��</th>\n";
print "</tr></thead>\n";

//2����
print "<tbody><tr>\n";

print "<th scope=\"row\">". $game['top'] ."</th>\n";

$section_id = 1;
for ($i=1;$i<=$inning;$i++) {
print "<td><a href=\"#". $section_id ."\">". $brd_t["i{$i}"] ."</a></td>\n";
$section_id = $section_id +2 ;
}

print"<td>". $brd_t['total'] ."</td>\n";
print "</tr>\n";

//3����
print "<tr>\n";

print "<th scope=\"row\">". $game['bottom'] ."</th>\n";

$section_id = 2;
for ($i=1;$i<=$inning;$i++) {
print "<td><a href=\"#". $section_id ."\">". $brd_b["i{$i}"] ."</a></td>\n";
$section_id = $section_id +2 ;
}

print"<td>". $brd_b['total'] ."</td>";

?>
          </tr>
        </tbody>
      </table>

      <table class="battery">

<?php

print "<tr>\n";
print "<th scope=\"row\">" .$game['top']. "</th>\n";
print "<td>" .$brd_t['battery']. "</td>\n";
print "</tr>\n";
print "<tr>\n";
print "<th scope=\"row\">" .$game['bottom']. "</th>\n";
print"<td>" .$brd_b['battery']. "</td>\n";
print "</tr>\n";

?>

  </table>

      <hr>

  <h5>���Ÿ��</h5>

<div>

<?php

$section_id =1 ; 
for($i=1;$i<=$count_ini;$i++){

$str_sql2 = "select * from symbol_score_develop where inning = '". $i ."';";
$rs2 = pg_query($db, $str_sql2);
$dev[$i] = pg_fetch_assoc($rs2);

$str_sql3 = "select * from symbol_score_develop_detail where inning = '". $i ."' and tb = 't';";
$rs3 = pg_query($db, $str_sql3);
$count3 = pg_num_rows($rs3);

print "<section id=\"". $section_id ."\">\n";
print "<h6>" .$dev[$i]['inning']. "��ɽ��" .$game['top']. "��</h6>\n";
print "<p>" .$dev[$i]['comment_t']. "</p>\n";
print "<table><thead><tr><th scope=\"col\">�ǽ�</th><th scope=\"col\">�Ǽ�</th><th scope=\"col\">��������</th><th scope=\"col\">�����ȥ������</th><th scope=\"col\">���ʡ�</th></tr></thead><tbody>";

for($l=1;$l<=$count3;$l++){

$str_sql4 = "select * from symbol_score_develop_detail where inning = '" .$i."' and number = '". $l . "' and tb = 't';";
$rs4 = pg_query($db, $str_sql4);
$dtl[$l] = pg_fetch_assoc($rs4);

print "<tr>\n";
print "<th scope=\"row\">" .$dtl[$l]['lineup']. "</th>\n";
print "<th scope=\"row\">" .$dtl[$l]['name']. "</th>\n";
print "<td>" .$dtl[$l]['result']. "</td>\n";
print "<td>" .$dtl[$l]['out']. "</td>\n";
print "<td>" .$dtl[$l]['base']. "</td>\n";
print "</tr>\n";
}

print "</tbody></table>\n";
print "<p>" .$dev[$i]['memo_t']. "</p>\n";
print "</section>";

$section_id = $section_id + 1 ;

$str_sql3 = "select * from symbol_score_develop_detail where inning = '". $i ."' and tb = 'b';";
$rs3 = pg_query($db, $str_sql3);
$count3 = pg_num_rows($rs3);

print "<section id=\"". $section_id ."\">\n";
print "<h6>" .$dev[$i]['inning']. "��΢��" .$game['bottom']. "��</h6>\n";
print "<p>" .$dev[$i]['comment_b']. "</p>\n";

print "<table><thead><tr><th scope=\"col\">�ǽ�</th><th scope=\"col\">�Ǽ�</th><th scope=\"col\">��������</th><th scope=\"col\">�����ȥ������</th><th scope=\"col\">���ʡ�</th></tr></thead><tbody>";

for($l=1;$l<=$count3;$l++){

$str_sql4 = "select * from symbol_score_develop_detail where inning = '" .$i."' and number = '". $l . "' and tb = 'b';";
$rs4 = pg_query($db, $str_sql4);
$dtl[$l] = pg_fetch_assoc($rs4);

print "<tr>\n";
print "<th scope=\"row\">" .$dtl[$l]['lineup']. "</th>\n";
print "<th scope=\"row\">" .$dtl[$l]['name']. "</th>\n";
print "<td>" .$dtl[$l]['result']. "</td>\n";
print "<td>" .$dtl[$l]['out']. "</td>\n";
print "<td>" .$dtl[$l]['base']. "</td>\n";
print "</tr>\n";
}

print "</tbody></table>\n";
print "<p>" .$dev[$i]['memo_b']. "</p>\n";
print "</section>";

$section_id = $section_id + 1 ;
}

?>

      </div>

      <ul>
        <li class="prev"><a href="#"><span class="fa fa-angle-left fa-5x"></span></a></li>
        <li class="next"><a href="#"><span class="fa fa-angle-right fa-5x"></span></a></li>
      </ul>
    </section>




  </section>
  <p id="pan">��88���Ի��й������� �� ���в�</p>
</article>

<?php
  echo $string_footer;  //���֤��������ƥ����Ȥ�ɽ��
?>

</body>
</html>
