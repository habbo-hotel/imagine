import React, { useContext } from 'react';
import { Router } from '../../screens/Router';
import { themeContext } from '@imagine-cms/web';
import { ToastContainer } from 'react-toastify';
import { GameClient } from '../game-client/GameClient';
import { SiteHeader } from '../site-header/SiteHeader';
import { SiteFooter } from '../site-footer/SiteFooter';
import { SiteBody } from '../site-body/SiteBody.styled';
import { OnlineUserCount } from '../online-user-count/OnlineUserCount';
import { PageContainerElement, SiteContainerElement } from './SiteContainer.styled';
import { ChangeLanguageButton } from '../change-language-button/ChangeLanguageButton';

export function SiteContainer() {
  const { showClient } = useContext(themeContext);

  return (
    <>
      <SiteBody />
      <SiteContainerElement>
        <GameClient />
        <ToastContainer />
        {
          !showClient && (
            <>
              <PageContainerElement>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', marginBottom: 16 }}>
                  <OnlineUserCount />
                  <ChangeLanguageButton />
                </div>
                <SiteHeader />
                <Router />
              </PageContainerElement>
              <SiteFooter />
            </>
          )
        }
      </SiteContainerElement>
    </>
  )
}