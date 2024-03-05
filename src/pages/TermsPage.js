import React from 'react'
import Layout from '../components/Layout'
import BottomNavbar from '../components/BottomNavbar'
import Card from '../components/Card'
import PrimaryTitle from '../components/PrimaryTitle'
import List from '../components/List'

const TermsPage = () => {
  return (
  <Layout>
    <Card>
        <PrimaryTitle title="Terms & Conditions" />
        <List listItems={["You will be given a selection of envelopes!","You have three opportunities to open the different envelopes.","Some envelopes contain prizes, while others do not."]} />
    </Card>
    <BottomNavbar />
  </Layout>
  )
}

export default TermsPage