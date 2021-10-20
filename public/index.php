<?php include("header.php"); ?>
<?php
    if(!isset($_SESSION['logged'])):
        $_SESSION['refer'] = 'index.php';
        header("location:login.php");     
    endif;
?>
    <div id="pano" style="width:100%;height:100%;position:relative; z-index: 1;">
        <noscript><table style="width:100%;height:100%;"><tr style="vertical-align:middle;"><td><div style="text-align:center;">ERROR:<br/><br/>Javascript not activated<br/><br/></div></td></tr></table></noscript>
        <script>
            embedpano({swf:"img/pano.swf", xml:"celebrity_hunted.xml", target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true});
            function loaded(){
                console.log('Load Complete');
                const event = new Event('loaded');
                document.dispatchEvent(event);
            }
        </script>
        <!-- WELCOME -->
        <div class="b--card-c b--card-c--is-visible" id="modal-home" role="dialog">
            <div class="b--card-c__back-items">
                <img class="b--card-c__back-items__media" src="img/card-bg-desktop.png" alt="">
            </div>
            <div class="b--card-c__front-items">
                <div class="b--card-c__front-items__bd">
                    <h3 class="b--card-c__front-items__bd__title" data-text="welcome_title"></h3>
                    <p class="b--card-c__front-items__bd__content" data-text="welcome_text"></p>
                    <button class="b--card-c__front-items__bd__btn" id="button_start" data-text="button_start" style="background: url('img/b--card-a__bd__btn__bg.png');background-position: center;background-size: contain; background-repeat:no-repeat"></button>
                </div>
                <div class="b--card-c__front-items__ft">
                    <a href="#" class="b--card-c__front-items__ft__btn" data-text="welcome_more"></a>
                </div>
            </div>
        </div>
    </div>

    
        <!-- INSCRIPTION -->
        <div class="b--card-c" id="modal-inscription" role="dialog">
            <div class="b--card-c__back-items">
                <img class="b--card-c__back-items__media" src="img/card-bg-desktop.png" alt="">
            </div>
            <div class="b--card-c__front-items">
                <div class="b--card-c__front-items__bd">
                    <h3 class="b--card-c__front-items__bd__title" data-text="win_title"></h3>
                    <p class="b--card-c__front-items__bd__content" data-text="win_text"></p>
                </div>
                <div class="b--form-group-a text-center">
                    <input class="b--card-c__front-items__bd__input" placeholder="E-MAIL">
                    <svg class="b--card-c__front-items__bd__input__icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="13" height="21" viewBox="0 0 13 21">
                        <image id="Objet_dynamique_vectoriel" data-name="Objet dynamique vectoriel" width="13" height="21" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAVCAYAAACdbmSKAAAAUklEQVQ4jWMAgf///zP///9/I4hmIAZANVz/DwHXidL4//9/jf///7/+jwBEa9Qd1YgDDIjGiP+oYCOGIor8NqqBSA2k5yeyci6SRuLKCAYGBgBQg6eBKPu2uAAAAABJRU5ErkJggg=="/>
                    </svg>
                </div>
                <div class="b--card-c__front-items__ft">
                    <div class="b--form-checkbox-a">
                        <input type="checkbox" class="b--form-checkbox-a__item" id="checkbox2">
                        <span class="b--form-checkbox-a__artwork"></span>
                        <label for="checkbox2">J'accepte <a href="#" class="b--card-c__front-items__ft__link">les conditions du jeu concours</a></label>
                    </div>
                </div>
            </div>
            <a href="#" class="b--card-c__media-wrapper">
                <img class="b--card-c__media-wrapper__icon close-modal" src="img/BOUTON_CROIX.png" data-dismiss>
            </a>
        </div>

        <!-- INSCRIPTION BIS -->
        <div class="b--card-c" id="modal-inscription-2" role="dialog">
            <div class="b--card-c__back-items">
                <img class="b--card-c__back-items__media" src="img/card-bg-desktop.png" alt="">
            </div>
            <div class="b--card-c__front-items">
                <div class="b--card-c__front-items__bd">
                    <h3 class="b--card-c__front-items__bd__title" data-text="win_title"></h3>
                    <p class="b--card-c__front-items__bd__content" data-text="already_signed_text"></p>
                </div>
                <div class="b--card-c__front-items__ft">
                    <a href="#" class="b--card-c__front-items__ft__btn" data-text="welcome_more"></a>
                </div>
            </div>
            <a href="#" class="b--card-c__media-wrapper">
                <img class="b--card-c__media-wrapper__icon close-modal" src="img/BOUTON_CROIX.png" data-dismiss>
            </a>
        </div>

        <!-- POST INSCRIPTION SHARE -->
        <div class="b--card-c" id="modal-share" role="dialog">
            <div class="b--card-c__back-items">
                <img class="b--card-c__back-items__media" src="img/card-bg-desktop.png" alt="">
            </div>
            <div class="b--card-c__front-items">
                <div class="b--card-c__front-items__bd">
                    <h3 class="b--card-c__front-items__bd__title" data-text="thanks_title"></h3>
                    <p class="b--card-c__front-items__bd__content" data-text="thanks_text"></p>
                </div>
                <div class="b--card-c__front-items__ft">
                    <img src="img/FB.png" class="b--card-c__front-items__ft__social">
                    <img src="img/TWITTER.png" class="b--card-c__front-items__ft__social">
                </div>
            </div>
            <a href="#" class="b--card-c__media-wrapper">
                <img class="b--card-c__media-wrapper__icon close-modal" src="img/BOUTON_CROIX.png">
            </a>
        </div>

        <!-- POST INSCRIPTION ERROR SHARE -->
        <div class="b--card-c" id="modal-error" role="dialog">
            <div class="b--card-c__back-items">
                <img class="b--card-c__back-items__media" src="img/card-bg-desktop.png" alt="">
            </div>
            <div class="b--card-c__front-items">
                <div class="b--card-c__front-items__bd">
                    <h3 class="b--card-c__front-items__bd__title" data-text="error_title"></h3>
                    <p class="b--card-c__front-items__bd__content" data-text="error_text"></p>
                </div>
                <div class="b--card-c__front-items__ft">
                    <img src="img/FB.png" class="b--card-c__front-items__ft__icon">
                    <img src="img/TWITTER.png" class="b--card-c__front-items__ft__icon">
                </div>
            </div>
            <a href="#" class="b--card-c__media-wrapper">
                <img class="b--card-c__media-wrapper__icon close-modal" src="img/BOUTON_CROIX.png">
            </a>
        </div>

        <!-- TRAILER -->
        <div class="b--card-c b--video-a" id="modal-trailer" role="dialog">
            <div class="b--video-a__back-items">
                <img class="b--video-a__back-items__media" src="img/card-bg-desktop.png" alt="">
            </div>
            <div class="b--video-a__front-items">
                <iframe width="75%" height="315" src="https://www.youtube.com/embed/TSMApG6aLEk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>        
            <a href="#"  class="b--video-a__media-wrapper">
                <img class="b--video-a__media-wrapper__icon close-modal" src="img/BOUTON_CROIX.png">
            </a>
        </div>

        <!-- HELP -->

        <div class="b--card-c b--card-c--second" id="modal-help" role="dialog">
            <div class="b--card-c__back-items">
                <img class="b--card-c__back-items__media" src="img/card-bg-desktop.png" alt="">
            </div>
            <div class="b--card-c__front-items">
                <div class="b--card-c__front-items__bd">
                    <h3 class="b--card-c__front-items__bd__title" data-text="help_title"></h3>
                    <p class="b--card-c__front-items__bd__contentLong" data-text="help_text"></p>
                </div>
                <div class="b--card-c__front-items__ft">
                    <a href="#" class="b--card-c__front-items__ft__btn" data-text="policy_button_text"></a>
                </div>
            </div>
            <a href="#" class="b--card-c__media-wrapper">
                <img class="b--card-c__media-wrapper__icon close-modal" src="img/BOUTON_CROIX.png" data-dismiss>
            </a>
        </div>

    <!-- PRELOADER -->

    <div class="b--preloader-a b--preloader-a--is-active">
        <div class="b--preloader-a__media-wrapper">
            <video src="img/1_WEB_LOADING_SF.mp4" class="b--preloader-a__media-wrapper__media" autoplay="true" muted loop />
        </div>
        <svg class="b--preloader-a__logo" id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194.45 59.74"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M867.48,1033.31a1,1,0,0,1-.71-.21,1,1,0,0,1-.22-.72v-24.77a.94.94,0,0,1,.22-.72,1,1,0,0,1,.71-.21h2.67a1,1,0,0,1,1,.82l.26,1a8.15,8.15,0,0,1,2.69-1.71,8.57,8.57,0,0,1,3.21-.63,6.92,6.92,0,0,1,5.7,2.63,11.15,11.15,0,0,1,2.1,7.13,13.06,13.06,0,0,1-1,5.39,8.4,8.4,0,0,1-2.82,3.54,7,7,0,0,1-4.09,1.24,8.68,8.68,0,0,1-2.89-.48,6.87,6.87,0,0,1-2.34-1.34v8.13a.77.77,0,0,1-.93.93h-3.56Zm8.13-11.33a3.47,3.47,0,0,0,3.06-1.41,7.86,7.86,0,0,0,1-4.45,8.18,8.18,0,0,0-1-4.5,3.47,3.47,0,0,0-3.08-1.41,7.05,7.05,0,0,0-3.64,1V1021a6.8,6.8,0,0,0,3.64,1" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M889.64,1025.66a1,1,0,0,1-.7-.23.93.93,0,0,1-.23-.7v-17.12a.94.94,0,0,1,.23-.72,1,1,0,0,1,.7-.21h2.67a1,1,0,0,1,1,.82l.49,2a10.66,10.66,0,0,1,2.8-2.33,5.94,5.94,0,0,1,2.8-.68H900a1.09,1.09,0,0,1,.74.2,1,1,0,0,1,.23.73v3.11a1,1,0,0,1-.21.71.93.93,0,0,1-.72.22,6,6,0,0,1-.67,0c-.27,0-.62,0-1,0a11.14,11.14,0,0,0-2.08.24,10,10,0,0,0-2.08.61v12.47a1.06,1.06,0,0,1-.2.71,1,1,0,0,1-.73.22h-3.56Z" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M906,1003.75a3.22,3.22,0,0,1-2.26-.78,3,3,0,0,1,0-4.23,3.68,3.68,0,0,1,4.53,0,3.06,3.06,0,0,1,0,4.23,3.24,3.24,0,0,1-2.27.78m-1.78,21.91a1,1,0,0,1-.7-.23.93.93,0,0,1-.23-.7v-17.12a.94.94,0,0,1,.23-.72,1,1,0,0,1,.7-.2h3.57a1,1,0,0,1,.72.2,1,1,0,0,1,.21.72v17.12a1,1,0,0,1-.21.7,1,1,0,0,1-.72.23Z" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M914.18,1025.66a1,1,0,0,1-.7-.23.93.93,0,0,1-.22-.7v-17.12a1,1,0,0,1,.22-.72,1,1,0,0,1,.7-.21h2.68a1,1,0,0,1,1,.82l.29,1a16.83,16.83,0,0,1,3.55-1.84,10.2,10.2,0,0,1,3.25-.53,5,5,0,0,1,4.71,2.37,15.08,15.08,0,0,1,3.57-1.82,10.83,10.83,0,0,1,3.45-.55,5.43,5.43,0,0,1,4,1.44,5.54,5.54,0,0,1,1.43,4v13.11a1,1,0,0,1-.21.7.93.93,0,0,1-.72.22h-3.57a.79.79,0,0,1-.92-.92v-11.92c0-1.69-.76-2.53-2.27-2.53a9.25,9.25,0,0,0-4,1v13.47a1,1,0,0,1-.21.71,1,1,0,0,1-.72.22H926a.93.93,0,0,1-.7-.22,1,1,0,0,1-.23-.71v-11.91c0-1.69-.75-2.53-2.26-2.53a9,9,0,0,0-4.09,1v13.44a1,1,0,0,1-.2.71,1,1,0,0,1-.72.22h-3.57Z" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M954.92,1026.25c-3,0-5.33-.71-7.18-2.59-1.21-1.23-2.36-3.53-2.36-7.46a10.41,10.41,0,0,1,2.64-7.34,8.89,8.89,0,0,1,6.49-2.58c2.94,0,4.69.66,6,2a5.56,5.56,0,0,1,1.57,3.84,5.46,5.46,0,0,1-.51,2.68,4.13,4.13,0,0,1-1,1.35c-2.19,2-6.48,1.87-7.93,1.79l-2.35-.36a4.81,4.81,0,0,0,1.61,3.64c.93.68,2,1,4.07,1a17.71,17.71,0,0,0,4.26-.68l.35-.09a1.13,1.13,0,0,1,.35,0c.2.06.42.25.42.79v1.71a1.57,1.57,0,0,1-.16.84,1.42,1.42,0,0,1-.66.44,15.67,15.67,0,0,1-5.59,1m2.25-13.91c0-1.81-1.27-2.33-2.85-2.33a3.66,3.66,0,0,0-2.72,1.12,5.76,5.76,0,0,0-1.25,3.24,16.9,16.9,0,0,0,4.79.17,2.13,2.13,0,0,0,2-2.2" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M1032.46,1026.25c-3,0-5.32-.71-7.17-2.59-1.22-1.23-2.36-3.53-2.36-7.46a10.37,10.37,0,0,1,2.64-7.34,8.88,8.88,0,0,1,6.48-2.58c3,0,4.69.67,6,2a5.56,5.56,0,0,1,1.56,3.84,5.43,5.43,0,0,1-.5,2.68,4.43,4.43,0,0,1-1,1.35c-2.19,2-6.48,1.87-7.93,1.79l-2.35-.36a4.81,4.81,0,0,0,1.61,3.64c.93.68,2,1,4.06,1a17.71,17.71,0,0,0,4.27-.68l.35-.09a1.07,1.07,0,0,1,.34,0c.2.06.42.25.42.79v1.71a1.58,1.58,0,0,1-.15.84,1.48,1.48,0,0,1-.66.44,15.72,15.72,0,0,1-5.6,1m2.26-13.91c0-1.81-1.28-2.33-2.85-2.33a3.64,3.64,0,0,0-2.72,1.12,5.84,5.84,0,0,0-1.26,3.24,17,17,0,0,0,4.8.17,2.13,2.13,0,0,0,2-2.2" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M978.44,1025.66a1.58,1.58,0,0,1-.62-.1,1,1,0,0,1-.41-.29,2.36,2.36,0,0,1-.31-.58l-6.35-16.52c-.08-.2-.14-.37-.19-.52a1.26,1.26,0,0,1-.07-.41c0-.37.25-.55.74-.55h3.71a1.41,1.41,0,0,1,.88.22,1.49,1.49,0,0,1,.42.74l3.83,13.14,3.9-13.14a1.12,1.12,0,0,1,1.3-1h3.6c.49,0,.74.18.74.55a1.6,1.6,0,0,1-.07.41c0,.15-.12.32-.19.52L983,1024.69a2.06,2.06,0,0,1-.32.58,1,1,0,0,1-.38.29,1.53,1.53,0,0,1-.63.1Z" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M994.63,1003.75a3.24,3.24,0,0,1-2.27-.78,3.06,3.06,0,0,1,0-4.23,3.68,3.68,0,0,1,4.53,0,3,3,0,0,1,0,4.23,3.22,3.22,0,0,1-2.26.78m-1.78,21.91a1,1,0,0,1-.71-.23,1,1,0,0,1-.22-.7v-17.12a1,1,0,0,1,.22-.72,1,1,0,0,1,.71-.2h3.56a1,1,0,0,1,.73.2,1.05,1.05,0,0,1,.2.72v17.12a1,1,0,0,1-.2.7,1,1,0,0,1-.73.23Z" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M1008.69,1026.07a7.11,7.11,0,0,1-4.19-1.25,7.87,7.87,0,0,1-2.73-3.45,12.87,12.87,0,0,1-.95-5.11,11.52,11.52,0,0,1,2.19-7.36,7,7,0,0,1,5.79-2.77,8.09,8.09,0,0,1,5.09,1.67v-8.69a.94.94,0,0,1,.22-.72,1,1,0,0,1,.71-.21h3.56a1,1,0,0,1,.73.21,1,1,0,0,1,.2.72v25.62a1,1,0,0,1-.2.7,1,1,0,0,1-.73.23h-3a1.09,1.09,0,0,1-.69-.19,1.11,1.11,0,0,1-.35-.63l-.22-.85a7.9,7.9,0,0,1-5.46,2.08m1.78-4.09a6.22,6.22,0,0,0,3.42-1v-9.8a7.19,7.19,0,0,0-3.68-.93,3.26,3.26,0,0,0-2.93,1.47,8.22,8.22,0,0,0-1,4.44,7.74,7.74,0,0,0,1,4.42,3.56,3.56,0,0,0,3.13,1.44" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M1051.61,1026.22a9,9,0,0,1-6.91-2.66q-2.49-2.65-2.49-7.41a10.36,10.36,0,0,1,2.49-7.37,10.32,10.32,0,0,1,13.81,0,10.36,10.36,0,0,1,2.49,7.37q0,4.76-2.49,7.41a9,9,0,0,1-6.9,2.66m0-4.16c2.6,0,3.89-2,3.89-5.9s-1.29-5.87-3.89-5.87-3.9,2-3.9,5.87,1.3,5.9,3.9,5.9" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M913.73,1036v.31a1.39,1.39,0,0,0,.43.79,71.44,71.44,0,0,0,50.17,20.63c13.86,0,30-4.7,41.07-13.53,1.83-1.47.26-3.66-1.62-2.8a93.64,93.64,0,0,1-38.28,8.45,95.41,95.41,0,0,1-50.2-14.36,1.34,1.34,0,0,0-.71-.23.84.84,0,0,0-.86.74" transform="translate(-866.55 -997.96)"/><path class="cls-1" d="M996.24,1037.37a1.45,1.45,0,0,0-.64.93v.18c0,.34.36.57.91.5,3.58-.47,11.55-1.49,13,.47s-1.58,10-2.92,13.59c-.41,1.08.46,1.53,1.38.7,6-5.35,7.49-16.56,6.27-18.18-.58-.78-3.32-1.5-6.7-1.5-3.62,0-8,.83-11.27,3.31" transform="translate(-866.55 -997.96)"/></svg>
    </div>

    

    <!-- ROTATE -->
    <div class="b--rotate-a">
        <div class="b--rotate-a__bd">
            PLEASE ROTATE YOUR DEVICE TO PORTRAIT MODE
        </div>
    </div>

    
        
<?php include("footer.php");


