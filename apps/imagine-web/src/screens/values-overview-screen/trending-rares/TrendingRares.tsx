import { Card } from '../../../components/card/Card';
import React, { useEffect, useMemo, useState } from 'react';
import { GridLarge } from '../../../components/grid/Grid.remix';
import { ButtonNoBorder } from '../../../components/button/Button.remix';
import { usefurniturePurchaseLogsOverviewTrending } from '@imagine-cms/client';
import { FurnitureValueGridContainerLazy } from '../../../components/furniture-value-grid-container/FurnitureValueGridContainer.lazy';
import { FurnitureValueGridContainerMock } from '../../../components/furniture-value-grid-container/FurnitureValueGridContainer.mock';

const FURNITURE_PAGE_SIZE = 4;

export function TrendingRares() {
  const [page, setPage] = useState(0);
  const fetchTrending = usefurniturePurchaseLogsOverviewTrending();

  const cardHeader = useMemo(() => (
    <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
      <div>Trending</div>
      {page > 0 && <small>Page {page + 1}</small>}
    </div>
  ), [page]);

  const canGoUp = (fetchTrending?.data?.length ?? 0) >= FURNITURE_PAGE_SIZE

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
    fetchTrending.fetch({ skip: page * FURNITURE_PAGE_SIZE, limit: FURNITURE_PAGE_SIZE });
  }, [page]);

  return (
    <Card header={cardHeader} style={{ height: '100%' }}>
      <GridLarge>
        {
          fetchTrending.loading && (
            <>
              <FurnitureValueGridContainerMock />
              <FurnitureValueGridContainerMock />
              <FurnitureValueGridContainerMock />
              <FurnitureValueGridContainerMock />
            </>
          )
        }
        {
          fetchTrending.data?.length === 0 && (
            <p>No results to display</p>
          )
        }
        {
          fetchTrending.data?.map(_ => (
            <FurnitureValueGridContainerLazy key={`least_selling_furni_${_.furnitureID}`} furnitureID={_.furnitureID} />
          ))
        }
      </GridLarge>
      <GridLarge>
        {canGoDown ?
          <ButtonNoBorder onClick={goBackOnePage}>
            <i className={fetchTrending.loading ? 'fa fa-spinner fa-spin' : 'fa fa-arrow-left'} />
          </ButtonNoBorder>
          : <div />}
        {
          canGoUp && (
            <ButtonNoBorder onClick={goUpOnePage}>
              <i className={fetchTrending.loading ? 'fa fa-spinner fa-spin' : 'fa fa-arrow-right'} />
            </ButtonNoBorder>
          )
        }
      </GridLarge>
    </Card>
  )
}