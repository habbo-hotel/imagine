import { Link } from 'wouter';
import { Grid } from '../grid/Grid';
import { Card } from '../card/Card';
import { Badge } from '../badge/Badge';
import React, { useEffect } from 'react';
import { ButtonPrimary } from '../button/Button.remix';
import { RankListContainerProps } from './RankListContainer.types';
import { RankListContainerHeader } from './RankListContainer.styled';
import { SmallUserProfileContainer } from '../small-user-profile-container/SmallUserProfileContainer';
import { useRankFetchOneWithUsers } from './rank-fetch-one-with-users/rank-fetch-one-with-users.hook';

export function RankListContainer({ rank }: RankListContainerProps) {
  const fetchRankUsers = useRankFetchOneWithUsers();

  useEffect(() => {
    fetchRankUsers.fetch({ id: rank.id, })
  }, [rank.id]);

  return (
    <Card>
      <RankListContainerHeader>
        <Link to={`/ranks/${rank.id}`}>
          <h1 style={{ cursor: 'pointer' }}>{rank.name}</h1>
        </Link>
        <Link to={`/ranks/${rank.id}`}>
          <Badge badge={{ code: rank.badgeCode }} style={{ cursor: 'pointer' }} />
        </Link>
      </RankListContainerHeader>
      {
        fetchRankUsers.loading && (
          <>
            <i className="fa fa-spinner fa-spin" />
            Loading users...
          </>
        )
      }
      {
        fetchRankUsers.data && (
          <Grid>
            {
              fetchRankUsers.data.users.map(_ => (
                <SmallUserProfileContainer key={`rank_${rank.id}_user_${_.id}`} user={_ as any} />
              ))
            }
          </Grid>
        )
      }
      {
        rank.flags?.acceptingApplications && (
          <Link to={`/community/staff/${rank.id}/apply`}>
            <ButtonPrimary>Apply for Role</ButtonPrimary>
          </Link>
        )
      }
    </Card>
  )
}