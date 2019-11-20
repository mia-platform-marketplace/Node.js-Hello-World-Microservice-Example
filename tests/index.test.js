/*
 * Copyright 2019 Mia srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict'

const t = require('tap')
const lc39 = require('@mia-platform/lc39')

async function setupFastify(envVariables) {
  const fastify = await lc39('./index.js', {
    // silent => trace for enabling logs
    logLevel: 'silent',
    envVariables,
  })
  return fastify
}

t.test('testnode', async t => {
  const fastify = await setupFastify({
    USERID_HEADER_KEY: 'userid',
    GROUPS_HEADER_KEY: 'groups',
    CLIENTTYPE_HEADER_KEY: 'clienttype',
    BACKOFFICE_HEADER_KEY: 'backoffice',
    MICROSERVICE_GATEWAY_SERVICE_NAME: 'microservice-gateway.example.org',
  })

  t.tearDown(async() => {
    await fastify.close()
  })

  t.test('GET /hello', t => {
    t.test('without user - without who', async t => {
      t.plan(2)

      const response = await fastify.inject({
        method: 'GET',
        url: '/hello',
      })
      t.equal(response.statusCode, 200)
      t.same(JSON.parse(response.payload), { message: 'Hello World' })
    })
    t.end()
  })

  t.end()
})
