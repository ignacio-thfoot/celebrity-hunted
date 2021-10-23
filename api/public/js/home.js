/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      forcedJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      clarifyTimeoutError: validators.transitional(validators.boolean, '1.0.0')
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");
var enhanceError = __webpack_require__(/*! ./core/enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var pkg = __webpack_require__(/*! ./../../package.json */ "./node_modules/axios/package.json");

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};
var currentVerArr = pkg.version.split('.');

/**
 * Compare package versions
 * @param {string} version
 * @param {string?} thanVersion
 * @returns {boolean}
 */
function isOlderVersion(version, thanVersion) {
  var pkgVersionArr = thanVersion ? thanVersion.split('.') : currentVerArr;
  var destVer = version.split('.');
  for (var i = 0; i < 3; i++) {
    if (pkgVersionArr[i] > destVer[i]) {
      return true;
    } else if (pkgVersionArr[i] < destVer[i]) {
      return false;
    }
  }
  return false;
}

/**
 * Transitional option validator
 * @param {function|boolean?} validator
 * @param {string?} version
 * @param {string} message
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  var isDeprecated = version && isOlderVersion(version);

  function formatMessage(opt, desc) {
    return '[Axios v' + pkg.version + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed in ' + version));
    }

    if (isDeprecated && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  isOlderVersion: isOlderVersion,
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./resources/js/home.js":
/*!******************************!*\
  !*** ./resources/js/home.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _scss_entries_home_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../scss/entries/home.scss */ "./resources/scss/entries/home.scss");
/* harmony import */ var blazy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! blazy */ "./node_modules/blazy/blazy.js");
/* harmony import */ var blazy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(blazy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _data_data_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../data/data.json */ "./resources/data/data.json");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//CSS



 //ssh -i KeyPairAmazon.pem ec2-user@amazonprimecelebrityhunted-env.eba-pgszqys2.eu-west-3.elasticbeanstalk.com

