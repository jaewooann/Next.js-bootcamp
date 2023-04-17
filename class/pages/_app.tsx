import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import { globalStyles } from '../src/commons/styles/globalStyles';
import ApolloSetting from '../src/components/commons/apollo';
import Layout from '../src/components/commons/layout';
import { RecoilRoot } from 'recoil';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ApolloSetting>
        <>
          <Global styles={globalStyles} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </>
      </ApolloSetting>
    </RecoilRoot>
  );
}

export default MyApp