<!-- header -->
<?php session_start(); ?>    
<!DOCTYPE html>
<html>
<head>
	<title>Celebrity Hunted</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, viewport-fit=cover" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<meta http-equiv="x-ua-compatible" content="IE=edge" />
	<meta property=”og:image” content=”img/og-image.jpg” />
	<link rel="icon" href="favicon.ico" type="image/x-icon" />
	<style>
		html { height:100%; }
		body { height:100%; overflow:hidden; margin:0; padding:0; font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#FFFFFF; background-color:#000000; }
		.shadow {
  		-webkit-filter: drop-shadow(0px 3px 13px #000000);
  		filter: drop-shadow(0px 3px 13px #000000);
		}

		.team_buttons.is--active {
			border: 2px solid white!important;
		}
	</style>
    
    <link href=" {{ URL::asset('css/common.css') }}" rel="stylesheet">

	<script src="https://code.jquery.com/jquery-3.6.0.min.js"
  	integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  	crossorigin="anonymous"></script>
    <script src="skin/pano.js"></script>
</head>

<body>
<!-- end header -->

<?php 
    
?>
    <section class="b--section-a">
        <div class="f--container">
            <div class="f--col-4 f--offset-4 f--col-tabletl-6 f--offset-tabletl-3 f--col-tabletp-8 f--offset-tabletp-2 f--col-mobile-12 f--offset-mobile-0">
                <form action="/login" method="post" name="login_form">
                    @csrf
                    <div class="b--form-group-a f--p-16">
                        <label for="text_user" class="b--form-label-a">User:</label>
                        <div class="b--form-input-a">
                            <input type="text" id="text_user" name="text_user" class="b--form-input-a__item">
                        </div>
                    </div>
                    <div class="b--form-group-a f--p-16 f--pt-0">
                        <label for="text_pwd" class="b--form-label-a">Password:</label>
                        <div class="b--form-input-a">
                            <input type="password" id="text_pwd" name="text_pwd" class="b--form-input-a__item">
                        </div>
                    </div>
                    <div class="b--form-group-a f--p-32 text-center">
                        <a href="javascript:document.login_form.submit()" class="b--link-a">ENTER</a>
                    </div>
                </form>
            </div>
        </div>
    </section>

<!-- footer -->
<script type="text/javascript" src="{{ URL::asset('js/home.js') }}"></script>

<!-- Go to www.addthis.com/dashboard to customize your tools -->

<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-6165c13002388eed"></script>

<script async defer src="https://api.celebrity-hunted.fr/latest.js"></script>
<noscript><img src="https://api.celebrity-hunted.fr/noscript.gif" alt="" referrerpolicy="no-referrer-when-downgrade" /></noscript>
</body>
</html>
<!-- end footer -->