import { WowLookupFetcherConfig, WowLookupFetchRequest, WowLookupFetchResponse } from "@wowlink/wow-interface";
import { GitHubWowLookupFetcher } from "./github_fetcher";

/**
 * Note that some of the tests use https://github.com/wowlink/dev-config
 * as the example configuration to fetch.
 */
describe("GitHub fetcher tests", () => {
    test("Initialize GitHub fetcher", () => {
        const config: WowLookupFetcherConfig = {
            githubUser: "wowlink",
            githubRepository: "default-profile",
        };
        const fetcher: GitHubWowLookupFetcher = new GitHubWowLookupFetcher(config);
        expect(fetcher).toBeDefined();
    });

    test("Fetch repository config", async () => {
        const config: WowLookupFetcherConfig = {
            githubUser: "wowlink",
            githubRepository: "dev-config",
        };
        const fetcher: GitHubWowLookupFetcher = new GitHubWowLookupFetcher(config);
        const request: WowLookupFetchRequest = {};
        const response: WowLookupFetchResponse = await fetcher.fetch(request);
        expect(response.wowMapping).toBeDefined();
        const mapping: Record<string, string> = response.wowMapping;
        expect(mapping["gh"]).toMatch("https://github.com");
    });

    test("Custom configuration filename", async () => {
        const config: WowLookupFetcherConfig = {
            githubUser: "wowlink",
            githubRepository: "dev-config",
            githubConfigFilename: "alternative-config.yaml"
        };
        const fetcher: GitHubWowLookupFetcher = new GitHubWowLookupFetcher(config);
        const request: WowLookupFetchRequest = {};
        const response: WowLookupFetchResponse = await fetcher.fetch(request);
        expect(response.wowMapping).toBeDefined();
        const mapping: Record<string, string> = response.wowMapping;
        expect(mapping["gh/me"]).toMatch("https://github.com/tianhaoz95");
    });
});