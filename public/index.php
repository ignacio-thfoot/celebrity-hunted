<?php include("header.php"); ?>
<?php
    if(!isset($_SESSION['logged'])):
        $_SESSION['refer'] = 'index.php';
        header("location:login.php");     
    endif;
?>
<body>
    <div class="img-container" style="width:100%;display: flex;align-items: center;justify-content: center;height: 100%;">
        <img src="img/celebrity-hunted.png">
    </div>

    <?php include("footer.php") ?>