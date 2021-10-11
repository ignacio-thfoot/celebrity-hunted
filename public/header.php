<?php session_start(); ?>
<?php include("local.php"); ?>
<html>
    <head>
        <title>Celebrity Hunted :: Framework</title>
        <?php if(!constant("IS_VIRTUAL_ENV")): ?>
            <link rel="stylesheet" href="css/app_common.css">
        <?php endif; ?>
    </head>