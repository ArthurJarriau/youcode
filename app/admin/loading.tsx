
import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from '@/components/layout/layout'
import { Loader } from '@/components/ui/loader'
import React from 'react'

export default function Loading() {
  return (
    <Layout>
        <LayoutHeader>
          <LayoutTitle>Loading ...</LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
            <Loader size={32}/>
        </LayoutContent>
    </Layout>
  )
}
