<?php require_once 'ti.php' ?>
<!DOCTYPE html>
<html class="no-js">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Patrick Bower</title>
    <meta name="description" content="Web Devolopment &amp; Design Portfolio">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--link rel="apple-touch-icon" href="apple-touch-icon.png"-->

    <script>
        (function() {
            var html = document.documentElement;
            html.className = html.className.replace("no-js", "js");
        })();
    </script>

    <link rel="stylesheet" href="/assets/styles/main.css">

</head>
<!--[if lt IE 7]><body class="lte-ie9 lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]><body class="lte-ie9 lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]><body class="lte-ie9 lt-ie9"> <![endif]-->
<!--[if IE 9]><body class="lte-ie9"> <![endif]-->
<!--[if gt IE 9]><!--> <body> <!--<![endif]-->

<?php include_once("./assets/images/sprite.svg"); ?>

<!--[if lt IE 9]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->

<?php emptyblock('content') ?>

<script src="/assets/scripts/lib/jquery-1.11.2.min.js"></script>
<script src="/assets/scripts/main.min.js"></script>

</body>
</html>
