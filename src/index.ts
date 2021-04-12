import { WowLookupFetcher, WowLookupFetcherConfig, WowLookupFetchRequest, WowLookupFetchResponse } from "wow-interface";
import { Octokit } from "@octokit/rest";

class GitHubWowLookupFetcher implements WowLookupFetcher {
    config_: WowLookupFetcherConfig;

    constructor(config: WowLookupFetcherConfig) {
        this.config_ = config;
    }

    async fetch(req: WowLookupFetchRequest): Promise<WowLookupFetchResponse> {
        if (this.config_.mappingSource == "github") {
            return await this._fetchGitHub(req);
        } else {
            throw new Error(`Lookup source ${this.config_.mappingSource} not supported.`);
        }
    }

    async _fetchLocalFile(req: WowLookupFetchRequest): Promise<WowLookupFetchResponse> {
        throw new Error("Not implemented");
    }

    async _fetchGitHub(req: WowLookupFetchRequest): Promise<WowLookupFetchResponse> {
        if (this.config_.githubUser && this.config_.githubRepository) {
            const octokit = new Octokit();
            const configResponse = await octokit.rest.repos.getContent({
                owner: this.config_.githubUser,
                repo: this.config_.githubRepository,
                path: "config.yaml",
            });
            const configStr = Buffer.from(configResponse.data["content"], "base64").toString();
        } else {
            throw new Error(`Config is broken: ${JSON.stringify(this.config_)}`);
        }
        const res: WowLookupFetchResponse = {
            wowMapping: {}
        };
        return res;
    }
}

export { GitHubWowLookupFetcher };