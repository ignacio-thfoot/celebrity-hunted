<?php include("header.php"); ?>
<?php 
    if(isset($_POST['text_user'])):
        if($_POST['text_user'] == 'admin' && $_POST['text_pwd'] == 'N@8hqbRy4g5@e5Xj'):
            $_SESSION['logged'] = TRUE;
            header("location:index.php");
        endif;
    endif;
?>
    <section class="b--section-a">
        <div class="f--container">
            <div class="f--col-4 f--offset-4 f--col-tabletl-6 f--offset-tabletl-3 f--col-tabletp-8 f--offset-tabletp-2 f--col-mobile-12 f--offset-mobile-0">
                <form action="" method="post" name="login_form">
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

<?php include("footer.php") ?>