import { useState, useMemo } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { Order } from "../order/order";

interface IProps {
  orders: IOrder[];
  height: number;
}

export function OrdersInfinityScroll({ orders, height }: IProps) {
  const [ordersLeft, setOrdersLeft] = useState(orders.length - 10);
  const [loadNext, setLoadNext] = useState(10);
  const [showMore, setShowMore] = useState(true);

  const getNextItems = () => {
    if (orders) {
      const next = ordersLeft - 10 > 0 ? 10 : ordersLeft;
      if (next === 0) {
        setShowMore(false);
      } else {
        setLoadNext(loadNext + next);
        setOrdersLeft(ordersLeft - next);
      }
    }
  };

  console.log(height);

  const items = useMemo(() => orders.slice(0, loadNext), [loadNext, orders]);

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={() => {
        getNextItems();
      }}
      hasMore={showMore}
      height={height}
      loader={<h4 style={{ textAlign: "center" }}>Загрузка заказов...</h4>}
    >
      {items.map((order, index) => (
        <Order order={order} key={index} />
      ))}
    </InfiniteScroll>
  );
}
