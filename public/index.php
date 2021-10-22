<?php include("header.php"); ?>
<?php
    if(!isset($_SESSION['logged'])):
        $_SESSION['refer'] = 'framework.php';
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
            function header_pos(header_x,header_y,header_width,header_height){
                window.header_x = header_x;
                window.header_y = header_y;
                window.header_width = header_width;
                window.header_height = header_height;
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
            <!-- <div class="b--card-c__back-items">
                <img class="b--card-c__back-items__media" src="img/card-bg-desktop.png" alt="">
            </div> -->
            <div class="b--card-c__front-items">
                <div class="b--card-c__front-items__hd">
                    <svg class="b--card-c__front-items__hd__media" id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 59.13"><defs><style>.cls-1{fill:#fff;}</style></defs><polygon class="cls-1" points="283.62 17.27 283.56 17.27 270.39 0.67 265.06 0.67 265.06 22.79 269.52 22.79 269.52 6.18 269.58 6.18 282.85 22.79 288.08 22.79 288.08 0.67 283.62 0.67 283.62 17.27"/><polygon class="cls-1" points="290.66 4.13 298.3 4.13 298.3 22.79 302.94 22.79 302.94 4.13 310.58 4.13 310.58 0.67 290.66 0.67 290.66 4.13"/><polygon class="cls-1" points="34.88 19.32 34.88 13.18 48.85 13.18 48.85 9.71 34.88 9.71 34.88 6.88 35.9 6.88 35.9 4.13 49.44 4.13 49.44 0.67 30.23 0.67 30.23 4.34 31.25 4.34 31.25 6.88 30.23 6.88 30.23 22.79 49.69 22.79 49.69 19.32 34.88 19.32"/><polygon class="cls-1" points="57.84 19.13 57.84 6.88 58.86 6.88 58.86 5.1 58.86 5.09 58.86 4.34 57.84 4.34 57.84 0.67 53.2 0.67 53.2 4.34 54.21 4.34 54.21 6.88 53.2 6.88 53.2 22.79 71.29 22.79 71.29 19.13 57.84 19.13"/><polygon class="cls-1" points="78.51 19.32 78.51 13.18 92.49 13.18 92.49 9.71 78.51 9.71 78.51 6.88 79.53 6.88 79.53 4.13 93.08 4.13 93.08 0.67 73.86 0.67 73.86 4.34 74.88 4.34 74.88 6.88 73.86 6.88 73.86 22.79 93.32 22.79 93.32 19.32 78.51 19.32"/><rect class="cls-1" x="96.83" y="0.67" width="0.54" height="22.12"/><path class="cls-1" d="M894.8,164.52a4.51,4.51,0,0,0,3-4.62c0-2.82-1.31-5.52-6.36-5.52H880.07v-.66h-2v22.09h1.44v.7H891.3c6,0,7.53-4,7.53-6.51A5.23,5.23,0,0,0,894.8,164.52Zm-13.32-6.67h7.87c2.69,0,3.81.87,3.81,2.7,0,2.51-1.71,2.82-3,2.82h-8.67ZM889.81,173h-8.33v-6.39h9c2.08,0,3.5,1.09,3.5,3.13C894,172.63,891.89,173,889.81,173Z" transform="translate(-780 -153.72)"/><path class="cls-1" d="M923.68,171.77a16.34,16.34,0,0,0-.1-1.91h-1a8,8,0,0,0-.28-1.38h.95a3.55,3.55,0,0,0-2.84-2.69v-.07a5.21,5.21,0,0,0,3.66-5.33c0-3.44-1.83-6-7.47-6h-14v14.1h-.95v1.38h.95v6.65h4.65v-6.65h-1v-1.38h1v-.71h7.9a3.86,3.86,0,0,1,2.52.71h-1a3,3,0,0,1,.94,1.38h1a10.43,10.43,0,0,1,.38,3.3,7.5,7.5,0,0,0,.56,3.35h5C923.71,175.3,923.68,172.82,923.68,171.77Zm-8.36-7.47h-8v-6.45h8c2.44,0,4,.9,4,3.19C919.28,163.52,917.89,164.3,915.32,164.3Z" transform="translate(-780 -153.72)"/><polygon class="cls-1" points="152.55 14.76 152.55 0.67 147.9 0.67 147.9 14.76 146.57 14.76 146.57 16.15 147.9 16.15 147.9 22.79 152.55 22.79 152.55 16.15 151.59 16.15 151.59 14.76 152.55 14.76"/><polygon class="cls-1" points="175.05 0.67 155.12 0.67 155.12 4.13 162.76 4.13 162.76 14.88 161.98 14.88 161.98 16.27 162.76 16.27 162.76 22.79 167.41 22.79 167.41 16.91 166.45 16.91 166.45 14.88 167.41 14.88 167.41 4.13 175.05 4.13 175.05 0.67"/><polygon class="cls-1" points="190.56 14.36 200.22 0.67 194.56 0.67 188.23 10.52 181.91 0.67 176.46 0.67 176.24 0.67 176.46 0.97 185.91 14.36 185.91 15.57 186.28 15.57 186.28 19.06 185.91 19.06 185.91 22.79 190.56 22.79 190.56 19.06 190.93 19.06 190.93 15.57 190.56 15.57 190.56 14.36"/><polygon class="cls-1" points="231.83 0.67 231.83 9.28 229.6 9.28 229.6 10.26 228.3 10.26 228.3 9.28 216.61 9.29 216.61 8.68 218.1 8.68 218.1 0.67 213.46 0.67 213.46 8.68 212.05 8.68 212.05 10.34 213.46 10.34 213.46 22.79 218.1 22.79 218.1 12.75 231.83 12.75 231.83 22.79 236.48 22.79 236.48 0.67 231.83 0.67"/><path class="cls-1" d="M1037,154.38v12.49c0,3.07-.12,6.79-6.2,6.79s-6.16-3.72-6.16-6.79v-8.75h-1.22v-.81h-4.59v1.18h1.16V167c0,3.66.12,10.14,10.81,10.14s10.85-6.48,10.85-10.14V154.38Z" transform="translate(-780 -153.72)"/><rect class="cls-1" x="239.94" y="0.67" width="4.65" height="2.25"/><polygon class="cls-1" points="332.59 19.32 317.78 19.32 317.78 13.18 331.76 13.18 331.76 9.71 317.78 9.71 317.78 4.13 332.35 4.13 332.35 0.67 313.13 0.67 313.13 22.79 318.53 22.79 318.53 21.9 325.7 21.9 325.7 22.67 321.07 22.68 321.07 23.38 328.17 23.38 328.18 22.79 332.59 22.79 332.59 19.32"/><path class="cls-1" d="M1138.37,169.44a15.11,15.11,0,0,0,.47-3.78,14.67,14.67,0,0,0-1.27-6.62h1.8c-1.43-2.84-4.29-4.66-9.54-4.66h-11.91v4.69h-1.82v17.44h13c4.38,0,6.94-2.06,8.32-4.72h1.63a11.21,11.21,0,0,0,.91-2.35Zm-6.52,2.35a7.38,7.38,0,0,1-4.57,1.25h-6.53V159h1.72v-1.19h6.37a7.84,7.84,0,0,1,4.65,1.19h-1.8c1.42,1,2.5,2.93,2.5,6.44a10.86,10.86,0,0,1-.63,4h1.64a5.29,5.29,0,0,1-1.72,2.35Z" transform="translate(-780 -153.72)"/><path class="cls-1" d="M802.12,162.56h5a9.25,9.25,0,0,0-.42-2h1a8.44,8.44,0,0,0-1.32-2.54h-1c-1.91-2.55-5.33-4.3-10.34-4.3s-8.15,1.71-10.11,4.3h1a10.44,10.44,0,0,0-1.39,2.54h-1a13.36,13.36,0,0,0-.86,4.84,14,14,0,0,0,.52,3.8H780a12.22,12.22,0,0,0,.67,1.81h3.22c1.69,3.56,5.19,6.08,10.61,6.08,9.11,0,12-4.68,12.64-9.08h-5c-.37,2.32-2,5.61-6.81,5.61a7.64,7.64,0,0,1-6-2.61h-3.22a7.39,7.39,0,0,1-1.11-1.81h3.22a8.54,8.54,0,0,1-.67-3.39,10.34,10.34,0,0,1,1.23-5.25h1a6.48,6.48,0,0,1,2.63-2.54h-1a7.77,7.77,0,0,1,3.61-.83,8.75,8.75,0,0,1,3.89.83h1a5.73,5.73,0,0,1,2.63,2.54h-1A6.16,6.16,0,0,1,802.12,162.56Z" transform="translate(-780 -153.72)"/><path class="cls-1" d="M781.43,185.74v27.11h357.14V185.74ZM783.25,211V187.57h353.5V211Z" transform="translate(-780 -153.72)"/><path class="cls-1" d="M806.26,197.94h-2.34a2.57,2.57,0,0,0-1-1.82,3.69,3.69,0,0,0-2.26-.66,3.23,3.23,0,0,0-2.48,1,4.27,4.27,0,0,0-1,3,3.46,3.46,0,0,0,3.61,3.64,3.11,3.11,0,0,0,2.37-.9,3,3,0,0,0,.8-1.71h2.34q-.62,4.22-5.88,4.22a5.31,5.31,0,0,1-4.14-1.63,5.44,5.44,0,0,1-1.35-3.8,5.38,5.38,0,0,1,1.35-3.81,5.77,5.77,0,0,1,4.4-1.63,6.34,6.34,0,0,1,4.05,1.21A4.14,4.14,0,0,1,806.26,197.94Z" transform="translate(-780 -153.72)"/><path class="cls-1" d="M818.65,204.42V194.13h2.16v4h6.39v-4h2.16v10.29H827.2v-4.67h-6.39v4.67Z" transform="translate(-780 -153.72)"/><path class="cls-1" d="M841,204.42l4.58-10.29h2.56l4.59,10.29h-2.41l-1.08-2.55h-4.84l-1.07,2.55Zm4-4.16h3.54l-1.76-4.34Z" transform="translate(-780 -153.72)"/><path class="cls-1" d="M863.71,197a2.71,2.71,0,0,1,1.33-2.45,6.05,6.05,0,0,1,3.21-.74q4.72,0,5,3.28H871a1.55,1.55,0,0,0-.65-1.13,3.16,3.16,0,0,0-1.95-.53c-1.59,0-2.39.47-2.39,1.41,0,.63.67,1.06,2,1.27,2.21.34,3.44.56,3.69.65a2.58,2.58,0,0,1,2,2.58A2.82,2.82,0,0,1,872,204a7.15,7.15,0,0,1-3.3.68q-5.18,0-5.22-3.62h2.33c.06,1.34,1.05,2,3,2a3.86,3.86,0,0,0,1.76-.34,1.24,1.24,0,0,0,.77-1.18c0-.68-.65-1.14-2-1.37q-3.52-.65-3.66-.69A2.54,2.54,0,0,1,863.71,197Z" transform="translate(-780 -153.72)"/><path class="cls-1" d="M885.06,197a2.7,2.7,0,0,1,1.32-2.45,6.07,6.07,0,0,1,3.22-.74c3.15,0,4.82,1.09,5,3.28h-2.34a1.52,1.52,0,0,0-.65-1.13,3.15,3.15,0,0,0-1.94-.53q-2.4,0-2.4,1.41c0,.63.67,1.06,2,1.27,2.21.34,3.44.56,3.69.65a2.58,2.58,0,0,1,2,2.58,2.82,2.82,0,0,1-1.64,2.66,7.15,7.15,0,0,1-3.3.68q-5.17,0-5.22-3.62h2.34c.05,1.34,1,2,3,2a3.83,3.83,0,0,0,1.76-.34,1.25,1.25,0,0,0,.78-1.18c0-.68-.66-1.14-2-1.37q-3.54-.65-3.66-.69A2.52,2.52,0,0,1,885.06,197Z" transform="translate(-780 -153.72)"/><path class="cls-1" d="M907,204.42V194.13h8.93v1.62h-6.77v2.59h6.5V200h-6.5v2.86H916v1.61Z" transform="translate(-780 -153.72)"/><path class="cls-1" d="M942.84,204.42l4.59-10.29H950l4.58,10.29h-2.4l-1.08-2.55h-4.84l-1.07,2.55Zm5.81-13,1.28,2h-1.71l-2-2Zm-1.76,8.82h3.55l-1.76-4.34Z" transform="translate(-780 -153.72)"/><path class="cls-1" d="M981.9,204.42V194.13h2.16v8.59h6.25v1.7Z" transform="translate(-780 -153.72)"/><path class="cls-1" d="M1001.21,196.18v-2.05h2.25v1.56c0,1.73-.75,2.69-2.25,2.89v-.85a1.41,1.41,0,0,0,.83-.56,2,2,0,0,0,.23-1Z" transform="translate(-780 -153.72)"/><path class="cls-1" d="M1016.58,204.42V194.13h2.17v4h6.38v-4h2.16v10.29h-2.16v-4.67h-6.38v4.67Z" transform="translate(-780 -153.72)"/><path class="cls-1" d="M1045.54,204.71a6.2,6.2,0,0,1-4.66-1.63,5.87,5.87,0,0,1,0-7.61,7.46,7.46,0,0,1,9.31,0,5.87,5.87,0,0,1,0,7.61A6.2,6.2,0,0,1,1045.54,204.71Zm0-1.61a3.73,3.73,0,0,0,2.81-1.07,3.79,3.79,0,0,0,1-2.75,3.84,3.84,0,0,0-1-2.78,4.28,4.28,0,0,0-5.59,0,3.84,3.84,0,0,0-1,2.78,3.75,3.75,0,0,0,1,2.75A3.7,3.7,0,0,0,1045.54,203.1Z" transform="translate(-780 -153.72)"/><path class="cls-1" d="M1063.78,204.42V194.13h3.11l3.6,8,3.58-8h3.08v10.29h-2l.09-8.5h0l-3.81,8.5h-1.84l-3.78-8.5h0l.09,8.5Z" transform="translate(-780 -153.72)"/><path class="cls-1" d="M1089.92,204.42V194.13H1093l3.61,8,3.57-8h3.08v10.29h-2l.09-8.5h0l-3.81,8.5h-1.84l-3.78-8.5h0l.08,8.5Z" transform="translate(-780 -153.72)"/><path class="cls-1" d="M1116.06,204.42V194.13H1125v1.62h-6.78v2.59h6.5V200h-6.5v2.86h6.89v1.61Z" transform="translate(-780 -153.72)"/></svg>
                </div>
                <div class="b--card-c__front-items__bd">
                    <h3 class="b--card-c__front-items__bd__title" data-text="welcome_title"></h3>
                    <p class="b--card-c__front-items__bd__content" data-text="welcome_text"></p>
                    <div class="b--card-c__front-items__bd__btn__disclaimer" data-text="button_start_disclaimer"></div>
                    <button class="b--card-c__front-items__bd__btn" id="button_start" data-text="button_start" style="background: url('img/b--card-a__bd__btn__bg.png');background-position: center;background-size: contain; background-repeat:no-repeat"></button>
                </div>
                <div class="b--card-c__front-items__ft">
                    <a href="#" class="b--card-c__front-items__ft__btn" data-text="welcome_more"></a>
                </div>
            </div>
        </div>
            </div>
        </div>
        
    </div>

    
        <!-- INSCRIPTION -->
        <div class="b--card-c" id="modal-inscription" role="dialog">
            <!-- <div class="b--card-c__back-items">
                <img class="b--card-c__back-items__media" src="img/card-bg-desktop.png" alt="">
            </div> -->
            <div class="b--card-c__front-items">
                <div class="b--card-c__front-items__bd">
                    <h3 class="b--card-c__front-items__bd__title" data-text="win_title"></h3>
                    <p class="b--card-c__front-items__bd__content" data-text="win_text"></p>
                </div>
                <div class="b--form-group-a text-center">
                    <div class="b--form-group-a">
                        <div class="b--form-input-icon-a">
                            <input type="text" class="b--card-c__front-items__bd__input" id="default-input-icon-error"  placeholder="E-MAIL">
                            <svg class="b--form-input-icon-a__artwork b--card-c__front-items__bd__input__icon" viewBox="0 0 20 20">
                                <image id="Objet_dynamique_vectoriel" data-name="Objet dynamique vectoriel" width="13" height="21" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAVCAYAAACdbmSKAAAAUklEQVQ4jWMAgf///zP///9/I4hmIAZANVz/DwHXidL4//9/jf///7/+jwBEa9Qd1YgDDIjGiP+oYCOGIor8NqqBSA2k5yeyci6SRuLKCAYGBgBQg6eBKPu2uAAAAABJRU5ErkJggg=="/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="b--card-c__front-items__ft">
                    <div class="b--form-checkbox-a">
                        <input type="checkbox" class="b--card-c__front-items__ft__checkbox" id="inscription-checkbox">
                        <label class="b--card-c__front-items__ft__label" for="checkbox2">J'accepte <a href="#" class="b--card-c__front-items__ft__link">les conditions du jeu concours</a></label>
                    </div>
                </div>
            </div>
            <a href="#" class="b--card-c__media-wrapper">
                <img class="b--card-c__media-wrapper__icon close-modal" src="img/BOUTON_CROIX.png" data-dismiss>
            </a>
        </div>

        <!-- INSCRIPTION BIS -->
        <div class="b--card-c" id="modal-inscription-2" role="dialog">
            <!-- <div class="b--card-c__back-items">
                <img class="b--card-c__back-items__media" src="img/card-bg-desktop.png" alt="">
            </div> -->
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
            <!-- <div class="b--card-c__back-items">
                <img class="b--card-c__back-items__media" src="img/card-bg-desktop.png" alt="">
            </div> -->
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
            <!-- <div class="b--card-c__back-items">
                <img class="b--card-c__back-items__media" src="img/card-bg-desktop.png" alt="">
            </div> -->
            <div class="b--card-c__front-items">
                <div class="b--card-c__front-items__bd">
                    <h3 class="b--card-c__front-items__bd__title" data-text="error_title"></h3>
                    <p class="b--card-c__front-items__bd__content" data-text="error_text"></p>
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

        <!-- TRAILER -->
        <div class="b--card-c b--video-a" id="modal-trailer" role="dialog">
            <!-- <div class="b--card-c__back-items">
                <img class="b--card-c__back-items__media b--video-a__back-items__media" src="img/card-bg-desktop.png" alt="">
            </div> -->
            <div class="b--card-c__front-items b--video-a__front-items">
                <div class="b--card-c__front-items__bd">
                    <h3 class="b--card-c__front-items__bd__title b--video-a__title" data-text="trailer_title"></h3>
                    <div class="b--card-c__front-items__bd__content">
                        <div class="b--video-a__video">
                            <iframe src="https://www.youtube.com/embed/TSMApG6aLEk?enablejsapi=1&version=3&playerapiid=ytplayer" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
            
            <a href="#"  class="b--card-c__media-wrapper">
                <img class="b--card-c__media-wrapper__icon close-modal" src="img/BOUTON_CROIX.png">
            </a>
        </div>

        <!-- HELP -->

        <div class="b--card-c b--card-c--second" id="modal-help" role="dialog">
            <!-- <div class="b--card-c__back-items">
                <img class="b--card-c__back-items__media" src="img/card-bg-desktop.png" alt="">
            </div> -->
            <div class="b--card-c__front-items">
                <div class="b--card-c__front-items__bd">
                    <h3 class="b--card-c__front-items__bd__title" data-text="help_title"></h3>
                    <p class="b--card-c__front-items__bd__contentLong" data-text="help_text"></p>
                </div>
                <div class="b--card-c__front-items__ft">
                    <a href="data/apv-celebrity-hunted-cgu-reglement.pdf" target="_blank" class="b--card-c__front-items__ft__btn" data-text="policy_button_text"></a>
                    <a href="data/apv-celebrity-hunted-cgu-reglement.pdf" target="_blank" class="b--card-c__front-items__ft__btnShort" data-text="policy_button_text_mobile"></a>
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


