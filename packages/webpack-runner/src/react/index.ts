import Config from 'webpack-chain'
import c_base from './chains/base'
import c_module from './chains/module'
import c_prod from './chains/optimization'
import { Options } from '../type'

export default function (options: Options) {
  const config = new Config()

  config.mode(process.env.NODE_ENV as any || 'production')

  c_base(config)
  c_module(config)

  if (process.env.NODE_ENV === 'production') {
    c_prod(config)
  }

  return config
}