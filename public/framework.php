<?php include("header.php"); ?>
<?php
    if(!isset($_SESSION['logged'])):
        $_SESSION['refer'] = 'framework.php';
        header("location:login.php");     
    endif;
?>
    <body>
        <section style="background: url('img/WEB_GAME ful.jpg');height:100vh;background-position: center;background-size: cover;">
            <div class="f--container">
                <div class="card-shadow-wrapper">
                    <div class="b--card-a" style="background: url('img/card-bg-desktop.png');height:100vh;background-position: center;background-size: contain; background-repeat:no-repeat">
                        <div class="b--card-a__bd">
                            <h3 class="b--card-a__bd__title">lorem ipsum</h3>
                            <p class="b--card-a__bd__content">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio fugiat enim ipsa quos labore pariatur possimus?
                            </p>
                            <button class="b--card-a__bd__btn">
                                BUTTON
                                <svg class="b--card-a__bd__btn__icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="13" height="21" viewBox="0 0 13 21">
                                    <image id="Objet_dynamique_vectoriel" data-name="Objet dynamique vectoriel" width="13" height="21" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAVCAYAAACdbmSKAAAAUklEQVQ4jWMAgf///zP///9/I4hmIAZANVz/DwHXidL4//9/jf///7/+jwBEa9Qd1YgDDIjGiP+oYCOGIor8NqqBSA2k5yeyci6SRuLKCAYGBgBQg6eBKPu2uAAAAABJRU5ErkJggg=="/>
                                </svg>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    <?php include("footer.php") ?>