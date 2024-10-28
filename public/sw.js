!(function () {
  "use strict";
  var e, t;
  let a, s, r;
  let n = (e, ...t) => {
    let a = e;
    return t.length > 0 && (a += ` :: ${JSON.stringify(t)}`), a;
  };
  class i extends Error {
    details;
    constructor(e, t) {
      super(n(e, t)), (this.name = e), (this.details = t);
    }
  }
  let c = (e) =>
      new URL(String(e), location.href).href.replace(
        RegExp(`^${location.origin}`),
        ""
      ),
    o = {
      googleAnalytics: "googleAnalytics",
      precache: "precache-v2",
      prefix: "serwist",
      runtime: "runtime",
      suffix: "undefined" != typeof registration ? registration.scope : "",
    },
    l = (e) =>
      [o.prefix, e, o.suffix].filter((e) => e && e.length > 0).join("-"),
    h = (e) => {
      for (let t of Object.keys(o)) e(t);
    },
    u = {
      updateDetails: (e) => {
        h((t) => {
          let a = e[t];
          "string" == typeof a && (o[t] = a);
        });
      },
      getGoogleAnalyticsName: (e) => e || l(o.googleAnalytics),
      getPrecacheName: (e) => e || l(o.precache),
      getPrefix: () => o.prefix,
      getRuntimeName: (e) => e || l(o.runtime),
      getSuffix: () => o.suffix,
    };
  class d {
    promise;
    resolve;
    reject;
    constructor() {
      this.promise = new Promise((e, t) => {
        (this.resolve = e), (this.reject = t);
      });
    }
  }
  function m(e, t) {
    let a = new URL(e);
    for (let e of t) a.searchParams.delete(e);
    return a.href;
  }
  async function f(e, t, a, s) {
    let r = m(t.url, a);
    if (t.url === r) return e.match(t, s);
    let n = { ...s, ignoreSearch: !0 };
    for (let i of await e.keys(t, n))
      if (r === m(i.url, a)) return e.match(i, s);
  }
  let g = new Set(),
    p = async () => {
      for (let e of g) await e();
    };
  function w(e) {
    return new Promise((t) => setTimeout(t, e));
  }
  let y = "-precache-",
    _ = async (e, t = y) => {
      let a = (await self.caches.keys()).filter(
        (a) => a.includes(t) && a.includes(self.registration.scope) && a !== e
      );
      return await Promise.all(a.map((e) => self.caches.delete(e))), a;
    },
    x = (e) => {
      self.addEventListener("activate", (t) => {
        t.waitUntil(_(u.getPrecacheName(e)).then((e) => {}));
      });
    },
    b = () => {
      self.addEventListener("activate", () => self.clients.claim());
    },
    E = (e, t) => {
      let a = t();
      return e.waitUntil(a), a;
    },
    v = (e, t) => t.some((t) => e instanceof t),
    R = new WeakMap(),
    q = new WeakMap(),
    S = new WeakMap(),
    D = {
      get(e, t, a) {
        if (e instanceof IDBTransaction) {
          if ("done" === t) return R.get(e);
          if ("store" === t)
            return a.objectStoreNames[1]
              ? void 0
              : a.objectStore(a.objectStoreNames[0]);
        }
        return N(e[t]);
      },
      set: (e, t, a) => ((e[t] = a), !0),
      has: (e, t) =>
        (e instanceof IDBTransaction && ("done" === t || "store" === t)) ||
        t in e,
    };
  function N(e) {
    var t;
    if (e instanceof IDBRequest)
      return (function (e) {
        let t = new Promise((t, a) => {
          let s = () => {
              e.removeEventListener("success", r),
                e.removeEventListener("error", n);
            },
            r = () => {
              t(N(e.result)), s();
            },
            n = () => {
              a(e.error), s();
            };
          e.addEventListener("success", r), e.addEventListener("error", n);
        });
        return S.set(t, e), t;
      })(e);
    if (q.has(e)) return q.get(e);
    let a =
      "function" == typeof (t = e)
        ? (
            r ||
            (r = [
              IDBCursor.prototype.advance,
              IDBCursor.prototype.continue,
              IDBCursor.prototype.continuePrimaryKey,
            ])
          ).includes(t)
          ? function (...e) {
              return t.apply(P(this), e), N(this.request);
            }
          : function (...e) {
              return N(t.apply(P(this), e));
            }
        : (t instanceof IDBTransaction &&
            (function (e) {
              if (R.has(e)) return;
              let t = new Promise((t, a) => {
                let s = () => {
                    e.removeEventListener("complete", r),
                      e.removeEventListener("error", n),
                      e.removeEventListener("abort", n);
                  },
                  r = () => {
                    t(), s();
                  },
                  n = () => {
                    a(e.error || new DOMException("AbortError", "AbortError")),
                      s();
                  };
                e.addEventListener("complete", r),
                  e.addEventListener("error", n),
                  e.addEventListener("abort", n);
              });
              R.set(e, t);
            })(t),
          v(
            t,
            s ||
              (s = [
                IDBDatabase,
                IDBObjectStore,
                IDBIndex,
                IDBCursor,
                IDBTransaction,
              ])
          ))
        ? new Proxy(t, D)
        : t;
    return a !== e && (q.set(e, a), S.set(a, e)), a;
  }
  let P = (e) => S.get(e);
  function C(
    e,
    t,
    { blocked: a, upgrade: s, blocking: r, terminated: n } = {}
  ) {
    let i = indexedDB.open(e, t),
      c = N(i);
    return (
      s &&
        i.addEventListener("upgradeneeded", (e) => {
          s(N(i.result), e.oldVersion, e.newVersion, N(i.transaction), e);
        }),
      a &&
        i.addEventListener("blocked", (e) => a(e.oldVersion, e.newVersion, e)),
      c
        .then((e) => {
          n && e.addEventListener("close", () => n()),
            r &&
              e.addEventListener("versionchange", (e) =>
                r(e.oldVersion, e.newVersion, e)
              );
        })
        .catch(() => {}),
      c
    );
  }
  let T = ["get", "getKey", "getAll", "getAllKeys", "count"],
    A = ["put", "add", "delete", "clear"],
    k = new Map();
  function I(e, t) {
    if (!(e instanceof IDBDatabase && !(t in e) && "string" == typeof t))
      return;
    if (k.get(t)) return k.get(t);
    let a = t.replace(/FromIndex$/, ""),
      s = t !== a,
      r = A.includes(a);
    if (
      !(a in (s ? IDBIndex : IDBObjectStore).prototype) ||
      !(r || T.includes(a))
    )
      return;
    let n = async function (e, ...t) {
      let n = this.transaction(e, r ? "readwrite" : "readonly"),
        i = n.store;
      return (
        s && (i = i.index(t.shift())),
        (await Promise.all([i[a](...t), r && n.done]))[0]
      );
    };
    return k.set(t, n), n;
  }
  D = {
    ...(e = D),
    get: (t, a, s) => I(t, a) || e.get(t, a, s),
    has: (t, a) => !!I(t, a) || e.has(t, a),
  };
  let U = ["continue", "continuePrimaryKey", "advance"],
    L = {},
    F = new WeakMap(),
    O = new WeakMap(),
    M = {
      get(e, t) {
        if (!U.includes(t)) return e[t];
        let a = L[t];
        return (
          a ||
            (a = L[t] =
              function (...e) {
                F.set(this, O.get(this)[t](...e));
              }),
          a
        );
      },
    };
  async function* B(...e) {
    let t = this;
    if ((t instanceof IDBCursor || (t = await t.openCursor(...e)), !t)) return;
    let a = new Proxy(t, M);
    for (O.set(a, t), S.set(a, P(t)); t; )
      yield a, (t = await (F.get(a) || t.continue())), F.delete(a);
  }
  function K(e, t) {
    return (
      (t === Symbol.asyncIterator &&
        v(e, [IDBIndex, IDBObjectStore, IDBCursor])) ||
      ("iterate" === t && v(e, [IDBIndex, IDBObjectStore]))
    );
  }
  D = {
    ...(t = D),
    get: (e, a, s) => (K(e, a) ? B : t.get(e, a, s)),
    has: (e, a) => K(e, a) || t.has(e, a),
  };
  let W = (e) => (e && "object" == typeof e ? e : { handle: e });
  class j {
    handler;
    match;
    method;
    catchHandler;
    constructor(e, t, a = "GET") {
      (this.handler = W(t)), (this.match = e), (this.method = a);
    }
    setCatchHandler(e) {
      this.catchHandler = W(e);
    }
  }
  class $ extends j {
    _allowlist;
    _denylist;
    constructor(e, { allowlist: t = [/./], denylist: a = [] } = {}) {
      super((e) => this._match(e), e),
        (this._allowlist = t),
        (this._denylist = a);
    }
    _match({ url: e, request: t }) {
      if (t && "navigate" !== t.mode) return !1;
      let a = e.pathname + e.search;
      for (let e of this._denylist) if (e.test(a)) return !1;
      return !!this._allowlist.some((e) => e.test(a));
    }
  }
  let H = (e, t = []) => {
    for (let a of [...e.searchParams.keys()])
      t.some((e) => e.test(a)) && e.searchParams.delete(a);
    return e;
  };
  class G extends j {
    constructor(e, t, a) {
      super(
        ({ url: t }) => {
          let a = e.exec(t.href);
          if (a && (t.origin === location.origin || 0 === a.index))
            return a.slice(1);
        },
        t,
        a
      );
    }
  }
  let V = async (e, t, a) => {
      let s = t.map((e, t) => ({ index: t, item: e })),
        r = async (e) => {
          let t = [];
          for (;;) {
            let r = s.pop();
            if (!r) return e(t);
            let n = await a(r.item);
            t.push({ result: n, index: r.index });
          }
        },
        n = Array.from({ length: e }, () => new Promise(r));
      return (await Promise.all(n))
        .flat()
        .sort((e, t) => (e.index < t.index ? -1 : 1))
        .map((e) => e.result);
    },
    Q = () => {
      self.__WB_DISABLE_DEV_LOGS = !0;
    };
  function z(e) {
    return "string" == typeof e ? new Request(e) : e;
  }
  class J {
    event;
    request;
    url;
    params;
    _cacheKeys = {};
    _strategy;
    _handlerDeferred;
    _extendLifetimePromises;
    _plugins;
    _pluginStateMap;
    constructor(e, t) {
      for (let a of ((this.event = t.event),
      (this.request = t.request),
      t.url && ((this.url = t.url), (this.params = t.params)),
      (this._strategy = e),
      (this._handlerDeferred = new d()),
      (this._extendLifetimePromises = []),
      (this._plugins = [...e.plugins]),
      (this._pluginStateMap = new Map()),
      this._plugins))
        this._pluginStateMap.set(a, {});
      this.event.waitUntil(this._handlerDeferred.promise);
    }
    async fetch(e) {
      let { event: t } = this,
        a = z(e),
        s = await this.getPreloadResponse();
      if (s) return s;
      let r = this.hasCallback("fetchDidFail") ? a.clone() : null;
      try {
        for (let e of this.iterateCallbacks("requestWillFetch"))
          a = await e({ request: a.clone(), event: t });
      } catch (e) {
        if (e instanceof Error)
          throw new i("plugin-error-request-will-fetch", {
            thrownErrorMessage: e.message,
          });
      }
      let n = a.clone();
      try {
        let e;
        for (let s of ((e = await fetch(
          a,
          "navigate" === a.mode ? void 0 : this._strategy.fetchOptions
        )),
        this.iterateCallbacks("fetchDidSucceed")))
          e = await s({ event: t, request: n, response: e });
        return e;
      } catch (e) {
        throw (
          (r &&
            (await this.runCallbacks("fetchDidFail", {
              error: e,
              event: t,
              originalRequest: r.clone(),
              request: n.clone(),
            })),
          e)
        );
      }
    }
    async fetchAndCachePut(e) {
      let t = await this.fetch(e),
        a = t.clone();
      return this.waitUntil(this.cachePut(e, a)), t;
    }
    async cacheMatch(e) {
      let t;
      let a = z(e),
        { cacheName: s, matchOptions: r } = this._strategy,
        n = await this.getCacheKey(a, "read"),
        i = { ...r, cacheName: s };
      for (let e of ((t = await caches.match(n, i)),
      this.iterateCallbacks("cachedResponseWillBeUsed")))
        t =
          (await e({
            cacheName: s,
            matchOptions: r,
            cachedResponse: t,
            request: n,
            event: this.event,
          })) || void 0;
      return t;
    }
    async cachePut(e, t) {
      let a = z(e);
      await w(0);
      let s = await this.getCacheKey(a, "write");
      if (!t) throw new i("cache-put-with-no-response", { url: c(s.url) });
      let r = await this._ensureResponseSafeToCache(t);
      if (!r) return !1;
      let { cacheName: n, matchOptions: o } = this._strategy,
        l = await self.caches.open(n),
        h = this.hasCallback("cacheDidUpdate"),
        u = h ? await f(l, s.clone(), ["__WB_REVISION__"], o) : null;
      try {
        await l.put(s, h ? r.clone() : r);
      } catch (e) {
        if (e instanceof Error)
          throw ("QuotaExceededError" === e.name && (await p()), e);
      }
      for (let e of this.iterateCallbacks("cacheDidUpdate"))
        await e({
          cacheName: n,
          oldResponse: u,
          newResponse: r.clone(),
          request: s,
          event: this.event,
        });
      return !0;
    }
    async getCacheKey(e, t) {
      let a = `${e.url} | ${t}`;
      if (!this._cacheKeys[a]) {
        let s = e;
        for (let e of this.iterateCallbacks("cacheKeyWillBeUsed"))
          s = z(
            await e({
              mode: t,
              request: s,
              event: this.event,
              params: this.params,
            })
          );
        this._cacheKeys[a] = s;
      }
      return this._cacheKeys[a];
    }
    hasCallback(e) {
      for (let t of this._strategy.plugins) if (e in t) return !0;
      return !1;
    }
    async runCallbacks(e, t) {
      for (let a of this.iterateCallbacks(e)) await a(t);
    }
    *iterateCallbacks(e) {
      for (let t of this._strategy.plugins)
        if ("function" == typeof t[e]) {
          let a = this._pluginStateMap.get(t),
            s = (s) => {
              let r = { ...s, state: a };
              return t[e](r);
            };
          yield s;
        }
    }
    waitUntil(e) {
      return this._extendLifetimePromises.push(e), e;
    }
    async doneWaiting() {
      let e;
      for (; (e = this._extendLifetimePromises.shift()); ) await e;
    }
    destroy() {
      this._handlerDeferred.resolve(null);
    }
    async getPreloadResponse() {
      if (
        this.event instanceof FetchEvent &&
        "navigate" === this.event.request.mode &&
        "preloadResponse" in this.event
      )
        try {
          let e = await this.event.preloadResponse;
          if (e) return e;
        } catch (e) {}
    }
    async _ensureResponseSafeToCache(e) {
      let t = e,
        a = !1;
      for (let e of this.iterateCallbacks("cacheWillUpdate"))
        if (
          ((t =
            (await e({
              request: this.request,
              response: t,
              event: this.event,
            })) || void 0),
          (a = !0),
          !t)
        )
          break;
      return !a && t && 200 !== t.status && (t = void 0), t;
    }
  }
  class Y {
    cacheName;
    plugins;
    fetchOptions;
    matchOptions;
    constructor(e = {}) {
      (this.cacheName = u.getRuntimeName(e.cacheName)),
        (this.plugins = e.plugins || []),
        (this.fetchOptions = e.fetchOptions),
        (this.matchOptions = e.matchOptions);
    }
    handle(e) {
      let [t] = this.handleAll(e);
      return t;
    }
    handleAll(e) {
      e instanceof FetchEvent && (e = { event: e, request: e.request });
      let t = e.event,
        a = "string" == typeof e.request ? new Request(e.request) : e.request,
        s = new J(
          this,
          e.url
            ? { event: t, request: a, url: e.url, params: e.params }
            : { event: t, request: a }
        ),
        r = this._getResponse(s, a, t),
        n = this._awaitComplete(r, s, a, t);
      return [r, n];
    }
    async _getResponse(e, t, a) {
      let s;
      await e.runCallbacks("handlerWillStart", { event: a, request: t });
      try {
        if (
          ((s = await this._handle(t, e)), void 0 === s || "error" === s.type)
        )
          throw new i("no-response", { url: t.url });
      } catch (r) {
        if (r instanceof Error) {
          for (let n of e.iterateCallbacks("handlerDidError"))
            if (void 0 !== (s = await n({ error: r, event: a, request: t })))
              break;
        }
        if (!s) throw r;
      }
      for (let r of e.iterateCallbacks("handlerWillRespond"))
        s = await r({ event: a, request: t, response: s });
      return s;
    }
    async _awaitComplete(e, t, a, s) {
      let r, n;
      try {
        r = await e;
      } catch (e) {}
      try {
        await t.runCallbacks("handlerDidRespond", {
          event: s,
          request: a,
          response: r,
        }),
          await t.doneWaiting();
      } catch (e) {
        e instanceof Error && (n = e);
      }
      if (
        (await t.runCallbacks("handlerDidComplete", {
          event: s,
          request: a,
          response: r,
          error: n,
        }),
        t.destroy(),
        n)
      )
        throw n;
    }
  }
  let X = {
    cacheWillUpdate: async ({ response: e }) =>
      200 === e.status || 0 === e.status ? e : null,
  };
  class Z extends Y {
    _networkTimeoutSeconds;
    constructor(e = {}) {
      super(e),
        this.plugins.some((e) => "cacheWillUpdate" in e) ||
          this.plugins.unshift(X),
        (this._networkTimeoutSeconds = e.networkTimeoutSeconds || 0);
    }
    async _handle(e, t) {
      let a;
      let s = [],
        r = [];
      if (this._networkTimeoutSeconds) {
        let { id: n, promise: i } = this._getTimeoutPromise({
          request: e,
          logs: s,
          handler: t,
        });
        (a = n), r.push(i);
      }
      let n = this._getNetworkPromise({
        timeoutId: a,
        request: e,
        logs: s,
        handler: t,
      });
      r.push(n);
      let c = await t.waitUntil(
        (async () => (await t.waitUntil(Promise.race(r))) || (await n))()
      );
      if (!c) throw new i("no-response", { url: e.url });
      return c;
    }
    _getTimeoutPromise({ request: e, logs: t, handler: a }) {
      let s;
      return {
        promise: new Promise((t) => {
          s = setTimeout(async () => {
            t(await a.cacheMatch(e));
          }, 1e3 * this._networkTimeoutSeconds);
        }),
        id: s,
      };
    }
    async _getNetworkPromise({
      timeoutId: e,
      request: t,
      logs: a,
      handler: s,
    }) {
      let r, n;
      try {
        n = await s.fetchAndCachePut(t);
      } catch (e) {
        e instanceof Error && (r = e);
      }
      return e && clearTimeout(e), (r || !n) && (n = await s.cacheMatch(t)), n;
    }
  }
  class ee extends Y {
    _networkTimeoutSeconds;
    constructor(e = {}) {
      super(e), (this._networkTimeoutSeconds = e.networkTimeoutSeconds || 0);
    }
    async _handle(e, t) {
      let a, s;
      try {
        let s = [t.fetch(e)];
        if (this._networkTimeoutSeconds) {
          let e = w(1e3 * this._networkTimeoutSeconds);
          s.push(e);
        }
        if (!(a = await Promise.race(s)))
          throw Error(
            `Timed out the network response after ${this._networkTimeoutSeconds} seconds.`
          );
      } catch (e) {
        e instanceof Error && (s = e);
      }
      if (!a) throw new i("no-response", { url: e.url, error: s });
      return a;
    }
  }
  let et = "requests",
    ea = "queueName";
  class es {
    _db = null;
    async addEntry(e) {
      let t = (await this.getDb()).transaction(et, "readwrite", {
        durability: "relaxed",
      });
      await t.store.add(e), await t.done;
    }
    async getFirstEntryId() {
      let e = await this.getDb(),
        t = await e.transaction(et).store.openCursor();
      return t?.value.id;
    }
    async getAllEntriesByQueueName(e) {
      let t = await this.getDb();
      return (await t.getAllFromIndex(et, ea, IDBKeyRange.only(e))) || [];
    }
    async getEntryCountByQueueName(e) {
      return (await this.getDb()).countFromIndex(et, ea, IDBKeyRange.only(e));
    }
    async deleteEntry(e) {
      let t = await this.getDb();
      await t.delete(et, e);
    }
    async getFirstEntryByQueueName(e) {
      return await this.getEndEntryFromIndex(IDBKeyRange.only(e), "next");
    }
    async getLastEntryByQueueName(e) {
      return await this.getEndEntryFromIndex(IDBKeyRange.only(e), "prev");
    }
    async getEndEntryFromIndex(e, t) {
      let a = await this.getDb(),
        s = await a.transaction(et).store.index(ea).openCursor(e, t);
      return s?.value;
    }
    async getDb() {
      return (
        this._db ||
          (this._db = await C("serwist-background-sync", 3, {
            upgrade: this._upgradeDb,
          })),
        this._db
      );
    }
    _upgradeDb(e, t) {
      t > 0 &&
        t < 3 &&
        e.objectStoreNames.contains(et) &&
        e.deleteObjectStore(et),
        e
          .createObjectStore(et, { autoIncrement: !0, keyPath: "id" })
          .createIndex(ea, ea, { unique: !1 });
    }
  }
  class er {
    _queueName;
    _queueDb;
    constructor(e) {
      (this._queueName = e), (this._queueDb = new es());
    }
    async pushEntry(e) {
      delete e.id,
        (e.queueName = this._queueName),
        await this._queueDb.addEntry(e);
    }
    async unshiftEntry(e) {
      let t = await this._queueDb.getFirstEntryId();
      t ? (e.id = t - 1) : delete e.id,
        (e.queueName = this._queueName),
        await this._queueDb.addEntry(e);
    }
    async popEntry() {
      return this._removeEntry(
        await this._queueDb.getLastEntryByQueueName(this._queueName)
      );
    }
    async shiftEntry() {
      return this._removeEntry(
        await this._queueDb.getFirstEntryByQueueName(this._queueName)
      );
    }
    async getAll() {
      return await this._queueDb.getAllEntriesByQueueName(this._queueName);
    }
    async size() {
      return await this._queueDb.getEntryCountByQueueName(this._queueName);
    }
    async deleteEntry(e) {
      await this._queueDb.deleteEntry(e);
    }
    async _removeEntry(e) {
      return e && (await this.deleteEntry(e.id)), e;
    }
  }
  let en = [
    "method",
    "referrer",
    "referrerPolicy",
    "mode",
    "credentials",
    "cache",
    "redirect",
    "integrity",
    "keepalive",
  ];
  class ei {
    _requestData;
    static async fromRequest(e) {
      let t = { url: e.url, headers: {} };
      for (let a of ("GET" !== e.method &&
        (t.body = await e.clone().arrayBuffer()),
      e.headers.forEach((e, a) => {
        t.headers[a] = e;
      }),
      en))
        void 0 !== e[a] && (t[a] = e[a]);
      return new ei(t);
    }
    constructor(e) {
      "navigate" === e.mode && (e.mode = "same-origin"),
        (this._requestData = e);
    }
    toObject() {
      let e = Object.assign({}, this._requestData);
      return (
        (e.headers = Object.assign({}, this._requestData.headers)),
        e.body && (e.body = e.body.slice(0)),
        e
      );
    }
    toRequest() {
      return new Request(this._requestData.url, this._requestData);
    }
    clone() {
      return new ei(this.toObject());
    }
  }
  let ec = "serwist-background-sync",
    eo = new Set(),
    el = (e) => {
      let t = {
        request: new ei(e.requestData).toRequest(),
        timestamp: e.timestamp,
      };
      return e.metadata && (t.metadata = e.metadata), t;
    };
  class eh {
    _name;
    _onSync;
    _maxRetentionTime;
    _queueStore;
    _forceSyncFallback;
    _syncInProgress = !1;
    _requestsAddedDuringSync = !1;
    constructor(
      e,
      { forceSyncFallback: t, onSync: a, maxRetentionTime: s } = {}
    ) {
      if (eo.has(e)) throw new i("duplicate-queue-name", { name: e });
      eo.add(e),
        (this._name = e),
        (this._onSync = a || this.replayRequests),
        (this._maxRetentionTime = s || 10080),
        (this._forceSyncFallback = !!t),
        (this._queueStore = new er(this._name)),
        this._addSyncListener();
    }
    get name() {
      return this._name;
    }
    async pushRequest(e) {
      await this._addRequest(e, "push");
    }
    async unshiftRequest(e) {
      await this._addRequest(e, "unshift");
    }
    async popRequest() {
      return this._removeRequest("pop");
    }
    async shiftRequest() {
      return this._removeRequest("shift");
    }
    async getAll() {
      let e = await this._queueStore.getAll(),
        t = Date.now(),
        a = [];
      for (let s of e) {
        let e = 6e4 * this._maxRetentionTime;
        t - s.timestamp > e
          ? await this._queueStore.deleteEntry(s.id)
          : a.push(el(s));
      }
      return a;
    }
    async size() {
      return await this._queueStore.size();
    }
    async _addRequest(
      { request: e, metadata: t, timestamp: a = Date.now() },
      s
    ) {
      let r = {
        requestData: (await ei.fromRequest(e.clone())).toObject(),
        timestamp: a,
      };
      switch ((t && (r.metadata = t), s)) {
        case "push":
          await this._queueStore.pushEntry(r);
          break;
        case "unshift":
          await this._queueStore.unshiftEntry(r);
      }
      this._syncInProgress
        ? (this._requestsAddedDuringSync = !0)
        : await this.registerSync();
    }
    async _removeRequest(e) {
      let t;
      let a = Date.now();
      switch (e) {
        case "pop":
          t = await this._queueStore.popEntry();
          break;
        case "shift":
          t = await this._queueStore.shiftEntry();
      }
      if (t) {
        let s = 6e4 * this._maxRetentionTime;
        return a - t.timestamp > s ? this._removeRequest(e) : el(t);
      }
    }
    async replayRequests() {
      let e;
      for (; (e = await this.shiftRequest()); )
        try {
          await fetch(e.request.clone());
        } catch (t) {
          throw (
            (await this.unshiftRequest(e),
            new i("queue-replay-failed", { name: this._name }))
          );
        }
    }
    async registerSync() {
      if ("sync" in self.registration && !this._forceSyncFallback)
        try {
          await self.registration.sync.register(`${ec}:${this._name}`);
        } catch (e) {}
    }
    _addSyncListener() {
      "sync" in self.registration && !this._forceSyncFallback
        ? self.addEventListener("sync", (e) => {
            if (e.tag === `${ec}:${this._name}`) {
              let t = async () => {
                let t;
                this._syncInProgress = !0;
                try {
                  await this._onSync({ queue: this });
                } catch (e) {
                  if (e instanceof Error) throw e;
                } finally {
                  this._requestsAddedDuringSync &&
                    !(t && !e.lastChance) &&
                    (await this.registerSync()),
                    (this._syncInProgress = !1),
                    (this._requestsAddedDuringSync = !1);
                }
              };
              e.waitUntil(t());
            }
          })
        : this._onSync({ queue: this });
    }
    static get _queueNames() {
      return eo;
    }
  }
  class eu {
    _queue;
    constructor(e, t) {
      this._queue = new eh(e, t);
    }
    async fetchDidFail({ request: e }) {
      await this._queue.pushRequest({ request: e });
    }
  }
  let ed = async (e, t) => {
    let s = null;
    if ((e.url && (s = new URL(e.url).origin), s !== self.location.origin))
      throw new i("cross-origin-copy-response", { origin: s });
    let r = e.clone(),
      n = {
        headers: new Headers(r.headers),
        status: r.status,
        statusText: r.statusText,
      },
      c = t ? t(n) : n,
      o = !(function () {
        if (void 0 === a) {
          let e = new Response("");
          if ("body" in e)
            try {
              new Response(e.body), (a = !0);
            } catch (e) {
              a = !1;
            }
          a = !1;
        }
        return a;
      })()
        ? await r.blob()
        : r.body;
    return new Response(o, c);
  };
  class em extends Y {
    _fallbackToNetwork;
    static defaultPrecacheCacheabilityPlugin = {
      cacheWillUpdate: async ({ response: e }) =>
        !e || e.status >= 400 ? null : e,
    };
    static copyRedirectedCacheableResponsesPlugin = {
      cacheWillUpdate: async ({ response: e }) =>
        e.redirected ? await ed(e) : e,
    };
    constructor(e = {}) {
      (e.cacheName = u.getPrecacheName(e.cacheName)),
        super(e),
        (this._fallbackToNetwork = !1 !== e.fallbackToNetwork),
        this.plugins.push(em.copyRedirectedCacheableResponsesPlugin);
    }
    async _handle(e, t) {
      let a = await t.getPreloadResponse();
      return a
        ? a
        : (await t.cacheMatch(e)) ||
            (t.event && "install" === t.event.type
              ? await this._handleInstall(e, t)
              : await this._handleFetch(e, t));
    }
    async _handleFetch(e, t) {
      let a;
      let s = t.params || {};
      if (this._fallbackToNetwork) {
        let r = s.integrity,
          n = e.integrity,
          i = !n || n === r;
        (a = await t.fetch(
          new Request(e, { integrity: "no-cors" !== e.mode ? n || r : void 0 })
        )),
          r &&
            i &&
            "no-cors" !== e.mode &&
            (this._useDefaultCacheabilityPluginIfNeeded(),
            await t.cachePut(e, a.clone()));
      } else
        throw new i("missing-precache-entry", {
          cacheName: this.cacheName,
          url: e.url,
        });
      return a;
    }
    async _handleInstall(e, t) {
      this._useDefaultCacheabilityPluginIfNeeded();
      let a = await t.fetch(e);
      if (!(await t.cachePut(e, a.clone())))
        throw new i("bad-precaching-response", {
          url: e.url,
          status: a.status,
        });
      return a;
    }
    _useDefaultCacheabilityPluginIfNeeded() {
      let e = null,
        t = 0;
      for (let [a, s] of this.plugins.entries())
        s !== em.copyRedirectedCacheableResponsesPlugin &&
          (s === em.defaultPrecacheCacheabilityPlugin && (e = a),
          s.cacheWillUpdate && t++);
      0 === t
        ? this.plugins.push(em.defaultPrecacheCacheabilityPlugin)
        : t > 1 && null !== e && this.plugins.splice(e, 1);
    }
  }
  let ef = () => !!self.registration?.navigationPreload,
    eg = (e) => {
      ef() &&
        self.addEventListener("activate", (t) => {
          t.waitUntil(
            self.registration.navigationPreload.enable().then(() => {
              e && self.registration.navigationPreload.setHeaderValue(e);
            })
          );
        });
    },
    ep = (e) => {
      u.updateDetails(e);
    };
  class ew {
    updatedURLs = [];
    notUpdatedURLs = [];
    handlerWillStart = async ({ request: e, state: t }) => {
      t && (t.originalRequest = e);
    };
    cachedResponseWillBeUsed = async ({
      event: e,
      state: t,
      cachedResponse: a,
    }) => {
      if (
        "install" === e.type &&
        t?.originalRequest &&
        t.originalRequest instanceof Request
      ) {
        let e = t.originalRequest.url;
        a ? this.notUpdatedURLs.push(e) : this.updatedURLs.push(e);
      }
      return a;
    };
  }
  let ey = (e) => {
      if (!e) throw new i("add-to-cache-list-unexpected-type", { entry: e });
      if ("string" == typeof e) {
        let t = new URL(e, location.href);
        return { cacheKey: t.href, url: t.href };
      }
      let { revision: t, url: a } = e;
      if (!a) throw new i("add-to-cache-list-unexpected-type", { entry: e });
      if (!t) {
        let e = new URL(a, location.href);
        return { cacheKey: e.href, url: e.href };
      }
      let s = new URL(a, location.href),
        r = new URL(a, location.href);
      return (
        s.searchParams.set("__WB_REVISION__", t),
        { cacheKey: s.href, url: r.href }
      );
    },
    e_ = (e, t, a) => {
      if ("string" == typeof e) {
        let s = new URL(e, location.href);
        return new j(({ url: e }) => e.href === s.href, t, a);
      }
      if (e instanceof RegExp) return new G(e, t, a);
      if ("function" == typeof e) return new j(e, t, a);
      if (e instanceof j) return e;
      throw new i("unsupported-route-type", {
        moduleName: "serwist",
        funcName: "parseRoute",
        paramName: "capture",
      });
    };
  class ex extends j {
    constructor(e, t) {
      super(({ request: a }) => {
        let s = e.getUrlsToPrecacheKeys();
        for (let r of (function* (
          e,
          {
            directoryIndex: t = "index.html",
            ignoreURLParametersMatching: a = [/^utm_/, /^fbclid$/],
            cleanURLs: s = !0,
            urlManipulation: r,
          } = {}
        ) {
          let n = new URL(e, location.href);
          (n.hash = ""), yield n.href;
          let i = H(n, a);
          if ((yield i.href, t && i.pathname.endsWith("/"))) {
            let e = new URL(i.href);
            (e.pathname += t), yield e.href;
          }
          if (s) {
            let e = new URL(i.href);
            (e.pathname += ".html"), yield e.href;
          }
          if (r) for (let e of r({ url: n })) yield e.href;
        })(a.url, t)) {
          let t = s.get(r);
          if (t) {
            let a = e.getIntegrityForPrecacheKey(t);
            return { cacheKey: t, integrity: a };
          }
        }
      }, e.precacheStrategy);
    }
  }
  let eb = "www.google-analytics.com",
    eE = "www.googletagmanager.com",
    ev = /^\/(\w+\/)?collect/,
    eR =
      (e) =>
      async ({ queue: t }) => {
        let a;
        for (; (a = await t.shiftRequest()); ) {
          let { request: s, timestamp: r } = a,
            n = new URL(s.url);
          try {
            let t =
                "POST" === s.method
                  ? new URLSearchParams(await s.clone().text())
                  : n.searchParams,
              a = r - (Number(t.get("qt")) || 0),
              i = Date.now() - a;
            if ((t.set("qt", String(i)), e.parameterOverrides))
              for (let a of Object.keys(e.parameterOverrides)) {
                let s = e.parameterOverrides[a];
                t.set(a, s);
              }
            "function" == typeof e.hitFilter && e.hitFilter.call(null, t),
              await fetch(
                new Request(n.origin + n.pathname, {
                  body: t.toString(),
                  method: "POST",
                  mode: "cors",
                  credentials: "omit",
                  headers: { "Content-Type": "text/plain" },
                })
              );
          } catch (e) {
            throw (await t.unshiftRequest(a), e);
          }
        }
      },
    eq = (e) => {
      let t = ({ url: e }) => e.hostname === eb && ev.test(e.pathname),
        a = new ee({ plugins: [e] });
      return [new j(t, a, "GET"), new j(t, a, "POST")];
    },
    eS = (e) =>
      new j(
        ({ url: e }) => e.hostname === eb && "/analytics.js" === e.pathname,
        new Z({ cacheName: e }),
        "GET"
      ),
    eD = (e) =>
      new j(
        ({ url: e }) => e.hostname === eE && "/gtag/js" === e.pathname,
        new Z({ cacheName: e }),
        "GET"
      ),
    eN = (e) =>
      new j(
        ({ url: e }) => e.hostname === eE && "/gtm.js" === e.pathname,
        new Z({ cacheName: e }),
        "GET"
      ),
    eP = ({ serwist: e, cacheName: t, ...a }) => {
      let s = u.getGoogleAnalyticsName(t),
        r = new eu("serwist-google-analytics", {
          maxRetentionTime: 2880,
          onSync: eR(a),
        });
      for (let t of [eN(s), eS(s), eD(s), ...eq(r)]) e.registerRoute(t);
    };
  class eC {
    _fallbackUrls;
    _serwist;
    constructor({ fallbackUrls: e, serwist: t }) {
      (this._fallbackUrls = e), (this._serwist = t);
    }
    async handlerDidError(e) {
      for (let t of this._fallbackUrls)
        if ("string" == typeof t) {
          let e = await this._serwist.matchPrecache(t);
          if (void 0 !== e) return e;
        } else if (t.matcher(e)) {
          let e = await this._serwist.matchPrecache(t.url);
          if (void 0 !== e) return e;
        }
    }
  }
  class eT {
    _precacheController;
    constructor({ precacheController: e }) {
      this._precacheController = e;
    }
    cacheKeyWillBeUsed = async ({ request: e, params: t }) => {
      let a =
        t?.cacheKey || this._precacheController.getPrecacheKeyForUrl(e.url);
      return a ? new Request(a, { headers: e.headers }) : e;
    };
  }
  let eA = (e, t = {}) => {
    let {
      cacheName: a,
      plugins: s = [],
      fetchOptions: r,
      matchOptions: n,
      fallbackToNetwork: i,
      directoryIndex: c,
      ignoreURLParametersMatching: o,
      cleanURLs: l,
      urlManipulation: h,
      cleanupOutdatedCaches: d,
      concurrency: m = 10,
      navigateFallback: f,
      navigateFallbackAllowlist: g,
      navigateFallbackDenylist: p,
    } = t ?? {};
    return {
      precacheStrategyOptions: {
        cacheName: u.getPrecacheName(a),
        plugins: [...s, new eT({ precacheController: e })],
        fetchOptions: r,
        matchOptions: n,
        fallbackToNetwork: i,
      },
      precacheRouteOptions: {
        directoryIndex: c,
        ignoreURLParametersMatching: o,
        cleanURLs: l,
        urlManipulation: h,
      },
      precacheMiscOptions: {
        cleanupOutdatedCaches: d,
        concurrency: m,
        navigateFallback: f,
        navigateFallbackAllowlist: g,
        navigateFallbackDenylist: p,
      },
    };
  };
  class ek {
    _urlsToCacheKeys = new Map();
    _urlsToCacheModes = new Map();
    _cacheKeysToIntegrities = new Map();
    _concurrentPrecaching;
    _precacheStrategy;
    _routes;
    _defaultHandlerMap;
    _catchHandler;
    constructor({
      precacheEntries: e,
      precacheOptions: t,
      skipWaiting: a = !1,
      importScripts: s,
      navigationPreload: r = !1,
      cacheId: n,
      clientsClaim: i = !1,
      runtimeCaching: c,
      offlineAnalyticsConfig: o,
      disableDevLogs: l = !1,
      fallbacks: h,
    } = {}) {
      let {
        precacheStrategyOptions: u,
        precacheRouteOptions: d,
        precacheMiscOptions: m,
      } = eA(this, t);
      if (
        ((this._concurrentPrecaching = m.concurrency),
        (this._precacheStrategy = new em(u)),
        (this._routes = new Map()),
        (this._defaultHandlerMap = new Map()),
        (this.handleInstall = this.handleInstall.bind(this)),
        (this.handleActivate = this.handleActivate.bind(this)),
        (this.handleFetch = this.handleFetch.bind(this)),
        (this.handleCache = this.handleCache.bind(this)),
        s && s.length > 0 && self.importScripts(...s),
        r && eg(),
        void 0 !== n && ep({ prefix: n }),
        a
          ? self.skipWaiting()
          : self.addEventListener("message", (e) => {
              e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
            }),
        i && b(),
        e && e.length > 0 && this.addToPrecacheList(e),
        m.cleanupOutdatedCaches && x(u.cacheName),
        this.registerRoute(new ex(this, d)),
        m.navigateFallback &&
          this.registerRoute(
            new $(this.createHandlerBoundToUrl(m.navigateFallback), {
              allowlist: m.navigateFallbackAllowlist,
              denylist: m.navigateFallbackDenylist,
            })
          ),
        void 0 !== o &&
          ("boolean" == typeof o
            ? o && eP({ serwist: this })
            : eP({ ...o, serwist: this })),
        void 0 !== c)
      ) {
        if (void 0 !== h) {
          let e = new eC({ fallbackUrls: h.entries, serwist: this });
          c.forEach((t) => {
            t.handler instanceof Y &&
              !t.handler.plugins.some((e) => "handlerDidError" in e) &&
              t.handler.plugins.push(e);
          });
        }
        for (let e of c) this.registerCapture(e.matcher, e.handler, e.method);
      }
      l && Q();
    }
    get precacheStrategy() {
      return this._precacheStrategy;
    }
    get routes() {
      return this._routes;
    }
    addEventListeners() {
      self.addEventListener("install", this.handleInstall),
        self.addEventListener("activate", this.handleActivate),
        self.addEventListener("fetch", this.handleFetch),
        self.addEventListener("message", this.handleCache);
    }
    addToPrecacheList(e) {
      let t = [];
      for (let a of e) {
        "string" == typeof a
          ? t.push(a)
          : a && !a.integrity && void 0 === a.revision && t.push(a.url);
        let { cacheKey: e, url: s } = ey(a),
          r = "string" != typeof a && a.revision ? "reload" : "default";
        if (this._urlsToCacheKeys.has(s) && this._urlsToCacheKeys.get(s) !== e)
          throw new i("add-to-cache-list-conflicting-entries", {
            firstEntry: this._urlsToCacheKeys.get(s),
            secondEntry: e,
          });
        if ("string" != typeof a && a.integrity) {
          if (
            this._cacheKeysToIntegrities.has(e) &&
            this._cacheKeysToIntegrities.get(e) !== a.integrity
          )
            throw new i("add-to-cache-list-conflicting-integrities", {
              url: s,
            });
          this._cacheKeysToIntegrities.set(e, a.integrity);
        }
        this._urlsToCacheKeys.set(s, e),
          this._urlsToCacheModes.set(s, r),
          t.length > 0 &&
            console.warn(`Serwist is precaching URLs without revision info: ${t.join(
              ", "
            )}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`);
      }
    }
    handleInstall(e) {
      return E(e, async () => {
        let t = new ew();
        this.precacheStrategy.plugins.push(t),
          await V(
            this._concurrentPrecaching,
            Array.from(this._urlsToCacheKeys.entries()),
            async ([t, a]) => {
              let s = this._cacheKeysToIntegrities.get(a),
                r = this._urlsToCacheModes.get(t),
                n = new Request(t, {
                  integrity: s,
                  cache: r,
                  credentials: "same-origin",
                });
              await Promise.all(
                this.precacheStrategy.handleAll({
                  event: e,
                  request: n,
                  url: new URL(n.url),
                  params: { cacheKey: a },
                })
              );
            }
          );
        let { updatedURLs: a, notUpdatedURLs: s } = t;
        return { updatedURLs: a, notUpdatedURLs: s };
      });
    }
    handleActivate(e) {
      return E(e, async () => {
        let e = await self.caches.open(this.precacheStrategy.cacheName),
          t = await e.keys(),
          a = new Set(this._urlsToCacheKeys.values()),
          s = [];
        for (let r of t) a.has(r.url) || (await e.delete(r), s.push(r.url));
        return { deletedCacheRequests: s };
      });
    }
    handleFetch(e) {
      let { request: t } = e,
        a = this.handleRequest({ request: t, event: e });
      a && e.respondWith(a);
    }
    handleCache(e) {
      if (e.data && "CACHE_URLS" === e.data.type) {
        let { payload: t } = e.data,
          a = Promise.all(
            t.urlsToCache.map((t) => {
              let a;
              return (
                (a = "string" == typeof t ? new Request(t) : new Request(...t)),
                this.handleRequest({ request: a, event: e })
              );
            })
          );
        e.waitUntil(a),
          e.ports?.[0] && a.then(() => e.ports[0].postMessage(!0));
      }
    }
    setDefaultHandler(e, t = "GET") {
      this._defaultHandlerMap.set(t, W(e));
    }
    setCatchHandler(e) {
      this._catchHandler = W(e);
    }
    registerCapture(e, t, a) {
      let s = e_(e, t, a);
      return this.registerRoute(s), s;
    }
    registerRoute(e) {
      this._routes.has(e.method) || this._routes.set(e.method, []),
        this._routes.get(e.method).push(e);
    }
    unregisterRoute(e) {
      if (!this._routes.has(e.method))
        throw new i("unregister-route-but-not-found-with-method", {
          method: e.method,
        });
      let t = this._routes.get(e.method).indexOf(e);
      if (t > -1) this._routes.get(e.method).splice(t, 1);
      else throw new i("unregister-route-route-not-registered");
    }
    getUrlsToPrecacheKeys() {
      return this._urlsToCacheKeys;
    }
    getPrecachedUrls() {
      return [...this._urlsToCacheKeys.keys()];
    }
    getPrecacheKeyForUrl(e) {
      let t = new URL(e, location.href);
      return this._urlsToCacheKeys.get(t.href);
    }
    getIntegrityForPrecacheKey(e) {
      return this._cacheKeysToIntegrities.get(e);
    }
    async matchPrecache(e) {
      let t = e instanceof Request ? e.url : e,
        a = this.getPrecacheKeyForUrl(t);
      if (a)
        return (await self.caches.open(this.precacheStrategy.cacheName)).match(
          a
        );
    }
    createHandlerBoundToUrl(e) {
      let t = this.getPrecacheKeyForUrl(e);
      if (!t) throw new i("non-precached-url", { url: e });
      return (a) => (
        (a.request = new Request(e)),
        (a.params = { cacheKey: t, ...a.params }),
        this.precacheStrategy.handle(a)
      );
    }
    handleRequest({ request: e, event: t }) {
      let a;
      let s = new URL(e.url, location.href);
      if (!s.protocol.startsWith("http")) return;
      let r = s.origin === location.origin,
        { params: n, route: i } = this.findMatchingRoute({
          event: t,
          request: e,
          sameOrigin: r,
          url: s,
        }),
        c = i?.handler,
        o = e.method;
      if (
        (!c &&
          this._defaultHandlerMap.has(o) &&
          (c = this._defaultHandlerMap.get(o)),
        !c)
      )
        return;
      try {
        a = c.handle({ url: s, request: e, event: t, params: n });
      } catch (e) {
        a = Promise.reject(e);
      }
      let l = i?.catchHandler;
      return (
        a instanceof Promise &&
          (this._catchHandler || l) &&
          (a = a.catch(async (a) => {
            if (l)
              try {
                return await l.handle({
                  url: s,
                  request: e,
                  event: t,
                  params: n,
                });
              } catch (e) {
                e instanceof Error && (a = e);
              }
            if (this._catchHandler)
              return this._catchHandler.handle({
                url: s,
                request: e,
                event: t,
              });
            throw a;
          })),
        a
      );
    }
    findMatchingRoute({ url: e, sameOrigin: t, request: a, event: s }) {
      for (let r of this._routes.get(a.method) || []) {
        let n;
        let i = r.match({ url: e, sameOrigin: t, request: a, event: s });
        if (i)
          return (
            Array.isArray((n = i)) && 0 === n.length
              ? (n = void 0)
              : i.constructor === Object && 0 === Object.keys(i).length
              ? (n = void 0)
              : "boolean" == typeof i && (n = void 0),
            { route: r, params: n }
          );
      }
      return {};
    }
  }
  "undefined" != typeof navigator &&
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  let eI = "cache-entries",
    eU = (e) => {
      let t = new URL(e, location.href);
      return (t.hash = ""), t.href;
    };
  class eL {
    _cacheName;
    _db = null;
    constructor(e) {
      this._cacheName = e;
    }
    _getId(e) {
      return `${this._cacheName}|${eU(e)}`;
    }
    _upgradeDb(e) {
      let t = e.createObjectStore(eI, { keyPath: "id" });
      t.createIndex("cacheName", "cacheName", { unique: !1 }),
        t.createIndex("timestamp", "timestamp", { unique: !1 });
    }
    _upgradeDbAndDeleteOldDbs(e) {
      this._upgradeDb(e),
        this._cacheName &&
          (function (e, { blocked: t } = {}) {
            let a = indexedDB.deleteDatabase(e);
            t && a.addEventListener("blocked", (e) => t(e.oldVersion, e)),
              N(a).then(() => void 0);
          })(this._cacheName);
    }
    async setTimestamp(e, t) {
      e = eU(e);
      let a = {
          id: this._getId(e),
          cacheName: this._cacheName,
          url: e,
          timestamp: t,
        },
        s = (await this.getDb()).transaction(eI, "readwrite", {
          durability: "relaxed",
        });
      await s.store.put(a), await s.done;
    }
    async getTimestamp(e) {
      let t = await this.getDb(),
        a = await t.get(eI, this._getId(e));
      return a?.timestamp;
    }
    async expireEntries(e, t) {
      let a = await this.getDb(),
        s = await a
          .transaction(eI, "readwrite")
          .store.index("timestamp")
          .openCursor(null, "prev"),
        r = [],
        n = 0;
      for (; s; ) {
        let a = s.value;
        a.cacheName === this._cacheName &&
          ((e && a.timestamp < e) || (t && n >= t)
            ? (s.delete(), r.push(a.url))
            : n++),
          (s = await s.continue());
      }
      return r;
    }
    async getDb() {
      return (
        this._db ||
          (this._db = await C("serwist-expiration", 1, {
            upgrade: this._upgradeDbAndDeleteOldDbs.bind(this),
          })),
        this._db
      );
    }
  }
  class eF {
    _isRunning = !1;
    _rerunRequested = !1;
    _maxEntries;
    _maxAgeSeconds;
    _matchOptions;
    _cacheName;
    _timestampModel;
    constructor(e, t = {}) {
      (this._maxEntries = t.maxEntries),
        (this._maxAgeSeconds = t.maxAgeSeconds),
        (this._matchOptions = t.matchOptions),
        (this._cacheName = e),
        (this._timestampModel = new eL(e));
    }
    async expireEntries() {
      if (this._isRunning) {
        this._rerunRequested = !0;
        return;
      }
      this._isRunning = !0;
      let e = this._maxAgeSeconds ? Date.now() - 1e3 * this._maxAgeSeconds : 0,
        t = await this._timestampModel.expireEntries(e, this._maxEntries),
        a = await self.caches.open(this._cacheName);
      for (let e of t) await a.delete(e, this._matchOptions);
      (this._isRunning = !1),
        this._rerunRequested &&
          ((this._rerunRequested = !1), this.expireEntries());
    }
    async updateTimestamp(e) {
      await this._timestampModel.setTimestamp(e, Date.now());
    }
    async isURLExpired(e) {
      if (!this._maxAgeSeconds) return !1;
      let t = await this._timestampModel.getTimestamp(e),
        a = Date.now() - 1e3 * this._maxAgeSeconds;
      return void 0 === t || t < a;
    }
    async delete() {
      (this._rerunRequested = !1),
        await this._timestampModel.expireEntries(Number.POSITIVE_INFINITY);
    }
  }
  let eO = (e) => {
    g.add(e);
  };
  class eM {
    _config;
    _cacheExpirations;
    constructor(e = {}) {
      (this._config = e),
        (this._cacheExpirations = new Map()),
        this._config.maxAgeFrom || (this._config.maxAgeFrom = "last-fetched"),
        this._config.purgeOnQuotaError &&
          eO(() => this.deleteCacheAndMetadata());
    }
    _getCacheExpiration(e) {
      if (e === u.getRuntimeName()) throw new i("expire-custom-caches-only");
      let t = this._cacheExpirations.get(e);
      return (
        t || ((t = new eF(e, this._config)), this._cacheExpirations.set(e, t)),
        t
      );
    }
    cachedResponseWillBeUsed({
      event: e,
      cacheName: t,
      request: a,
      cachedResponse: s,
    }) {
      if (!s) return null;
      let r = this._isResponseDateFresh(s),
        n = this._getCacheExpiration(t),
        i = "last-used" === this._config.maxAgeFrom,
        c = (async () => {
          i && (await n.updateTimestamp(a.url)), await n.expireEntries();
        })();
      try {
        e.waitUntil(c);
      } catch (e) {}
      return r ? s : null;
    }
    _isResponseDateFresh(e) {
      if ("last-used" === this._config.maxAgeFrom) return !0;
      let t = Date.now();
      if (!this._config.maxAgeSeconds) return !0;
      let a = this._getDateHeaderTimestamp(e);
      return null === a || a >= t - 1e3 * this._config.maxAgeSeconds;
    }
    _getDateHeaderTimestamp(e) {
      if (!e.headers.has("date")) return null;
      let t = new Date(e.headers.get("date")).getTime();
      return Number.isNaN(t) ? null : t;
    }
    async cacheDidUpdate({ cacheName: e, request: t }) {
      let a = this._getCacheExpiration(e);
      await a.updateTimestamp(t.url), await a.expireEntries();
    }
    async deleteCacheAndMetadata() {
      for (let [e, t] of this._cacheExpirations)
        await self.caches.delete(e), await t.delete();
      this._cacheExpirations = new Map();
    }
  }
  let eB = (e, t, a) => {
      let s, r;
      let n = e.size;
      if ((a && a > n) || (t && t < 0))
        throw new i("range-not-satisfiable", { size: n, end: a, start: t });
      return (
        void 0 !== t && void 0 !== a
          ? ((s = t), (r = a + 1))
          : void 0 !== t && void 0 === a
          ? ((s = t), (r = n))
          : void 0 !== a && void 0 === t && ((s = n - a), (r = n)),
        { start: s, end: r }
      );
    },
    eK = (e) => {
      let t = e.trim().toLowerCase();
      if (!t.startsWith("bytes="))
        throw new i("unit-must-be-bytes", { normalizedRangeHeader: t });
      if (t.includes(","))
        throw new i("single-range-only", { normalizedRangeHeader: t });
      let a = /(\d*)-(\d*)/.exec(t);
      if (!a || !(a[1] || a[2]))
        throw new i("invalid-range-values", { normalizedRangeHeader: t });
      return {
        start: "" === a[1] ? void 0 : Number(a[1]),
        end: "" === a[2] ? void 0 : Number(a[2]),
      };
    },
    eW = async (e, t) => {
      try {
        if (206 === t.status) return t;
        let a = e.headers.get("range");
        if (!a) throw new i("no-range-header");
        let s = eK(a),
          r = await t.blob(),
          n = eB(r, s.start, s.end),
          c = r.slice(n.start, n.end),
          o = c.size,
          l = new Response(c, {
            status: 206,
            statusText: "Partial Content",
            headers: t.headers,
          });
        return (
          l.headers.set("Content-Length", String(o)),
          l.headers.set(
            "Content-Range",
            `bytes ${n.start}-${n.end - 1}/${r.size}`
          ),
          l
        );
      } catch (e) {
        return new Response("", {
          status: 416,
          statusText: "Range Not Satisfiable",
        });
      }
    };
  class ej {
    cachedResponseWillBeUsed = async ({ request: e, cachedResponse: t }) =>
      t && e.headers.has("range") ? await eW(e, t) : t;
  }
  class e$ extends Y {
    async _handle(e, t) {
      let a,
        s = await t.cacheMatch(e);
      if (!s)
        try {
          s = await t.fetchAndCachePut(e);
        } catch (e) {
          e instanceof Error && (a = e);
        }
      if (!s) throw new i("no-response", { url: e.url, error: a });
      return s;
    }
  }
  class eH extends Y {
    constructor(e = {}) {
      super(e),
        this.plugins.some((e) => "cacheWillUpdate" in e) ||
          this.plugins.unshift(X);
    }
    async _handle(e, t) {
      let a;
      let s = t.fetchAndCachePut(e).catch(() => {});
      t.waitUntil(s);
      let r = await t.cacheMatch(e);
      if (r);
      else
        try {
          r = await s;
        } catch (e) {
          e instanceof Error && (a = e);
        }
      if (!r) throw new i("no-response", { url: e.url, error: a });
      return r;
    }
  }
  let eG = {
      rscPrefetch: "pages-rsc-prefetch",
      rsc: "pages-rsc",
      html: "pages",
    },
    eV = [
      {
        matcher: /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
        handler: new e$({
          cacheName: "google-fonts-webfonts",
          plugins: [
            new eM({
              maxEntries: 4,
              maxAgeSeconds: 31536e3,
              maxAgeFrom: "last-used",
            }),
          ],
        }),
      },
      {
        matcher: /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
        handler: new eH({
          cacheName: "google-fonts-stylesheets",
          plugins: [
            new eM({
              maxEntries: 4,
              maxAgeSeconds: 604800,
              maxAgeFrom: "last-used",
            }),
          ],
        }),
      },
      {
        matcher: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
        handler: new eH({
          cacheName: "static-font-assets",
          plugins: [
            new eM({
              maxEntries: 4,
              maxAgeSeconds: 604800,
              maxAgeFrom: "last-used",
            }),
          ],
        }),
      },
      {
        matcher: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
        handler: new eH({
          cacheName: "static-image-assets",
          plugins: [
            new eM({
              maxEntries: 64,
              maxAgeSeconds: 2592e3,
              maxAgeFrom: "last-used",
            }),
          ],
        }),
      },
      {
        matcher: /\/_next\/static.+\.js$/i,
        handler: new e$({
          cacheName: "next-static-js-assets",
          plugins: [
            new eM({
              maxEntries: 64,
              maxAgeSeconds: 86400,
              maxAgeFrom: "last-used",
            }),
          ],
        }),
      },
      {
        matcher: /\/_next\/image\?url=.+$/i,
        handler: new eH({
          cacheName: "next-image",
          plugins: [
            new eM({
              maxEntries: 64,
              maxAgeSeconds: 86400,
              maxAgeFrom: "last-used",
            }),
          ],
        }),
      },
      {
        matcher: /\.(?:mp3|wav|ogg)$/i,
        handler: new e$({
          cacheName: "static-audio-assets",
          plugins: [
            new eM({
              maxEntries: 32,
              maxAgeSeconds: 86400,
              maxAgeFrom: "last-used",
            }),
            new ej(),
          ],
        }),
      },
      {
        matcher: /\.(?:mp4|webm)$/i,
        handler: new e$({
          cacheName: "static-video-assets",
          plugins: [
            new eM({
              maxEntries: 32,
              maxAgeSeconds: 86400,
              maxAgeFrom: "last-used",
            }),
            new ej(),
          ],
        }),
      },
      {
        matcher: /\.(?:js)$/i,
        handler: new eH({
          cacheName: "static-js-assets",
          plugins: [
            new eM({
              maxEntries: 48,
              maxAgeSeconds: 86400,
              maxAgeFrom: "last-used",
            }),
          ],
        }),
      },
      {
        matcher: /\.(?:css|less)$/i,
        handler: new eH({
          cacheName: "static-style-assets",
          plugins: [
            new eM({
              maxEntries: 32,
              maxAgeSeconds: 86400,
              maxAgeFrom: "last-used",
            }),
          ],
        }),
      },
      {
        matcher: /\/_next\/data\/.+\/.+\.json$/i,
        handler: new Z({
          cacheName: "next-data",
          plugins: [
            new eM({
              maxEntries: 32,
              maxAgeSeconds: 86400,
              maxAgeFrom: "last-used",
            }),
          ],
        }),
      },
      {
        matcher: /\.(?:json|xml|csv)$/i,
        handler: new Z({
          cacheName: "static-data-assets",
          plugins: [
            new eM({
              maxEntries: 32,
              maxAgeSeconds: 86400,
              maxAgeFrom: "last-used",
            }),
          ],
        }),
      },
      {
        matcher: ({ sameOrigin: e, url: { pathname: t } }) =>
          !(!e || t.startsWith("/api/auth/callback")) &&
          !!t.startsWith("/api/"),
        method: "GET",
        handler: new Z({
          cacheName: "apis",
          plugins: [
            new eM({
              maxEntries: 16,
              maxAgeSeconds: 86400,
              maxAgeFrom: "last-used",
            }),
          ],
          networkTimeoutSeconds: 10,
        }),
      },
      {
        matcher: ({ request: e, url: { pathname: t }, sameOrigin: a }) =>
          "1" === e.headers.get("RSC") &&
          "1" === e.headers.get("Next-Router-Prefetch") &&
          a &&
          !t.startsWith("/api/"),
        handler: new Z({
          cacheName: eG.rscPrefetch,
          plugins: [new eM({ maxEntries: 32, maxAgeSeconds: 86400 })],
        }),
      },
      {
        matcher: ({ request: e, url: { pathname: t }, sameOrigin: a }) =>
          "1" === e.headers.get("RSC") && a && !t.startsWith("/api/"),
        handler: new Z({
          cacheName: eG.rsc,
          plugins: [new eM({ maxEntries: 32, maxAgeSeconds: 86400 })],
        }),
      },
      {
        matcher: ({ request: e, url: { pathname: t }, sameOrigin: a }) =>
          e.headers.get("Content-Type")?.includes("text/html") &&
          a &&
          !t.startsWith("/api/"),
        handler: new Z({
          cacheName: eG.html,
          plugins: [new eM({ maxEntries: 32, maxAgeSeconds: 86400 })],
        }),
      },
      {
        matcher: ({ url: { pathname: e }, sameOrigin: t }) =>
          t && !e.startsWith("/api/"),
        handler: new Z({
          cacheName: "others",
          plugins: [new eM({ maxEntries: 32, maxAgeSeconds: 86400 })],
        }),
      },
      {
        matcher: ({ sameOrigin: e }) => !e,
        handler: new Z({
          cacheName: "cross-origin",
          plugins: [new eM({ maxEntries: 32, maxAgeSeconds: 3600 })],
          networkTimeoutSeconds: 10,
        }),
      },
    ];
  new ek({
    precacheEntries: [
      { revision: "16070b31-8850-4924-b59f-6d526d869c6b", url: "/" },
      {
        revision: "e0a21c7d7f93d89dce16df0231dc76f2",
        url: "/_next/static/abytLDxfBwEi9RUXPcrEt/_buildManifest.js",
      },
      {
        revision: "b6652df95db52feb4daf4eca35380933",
        url: "/_next/static/abytLDxfBwEi9RUXPcrEt/_ssgManifest.js",
      },
      { revision: null, url: "/_next/static/chunks/105-fab9a3214cc4ec07.js" },
      { revision: null, url: "/_next/static/chunks/160-54476ab65d1057c1.js" },
      { revision: null, url: "/_next/static/chunks/323-948eeeb8a7e6777b.js" },
      { revision: null, url: "/_next/static/chunks/364-7fa3bb1381bbb1b9.js" },
      { revision: null, url: "/_next/static/chunks/584-62e4a0f9a1029d44.js" },
      { revision: null, url: "/_next/static/chunks/895.2262e0544e6ad637.js" },
      {
        revision: null,
        url: "/_next/static/chunks/app/_not-found-ca387f764df29cb3.js",
      },
      {
        revision: null,
        url: "/_next/static/chunks/app/detail/%5Bslug%5D/page-2908daffdf7a3ffa.js",
      },
      {
        revision: null,
        url: "/_next/static/chunks/app/layout-6d52aeef38cf082b.js",
      },
      {
        revision: null,
        url: "/_next/static/chunks/app/list/page-a11b4ef9b61a456d.js",
      },
      {
        revision: null,
        url: "/_next/static/chunks/app/page-1d4048be6325020f.js",
      },
      {
        revision: null,
        url: "/_next/static/chunks/fd9d1056-be1010a555dd28b3.js",
      },
      {
        revision: null,
        url: "/_next/static/chunks/framework-f66176bb897dc684.js",
      },
      { revision: null, url: "/_next/static/chunks/main-6191ebdc4c140334.js" },
      {
        revision: null,
        url: "/_next/static/chunks/main-app-1254994a89236f9d.js",
      },
      {
        revision: null,
        url: "/_next/static/chunks/pages/_app-75f6107b0260711c.js",
      },
      {
        revision: null,
        url: "/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",
      },
      {
        revision: "837c0df77fd5009c9e46d446188ecfd0",
        url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
      },
      {
        revision: null,
        url: "/_next/static/chunks/webpack-b29ff3ad12eed6fb.js",
      },
      { revision: null, url: "/_next/static/css/15b418456535484b.css" },
      { revision: null, url: "/_next/static/css/28414d09be9fe2d7.css" },
      { revision: null, url: "/_next/static/css/5dc781c0f413ab1d.css" },
      { revision: null, url: "/_next/static/css/6c9da843ab08711b.css" },
      {
        revision: "7f19429deb75880a47921d57882f2491",
        url: "/_next/static/media/0039b43dcccd2067-s.p.ttf",
      },
      {
        revision: "93cde6c18d42b020d71098387742aba8",
        url: "/_next/static/media/0755905261d4c20d-s.p.ttf",
      },
      {
        revision: "3be006b41e7cb030d35e8ca116ffa3cc",
        url: "/_next/static/media/1dcf1509fadbcb69-s.p.ttf",
      },
      {
        revision: "12b9abd7fc141cfeb4aad236336af5c6",
        url: "/_next/static/media/49480c97edd9448d-s.p.ttf",
      },
      {
        revision: "281b8904873913a00a10b41584372556",
        url: "/_next/static/media/4afb1b18e9cd4586-s.p.ttf",
      },
      {
        revision: "e3f0fa1113dc23d972b38186c82fd5de",
        url: "/_next/static/media/4f7b78416031b1be-s.p.ttf",
      },
      {
        revision: "9fc0af0a795de3ff8ba7882dd5f91afc",
        url: "/_next/static/media/51219276ef913e76-s.p.ttf",
      },
      {
        revision: "7e825c39f15050069cf660719d9409b7",
        url: "/_next/static/media/605645f024e73459-s.p.ttf",
      },
      {
        revision: "7257a19c35a26f96198ece19b9231f26",
        url: "/_next/static/media/6bcc9bbb3bdfa2d8-s.p.ttf",
      },
      {
        revision: "d085097cf6a19fec8ea0f3dad8331509",
        url: "/_next/static/media/8223607d484e136a-s.p.ttf",
      },
      {
        revision: "dd93e37c71fe225fe7627bb5d825d1ef",
        url: "/_next/static/media/8cc1dcd2cb5ac989-s.p.ttf",
      },
      {
        revision: "7fa90be7851ce19a9509451736f5404f",
        url: "/_next/static/media/8f411a12aaa1bdd1-s.p.ttf",
      },
      {
        revision: "1b31986af9cb3af2be6845b30e5b3958",
        url: "/_next/static/media/923fa6ac4e258be7-s.p.ttf",
      },
      {
        revision: "33367c9ca49d7db456b1596e8b73ff4f",
        url: "/_next/static/media/a265a078039b9b6f-s.p.ttf",
      },
      {
        revision: "04b5cd6fb11bec60dfa3c5a3cc1dcc4f",
        url: "/_next/static/media/adb6e3e739bb97bf-s.p.ttf",
      },
      {
        revision: "755ac808845779e6aa71ac9f211e954a",
        url: "/_next/static/media/c774f3441e8065a8-s.p.ttf",
      },
      {
        revision: "e0cd3ed0a805dea72c8300d792898965",
        url: "/_next/static/media/d91bb7fc5f8d4102-s.p.ttf",
      },
      {
        revision: "6e95d632a4a1d406f273d9546573ee45",
        url: "/_next/static/media/e6d94836181e8010-s.p.ttf",
      },
      {
        revision: "2e5a3e2aeeb3d17f7f3c0dd69646cac9",
        url: "/_next/static/media/fb3bbc4a6e99e89e-s.p.ttf",
      },
      {
        revision: "8192ef16-bbcc-403e-a18a-426c6cb7ea8f",
        url: "/assets/colors/black.svg",
      },
      {
        revision: "19920c07-b1a8-4904-a254-d837e9cb8621",
        url: "/assets/colors/gray.svg",
      },
      {
        revision: "ff4a9d78-3ebe-47cd-b596-63a781eda40a",
        url: "/assets/colors/selected.svg",
      },
      {
        revision: "91333066-a99a-4a5e-98e8-cf4dc963aa35",
        url: "/assets/colors/white.svg",
      },
      {
        revision: "43379b99-453e-47c3-b766-4ff3362b66f9",
        url: "/assets/icons/icon_ABS_aro.svg",
      },
      {
        revision: "aa590911-01bd-4650-b380-4452b72676c3",
        url: "/assets/icons/icon_airbags.svg",
      },
      {
        revision: "6e872967-6c8b-4b2f-ba02-f58505c3b933",
        url: "/assets/icons/icon_alerta.svg",
      },
      {
        revision: "c878d9e8-39e4-4e25-b52b-0938f84e0d4f",
        url: "/assets/icons/icon_arrow.svg",
      },
      {
        revision: "a99a1d64-39e7-4de1-9123-cb55e558976e",
        url: "/assets/icons/icon_close.svg",
      },
      {
        revision: "cf195e35-436a-4bff-a88c-d18f229402b3",
        url: "/assets/icons/icon_contain.svg",
      },
      {
        revision: "3cfbeb0b-eb8f-48a2-bdba-82fa56416299",
        url: "/assets/icons/icon_control_estabilidad.svg",
      },
      {
        revision: "5819c2bc-ee9f-4486-927a-9a57f632b640",
        url: "/assets/icons/icon_garantia.svg",
      },
      {
        revision: "830c07d3-a243-4dd3-8b33-ed6cb9c12c98",
        url: "/assets/icons/icon_isofix.svg",
      },
      {
        revision: "44394360-2016-4a3e-b770-5544c9d80df9",
        url: "/assets/icons/icon_motor.svg",
      },
      {
        revision: "f4d1f212-a21a-4422-a4a8-b604e256dace",
        url: "/assets/icons/icon_no_contain.svg",
      },
      {
        revision: "a320da5f-5d50-4202-99a7-ea15693ff566",
        url: "/assets/icons/icon_pasajeros.svg",
      },
      {
        revision: "971566b4-a014-4567-bc49-d93265f1c394",
        url: "/assets/icons/icon_puertas.svg",
      },
      {
        revision: "e5aef6cc-565c-4fb0-a450-5c5eb55d7bc7",
        url: "/assets/icons/icon_velocidades.svg",
      },
      {
        revision: "3a3208b5-9650-47e0-954e-32646a17b6e4",
        url: "/assets/images/logo.svg",
      },
      {
        revision: "9b82633a-587a-4570-a6ac-0628a19c0ed9",
        url: "/assets/images/site_logo.svg",
      },
      {
        revision: "817e0127-4bec-4973-9fd8-0460db6b425b",
        url: "/assets/logo_Toyota.png",
      },
      {
        revision: "43b0c284-c90e-453d-8072-d2c3c8531f02",
        url: "/assets/video/prado-reel.mp4",
      },
      { revision: "53c564ca-5ba8-4cd5-806d-fc986c56d9b1", url: "/detail/1" },
      { revision: "996917d5-6695-4615-b1d0-325bafa1fe36", url: "/detail/2" },
      { revision: "f6d5726b-8ee7-4c6d-99ea-32a6dad510da", url: "/detail/3" },
      { revision: "5d02d0c4-df6f-42b7-9676-01f1c2302743", url: "/detail/4" },
      { revision: "66e2b121-bd9c-4225-90aa-1e091fe4f8dc", url: "/detail/5" },
      { revision: "b56f5d1e-4cb3-437e-987f-3796611b65d1", url: "/detail/6" },
      { revision: "b169f343-64c4-4b8b-bb8b-dc5ef5c11eae", url: "/detail/7" },
      { revision: "6e3626b0-0395-4c0d-b93c-76475699216f", url: "/detail/8" },
      {
        revision: "f4364587-87c8-4f5e-87f2-97bf17cfd300",
        url: "/fonts/ToyotaDisplay.ttf",
      },
      {
        revision: "e3ffe315-0336-4c76-8735-6b85a61c8043",
        url: "/fonts/ToyotaDisplay_He.ttf",
      },
      {
        revision: "36cd5883-ccb7-422e-b6e6-770679565500",
        url: "/fonts/ToyotaDisplay_Rg.ttf",
      },
      {
        revision: "a3c34b8d-d164-4949-af52-5d3d646e3b21",
        url: "/fonts/ToyotaText_BdIt.ttf",
      },
      {
        revision: "afabe683-50a0-4829-8fc4-b3f081a784cb",
        url: "/fonts/ToyotaText_Bold.ttf",
      },
      {
        revision: "f9f8572c-77c2-492f-a24d-2b9fb7931889",
        url: "/fonts/ToyotaText_It.ttf",
      },
      {
        revision: "1a55b8ab-d7c3-4b0d-8321-2a01ce6ec467",
        url: "/fonts/ToyotaText_Rg.ttf",
      },
      {
        revision: "b2635bb5-4cb1-4d4d-a2de-3c9ec7733be4",
        url: "/fonts/ToyotaType-Black.ttf",
      },
      {
        revision: "df6bd2cf-54e1-482d-9e04-8d3a239d3fb6",
        url: "/fonts/ToyotaType-BlackIt.ttf",
      },
      {
        revision: "35a09a5c-556e-4a7d-aba1-5846646a98d7",
        url: "/fonts/ToyotaType-Bold.ttf",
      },
      {
        revision: "cae611f3-7ad1-4250-831d-80dd018f4133",
        url: "/fonts/ToyotaType-BoldIt.ttf",
      },
      {
        revision: "15d5a028-820f-46c1-9299-47059e6ca23b",
        url: "/fonts/ToyotaType-Book.ttf",
      },
      {
        revision: "5b62e519-0559-40d1-b82a-dba59386fed8",
        url: "/fonts/ToyotaType-BookIt.ttf",
      },
      {
        revision: "86adc783-ae64-4c11-b754-c61334997df8",
        url: "/fonts/ToyotaType-Light.ttf",
      },
      {
        revision: "0cce647f-8068-4704-b3b0-9aa3a9ee34e5",
        url: "/fonts/ToyotaType-LightIt.ttf",
      },
      {
        revision: "f69f107e-78b7-4df5-814c-8d455d98588b",
        url: "/fonts/ToyotaType-Regular.ttf",
      },
      {
        revision: "ed2fcd3f-f671-4bc9-a23c-a4742e8d6603",
        url: "/fonts/ToyotaType-RegularIt.ttf",
      },
      {
        revision: "3a750333-07e1-455e-a41c-4c1446be8c12",
        url: "/fonts/ToyotaType-Semibold.ttf",
      },
      {
        revision: "c01a74d3-63d4-4f94-bc38-f272f72a07e6",
        url: "/fonts/ToyotaType-SemiboldIt.ttf",
      },
      {
        revision: "975650af-c8c7-429b-ad20-a163dd2a5b55",
        url: "/icons/back.svg",
      },
      {
        revision: "68be563f-de7b-4cec-a72f-615321a49661",
        url: "/icons/next.svg",
      },
      {
        revision: "e2b32dea-fa29-4ce1-91ff-2bc7d247cd3f",
        url: "/icons/search.svg",
      },
      {
        revision: "0317292f-160a-43e9-a11a-b12e7facd2a6",
        url: "/icons/slidePrev.svg",
      },
      {
        revision: "f92df166-ad40-4e6c-97b6-897b77aab096",
        url: "/images/1.jpg",
      },
      {
        revision: "2f4bf93b-372b-4925-89cb-26656189c21b",
        url: "/images/2.png",
      },
      {
        revision: "ed75e470-e94e-4dcd-a262-265a12ac6934",
        url: "/images/3.png",
      },
      {
        revision: "403137d8-0d02-470a-9aac-5d01dbdbde3d",
        url: "/images/4.jpg",
      },
      {
        revision: "34efcbf9-dfda-4f79-93f1-9828d0fefa17",
        url: "/images/5.png",
      },
      {
        revision: "e89b44b4-3c47-4435-8974-d9dc6abb45aa",
        url: "/images/6.jpg",
      },
      {
        revision: "5df73f9a-734b-4e63-8c9f-f4e360ba701b",
        url: "/images/7.jpg",
      },
      { revision: "c0090ed9-7927-4e49-a289-985b7fff00dc", url: "/list" },
      {
        revision: "7acaee8001995cd8d7496ccae00f23a9",
        url: "/swe-worker-ab00d3c7d2d59769.js",
      },
    ],
    skipWaiting: !0,
    clientsClaim: !0,
    navigationPreload: !0,
    runtimeCaching: eV,
  }).addEventListeners();
})();
