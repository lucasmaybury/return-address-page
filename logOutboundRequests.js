'use strict'

const http = require('http')
const https = require('https')

const BASE_MODULES = [http, https]

BASE_MODULES.forEach(baseModule => {

  const original = baseModule.request
  baseModule.request = function(opts, cb) {
    console.log("---------------\nOutbound request:");
    console.log({
      method: opts.method,
      url: opts.href||opts.proto+"://"+opts.host+opts.path,
      body: opts.body,
      custom_property: opts.xyz
    });

    return original(opts, cb)
  }

})