"use strict"

const rPort = 6379
const rHost = '127.0.0.1'
const redis = require('redis')
const chalk = require('chalk')
const RedisClient = redis.createClient(rPort, rHost)
RedisClient.on('connect', function () {
    console.log(chalk.green('** Redis client connected **'))
})
RedisClient.on('error', function (err: any) {
    console.log(chalk.green(`** Something went wrong: ${err}`))
})

export { RedisClient }
