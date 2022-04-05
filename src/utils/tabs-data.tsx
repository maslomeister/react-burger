interface Tab {
  _id: number;
  name: string;
  value: string;
  type: string;
}
const Tabs: Array<Tab> = [
  {
    _id: 0,
    name: "Булки",
    value: "one",
    type: "bun",
  },
  {
    _id: 1,
    name: "Соусы",
    value: "two",
    type: "sauce",
  },
  {
    _id: 2,
    name: "Начинки",
    value: "three",
    type: "main",
  },
];

export default Tabs;
