import {
    WowLookupFetcher,
    WowLookupFetcherConfig,
    WowLookupFetchRequest,
    WowLookupFetchResponse,
} from "@wowlink/wow-interface";
import { Octokit } from "@octokit/rest";
import yaml from "js-yaml";

class GitHubWowLookupFetcher implements WowLookupFetcher {
    config_: WowLookupFetcherConfig;

    constructor(config: WowLookupFetcherConfig) {
        this.config_ = config;
    }

    async fetch(req: WowLookupFetchRequest): Promise<WowLookupFetchResponse> {
        if (this.config_.githubUser && this.config_.githubRepository) {
            const octokit = new Octokit();
            const configFilename: string =
                this.config_.githubConfigFilename
                    ? this.config_.githubConfigFilename : "config.yaml";
            const configResponse = await octokit.rest.repos.getContent({
                owner: this.config_.githubUser,
                repo: this.config_.githubRepository,
                path: configFilename,
            });
            const configStr = Buffer.from(
                configResponse.data["content"], "base64").toString();
            const config = yaml.load(configStr);
            const res: WowLookupFetchResponse = {
                wowMapping: {}
            };
            res.wowMapping = config['wowlinks'];
            return res;

        } else {
            throw new Error(`Config is broken: ${JSON.stringify(this.config_)}`);
        }
    }
}

export { GitHubWowLookupFetcher };