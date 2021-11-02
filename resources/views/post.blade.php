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
	<meta property="og:image" content="https://celebrity-hunted.fr/img/og-image.jpg" />
    <meta property="og:title" content="#CelebrityHunted : 1000€ à gagner ! " />
    <?php $current_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST']; ?>
    <meta property="og:type" content="site" />
    <?php

        if(isset($_GET['score'])):
            $score = DB::table('scores')->where("id", $_GET['score'])->first();
            $team_name = $score->teamName;
            $time = $score->timePassed;
            $pretty_time = (intval($time) > 60) ? gmdate("i:s", $time) . " min" : gmdate("s", $time) . " sec"; ?>
            
            <meta property="og:description" content="#CelebrityHunted : J’ai retrouvé <?= $team_name; ?> en <?= $pretty_time; ?>. Toi aussi participe pour battre mon record et peut-être gagner 1000€." />
            <meta name="twitter:description" content="#CelebrityHunted : J’ai retrouvé <?= $team_name; ?> en <?= $pretty_time; ?>. Toi aussi participe pour battre mon record et peut-être gagner 1000€." />
            <meta property="og:url" content="https://celebrity-hunted.fr?score=<?= $_GET['score']; ?>" />
        <?php else: ?>
            <meta property="og:description" content="La chasse à l’homme est ouverte ! Retrouvez les participants de #CelebrityHunted et tentez de gagner 1000 €." />
            <meta name="twitter:description" content="La chasse à l’homme est ouverte ! Retrouvez les participants de #CelebrityHunted et tentez de gagner 1000 €." />
            <meta property="og:url" content="https://celebrity-hunted.fr" />
        <?php endif; ?>
    
    <!-- twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://celebrity-hunted.fr/img/og-image.jpg" />
    <!-- end twitter-->

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
    <script src="pano.js"></script>
</head>

