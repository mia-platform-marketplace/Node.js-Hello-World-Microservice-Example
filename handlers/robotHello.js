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

async function handler(req) {
  const helloMessage = `Hello ${req.getUserId() || req.query.who}`
  return {
    message: helloMessage,
  }
}

const schema = {
  querystring: {
    type: 'object',
    properties: {
      who: {
        type: 'string',
        default: 'World',
      },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
    },
  },
}

module.exports = {
  handler,
  schema,
}
