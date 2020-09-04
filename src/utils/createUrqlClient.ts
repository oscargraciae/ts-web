import { Cache, cacheExchange, QueryInput } from '@urql/exchange-graphcache';
import { dedupExchange, fetchExchange } from "urql";
import { LoginMutation, MeDocument, MeQuery, RegisterMutation } from "../generated/graphql";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, data => fn(result, data as any) as any)
}

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        logout: (_result, _args, cache, _info) => {
          betterUpdateQuery<LoginMutation, MeQuery>(cache, { query: MeDocument }, _result, () => ({ me: null }))
        },
        login: (_result, _args, cache, _info) => {
          betterUpdateQuery<LoginMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
            if (result.login.errors) {
              return query
            } else {
              return {
                me: result.login.user,
              }
            }
          })
        },
        register: (_result, _args, cache, _info) => {
          betterUpdateQuery<RegisterMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, _query) => {
            return {
              me: result.register.user,
            }
          })
        }
      }
    }
  }), ssrExchange, fetchExchange],
});
