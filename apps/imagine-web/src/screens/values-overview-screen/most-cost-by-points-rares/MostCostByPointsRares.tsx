import { Card } from '../../../components/card/Card';
import React, { useEffect, useMemo, useState } from 'react';
import { GridLarge } from '../../../components/grid/Grid.remix';
import { ButtonNoBorder } from '../../../components/button/Button.remix';
import { usefurniturePurchaseLogsOverviewTopCostPoints } from '@imagine-cms/client';
import { FurnitureValueGridContainerLazy } from '../../../components/furniture-value-grid-container/FurnitureValueGridContainer.lazy';
import { FurnitureValueGridContainerMock } from '../../../components/furniture-value-grid-container/FurnitureValueGridContainer.mock';

const FURNITURE_PAGE_SIZE = 4;

export function MostCostByPointsRares() {
  const [page, setPage] = useState(0);
  const fetchMostCostByPoints = usefurniturePurchaseLogsOverviewTopCostPoints();

  const cardHeader = useMemo(() => (
    <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
      <div>Most points</div>
      {page > 0 && <small>Page {page + 1}</small>}
    </div>
  ), [page]);

  const canGoUp = (fetchMostCostByPoints?.data?.length ?? 0) >= FURNITURE_PAGE_SIZE

  const canGoDown = page > 0;

  const goUpOnePage = () => {
    if (!canGoUp) {
      return;
    }
    setPage(_ => _ + 1);
  }

  const goBackOnePage = () => {
    if (!canGoDown) {
      return;
    }
    setPage(_ => _ - 1);
  }

  useEffect(() => {
    fetchMostCostByPoints.fetch({ skip: page * FURNITURE_PAGE_SIZE, limit: FURNITURE_PAGE_SIZE });
  }, [page]);

  return (
    <Card header={cardHeader} style={{ height: '100%' }}>
      <GridLarge>
        {
          fetchMostCostByPoints.loading && (
            <>
              <FurnitureValueGridContainerMock />
              <FurnitureValueGridContainerMock />
              <FurnitureValueGridContainerMock />
              <FurnitureValueGridContainerMock />
            </>
          )
        }
        {
          fetchMostCostByPoints.data?.length === 0 && (
            <p>No results to display</p>
          )
        }
        {
          fetchMostCostByPoints.data?.map(_ => (
            <FurnitureValueGridContainerLazy key={`least_selling_furni_${_.furnitureID}`} furnitureID={_.furnitureID} />
          ))
        }
      </GridLarge>
      <GridLarge>
        {canGoDown ?
          <ButtonNoBorder onClick={goBackOnePage}>
            <i className={fetchMostCostByPoints.loading ? 'fa fa-spinner fa-spin' : 'fa fa-arrow-left'} />
          </ButtonNoBorder>
          : <div />}
        {
          canGoUp && (
            <ButtonNoBorder onClick={goUpOnePage}>
              <i className={fetchMostCostByPoints.loading ? 'fa fa-spinner fa-spin' : 'fa fa-arrow-right'} />
            </ButtonNoBorder>
          )
        }
      </GridLarge>
    </Card>
  )
}