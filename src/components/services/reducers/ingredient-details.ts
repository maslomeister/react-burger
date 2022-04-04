import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SliceState {
  showModal: boolean;
  modalImage: string;
  modalName: string;
  modalCalories: number;
  modalProteins: number;
  modalFat: number;
  modalCarbohydrates: number;
}

const initialState: SliceState = {
  showModal: false,
  modalImage: "",
  modalName: "",
  modalCalories: 0,
  modalProteins: 0,
  modalFat: 0,
  modalCarbohydrates: 0,
};

export const ingredientDetails = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    addDataToModal: (
      state,
      action: PayloadAction<{
        modalImage: string;
        modalName: string;
        modalCalories: number;
        modalProteins: number;
        modalFat: number;
        modalCarbohydrates: number;
      }>
    ) => {
      state.showModal = true;
      state.modalImage = action.payload.modalImage;
      state.modalName = action.payload.modalName;
      state.modalCalories = action.payload.modalCalories;
      state.modalProteins = action.payload.modalProteins;
      state.modalFat = action.payload.modalFat;
      state.modalCarbohydrates = action.payload.modalCarbohydrates;
    },
    resetModalData: (state) => {
      state.showModal = false;
      state.modalImage = initialState.modalImage;
      state.modalName = initialState.modalName;
      state.modalCalories = initialState.modalCalories;
      state.modalProteins = initialState.modalProteins;
      state.modalFat = initialState.modalFat;
      state.modalCarbohydrates = initialState.modalCarbohydrates;
    },
  },
});

export const { addDataToModal, resetModalData } = ingredientDetails.actions;

export default ingredientDetails.reducer;
