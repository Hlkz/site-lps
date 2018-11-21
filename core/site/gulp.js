import { buildApp } from '../njb/gulp'
let env = process.env.NODE_ENV

buildApp('main.js', true)