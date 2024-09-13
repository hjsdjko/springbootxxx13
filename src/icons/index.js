// import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component
import { createApp } from 'vue'
import App from '../App.vue'
// register globally
createApp(App).component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
