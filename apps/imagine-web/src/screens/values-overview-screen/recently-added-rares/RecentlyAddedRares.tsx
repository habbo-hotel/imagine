import { Card } from '../../../components/card/Card';
import React, { useEffect, useMemo, useState } from 'react';
import { GridLarge } from '../../../components/grid/Grid.remix';
import { ButtonNoBorder } from '../../../components/button/Button.remix';
import { LoadingMessage } from '../../../components/loading-message/LoadingMessage';
import { FurnitureOrderBy, FurnitureValueType, useFurnitureFetchMany } from '@imagine-cms/client';
import { FurnitureValueGridContainer } from '../../../components/furniture-value-grid-container/FurnitureValueGridContainer';

const FURNITURE_PAGE_SIZE = 4;

export function RecentlyAddedRares() {
  const [page, setPage] = useState(0);
  const fetchFurniture = useFurnitureFetchMany();

  const cardHeader = useMemo(() => (
    <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
      <div>Recently added</div>
      {page > 0 && <small>Page {page + 1}</small>}
    </div>
  ), [page]);

  const canGoUp = (fetchFurniture?.data?.length ?? 0) >= FURNITURE_PAGE_SIZE

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

  const onFetchFurniture = async () => {
    fetchFurniture.fetch({ orderBy: [FurnitureOrderBy.RECENTLY_ADDED], skip: page * FURNITURE_PAGE_SIZE, limit: FURNITURE_PAGE_SIZE });
  }

  useEffect(() => {
    onFetchFurniture();
  }, [page]);

  return (
    <Card header={cardHeader} style={{ height: '100%' }}>
      <GridLarge>
        {
          fetchFurniture.loading && (
            <LoadingMessage>
              Loading furniture...
            </LoadingMessage>
          )
        }
        {
          fetchFurniture.data?.length === 0 && (
            <p>No results to display</p>
          )
        }
        {
          fetchFurniture.data?.map(_ => (
            <FurnitureValueGridContainer key={`recently_added_${_.id}`} furniture={_} />
          ))
        }
      </GridLarge>
      <GridLarge>
        {canGoDown ?
          <ButtonNoBorder onClick={goBackOnePage}>
            <i className={fetchFurniture.loading ? 'fa fa-spinner fa-spin' : 'fa fa-arrow-left'} />
          </ButtonNoBorder>
          : <div />}
        {
          canGoUp && (
            <ButtonNoBorder onClick={goUpOnePage}>
              <i className={fetchFurniture.loading ? 'fa fa-spinner fa-spin' : 'fa fa-arrow-right'} />
            </ButtonNoBorder>
          )
        }
      </GridLarge>
    </Card >
  )
}