import { useLazyQuery } from "@apollo/client";
import { RankFilterOneInput } from "../input/rank.input";
import { RankFragment } from "../fragments/rank.fragment";
import { RANK_FETCH_ONE_QUERY, RankFetchOneResponse, RankFetchOneVariables } from "../queries/rank-fetch-one.query";

export interface UseRankFetchOneResponse {
  fetch(filter: RankFilterOneInput): Promise<RankFragment>;
  error?: Error;
  loading: boolean;
  data?: RankFragment;
}

export function useRankFetchOne(): UseRankFetchOneResponse {
  const [getRank, { loading, error, data }] = useLazyQuery<RankFetchOneResponse, RankFetchOneVariables>(RANK_FETCH_ONE_QUERY);

  const onFetchRank = async (filter: RankFilterOneInput): Promise<RankFragment> => {
    const matchingRank = await getRank({ variables: { filter } })
    return matchingRank.data!.rank;
  }

  return {
    fetch: onFetchRank,
    error,
    loading,
    data: data?.rank,
  }
}