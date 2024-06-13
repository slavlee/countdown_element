<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'Countdown Element',
    'description' => 'Powerful TYPO3 extension to display countdown timers.',
    'category' => 'plugin',
    'author' => 'Kevin Chileong Lee',
    'author_email' => 'support@slavlee.de',
    'author_company' => 'Slavlee',
    'state' => 'stable',
    'version' => '1.0.2',
    'constraints' => [
        'depends' => [
            'typo3' => '12.4.0-12.4.99',
            'fluid_styled_content' => '12.4.0-12.4.99',
        ],
        'conflicts' => [
        ],
        'suggests' => [
        ],
    ],
];
