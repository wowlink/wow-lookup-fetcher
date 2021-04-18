import {
    WowLookupFetcher,
    WowLookupFetcherConfig,
    BuiltInLookupFetcherType
} from "wow-interface";
import { GitHubWowLookupFetcher } from "./builtin_fetchers/github_fetcher";

const WowLookupFetcherFactory = (
    type: BuiltInLookupFetcherType, config: WowLookupFetcherConfig
): WowLookupFetcher => {
    if (type == BuiltInLookupFetcherType.GitHub) {
        return new GitHubWowLookupFetcher(config);
    } else {
        throw new Error(`Lookup source ${type} not supported.`);
    }
};

export {
    GitHubWowLookupFetcher,
    WowLookupFetcherFactory,
};