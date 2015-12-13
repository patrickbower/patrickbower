<?php include ('../templates/base.php'); ?>

<?php startblock('content') ?>

<div class="content">
    <div class="content-section--header">
        <?php include('../modules/header.php'); ?>
    </div>
    <div class="content-section">
        <div class="content-triangle__shape content-triangle__shape--zero">
            <div class="content__area content__area--zero">
                <?php include('../modules/intro.php'); ?>
            </div>
        </div>
    </div>
    <div class="content-section">
        <div class="content-triangle__shape content-triangle__shape--one">
            <div class="content__area content__area--one">
                <?php include('../modules/development.php'); ?>
            </div>
        </div>
    </div>
    <div class="content-section">
        <div class="content-triangle__shape content-triangle__shape--two">
            <div class="content__area content__area--two">
                <?php include('../modules/design.php'); ?>
            </div>
        </div>
    </div>
    <div class="content-section">
        <div class="content-triangle__shape content-triangle__shape--three">
            <div class="content__area content__area--three">
                <?php include('../modules/contact.php'); ?>
            </div>
        </div>
    </div>
    <div class="content-section">
        <div class="content-triangle__shape content-triangle__shape--four">
            <div class="content__area content__area--four">

            </div>
        </div>
    </div>
</div>

<?php endblock() ?>
