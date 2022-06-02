import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const webSocketApi = createApi({
  reducerPath: "webSocketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (build) => ({
    getOrders: build.query<IOrdersData, string>({
      queryFn: () => ({
        data: { success: false, orders: [], total: 0, totalToday: 0 },
      }),
      async onCacheEntryAdded(
        url,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = new WebSocket(url);
        try {
          await cacheDataLoaded;
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            updateCachedData(() => data);
          };

          ws.addEventListener("message", listener);
        } catch {}
        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

export const { useGetOrdersQuery } = webSocketApi;
