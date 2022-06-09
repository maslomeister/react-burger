import reducer, {
  initialState,
  ISliceState,
  addDataToModal,
  resetModalData,
} from "./ingredient-details";

const data: ISliceState = {
  modalImage: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  modalName: "Флюоресцентная булка R2-D3",
  modalCalories: 643,
  modalProteins: 988,
  modalFat: 26,
  modalCarbohydrates: 85,
};

describe("Redux ingredient info modal store", () => {
  test("Should add data to modal", () => {
    expect(reducer(initialState, addDataToModal(data))).toEqual({
      ...data,
      showModal: true,
    });
  });

  test("Should reset modal data", () => {
    expect(reducer({ ...data, showModal: true }, resetModalData())).toEqual(
      initialState
    );
  });
});
