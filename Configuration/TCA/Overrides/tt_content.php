<?php

defined('TYPO3') or die();

call_user_func(function () {
    $obj = new \Slavlee\CountdownElement\Bootstrap\TCA\TtContent();
    $obj->invoke();
});
