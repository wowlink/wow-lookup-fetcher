import { WowLookupFetcher, WowLookupFetcherConfig, WowLookupFetchRequest, WowLookupFetchResponse } from "wow-interface";

class GitHubWowLookupFetcher implements WowLookupFetcher {
    config_: WowLookupFetcherConfig;

    constructor(config: WowLookupFetcherConfig) {
        this.config_ = config;
    }

    fetch(req: WowLookupFetchRequest): WowLookupFetchResponse {
        throw new Error("Method not implemented.");
    }
}