import '@/styles/globals.css'
import React from "react";
import dynamic from "next/dynamic.js";

function App({ Component, pageProps }) {
  const Layout = React.useMemo(() => dynamic(
      () => import('../components/Layout'),
      {
        loading: () => <span/>,
        ssr: false
      }
  ), [])

  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  )
}

export default App