var Home = /*#__PURE__*/function () {
  function Home() {
    _classCallCheck(this, Home);

    this.init();
    this.rotate = document.querySelector('.b--rotate-a'); //rotate window
    //rotate
  }

  _createClass(Home, [{
    key: "init",
    value: function init() {
      var _this = this;

      new (blazy__WEBPACK_IMPORTED_MODULE_1___default())({
        selector: '.b--lazy-a',
        successClass: 'b--lazy-a--fade-in'
      });
      this.loadTextData();
      document.addEventListener("loaded", function (e) {
        _this.hideKrpanoButtons();

        _this.krpano = document.getElementById("krpanoSWFObject");

        _this.events();

        _this.showMobileHeader();

        _this.hidePreloader(); // this.playSound();

      });
      window.selectedTeams = [];
      window.email = '';
      window.emailExists = [];
      this.preloadImages(['skin/assets/team1_found.png', 'skin/assets/team2_found.png', 'skin/assets/team3_found.png', 'skin/assets/team4_found.png']);
    }
  }, {
    key: "playSound",
    value: function playSound() {
      var myAudio = new Audio('img/loop.ogg');
      myAudio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
      }, false);
      myAudio.play();
      myAudio.volume = .1;
    }
  }, {
    key: "mobileCheck",
    value: function mobileCheck() {
      var toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
      return toMatch.some(function (toMatchItem) {
        return navigator.userAgent.match(toMatchItem);
      });
    }
  }, {
    key: "showMobileHeader",
    value: function showMobileHeader() {
      if (this.mobileCheck() == true) {
        var $header = $("#header");
        var $cardHeader = $(".b--card-c__hd");
        var attributes = $header.prop("attributes");
        $.each(attributes, function () {
          $cardHeader.attr(this.name, this.value);
        });
        $cardHeader.offset($header.offset());
        var $logo = $("#amazon_logo");
        var $cardFooter = $(".b--card-c__ft");
        var attributes = $logo.prop("attributes");
        $.each(attributes, function () {
          $cardFooter.attr(this.name, this.value);
        });
        $cardFooter.offset($logo.offset());
      }
    }
  }, {
    key: "simulateTeam",
    value: function simulateTeam() {
      window.selectedTeams[0] = {
        team: "team1",
        start: 22222,
        stop: 22222,
        totalSeconds: 30,
        teamAverage: 30
      };
    }
  }, {
    key: "preloadImages",
    value: function preloadImages(images) {
      try {
        images.forEach(function (image) {
          var _img = new Image();

          _img.src = image;
        });
      } catch (e) {}
    }
    /*  
    krpano.call("show_teams()");
    krpano.call("hide_teams()");
    */

  }, {
    key: "loadTextData",
    value: function loadTextData() {
      var textElements = document.querySelectorAll("[data-text]");
      textElements.forEach(function (el) {
        el.innerHTML = _data_data_json__WEBPACK_IMPORTED_MODULE_3__.text[el.getAttribute("data-text")];
      });
    }
  }, {
    key: "hidePreloader",
    value: function hidePreloader() {
      var preloader = document.querySelector(".b--preloader-a");
      preloader.classList.remove("b--preloader-a--is-active");
      var video = document.querySelector(".b--preloader-a video");
      video.pause();
      video.currentTime = 0;
    }
  }, {
    key: "showSignupForm",
    value: function showSignupForm(team) {
      var result = window.selectedTeams.filter(function (obj) {
        return obj.team === team;
      });
      var totalSeconds = result[0].totalSeconds;
      var teamAverage = result[0].teamAverage;
      var content = document.querySelector("#modal-inscription .b--card-c__front-items__bd__content");
      content.innerHTML = content.innerHTML.replace("{team_name}", _data_data_json__WEBPACK_IMPORTED_MODULE_3__.teams[team]).replace("{time}", this.showPrettyTime(totalSeconds)).replace("{average}", this.showPrettyTime(teamAverage));
      this.openModal('modal-inscription');
      this.closeModal('modal-inscription');
    }
  }, {
    key: "showAlreadySignedForm",
    value: function showAlreadySignedForm(team) {
      var result = window.selectedTeams.filter(function (obj) {
        return obj.team === team;
      });
      var totalSeconds = result[0].totalSeconds;
      var content = document.querySelector("#modal-inscription-2 .b--card-c__front-items__bd__content");
      content.innerHTML = content.innerHTML.replace("{team_name}", _data_data_json__WEBPACK_IMPORTED_MODULE_3__.teams[team]).replace("{time}", this.showPrettyTime(totalSeconds)).replace("{average}", this.showPrettyTime(result[0].teamAverage));
      this.openModal('modal-inscription-2');
      this.closeModal('modal-inscription-2');
    }
  }, {
    key: "hideSignupForm",
    value: function hideSignupForm() {
      document.querySelector("#modal-inscription .close-modal").click();
    }
  }, {
    key: "showShareModal",
    value: function showShareModal() {
      this.openModal("modal-share");
      this.closeModal("modal-share");
    }
  }, {
    key: "hideShareModal",
    value: function hideShareModal() {
      document.querySelector("#modal-share").classList.remove("b--card-c--is-visible");
    }
  }, {
    key: "toggleFullscreen",
    value: function toggleFullscreen(event) {
      var element = document.body;

      if (event instanceof HTMLElement) {
        element = event;
      }

      var isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

      element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function () {
        return false;
      };

      document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function () {
        return false;
      };

      var fullscreen_button = document.querySelector("#fullscreen");
      fullscreen_button.classList.toggle("fullscreen-back");
      isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
    }
  }, {
    key: "events",
    value: function events() {
      var _this2 = this;

      //home start button
      document.querySelector("#modal-home .b--card-c__front-items__bd__btn").addEventListener("click", function (e) {
        _this2.toggleFullscreen(e);

        document.querySelector("#modal-home").classList.remove("b--card-c--is-visible");

        _this2.showKrpanoButtons();

        _this2.startTimer();
      });
      document.querySelector("#fullscreen").addEventListener("click", function (e) {
        _this2.toggleFullscreen(e);
      }); //team pics

      ["team1", "team2", "team3", "team4"].forEach(function (e) {
        document.addEventListener(e, _this2.hotspotClickHandler.bind(_this2));
      }); //inscription

      document.querySelector("#modal-inscription .b--card-c__media-wrapper__icon").addEventListener("click", function () {
        document.querySelector(".b--card-c").classList.remove("b--card-c--is-visible");

        _this2.startTimer();
      });
      document.querySelector("#modal-inscription .b--card-c__front-items__bd__input__icon").addEventListener("click", function () {
        _this2.registerEmail();
      });
      document.querySelector("#modal-inscription .b--card-c__media-wrapper__icon").addEventListener("click", function () {
        document.querySelector("#modal-inscription").classList.remove("b--card-c--is-visible");
      }); //trailer

      document.addEventListener("button_trailer", function () {
        _this2.showTrailer();
      }); //about - help

      document.addEventListener("about", function (e) {
        console.log("yeeeeee");

        _this2.showHelpModal();
      });
      document.querySelectorAll("[data-text='welcome_more']").forEach(function (button) {
        button.addEventListener("click", function (e) {
          e.preventDefault();

          _this2.showHelpModal();
        });
      }); //check rotate

      if (this.mobileCheck() == true) {
        if (screen.orientation.angle == 90) {
          this.rotate.classList.add("b--rotate-a--is-visible");
        }

        window.addEventListener('orientationchange', this.checkOrientationChange.bind(this));
      }
    }
  }, {
    key: "showTrailer",
    value: function showTrailer() {
      this.openModal("modal-trailer");
      this.closeModal("modal-trailer");
    }
  }, {
    key: "showErrorModal",
    value: function showErrorModal() {
      this.openModal('modal-error');
      this.closeModal('modal-error');
    }
  }, {
    key: "showHelpModal",
    value: function showHelpModal() {
      this.openModal('modal-help');
      this.closeModal('modal-help');
    }
  }, {
    key: "startTimer",
    value: function startTimer() {
      var d = performance.now();
      window.startTime = d;
    }
  }, {
    key: "registerEmail",
    value: function registerEmail() {
      var _this3 = this;

      var emailElement = document.querySelector("#modal-inscription .b--card-c__front-items__bd__input");
      var checkboxElement = document.querySelector("#modal-inscription .b--card-c__front-items__ft__checkbox");

      if (!this.validateEmail(emailElement.value)) {
        emailElement.classList.add("error");

        if (!checkboxElement.checked) {
          checkboxElement.classList.add("error");
        } else {
          checkboxElement.classList.remove("error");
        }
      } else if (!checkboxElement.checked) {
        checkboxElement.classList.add("error");

        if (this.validateEmail(emailElement.value)) {
          emailElement.classList.remove("error");
        }
      } else {
        this.emailExists(emailElement.value).then(function (res) {
          if (res.data.length == 0) {
            _this3.createParticipant(emailElement.value, 'game');

            window.email = emailElement.value;
          } else {
            _this3.hideSignupForm();

            _this3.showErrorModal();
          }

          emailElement.value = '';
          checkboxElement.checked = false;
        });
      }
    }
  }, {
    key: "validateEmail",
    value: function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }, {
    key: "checkOrientationChange",
    value: function checkOrientationChange() {
      var screenOrientation = screen.orientation.angle;

      if (screenOrientation == 0) {
        this.rotate.classList.remove("b--rotate-a--is-visible");
      } else {
        this.rotate.classList.add("b--rotate-a--is-visible");
      }
    }
  }, {
    key: "hotspotClickHandler",
    value: function hotspotClickHandler(e) {
      this.findHotSpot(e.type);
    }
  }, {
    key: "hideKrpanoButtons",
    value: function hideKrpanoButtons() {
      $("#team_container, #button_trailer, #direction_buttons, #zoom_buttons, #fullscreen, #about").fadeTo("fast", 0);
    }
  }, {
    key: "showKrpanoButtons",
    value: function showKrpanoButtons() {
      $("#team_container, #button_trailer, #direction_buttons, #zoom_buttons, #fullscreen, #about").fadeTo("fast", 1);
    }
  }, {
    key: "findHotSpot",
    value: function findHotSpot(hotspot) {
      var result = window.selectedTeams.filter(function (obj) {
        return obj.team === hotspot;
      });

      if (result.length == 0) {
        var stopTime = performance.now();
        var time = Math.round((stopTime - window.startTime) / 1000);
        window.selectedTeams.push({
          "team": hotspot,
          "startTime": window.startTime,
          "stopTime": stopTime,
          "totalSeconds": time
        });
        document.querySelector("#" + hotspot + "_button").classList.add("team-found");
        this.createScore(hotspot, time);
      } else {
        if (window.email == '') {
          this.showSignupForm(hotspot);
        } else {
          this.showAlreadySignedForm(hotspot);
        }
      }
    }
  }, {
    key: "showPrettyTime",
    value: function showPrettyTime(totalSeconds) {
      var hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      var minutes = Math.floor(totalSeconds / 60);
      var seconds = totalSeconds % 60;

      if (totalSeconds > 59) {
        return minutes + ':' + seconds + ' min';
      } else {
        return seconds + ' sec';
      }
    }
  }, {
    key: "createParticipant",
    value: function createParticipant(email, type) {
      var _this4 = this;

      //https://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/
      //http://127.0.0.1:8000/
      var host = 'http://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/';
      axios__WEBPACK_IMPORTED_MODULE_2___default().post('/api/participants', {
        'email': email,
        'type': type
      }).then(function (res) {
        _this4.hideSignupForm();

        _this4.showShareModal();

        window.email = email;
        var emailElement = document.querySelector("#modal-inscription .b--card-c__front-items__bd__input");
        var checkboxElement = document.querySelector("#modal-inscription .b--card-c__front-items__ft__checkbox");
        emailElement.value = '';
        checkboxElement.checked = false;
      })["catch"](function (err) {
        console.log("ERROR", err);
      });
    }
  }, {
    key: "createScore",
    value: function createScore(team, timePassed) {
      var _this5 = this;

      //https://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/
      //http://127.0.0.1:8000/
      axios__WEBPACK_IMPORTED_MODULE_2___default().post('/api/scores', {
        'teamName': team,
        'timePassed': timePassed
      }).then(function (res) {
        // console.log("RESPONSE", res);
        var result = window.selectedTeams.filter(function (obj) {
          return obj.team === res.data.teamName;
        });
        result[0].teamAverage = res.data.avg;

        if (window.email == '') {
          _this5.showSignupForm(res.data.teamName);
        } else {
          _this5.showAlreadySignedForm(res.data.teamName);
        }
      })["catch"](function (err) {
        console.log("ERROR", err);
      });
    }
  }, {
    key: "emailExists",
    value: function emailExists(email) {
      //https://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/
      //http://127.0.0.1:8000/
      var result;
      return axios__WEBPACK_IMPORTED_MODULE_2___default().get('/api/participants/' + email).then(function (res) {
        return res;
      })["catch"](function (err) {
        console.log(err);
      });
    } // MODAL

    /*
    * targetID
    * targetClass
    * objectTrigger
    */

  }, {
    key: "openModal",
    value: function openModal(id) {
      this.krpano.call("hide_teams()"); //apply class to body

      var payload = {
        'targetID': '#' + id,
        'objectClass': 'b--card-c',
        'backdropClass': 'b--modal-backdrop-a',
        'targetClass': 'b--card-c--is-visible'
      };
      this.toggleClass(document.querySelector(payload.targetID), payload.targetClass); //create Backdrop div with class

      var div = document.createElement('div');
      div.className = payload.backdropClass;
      document.body.appendChild(div);
    } // Closes Modal

  }, {
    key: "closeModal",
    value: function closeModal(id) {
      var _this6 = this;

      // close modal on X
      //apply class to body
      var payload = {
        'targetID': '#' + id,
        'objectClass': 'b--card-c',
        'backdropClass': 'b--modal-backdrop-a',
        'targetClass': 'b--card-c--is-visible'
      };
      var closeBtn = document.querySelectorAll('.close-modal');
      closeBtn.forEach(function (element) {
        element.addEventListener('click', function (event) {
          event.preventDefault();

          _this6.krpano.call("show_teams()");

          _this6.removeClass(document.querySelector(payload.targetID), payload.targetClass);

          _this6.removeBackdrop(payload);

          _this6.loadTextData();

          _this6.startTimer(); //stop trailer video


          $('.b--video-a__video iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        });
      }); // close modal on Bakcdrop Click

      var backdrop = document.querySelectorAll("." + payload.backdropClass);
      backdrop.forEach(function (element) {
        element.addEventListener('click', function (event) {
          event.preventDefault();

          _this6.krpano.call("show_teams()");

          _this6.removeClass(document.querySelector(payload.targetID), payload.targetClass);

          _this6.removeBackdrop(payload);

          _this6.loadTextData();

          _this6.startTimer(); //stop trailer video


          $('.b--video-a__video iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        });
      });
    } //toggleClass
    //ToggleClass('class')

  }, {
    key: "toggleClass",
    value: function toggleClass(sel, c1, c2) {
      this._toggleClassElements(this._getElements(sel), c1, c2);
    }
  }, {
    key: "_toggleClassElements",
    value: function _toggleClassElements(elements, c1, c2) {
      var i,
          l = elements.length;

      for (i = 0; i < l; i++) {
        this._toggleClassElement(elements[i], c1, c2);
      }
    }
  }, {
    key: "_toggleClassElement",
    value: function _toggleClassElement(element, c1, c2) {
      var t1, t2, t1Arr, t2Arr, j, arr, allPresent;
      t1 = c1 || "";
      t2 = c2 || "";
      t1Arr = t1.split(" ");
      t2Arr = t2.split(" ");
      arr = element.className.split(" ");

      if (t2Arr.length == 0) {
        allPresent = true;

        for (j = 0; j < t1Arr.length; j++) {
          if (arr.indexOf(t1Arr[j]) == -1) {
            allPresent = false;
          }
        }

        if (allPresent) {
          this._removeClassElement(element, t1);
        } else {
          this._addClassElement(element, t1);
        }
      } else {
        allPresent = true;

        for (j = 0; j < t1Arr.length; j++) {
          if (arr.indexOf(t1Arr[j]) == -1) {
            allPresent = false;
          }
        }

        if (allPresent) {
          this._removeClassElement(element, t1);

          this._addClassElement(element, t2);
        } else {
          this._removeClassElement(element, t2);

          this._addClassElement(element, t1);
        }
      }
    }
  }, {
    key: "removeBackdrop",
    value: // removes backdrop HTML
    function removeBackdrop(payload) {
      if (document.querySelector('.' + payload.backdropClass)) {
        var div = document.querySelector('.' + payload.backdropClass);
        div.parentNode.removeChild(div);
      }
    } //removeClass(selector,'class')

  }, {
    key: "removeClass",
    value: function removeClass(sel, name) {
      this._removeClassElements(this._getElements(sel), name);
    }
  }, {
    key: "_removeClassElements",
    value: function _removeClassElements(elements, name) {
      var i,
          l = elements.length,
          arr1,
          arr2,
          j;

      for (i = 0; i < l; i++) {
        this._removeClassElement(elements[i], name);
      }
    }
  }, {
    key: "_removeClassElement",
    value: function _removeClassElement(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");

      for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
          arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
      }

      element.className = arr1.join(" ");
    }
  }, {
    key: "_getElements",
    value: function _getElements(id) {
      if (_typeof(id) == "object") {
        return [id];
      } else {
        return document.querySelectorAll(id);
      }
    }
  }, {
    key: "_addClassElement",
    value: function _addClassElement(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");

      for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
          element.className += " " + arr2[i];
        }
      }
    }
  }]);

  return Home;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);
new Home();

/***/ }),

