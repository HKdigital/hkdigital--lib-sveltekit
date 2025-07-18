import { METHOD_GET, METHOD_POST } from '$lib/constants/http/methods.js';

import { APPLICATION_JSON } from '$lib/constants/mime/application.js';
import { CONTENT_TYPE } from '$lib/constants/http/headers.js';
import { ResponseError } from '$lib/errors/index.js';

import * as expect from '$lib/util/expect/index.js';

import { toURL } from './url.js';
import { httpRequest } from './http-request.js';
import { waitForAndCheckResponse } from './response.js';

const ACCEPT = 'accept';

/**
 * Make a GET request to fetch JSON encoded data
 *
 * This function performs a GET request and expects a JSON response from the server.
 * It handles common error cases and parses the JSON response.
 *
 * @param {import('./typedef').JsonGetOptions} options
 *   Request configuration options
 *
 * @returns {Promise<any>} Parsed JSON data
 *
 * @example
 * // Basic JSON GET request
 * try {
 *   const data = await jsonGet({
 *     url: 'https://api.example.com/users/123'
 *   });
 *   console.log(data); // { id: 123, name: "John Doe", ... }
 * } catch (error) {
 *   console.error('Failed to fetch user data:', error.message);
 * }
 *
 * @example
 * // JSON GET request with parameters
 * const data = await jsonGet({
 *   url: 'https://api.example.com/search',
 *   urlSearchParams: new URLSearchParams({ q: 'search term' }),
 *   withCredentials: true
 * });
 *
 * @example
 * // Using advanced options
 * const data = await jsonGet({
 *   url: 'https://api.example.com/data',
 *   timeoutMs: 5000,
 *   requestHandler: ({ abort }) => {
 *     // Store abort function
 *     window.abortDataRequest = abort;
 *   }
 * });
 */
export async function jsonGet(options) {
  // Extract specific parameters needed for this function
  const {
    url: rawUrl,
    urlSearchParams,
    headers,
    withCredentials,
    ...otherOptions
  } = options;

  const url = toURL(rawUrl);

  // Apply JSON-specific defaults
  const jsonHeaders = headers || {};
  jsonHeaders[ACCEPT] = APPLICATION_JSON;

  // Create request with all options
  const responsePromise = httpRequest({
    method: METHOD_GET,
    url,
    urlSearchParams,
    headers: jsonHeaders,
    withCredentials,
    ...otherOptions // Pass through any other options
  });

  const response = await waitForAndCheckResponse(responsePromise, url);

  let parsedResponse;

  try {
    //
    // @note when security on the client side fails, an `opaque` response
    //       is returned by the browser (empty body) -> parsing fails
    //       (use CORS to fix this)
    //
    parsedResponse = await response.json();
  } catch (e) {
    throw new ResponseError(
      `Failed to JSON decode server response from [${decodeURI(url.href)}]`,
      {
        cause: e
      }
    );
  }

  if (parsedResponse.error) {
    throw new ResponseError(
      `Server returned response error message [${parsedResponse.error}]`
    );
  }

  return parsedResponse;
}

/**
 * Make a POST request to fetch JSON encoded data
 *
 * This function performs a POST request with JSON data and expects a JSON
 * response from the server. It handles common error cases and parses the JSON response.
 *
 * @param {import('./typedef').JsonPostOptions} options
 *   Request configuration options
 *
 * @returns {Promise<any>} Parsed JSON data
 *
 * @example
 * // Basic JSON POST request
 * try {
 *   const newUser = {
 *     name: "Jane Smith",
 *     email: "jane@example.com"
 *   };
 *
 *   const data = await jsonPost({
 *     url: 'https://api.example.com/users',
 *     body: JSON.stringify(newUser)
 *   });
 *
 *   console.log('Created user with ID:', data.id);
 * } catch (error) {
 *   console.error('Failed to create user:', error.message);
 * }
 *
 * @example
 * // JSON POST with authentication and timeout
 * const data = await jsonPost({
 *   url: 'https://api.example.com/protected/resource',
 *   body: JSON.stringify({ action: 'update' }),
 *   headers: {
 *     'authorization': 'Bearer ' + token
 *   },
 *   withCredentials: true,
 *   timeoutMs: 5000
 * });
 */
export async function jsonPost(options) {
  // Extract specific parameters needed for this function
  const {
    url: rawUrl,
    body,
    urlSearchParams,
    headers,
    withCredentials,
    ...otherOptions
  } = options;

  const url = toURL(rawUrl);

  // Apply JSON-specific defaults and validation
  expect.defined(body);

  const jsonHeaders = headers || {};
  jsonHeaders[ACCEPT] = APPLICATION_JSON;
  jsonHeaders[CONTENT_TYPE] = APPLICATION_JSON;

  // Check if body is a string when using application/json
  if (
    jsonHeaders[CONTENT_TYPE] === APPLICATION_JSON &&
    typeof body !== 'string'
  ) {
    throw new Error(
      `Trying to send request with [content-type:${APPLICATION_JSON}], ` +
        'but body is not a (JSON encoded) string.'
    );
  }

  // Create request with all options
  const responsePromise = httpRequest({
    method: METHOD_POST,
    url,
    body,
    urlSearchParams,
    headers: jsonHeaders,
    withCredentials,
    ...otherOptions // Pass through any other options
  });

  const response = await waitForAndCheckResponse(responsePromise, url);

  let parsedResponse;

  try {
    //
    // @note when security on the client side fails, an `opaque` response
    //       is returned by the browser (empty body) -> parsing fails
    //       (use CORS to fix this)
    //
    parsedResponse = await response.json();
  } catch (e) {
    throw new ResponseError(
      `Failed to JSON decode server response from [${decodeURI(url.href)}]`,
      {
        cause: e
      }
    );
  }

  if (parsedResponse.error) {
    //
    // @note this is API specific, but it's quite logical
    //
    throw new ResponseError(
      `Server returned response error message [${parsedResponse.error}]`
    );
  }

  return parsedResponse;
}
