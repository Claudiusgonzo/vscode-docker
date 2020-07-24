/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { AzureWizardPromptStep, IAzureQuickPickItem } from 'vscode-azureextensionui';
import { ext } from '../../../extensionVariables';
import { localize } from '../../../localize';
import { PlatformOS } from '../../../utils/platform';
import { NetCoreScaffoldingWizardContext } from './NetCoreScaffoldingWizardContext';

export class NetCoreChooseOsStep extends AzureWizardPromptStep<NetCoreScaffoldingWizardContext> {
    public async prompt(wizardContext: NetCoreScaffoldingWizardContext): Promise<void> {
        const opt: vscode.QuickPickOptions = {
            matchOnDescription: true,
            matchOnDetail: true,
            placeHolder: localize('vscode-docker.scaffold.chooseOsStep.selectOS', 'Select Operating System')
        };

        const OSes: PlatformOS[] = ['Windows', 'Linux'];
        const items = OSes.map(p => <IAzureQuickPickItem<PlatformOS>>{ label: p, data: p });

        const response = await ext.ui.showQuickPick(items, opt);
        wizardContext.netCorePlatformOS = response.data;
    }

    public shouldPrompt(wizardContext: NetCoreScaffoldingWizardContext): boolean {
        return !wizardContext.netCorePlatformOS && (wizardContext.scaffoldType === 'all' || wizardContext.scaffoldType === 'debugging');
    }
}