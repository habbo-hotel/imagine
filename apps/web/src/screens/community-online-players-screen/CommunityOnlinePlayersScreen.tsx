import DayJS from 'dayjs';
import gql from 'graphql-tag';
import React, {useEffect} from 'react';
import {UserWire} from '@imagine-cms/types';
import {useRunQuery} from '../../graphql/run-query';

const FETCH_ONLINE_USERS = gql`
  query {
      users {
          id,
          look,
          username,
          lastOnline,
      }
  }
`

export function CommunityOnlinePlayersScreen() {
  const {runQuery, loading, data} = useRunQuery<{users: UserWire[]}>(FETCH_ONLINE_USERS)

  useEffect(() => {
    runQuery();
  }, []);

  return (
    <main className="position-relative container justify-content-center py-4">
      <div className="row">
        <div className="col-lg-8 col-md-6 col-12">
          <h5 className="silver">Online Players</h5>
          {
            data?.users?.map(user => (
              <div className="col-4" key={`online_players_screen_${user.id}`}>
                <div className="card" style={{marginBottom: '0.75rem'}}>
                  <div className="card-body">
                    <div className="row align-items-center position-relative" key={`online_players_screen_${user.id}`}>
                      <div className="col-4">
                        <div>
                          <img
                            src={`https://imager.habboon.pw/?figure=${user.look}&direction=3&head_direction=2&gesture=sml&headonly=1`}
                            alt={user.username} loading="lazy" />
                        </div>
                      </div>
                      <div className="col text-left text-truncate">
                        <span className="d-block">{user.username}</span>
                        <span className="text-muted">{DayJS(user.lastOnline).fromNow()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </main>
  )
}
