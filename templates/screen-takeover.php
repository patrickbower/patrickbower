<?php include ('../templates/base.php'); ?>

<?php startblock('content') ?>

<div class="screen-takeover">
    <div class="screen-takeover__background">
        <div class="belt screen-takeover__background-shape">
            <div class="screen-takeover__content">

                <?php emptyblock('screen-takeover-module') ?>

                <a href="#" class="js-screen-takeover__close screen-takeover__close-button screen-takeover__close-button--top">
                    <svg class="icon icon--close icon-colour--white icon--space-sml">
                        <use xlink:href="#icon--close"></use>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</div>

<?php endblock(); ?>
