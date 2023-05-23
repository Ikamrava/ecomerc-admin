import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import ProductForm from '../../components/ProductForm'




function New() {

    return (
      <ProductForm/>
      )
    }

export default New