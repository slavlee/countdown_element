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

class SysTemplate extends Base
{
    /**
     * Does the main class purpose
     */
    public function invoke(): void
    {
        $this->addStaticFiles();
    }

    /**
     * ExtensionManagementUtility::addStaticFile
     */
    private function addStaticFiles(): void
    {
        ExtensionManagementUtility::addStaticFile(
            $this->extensionKey,
            'Configuration/TypoScript',
            'Countdown Element - Base'
        );
    }
}
