<?php include("header.php"); ?>
<?php
    if(!isset($_SESSION['logged'])):
        $_SESSION['refer'] = 'index.php';
        header("location:login.php");     
    endif;
?>
<body>
<?php $mysqli = new mysqli("aa184gfwvy4fdxi.caaqgviz5gpu.eu-west-3.rds.amazonaws.com", "root", "R!qJeipo4!qb3cCt", "ebdb");

$result = $mysqli->query("Select * from participants;");
echo "<pre>";
var_dump($result->fetch_all(MYSQLI_ASSOC));
echo "</pre>";
?>
    <div class="addthis_inline_share_toolbox"></div>
    <div class="img-container" style="width:100%;display: flex;align-items: center;justify-content: center;height: 100%;">
    
    <img src="img/celebrity-hunted.png">
    </div>

    <?php include("footer.php");

    /*

    POST Users: ID, email, timestamp

    POST Score: ID, teamID, timePassed

    POST AverageTime: ID, teamID, avgTimePassed

    */