/***/ "./node_modules/blazy/blazy.js":
/*!*************************************!*\
  !*** ./node_modules/blazy/blazy.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  hey, [be]Lazy.js - v1.8.2 - 2016.10.25
  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
;
(function(root, blazy) {
    if (true) {
        // AMD. Register bLazy as an anonymous module
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (blazy),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(this, function() {
    'use strict';

    //private vars
    var _source, _viewport, _isRetina, _supportClosest, _attrSrc = 'src', _attrSrcset = 'srcset';

    // constructor
    return function Blazy(options) {
        //IE7- fallback for missing querySelectorAll support
        if (!document.querySelectorAll) {
            var s = document.createStyleSheet();
            document.querySelectorAll = function(r, c, i, j, a) {
                a = document.all, c = [], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
                for (i = r.length; i--;) {
                    s.addRule(r[i], 'k:v');
                    for (j = a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
                    s.removeRule(0);
                }
                return c;
            };
        }

        //options and helper vars
        var scope = this;
        var util = scope._util = {};
        util.elements = [];
        util.destroyed = true;
        scope.options = options || {};
        scope.options.error = scope.options.error || false;
        scope.options.offset = scope.options.offset || 100;
        scope.options.root = scope.options.root || document;
        scope.options.success = scope.options.success || false;
        scope.options.selector = scope.options.selector || '.b-lazy';
        scope.options.separator = scope.options.separator || '|';
        scope.options.containerClass = scope.options.container;
        scope.options.container = scope.options.containerClass ? document.querySelectorAll(scope.options.containerClass) : false;
        scope.options.errorClass = scope.options.errorClass || 'b-error';
        scope.options.breakpoints = scope.options.breakpoints || false;
        scope.options.loadInvisible = scope.options.loadInvisible || false;
        scope.options.successClass = scope.options.successClass || 'b-loaded';
        scope.options.validateDelay = scope.options.validateDelay || 25;
        scope.options.saveViewportOffsetDelay = scope.options.saveViewportOffsetDelay || 50;
        scope.options.srcset = scope.options.srcset || 'data-srcset';
        scope.options.src = _source = scope.options.src || 'data-src';
        _supportClosest = Element.prototype.closest;
        _isRetina = window.devicePixelRatio > 1;
        _viewport = {};
        _viewport.top = 0 - scope.options.offset;
        _viewport.left = 0 - scope.options.offset;


        /* public functions
         ************************************/
        scope.revalidate = function() {
            initialize(scope);
        };
        scope.load = function(elements, force) {
            var opt = this.options;
            if (elements && elements.length === undefined) {
                loadElement(elements, force, opt);
            } else {
                each(elements, function(element) {
                    loadElement(element, force, opt);
                });
            }
        };
        scope.destroy = function() {            
            var util = scope._util;
            if (scope.options.container) {
                each(scope.options.container, function(object) {
                    unbindEvent(object, 'scroll', util.validateT);
                });
            }
            unbindEvent(window, 'scroll', util.validateT);
            unbindEvent(window, 'resize', util.validateT);
            unbindEvent(window, 'resize', util.saveViewportOffsetT);
            util.count = 0;
            util.elements.length = 0;
            util.destroyed = true;
        };

        //throttle, ensures that we don't call the functions too often
        util.validateT = throttle(function() {
            validate(scope);
        }, scope.options.validateDelay, scope);
        util.saveViewportOffsetT = throttle(function() {
            saveViewportOffset(scope.options.offset);
        }, scope.options.saveViewportOffsetDelay, scope);
        saveViewportOffset(scope.options.offset);

        //handle multi-served image src (obsolete)
        each(scope.options.breakpoints, function(object) {
            if (object.width >= window.screen.width) {
                _source = object.src;
                return false;
            }
        });

        // start lazy load
        setTimeout(function() {
            initialize(scope);
        }); // "dom ready" fix

    };


    /* Private helper functions
     ************************************/
    function initialize(self) {
        var util = self._util;
        // First we create an array of elements to lazy load
        util.elements = toArray(self.options);
        util.count = util.elements.length;
        // Then we bind resize and scroll events if not already binded
        if (util.destroyed) {
            util.destroyed = false;
            if (self.options.container) {
                each(self.options.container, function(object) {
                    bindEvent(object, 'scroll', util.validateT);
                });
            }
            bindEvent(window, 'resize', util.saveViewportOffsetT);
            bindEvent(window, 'resize', util.validateT);
            bindEvent(window, 'scroll', util.validateT);
        }
        // And finally, we start to lazy load.
        validate(self);
    }

    function validate(self) {
        var util = self._util;
        for (var i = 0; i < util.count; i++) {
            var element = util.elements[i];
            if (elementInView(element, self.options) || hasClass(element, self.options.successClass)) {
                self.load(element);
                util.elements.splice(i, 1);
                util.count--;
                i--;
            }
        }
        if (util.count === 0) {
            self.destroy();
        }
    }

    function elementInView(ele, options) {
        var rect = ele.getBoundingClientRect();

        if(options.container && _supportClosest){
            // Is element inside a container?
            var elementContainer = ele.closest(options.containerClass);
            if(elementContainer){
                var containerRect = elementContainer.getBoundingClientRect();
                // Is container in view?
                if(inView(containerRect, _viewport)){
                    var top = containerRect.top - options.offset;
                    var right = containerRect.right + options.offset;
                    var bottom = containerRect.bottom + options.offset;
                    var left = containerRect.left - options.offset;
                    var containerRectWithOffset = {
                        top: top > _viewport.top ? top : _viewport.top,
                        right: right < _viewport.right ? right : _viewport.right,
                        bottom: bottom < _viewport.bottom ? bottom : _viewport.bottom,
                        left: left > _viewport.left ? left : _viewport.left
                    };
                    // Is element in view of container?
                    return inView(rect, containerRectWithOffset);
                } else {
                    return false;
                }
            }
        }      
        return inView(rect, _viewport);
    }

    function inView(rect, viewport){
        // Intersection
        return rect.right >= viewport.left &&
               rect.bottom >= viewport.top && 
               rect.left <= viewport.right && 
               rect.top <= viewport.bottom;
    }

    function loadElement(ele, force, options) {
        // if element is visible, not loaded or forced
        if (!hasClass(ele, options.successClass) && (force || options.loadInvisible || (ele.offsetWidth > 0 && ele.offsetHeight > 0))) {
            var dataSrc = getAttr(ele, _source) || getAttr(ele, options.src); // fallback to default 'data-src'
            if (dataSrc) {
                var dataSrcSplitted = dataSrc.split(options.separator);
                var src = dataSrcSplitted[_isRetina && dataSrcSplitted.length > 1 ? 1 : 0];
                var srcset = getAttr(ele, options.srcset);
                var isImage = equal(ele, 'img');
                var parent = ele.parentNode;
                var isPicture = parent && equal(parent, 'picture');
                // Image or background image
                if (isImage || ele.src === undefined) {
                    var img = new Image();
                    // using EventListener instead of onerror and onload
                    // due to bug introduced in chrome v50 
                    // (https://productforums.google.com/forum/#!topic/chrome/p51Lk7vnP2o)
                    var onErrorHandler = function() {
                        if (options.error) options.error(ele, "invalid");
                        addClass(ele, options.errorClass);
                        unbindEvent(img, 'error', onErrorHandler);
                        unbindEvent(img, 'load', onLoadHandler);
                    };
                    var onLoadHandler = function() {
                        // Is element an image
                        if (isImage) {
                            if(!isPicture) {
                                handleSources(ele, src, srcset);
                            }
                        // or background-image
                        } else {
                            ele.style.backgroundImage = 'url("' + src + '")';
                        }
                        itemLoaded(ele, options);
                        unbindEvent(img, 'load', onLoadHandler);
                        unbindEvent(img, 'error', onErrorHandler);
                    };
                    
                    // Picture element
                    if (isPicture) {
                        img = ele; // Image tag inside picture element wont get preloaded
                        each(parent.getElementsByTagName('source'), function(source) {
                            handleSource(source, _attrSrcset, options.srcset);
                        });
                    }
                    bindEvent(img, 'error', onErrorHandler);
                    bindEvent(img, 'load', onLoadHandler);
                    handleSources(img, src, srcset); // Preload

                } else { // An item with src like iframe, unity games, simpel video etc
                    ele.src = src;
                    itemLoaded(ele, options);
                }
            } else {
                // video with child source
                if (equal(ele, 'video')) {
                    each(ele.getElementsByTagName('source'), function(source) {
                        handleSource(source, _attrSrc, options.src);
                    });
                    ele.load();
                    itemLoaded(ele, options);
                } else {
                    if (options.error) options.error(ele, "missing");
                    addClass(ele, options.errorClass);
                }
            }
        }
    }

    function itemLoaded(ele, options) {
        addClass(ele, options.successClass);
        if (options.success) options.success(ele);
        // cleanup markup, remove data source attributes
        removeAttr(ele, options.src);
        removeAttr(ele, options.srcset);
        each(options.breakpoints, function(object) {
            removeAttr(ele, object.src);
        });
    }

    function handleSource(ele, attr, dataAttr) {
        var dataSrc = getAttr(ele, dataAttr);
        if (dataSrc) {
            setAttr(ele, attr, dataSrc);
            removeAttr(ele, dataAttr);
        }
    }

    function handleSources(ele, src, srcset){
        if(srcset) {
            setAttr(ele, _attrSrcset, srcset); //srcset
        }
        ele.src = src; //src 
    }

    function setAttr(ele, attr, value){
        ele.setAttribute(attr, value);
    }

    function getAttr(ele, attr) {
        return ele.getAttribute(attr);
    }

    function removeAttr(ele, attr){
        ele.removeAttribute(attr); 
    }

    function equal(ele, str) {
        return ele.nodeName.toLowerCase() === str;
    }

    function hasClass(ele, className) {
        return (' ' + ele.className + ' ').indexOf(' ' + className + ' ') !== -1;
    }

    function addClass(ele, className) {
        if (!hasClass(ele, className)) {
            ele.className += ' ' + className;
        }
    }

    function toArray(options) {
        var array = [];
        var nodelist = (options.root).querySelectorAll(options.selector);
        for (var i = nodelist.length; i--; array.unshift(nodelist[i])) {}
        return array;
    }

    function saveViewportOffset(offset) {
        _viewport.bottom = (window.innerHeight || document.documentElement.clientHeight) + offset;
        _viewport.right = (window.innerWidth || document.documentElement.clientWidth) + offset;
    }

    function bindEvent(ele, type, fn) {
        if (ele.attachEvent) {
            ele.attachEvent && ele.attachEvent('on' + type, fn);
        } else {
            ele.addEventListener(type, fn, { capture: false, passive: true });
        }
    }

    function unbindEvent(ele, type, fn) {
        if (ele.detachEvent) {
            ele.detachEvent && ele.detachEvent('on' + type, fn);
        } else {
            ele.removeEventListener(type, fn, { capture: false, passive: true });
        }
    }

    function each(object, fn) {
        if (object && fn) {
            var l = object.length;
            for (var i = 0; i < l && fn(object[i], i) !== false; i++) {}
        }
    }

    function throttle(fn, minDelay, scope) {
        var lastCall = 0;
        return function() {
            var now = +new Date();
            if (now - lastCall < minDelay) {
                return;
            }
            lastCall = now;
            fn.apply(scope, arguments);
        };
    }
});


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./resources/scss/entries/home.scss":
/*!********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./resources/scss/entries/home.scss ***!
  \********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\n    Foundations\n*/\n/* Core Colors */\n/* Typography */\n/* 1rem = 16px */\n/* Grid */\n/*\n    End Foundations\n*/\n/* 0.5rem = 8px */\n/* foundation mixins*/\n/* build columns */\n/* Start Responsive Offset */\n/* Start Responsive Order */\n/* foundation mixins*/\n/* components*/\n/* utilities */\n.b--collapse-a {\n  max-height: 0px;\n  overflow: hidden;\n  transition: max-height 0.6s cubic-bezier(0, 1, 0, 1);\n}\n.b--collapse-a--is-active {\n  max-height: 99em;\n  transition: max-height 0.9s ease-in-out;\n}\n\n.b--btn-a {\n  font-family: \"Amazon Ember\", sans-serif;\n  font-weight: 300;\n  line-height: 1.35;\n  letter-spacing: 0.26px;\n  font-size: 1rem;\n  /*this font does not have responsive option */\n  text-decoration: none !important;\n  text-underline-position: auto;\n  display: inline-block;\n  background: #49c5f3;\n  color: #000000;\n  transition: all 0.3s ease-in-out;\n  position: relative;\n  padding: 0.4545454545rem;\n}\n.b--btn-a:hover, .b--btn-a:focus {\n  background: #3ca8b0;\n}\n.b--btn-a__loader {\n  position: absolute;\n  top: 3px;\n  right: -45px;\n}\n.b--btn-a--second {\n  background: #f00000;\n}\n.b--btn-a--second:hover, .b--btn-a--second:focus {\n  background: #78f2c5;\n}\n\n.b--hlist-a__list-item {\n  display: inline-block;\n}\n.b--hlist-a__list-item:not(:last-child) {\n  margin-right: 3rem;\n}\n\n.b--vlist-a__list-item:not(:last-child) {\n  margin-bottom: 1rem;\n}\n\n.b--pill-a {\n  font-family: \"Amazon Ember\", sans-serif;\n  font-weight: 300;\n  line-height: 1.33;\n  letter-spacing: 0.28px;\n  font-size: 0.75rem;\n  /*this font does not have responsive option */\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  margin-right: 0.5rem;\n  margin-bottom: 0.5rem;\n  display: inline-block;\n  border-radius: 25px;\n  text-align: center;\n  background: #000000;\n  color: #49c5f3;\n  transition: all 0.3s ease-in-out;\n}\n.b--pill-a:hover, .b--pill-a:focus {\n  background: rgba(0, 0, 0, 0.5);\n}\n\n.b--section-a {\n  padding: 5rem 0;\n}\n@media all and (max-width: 992px) {\n  .b--section-a {\n    padding: 8rem 0;\n  }\n}\n\n.b--collapse-a {\n  max-height: 0px;\n  overflow: hidden;\n  transition: max-height 0.6s cubic-bezier(0, 1, 0, 1);\n}\n.b--collapse-a--is-active {\n  max-height: 99em;\n  transition: max-height 0.9s ease-in-out;\n}\n\n.b--collapse-b {\n  border-bottom: 1px solid #000000;\n  position: relative;\n  overflow: hidden;\n}\n.b--collapse-b__btn {\n  width: 100%;\n  opacity: 1;\n  cursor: pointer;\n  pointer-events: all;\n  max-height: 99em;\n  display: flex;\n  align-items: center;\n}\n.b--collapse-b__btn__content {\n  width: 100%;\n  padding: 1rem 0;\n  transition: all 0.3s ease-in-out;\n}\n.b--collapse-b__btn:hover .b--collapse-b__btn__content, .b--collapse-b__btn:focus .b--collapse-b__btn__content {\n  padding: 2rem 0;\n}\n.b--collapse-b__btn--is-hidden {\n  opacity: 0;\n  max-height: 0;\n  transition: opacity 0.3s ease-in-out, max-height 0.3s ease-in-out;\n}\n.b--collapse-b__content {\n  max-height: 0px;\n  overflow: hidden;\n  opacity: 0;\n  transition: max-height 0.6s cubic-bezier(0, 1, 0, 1);\n}\n.b--collapse-b__content--is-active {\n  max-height: 99em;\n  opacity: 1;\n  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out 0.3s;\n}\n\n.b--card-x {\n  display: block;\n  text-decoration: none;\n  padding: 2rem;\n  margin-bottom: 2rem;\n  background-color: #3ca8b0;\n  border: 1px solid #000000;\n  transition: background-color 0.3s ease-in-out;\n}\n.b--card-x__title {\n  margin-bottom: 1rem;\n  font-family: \"Amazon Ember\", sans-serif;\n  font-weight: 300;\n  line-height: 1.27;\n  letter-spacing: 1.15px;\n  font-size: 0.8rem;\n  /*this font does not have responsive option */\n  color: #000000;\n}\n.b--card-x__title--second {\n  color: #f00000;\n}\n.b--card-x__subtitle {\n  font-family: \"Amazon Ember\", sans-serif;\n  font-weight: 300;\n  line-height: 1.35;\n  letter-spacing: 0.26px;\n  font-size: 1rem;\n  /*this font does not have responsive option */\n  color: #000000;\n}\n.b--card-x:hover {\n  background-color: rgba(60, 168, 176, 0.67);\n}\n.b--card-x--second {\n  background: #78f2c5;\n  border: 1px solid #f00000;\n}\n.b--card-x--second:hover {\n  background-color: rgba(120, 242, 197, 0.17);\n}\n\n.b--btn-a {\n  font-family: \"Amazon Ember\", sans-serif;\n  font-weight: 300;\n  line-height: 1.35;\n  letter-spacing: 0.26px;\n  font-size: 1rem;\n  /*this font does not have responsive option */\n  text-decoration: none !important;\n  text-underline-position: auto;\n  display: inline-block;\n  background: #49c5f3;\n  color: #000000;\n  transition: all 0.3s ease-in-out;\n  position: relative;\n  padding: 0.4545454545rem;\n}\n.b--btn-a:hover, .b--btn-a:focus {\n  background: #3ca8b0;\n}\n.b--btn-a__loader {\n  position: absolute;\n  top: 3px;\n  right: -45px;\n}\n.b--btn-a--second {\n  background: #f00000;\n}\n.b--btn-a--second:hover, .b--btn-a--second:focus {\n  background: #78f2c5;\n}\n\n.b--cta-a {\n  position: relative;\n  display: block;\n  min-height: 18.75rem;\n  height: 100%;\n  padding: 3rem 2.5rem;\n  border-radius: 10px;\n  background-color: #49c5f3;\n  text-decoration: none !important;\n  overflow: hidden;\n  box-shadow: none;\n  transition: all 0.3s ease-in-out;\n}\n@media all and (max-width: 1200px) {\n  .b--cta-a {\n    padding: 2.5rem 2rem;\n  }\n}\n@media all and (max-width: 600px) {\n  .b--cta-a {\n    min-height: 0;\n    height: auto;\n    margin-bottom: 2.5rem;\n  }\n}\n.b--cta-a__back-items {\n  position: absolute;\n  width: 30%;\n  bottom: 0.5rem;\n  right: 0.5rem;\n}\n@media all and (max-width: 600px) {\n  .b--cta-a__back-items {\n    display: none;\n  }\n}\n.b--cta-a__back-items__media {\n  display: block;\n  height: auto;\n  width: 100%;\n}\n.b--cta-a__front-items {\n  position: relative;\n  height: 100%;\n}\n.b--cta-a__front-items__title {\n  font-family: \"Amazon Ember\", sans-serif;\n  font-weight: 300;\n  letter-spacing: 0.27px;\n  line-height: 1.41;\n  font-size: 1.375rem;\n  font-weight: bold;\n  color: #ffffff;\n  padding-bottom: 3.5rem;\n}\n@media all and (max-width: 992px) {\n  .b--cta-a__front-items__title {\n    font-size: 1.25rem;\n    letter-spacing: 0.74px;\n    line-height: 1.14;\n  }\n}\n.b--cta-a__front-items__btn {\n  position: absolute;\n  bottom: 0;\n  display: inline-block;\n  font-family: \"Amazon Ember\", sans-serif;\n  font-weight: 300;\n  line-height: 1.35;\n  letter-spacing: 0.26px;\n  font-size: 1rem;\n  /*this font does not have responsive option */\n  font-weight: bold;\n  text-decoration: none !important;\n  color: #ffffff;\n  opacity: 1;\n  transition: all 0.3s ease-in-out;\n}\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  .b--cta-a__front-items__btn {\n    position: relative;\n  }\n}\n.b--cta-a__front-items__btn__icon {\n  height: 0.75rem;\n  padding-left: 0.5rem;\n}\n.b--cta-a__front-items__btn__icon path {\n  fill: #ffffff;\n  transition: all 0.3s ease-in-out;\n}\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  .b--cta-a__front-items__btn__icon {\n    position: absolute;\n    bottom: 0.3333333333rem;\n    right: -70%;\n  }\n}\n.b--cta-a:hover, .b--cta-a:focus {\n  box-shadow: 0px 20px 35px 0px rgba(0, 0, 0, 0.8);\n}\n\n/* form start */\n.b--form-hubspot-b .hbspt-form .hs-form fieldset {\n  width: 100%;\n  max-width: none;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field {\n  width: 100%;\n  margin-bottom: 1rem;\n  padding-top: 1rem;\n  position: relative;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field:focus-within label {\n  top: 0;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field label {\n  font-family: \"Amazon Ember\", sans-serif;\n  font-weight: 300;\n  line-height: 1.33;\n  letter-spacing: 0.28px;\n  font-size: 0.75rem;\n  /*this font does not have responsive option */\n  display: block;\n  color: #3ca8b0;\n  position: absolute;\n  top: 1.75rem;\n  left: 1rem;\n  transition: all 0.3s ease-in-out;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input {\n  position: relative;\n  margin-right: 0;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .hs-input {\n  font-family: \"Amazon Ember\", sans-serif;\n  font-weight: 300;\n  line-height: 1.33;\n  letter-spacing: 0.28px;\n  font-size: 0.75rem;\n  /*this font does not have responsive option */\n  padding: 0.5rem 1rem 0.75rem;\n  background: transparent;\n  width: 100%;\n  color: black !important;\n  border-bottom: 2px solid rgba(0, 0, 0, 0.2);\n  transition: color 0.3s ease-in-out;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .hs-input::-moz-placeholder {\n  color: transparent;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .hs-input:-ms-input-placeholder {\n  color: transparent;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .hs-input::placeholder {\n  color: transparent;\n}\n@media all and (max-width: 600px) {\n  .b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .hs-input {\n    font-size: 1rem;\n  }\n  .b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .hs-input::-moz-placeholder {\n    font-size: 1rem;\n  }\n  .b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .hs-input:-ms-input-placeholder {\n    font-size: 1rem;\n  }\n  .b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .hs-input::placeholder {\n    font-size: 1rem;\n  }\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .hs-input:focus {\n  border-bottom: 2px solid #000000;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .hs-input:not(:-moz-placeholder-shown) {\n  background-color: #ffffff !important;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .hs-input:not(:-ms-input-placeholder) {\n  background-color: #ffffff !important;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .hs-input:not(:placeholder-shown) {\n  background-color: #ffffff !important;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .hs-input.error {\n  border-bottom: 2px solid #f00000;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .hs-input.error ~ .b--form-error-a {\n  display: block !important;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input textarea.hs-input {\n  min-height: 7.5rem;\n  display: block;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .inputs-list label {\n  position: relative;\n  top: auto;\n  left: auto;\n  min-height: 1.5rem;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .inputs-list label input {\n  position: absolute;\n  opacity: 0;\n  cursor: pointer;\n  height: 1.5rem;\n  width: 1.5rem;\n  left: 0;\n  top: 0;\n  z-index: 1;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .inputs-list label span {\n  position: relative;\n  padding-left: 2.5rem;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .inputs-list label span::before {\n  content: \"\";\n  width: 1.5rem;\n  height: 1.5rem;\n  display: block;\n  outline: 1px solid rgba(0, 0, 0, 0.2);\n  position: absolute;\n  top: 50%;\n  left: 0;\n  transform: translateY(-50%);\n  pointer-events: none;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .inputs-list label span::after {\n  content: \"\";\n  position: absolute;\n  opacity: 0;\n  transition: 0.3s;\n  left: 0.25rem;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 1rem;\n  height: 1rem;\n  background: #49c5f3;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .inputs-list label input:focus ~ span::before {\n  outline: 1px solid black;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .inputs-list label input:checked ~ span::after {\n  opacity: 1 !important;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .inputs-list label .hs-form-required {\n  padding-left: 0;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .inputs-list label .hs-form-required::before {\n  content: none;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .inputs-list label .hs-form-required::after {\n  content: none;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .inputs-list .hs-form-radio label span::before {\n  border-radius: 50%;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .input .inputs-list .hs-form-radio label span::after {\n  border-radius: 50%;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-form-field .hs-error-msgs li label.hs-error-msg {\n  position: relative;\n  top: auto;\n  left: auto;\n  color: #f00000;\n  margin-top: 0.25rem;\n  font-family: \"Amazon Ember\", sans-serif;\n  font-weight: 300;\n  line-height: 1.33;\n  letter-spacing: 0.28px;\n  font-size: 0.75rem;\n  /*this font does not have responsive option */\n  margin-bottom: 0;\n}\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  .b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-fieldtype-select .input {\n    /* Remove IE arrow */\n  }\n  .b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-fieldtype-select .input select::-ms-expand {\n    display: none !important;\n  }\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-fieldtype-select .input::after {\n  content: \"\";\n  height: 0.5rem;\n  width: 1rem;\n  position: absolute;\n  right: 1rem;\n  top: 50%;\n  transform: translateY(-50%);\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-position: center right;\n  pointer-events: none;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-fieldtype-select .input .hs-input:not(:-moz-placeholder-shown) {\n  border-bottom: 2px solid rgba(0, 0, 0, 0.2);\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-fieldtype-select .input .hs-input:not(:-ms-input-placeholder) {\n  border-bottom: 2px solid rgba(0, 0, 0, 0.2);\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-fieldtype-select .input .hs-input:not(:placeholder-shown) {\n  border-bottom: 2px solid rgba(0, 0, 0, 0.2);\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-fieldtype-select .input .hs-input:focus {\n  border-bottom: 2px solid #000000;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-fieldtype-checkbox:focus-within label {\n  top: auto;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-fieldtype-checkbox label {\n  position: relative;\n  top: auto;\n  left: auto;\n  margin-bottom: 1rem;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-fieldtype-file:focus-within label {\n  top: auto;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-fieldtype-file label {\n  position: relative;\n  top: auto;\n  left: auto;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-fieldtype-file .input input {\n  cursor: pointer;\n  position: relative;\n  -webkit-padding-before: 0 !important;\n  -webkit-padding-after: 0 !important;\n  -webkit-padding-start: 0 !important;\n  width: 100%;\n  height: 41px;\n  color: rgba(73, 197, 243, 0.5);\n  padding: 0.5rem;\n  background-color: #000000;\n  transition: color 0.3s ease-in-out;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-fieldtype-file .input input::-webkit-file-upload-button {\n  cursor: pointer;\n  height: 100%;\n  padding: 0.25rem 3rem;\n  -webkit-appearance: none;\n          appearance: none;\n  border: none;\n  background-color: #000000;\n  color: #ffffff;\n  font-family: \"Amazon Ember\", sans-serif;\n  font-weight: 300;\n  line-height: 1.33;\n  letter-spacing: 0.28px;\n  font-size: 0.75rem;\n  /*this font does not have responsive option */\n  -webkit-transition: opacity 0.3s ease-in-out;\n  transition: opacity 0.3s ease-in-out;\n}\n.b--form-hubspot-b .hbspt-form .hs-form fieldset .hs-fieldtype-file .input input:hover::-webkit-file-upload-button {\n  opacity: 0.8;\n}\n.b--form-hubspot-b .hbspt-form .hs-form .form-columns-2 .hs-form-field {\n  width: 50%;\n}\n@media all and (max-width: 992px) {\n  .b--form-hubspot-b .hbspt-form .hs-form .form-columns-2 .hs-form-field {\n    width: 100%;\n  }\n}\n.b--form-hubspot-b .hbspt-form .hs-form .form-columns-2 .hs-form-field:first-child {\n  padding-right: 1rem;\n}\n@media all and (max-width: 992px) {\n  .b--form-hubspot-b .hbspt-form .hs-form .form-columns-2 .hs-form-field:first-child {\n    padding-right: 0;\n  }\n}\n.b--form-hubspot-b .hbspt-form .hs-form .form-columns-2 .hs-form-field:last-child {\n  padding-left: 1rem;\n}\n.b--form-hubspot-b .hbspt-form .hs-form .form-columns-2 .hs-form-field:last-child label {\n  left: 2rem;\n}\n@media all and (max-width: 992px) {\n  .b--form-hubspot-b .hbspt-form .hs-form .form-columns-2 .hs-form-field:last-child {\n    padding-left: 0;\n  }\n}\n.b--form-hubspot-b .hbspt-form .hs-form .hs_error_rollup .hs-error-msgs li label.hs-main-font-element {\n  position: relative;\n  top: auto;\n  left: auto;\n  color: #f00000;\n  margin-bottom: 0.25rem;\n  font-family: \"Amazon Ember\", sans-serif;\n  font-weight: 300;\n  line-height: 1.33;\n  letter-spacing: 0.28px;\n  font-size: 0.75rem;\n  /*this font does not have responsive option */\n  display: block;\n}\n.b--form-hubspot-b .hbspt-form .hs-form .hs-recaptcha {\n  margin-bottom: 2rem;\n}\n@media all and (max-width: 992px) {\n  .b--form-hubspot-b .hbspt-form .hs-form .hs-recaptcha {\n    margin-bottom: 1.5rem;\n  }\n}\n.b--form-hubspot-b .hbspt-form .hs-form .hs-submit .actions .hs-button {\n  font-family: \"Amazon Ember\", sans-serif;\n  font-weight: 300;\n  line-height: 1.35;\n  letter-spacing: 0.26px;\n  font-size: 1rem;\n  /*this font does not have responsive option */\n  text-decoration: none !important;\n  text-underline-position: auto;\n  display: inline-block;\n  background: #49c5f3;\n  color: #000000;\n  transition: all 0.3s ease-in-out;\n  position: relative;\n  padding: 0.4545454545rem;\n}\n.b--form-hubspot-b .hbspt-form .hs-form .hs-submit .actions .hs-button:hover, .b--form-hubspot-b .hbspt-form .hs-form .hs-submit .actions .hs-button:focus {\n  background: #3ca8b0;\n}\n\n.b--form-group-b {\n  margin-bottom: 1rem;\n  padding-top: 1rem;\n  position: relative;\n}\n\n.b--form-input-b {\n  position: relative;\n}\n.b--form-input-b::after {\n  content: \"\";\n  width: 0;\n  height: 2px;\n  background-color: #000000;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  transition: width 0.3s ease-in-out;\n}\n.b--form-input-b:focus-within::after {\n  width: 100%;\n}\n.b--form-input-b__item {\n  font-family: \"Amazon Ember\", sans-serif;\n  font-weight: 300;\n  line-height: 1.33;\n  letter-spacing: 0.28px;\n  font-size: 0.75rem;\n  /*this font does not have responsive option */\n  padding: 0.75rem 1rem;\n  background: transparent;\n  width: 100%;\n  color: black !important;\n  border-bottom: 2px solid rgba(0, 0, 0, 0.2);\n  transition: color 0.3s ease-in-out;\n}\n.b--form-input-b__item::-moz-placeholder {\n  color: transparent;\n}\n.b--form-input-b__item:-ms-input-placeholder {\n  color: transparent;\n}\n.b--form-input-b__item::placeholder {\n  color: transparent;\n}\n@media all and (max-width: 600px) {\n  .b--form-input-b__item {\n    font-size: 1rem;\n  }\n  .b--form-input-b__item::-moz-placeholder {\n    font-size: 1rem;\n  }\n  .b--form-input-b__item:-ms-input-placeholder {\n    font-size: 1rem;\n  }\n  .b--form-input-b__item::placeholder {\n    font-size: 1rem;\n  }\n}\n.b--form-input-b__item:not(:-moz-placeholder-shown) {\n  background-color: #ffffff !important;\n}\n.b--form-input-b__item:not(:-ms-input-placeholder) {\n  background-color: #ffffff !important;\n}\n.b--form-input-b__item:not(:placeholder-shown) {\n  background-color: #ffffff !important;\n}\n.b--form-input-b--error::after {\n  width: 100%;\n  background-color: #f00000;\n}\n.b--form-input-b--error ~ .b--form-error-a {\n  display: block !important;\n}\n\n.b--form-input-icon-b {\n  position: relative;\n}\n.b--form-input-icon-b::after {\n  content: \"\";\n  width: 0;\n  height: 2px;\n  background-color: #000000;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  transition: width 0.3s ease-in-out;\n}\n.b--form-input-icon-b:focus-within::after {\n  width: 100%;\n}\n.b--form-input-icon-b__item {\n  font-family: \"Amazon Ember\", sans-serif;\n  font-weight: 300;\n  line-height: 1.33;\n  letter-spacing: 0.28px;\n  font-size: 0.75rem;\n  /*this font does not have responsive option */\n  padding: 0.75rem 1rem;\n  background: transparent;\n  width: 100%;\n  color: black !important;\n  border-bottom: 2px solid rgba(0, 0, 0, 0.2);\n  transition: color 0.3s ease-in-out;\n}\n.b--form-input-icon-b__item::-moz-placeholder {\n  color: transparent;\n}\n.b--form-input-icon-b__item:-ms-input-placeholder {\n  color: transparent;\n}\n.b--form-input-icon-b__item::placeholder {\n  color: transparent;\n}\n@media all and (max-width: 600px) {\n  .b--form-input-icon-b__item {\n    font-size: 1rem;\n  }\n  .b--form-input-icon-b__item::-moz-placeholder {\n    font-size: 1rem;\n  }\n  .b--form-input-icon-b__item:-ms-input-placeholder {\n    font-size: 1rem;\n  }\n  .b--form-input-icon-b__item::placeholder {\n    font-size: 1rem;\n  }\n}\n.b--form-input-icon-b__item:not(:-moz-placeholder-shown) {\n  background-color: #ffffff !important;\n}\n.b--form-input-icon-b__item:not(:-ms-input-placeholder) {\n  background-color: #ffffff !important;\n}\n.b--form-input-icon-b__item:not(:placeholder-shown) {\n  background-color: #ffffff !important;\n}\n.b--form-input-icon-b__artwork {\n  width: 1em;\n  height: 1em;\n  position: absolute;\n  top: 50%;\n  right: 0;\n  transform: translate(-16px, -50%);\n  cursor: pointer;\n}\n.b--form-input-icon-b__artwork path {\n  fill: #3ca8b0;\n}\n.b--form-input-icon-b--error::after {\n  width: 100%;\n  background-color: #f00000;\n}\n.b--form-input-icon-b--error ~ .b--form-error-a {\n  display: block !important;\n}\n\n.b--form-select-b {\n  position: relative;\n}\n.b--form-select-b::after {\n  content: \"\";\n  width: 0;\n  height: 2px;\n  background-color: #000000;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  transition: width 0.3s ease-in-out;\n}\n.b--form-select-b:focus-within::after {\n  width: 100%;\n}\n.b--form-select-b__item {\n  font-family: \"Amazon Ember\", sans-serif;\n  font-weight: 300;\n  line-height: 1.33;\n  letter-spacing: 0.28px;\n  font-size: 0.75rem;\n  /*this font does not have responsive option */\n  padding: 0.75rem 1rem;\n  background: transparent;\n  width: 100%;\n  color: black !important;\n  border-bottom: 2px solid rgba(0, 0, 0, 0.2);\n  transition: color 0.3s ease-in-out;\n}\n.b--form-select-b__item::-moz-placeholder {\n  color: transparent;\n}\n.b--form-select-b__item:-ms-input-placeholder {\n  color: transparent;\n}\n.b--form-select-b__item::placeholder {\n  color: transparent;\n}\n@media all and (max-width: 600px) {\n  .b--form-select-b__item {\n    font-size: 1rem;\n  }\n  .b--form-select-b__item::-moz-placeholder {\n    font-size: 1rem;\n  }\n  .b--form-select-b__item:-ms-input-placeholder {\n    font-size: 1rem;\n  }\n  .b--form-select-b__item::placeholder {\n    font-size: 1rem;\n  }\n}\n.b--form-select-b__artwork {\n  width: 1em;\n  height: 1em;\n  position: absolute;\n  top: 50%;\n  right: 0;\n  transform: translate(-16px, -50%);\n  cursor: pointer;\n}\n.b--form-select-b__artwork path {\n  fill: #3ca8b0;\n}\n.b--form-select-b--error::after {\n  width: 100%;\n  background-color: #f00000;\n}\n.b--form-select-b--error ~ .b--form-error-a {\n  display: block !important;\n}\n\n.b--form-textarea-b {\n  position: relative;\n}\n.b--form-textarea-b::after {\n  content: \"\";\n  width: 0;\n  height: 2px;\n  background-color: #000000;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  transition: width 0.3s ease-in-out;\n}\n.b--form-textarea-b:focus-within::after {\n  width: 100%;\n}\n.b--form-textarea-b__item {\n  font-family: \"Amazon Ember\", sans-serif;\n  font-weight: 300;\n  line-height: 1.33;\n  letter-spacing: 0.28px;\n  font-size: 0.75rem;\n  /*this font does not have responsive option */\n  padding: 0.75rem 1rem;\n  background: transparent;\n  width: 100%;\n  color: black !important;\n  border-bottom: 2px solid rgba(0, 0, 0, 0.2);\n  transition: color 0.3s ease-in-out;\n  min-height: 6rem;\n  display: block;\n}\n.b--form-textarea-b__item::-moz-placeholder {\n  color: transparent;\n}\n.b--form-textarea-b__item:-ms-input-placeholder {\n  color: transparent;\n}\n.b--form-textarea-b__item::placeholder {\n  color: transparent;\n}\n@media all and (max-width: 600px) {\n  .b--form-textarea-b__item {\n    font-size: 1rem;\n  }\n  .b--form-textarea-b__item::-moz-placeholder {\n    font-size: 1rem;\n  }\n  .b--form-textarea-b__item:-ms-input-placeholder {\n    font-size: 1rem;\n  }\n  .b--form-textarea-b__item::placeholder {\n    font-size: 1rem;\n  }\n}\n.b--form-textarea-b__item:not(:-moz-placeholder-shown) {\n  background-color: #ffffff !important;\n}\n.b--form-textarea-b__item:not(:-ms-input-placeholder) {\n  background-color: #ffffff !important;\n}\n.b--form-textarea-b__item:not(:placeholder-shown) {\n  background-color: #ffffff !important;\n}\n.b--form-textarea-b--error::after {\n  width: 100%;\n  background-color: #f00000;\n}\n.b--form-textarea-b--error ~ .b--form-error-a {\n  display: block !important;\n}\n\n.b--form-label-b {\n  font-family: \"Amazon Ember\", sans-serif;\n  font-weight: 300;\n  line-height: 1.33;\n  letter-spacing: 0.28px;\n  font-size: 0.75rem;\n  /*this font does not have responsive option */\n  display: block;\n  color: #3ca8b0;\n  position: absolute;\n  top: 0.75rem;\n  left: 1rem;\n  transition: all 0.3s ease-in-out;\n}\n\n.b--form-input-b__item:not(:-moz-placeholder-shown) ~ .b--form-label-b, .b--form-input-icon-b__item:not(:-moz-placeholder-shown) ~ .b--form-label-b, .b--form-textarea-b__item:not(:-moz-placeholder-shown) ~ .b--form-label-b {\n  top: -0.5rem;\n  font-size: 0.65rem;\n}\n\n.b--form-input-b__item:not(:-ms-input-placeholder) ~ .b--form-label-b, .b--form-input-icon-b__item:not(:-ms-input-placeholder) ~ .b--form-label-b, .b--form-textarea-b__item:not(:-ms-input-placeholder) ~ .b--form-label-b {\n  top: -0.5rem;\n  font-size: 0.65rem;\n}\n\n.b--form-input-b__item:focus ~ .b--form-label-b,\n.b--form-input-b__item:not(:placeholder-shown) ~ .b--form-label-b,\n.b--form-input-icon-b__item:focus ~ .b--form-label-b,\n.b--form-input-icon-b__item:not(:placeholder-shown) ~ .b--form-label-b,\n.b--form-textarea-b__item:focus ~ .b--form-label-b,\n.b--form-textarea-b__item:not(:placeholder-shown) ~ .b--form-label-b {\n  top: -0.5rem;\n  font-size: 0.65rem;\n}\n\n/* form end */", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./resources/scss/entries/common.scss":
/*!********************************************!*\
  !*** ./resources/scss/entries/common.scss ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./resources/scss/entries/home.scss":
/*!******************************************!*\
  !*** ./resources/scss/entries/home.scss ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_home_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./home.scss */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./resources/scss/entries/home.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_home_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_home_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/axios/package.json":
/*!*****************************************!*\
  !*** ./node_modules/axios/package.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"_args":[["axios@0.21.4","/Applications/XAMPP/xamppfiles/htdocs/celebrity-hunted2"]],"_development":true,"_from":"axios@0.21.4","_id":"axios@0.21.4","_inBundle":false,"_integrity":"sha512-ut5vewkiu8jjGBdqpM44XxjuCjq9LAKeHVmoVfHVzy8eHgxxq8SbAVQNovDA8mVi05kP0Ea/n/UzcSHcTJQfNg==","_location":"/axios","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"axios@0.21.4","name":"axios","escapedName":"axios","rawSpec":"0.21.4","saveSpec":null,"fetchSpec":"0.21.4"},"_requiredBy":["#DEV:/","/localtunnel"],"_resolved":"https://registry.npmjs.org/axios/-/axios-0.21.4.tgz","_spec":"0.21.4","_where":"/Applications/XAMPP/xamppfiles/htdocs/celebrity-hunted2","author":{"name":"Matt Zabriskie"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"bugs":{"url":"https://github.com/axios/axios/issues"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}],"dependencies":{"follow-redirects":"^1.14.0"},"description":"Promise based HTTP client for the browser and node.js","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"homepage":"https://axios-http.com","jsdelivr":"dist/axios.min.js","keywords":["xhr","http","ajax","promise","node"],"license":"MIT","main":"index.js","name":"axios","repository":{"type":"git","url":"git+https://github.com/axios/axios.git"},"scripts":{"build":"NODE_ENV=production grunt build","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","examples":"node ./examples/server.js","fix":"eslint --fix lib/**/*.js","postversion":"git push && git push --tags","preversion":"npm test","start":"node ./sandbox/server.js","test":"grunt test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"},"typings":"./index.d.ts","unpkg":"dist/axios.min.js","version":"0.21.4"}');

/***/ }),

