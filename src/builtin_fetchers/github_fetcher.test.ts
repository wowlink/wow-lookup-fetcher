import { WowLookupFetcherConfig, WowLookupFetchRequest, WowLookupFetchResponse } from "wow-interface";
import { GitHubWowLookupFetcher } from "./github_fetcher";

describe("GitHub fetcher tests", () => {
    test("Initialize GitHub fetcher", () => {
        const config: WowLookupFetcherConfig = {
            githubUser: "test_github_user",
            githubRepository: "test_github_repository",
        };
        const fetcher: GitHubWowLookupFetcher = new GitHubWowLookupFetcher(config);
        expect(fetcher).toBeDefined();
    });

    test("Fetch repository config", async () => {
        const config: WowLookupFetcherConfig = {
            githubUser: "wowlink",
            githubRepository: "default-profile",
        };
        const fetcher: GitHubWowLookupFetcher = new GitHubWowLookupFetcher(config);
        const request: WowLookupFetchRequest = {};
        const response: WowLookupFetchResponse = await fetcher.fetch(request);
        expect(response.wowMapping).toBeDefined();
        const mapping: Record<string, string> = response.wowMapping;
        expect(mapping["gh"]).toMatch("https://github.com");
    });
});