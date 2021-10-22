<?php session_start(); ?>
<?php include("local.php"); ?>
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
    <?php if(!constant("IS_VIRTUAL_ENV")): ?>
        <link rel="stylesheet" href="css/app_common.css">
    <?php endif; ?>
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"
  	integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  	crossorigin="anonymous"></script>
    <script src="js/pano.js"></script>
</head>

<body>