/***/ "./resources/data/data.json":
/*!**********************************!*\
  !*** ./resources/data/data.json ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"text":{"welcome_title":"Bienvenue","welcome_text":"Retrouve sur l’image au moins une équipe et tente de remporter un bon d’achat d’une valeur de 1000€ sur Amazon.","button_start":"Commencer la<br />traque","button_start_disclaimer":"[ Le jeu se lancera en plein écran ] ","win_title":"Félicitations","win_text":"Vous avez trouvé {team_name} en {time}. Le temps moyen est de {average}.<br /><br />Tentez de gagner un bon d\'achat de 1000€ sur Amazon en vous inscrivant au tirage au sort.","already_signed_text":"Vous avez trouvé {team_name} en {time}. Le temps moyen est de {average}.<br /><br />Vous êtes déjà inscrit au jeu concours. Le tirage au sort aura lieu très bientôt !","cookies_text":"Nous utilisons des cookies pour vous garantir la meilleure expérience sur notre site web. En continuant à naviguer sur ce site, vous acceptez nos cookies.","cookies_accept":"Accepter","cookies_refuse":"Refuser","thanks_title":"Merci","thanks_text":"Vous êtes bien inscrit au jeu concours.<br /><br />Partagez ce jeu et augmentez vos chances de gagner !","welcome_more":"en savoir plus","help_title":"Le jeu concours","help_text":"Pour participer, zoomes à l’intérieur de l’image jusqu’à ce que tu trouves un des duos en fuite.<br /><br />Une fois trouvé, clique sur eux pour t’inscrire au tirage au sort en indiquant ton mail pour tenter de gagner un bon d’achat Amazon d’une valeur de 1000€.<br /><br />Augmente tes chances de gagner en partageant ton score sur les réseaux sociaux.<br /><br />Deux gagnants seront tirés au sort le 29/10/2021 puis le 02/11/2021.","policy_button_text":"Politique de confidentialité et règlement du jeu concours","policy_button_text_mobile":"Réglement et conditions générales","error_title":"Désolé","error_text":"Chaque joueur ne peut s’inscrire qu’une au jeu concours et vous vous êtes déjà inscrit.<br /><br />Le tirage au sort aura lieu très bientôt !","trailer_title":"La bande annonce"},"teams":{"team4":"Ramzy et Franck","team3":"Dadju et Darcy","team2":"Seb la Frite et Squeezie","team1":"Florent et Laure Manaudou"},"share":{"title":"Partage ton score et challenge tes amis à le battre !","desc":"#CelebrityHunted : J’ai retrouvé {team_name} en {time}. Toi aussi participe pour battre mon record !"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/home": 0,
/******/ 			"css/common": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/common"], () => (__webpack_require__("./resources/js/home.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/common"], () => (__webpack_require__("./resources/scss/entries/common.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;