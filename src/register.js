import { createAPI } from 'cube-ui'
import Vue from 'vue'
import HeaderDetail from './components/head-detail/header-detail'
import ShopCartList from 'components/shop-cart-list/shop-cart-list'

createAPI(Vue, HeaderDetail)
createAPI(Vue,ShopCartList)
