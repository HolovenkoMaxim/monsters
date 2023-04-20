(() => {
  "use strict";
  const t = {};
  function e() {
    if (location.hash) return location.hash.replace("#", "");
  }
  let o = (t, e = 500, o = 0) => {
      t.classList.contains("_slide") ||
        (t.classList.add("_slide"),
        (t.style.transitionProperty = "height, margin, padding"),
        (t.style.transitionDuration = e + "ms"),
        (t.style.height = `${t.offsetHeight}px`),
        t.offsetHeight,
        (t.style.overflow = "hidden"),
        (t.style.height = o ? `${o}px` : "0px"),
        (t.style.paddingTop = 0),
        (t.style.paddingBottom = 0),
        (t.style.marginTop = 0),
        (t.style.marginBottom = 0),
        window.setTimeout(() => {
          (t.hidden = !o),
            !o && t.style.removeProperty("height"),
            t.style.removeProperty("padding-top"),
            t.style.removeProperty("padding-bottom"),
            t.style.removeProperty("margin-top"),
            t.style.removeProperty("margin-bottom"),
            !o && t.style.removeProperty("overflow"),
            t.style.removeProperty("transition-duration"),
            t.style.removeProperty("transition-property"),
            t.classList.remove("_slide"),
            document.dispatchEvent(
              new CustomEvent("slideUpDone", { detail: { target: t } })
            );
        }, e));
    },
    s = (t, e = 500, o = 0) => {
      if (!t.classList.contains("_slide")) {
        t.classList.add("_slide"),
          (t.hidden = !t.hidden && null),
          o && t.style.removeProperty("height");
        let s = t.offsetHeight;
        (t.style.overflow = "hidden"),
          (t.style.height = o ? `${o}px` : "0px"),
          (t.style.paddingTop = 0),
          (t.style.paddingBottom = 0),
          (t.style.marginTop = 0),
          (t.style.marginBottom = 0),
          t.offsetHeight,
          (t.style.transitionProperty = "height, margin, padding"),
          (t.style.transitionDuration = e + "ms"),
          (t.style.height = s + "px"),
          t.style.removeProperty("padding-top"),
          t.style.removeProperty("padding-bottom"),
          t.style.removeProperty("margin-top"),
          t.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            t.style.removeProperty("height"),
              t.style.removeProperty("overflow"),
              t.style.removeProperty("transition-duration"),
              t.style.removeProperty("transition-property"),
              t.classList.remove("_slide"),
              document.dispatchEvent(
                new CustomEvent("slideDownDone", { detail: { target: t } })
              );
          }, e);
      }
    },
    r = !0,
    n = (t = 500) => {
      let e = document.querySelector("body");
      if (r) {
        let o = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let t = 0; t < o.length; t++) {
            o[t].style.paddingRight = "0px";
          }
          (e.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, t),
          (r = !1),
          setTimeout(function () {
            r = !0;
          }, t);
      }
    },
    a = (t = 500) => {
      let e = document.querySelector("body");
      if (r) {
        let o = document.querySelectorAll("[data-lp]");
        for (let t = 0; t < o.length; t++) {
          o[t].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (e.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (r = !1),
          setTimeout(function () {
            r = !0;
          }, t);
      }
    };
  function l(t) {
    setTimeout(() => {
      window.FLS && console.log(t);
    }, 0);
  }
  function i(t) {
    return t.filter(function (t, e, o) {
      return o.indexOf(t) === e;
    });
  }
  function c(t, e) {
    const o = Array.from(t).filter(function (t, o, s) {
      if (t.dataset[e]) return t.dataset[e].split(",")[0];
    });
    if (o.length) {
      const t = [];
      o.forEach((o) => {
        const s = {},
          r = o.dataset[e].split(",");
        (s.value = r[0]),
          (s.type = r[1] ? r[1].trim() : "max"),
          (s.item = o),
          t.push(s);
      });
      let s = t.map(function (t) {
        return (
          "(" + t.type + "-width: " + t.value + "px)," + t.value + "," + t.type
        );
      });
      s = i(s);
      const r = [];
      if (s.length)
        return (
          s.forEach((e) => {
            const o = e.split(","),
              s = o[1],
              n = o[2],
              a = window.matchMedia(o[0]),
              l = t.filter(function (t) {
                if (t.value === s && t.type === n) return !0;
              });
            r.push({ itemsArray: l, matchMedia: a });
          }),
          r
        );
    }
  }
  t.mousePrlx = new (class {
    constructor(t, e = null) {
      if (
        ((this.config = Object.assign({ init: !0, logging: !0 }, t)),
        this.config.init)
      ) {
        const t = document.querySelectorAll("[data-prlx-mouse]");
        t.length
          ? (this.paralaxMouseInit(t),
            this.setLogging(`Проснулся, слежу за объектами: (${t.length})`))
          : this.setLogging("Нет ни одного объекта. Сплю...zzZZZzZZz...");
      }
    }
    paralaxMouseInit(t) {
      t.forEach((t) => {
        const e = t.closest("[data-prlx-mouse-wrapper]"),
          o = t.dataset.prlxCx ? +t.dataset.prlxCx : 100,
          s = t.dataset.prlxCy ? +t.dataset.prlxCy : 100,
          r = t.hasAttribute("data-prlx-dxr") ? -1 : 1,
          n = t.hasAttribute("data-prlx-dyr") ? -1 : 1,
          a = t.dataset.prlxA ? +t.dataset.prlxA : 50;
        let l = 0,
          i = 0,
          c = 0,
          d = 0;
        function h(e = window) {
          e.addEventListener("mousemove", function (e) {
            const o = t.getBoundingClientRect().top + window.scrollY;
            if (o >= window.scrollY || o + t.offsetHeight >= window.scrollY) {
              const t = window.innerWidth,
                o = window.innerHeight,
                s = e.clientX - t / 2,
                r = e.clientY - o / 2;
              (c = (s / t) * 100), (d = (r / o) * 100);
            }
          });
        }
        !(function e() {
          (l += ((c - l) * a) / 1e3),
            (i += ((d - i) * a) / 1e3),
            (t.style.cssText = `transform: translate3D(${(r * l) / (o / 10)}%,${
              (n * i) / (s / 10)
            }%,0);`),
            requestAnimationFrame(e);
        })(),
          e ? h(e) : h();
      });
    }
    setLogging(t) {
      this.config.logging && l(`[PRLX Mouse]: ${t}`);
    }
  })({});
  let d = (t, e = !1, o = 500, s = 0) => {
    const r = document.querySelector(t);
    if (r) {
      let a = "",
        i = 0;
      e &&
        ((a = "header.header"), (i = document.querySelector(a).offsetHeight));
      let c = {
        speedAsDuration: !0,
        speed: o,
        header: a,
        offset: s,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (n(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(r, "", c);
      else {
        let t = r.getBoundingClientRect().top + scrollY;
        (t = i ? t - i : t),
          (t = s ? t - s : t),
          window.scrollTo({ top: t, behavior: "smooth" });
      }
      l(`[gotoBlock]: Юхуу...едем к ${t}`);
    } else l(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${t}`);
  };
  t.watcher = new (class {
    constructor(t) {
      (this.config = Object.assign({ logging: !0 }, t)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]")
        );
    }
    scrollWatcherConstructor(t) {
      if (t.length) {
        this.scrollWatcherLogging(
          `Проснулся, слежу за объектами (${t.length})...`
        ),
          i(
            Array.from(t).map(function (t) {
              return `${
                t.dataset.watchRoot ? t.dataset.watchRoot : null
              }|${t.dataset.watchMargin ? t.dataset.watchMargin : "0px"}|${t.dataset.watchThreshold ? t.dataset.watchThreshold : 0}`;
            })
          ).forEach((e) => {
            let o = e.split("|"),
              s = { root: o[0], margin: o[1], threshold: o[2] },
              r = Array.from(t).filter(function (t) {
                let e = t.dataset.watchRoot ? t.dataset.watchRoot : null,
                  o = t.dataset.watchMargin ? t.dataset.watchMargin : "0px",
                  r = t.dataset.watchThreshold ? t.dataset.watchThreshold : 0;
                if (
                  String(e) === s.root &&
                  String(o) === s.margin &&
                  String(r) === s.threshold
                )
                  return t;
              }),
              n = this.getScrollWatcherConfig(s);
            this.scrollWatcherInit(r, n);
          });
      } else
        this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
    }
    getScrollWatcherConfig(t) {
      let e = {};
      if (
        (document.querySelector(t.root)
          ? (e.root = document.querySelector(t.root))
          : "null" !== t.root &&
            this.scrollWatcherLogging(
              `Эмм... родительского объекта ${t.root} нет на странице`
            ),
        (e.rootMargin = t.margin),
        !(t.margin.indexOf("px") < 0 && t.margin.indexOf("%") < 0))
      ) {
        if ("prx" === t.threshold) {
          t.threshold = [];
          for (let e = 0; e <= 1; e += 0.005) t.threshold.push(e);
        } else t.threshold = t.threshold.split(",");
        return (e.threshold = t.threshold), e;
      }
      this.scrollWatcherLogging(
        "Ой ой, настройку data-watch-margin нужно задавать в PX или %"
      );
    }
    scrollWatcherCreate(t) {
      this.observer = new IntersectionObserver((t, e) => {
        t.forEach((t) => {
          this.scrollWatcherCallback(t, e);
        });
      }, t);
    }
    scrollWatcherInit(t, e) {
      this.scrollWatcherCreate(e), t.forEach((t) => this.observer.observe(t));
    }
    scrollWatcherIntersecting(t, e) {
      t.isIntersecting
        ? (!e.classList.contains("_watcher-view") &&
            e.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `Я вижу ${e.classList}, добавил класс _watcher-view`
          ))
        : (e.classList.contains("_watcher-view") &&
            e.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `Я не вижу ${e.classList}, убрал класс _watcher-view`
          ));
    }
    scrollWatcherOff(t, e) {
      e.unobserve(t),
        this.scrollWatcherLogging(`Я перестал следить за ${t.classList}`);
    }
    scrollWatcherLogging(t) {
      this.config.logging && l(`[Наблюдатель]: ${t}`);
    }
    scrollWatcherCallback(t, e) {
      const o = t.target;
      this.scrollWatcherIntersecting(t, o),
        o.hasAttribute("data-watch-once") &&
          t.isIntersecting &&
          this.scrollWatcherOff(o, e),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: t } })
        );
    }
  })({});
  let h = !1;
  setTimeout(() => {
    if (h) {
      let t = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(t);
      });
    }
  }, 0),
    (window.FLS = !0),
    (function (t) {
      let e = new Image();
      (e.onload = e.onerror =
        function () {
          t(2 == e.height);
        }),
        (e.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (t) {
      let e = !0 === t ? "webp" : "no-webp";
      document.documentElement.classList.add(e);
    }),
    (function () {
      let t = document.querySelector(".icon-menu");
      t &&
        t.addEventListener("click", function (t) {
          r &&
            (((t = 500) => {
              document.documentElement.classList.contains("lock") ? n(t) : a(t);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      const t = document.querySelectorAll("[data-spollers]");
      if (t.length > 0) {
        const e = Array.from(t).filter(function (t, e, o) {
          return !t.dataset.spollers.split(",")[0];
        });
        e.length && n(e);
        let r = c(t, "spollers");
        function n(t, e = !1) {
          t.forEach((t) => {
            (t = e ? t.item : t),
              e.matches || !e
                ? (t.classList.add("_spoller-init"),
                  a(t),
                  t.addEventListener("click", l))
                : (t.classList.remove("_spoller-init"),
                  a(t, !1),
                  t.removeEventListener("click", l));
          });
        }
        function a(t, e = !0) {
          let o = t.querySelectorAll("[data-spoller]");
          o.length &&
            ((o = Array.from(o).filter(
              (e) => e.closest("[data-spollers]") === t
            )),
            o.forEach((t) => {
              e
                ? (t.removeAttribute("tabindex"),
                  t.classList.contains("_spoller-active") ||
                    (t.nextElementSibling.hidden = !0))
                : (t.setAttribute("tabindex", "-1"),
                  (t.nextElementSibling.hidden = !1));
            }));
        }
        function l(t) {
          const e = t.target;
          if (e.closest("[data-spoller]")) {
            const r = e.closest("[data-spoller]"),
              n = r.closest("[data-spollers]"),
              a = !!n.hasAttribute("data-one-spoller");
            n.querySelectorAll("._slide").length ||
              (a && !r.classList.contains("_spoller-active") && i(n),
              r.classList.toggle("_spoller-active"),
              ((t, e = 500) => {
                t.hidden ? s(t, e) : o(t, e);
              })(r.nextElementSibling, 500)),
              t.preventDefault();
          }
        }
        function i(t) {
          const e = t.querySelector("[data-spoller]._spoller-active");
          e &&
            (e.classList.remove("_spoller-active"),
            o(e.nextElementSibling, 500));
        }
        r &&
          r.length &&
          r.forEach((t) => {
            t.matchMedia.addEventListener("change", function () {
              n(t.itemsArray, t.matchMedia);
            }),
              n(t.itemsArray, t.matchMedia);
          });
      }
    })(),
    (function () {
      function t(t) {
        if ("click" === t.type) {
          const e = t.target;
          if (e.closest("[data-goto]")) {
            const o = e.closest("[data-goto]"),
              s = o.dataset.goto ? o.dataset.goto : "",
              r = !!o.hasAttribute("data-goto-header"),
              n = o.dataset.gotoSpeed ? o.dataset.gotoSpeed : 500,
              a = o.dataset.gotoTop ? parseInt(o.dataset.gotoTop) : 0;
            d(s, r, n, a), t.preventDefault();
          }
        } else if ("watcherCallback" === t.type && t.detail) {
          const e = t.detail.entry,
            o = e.target;
          if ("navigator" === o.dataset.watch) {
            document.querySelector("[data-goto]._navigator-active");
            let t;
            if (o.id && document.querySelector(`[data-goto="#${o.id}"]`))
              t = document.querySelector(`[data-goto="#${o.id}"]`);
            else if (o.classList.length)
              for (let e = 0; e < o.classList.length; e++) {
                const s = o.classList[e];
                if (document.querySelector(`[data-goto=".${s}"]`)) {
                  t = document.querySelector(`[data-goto=".${s}"]`);
                  break;
                }
              }
            e.isIntersecting
              ? t && t.classList.add("_navigator-active")
              : t && t.classList.remove("_navigator-active");
          }
        }
      }
      if (
        (document.addEventListener("click", t),
        document.addEventListener("watcherCallback", t),
        e())
      ) {
        let t;
        document.querySelector(`#${e()}`)
          ? (t = `#${e()}`)
          : document.querySelector(`.${e()}`) && (t = `.${e()}`),
          t && d(t, !0, 500, 20);
      }
    })(),
    (function () {
      h = !0;
      const t = document.querySelector("header.header"),
        e = document.querySelector(".toothpicks"),
        o = t.hasAttribute("data-scroll-show"),
        s = t.dataset.scrollShow ? t.dataset.scrollShow : 500;
      let r,
        n = 0;
      document.addEventListener("windowScroll", function (a) {
        const l = window.scrollY,
          i = e.offsetHeight - 80;
        clearTimeout(r),
          l >= i
            ? (!t.classList.contains("_header-scroll") &&
                t.classList.add("_header-scroll"),
              o &&
                (l > n
                  ? t.classList.contains("_header-show") &&
                    t.classList.remove("_header-show")
                  : !t.classList.contains("_header-show") &&
                    t.classList.add("_header-show"),
                (r = setTimeout(() => {
                  !t.classList.contains("_header-show") &&
                    t.classList.add("_header-show");
                }, s))))
            : (t.classList.contains("_header-scroll") &&
                t.classList.remove("_header-scroll"),
              o &&
                t.classList.contains("_header-show") &&
                t.classList.remove("_header-show")),
          (n = l <= 0 ? 0 : l);
      });
    })();
})();
