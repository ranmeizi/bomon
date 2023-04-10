import Config from 'webpack-chain'
import c_base from './chains/base'
import c_module from './chains/module'
import { Options } from '../type'

export default function (options: Options) {
  const config = new Config()

  config.mode(process.env.NODE_ENV as any || 'production')

  c_base(options, config)
  c_module(options, config)

  return config
}