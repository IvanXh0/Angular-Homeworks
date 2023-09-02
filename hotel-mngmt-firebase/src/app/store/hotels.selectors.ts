import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HotelsState } from '../interfaces/hotel-state.interface';

export const selectFeature = createFeatureSelector<HotelsState>('hotels');

export const hotelsSelector = createSelector(
  selectFeature,
  (state: HotelsState) => state.hotels
);
