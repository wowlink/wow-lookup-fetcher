import { WowLookupFetcher, WowLookupFetchRequest, WowLookupFetchResponse } from "wow-interface";

class GitHubWowLookupFetcher implements WowLookupFetcher {
    fetch(req: WowLookupFetchRequest): WowLookupFetchResponse {
        throw new Error("Method not implemented.");
    }
}