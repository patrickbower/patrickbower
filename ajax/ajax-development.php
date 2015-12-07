<!doctype html>
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

    <link rel="stylesheet" href="../assets/styles/main.css">

</head>
<!--[if lt IE 7]><body class="lte-ie9 lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]><body class="lte-ie9 lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]><body class="lte-ie9 lt-ie9"> <![endif]-->
<!--[if IE 9]><body class="lte-ie9"> <![endif]-->
<!--[if gt IE 9]><!--> <body> <!--<![endif]-->

<?php include_once("assets/images/sprite.svg"); ?>

<!-- screen-takeover -->
<div class="screen-takeover">
    <div class="screen-takeover__background">
        <div class="belt">
            <div class="screen-takeover__triangle"></div>
            <div class="screen-takeover__content">

                <?php include('../modules/development-projects.php'); ?>

                <a href="#" class="js-screen-takeover__close button-close">
                    <svg class="icon--close icon-colour--white">
                        <use xlink:href="#icon--close"></use>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</div>

<script src="../assets/scripts/lib/jquery-1.11.2.min.js"></script>
<script src="../assets/scripts/main.min.js"></script>

<!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
<script>
// (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
// function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
// e=o.createElement(i);r=o.getElementsByTagName(i)[0];
// e.src='//www.google-analytics.com/analytics.js';
// r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
// ga('create','UA-XXXXX-X','auto');ga('send','pageview');
</script>
</body>
</html>
