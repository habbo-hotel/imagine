import React from 'react';
import { MyRares } from './my-rares/MyRares';
import { GridLarge } from '../../components/grid/Grid.remix';
import { TrendingRares } from './trending-rares/TrendingRares';
import { MyPinnedRares } from './my-pinned-rares/MyPinnedRares';
import { TopSellingRares } from './top-selling-rares/TopSellingRares';
import { LeastSellingRares } from './least-selling-rares/LeastSellingRares';
import { RecentlyAddedRares } from './recently-added-rares/RecentlyAddedRares';
import { MostCostByPointsRares } from './most-cost-by-points-rares/MostCostByPointsRares';
import { MostCostByCreditsRares } from './most-cost-by-credits-rares/MostCostByCreditsRares';

export function ValuesOverviewScreen() {
  return (
    <>
      <h1>Rare Values</h1>
      <br />
      <GridLarge>
        <TrendingRares />
        <MyPinnedRares />
      </GridLarge>
      <br />
      <GridLarge>
        <LeastSellingRares />
        <MyRares />
      </GridLarge>
      <br />
      <GridLarge>
        <TopSellingRares />
        <RecentlyAddedRares />
      </GridLarge>
      <br />
      <GridLarge>
        <MostCostByCreditsRares />
        <MostCostByPointsRares />
      </GridLarge>
    </>
  )
}