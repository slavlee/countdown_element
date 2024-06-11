<?php

declare(strict_types=1);

/*
 * This file is part of the TYPO3 extension: popup_power.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

namespace Slavlee\CountdownElement\Bootstrap\TCA;

use Slavlee\CountdownElement\Bootstrap\Base;
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

class TtContent extends Base
{
    /**
     * Does the main class purpose
     */
    public function invoke(): void
    {
        $this->addTcaSelectItems();
        $this->addTCAcolumns();
        $this->addCountdownClockCType();
    }

    /**
     * ExtensionManagementUtility::addTcaSelectItems
     */
    private function addTcaSelectItems(): void
    {
        $pluginSignature = \Slavlee\CountdownElement\Utility\ExtensionManagementUtility::createPluginSignature($this->extensionKey, 'countdownclock');

        ExtensionManagementUtility::addTcaSelectItem(
            'tt_content',
            'CType',
            [
                // title
                'label' => 'LLL:EXT:' . $this->extensionKey . '/Resources/Private/Language/locallang.xlf:countdown_clock_label',
                // plugin signature: extkey_identifier
                'value' => $pluginSignature,
                // icon identifier
                'icon' => 'content-countdownclock',
                // group
                'group' => 't3t',
                // description
                'description' => 'LLL:EXT:' . $this->extensionKey . '/Resources/Private/Language/locallang.xlf:countdown_clock_description',
            ],
            'textmedia',
            'after',
        );
        
        // Adds the content element icon to TCA typeicon_classes
        $GLOBALS['TCA']['tt_content']['ctrl']['typeicon_classes'][$pluginSignature] = 'content-countdownclock';        
    }

    /**
     * Add new TCA columns
     */
    private function addTCAcolumns(): void
    {
        ExtensionManagementUtility::addTCAcolumns('tt_content',
            [
                'cc_release_date' => [
                    'exclude' => 0,
                    'label' => 'LLL:EXT:countdown_element/Resources/Private/Language/locallang_db.xlf:tt_content.cc_release_date',
                    'config' => [
                        'type' => 'datetime',
                        'default' => time()
                    ]
                ],
            ],
        );

        ExtensionManagementUtility::addToAllTCAtypes(
            'tt_content',
            'cc_release_date',
            'countdownelement_countdownclock'
        );
    }
    
    /**
     * Register new CType: $this->extensionKey . '_countdownclock'
     */
    private function addCountdownClockCType(): void
    {
        $pluginSignature = \Slavlee\CountdownElement\Utility\ExtensionManagementUtility::createPluginSignature($this->extensionKey, 'countdownclock');

        $GLOBALS['TCA']['tt_content']['types'][$pluginSignature] = [
            'showitem' => '
                    --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
                       --palette--;;general,
                       header; LLL:EXT:countdown_element/Resources/Private/Language/locallang_tca:internal_title,
                       cc_release_date; LLL:EXT:countdown_element/Resources/Private/Language/locallang_db:tt_content.cc_release_date,
                    --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,
                       --palette--;;frames,   
                    --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
                       --palette--;;hidden,
                       --palette--;;access,
                 ',
        ];
    }
}
