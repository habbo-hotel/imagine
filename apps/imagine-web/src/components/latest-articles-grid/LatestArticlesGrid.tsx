import { Grid } from '../grid/Grid';
import React, { useEffect } from 'react';
import { useArticleFetchMany } from '@imagine-cms/client';
import { LatestArticlesGridProps } from './LatestArticlesGrid.types';
import { LatestArticleContainer } from '../latest-article-grid-container/LatestArticleGridContainer';

export function LatestArticlesGrid({ showHeader = true }: LatestArticlesGridProps) {
  const fetchArticles = useArticleFetchMany();

  useEffect(() => {
    fetchArticles.fetch({ limit: 6 });
  }, []);

  return (
    <>
      {showHeader && <h1>News Articles</h1>}
      <Grid>
        {
          fetchArticles.data?.map(_ => (
            <LatestArticleContainer article={_} key={`latest_article_${_.id}`} />
          ))
        }
      </Grid>
    </>
  )
}
