<?php include("header.php"); ?>
<?php
    if(!isset($_SESSION['logged'])):
        header("location:login.php");     
    endif;
?>
    <body>
        <div class="img-container">
                <img src="img/celebrity-hunted.png">
        </div>

        <?php include("footer.php") ?>