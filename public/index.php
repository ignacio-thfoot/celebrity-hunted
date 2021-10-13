<?php include("header.php"); ?>
<?php
    if(!isset($_SESSION['logged'])):
        $_SESSION['refer'] = 'index.php';
        header("location:login.php");     
    endif;
?>
<body>
    <div class="b--banner-a b--content-a">
        <p class="b--banner-a__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam nulla vitae quas dolores quo mollitia repudiandae quos laboriosam deserunt.</p>
    </div>
    <div id="pano" style="width:100%;height:100%;">
        <noscript><table style="width:100%;height:100%;"><tr style="vertical-align:middle;"><td><div style="text-align:center;">ERROR:<br/><br/>Javascript not activated<br/><br/></div></td></tr></table></noscript>
        <script>
            embedpano({swf:"img/pano.swf", xml:"celebrity_hunted.xml", target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true});
            function loaded(){
                console.log('Load Complete');
                const event = new Event('loaded');
                document.dispatchEvent(event);
            }
        </script>
    </div>

    <div class="b--preloader-a b--preloader-a--is-active">
        <img src="img/PV_CH_LOADING+LOGOS_2.gif">
        
    </div>
    
<?php include("footer.php");