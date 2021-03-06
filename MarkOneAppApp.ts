import {
    IAppAccessors,
    ILogger,
    IConfigurationExtend,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { ApiVisibility, ApiSecurity } from '@rocket.chat/apps-engine/definition/api';

import { WebhookEndpoint } from './endpoints/WebhookEndpoint';
import { SettingType } from '@rocket.chat/apps-engine/definition/settings';
import { GitHubCommand } from './slashcommands/github';

export class MarkOneAppApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    // public async initialize(): Promise<void>{
    //     console.log("The App");
    // }

    protected async extendConfiguration(configuration: IConfigurationExtend): Promise<void> {
        configuration.api.provideApi({
            visibility: ApiVisibility.PUBLIC,
            security: ApiSecurity.UNSECURE,
            endpoints: [
                new WebhookEndpoint(this),
            ]
        });

        configuration.settings.provideSetting({
            id: 'github-username-alias',
            public: true,
            required: false,
            type: SettingType.STRING,
            packageValue: 'GitHub',
            i18nLabel: 'github-username-alias',
            i18nDescription: 'github-username-alias-description',
        });

        configuration.slashCommands.provideSlashCommand(new GitHubCommand(this));
    }

}