<body>

    <div id="pano" style="width:100%;height:100%;position:relative; z-index: 1;">
        <noscript><table style="width:100%;height:100%;"><tr style="vertical-align:middle;"><td><div style="text-align:center;">ERROR:<br/><br/>Javascript not activated<br/><br/></div></td></tr></table></noscript>
        <script>
            embedpano({swf:"img/pano.swf", xml:"celebrity_hunted.xml", target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true});
            function loaded(){
                console.log('Load Complete');
                const event = new Event('loaded');
                document.dispatchEvent(event);
            }
            function header_pos(header_x,header_y,header_width,header_height){
                window.header_x = header_x;
                window.header_y = header_y;
                window.header_width = header_width;
                window.header_height = header_height;
                console.log(header_x,header_y,header_width,header_height);
            }
            function clickEvent(id){
                console.log(id);
                const event = new Event(id);
                document.dispatchEvent(event);
            }
        </script>
        <!-- WELCOME -->
        <div class="f--container">
            <div class="f--row">
                <div class="b--card-c b--card-c--is-visible" id="modal-home" role="dialog">
                    <div class="b--card-c__hd"></div>
                    <div class="b--card-c__front-items">
                        <h3 class="b--card-c__front-items__bd__title" data-text="welcome_title"></h3>
                        <div class="b--card-c__bd">
                            <p class="b--card-c__front-items__bd__content" data-text="welcome_text"></p>
                            <div class="b--card-c__front-items__bd__btn__disclaimer" data-text="button_start_disclaimer"></div>
                            <button class="b--card-c__front-items__bd__btn" id="button_start" data-text="button_start" style="background: url('img/b--card-a__bd__btn__bg.png');background-position: center;background-size: contain; background-repeat:no-repeat"></button>
                        </div>
                        <div class="b--card-c__front-items__ft">
                            <a href="#" class="b--card-c__front-items__ft__btn" data-text="welcome_more"></a>
                        </div>
                    </div>
                    <div class="b--card-c__ft"></div>
                </div>
            </div>
        </div>
    </div>

    
        <!-- INSCRIPTION -->
        <div class="b--card-c" id="modal-inscription" role="dialog">
            <div class="b--card-c__hd"></div>
            <div class="b--card-c__front-items">
                <div class="b--card-c__front-items__bd">
                    <h3 class="b--card-c__front-items__bd__title" data-text="win_title"></h3>
                    <p class="b--card-c__front-items__bd__content" data-text="win_text"></p>
                </div>
            </div>
            <a href="#" class="b--card-c__media-wrapper">
                <img class="b--card-c__media-wrapper__icon close-modal" src="img/BOUTON_CROIX.png" data-dismiss>
            </a>
            <div class="b--card-c__ft"></div>
        </div>

        <!-- INSCRIPTION BIS -->
        <div class="b--card-c" id="modal-inscription-2" role="dialog">
        <div class="b--card-c__hd"></div>
            <div class="b--card-c__front-items">
                <div class="b--card-c__front-items__bd">
                    <h3 class="b--card-c__front-items__bd__title" data-text="win_title"></h3>
                    <p class="b--card-c__front-items__bd__content" data-text="already_signed_text"></p>
                </div>
                <div class="b--card-c__front-items__ft">
                    <div class="f--row">
                        <div class="f--col-12 text-center">
                            <a class="addthis_button_facebook" addthis:url="https://celebrity-hunted.fr/?score=1" ><img src="img/FB.png" alt="Share" class="b--card-c__front-items__ft__social at-icon-wrapper at-share-btn at-svc-facebook"></a>
                            <a class="addthis_button_twitter" addthis:url="https://celebrity-hunted.fr/?score=1"><img src="img/TWITTER.png" alt="Share" class="b--card-c__front-items__ft__social at-icon-wrapper at-share-btn at-svc-twitter"></a>
                            <!-- Go to www.addthis.com/dashboard to customize your tools -->
                            <!-- <div class="addthis_inline_share_toolbox"></div> -->
                        </div>
                    </div>
                    <div class="f--row">
                        <div class="f--col-12 text-center">
                            <a href="#" class="b--card-c__front-items__ft__btn" data-text="welcome_more"></a>
                        </div>
                    </div>
                    
                </div>
            </div>
            <a href="#" class="b--card-c__media-wrapper">
                <img class="b--card-c__media-wrapper__icon close-modal" src="img/BOUTON_CROIX.png" data-dismiss>
            </a>
            <div class="b--card-c__ft"></div>
        </div>

        <!-- POST INSCRIPTION SHARE -->
        <div class="b--card-c" id="modal-share" role="dialog">
        <div class="b--card-c__hd"></div>
            <div class="b--card-c__front-items">
                <div class="b--card-c__front-items__bd">
                    <h3 class="b--card-c__front-items__bd__title" data-text="thanks_title"></h3>
                    <p class="b--card-c__front-items__bd__content" data-text="thanks_text"></p>
                </div>
                <div class="b--card-c__front-items__ft">
                <a class="addthis_button_facebook" data-description="THIS IS FOR FACEBOOK"><img src="img/FB.png" alt="Share" class="b--card-c__front-items__ft__social at-icon-wrapper at-share-btn at-svc-facebook"></a>
                <a class="addthis_button_twitter" data-description="THIS IS FOR TWITTER"><img src="img/TWITTER.png" alt="Share" class="b--card-c__front-items__ft__social at-icon-wrapper at-share-btn at-svc-twitter"></a>
                </div>
            </div>
            <a href="#" class="b--card-c__media-wrapper">
                <img class="b--card-c__media-wrapper__icon close-modal" src="img/BOUTON_CROIX.png">
            </a>
            <div class="b--card-c__ft"></div>
        </div>

        <!-- POST INSCRIPTION ERROR SHARE -->
        <div class="b--card-c" id="modal-error" role="dialog">
        <div class="b--card-c__hd"></div>
            <div class="b--card-c__front-items">
                <div class="b--card-c__front-items__bd">
                    <h3 class="b--card-c__front-items__bd__title" data-text="error_title"></h3>
                    <p class="b--card-c__front-items__bd__content" data-text="error_text"></p>
                </div>
                <div class="b--card-c__front-items__ft">
                    <a class="addthis_button_facebook" data-description="THIS IS FOR FACEBOOK"><img src="img/FB.png" alt="Share" class="b--card-c__front-items__ft__social at-icon-wrapper at-share-btn at-svc-facebook"></a>
                    <a class="addthis_button_twitter" data-description="THIS IS FOR TWITTER"><img src="img/TWITTER.png" alt="Share" class="b--card-c__front-items__ft__social at-icon-wrapper at-share-btn at-svc-twitter"></a>
                    <!-- Go to www.addthis.com/dashboard to customize your tools -->
                    <!-- <div class="addthis_inline_share_toolbox"></div> -->
                </div>
            </div>
            <a href="#" class="b--card-c__media-wrapper">
                <img class="b--card-c__media-wrapper__icon close-modal" src="img/BOUTON_CROIX.png">
            </a>
            <div class="b--card-c__ft"></div>
        </div>

        <!-- TRAILER -->
        <div class="b--card-c b--video-a" id="modal-trailer" role="dialog">
        <div class="b--card-c__hd"></div>
            <div class="b--card-c__front-items b--video-a__front-items">
                <div class="b--card-c__front-items__bd">
                    <h3 class="b--card-c__front-items__bd__title b--video-a__title" data-text="trailer_title"></h3>
                    <div class="b--card-c__front-items__bd__content">
                        <div class="b--video-a__video">
                            <iframe src="https://www.youtube.com/embed/eUFmbd0R6SE?enablejsapi=1&version=3&playerapiid=ytplayer" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
            
            <a href="#"  class="b--video-a__media-wrapper">
                <img class="b--card-c__media-wrapper__icon close-modal" src="img/BOUTON_CROIX.png">
            </a>
            <div class="b--card-c__ft"></div>
        </div>

        <!-- HELP -->

        <div class="b--card-c b--card-c--second" id="modal-help" role="dialog">
        <div class="b--card-c__hd"></div>
            <div class="b--card-c__front-items">
                <div class="b--card-c__front-items__bd">
                    <h3 class="b--card-c__front-items__bd__title" data-text="help_title"></h3>
                    <p class="b--card-c__front-items__bd__content" data-text="help_text"></p>
                </div>
                <div class="b--card-c__front-items__ft">
                    <a href="data/apv-celebrity-hunted-cgu-reglement.pdf" target="_blank" class="b--card-c__front-items__ft__btn" data-text="policy_button_text"></a>
                    <a href="data/apv-celebrity-hunted-cgu-reglement.pdf" target="_blank" class="b--card-c__front-items__ft__btnShort" data-text="policy_button_text_mobile"></a>
                </div>
            </div>
            <a href="#" class="b--card-c__media-wrapper">
                <img class="b--card-c__media-wrapper__icon close-modal" src="img/BOUTON_CROIX.png" data-dismiss>
            </a>
            <div class="b--card-c__ft"></div>
        </div>

    <!-- PRELOADER -->
        <div class="f--container">
            <div class="f--row">
                <div class="f--col-12">
                <div class="b--preloader-a b--preloader-a--is-active">
                    <div class="b--preloader-a__media-wrapper">
                            <video src="img/1_WEB_LOADING_SF.mp4" class="b--preloader-a__media-wrapper__media" autoplay playsinline muted loop />
                        </div>
                        <svg class="b--preloader-a__logo" id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194.45 59.74"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M867.48,1033.31a1,1,0,0,1-.71-.21,1,1,0,0,1-.22-.72v-24.77a.94.94,0,0,1,.22-.72,1,1,0,0,1,.71-.21h2.67a1,1,0,0,1,1,.82l.26,1a8.15,8.15,0,0,1,2.69-1.71,8.57,8.57,0,0,1,3.21-.63,6.92,6.92,0,0,1,5.7,2.63,11.15,11.15,0,0,1,2.1,7.13,13.06,13.06,0,0,1-1,5.39,8.4,8.4,0,0,1-2.82,3.54,7,7,0,0,1-4.09,1.24,8.68,8.68,0,0,1-2.89-.48,6.87,6.87,0,0,1-2.34-1.34v8.13a.77.77,0,0,1-.93.93h-3.56Zm8.13-11.33a3.47,3.47,0,0,0,3.06-1.41,7.86,7.86,0,0,0,1-4.45,8.18,8.18,0,0,0-1-4.5,3.47,3.47,0,0,0-3.08-1.41,7.05,7.05,0,0,0-3.64,1V1021a6.8,6.8,0,0,0,3.64,1" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M889.64,1025.66a1,1,0,0,1-.7-.23.93.93,0,0,1-.23-.7v-17.12a.94.94,0,0,1,.23-.72,1,1,0,0,1,.7-.21h2.67a1,1,0,0,1,1,.82l.49,2a10.66,10.66,0,0,1,2.8-2.33,5.94,5.94,0,0,1,2.8-.68H900a1.09,1.09,0,0,1,.74.2,1,1,0,0,1,.23.73v3.11a1,1,0,0,1-.21.71.93.93,0,0,1-.72.22,6,6,0,0,1-.67,0c-.27,0-.62,0-1,0a11.14,11.14,0,0,0-2.08.24,10,10,0,0,0-2.08.61v12.47a1.06,1.06,0,0,1-.2.71,1,1,0,0,1-.73.22h-3.56Z" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M906,1003.75a3.22,3.22,0,0,1-2.26-.78,3,3,0,0,1,0-4.23,3.68,3.68,0,0,1,4.53,0,3.06,3.06,0,0,1,0,4.23,3.24,3.24,0,0,1-2.27.78m-1.78,21.91a1,1,0,0,1-.7-.23.93.93,0,0,1-.23-.7v-17.12a.94.94,0,0,1,.23-.72,1,1,0,0,1,.7-.2h3.57a1,1,0,0,1,.72.2,1,1,0,0,1,.21.72v17.12a1,1,0,0,1-.21.7,1,1,0,0,1-.72.23Z" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M914.18,1025.66a1,1,0,0,1-.7-.23.93.93,0,0,1-.22-.7v-17.12a1,1,0,0,1,.22-.72,1,1,0,0,1,.7-.21h2.68a1,1,0,0,1,1,.82l.29,1a16.83,16.83,0,0,1,3.55-1.84,10.2,10.2,0,0,1,3.25-.53,5,5,0,0,1,4.71,2.37,15.08,15.08,0,0,1,3.57-1.82,10.83,10.83,0,0,1,3.45-.55,5.43,5.43,0,0,1,4,1.44,5.54,5.54,0,0,1,1.43,4v13.11a1,1,0,0,1-.21.7.93.93,0,0,1-.72.22h-3.57a.79.79,0,0,1-.92-.92v-11.92c0-1.69-.76-2.53-2.27-2.53a9.25,9.25,0,0,0-4,1v13.47a1,1,0,0,1-.21.71,1,1,0,0,1-.72.22H926a.93.93,0,0,1-.7-.22,1,1,0,0,1-.23-.71v-11.91c0-1.69-.75-2.53-2.26-2.53a9,9,0,0,0-4.09,1v13.44a1,1,0,0,1-.2.71,1,1,0,0,1-.72.22h-3.57Z" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M954.92,1026.25c-3,0-5.33-.71-7.18-2.59-1.21-1.23-2.36-3.53-2.36-7.46a10.41,10.41,0,0,1,2.64-7.34,8.89,8.89,0,0,1,6.49-2.58c2.94,0,4.69.66,6,2a5.56,5.56,0,0,1,1.57,3.84,5.46,5.46,0,0,1-.51,2.68,4.13,4.13,0,0,1-1,1.35c-2.19,2-6.48,1.87-7.93,1.79l-2.35-.36a4.81,4.81,0,0,0,1.61,3.64c.93.68,2,1,4.07,1a17.71,17.71,0,0,0,4.26-.68l.35-.09a1.13,1.13,0,0,1,.35,0c.2.06.42.25.42.79v1.71a1.57,1.57,0,0,1-.16.84,1.42,1.42,0,0,1-.66.44,15.67,15.67,0,0,1-5.59,1m2.25-13.91c0-1.81-1.27-2.33-2.85-2.33a3.66,3.66,0,0,0-2.72,1.12,5.76,5.76,0,0,0-1.25,3.24,16.9,16.9,0,0,0,4.79.17,2.13,2.13,0,0,0,2-2.2" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M1032.46,1026.25c-3,0-5.32-.71-7.17-2.59-1.22-1.23-2.36-3.53-2.36-7.46a10.37,10.37,0,0,1,2.64-7.34,8.88,8.88,0,0,1,6.48-2.58c3,0,4.69.67,6,2a5.56,5.56,0,0,1,1.56,3.84,5.43,5.43,0,0,1-.5,2.68,4.43,4.43,0,0,1-1,1.35c-2.19,2-6.48,1.87-7.93,1.79l-2.35-.36a4.81,4.81,0,0,0,1.61,3.64c.93.68,2,1,4.06,1a17.71,17.71,0,0,0,4.27-.68l.35-.09a1.07,1.07,0,0,1,.34,0c.2.06.42.25.42.79v1.71a1.58,1.58,0,0,1-.15.84,1.48,1.48,0,0,1-.66.44,15.72,15.72,0,0,1-5.6,1m2.26-13.91c0-1.81-1.28-2.33-2.85-2.33a3.64,3.64,0,0,0-2.72,1.12,5.84,5.84,0,0,0-1.26,3.24,17,17,0,0,0,4.8.17,2.13,2.13,0,0,0,2-2.2" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M978.44,1025.66a1.58,1.58,0,0,1-.62-.1,1,1,0,0,1-.41-.29,2.36,2.36,0,0,1-.31-.58l-6.35-16.52c-.08-.2-.14-.37-.19-.52a1.26,1.26,0,0,1-.07-.41c0-.37.25-.55.74-.55h3.71a1.41,1.41,0,0,1,.88.22,1.49,1.49,0,0,1,.42.74l3.83,13.14,3.9-13.14a1.12,1.12,0,0,1,1.3-1h3.6c.49,0,.74.18.74.55a1.6,1.6,0,0,1-.07.41c0,.15-.12.32-.19.52L983,1024.69a2.06,2.06,0,0,1-.32.58,1,1,0,0,1-.38.29,1.53,1.53,0,0,1-.63.1Z" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M994.63,1003.75a3.24,3.24,0,0,1-2.27-.78,3.06,3.06,0,0,1,0-4.23,3.68,3.68,0,0,1,4.53,0,3,3,0,0,1,0,4.23,3.22,3.22,0,0,1-2.26.78m-1.78,21.91a1,1,0,0,1-.71-.23,1,1,0,0,1-.22-.7v-17.12a1,1,0,0,1,.22-.72,1,1,0,0,1,.71-.2h3.56a1,1,0,0,1,.73.2,1.05,1.05,0,0,1,.2.72v17.12a1,1,0,0,1-.2.7,1,1,0,0,1-.73.23Z" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M1008.69,1026.07a7.11,7.11,0,0,1-4.19-1.25,7.87,7.87,0,0,1-2.73-3.45,12.87,12.87,0,0,1-.95-5.11,11.52,11.52,0,0,1,2.19-7.36,7,7,0,0,1,5.79-2.77,8.09,8.09,0,0,1,5.09,1.67v-8.69a.94.94,0,0,1,.22-.72,1,1,0,0,1,.71-.21h3.56a1,1,0,0,1,.73.21,1,1,0,0,1,.2.72v25.62a1,1,0,0,1-.2.7,1,1,0,0,1-.73.23h-3a1.09,1.09,0,0,1-.69-.19,1.11,1.11,0,0,1-.35-.63l-.22-.85a7.9,7.9,0,0,1-5.46,2.08m1.78-4.09a6.22,6.22,0,0,0,3.42-1v-9.8a7.19,7.19,0,0,0-3.68-.93,3.26,3.26,0,0,0-2.93,1.47,8.22,8.22,0,0,0-1,4.44,7.74,7.74,0,0,0,1,4.42,3.56,3.56,0,0,0,3.13,1.44" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M1051.61,1026.22a9,9,0,0,1-6.91-2.66q-2.49-2.65-2.49-7.41a10.36,10.36,0,0,1,2.49-7.37,10.32,10.32,0,0,1,13.81,0,10.36,10.36,0,0,1,2.49,7.37q0,4.76-2.49,7.41a9,9,0,0,1-6.9,2.66m0-4.16c2.6,0,3.89-2,3.89-5.9s-1.29-5.87-3.89-5.87-3.9,2-3.9,5.87,1.3,5.9,3.9,5.9" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M913.73,1036v.31a1.39,1.39,0,0,0,.43.79,71.44,71.44,0,0,0,50.17,20.63c13.86,0,30-4.7,41.07-13.53,1.83-1.47.26-3.66-1.62-2.8a93.64,93.64,0,0,1-38.28,8.45,95.41,95.41,0,0,1-50.2-14.36,1.34,1.34,0,0,0-.71-.23.84.84,0,0,0-.86.74" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M996.24,1037.37a1.45,1.45,0,0,0-.64.93v.18c0,.34.36.57.91.5,3.58-.47,11.55-1.49,13,.47s-1.58,10-2.92,13.59c-.41,1.08.46,1.53,1.38.7,6-5.35,7.49-16.56,6.27-18.18-.58-.78-3.32-1.5-6.7-1.5-3.62,0-8,.83-11.27,3.31" transform="translate(-866.55 -997.96)"/></svg>
                    </div>
                </div>
            </div>
        </div>

    <!-- ROTATE -->
    <div class="b--rotate-a">
        <div class="f--row">
            <div class="f--col-12">
                <div class="b--rotate-a__media-wrapper">
                    <svg class="b--rotate-a__media-wrapper__media" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="327" height="323" viewBox="0 0 327 323">
                        <image id="Vector_Smart_Object" data-name="Vector Smart Object" width="327" height="323" xlink:href="data:img/png;base64,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"/>
                    </svg>

                </div>
            </div>
        </div>
        <div class="f--row">
            <div class="f--col-10 f--offset-1 f--col-mobile-12 f--offset-mobile-0">
                <p class="b--rotate-a__content" data-text="rotate_text"></p>
            </div>
        </div>
        <div class="f--row">
            <div class="f--col-10 f--offset-1 f--col-mobile-12 f--offset-mobile-0">
                <div class="b--rotate-a__ft__media-wrapper">
                    <svg class="b--rotate-a__ft__media-wrapper__media" id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194.45 59.74"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M867.48,1033.31a1,1,0,0,1-.71-.21,1,1,0,0,1-.22-.72v-24.77a.94.94,0,0,1,.22-.72,1,1,0,0,1,.71-.21h2.67a1,1,0,0,1,1,.82l.26,1a8.15,8.15,0,0,1,2.69-1.71,8.57,8.57,0,0,1,3.21-.63,6.92,6.92,0,0,1,5.7,2.63,11.15,11.15,0,0,1,2.1,7.13,13.06,13.06,0,0,1-1,5.39,8.4,8.4,0,0,1-2.82,3.54,7,7,0,0,1-4.09,1.24,8.68,8.68,0,0,1-2.89-.48,6.87,6.87,0,0,1-2.34-1.34v8.13a.77.77,0,0,1-.93.93h-3.56Zm8.13-11.33a3.47,3.47,0,0,0,3.06-1.41,7.86,7.86,0,0,0,1-4.45,8.18,8.18,0,0,0-1-4.5,3.47,3.47,0,0,0-3.08-1.41,7.05,7.05,0,0,0-3.64,1V1021a6.8,6.8,0,0,0,3.64,1" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M889.64,1025.66a1,1,0,0,1-.7-.23.93.93,0,0,1-.23-.7v-17.12a.94.94,0,0,1,.23-.72,1,1,0,0,1,.7-.21h2.67a1,1,0,0,1,1,.82l.49,2a10.66,10.66,0,0,1,2.8-2.33,5.94,5.94,0,0,1,2.8-.68H900a1.09,1.09,0,0,1,.74.2,1,1,0,0,1,.23.73v3.11a1,1,0,0,1-.21.71.93.93,0,0,1-.72.22,6,6,0,0,1-.67,0c-.27,0-.62,0-1,0a11.14,11.14,0,0,0-2.08.24,10,10,0,0,0-2.08.61v12.47a1.06,1.06,0,0,1-.2.71,1,1,0,0,1-.73.22h-3.56Z" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M906,1003.75a3.22,3.22,0,0,1-2.26-.78,3,3,0,0,1,0-4.23,3.68,3.68,0,0,1,4.53,0,3.06,3.06,0,0,1,0,4.23,3.24,3.24,0,0,1-2.27.78m-1.78,21.91a1,1,0,0,1-.7-.23.93.93,0,0,1-.23-.7v-17.12a.94.94,0,0,1,.23-.72,1,1,0,0,1,.7-.2h3.57a1,1,0,0,1,.72.2,1,1,0,0,1,.21.72v17.12a1,1,0,0,1-.21.7,1,1,0,0,1-.72.23Z" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M914.18,1025.66a1,1,0,0,1-.7-.23.93.93,0,0,1-.22-.7v-17.12a1,1,0,0,1,.22-.72,1,1,0,0,1,.7-.21h2.68a1,1,0,0,1,1,.82l.29,1a16.83,16.83,0,0,1,3.55-1.84,10.2,10.2,0,0,1,3.25-.53,5,5,0,0,1,4.71,2.37,15.08,15.08,0,0,1,3.57-1.82,10.83,10.83,0,0,1,3.45-.55,5.43,5.43,0,0,1,4,1.44,5.54,5.54,0,0,1,1.43,4v13.11a1,1,0,0,1-.21.7.93.93,0,0,1-.72.22h-3.57a.79.79,0,0,1-.92-.92v-11.92c0-1.69-.76-2.53-2.27-2.53a9.25,9.25,0,0,0-4,1v13.47a1,1,0,0,1-.21.71,1,1,0,0,1-.72.22H926a.93.93,0,0,1-.7-.22,1,1,0,0,1-.23-.71v-11.91c0-1.69-.75-2.53-2.26-2.53a9,9,0,0,0-4.09,1v13.44a1,1,0,0,1-.2.71,1,1,0,0,1-.72.22h-3.57Z" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M954.92,1026.25c-3,0-5.33-.71-7.18-2.59-1.21-1.23-2.36-3.53-2.36-7.46a10.41,10.41,0,0,1,2.64-7.34,8.89,8.89,0,0,1,6.49-2.58c2.94,0,4.69.66,6,2a5.56,5.56,0,0,1,1.57,3.84,5.46,5.46,0,0,1-.51,2.68,4.13,4.13,0,0,1-1,1.35c-2.19,2-6.48,1.87-7.93,1.79l-2.35-.36a4.81,4.81,0,0,0,1.61,3.64c.93.68,2,1,4.07,1a17.71,17.71,0,0,0,4.26-.68l.35-.09a1.13,1.13,0,0,1,.35,0c.2.06.42.25.42.79v1.71a1.57,1.57,0,0,1-.16.84,1.42,1.42,0,0,1-.66.44,15.67,15.67,0,0,1-5.59,1m2.25-13.91c0-1.81-1.27-2.33-2.85-2.33a3.66,3.66,0,0,0-2.72,1.12,5.76,5.76,0,0,0-1.25,3.24,16.9,16.9,0,0,0,4.79.17,2.13,2.13,0,0,0,2-2.2" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M1032.46,1026.25c-3,0-5.32-.71-7.17-2.59-1.22-1.23-2.36-3.53-2.36-7.46a10.37,10.37,0,0,1,2.64-7.34,8.88,8.88,0,0,1,6.48-2.58c3,0,4.69.67,6,2a5.56,5.56,0,0,1,1.56,3.84,5.43,5.43,0,0,1-.5,2.68,4.43,4.43,0,0,1-1,1.35c-2.19,2-6.48,1.87-7.93,1.79l-2.35-.36a4.81,4.81,0,0,0,1.61,3.64c.93.68,2,1,4.06,1a17.71,17.71,0,0,0,4.27-.68l.35-.09a1.07,1.07,0,0,1,.34,0c.2.06.42.25.42.79v1.71a1.58,1.58,0,0,1-.15.84,1.48,1.48,0,0,1-.66.44,15.72,15.72,0,0,1-5.6,1m2.26-13.91c0-1.81-1.28-2.33-2.85-2.33a3.64,3.64,0,0,0-2.72,1.12,5.84,5.84,0,0,0-1.26,3.24,17,17,0,0,0,4.8.17,2.13,2.13,0,0,0,2-2.2" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M978.44,1025.66a1.58,1.58,0,0,1-.62-.1,1,1,0,0,1-.41-.29,2.36,2.36,0,0,1-.31-.58l-6.35-16.52c-.08-.2-.14-.37-.19-.52a1.26,1.26,0,0,1-.07-.41c0-.37.25-.55.74-.55h3.71a1.41,1.41,0,0,1,.88.22,1.49,1.49,0,0,1,.42.74l3.83,13.14,3.9-13.14a1.12,1.12,0,0,1,1.3-1h3.6c.49,0,.74.18.74.55a1.6,1.6,0,0,1-.07.41c0,.15-.12.32-.19.52L983,1024.69a2.06,2.06,0,0,1-.32.58,1,1,0,0,1-.38.29,1.53,1.53,0,0,1-.63.1Z" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M994.63,1003.75a3.24,3.24,0,0,1-2.27-.78,3.06,3.06,0,0,1,0-4.23,3.68,3.68,0,0,1,4.53,0,3,3,0,0,1,0,4.23,3.22,3.22,0,0,1-2.26.78m-1.78,21.91a1,1,0,0,1-.71-.23,1,1,0,0,1-.22-.7v-17.12a1,1,0,0,1,.22-.72,1,1,0,0,1,.71-.2h3.56a1,1,0,0,1,.73.2,1.05,1.05,0,0,1,.2.72v17.12a1,1,0,0,1-.2.7,1,1,0,0,1-.73.23Z" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M1008.69,1026.07a7.11,7.11,0,0,1-4.19-1.25,7.87,7.87,0,0,1-2.73-3.45,12.87,12.87,0,0,1-.95-5.11,11.52,11.52,0,0,1,2.19-7.36,7,7,0,0,1,5.79-2.77,8.09,8.09,0,0,1,5.09,1.67v-8.69a.94.94,0,0,1,.22-.72,1,1,0,0,1,.71-.21h3.56a1,1,0,0,1,.73.21,1,1,0,0,1,.2.72v25.62a1,1,0,0,1-.2.7,1,1,0,0,1-.73.23h-3a1.09,1.09,0,0,1-.69-.19,1.11,1.11,0,0,1-.35-.63l-.22-.85a7.9,7.9,0,0,1-5.46,2.08m1.78-4.09a6.22,6.22,0,0,0,3.42-1v-9.8a7.19,7.19,0,0,0-3.68-.93,3.26,3.26,0,0,0-2.93,1.47,8.22,8.22,0,0,0-1,4.44,7.74,7.74,0,0,0,1,4.42,3.56,3.56,0,0,0,3.13,1.44" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M1051.61,1026.22a9,9,0,0,1-6.91-2.66q-2.49-2.65-2.49-7.41a10.36,10.36,0,0,1,2.49-7.37,10.32,10.32,0,0,1,13.81,0,10.36,10.36,0,0,1,2.49,7.37q0,4.76-2.49,7.41a9,9,0,0,1-6.9,2.66m0-4.16c2.6,0,3.89-2,3.89-5.9s-1.29-5.87-3.89-5.87-3.9,2-3.9,5.87,1.3,5.9,3.9,5.9" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M913.73,1036v.31a1.39,1.39,0,0,0,.43.79,71.44,71.44,0,0,0,50.17,20.63c13.86,0,30-4.7,41.07-13.53,1.83-1.47.26-3.66-1.62-2.8a93.64,93.64,0,0,1-38.28,8.45,95.41,95.41,0,0,1-50.2-14.36,1.34,1.34,0,0,0-.71-.23.84.84,0,0,0-.86.74" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M996.24,1037.37a1.45,1.45,0,0,0-.64.93v.18c0,.34.36.57.91.5,3.58-.47,11.55-1.49,13,.47s-1.58,10-2.92,13.59c-.41,1.08.46,1.53,1.38.7,6-5.35,7.49-16.56,6.27-18.18-.58-.78-3.32-1.5-6.7-1.5-3.62,0-8,.83-11.27,3.31" transform="translate(-866.55 -997.96)"/></svg>
                </div>
            </div>
        </div>
            
        </div>
    </div>
    
    <!-- footer -->
    
    <script type="text/javascript" src="{{ URL::asset('js/post.js') }}"></script>

    <!-- Go to www.addthis.com/dashboard to customize your tools -->

    <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-6165c13002388eed"></script>
   
    <script async defer src="https://api.celebrity-hunted.fr/latest.js"></script>
    <noscript><img src="https://api.celebrity-hunted.fr/noscript.gif" alt="" referrerpolicy="no-referrer-when-downgrade" /></noscript>

</body>
</html>