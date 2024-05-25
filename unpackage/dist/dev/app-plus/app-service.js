if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const ON_SHOW = "onShow";
  const ON_LOAD = "onLoad";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const _imports_0 = "/static/navbar/ic_back.png";
  const _imports_1 = "/static/navbar/ic_home.png";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$o = {
    __name: "navbar",
    props: {
      myBackground: {
        type: String,
        default: "rgba(255,255,255)"
      },
      myColor: {
        type: String,
        default: "rgba(0,0,0)"
      },
      myFontSize: {
        type: String,
        default: 32
      },
      myIconWidth: {
        type: String,
        default: 116
      },
      myIconHeight: {
        type: String,
        default: 38
      },
      titleText: {
        type: String,
        default: ""
      },
      isHome: {
        type: Boolean,
        default: false
      }
    },
    setup(__props) {
      const props = __props;
      vue.onBeforeMount(() => {
        setNavSize();
        setStyle();
      });
      const statusheight = vue.ref(0);
      const navconheight = vue.ref(0);
      const setNavSize = async () => {
        await uni.getSystemInfo();
        const res = await uni.getSystemInfo();
        formatAppLog("log", "at components/navbar/navbar.vue:88", "res", res);
        statusheight.value = res.statusBarHeight * 2;
        if (!uni.getSystemInfoSync().platform == "ios") {
          navconheight.value = 96;
        } else {
          navconheight.value = 88;
        }
      };
      const containerStyle = vue.ref("");
      const textStyle = vue.ref("");
      const iconStyle = vue.ref("");
      const setStyle = () => {
        containerStyle.value = `background:${props.myBackground}`;
        textStyle.value = `color:${props.myColor};font-size:${props.myFontSize}rpx;`;
        iconStyle.value = `width:${props.myIconWidth}rpx;height:${props.myIconHeight}`;
      };
      const pages2 = vue.ref(getCurrentPages().length);
      formatAppLog("log", "at components/navbar/navbar.vue:106", "pages", pages2);
      const backorHome = () => {
        if (pages2.value > 1) {
          uni.navigateBack();
        } else {
          uni.switchTab({
            url: "/pages/index/index"
          });
        }
      };
      const menu = vue.reactive(uni.getMenuButtonBoundingClientRect());
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "nav" }, [
          vue.createElementVNode(
            "view",
            {
              style: vue.normalizeStyle("height:" + statusheight.value + "rpx;" + containerStyle.value)
            },
            null,
            4
            /* STYLE */
          ),
          __props.isHome ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: "headNav",
              style: vue.normalizeStyle("height:" + navconheight.value + "rpx;line-height:" + navconheight.value + "rpx;padding-left:20rpx;")
            },
            [
              vue.createElementVNode("text", { class: "city" }, "中部地区"),
              vue.createElementVNode("view", { style: { "flex": "1" } }, [
                vue.createElementVNode(
                  "navigator",
                  {
                    url: "../../pages/mysearch/index",
                    style: vue.normalizeStyle(
                      "height:" + menu.height * 2 + "rpx;line-height:" + menu.height * 2 + "rpx;margin-top:" + (menu.top * 2 - statusheight.value) + "rpx;margin-left:32rpx;margin-right:" + (menu.width * 2 + 24) + "rpx;background: #f4f4f4;border-radius:200rpx;text-align:center"
                    )
                  },
                  [
                    vue.createElementVNode("text", { class: "search-text" }, "找医院")
                  ],
                  4
                  /* STYLE */
                )
              ])
            ],
            4
            /* STYLE */
          )) : (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 1,
              class: "navbar",
              style: vue.normalizeStyle("height:" + navconheight.value + "rpx;" + containerStyle.value)
            },
            [
              vue.createElementVNode("view", {
                class: "back-icon",
                onClick: backorHome
              }, [
                pages2.value > 1 ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 0,
                  src: _imports_0
                })) : (vue.openBlock(), vue.createElementBlock("image", {
                  key: 1,
                  src: _imports_1
                }))
              ]),
              props.titleText ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "nav-title"
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    style: vue.normalizeStyle(`height:${navconheight.value}rpx;line-height:${navconheight.value}rpx;${textStyle.value}`)
                  },
                  vue.toDisplayString(props.titleText),
                  5
                  /* TEXT, STYLE */
                )
              ])) : vue.createCommentVNode("v-if", true)
            ],
            4
            /* STYLE */
          ))
        ]);
      };
    }
  };
  const __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-eaf4c2e5"], ["__file", "C:/uni_apps/peizhenApp/components/navbar/navbar.vue"]]);
  const _sfc_main$n = {
    __name: "index",
    setup(__props) {
      const app = getApp();
      const myslides = vue.ref([]);
      const mynav2s = vue.ref([]);
      const mynavs = vue.ref([]);
      const myhospitals = vue.ref([]);
      onLoad(() => {
        app.globalData.utils.getUserInfo();
        app.globalData.utils.myrequest({
          myurl: "/app/init",
          mysuccess: (res) => {
            let {
              id
            } = res.data.area;
            app.globalData.utils.myrequest({
              myurl: "/Index/index",
              data: {
                aid: id
              },
              mysuccess: (indexres) => {
                formatAppLog("log", "at pages/index/index.vue:107", "indexres", indexres);
                let {
                  slides,
                  nav2s,
                  navs,
                  hospitals
                } = indexres.data;
                myslides.value = slides;
                mynav2s.value = nav2s;
                mynav2s.value = nav2s;
                mynavs.value = navs;
                myhospitals.value = hospitals;
                uni.setStorageSync("cfg", res.data.cfg);
              }
            });
          }
        });
      });
      const onNav2Tap = (item, index) => {
        if (item.stype === "1") {
          uni.navigateTo({
            url: item.stype_link
          });
        }
      };
      const toHospital = (item, index) => {
        uni.navigateTo({
          url: "/pages/hospital/index?hid=" + item.id
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(__easycom_0$7, { isHome: true }),
          vue.createElementVNode("view", { style: { "margin-top": "130rpx" } }, [
            vue.createElementVNode("view", {
              class: "weui-cell",
              style: { "background": "#fff9eb" }
            }, [
              vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                vue.createElementVNode("image", {
                  src: "/static/images/ic_myapp.png",
                  style: { "display": "block", "width": "40rpx", "height": "40rpx", "margin-right": "14rpx" }
                })
              ]),
              vue.createElementVNode("view", { class: "weui-cell__bd" }, [
                vue.createElementVNode("text", { style: { "color": "#be9719", "font-size": "13px" } }, "右上角添加到我的小程序")
              ]),
              vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                vue.createElementVNode("image", {
                  src: "/static/images/modal_closer.png",
                  style: { "display": "block", "width": "15px", "height": "15px" }
                })
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "index-swiper" }, [
            vue.createElementVNode("swiper", {
              class: "swiper",
              circular: "",
              "indicator-dots": true,
              autoplay: true,
              interval: 2e3,
              duration: "500"
            }, [
              myslides.value.length > 0 ? (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                vue.renderList(myslides.value, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("swiper-item", { key: index }, [
                    vue.createElementVNode("image", {
                      src: item.pic_image_url,
                      mode: "widthFix",
                      "show-menu-by-longpress": "",
                      "data-index": "index"
                    }, null, 8, ["src"])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )) : vue.createCommentVNode("v-if", true)
            ])
          ]),
          mynav2s.value.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "nav2-list"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(mynav2s.value, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "nav2-item",
                  "data-index": index,
                  onClick: ($event) => onNav2Tap(item)
                }, [
                  vue.createElementVNode("view", { class: "nav2-pic" }, [
                    vue.createElementVNode("image", {
                      src: item.pic_image_url,
                      mode: "widthFix"
                    }, null, 8, ["src"])
                  ])
                ], 8, ["data-index", "onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])) : vue.createCommentVNode("v-if", true),
          mynavs.value.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "nav-list"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(mynavs.value, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "nav-item",
                  "data-index": index,
                  onClick: ($event) => onNav2Tap(item)
                }, [
                  vue.createElementVNode("view", { class: "nav-pic" }, [
                    vue.createElementVNode("image", {
                      src: item.pic_image_url,
                      mode: "widthFix"
                    }, null, 8, ["src"])
                  ]),
                  vue.createElementVNode(
                    "view",
                    {
                      class: "nav_text",
                      style: vue.normalizeStyle(`color:${item.tcolor ? item.tcolor : ""}`)
                    },
                    vue.toDisplayString(item.title),
                    5
                    /* TEXT, STYLE */
                  )
                ], 8, ["data-index", "onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])) : vue.createCommentVNode("v-if", true),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(myhospitals.value, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "weui-cell hosp-item weui-cell_access",
                key: item.id,
                "data-hid": item.id,
                onClick: ($event) => toHospital(item)
              }, [
                vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                  vue.createElementVNode("image", {
                    class: "hosp-avatar",
                    mode: "aspectFit",
                    src: item.avatar ? item.avatar_url : "../../static/images/avatar.jpg"
                  }, null, 8, ["src"])
                ]),
                vue.createElementVNode("view", { class: "weui-cell__bd" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "hosp-name" },
                    vue.toDisplayString(item.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "hosp-line" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "hosp-rank" },
                      vue.toDisplayString(item.rank),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "hosp-label" },
                      vue.toDisplayString(item.label),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "hosp-line" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "hosp-intro" },
                      vue.toDisplayString(item.intro),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ], 8, ["data-hid", "onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]);
      };
    }
  };
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__file", "C:/uni_apps/peizhenApp/pages/index/index.vue"]]);
  const _sfc_main$m = {
    __name: "formater",
    props: {
      timestamp: {
        type: Number,
        default: 0
      },
      format: {
        type: String,
        default: "MM-dd hh:mm:ss"
      }
    },
    setup(__props) {
      const props = __props;
      const formater = vue.ref("");
      vue.onMounted(() => {
        formater.value = TIME_FORMAT(props.timestamp, props.format);
      });
      const TIME_FORMAT = (t2, fmt) => {
        const newDate = /* @__PURE__ */ new Date();
        newDate.setTime(t2);
        return newDate.VP_FORMAT(fmt);
      };
      vue.watch(() => props.timestamp, (val) => {
        formater.value = TIME_FORMAT(props.timestamp, props.format);
      });
      return (_ctx, _cache) => {
        return vue.toDisplayString(formater.value);
      };
    }
  };
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__file", "C:/uni_apps/peizhenApp/components/formater/formater.vue"]]);
  const _sfc_main$l = {
    __name: "counter",
    props: {
      second: {
        type: Number,
        default: 0
      },
      format: {
        type: String,
        default: "MM-dd hh:mm"
      },
      sformat: {
        type: String,
        default: "hh:mm:ss"
      },
      suffix: {
        type: String,
        default: ""
      }
    },
    emits: ["counterOver"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const formater = vue.ref("");
      vue.onMounted(() => {
        formater.value = TIME_FORMAT(props.second);
      });
      const TIME_FORMAT = (ts2) => {
        let res;
        const showtime = () => {
          if (ts2 <= 0) {
            clearInterval(run);
            emit("counterOver");
            return TIME_SFORMAT(0, props.sformat, props.suffix);
          }
          res = TIME_SFORMAT(ts2, props.sformat, props.suffix);
          return res;
        };
        const run = setInterval(() => {
          ts2 -= 1e3;
          res = showtime();
          formater.value = res;
        }, 1e3);
      };
      const TIME_FORMIN = (param) => {
        if (param < 0) {
          param = 0;
        }
        if (param < 10) {
          param = "0" + param;
        }
        return param;
      };
      const TIME_SFORMAT = (ts2, sfmt, suffix) => {
        const time = {
          "h+": TIME_FORMIN(Math.floor(ts2 / 1e3 / 60 / 60 % 24)),
          "m+": TIME_FORMIN(Math.floor(ts2 / 1e3 / 60 % 60)),
          "s+": TIME_FORMIN(Math.floor(ts2 / 1e3 % 60))
        };
        for (let k in time) {
          if (new RegExp("(" + k + ")").test(sfmt)) {
            sfmt = sfmt.replace(RegExp.$1, RegExp.$1.length == 1 ? time[k] : ("00" + time[k]).substr(("" + time[k]).length));
          }
        }
        return sfmt + suffix;
      };
      return (_ctx, _cache) => {
        return vue.toDisplayString(formater.value);
      };
    }
  };
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__file", "C:/uni_apps/peizhenApp/components/counter/counter.vue"]]);
  const _sfc_main$k = {
    __name: "index",
    setup(__props) {
      const app = getApp();
      onShow(() => {
        filt.value = app.globalData.orders_filt;
        formatAppLog("log", "at pages/myorder/index.vue:125", "filt.value", filt.value);
        loadList();
      });
      const filt = vue.ref("");
      const onFilterChange = (e2) => {
        filt.value = e2.currentTarget.dataset.filt;
        loadList();
      };
      const list = vue.ref(null);
      const loadList = () => {
        app.globalData.utils.myrequest({
          myurl: "/order/list",
          data: {
            state: filt.value
          },
          header: {
            token: uni.getStorageSync("token")
          },
          mysuccess: (res) => {
            formatAppLog("log", "at pages/myorder/index.vue:146", "获取订单信息", res);
            list.value = res.data;
          },
          myfail: (err) => {
            formatAppLog("log", "at pages/myorder/index.vue:151", "获取订单信息错误", err);
            return uni.showToast({
              title: "获取订单信息错误",
              icon: "error"
            });
          }
        });
      };
      const toOrder = (e2) => {
        uni.navigateTo({
          url: "./order?oid=" + e2.currentTarget.dataset.id
        });
      };
      const onCounterOver = () => {
        loadList();
      };
      return (_ctx, _cache) => {
        const _component_formater = resolveEasycom(vue.resolveDynamicComponent("formater"), __easycom_1$3);
        const _component_counter = resolveEasycom(vue.resolveDynamicComponent("counter"), __easycom_0$6);
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(__easycom_0$7, { titleText: "订单" }),
          vue.createElementVNode("view", { style: { "width": "100%", "border-bottom": "0 none", "position": "fixed", "z-index": "2" } }, [
            vue.createElementVNode("view", { style: { "background": "#ffffff", "position": "relative" } }, [
              vue.createElementVNode("view", { class: "h-tab vp-flex" }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass("h-tab-item vp-flex_1 " + (filt.value == "" ? "on" : "")),
                    "data-filt": "",
                    onClick: onFilterChange
                  },
                  "全部",
                  2
                  /* CLASS */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass("h-tab-item vp-flex_1 " + (filt.value == 1 ? "on" : "")),
                    "data-filt": "1",
                    onClick: onFilterChange
                  },
                  "待支付",
                  2
                  /* CLASS */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass("h-tab-item vp-flex_1 " + (filt.value == 2 ? "on" : "")),
                    "data-filt": "2",
                    onClick: onFilterChange
                  },
                  "待服务",
                  2
                  /* CLASS */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass("h-tab-item vp-flex_1 " + (filt.value == 3 ? "on" : "")),
                    "data-filt": "3",
                    onClick: onFilterChange
                  },
                  "已完成",
                  2
                  /* CLASS */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass("h-tab-item vp-flex_1 " + (filt.value == 4 ? "on" : "")),
                    "data-filt": "4",
                    onClick: onFilterChange
                  },
                  "已取消",
                  2
                  /* CLASS */
                )
              ])
            ])
          ]),
          vue.createElementVNode("view", { style: { "height": "100rpx" } }),
          list.value != null ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            [
              list.value != null && list.value.length == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                style: { "padding": "40rpx 40rpx 40rpx 40rpx", "text-align": "center" }
              }, [
                vue.createElementVNode("image", {
                  src: "/static/images/empty.png",
                  mode: "widthFix",
                  style: { "width": "200rpx" }
                }),
                vue.createElementVNode("view", { class: "f5" }, "没有相关内容~")
              ])) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "od-list"
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(list.value, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: index,
                      class: "od-item",
                      onClick: toOrder,
                      "data-id": item.out_trade_no
                    }, [
                      vue.createElementVNode("view", { class: "weui-cell weui-cell_access" }, [
                        vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                          vue.createElementVNode("view", null, [
                            vue.createElementVNode("image", {
                              src: item.service_logo_image_url,
                              mode: "widthFix",
                              class: "od-logo",
                              style: { "width": "100rpx", "height": "100rpx", "margin-right": "20rpx" }
                            }, null, 8, ["src"])
                          ])
                        ]),
                        vue.createElementVNode("view", { class: "weui-cell__bd" }, [
                          vue.createElementVNode("view", null, [
                            vue.createElementVNode(
                              "text",
                              { style: { "font-weight": "bold" } },
                              vue.toDisplayString(item.service_name),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createElementVNode("view", { class: "od-info" }, [
                            item.service_stype <= 20 ? (vue.openBlock(), vue.createElementBlock(
                              vue.Fragment,
                              { key: 0 },
                              [
                                vue.createElementVNode("view", null, [
                                  vue.createElementVNode(
                                    "text",
                                    null,
                                    vue.toDisplayString(item.hospital_name) + "（" + vue.toDisplayString(item.area_name) + "）",
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                vue.createElementVNode("view", null, [
                                  vue.createTextVNode(" 预约时间： "),
                                  vue.createVNode(_component_formater, {
                                    timestamp: item.starttime,
                                    format: "MM-dd hh:mm"
                                  }, null, 8, ["timestamp"])
                                ]),
                                vue.createElementVNode("view", null, [
                                  vue.createTextVNode(" 就诊人员： "),
                                  vue.createElementVNode(
                                    "text",
                                    null,
                                    vue.toDisplayString(item.client_name),
                                    1
                                    /* TEXT */
                                  )
                                ])
                              ],
                              64
                              /* STABLE_FRAGMENT */
                            )) : vue.createCommentVNode("v-if", true),
                            item.service_stype > 20 && item.service_stype < 100 ? (vue.openBlock(), vue.createElementBlock(
                              vue.Fragment,
                              { key: 1 },
                              [
                                vue.createElementVNode("view", null, [
                                  vue.createElementVNode(
                                    "text",
                                    null,
                                    vue.toDisplayString(item.hospital_name) + "（" + vue.toDisplayString(item.area_name) + "）",
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                vue.createElementVNode("view", null, [
                                  vue.createTextVNode(" 处理时间： "),
                                  vue.createVNode(_component_formater, {
                                    timestamp: item.starttime,
                                    format: "MM-dd hh:mm"
                                  }, null, 8, ["timestamp"])
                                ])
                              ],
                              64
                              /* STABLE_FRAGMENT */
                            )) : vue.createCommentVNode("v-if", true),
                            item.service_stype > 100 ? (vue.openBlock(), vue.createElementBlock(
                              vue.Fragment,
                              { key: 2 },
                              [
                                vue.createElementVNode("view", null, [
                                  vue.createTextVNode(" 服务时间： "),
                                  vue.createVNode(_component_formater, {
                                    timestamp: item.starttime,
                                    format: "MM-dd hh:mm"
                                  }, null, 8, ["timestamp"])
                                ]),
                                vue.createElementVNode("view", null, [
                                  vue.createTextVNode(" 服务对象： "),
                                  vue.createElementVNode(
                                    "text",
                                    null,
                                    vue.toDisplayString(item.client_name),
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                vue.createCommentVNode(" <view>服务地址：<text>{{item.address.address}}</text> </view> ")
                              ],
                              64
                              /* STABLE_FRAGMENT */
                            )) : vue.createCommentVNode("v-if", true)
                          ])
                        ]),
                        vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                          vue.createCommentVNode(" 待付款 "),
                          item.trade_state == "待支付" ? (vue.openBlock(), vue.createElementBlock(
                            vue.Fragment,
                            { key: 0 },
                            [
                              vue.createElementVNode("view", { style: { "color": "#ffa200" } }, [
                                vue.createElementVNode("text", null, "待支付")
                              ]),
                              vue.createElementVNode("view", { style: { "color": "#ffa200" } }, [
                                vue.createVNode(_component_counter, {
                                  style: { "font-size": "24rpx" },
                                  second: item._exp_time,
                                  onCounterOver
                                }, null, 8, ["second"])
                              ])
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          )) : vue.createCommentVNode("v-if", true),
                          vue.createCommentVNode(" 进行中 "),
                          item.trade_state == "待服务" ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 1,
                            style: { "color": "#1da6fd" }
                          }, [
                            vue.createElementVNode("text", null, "待服务")
                          ])) : vue.createCommentVNode("v-if", true),
                          vue.createCommentVNode(" 已完成 "),
                          item.trade_state == "已完成" ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 2,
                            style: { "color": "#21c521" }
                          }, [
                            vue.createElementVNode("text", null, "已完成")
                          ])) : vue.createCommentVNode("v-if", true),
                          vue.createCommentVNode(" 已取消 "),
                          item.trade_state == "已取消" ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 3,
                            style: { "color": "#999999" }
                          }, [
                            vue.createElementVNode("text", null, "已取消")
                          ])) : vue.createCommentVNode("v-if", true)
                        ])
                      ])
                    ], 8, ["data-id"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]))
            ],
            64
            /* STABLE_FRAGMENT */
          )) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  };
  const PagesMyorderIndex = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__file", "C:/uni_apps/peizhenApp/pages/myorder/index.vue"]]);
  const _sfc_main$j = {
    __name: "share",
    props: ["shareModal"],
    setup(__props) {
      const props = __props;
      const shareModalClone = vue.ref(false);
      const preventTouchMove = () => {
        formatAppLog("log", "at components/share/share.vue:45", "占位：函数 preventTouchMove 未声明");
      };
      const hideShareModal = () => {
        shareModalClone.value = false;
      };
      const shareByPoster = () => {
      };
      formatAppLog("log", "at components/share/share.vue:53", props.shareModal, "shareModal");
      vue.watch(() => props.shareModal, (val) => {
        shareModalClone.value = val;
      }, { immediate: true });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          shareModalClone.value ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: "modal-mask",
              onTouchmove: vue.withModifiers(preventTouchMove, ["stop", "prevent"])
            },
            null,
            32
            /* NEED_HYDRATION */
          )) : vue.createCommentVNode("v-if", true),
          shareModalClone.value ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "modal-dialog"
          }, [
            vue.createElementVNode("view", {
              class: "vp-flex",
              style: { "height": "100%", "flex-direction": "column" }
            }, [
              vue.createElementVNode("view", {
                class: "vp-flex_1",
                onClick: hideShareModal
              }),
              vue.createElementVNode("view", null, [
                vue.createElementVNode("view", {
                  class: "modal-main",
                  style: { "background": "#f4f4f4" }
                }, [
                  vue.createElementVNode("view", { class: "modal-hd" }, [
                    vue.createElementVNode("text", { class: "modal-hd-title" }, "转发分享"),
                    vue.createElementVNode("image", {
                      class: "modal-hd-closer",
                      src: "/static/images/modal_closer.png",
                      mode: "widthFix",
                      onClick: hideShareModal
                    })
                  ]),
                  vue.createElementVNode("view", { class: "modal-bd" }, [
                    vue.createElementVNode("view", { style: { "padding": "60rpx 0" } }, [
                      vue.createElementVNode("view", { class: "push-types" }, [
                        vue.createElementVNode("view", { class: "vp-flex" }, [
                          vue.createElementVNode("view", { class: "vp-flex_1" }, [
                            vue.createElementVNode("button", {
                              "open-type": "share",
                              class: "push-type"
                            }, [
                              vue.createElementVNode("view", { class: "push-icon" }, [
                                vue.createElementVNode("image", {
                                  src: "/static/images/push_wx.png",
                                  mode: "widthFix"
                                })
                              ]),
                              vue.createElementVNode("view", { class: "push-text" }, [
                                vue.createElementVNode("text", null, "发给微信好友")
                              ])
                            ])
                          ]),
                          vue.createElementVNode("view", { class: "vp-flex_1" }, [
                            vue.createElementVNode("view", {
                              class: "push-type",
                              onClick: shareByPoster
                            }, [
                              vue.createElementVNode("view", { class: "push-icon" }, [
                                vue.createElementVNode("image", {
                                  src: "/static/images/push_img.png",
                                  mode: "widthFix"
                                })
                              ]),
                              vue.createElementVNode("view", { class: "push-text" }, [
                                vue.createElementVNode("text", null, "生成分享图片")
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  };
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-11758b78"], ["__file", "C:/uni_apps/peizhenApp/components/share/share.vue"]]);
  const _sfc_main$i = {
    __name: "index",
    setup(__props) {
      const app = getApp();
      onShow(() => {
        loadList();
      });
      vue.ref("");
      const mine = vue.ref({});
      const statistic = vue.ref({});
      const loadList = () => {
        app.globalData.utils.myrequest({
          myurl: "/User/index",
          header: {
            token: uni.getStorageSync("token")
          },
          mysuccess: (res) => {
            formatAppLog("log", "at pages/myuser/index.vue:98", "获取用户信息", res);
            mine.value = res.data.mine;
            statistic.value = res.data.statistic;
          },
          myfail: (err) => {
            formatAppLog("log", "at pages/myuser/index.vue:105", "获取用户信息错误", err);
            return uni.showToast({
              title: "获取用户信息错误",
              icon: "error"
            });
          }
        });
      };
      const toOrders = (e2) => {
        app.globalData.orders_filt = e2.currentTarget.dataset.filt;
        uni.switchTab({
          url: "/pages/myorder/index"
        });
      };
      const clone_shareModal = vue.ref(false);
      const showShareModal = () => {
        clone_shareModal.value = true;
      };
      const onClientChange = () => {
        uni.navigateTo({
          url: "../clients/index?act=delete"
        });
      };
      return (_ctx, _cache) => {
        const _component_share = resolveEasycom(vue.resolveDynamicComponent("share"), __easycom_1$2);
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode("view", {
            class: "op-cells",
            style: { "background-color": "#ffffff", "padding": "0 0 60rpx 0", "overflow": "hidden", "text-align": "center" }
          }, [
            vue.createElementVNode("view", { style: { "margin-top": "40rpx" } }, [
              vue.createElementVNode("view", { style: { "display": "inline-block", "width": "150rpx", "height": "150rpx", "border-radius": "200rpx", "overflow": "hidden" } }, [
                mine.value.avatar ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 0,
                  src: mine.value.avatar_url,
                  style: { "width": "150rpx", "height": "150rpx" }
                }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock("image", {
                  key: 1,
                  src: "/static/images/avatar.jpg",
                  style: { "width": "150rpx", "height": "150rpx" }
                }))
              ])
            ]),
            vue.createElementVNode("view", { style: { "padding-top": "20rpx" } }, [
              vue.createElementVNode(
                "text",
                { class: "user-nickname" },
                vue.toDisplayString(mine.value.nickname ? mine.value.nickname : "用户" + mine.value._id),
                1
                /* TEXT */
              )
            ])
          ]),
          vue.createElementVNode("view", {
            class: "weui-cells op-cells",
            style: { "margin-top": "20rpx" }
          }, [
            vue.createElementVNode("view", { class: "weui-cell" }, [
              vue.createElementVNode("view", { class: "weui-cell__bd" }, "我的订单"),
              vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                vue.createElementVNode("text", {
                  onClick: toOrders,
                  style: { "font-size": "26rpx" }
                }, "全部")
              ])
            ]),
            vue.createElementVNode("view", {
              class: "weui-cell",
              style: { "padding": "0" }
            }, [
              vue.createElementVNode("view", { class: "weui-cell__bd" }, [
                vue.createElementVNode("view", {
                  class: "data-cell",
                  "hover-class": "weui-cell_active",
                  onClick: toOrders,
                  "data-filt": "1"
                }, [
                  vue.createElementVNode("view", { class: "data-icon" }, [
                    vue.createElementVNode("image", {
                      src: "/static/images/od_10.png",
                      mode: "widthFix"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "data-txt" }, "待支付"),
                  statistic.value.topays > 0 ? (vue.openBlock(), vue.createElementBlock(
                    "text",
                    {
                      key: 0,
                      class: "data-cell-hint data-cell-hint-red"
                    },
                    vue.toDisplayString(statistic.value.topays),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true)
                ])
              ]),
              vue.createElementVNode("view", { class: "weui-cell__bd" }, [
                vue.createElementVNode("view", {
                  class: "data-cell",
                  "hover-class": "weui-cell_active",
                  onClick: toOrders,
                  "data-filt": "2"
                }, [
                  vue.createElementVNode("view", { class: "data-icon" }, [
                    vue.createElementVNode("image", {
                      src: "/static/images/od_20.png",
                      mode: "widthFix"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "data-txt" }, "待服务"),
                  statistic.value.todos > 0 ? (vue.openBlock(), vue.createElementBlock(
                    "text",
                    {
                      key: 0,
                      class: "data-cell-hint data-cell-hint-red"
                    },
                    vue.toDisplayString(statistic.value.todos),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true)
                ])
              ]),
              vue.createElementVNode("view", { class: "weui-cell__bd" }, [
                vue.createElementVNode("view", {
                  class: "data-cell",
                  "hover-class": "weui-cell_active",
                  onClick: toOrders,
                  "data-filt": "3"
                }, [
                  vue.createElementVNode("view", { class: "data-icon" }, [
                    vue.createElementVNode("image", {
                      src: "/static/images/od_30.png",
                      mode: "widthFix"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "data-txt" }, "已完成")
                ])
              ]),
              vue.createElementVNode("view", { class: "weui-cell__bd" }, [
                vue.createElementVNode("view", {
                  class: "data-cell",
                  "hover-class": "weui-cell_active",
                  onClick: toOrders,
                  "data-filt": "4"
                }, [
                  vue.createElementVNode("view", { class: "data-icon" }, [
                    vue.createElementVNode("image", {
                      src: "/static/images/od_40.png",
                      mode: "widthFix"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "data-txt" }, "已取消")
                ])
              ])
            ])
          ]),
          vue.createElementVNode("view", {
            class: "weui-cells op-cells",
            style: { "margin-top": "20rpx" }
          }, [
            vue.createElementVNode("view", {
              class: "weui-cell weui-cell_access",
              "hover-class": "weui-cell_active",
              onClick: onClientChange
            }, [
              vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                vue.createElementVNode("image", {
                  src: "/static/images/ic_clients.png",
                  style: { "display": "block", "margin-right": "20rpx", "width": "20px", "height": "20px" }
                })
              ]),
              vue.createElementVNode("view", { class: "weui-cell__bd" }, "服务对象管理"),
              vue.createElementVNode("view", { class: "weui-cell__ft weui-cell__ft_in-access" })
            ]),
            vue.createElementVNode("view", {
              class: "weui-cell weui-cell_access",
              "hover-class": "weui-cell_active",
              onClick: showShareModal
            }, [
              vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                vue.createElementVNode("image", {
                  src: "/static/images/ic_share.png",
                  style: { "display": "block", "margin-right": "20rpx", "width": "20px", "height": "20px" }
                })
              ]),
              vue.createElementVNode("view", { class: "weui-cell__bd" }, "分享转发"),
              vue.createElementVNode("view", { class: "weui-cell__ft weui-cell__ft_in-access" })
            ])
          ]),
          vue.createVNode(_component_share, { shareModal: clone_shareModal.value }, null, 8, ["shareModal"])
        ]);
      };
    }
  };
  const PagesMyuserIndex = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__file", "C:/uni_apps/peizhenApp/pages/myuser/index.vue"]]);
  const _sfc_main$h = {
    __name: "index",
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(__easycom_0$7)
        ]);
      };
    }
  };
  const PagesMysearchIndex = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__file", "C:/uni_apps/peizhenApp/pages/mysearch/index.vue"]]);
  const _sfc_main$g = {
    __name: "index",
    setup(__props) {
      vue.onBeforeMount(() => {
        setNavSize();
      });
      const statusheight = vue.ref(0);
      const navconheight = vue.ref(0);
      const setNavSize = async () => {
        await uni.getSystemInfo();
        const res = await uni.getSystemInfo();
        formatAppLog("log", "at pages/hospital/index.vue:108", "res", res);
        statusheight.value = res.statusBarHeight * 2;
        if (!uni.getSystemInfoSync().platform == "ios") {
          navconheight.value = 96;
        } else {
          navconheight.value = 88;
        }
      };
      const app = getApp();
      const hospital = vue.ref({});
      const services = vue.ref([]);
      onLoad((options) => {
        app.globalData.utils.myrequest({
          myurl: "/Hospital/index",
          data: {
            hid: options.hid
          },
          mysuccess: (res) => {
            formatAppLog("log", "at pages/hospital/index.vue:126", "医院详情页数据", res);
            hospital.value = res.data.hospital;
            services.value = res.data.services;
          }
        });
      });
      const clone_shareModal = vue.ref(false);
      const showShareModal = () => {
        clone_shareModal.value = true;
      };
      const toMap = () => {
        const point = bMapTransQQMap(hospital.value.lng, hospital.value.lat);
        let key = "MMCBZ-J6NLL-TLOPM-E7C2C-SJ4OV-J2BPO";
        requirePlugin("routePlan");
        let referer = app.globalData.name;
        let endPoint = JSON.stringify({
          //终点
          "name": hospital.value.name,
          "latitude": point.lat,
          "longitude": point.lng
        });
        uni.navigateTo({
          url: "plugin://routePlan/index?key=" + key + "&referer=" + referer + "&endPoint=" + endPoint
        });
      };
      const bMapTransQQMap = (lng, lat) => {
        let x_pi = 3.141592653589793 * 3e3 / 180;
        let x = lng - 65e-4;
        let y2 = lat - 6e-3;
        let z2 = Math.sqrt(x * x + y2 * y2) - 2e-5 * Math.sin(y2 * x_pi);
        let theta = Math.atan2(y2, x) - 3e-6 * Math.cos(x * x_pi);
        let lngs = z2 * Math.cos(theta);
        let lats = z2 * Math.sin(theta);
        return {
          lng: lngs,
          lat: lats
        };
      };
      const toService = (e2) => {
        uni.navigateTo({
          url: "/pages/service/index?hid=" + hospital.value.id + "&svid=" + e2.currentTarget.dataset.svid
        });
      };
      return (_ctx, _cache) => {
        const _component_navbar = resolveEasycom(vue.resolveDynamicComponent("navbar"), __easycom_0$7);
        const _component_share = resolveEasycom(vue.resolveDynamicComponent("share"), __easycom_1$2);
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(_component_navbar, { myBackground: "none" }),
          vue.createElementVNode("view", { style: { "position": "relative" } }, [
            vue.createElementVNode("image", {
              src: hospital.value.avatar_url,
              mode: "aspectFill",
              style: { "filter": "blur(50rpx) brightness(0.8)", "display": "block", "width": "100%", "height": "550rpx", "overflow": "hidden" }
            }, null, 8, ["src"]),
            vue.createElementVNode(
              "view",
              {
                style: vue.normalizeStyle("position:absolute;top:" + (navconheight.value + statusheight.value) + "rpx;padding-top:65rpx;overflow:hidden;width:100%;")
              },
              [
                vue.createElementVNode("view", { class: "hospital-hd" }, [
                  vue.createElementVNode("view", {
                    class: "weui-cell weui-cell_access",
                    "hover-class": "weui-cell_active",
                    onClick: showShareModal
                  }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("image", {
                        src: hospital.value.avatar_url,
                        mode: "aspectFill",
                        style: { "position": "absolute", "top": "-65rpx", "display": "block", "width": "150rpx", "height": "135rpx", "border-radius": "10rpx", "overflow": "hidden" }
                      }, null, 8, ["src"])
                    ]),
                    vue.createElementVNode("view", {
                      class: "weui-cell__bd",
                      style: { "padding-left": "170rpx" }
                    }, [
                      vue.createElementVNode("view", { style: { "position": "absolute", "top": "-65rpx" } }, [
                        vue.createElementVNode(
                          "text",
                          { style: { "font-size": "36rpx", "color": "#ffffff", "font-weight": "bold" } },
                          vue.toDisplayString(hospital.value.name),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", null, [
                        vue.createElementVNode(
                          "text",
                          { class: "hosp-rank" },
                          vue.toDisplayString(hospital.value.rank),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "hosp-label" },
                          vue.toDisplayString(hospital.value.label),
                          1
                          /* TEXT */
                        )
                      ])
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__ft weui-cell__ft_in-access" }, [
                      vue.createElementVNode("text", { class: "f4" }, "转发")
                    ])
                  ]),
                  vue.createElementVNode("view", {
                    class: "weui-cell weui-cell_access",
                    "hover-class": "weui-cell_active",
                    onClick: toMap
                  }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("image", {
                        src: "/static/images/ic_address.png",
                        mode: "aspectFill",
                        style: { "margin-right": "10rpx", "display": "block", "width": "40rpx", "height": "40rpx" }
                      })
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }, [
                      vue.createElementVNode("view", null, [
                        vue.createElementVNode(
                          "text",
                          { style: { "font-size": "24rpx" } },
                          vue.toDisplayString(hospital.value.city) + vue.toDisplayString(hospital.value.district) + vue.toDisplayString(hospital.value.address),
                          1
                          /* TEXT */
                        )
                      ])
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__ft weui-cell__ft_in-access" }, [
                      vue.createElementVNode("text", { class: "f4" }, "导航")
                    ])
                  ])
                ]),
                vue.createElementVNode("view", { class: "hospital-bd" }, [
                  vue.createElementVNode("view", { class: "weui-cells serv-list" }, [
                    vue.createElementVNode("view", { class: "weui-cell serv-item" }, [
                      vue.createElementVNode("view", { class: "weui-cell__bd" }, [
                        vue.createElementVNode("view", { style: { "padding-top": "10rpx" } }, [
                          vue.createElementVNode("text", { class: "serv-name" }, "在线预约您需要的服务")
                        ])
                      ]),
                      vue.createElementVNode("view", { class: "weui-cell__ft" })
                    ]),
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(services.value, (item, index) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "weui-cell serv-item",
                          onClick: toService,
                          "data-svid": item.id,
                          key: index
                        }, [
                          item.use_switch == 1 ? (vue.openBlock(), vue.createElementBlock(
                            vue.Fragment,
                            { key: 0 },
                            [
                              vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                                vue.createElementVNode("image", {
                                  class: "serv-logo",
                                  src: item.logo_image ? item.logo_image_url : "./static/images/avatar.jpg",
                                  mode: "aspectFill"
                                }, null, 8, ["src"])
                              ]),
                              vue.createElementVNode("view", { class: "weui-cell__bd" }, [
                                vue.createElementVNode("view", null, [
                                  vue.createElementVNode(
                                    "text",
                                    { class: "serv-name" },
                                    vue.toDisplayString(item.name),
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                vue.createElementVNode(
                                  "view",
                                  { class: "serv-line serv-intro" },
                                  vue.toDisplayString(item.intro),
                                  1
                                  /* TEXT */
                                ),
                                vue.createElementVNode("view", { class: "serv-line" }, [
                                  vue.createElementVNode(
                                    "text",
                                    { class: "serv-price" },
                                    vue.toDisplayString(item.price),
                                    1
                                    /* TEXT */
                                  ),
                                  vue.createElementVNode("text", { class: "serv-unit" }, "元/次")
                                ])
                              ]),
                              vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                                vue.createElementVNode("button", { class: "btn1m" }, "预约")
                              ])
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          )) : vue.createCommentVNode("v-if", true)
                        ], 8, ["data-svid"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ])
              ],
              4
              /* STYLE */
            )
          ]),
          vue.createVNode(_component_share, { shareModal: clone_shareModal.value }, null, 8, ["shareModal"])
        ]);
      };
    }
  };
  const PagesHospitalIndex = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__file", "C:/uni_apps/peizhenApp/pages/hospital/index.vue"]]);
  const _sfc_main$f = {
    __name: "dtPicker",
    props: {
      timestamp: {
        type: Number,
        default: 0
      },
      emptyText: {
        type: String,
        default: ""
      },
      placeholder: {
        type: String,
        default: ""
      }
    },
    emits: ["dtPickerChanged"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const now = (/* @__PURE__ */ new Date()).getTime();
      const self_range = vue.ref([]);
      let self_days = null;
      let self_days_text = "";
      let self_hours = null;
      let self_seconds = null;
      const self_value = vue.ref([0, 0, 0]);
      const value_text = vue.ref();
      vue.onBeforeMount(() => {
        const days = [""];
        const days_text = [props.emptyText];
        for (let i2 = 0; i2 < 20; i2++) {
          days.push(TIME_FORMAT(now + 864e5 * i2, "YYYY-MM-dd"));
          let text = TIME_FORMAT(now + 864e5 * i2, "M月d日");
          if (i2 == 0) {
            text += " （今天）";
          }
          if (i2 == 1) {
            text += " （明天）";
          }
          if (i2 == 2) {
            text += " （后天）";
          }
          days_text.push(text);
          const hours = [
            "00",
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23"
          ];
          const seconds = [
            "00",
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
            "31",
            "32",
            "33",
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44",
            "45",
            "46",
            "47",
            "48",
            "49",
            "50",
            "51",
            "52",
            "53",
            "54",
            "55",
            "56",
            "57",
            "58",
            "59"
          ];
          const range = [];
          range[0] = days_text;
          range[1] = hours;
          range[2] = seconds;
          self_range.value = range;
          self_days = days;
          self_days_text = days_text;
          self_hours = hours;
          self_seconds = seconds;
        }
      });
      const doChange = () => {
        value_text.value = getValueText();
        var day = self_days[self_value.value[0]];
        var hour = self_hours[self_value.value[1]];
        var second = self_seconds[self_value.value[2]];
        var datetime = "";
        if (day) {
          datetime = day + " " + hour + ":" + second;
        }
        var timestamp = 0;
        if (datetime) {
          timestamp = new Date(datetime.replace(/-/g, "/")).getTime();
        }
        emit("dtPickerChanged", {
          detail: {
            value: timestamp
          }
        });
      };
      const doColumnChange = (e2) => {
        var value = self_value.value;
        value[e2.detail.column] = e2.detail.value;
        self_value.value = value;
      };
      const TIME_FORMAT = (t2, fmt) => {
        const newDate = /* @__PURE__ */ new Date();
        newDate.setTime(t2);
        return newDate.VP_FORMAT(fmt);
      };
      const timestampChange = (timestamp) => {
        if (!self_days) {
          return;
        }
        if (timestamp > 0) {
          var days = self_days;
          var hours = self_hours;
          var seconds = self_seconds;
        }
        if (timestamp < now) {
          timestamp = now;
        }
        var date = TIME_FORMAT(timestamp, "YYYY-MM-dd");
        var hour = TIME_FORMAT(timestamp, "hh");
        var minutes = TIME_FORMAT(timestamp, "mm");
        var value = vue.toRaw(self_value.value);
        for (var i2 = 0; i2 < days.length; i2++) {
          if (date == days[i2]) {
            value[0] = i2;
            break;
          }
        }
        for (var i2 = 0; i2 < hours.length; i2++) {
          if (hour == hours[i2]) {
            value[1] = i2;
            break;
          }
        }
        for (var i2 = 0; i2 < seconds.length; i2++) {
          if (minutes == seconds[i2]) {
            value[2] = i2;
            break;
          }
        }
        self_value.value = value;
        value_text.value = getValueText();
      };
      const getValueText = () => {
        var day = self_days_text[self_value.value[0]];
        var hour = self_hours[self_value.value[1]];
        var second = self_seconds[self_value.value[2]];
        if (self_days[self_value.value[0]] == "") {
          return day;
        } else {
          return day + " " + hour + ":" + second;
        }
      };
      formatAppLog("log", "at components/dtPicker/dtPicker.vue:215", props, "props");
      vue.watch(props.timestamp, (nd) => {
        timestampChange(nd);
      }, { immediate: true });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode("picker", {
            mode: "multiSelector",
            onChange: doChange,
            onColumnchange: doColumnChange,
            value: self_value.value,
            range: self_range.value
          }, [
            vue.createElementVNode("input", {
              disabled: true,
              "placeholder-style": "color:#bbbbbb",
              placeholder: __props.placeholder,
              value: value_text.value
            }, null, 8, ["placeholder", "value"])
          ], 40, ["value", "range"])
        ]);
      };
    }
  };
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-b37863b7"], ["__file", "C:/uni_apps/peizhenApp/components/dtPicker/dtPicker.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$e = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      },
      onceRender: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 生成样式数据
      stylesObject() {
        let styles = {
          ...this.styles,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transform = "";
        for (let i2 in styles) {
          let line = this.toLine(i2);
          transform += line + ":" + styles[i2] + ";";
        }
        return transform;
      },
      // 初始化动画条件
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i2 in obj) {
          try {
            if (typeof obj[i2] === "object") {
              this.animation[i2](...obj[i2]);
            } else {
              this.animation[i2](obj[i2]);
            }
          } catch (e2) {
            formatAppLog("error", "at uni_modules/uni-transition/components/uni-transition/uni-transition.vue:148", `方法 ${i2} 不存在`);
          }
        }
        this.animation.step(config);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过度动画
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type2)[mode];
          } else {
            styles.transform += this.animationType(type2)[mode] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildStyle(type, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 0 : 1,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])), [
      [vue.vShow, $data.isShow]
    ]);
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$a], ["__file", "C:/uni_apps/peizhenApp/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$d = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      },
      borderRadius: {
        type: String
      }
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          backgroundColor: "transparent",
          borderRadius: this.borderRadius || "0",
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: "top"
      };
    },
    computed: {
      getStyles() {
        let res = { backgroundColor: this.bg };
        if (this.borderRadius || "0") {
          res = Object.assign(res, { borderRadius: this.borderRadius });
        }
        return res;
      },
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    activated() {
      this.setH5Visible(!this.showPopup);
    },
    deactivated() {
      this.setH5Visible(true);
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible(visible = true) {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
      clear(e2) {
        e2.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          formatAppLog("error", "at uni_modules/uni-popup/components/uni-popup/uni-popup.vue:298", "缺少类型：", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      /**
       * 中间弹出样式处理
       */
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$4);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
              key: "1",
              name: "mask",
              "mode-class": "fade",
              styles: $data.maskClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uni_transition, {
              key: "2",
              "mode-class": $data.ani,
              name: "content",
              styles: $data.transClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle($options.getStyles),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
          ],
          32
          /* NEED_HYDRATION */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$9], ["__scopeId", "data-v-4dd3c44b"], ["__file", "C:/uni_apps/peizhenApp/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
  const _sfc_main$c = {
    __name: "index",
    setup(__props) {
      const app = getApp();
      const service = vue.ref({});
      onLoad((options) => {
        formatAppLog("log", "at pages/service/index.vue:248", "options", options);
        mainLoad(options);
      });
      const hospitals = vue.ref([]);
      const hospital_index = vue.ref(0);
      const order = vue.reactive({
        "address": {
          "cityName": "",
          "countyName": "",
          "detailInfo": "",
          "userName": ""
        },
        "demand": "",
        "hospital_id": 0,
        "hospital_name": "",
        "receiveAddress": "",
        "service_code": "",
        "service_id": 0,
        "service_name": "",
        "service_stype": "",
        "starttime": 0,
        "tel": "",
        "client": {
          "age": 0,
          "mobile": "",
          "name": "",
          "sex": 0
        },
        price: 0
      });
      const mainLoad = (options) => {
        app.globalData.utils.myrequest({
          myurl: "/Service/order",
          data: {
            svid: options.svid
          },
          mysuccess: (res) => {
            formatAppLog("log", "at pages/service/index.vue:286", "详情页数据", res);
            service.value = res.data.service;
            formatAppLog("log", "at pages/service/index.vue:288", "service", service.value);
            hospitals.value = res.data.hospitals;
            formatAppLog("log", "at pages/service/index.vue:290", "hospitals", hospitals.value);
            hospital_index.value = hospitals.value.findIndex((item) => {
              return item.id == options.hid;
            });
            order.price = hospitals.value[hospital_index.value].service_price;
            order.hospital_id = hospitals.value[hospital_index.value].id;
            order.hospital_name = hospitals.value[hospital_index.value].name;
          }
        });
      };
      const onHospitalChange = (e2) => {
        hospital_index.value = e2.detail.value;
        order.price = hospitals.value[hospital_index.value].service_price;
        order.hospital_id = hospitals.value[hospital_index.value].id;
        order.hospital_name = hospitals.value[hospital_index.value].name;
      };
      const onStartTimeChanged = (obj) => {
        formatAppLog("log", "at pages/service/index.vue:328", "时间", obj);
        order.starttime = obj.detail.value;
      };
      const client = vue.reactive({
        name: "",
        age: 1,
        mobile: "",
        sex: 0
      });
      const onClientChange = () => {
        uni.navigateTo({
          url: "../clients/index?act=select"
        });
      };
      uni.$on("changeClient", (data) => {
        client.name = data.name;
        client.age = data.age;
        client.mobile = data.mobile;
        client.sex = data.sex;
        order.client.name = data.name;
        order.client.age = data.age;
        order.client.mobile = data.mobile;
        order.client.sex = data.sex;
      });
      const cfg = vue.reactive({
        page_xy: "",
        page_fw: ""
      });
      const is_xieyi = vue.ref(false);
      const onXieyiChange = () => {
        is_xieyi.value = !is_xieyi.value;
      };
      const onAddressChange = () => {
        uni.chooseAddress({
          success(res) {
            formatAppLog("log", "at pages/service/index.vue:365", "成功地址", res);
            order.address.userName = res.userName;
            order.address.cityName = res.cityName;
            order.address.countyName = res.countyName;
            order.address.detailInfo = res.detailInfo;
          },
          fail(res) {
            formatAppLog("log", "at pages/service/index.vue:372", "失败地址", res);
          }
        });
      };
      const validMobile = vue.reactive({
        validCode: "",
        phone: ""
      });
      const countdown = vue.reactive({
        validText: "获取验证码",
        time: 30
      });
      const popup = vue.ref();
      let flag = true;
      const countdownChange = () => {
        if (flag === false) {
          return uni.showToast({
            title: "别重复点",
            icon: "error"
          });
        }
        const phoneRegex = /^(?:(?:\+|00)86)?1\d{10}$/;
        if (!phoneRegex.test(validMobile.phone)) {
          return uni.showToast({
            title: "手机号不合法",
            icon: "error"
          });
        }
        flag = false;
        app.globalData.utils.myrequest({
          myurl: "/get/code",
          method: "POST",
          data: {
            tel: validMobile.phone
          },
          mysuccess: (res) => {
            formatAppLog("log", "at pages/service/index.vue:411", "验证码信息", res);
            uni.showToast({
              title: "验证码已发送,注意查收",
              duration: 1200,
              icon: "none"
            });
          },
          myfail: (err) => {
            formatAppLog("log", "at pages/service/index.vue:420", "我的错误提示", err);
            return uni.showToast({
              title: "验证码获取失败",
              icon: "error"
            });
          }
        });
        let timer = setInterval(() => {
          if (countdown.time <= 0) {
            countdown.validText = "获取验证码";
            countdown.time = 30;
            flag = true;
            clearInterval(timer);
          } else {
            countdown.validText = `剩余${countdown.time}秒`;
            countdown.time -= 1;
          }
        }, 1e3);
      };
      const cancel = () => {
        popup.value.close();
      };
      const ok = () => {
        if (!validMobile.phone || !validMobile.validCode) {
          return uni.showToast({
            title: "输入不完整",
            duration: 1200,
            icon: "error"
          });
        }
        app.globalData.utils.myrequest({
          myurl: "/user/authentication",
          method: "POST",
          data: {
            tel: validMobile.phone,
            code: validMobile.validCode
          },
          mysuccess: (res) => {
            formatAppLog("log", "at pages/service/index.vue:462", "验证码验证信息", res);
            uni.showToast({
              title: res.msg,
              duration: 1200,
              icon: "none"
            });
            uni.setStorageSync("token", res.data.token);
            popup.value.close();
          },
          myfail: (err) => {
            formatAppLog("log", "at pages/service/index.vue:473", "我的验证码错误提示", err);
            return uni.showToast({
              title: err.data.msg ? err.data.msg : "验证码错误",
              icon: "none"
            });
          }
        });
      };
      const submit = () => {
        if (!is_xieyi.value) {
          return uni.showToast({
            title: "请勾选协议",
            duration: 1200,
            icon: "error"
          });
        }
        if (!uni.getStorageSync("token")) {
          popup.value.open("center");
          return;
        }
        createOrder();
      };
      const createOrder = () => {
        order.service_code = service.value.code;
        order.service_id = service.value.id;
        order.service_name = service.value.name;
        order.service_stype = service.value.stype;
        formatAppLog("log", "at pages/service/index.vue:505", "订单信息", order);
        app.globalData.utils.myrequest({
          myurl: "/pay/createOrder",
          method: "POST",
          data: order,
          header: { token: uni.getStorageSync("token") },
          mysuccess: (res) => {
            formatAppLog("log", "at pages/service/index.vue:512", "订单提交信息", res);
            uni.showToast({
              title: "订单已提交",
              duration: 1200,
              icon: "success"
            });
            uni.switchTab({
              url: "../myorder/index"
            });
          },
          myfail: (err) => {
            formatAppLog("log", "at pages/service/index.vue:523", "订单提交错误信息", err);
            return uni.showToast({
              title: "订单提交错误",
              icon: "error"
            });
          }
        });
      };
      return (_ctx, _cache) => {
        const _component_dtPicker = resolveEasycom(vue.resolveDynamicComponent("dtPicker"), __easycom_0$5);
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$3);
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode("view", { class: "od-banner" }, [
            vue.createElementVNode("image", {
              class: "od-banner-icon",
              src: "/static/images/od_bg_icon.png",
              mode: "widthFix"
            }),
            vue.createElementVNode("view", { class: "od-jd od-jd-0" }, [
              vue.createElementVNode("view", { class: "od-jd-out" }, [
                vue.createElementVNode("view", { class: "od-jd-in" })
              ]),
              vue.createElementVNode("view", { class: "vp-flex od-jd-text" }, [
                vue.createElementVNode("view", { class: "vp-flex_1" }, [
                  vue.createElementVNode("text", { class: "od-jd-st-0" }, "填写订单")
                ]),
                vue.createElementVNode("view", { class: "vp-flex_1" }, [
                  vue.createElementVNode("text", { class: "od-jd-st-10" }, "在线支付")
                ]),
                vue.createElementVNode("view", { class: "vp-flex_1" }, [
                  vue.createElementVNode("text", { class: "od-jd-st-20" }, "专人服务")
                ]),
                vue.createElementVNode("view", { class: "vp-flex_1" }, [
                  vue.createElementVNode("text", { class: "od-jd-st-30" }, "服务完成")
                ])
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "pub-box" }, [
            vue.createElementVNode("view", { class: "pub-box-bd" }, [
              vue.createElementVNode("view", { class: "weui-cell weui-cell_input" }, [
                vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                  vue.createElementVNode("image", {
                    class: "serv-icon",
                    src: service.value.icon_image ? service.value.icon_image_url : "../../static/images/avatar.jpg"
                  }, null, 8, ["src"])
                ]),
                vue.createElementVNode("view", { class: "weui-cell__bd" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "serv-name" },
                    vue.toDisplayString(service.value.name),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                  vue.createElementVNode("view", {
                    class: "f5 ic_info",
                    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleTap && _ctx.handleTap(...args))
                  }, "服务内容")
                ])
              ])
            ])
          ]),
          service.value.stype == 10 || service.value.stype == 15 || service.value.stype == 20 ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            [
              vue.createElementVNode("view", { class: "pub-box" }, [
                vue.createElementVNode("view", { class: "pub-box-bd" }, [
                  vue.createElementVNode("view", { class: "weui-cell weui-cell_input" }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "就诊医院")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft weui-cell__ft_in-access" }, [
                      vue.createElementVNode("view", null, [
                        vue.createElementVNode("picker", {
                          onChange: onHospitalChange,
                          value: hospital_index.value,
                          range: hospitals.value,
                          "range-key": "name"
                        }, [
                          vue.createElementVNode("input", {
                            type: "text",
                            disabled: true,
                            placeholder: "请选择要就诊的医院",
                            value: hospitals.value[hospital_index.value].name,
                            "placeholder-class": "vp-placeholder"
                          }, null, 8, ["value"])
                        ], 40, ["value", "range"])
                      ])
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "weui-cell weui-cell_input" }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "就诊时间")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft weui-cell__ft_in-access" }, [
                      vue.createElementVNode("view", null, [
                        vue.createVNode(_component_dtPicker, {
                          onDtPickerChanged: onStartTimeChanged,
                          timestamp: order.starttime,
                          placeholder: "请选择就诊时间"
                        }, null, 8, ["timestamp"])
                      ])
                    ])
                  ]),
                  vue.createElementVNode("view", {
                    class: "weui-cell weui-cell_input",
                    onClick: onClientChange
                  }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "就诊人")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft weui-cell__ft_in-access" }, [
                      vue.createElementVNode("view", null, [
                        vue.createElementVNode("input", {
                          class: "weui-input",
                          "placeholder-class": "vp-placeholder",
                          placeholder: "请选择就诊人",
                          style: { "text-align": "right" },
                          disabled: true,
                          value: client.name,
                          type: "text"
                        }, null, 8, ["value"])
                      ])
                    ])
                  ]),
                  service.value.stype == 15 ? (vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    { key: 0 },
                    [
                      vue.createCommentVNode(" 接送陪诊 "),
                      vue.createElementVNode("view", { class: "weui-cell weui-cell_input" }, [
                        vue.createElementVNode("view", { class: "weui-cell__hd" }, "接送地址"),
                        vue.createElementVNode("view", { class: "weui-cell__bd" }, [
                          vue.withDirectives(vue.createElementVNode(
                            "input",
                            {
                              class: "weui-input",
                              name: "receiveAddress",
                              style: { "text-align": "right" },
                              "placeholder-class": "vp-placeholder",
                              placeholder: "请填写就诊人所在地址",
                              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => order.receiveAddress = $event)
                            },
                            null,
                            512
                            /* NEED_PATCH */
                          ), [
                            [vue.vModelText, order.receiveAddress]
                          ])
                        ])
                      ])
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("view", { class: "weui-cell weui-cell_input" }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, "联系电话"),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }, [
                      vue.withDirectives(vue.createElementVNode(
                        "input",
                        {
                          class: "weui-input",
                          type: "number",
                          name: "tel",
                          style: { "text-align": "right" },
                          "placeholder-class": "vp-placeholder",
                          placeholder: "请填写您的联系电话",
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => order.tel = $event)
                        },
                        null,
                        512
                        /* NEED_PATCH */
                      ), [
                        [vue.vModelText, order.tel]
                      ])
                    ])
                  ])
                ])
              ]),
              vue.createElementVNode("view", { class: "pub-box" }, [
                vue.createElementVNode("view", { class: "pub-box-tt" }, "服务需求"),
                vue.createElementVNode("view", { class: "pub-box-bd" }, [
                  vue.createElementVNode("view", { class: "weui-cell weui-cell_input" }, [
                    vue.createElementVNode("view", { class: "weui-cell__bd" }, [
                      vue.withDirectives(vue.createElementVNode(
                        "textarea",
                        {
                          name: "demand",
                          "auto-height": "",
                          placeholder: "请简单描述您要就诊的科室..",
                          "placeholder-class": "vp-placeholder",
                          style: { "min-height": "150rpx" },
                          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => order.demand = $event)
                        },
                        null,
                        512
                        /* NEED_PATCH */
                      ), [
                        [vue.vModelText, order.demand]
                      ])
                    ])
                  ])
                ])
              ])
            ],
            64
            /* STABLE_FRAGMENT */
          )) : vue.createCommentVNode("v-if", true),
          service.value.stype == 30 || service.value.stype == 40 ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              vue.createCommentVNode(" 送取结果,代跑取药 "),
              vue.createElementVNode("view", { class: "pub-box" }, [
                vue.createElementVNode("view", { class: "pub-box-bd" }, [
                  vue.createElementVNode("view", { class: "weui-cell weui-cell_input" }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "所在医院")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft weui-cell__ft_in-access" }, [
                      vue.createElementVNode("view", null, [
                        vue.createElementVNode("picker", {
                          onChange: onHospitalChange,
                          value: hospital_index.value,
                          range: hospitals.value,
                          "range-key": "name"
                        }, [
                          vue.createElementVNode("input", {
                            type: "text",
                            disabled: true,
                            placeholder: "请选择就诊所在医院",
                            value: hospitals.value[hospital_index.value].name,
                            "placeholder-class": "vp-placeholder"
                          }, null, 8, ["value"])
                        ], 40, ["value", "range"])
                      ])
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "weui-cell weui-cell_input" }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "服务时间")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft weui-cell__ft_in-access" }, [
                      vue.createElementVNode("view", null, [
                        vue.createVNode(_component_dtPicker, {
                          onDtPickerChanged: onStartTimeChanged,
                          timestamp: order.starttime,
                          placeholder: "请选择期望服务时间"
                        }, null, 8, ["timestamp"])
                      ])
                    ])
                  ]),
                  vue.createElementVNode("view", {
                    class: "weui-cell weui-cell_input",
                    onClick: onAddressChange
                  }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "收件信息")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft weui-cell__ft_in-access" }, [
                      vue.createElementVNode("input", {
                        class: "weui-input",
                        disabled: true,
                        style: { "text-align": "right" },
                        "placeholder-class": "vp-placeholder",
                        placeholder: "请选择收件信息",
                        value: order.address.userName ? order.address.userName + "(" + order.address.cityName + order.address.countyName + order.address.detailInfo + ")" : ""
                      }, null, 8, ["value"]),
                      vue.createCommentVNode(" {{order.address?(order.address.userName+'('+order.address.telNumber+')'):''}} ")
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "weui-cell weui-cell_input" }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, "联系电话"),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }, [
                      vue.withDirectives(vue.createElementVNode(
                        "input",
                        {
                          class: "weui-input",
                          type: "number",
                          name: "tel",
                          style: { "text-align": "right" },
                          "placeholder-class": "vp-placeholder",
                          placeholder: "请填写您的联系电话",
                          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => order.tel = $event)
                        },
                        null,
                        512
                        /* NEED_PATCH */
                      ), [
                        [vue.vModelText, order.tel]
                      ])
                    ])
                  ])
                ])
              ]),
              vue.createElementVNode("view", { class: "pub-box" }, [
                vue.createElementVNode("view", { class: "pub-box-tt" }, "服务需求"),
                vue.createElementVNode("view", { class: "pub-box-bd" }, [
                  vue.createElementVNode("view", { class: "weui-cell weui-cell_input" }, [
                    vue.createElementVNode("view", { class: "weui-cell__bd" }, [
                      vue.withDirectives(vue.createElementVNode(
                        "textarea",
                        {
                          name: "demand",
                          "auto-height": "",
                          placeholder: "如有其他服务要求请在此填写..",
                          "placeholder-class": "vp-placeholder",
                          style: { "min-height": "150rpx" },
                          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => order.demand = $event)
                        },
                        null,
                        512
                        /* NEED_PATCH */
                      ), [
                        [vue.vModelText, order.demand]
                      ])
                    ])
                  ])
                ])
              ])
            ],
            64
            /* STABLE_FRAGMENT */
          )) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { style: { "height": "300rpx" } }),
          vue.createCommentVNode(" 悬浮提交按钮 "),
          vue.createElementVNode("view", { class: "vp-foot" }, [
            vue.createElementVNode("view", { style: { "background": "#ffffff", "padding": "20rpx" } }, [
              vue.createElementVNode("view", {
                class: "xieyi",
                style: { "text-align": "center" }
              }, [
                vue.createElementVNode(
                  "text",
                  {
                    class: vue.normalizeClass("is_xieyi " + (is_xieyi.value ? "is_xieyi_on" : "")),
                    onClick: onXieyiChange
                  },
                  "我已阅读并同意",
                  2
                  /* CLASS */
                ),
                vue.createElementVNode("navigator", {
                  url: cfg.page_xy
                }, "《用户协议》", 8, ["url"]),
                vue.createElementVNode("text", null, "和"),
                vue.createElementVNode("navigator", {
                  url: cfg.page_fw
                }, "《服务协议》", 8, ["url"])
              ]),
              vue.createElementVNode("view", null, [
                vue.createElementVNode(
                  "button",
                  {
                    class: vue.normalizeClass("btnp " + (is_xieyi.value ? "" : "btnp-disabled")),
                    onClick: submit
                  },
                  [
                    vue.createTextVNode(" 确认下单 "),
                    order.price > 0 ? (vue.openBlock(), vue.createElementBlock(
                      vue.Fragment,
                      { key: 0 },
                      [
                        vue.createTextVNode(
                          "（支付" + vue.toDisplayString(order.price) + "元）",
                          1
                          /* TEXT */
                        )
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    )) : vue.createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                )
              ])
            ])
          ]),
          vue.createVNode(
            _component_uni_popup,
            {
              ref_key: "popup",
              ref: popup,
              type: "center",
              "is-mask-click": false,
              "background-color": "#fff"
            },
            {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "popup-content" }, [
                  vue.createElementVNode("view", { class: "group" }, [
                    vue.withDirectives(vue.createElementVNode(
                      "input",
                      {
                        class: "uni-input",
                        type: "tel",
                        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => validMobile.phone = $event),
                        placeholder: "手机号"
                      },
                      null,
                      512
                      /* NEED_PATCH */
                    ), [
                      [vue.vModelText, validMobile.phone]
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "group" }, [
                    vue.withDirectives(vue.createElementVNode(
                      "input",
                      {
                        class: "uni-input",
                        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => validMobile.validCode = $event),
                        placeholder: "验证码"
                      },
                      null,
                      512
                      /* NEED_PATCH */
                    ), [
                      [vue.vModelText, validMobile.validCode]
                    ]),
                    vue.createElementVNode(
                      "text",
                      {
                        class: "valid-text",
                        onClick: countdownChange
                      },
                      vue.toDisplayString(countdown.validText),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                vue.createElementVNode("view", { class: "btns" }, [
                  vue.createElementVNode("view", {
                    class: "cancal",
                    onClick: cancel
                  }, "取消"),
                  vue.createElementVNode("view", {
                    class: "ok",
                    onClick: ok
                  }, "确定")
                ])
              ]),
              _: 1
              /* STABLE */
            },
            512
            /* NEED_PATCH */
          )
        ]);
      };
    }
  };
  const PagesServiceIndex = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "C:/uni_apps/peizhenApp/pages/service/index.vue"]]);
  const _sfc_main$b = {
    __name: "index",
    setup(__props) {
      const app = getApp();
      const act = vue.ref("");
      const clients = vue.ref([]);
      onLoad((options) => {
        act.value = options.act;
        formatAppLog("log", "at pages/clients/index.vue:62", "就诊人options", options);
        if (options.act === "select") {
          uni.setNavigationBarTitle({
            title: "请选择就诊人"
          });
        } else {
          uni.setNavigationBarTitle({
            title: "管理就诊人"
          });
        }
        app.globalData.utils.myrequest({
          myurl: "/User/clients",
          mysuccess: (indexres) => {
            formatAppLog("log", "at pages/clients/index.vue:75", "就诊人页面数据", indexres);
            clients.value = indexres.data.clients;
          }
        });
      });
      const onClientSelected = (e2) => {
        formatAppLog("log", "at pages/clients/index.vue:83", "selectmaninfo", e2);
        uni.$emit("changeClient", clients.value[e2.currentTarget.dataset.index]);
        uni.navigateBack();
      };
      const removeClient = () => {
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(clients.value, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "cell-box",
                key: index
              }, [
                vue.createElementVNode("view", {
                  class: "weui-cell",
                  onClick: onClientSelected,
                  "data-index": index
                }, [
                  vue.createElementVNode("view", { class: "weui-cell__bd" }, [
                    vue.createElementVNode("view", null, [
                      vue.createElementVNode(
                        "text",
                        { style: { "font-weight": "bold" } },
                        vue.toDisplayString(item.name),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", null, [
                      vue.createElementVNode(
                        "text",
                        {
                          class: vue.normalizeClass("sext" + item.sex)
                        },
                        vue.toDisplayString(item.sex == 1 ? "男" : "女"),
                        3
                        /* TEXT, CLASS */
                      ),
                      vue.createElementVNode(
                        "text",
                        { style: { "margin-left": "10rpx" } },
                        vue.toDisplayString(item.age) + "周岁",
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { style: { "margin-left": "10rpx" } },
                        vue.toDisplayString(item.mobile),
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                    act.value == "select" ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 0,
                      style: { "display": "inline-block", "padding": "15rpx 30rpx", "border": "1rpx solid #0bb584", "color": "#0bb584", "font-weight": "bold", "border-radius": "10rpx", "font-size": "28rpx", "overflow": "hidden" }
                    }, " 选择 ")) : (vue.openBlock(), vue.createElementBlock("text", {
                      key: 1,
                      onClick: removeClient,
                      "data-id": item.id,
                      style: { "display": "inline-block", "padding": "15rpx 30rpx", "border": "1rpx solid #eeeeee", "color": "#f13e6d", "border-radius": "10rpx", "font-size": "28rpx", "overflow": "hidden" }
                    }, " 移除 ", 8, ["data-id"]))
                  ])
                ], 8, ["data-index"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]);
      };
    }
  };
  const PagesClientsIndex = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__file", "C:/uni_apps/peizhenApp/pages/clients/index.vue"]]);
  const AD_URL = "https://wxac1.dcloud.net.cn/openPage/acs";
  const AD_REPORT_URL = "https://wxac1.dcloud.net.cn/openPage/acs";
  const events = {
    load: "load",
    close: "close",
    error: "error"
  };
  const _sfc_main$a = {
    name: "AdInteractive",
    props: {
      options: {
        type: [Object, Array],
        default() {
          return {};
        }
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      adpid: {
        type: [Number, String],
        default: ""
      },
      openType: {
        type: String,
        default: "interactive"
      },
      openPagePath: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        adData: null,
        loading: false,
        errorMessage: ""
      };
    },
    created() {
      this._interactiveUrl = null;
      if (this.openPagePath) {
        this.getAdData();
      }
    },
    methods: {
      getAdData() {
        if (!this.adpid) {
          this.$emit(events.error, {
            code: -5002,
            message: "invalid adpid"
          });
          return;
        }
        this.loading = true;
        uni.request({
          url: AD_URL,
          method: "POST",
          data: {
            adpid: this.adpid
          },
          timeout: 5e3,
          dataType: "json",
          success: (res) => {
            if (res.statusCode !== 200) {
              this.$emit(events.error, {
                errCode: res.statusCode,
                errMsg: res.statusCode
              });
              return;
            }
            const responseData = res.data;
            if (responseData.ret === 0) {
              this._interactiveUrl = responseData.data.adp_url;
              this.adData = {
                imgUrl: responseData.data.icon_url,
                openPath: this.openPagePath + "?url=" + encodeURIComponent(this._interactiveUrl)
              };
              this.$emit(events.load, this.adData);
            } else {
              const errMsg = {
                errCode: responseData.ret,
                errMsg: responseData.msg
              };
              this.errorMessage = errMsg;
              this.$emit(events.error, errMsg);
            }
          },
          fail: (err) => {
            this.$emit(events.error, {
              errCode: "",
              errMsg: err.errMsg
            });
          },
          complete: () => {
            this.loading = false;
          }
        });
      },
      onclick() {
        if (this.disabled) {
          return;
        }
        if (!this._interactiveUrl) {
          return;
        }
        uni.navigateTo({
          url: this.adData.openPath
        });
        this._report();
      },
      _report() {
        uni.request({
          url: AD_REPORT_URL,
          data: {
            adpid: this.adpid,
            t: "10019"
          },
          timeout: 5e3,
          dataType: "json"
        });
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onclick && $options.onclick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default", {
        options: $props.options,
        data: $data.adData,
        loading: $data.loading,
        error: $data.errorMessage
      }, void 0, true)
    ]);
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$8], ["__scopeId", "data-v-a3cbbe55"], ["__file", "C:/Users/十八楼小顾老师/Desktop/无关紧要/HBuilderX/plugins/uniapp-cli-vite/node_modules/@dcloudio/uni-components/lib/ad-interactive/ad-interactive.vue"]]);
  var util = {};
  util.getWeixinCode = function() {
    return new Promise((resolve, reject) => {
      plus.oauth.getServices((services) => {
        let weixinAuthService = services.find((service) => {
          return service.id === "weixin";
        });
        if (weixinAuthService) {
          weixinAuthService.authorize(function(res) {
            resolve(res.code);
          }, function(err) {
            formatAppLog("log", "at uni_modules/uni-pay/js_sdk/js_sdk.js:30", err);
            reject(new Error("获取微信code失败"));
          });
        }
      });
    });
  };
  util.getAlipayCode = function() {
    return new Promise((resolve, reject) => {
      uni.login({
        provider: "alipay",
        success(res) {
          resolve(res.code);
        },
        fail(err) {
          reject(new Error("获取支付宝code失败，可能是没有关联appid或你的支付宝开发者工具还没有登录"));
        }
      });
    });
  };
  util.checkPlatform = function() {
  };
  util.getH5Env = function() {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger" && ua.match(/miniprogram/i) == "miniprogram") {
      return "mp-weixin";
    }
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return "h5-weixin";
    }
    if (ua.match(/alipay/i) == "alipay" && ua.match(/miniprogram/i) == "miniprogram") {
      return "mp-alipay";
    }
    if (ua.match(/alipay/i) == "alipay") {
      return "h5-alipay";
    }
    return "h5";
  };
  util.timeFormat = function(time, fmt = "yyyy-MM-dd hh:mm:ss", targetTimezone = 8) {
    try {
      if (!time) {
        return "";
      }
      if (typeof time === "string" && !isNaN(time))
        time = Number(time);
      let date;
      if (typeof time === "number") {
        if (time.toString().length == 10)
          time *= 1e3;
        date = new Date(time);
      } else {
        date = time;
      }
      const dif = date.getTimezoneOffset();
      const timeDif = dif * 60 * 1e3 + targetTimezone * 60 * 60 * 1e3;
      const east8time = date.getTime() + timeDif;
      date = new Date(east8time);
      let opt = {
        "M+": date.getMonth() + 1,
        //月份
        "d+": date.getDate(),
        //日
        "h+": date.getHours(),
        //小时
        "m+": date.getMinutes(),
        //分
        "s+": date.getSeconds(),
        //秒
        "q+": Math.floor((date.getMonth() + 3) / 3),
        //季度
        "S": date.getMilliseconds()
        //毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (let k in opt) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? opt[k] : ("00" + opt[k]).substr(("" + opt[k]).length));
        }
      }
      return fmt;
    } catch (err) {
      return time;
    }
  };
  const _sfc_main$9 = {
    data() {
      return {
        options: {
          adpid: "",
          main_color: "",
          order_no: "",
          out_trade_no: "",
          total_fee: "",
          pay_date: "",
          return_url: ""
        },
        images: {
          success: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAEAYAAAD6+a2dAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAACAlJREFUeNrtnVlszF8Ux++d4B+JWhqERGJvlRJLJQ1RHsQeFEXFUmt5scWWiPVB2qKERIglSpEg9vJAYn8RQlRFI5ryYm+prbZ7/g/fOdPOtNPfdDrjzEx/n5dvf3fuTM895869v3t/997RKswhQ4ZM69a4SkpSWmmle/TAdbdu0JgYaIsW0ObNoU2auH/a16/QT5+gpaXQwkLos2fQggJFihTdvq0d2qEd795J+yHiQaD794dmZxMREeXnQ40hEfj/5ufDru3boQkJ0v4KW+DApk2hK1bAwU+fygS4rhQUuMphyJCJipL2b8gBR0VHQzdtgpaUSIcuOHC5Nm6EcpdUj0DBtcY3YuZMXL97Jx0aGT5+hC5ZAnU4pOMTvMAbMmS6dEFB796Vdn1ocucOtHNn6XgFLvBERJScDC0tlXZxeFBWBp06VTp+fgbc4YDu2CHtyrCHRxdEFNJdBAxt1AiGHj8u7bfI5Ngx+Llhw0DFTQcq8JiAOXsWqaNGyVXF+kBeHiaikpMxEfX7t7+f5HeTghqpNQK/fz9S7cD/G0aPht9zchAH/7uGOvYp2dnQmTOlXVI/SU1FS5CZ6e8n1LoLQJOfkoIaePKktAtsKjNtmtZaa33ihK/v8LkCoKnh8emDB9BmzaSLbFOZz5+hffuiIhQVWb3Dsgtw9fVKKaWOHIHagQ9NOC6HD7vHzTvW9wCkSNHcubgYMEC6iDa+MGgQ1PrezGsNQQ2KjkYFKCxEn9+ypXTRbGoDr1OIjUWXwOscKrBoAZYutQMfzvBCmcWLveWo0gLw83gEvrgYqfXwsWVEUVKClrxDB0wcffnCr3hpARYsgNqBjwyio/GFnj/f85WqFUArrfScOdIm1w/KyqA8hR5sZs/2THFVAF5zh6u4OGnXRDbfv0PHjoWmpEDPnQvu/42Px819nz6c4tECpKZKuyay+fEDOmYM7spv3oT+/Yv06dOhL18GzQRSpGjaNL6sqABaaaWHDZN2UWTy6xc0JQUBv369+ny8AKR9++DaM3Qo/6Vd6+q10kq/eeNMrvNjYhullOLHtJMmIfAXLnjmQJM8YgSuLl6ENmgQXLuI0BK0bu1sAZKSoHbgA8OfP9CpU2sOPPfF/FAt2IFn+DF+UpIDf8THS7ssMuC+PC0NgT9zxjMHWtx27XDFFUNqv0CPHs4WIDZWxoBIgZvURYsQ+GPHquQwZMg0a4Yv3OXLSOWKIEVsrLMCdO0qa0i4woFPT8cMG6+MqpTDkCHz338I/PnzSO3ZU9pyEBPj7HPsuf5aQ4oUrVrlNfBuj2MPHIAOHixttjstWzpbAM9dslIcOQLH8i7cUGXFCgR+27aa82VkQHl8H0KQIkVRUc6a+vOn7HLne/fcl5W3aIHr69dl7fJk7VpLvxoyZNLTpS31jfJy4QrAO4U6dqzekVwhcnNlHbV5s2+BHzMG+f/8kbXXV1wV4MMHGQNmzbJ0LBFVbCbdsuWfmWbIkMnK8s2+xETot28yfvS3fO/fOwtQXCxjxdOn7uNiH7ouIiKaMwf661dw7Nq1yzc7OnWCvn0r47+6UlTkLMj9+2I2GDJkXrzARadOtasII0dCv3wJjDF790K9z4jC3latkO/5czG/BYR795yODJW9fK9fw8G9evlcEQwZMj174v2vXvn3f3kVrfcdNni9cWNopGxvP3rUWWA+BEmaNm0wYXLjBgxMTLR6B4Zj+fm4SkzE8ObRI+uao0jRqVPQefMwg2dM9YF3OJAvNxepEbA6mhf7ooATJ0rXxerhffJDhvhcLueUK/Tateo/99QpvG798AX5d++W9kRwSE52HbOGBKnTtqwoL3cZXKuK0KAB3rdvH/TKFdfUrE+BX7VKuuTB4e9f+KHSDDBeePxY2rSa4bt+31cuIT8PI6331SP/lCkuR0UahgyZhw+5vBU3PaRI0bVrvjpWBg4gTwwtXGj1DvTtRFb76OEYXheRk+N0T+ieyFEnrl714oCEBOkK6h8bNvjrCrw/Lg4aqcfTedK7t4VD+ATOcCMjA2q9sgn52raFSk2E/WsKCjz9ULWJI0WKuAkMN1avhu7ZgwJXbcJdJ3aSIkV5eUgN9iLMUOHgQc8UL1vDoqIwHuflyeG6Q+jECQS60jMHrbTSvPhy+HBpC/8N3reGVRkHcwZ8g3hO3P8+VpbUVASc1zt8+ACtL4Fndu70DDxjsT2cv/k8U9iqlXRRbGrD27f45sfGogLwCSIVeB3mYPjE5+WvWSNdFJtaQooUrVzpLfCMj3fLfFd9+zZ04EDp8tnUxK1b0CFDeB7EW077kKiIgk8A6dcvYIdEMfjAFy/46Zl0UW2qY+5cXwPP1HqqE33K6dOoCHxQpI0sWVnediJZ4fdeQPd7g0OHoGlp0q6oXxw/Dp0xw9t6BisCdFh0w4YYb/MBB/aZwcHl0iW0wBMmiB0WzbgMIEWKxo2DcotgE1hycwMV+KDBXQNahq1bpR9/hDe8QCczExqG2/dh+Pjx0PryuLWufP4MnTxZOn4Brgi8jv7WLWkXhyY3b0Kr7pSKGFBAz5+NC9eNFXWFfzZuwQL2i3R8hCpE8+bQ9evdHRNp8Ba8detcB0bYuAPHNGkCRy1fDn3yRDp0/sErq5Yt43JJ+zdsgSP79HEfXTx6BJVavcvLqx8+5M2kSK9hzV2IEfZ9jmt9u/PUK4yTu3fHdVwcrvnn4/nM3Bp+Pp4UKeKHKiUlyF9Y6Dq4QiuttOfPx/NCk/Djf0hQD04eJaNOAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTEwLTI3VDE0OjAzOjAyKzA4OjAwisT1owAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0xMC0yN1QxNDowMzowMiswODowMPuZTR8AAABQdEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL2hvbWUvYWRtaW4vaWNvbi1mb250L3RtcC9pY29uX3ZwM212emVpcjcvemhpZnVjaGVuZ2dvbmcuc3ZntdPldAAAAABJRU5ErkJggg=="
        },
        // 默认颜色
        color: {
          wxpay: "#01be6e",
          alipay: "#108ee9"
        }
      };
    },
    // 监听 - 页面每次【加载时】执行(如：前进)
    onLoad(options = {}) {
      this.options = options;
    },
    // 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
    onReady() {
    },
    // 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
    onShow() {
    },
    // 监听 - 页面每次【隐藏时】执行(如：返回)
    onHide() {
    },
    // 函数
    methods: {
      timeFormat: util.timeFormat,
      queryOrder() {
        let url = this.options.return_url + `?out_trade_no=${this.options.out_trade_no}&order_no=${this.options.order_no}`;
        if (url.indexOf("/") !== 0)
          url = `/${url}`;
        uni.navigateTo({
          url
        });
      },
      onaderror(e2) {
        formatAppLog("log", "at uni_modules/uni-pay/pages/success/success.vue:88", "ad-error", e2);
      }
    },
    // 监听器
    watch: {
      "mainColorCom": {
        immediate: true,
        handler(newVal, oldVal) {
          setTimeout(function() {
            uni.setNavigationBarColor({
              frontColor: "#ffffff",
              backgroundColor: newVal
            });
          }, 0);
        }
      }
    },
    // 计算属性
    computed: {
      mainColorCom() {
        let color = "";
        color = this.options.main_color || this.color.wxpay;
        return color;
      },
      styleCom() {
        return `--main:${this.mainColorCom};`;
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_ad_interactive = resolveEasycom(vue.resolveDynamicComponent("ad-interactive"), __easycom_0$2);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "app",
        style: vue.normalizeStyle($options.styleCom)
      },
      [
        vue.createElementVNode("view", { class: "header" }, [
          vue.createElementVNode("image", {
            src: $data.images.success,
            class: "success-image"
          }, null, 8, ["src"]),
          vue.createElementVNode("view", { class: "success-title" }, "支付成功"),
          vue.createElementVNode("view", { class: "hr" })
        ]),
        vue.createElementVNode("view", { class: "info-box" }, [
          vue.createElementVNode(
            "view",
            { class: "info-amount" },
            "¥ " + vue.toDisplayString(($data.options.total_fee / 100).toFixed(2)),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "left-circle" }),
          vue.createElementVNode("view", { class: "right-circle" }),
          vue.createElementVNode("view", { class: "info-main" }, [
            vue.createElementVNode("view", { class: "info-cell" }, [
              vue.createElementVNode("view", { class: "left" }, "订单编号"),
              vue.createElementVNode(
                "view",
                { class: "right" },
                vue.toDisplayString($data.options.order_no),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "info-cell" }, [
              vue.createElementVNode("view", { class: "left" }, "付款时间"),
              vue.createElementVNode(
                "view",
                { class: "right" },
                vue.toDisplayString($options.timeFormat($data.options.pay_date, "yyyy-MM-dd hh:mm:ss")),
                1
                /* TEXT */
              )
            ])
          ])
        ]),
        vue.createCommentVNode(" 广告位开始 "),
        vue.createElementVNode("view", { class: "uni-ad" }, [
          vue.createCommentVNode(" 红包广告"),
          $data.options.adpid ? (vue.openBlock(), vue.createBlock(_component_ad_interactive, {
            key: 0,
            adpid: $data.options.adpid,
            "open-page-path": "/uni_modules/uni-pay/pages/ad-interactive-webview/ad-interactive-webview",
            onError: $options.onaderror
          }, {
            default: vue.withCtx(({ data, loading, error }) => [
              data ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "ad-interactive"
              }, [
                vue.createCommentVNode(" 可以自定义此图片，组件提供了默认素材，通过 uni-ad 后台配置 "),
                vue.createElementVNode("image", {
                  src: data.imgUrl,
                  mode: "widthFix"
                }, null, 8, ["src"])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          }, 8, ["adpid", "onError"])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 注意：h5下的广告出来有延迟，后续要优化 "),
          vue.createCommentVNode(' <ad v-if="options.adpid" :adpid="options.adpid" type="banner" @error="onaderror"></ad> ')
        ]),
        vue.createCommentVNode(" 广告位结束 "),
        $data.options.return_url ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "button-query",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.queryOrder && $options.queryOrder(...args))
        }, "查看订单")) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "footer-hr" })
      ],
      4
      /* STYLE */
    );
  }
  const Uni_modulesUniPayPagesSuccessSuccess = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$7], ["__scopeId", "data-v-86597cd6"], ["__file", "C:/uni_apps/peizhenApp/uni_modules/uni-pay/pages/success/success.vue"]]);
  const _sfc_main$8 = {
    data() {
      return {
        url: ""
      };
    },
    onLoad(options) {
      if (options && options.url) {
        this.url = decodeURIComponent(options.url);
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("web-view", { src: $data.url }, null, 8, ["src"]);
  }
  const Uni_modulesUniPayPagesAdInteractiveWebviewAdInteractiveWebview = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$6], ["__file", "C:/uni_apps/peizhenApp/uni_modules/uni-pay/pages/ad-interactive-webview/ad-interactive-webview.vue"]]);
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$7 = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v2) => v2.font_class === this.type);
        if (code) {
          return code.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$5], ["__scopeId", "data-v-d31e1c47"], ["__file", "C:/uni_apps/peizhenApp/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  const _sfc_main$6 = {
    name: "UniBadge",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: "error"
      },
      inverted: {
        type: Boolean,
        default: false
      },
      isDot: {
        type: Boolean,
        default: false
      },
      maxNum: {
        type: Number,
        default: 99
      },
      absolute: {
        type: String,
        default: ""
      },
      offset: {
        type: Array,
        default() {
          return [0, 0];
        }
      },
      text: {
        type: [String, Number],
        default: ""
      },
      size: {
        type: String,
        default: "small"
      },
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {};
    },
    computed: {
      width() {
        return String(this.text).length * 8 + 12;
      },
      classNames() {
        const {
          inverted,
          type,
          size,
          absolute
        } = this;
        return [
          inverted ? "uni-badge--" + type + "-inverted" : "",
          "uni-badge--" + type,
          "uni-badge--" + size,
          absolute ? "uni-badge--absolute" : ""
        ].join(" ");
      },
      positionStyle() {
        if (!this.absolute)
          return {};
        let w2 = this.width / 2, h2 = 10;
        if (this.isDot) {
          w2 = 5;
          h2 = 5;
        }
        const x = `${-w2 + this.offset[0]}px`;
        const y2 = `${-h2 + this.offset[1]}px`;
        const whiteList = {
          rightTop: {
            right: x,
            top: y2
          },
          rightBottom: {
            right: x,
            bottom: y2
          },
          leftBottom: {
            left: x,
            bottom: y2
          },
          leftTop: {
            left: x,
            top: y2
          }
        };
        const match = whiteList[this.absolute];
        return match ? match : whiteList["rightTop"];
      },
      dotStyle() {
        if (!this.isDot)
          return {};
        return {
          width: "10px",
          minWidth: "0",
          height: "10px",
          padding: "0",
          borderRadius: "10px"
        };
      },
      displayValue() {
        const {
          isDot,
          text,
          maxNum
        } = this;
        return isDot ? "" : Number(text) > maxNum ? `${maxNum}+` : text;
      }
    },
    methods: {
      onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-badge--x" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.text ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 0,
          class: vue.normalizeClass([$options.classNames, "uni-badge"]),
          style: vue.normalizeStyle([$options.positionStyle, $props.customStyle, $options.dotStyle]),
          onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick())
        },
        vue.toDisplayString($options.displayValue),
        7
        /* TEXT, CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$4], ["__scopeId", "data-v-c97cb896"], ["__file", "C:/uni_apps/peizhenApp/uni_modules/uni-badge/components/uni-badge/uni-badge.vue"]]);
  const _sfc_main$5 = {
    name: "UniListItem",
    emits: ["click", "switchChange"],
    props: {
      direction: {
        type: String,
        default: "row"
      },
      title: {
        type: String,
        default: ""
      },
      note: {
        type: String,
        default: ""
      },
      ellipsis: {
        type: [Number, String],
        default: 0
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      clickable: {
        type: Boolean,
        default: false
      },
      showArrow: {
        type: [Boolean, String],
        default: false
      },
      link: {
        type: [Boolean, String],
        default: false
      },
      to: {
        type: String,
        default: ""
      },
      showBadge: {
        type: [Boolean, String],
        default: false
      },
      showSwitch: {
        type: [Boolean, String],
        default: false
      },
      switchChecked: {
        type: [Boolean, String],
        default: false
      },
      badgeText: {
        type: String,
        default: ""
      },
      badgeType: {
        type: String,
        default: "success"
      },
      badgeStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      rightText: {
        type: String,
        default: ""
      },
      thumb: {
        type: String,
        default: ""
      },
      thumbSize: {
        type: String,
        default: "base"
      },
      showExtraIcon: {
        type: [Boolean, String],
        default: false
      },
      extraIcon: {
        type: Object,
        default() {
          return {
            type: "",
            color: "#000000",
            size: 20,
            customPrefix: ""
          };
        }
      },
      border: {
        type: Boolean,
        default: true
      },
      customStyle: {
        type: Object,
        default() {
          return {
            padding: "",
            backgroundColor: "#FFFFFF"
          };
        }
      },
      keepScrollPosition: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      "customStyle.padding": {
        handler(padding) {
          if (typeof padding == "number") {
            padding += "";
          }
          let paddingArr = padding.split(" ");
          if (paddingArr.length === 1) {
            const allPadding = paddingArr[0];
            this.padding = {
              "top": allPadding,
              "right": allPadding,
              "bottom": allPadding,
              "left": allPadding
            };
          } else if (paddingArr.length === 2) {
            const [verticalPadding, horizontalPadding] = paddingArr;
            this.padding = {
              "top": verticalPadding,
              "right": horizontalPadding,
              "bottom": verticalPadding,
              "left": horizontalPadding
            };
          } else if (paddingArr.length === 4) {
            const [topPadding, rightPadding, bottomPadding, leftPadding] = paddingArr;
            this.padding = {
              "top": topPadding,
              "right": rightPadding,
              "bottom": bottomPadding,
              "left": leftPadding
            };
          }
        },
        immediate: true
      }
    },
    // inject: ['list'],
    data() {
      return {
        isFirstChild: false,
        padding: {
          top: "",
          right: "",
          bottom: "",
          left: ""
        }
      };
    },
    mounted() {
      this.list = this.getForm();
      if (this.list) {
        if (!this.list.firstChildAppend) {
          this.list.firstChildAppend = true;
          this.isFirstChild = true;
        }
      }
    },
    methods: {
      /**
       * 获取父元素实例
       */
      getForm(name = "uniList") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      },
      onClick() {
        if (this.to !== "") {
          this.openPage();
          return;
        }
        if (this.clickable || this.link) {
          this.$emit("click", {
            data: {}
          });
        }
      },
      onSwitchChange(e2) {
        this.$emit("switchChange", e2.detail);
      },
      openPage() {
        if (["navigateTo", "redirectTo", "reLaunch", "switchTab"].indexOf(this.link) !== -1) {
          this.pageApi(this.link);
        } else {
          this.pageApi("navigateTo");
        }
      },
      pageApi(api) {
        let callback = {
          url: this.to,
          success: (res) => {
            this.$emit("click", {
              data: res
            });
          },
          fail: (err) => {
            this.$emit("click", {
              data: err
            });
          }
        };
        switch (api) {
          case "navigateTo":
            uni.navigateTo(callback);
            break;
          case "redirectTo":
            uni.redirectTo(callback);
            break;
          case "reLaunch":
            uni.reLaunch(callback);
            break;
          case "switchTab":
            uni.switchTab(callback);
            break;
          default:
            uni.navigateTo(callback);
        }
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$1);
    const _component_uni_badge = resolveEasycom(vue.resolveDynamicComponent("uni-badge"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass([{ "uni-list-item--disabled": $props.disabled }, "uni-list-item"]),
      style: vue.normalizeStyle({ "background-color": $props.customStyle.backgroundColor }),
      "hover-class": !$props.clickable && !$props.link || $props.disabled || $props.showSwitch ? "" : "uni-list-item--hover",
      onClick: _cache[1] || (_cache[1] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      !$data.isFirstChild ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["border--left", { "uni-list--border": $props.border }])
        },
        null,
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["uni-list-item__container", { "container--right": $props.showArrow || $props.link, "flex--direction": $props.direction === "column" }]),
          style: vue.normalizeStyle({ paddingTop: $data.padding.top, paddingLeft: $data.padding.left, paddingRight: $data.padding.right, paddingBottom: $data.padding.bottom })
        },
        [
          vue.renderSlot(_ctx.$slots, "header", {}, () => [
            vue.createElementVNode("view", { class: "uni-list-item__header" }, [
              $props.thumb ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-list-item__icon"
              }, [
                vue.createElementVNode("image", {
                  src: $props.thumb,
                  class: vue.normalizeClass(["uni-list-item__icon-img", ["uni-list--" + $props.thumbSize]])
                }, null, 10, ["src"])
              ])) : $props.showExtraIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "uni-list-item__icon"
              }, [
                vue.createVNode(_component_uni_icons, {
                  customPrefix: $props.extraIcon.customPrefix,
                  color: $props.extraIcon.color,
                  size: $props.extraIcon.size,
                  type: $props.extraIcon.type
                }, null, 8, ["customPrefix", "color", "size", "type"])
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ], true),
          vue.renderSlot(_ctx.$slots, "body", {}, () => [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["uni-list-item__content", { "uni-list-item__content--center": $props.thumb || $props.showExtraIcon || $props.showBadge || $props.showSwitch }])
              },
              [
                $props.title ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: vue.normalizeClass(["uni-list-item__content-title", [$props.ellipsis !== 0 && $props.ellipsis <= 2 ? "uni-ellipsis-" + $props.ellipsis : ""]])
                  },
                  vue.toDisplayString($props.title),
                  3
                  /* TEXT, CLASS */
                )) : vue.createCommentVNode("v-if", true),
                $props.note ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 1,
                    class: "uni-list-item__content-note"
                  },
                  vue.toDisplayString($props.note),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )
          ], true),
          vue.renderSlot(_ctx.$slots, "footer", {}, () => [
            $props.rightText || $props.showBadge || $props.showSwitch ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: vue.normalizeClass(["uni-list-item__extra", { "flex--justify": $props.direction === "column" }])
              },
              [
                $props.rightText ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: "uni-list-item__extra-text"
                  },
                  vue.toDisplayString($props.rightText),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true),
                $props.showBadge ? (vue.openBlock(), vue.createBlock(_component_uni_badge, {
                  key: 1,
                  type: $props.badgeType,
                  text: $props.badgeText,
                  "custom-style": $props.badgeStyle
                }, null, 8, ["type", "text", "custom-style"])) : vue.createCommentVNode("v-if", true),
                $props.showSwitch ? (vue.openBlock(), vue.createElementBlock("switch", {
                  key: 2,
                  disabled: $props.disabled,
                  checked: $props.switchChecked,
                  onChange: _cache[0] || (_cache[0] = (...args) => $options.onSwitchChange && $options.onSwitchChange(...args))
                }, null, 40, ["disabled", "checked"])) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )) : vue.createCommentVNode("v-if", true)
          ], true)
        ],
        6
        /* CLASS, STYLE */
      ),
      $props.showArrow || $props.link ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
        key: 1,
        size: 16,
        class: "uni-icon-wrapper",
        color: "#bbb",
        type: "arrowright"
      })) : vue.createCommentVNode("v-if", true)
    ], 14, ["hover-class"]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$3], ["__scopeId", "data-v-c7524739"], ["__file", "C:/uni_apps/peizhenApp/uni_modules/uni-list/components/uni-list-item/uni-list-item.vue"]]);
  const _sfc_main$4 = {
    name: "uniList",
    "mp-weixin": {
      options: {
        multipleSlots: false
      }
    },
    props: {
      stackFromEnd: {
        type: Boolean,
        default: false
      },
      enableBackToTop: {
        type: [Boolean, String],
        default: false
      },
      scrollY: {
        type: [Boolean, String],
        default: false
      },
      border: {
        type: Boolean,
        default: true
      },
      renderReverse: {
        type: Boolean,
        default: false
      }
    },
    // provide() {
    // 	return {
    // 		list: this
    // 	};
    // },
    created() {
      this.firstChildAppend = false;
    },
    methods: {
      loadMore(e2) {
        this.$emit("scrolltolower");
      },
      scroll(e2) {
        this.$emit("scroll", e2);
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-list uni-border-top-bottom" }, [
      $props.border ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-list--border-top"
      })) : vue.createCommentVNode("v-if", true),
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.border ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "uni-list--border-bottom"
      })) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$2], ["__scopeId", "data-v-c2f1266a"], ["__file", "C:/uni_apps/peizhenApp/uni_modules/uni-list/components/uni-list/uni-list.vue"]]);
  const pages = [
    {
      path: "pages/index/index",
      style: {
        navigationBarTitleText: "你哈",
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/myorder/index",
      style: {
        navigationBarTitleText: "我的订单"
      }
    },
    {
      path: "pages/myuser/index",
      style: {
        navigationBarTitleText: "我的"
      }
    },
    {
      path: "pages/mysearch/index",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/hospital/index",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/service/index",
      style: {
        navigationBarTitleText: "填写服务订单"
      }
    },
    {
      path: "pages/clients/index",
      style: {
        navigationBarTitleText: ""
      }
    },
    {
      path: "uni_modules/uni-pay/pages/success/success",
      style: {
        backgroundColor: "#F8F8F8",
        navigationBarTitleText: "支付成功"
      }
    },
    {
      path: "uni_modules/uni-pay/pages/ad-interactive-webview/ad-interactive-webview",
      style: {
        backgroundColor: "#F8F8F8",
        navigationBarTitleText: "ad"
      }
    },
    {
      path: "uni_modules/uni-pay/pages/pay-desk/pay-desk",
      style: {
        backgroundColor: "#F8F8F8",
        navigationBarTitleText: "收银台"
      }
    },
    {
      path: "pages/myorder/order",
      style: {
        navigationBarTitleText: "订单详情"
      }
    }
  ];
  const tabBar = {
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    borderStyle: "white",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "static/images/tab_index.png",
        selectedIconPath: "static/images/tab_index_seled.png",
        text: "首页"
      },
      {
        pagePath: "pages/myorder/index",
        iconPath: "static/images/tab_pub.png",
        selectedIconPath: "static/images/tab_pub_seled.png",
        text: "订单"
      },
      {
        pagePath: "pages/myuser/index",
        iconPath: "static/images/tab_user.png",
        selectedIconPath: "static/images/tab_user_seled.png",
        text: "我的"
      }
    ]
  };
  const globalStyle = {
    navigationBarTextStyle: "black",
    navigationBarTitleText: "uni-app",
    navigationBarBackgroundColor: "#ffffff",
    backgroundColor: "#b2f883"
  };
  const plugins = {
    routePlan: {
      version: "1.0.19",
      provider: "wx50b5593e81dd937a"
    }
  };
  const uniIdRouter = {};
  const e = {
    pages,
    tabBar,
    globalStyle,
    plugins,
    uniIdRouter
  };
  var define_process_env_UNI_SECURE_NETWORK_CONFIG_default = [];
  function t(e2) {
    return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
  }
  function n(e2, t2, n2) {
    return e2(n2 = { path: t2, exports: {}, require: function(e3, t3) {
      return function() {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
      }(null == t3 && n2.path);
    } }, n2.exports), n2.exports;
  }
  var s = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = n2 || function(e3, t3) {
      var n3 = Object.create || /* @__PURE__ */ function() {
        function e4() {
        }
        return function(t4) {
          var n4;
          return e4.prototype = t4, n4 = new e4(), e4.prototype = null, n4;
        };
      }(), s2 = {}, r2 = s2.lib = {}, i2 = r2.Base = { extend: function(e4) {
        var t4 = n3(this);
        return e4 && t4.mixIn(e4), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
          t4.$super.init.apply(this, arguments);
        }), t4.init.prototype = t4, t4.$super = this, t4;
      }, create: function() {
        var e4 = this.extend();
        return e4.init.apply(e4, arguments), e4;
      }, init: function() {
      }, mixIn: function(e4) {
        for (var t4 in e4)
          e4.hasOwnProperty(t4) && (this[t4] = e4[t4]);
        e4.hasOwnProperty("toString") && (this.toString = e4.toString);
      }, clone: function() {
        return this.init.prototype.extend(this);
      } }, o2 = r2.WordArray = i2.extend({ init: function(e4, n4) {
        e4 = this.words = e4 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e4.length;
      }, toString: function(e4) {
        return (e4 || c2).stringify(this);
      }, concat: function(e4) {
        var t4 = this.words, n4 = e4.words, s3 = this.sigBytes, r3 = e4.sigBytes;
        if (this.clamp(), s3 % 4)
          for (var i3 = 0; i3 < r3; i3++) {
            var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
            t4[s3 + i3 >>> 2] |= o3 << 24 - (s3 + i3) % 4 * 8;
          }
        else
          for (i3 = 0; i3 < r3; i3 += 4)
            t4[s3 + i3 >>> 2] = n4[i3 >>> 2];
        return this.sigBytes += r3, this;
      }, clamp: function() {
        var t4 = this.words, n4 = this.sigBytes;
        t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e3.ceil(n4 / 4);
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4.words = this.words.slice(0), e4;
      }, random: function(t4) {
        for (var n4, s3 = [], r3 = function(t5) {
          t5 = t5;
          var n5 = 987654321, s4 = 4294967295;
          return function() {
            var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
            return r4 /= 4294967296, (r4 += 0.5) * (e3.random() > 0.5 ? 1 : -1);
          };
        }, i3 = 0; i3 < t4; i3 += 4) {
          var a3 = r3(4294967296 * (n4 || e3.random()));
          n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
        }
        return new o2.init(s3, t4);
      } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e4) {
        for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push((i3 >>> 4).toString(16)), s3.push((15 & i3).toString(16));
        }
        return s3.join("");
      }, parse: function(e4) {
        for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
          n4[s3 >>> 3] |= parseInt(e4.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
        return new o2.init(n4, t4 / 2);
      } }, u2 = a2.Latin1 = { stringify: function(e4) {
        for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push(String.fromCharCode(i3));
        }
        return s3.join("");
      }, parse: function(e4) {
        for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3++)
          n4[s3 >>> 2] |= (255 & e4.charCodeAt(s3)) << 24 - s3 % 4 * 8;
        return new o2.init(n4, t4);
      } }, h2 = a2.Utf8 = { stringify: function(e4) {
        try {
          return decodeURIComponent(escape(u2.stringify(e4)));
        } catch (e5) {
          throw new Error("Malformed UTF-8 data");
        }
      }, parse: function(e4) {
        return u2.parse(unescape(encodeURIComponent(e4)));
      } }, l2 = r2.BufferedBlockAlgorithm = i2.extend({ reset: function() {
        this._data = new o2.init(), this._nDataBytes = 0;
      }, _append: function(e4) {
        "string" == typeof e4 && (e4 = h2.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
      }, _process: function(t4) {
        var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a3 = r3 / (4 * i3), c3 = (a3 = t4 ? e3.ceil(a3) : e3.max((0 | a3) - this._minBufferSize, 0)) * i3, u3 = e3.min(4 * c3, r3);
        if (c3) {
          for (var h3 = 0; h3 < c3; h3 += i3)
            this._doProcessBlock(s3, h3);
          var l3 = s3.splice(0, c3);
          n4.sigBytes -= u3;
        }
        return new o2.init(l3, u3);
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._data = this._data.clone(), e4;
      }, _minBufferSize: 0 });
      r2.Hasher = l2.extend({ cfg: i2.extend(), init: function(e4) {
        this.cfg = this.cfg.extend(e4), this.reset();
      }, reset: function() {
        l2.reset.call(this), this._doReset();
      }, update: function(e4) {
        return this._append(e4), this._process(), this;
      }, finalize: function(e4) {
        return e4 && this._append(e4), this._doFinalize();
      }, blockSize: 16, _createHelper: function(e4) {
        return function(t4, n4) {
          return new e4.init(n4).finalize(t4);
        };
      }, _createHmacHelper: function(e4) {
        return function(t4, n4) {
          return new d2.HMAC.init(e4, n4).finalize(t4);
        };
      } });
      var d2 = s2.algo = {};
      return s2;
    }(Math), n2);
  }), r = s, i = (n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function(e3) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [];
      !function() {
        for (var t4 = 0; t4 < 64; t4++)
          a2[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
      }();
      var c2 = o2.MD5 = i2.extend({ _doReset: function() {
        this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
      }, _doProcessBlock: function(e4, t4) {
        for (var n3 = 0; n3 < 16; n3++) {
          var s3 = t4 + n3, r3 = e4[s3];
          e4[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
        }
        var i3 = this._hash.words, o3 = e4[t4 + 0], c3 = e4[t4 + 1], p2 = e4[t4 + 2], f2 = e4[t4 + 3], g2 = e4[t4 + 4], m2 = e4[t4 + 5], y2 = e4[t4 + 6], _2 = e4[t4 + 7], w2 = e4[t4 + 8], v2 = e4[t4 + 9], I2 = e4[t4 + 10], S2 = e4[t4 + 11], b2 = e4[t4 + 12], k2 = e4[t4 + 13], A2 = e4[t4 + 14], P2 = e4[t4 + 15], T2 = i3[0], C2 = i3[1], x2 = i3[2], O2 = i3[3];
        T2 = u2(T2, C2, x2, O2, o3, 7, a2[0]), O2 = u2(O2, T2, C2, x2, c3, 12, a2[1]), x2 = u2(x2, O2, T2, C2, p2, 17, a2[2]), C2 = u2(C2, x2, O2, T2, f2, 22, a2[3]), T2 = u2(T2, C2, x2, O2, g2, 7, a2[4]), O2 = u2(O2, T2, C2, x2, m2, 12, a2[5]), x2 = u2(x2, O2, T2, C2, y2, 17, a2[6]), C2 = u2(C2, x2, O2, T2, _2, 22, a2[7]), T2 = u2(T2, C2, x2, O2, w2, 7, a2[8]), O2 = u2(O2, T2, C2, x2, v2, 12, a2[9]), x2 = u2(x2, O2, T2, C2, I2, 17, a2[10]), C2 = u2(C2, x2, O2, T2, S2, 22, a2[11]), T2 = u2(T2, C2, x2, O2, b2, 7, a2[12]), O2 = u2(O2, T2, C2, x2, k2, 12, a2[13]), x2 = u2(x2, O2, T2, C2, A2, 17, a2[14]), T2 = h2(T2, C2 = u2(C2, x2, O2, T2, P2, 22, a2[15]), x2, O2, c3, 5, a2[16]), O2 = h2(O2, T2, C2, x2, y2, 9, a2[17]), x2 = h2(x2, O2, T2, C2, S2, 14, a2[18]), C2 = h2(C2, x2, O2, T2, o3, 20, a2[19]), T2 = h2(T2, C2, x2, O2, m2, 5, a2[20]), O2 = h2(O2, T2, C2, x2, I2, 9, a2[21]), x2 = h2(x2, O2, T2, C2, P2, 14, a2[22]), C2 = h2(C2, x2, O2, T2, g2, 20, a2[23]), T2 = h2(T2, C2, x2, O2, v2, 5, a2[24]), O2 = h2(O2, T2, C2, x2, A2, 9, a2[25]), x2 = h2(x2, O2, T2, C2, f2, 14, a2[26]), C2 = h2(C2, x2, O2, T2, w2, 20, a2[27]), T2 = h2(T2, C2, x2, O2, k2, 5, a2[28]), O2 = h2(O2, T2, C2, x2, p2, 9, a2[29]), x2 = h2(x2, O2, T2, C2, _2, 14, a2[30]), T2 = l2(T2, C2 = h2(C2, x2, O2, T2, b2, 20, a2[31]), x2, O2, m2, 4, a2[32]), O2 = l2(O2, T2, C2, x2, w2, 11, a2[33]), x2 = l2(x2, O2, T2, C2, S2, 16, a2[34]), C2 = l2(C2, x2, O2, T2, A2, 23, a2[35]), T2 = l2(T2, C2, x2, O2, c3, 4, a2[36]), O2 = l2(O2, T2, C2, x2, g2, 11, a2[37]), x2 = l2(x2, O2, T2, C2, _2, 16, a2[38]), C2 = l2(C2, x2, O2, T2, I2, 23, a2[39]), T2 = l2(T2, C2, x2, O2, k2, 4, a2[40]), O2 = l2(O2, T2, C2, x2, o3, 11, a2[41]), x2 = l2(x2, O2, T2, C2, f2, 16, a2[42]), C2 = l2(C2, x2, O2, T2, y2, 23, a2[43]), T2 = l2(T2, C2, x2, O2, v2, 4, a2[44]), O2 = l2(O2, T2, C2, x2, b2, 11, a2[45]), x2 = l2(x2, O2, T2, C2, P2, 16, a2[46]), T2 = d2(T2, C2 = l2(C2, x2, O2, T2, p2, 23, a2[47]), x2, O2, o3, 6, a2[48]), O2 = d2(O2, T2, C2, x2, _2, 10, a2[49]), x2 = d2(x2, O2, T2, C2, A2, 15, a2[50]), C2 = d2(C2, x2, O2, T2, m2, 21, a2[51]), T2 = d2(T2, C2, x2, O2, b2, 6, a2[52]), O2 = d2(O2, T2, C2, x2, f2, 10, a2[53]), x2 = d2(x2, O2, T2, C2, I2, 15, a2[54]), C2 = d2(C2, x2, O2, T2, c3, 21, a2[55]), T2 = d2(T2, C2, x2, O2, w2, 6, a2[56]), O2 = d2(O2, T2, C2, x2, P2, 10, a2[57]), x2 = d2(x2, O2, T2, C2, y2, 15, a2[58]), C2 = d2(C2, x2, O2, T2, k2, 21, a2[59]), T2 = d2(T2, C2, x2, O2, g2, 6, a2[60]), O2 = d2(O2, T2, C2, x2, S2, 10, a2[61]), x2 = d2(x2, O2, T2, C2, p2, 15, a2[62]), C2 = d2(C2, x2, O2, T2, v2, 21, a2[63]), i3[0] = i3[0] + T2 | 0, i3[1] = i3[1] + C2 | 0, i3[2] = i3[2] + x2 | 0, i3[3] = i3[3] + O2 | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
        var i3 = e3.floor(s3 / 4294967296), o3 = s3;
        n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
        for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
          var h3 = c3[u3];
          c3[u3] = 16711935 & (h3 << 8 | h3 >>> 24) | 4278255360 & (h3 << 24 | h3 >>> 8);
        }
        return a3;
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._hash = this._hash.clone(), e4;
      } });
      function u2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 & n3 | ~t4 & s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function h2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 & s3 | n3 & ~s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function l2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 ^ n3 ^ s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function d2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (n3 ^ (t4 | ~s3)) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      t3.MD5 = i2._createHelper(c2), t3.HmacMD5 = i2._createHmacHelper(c2);
    }(Math), n2.MD5);
  }), n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, void function() {
      var e3 = n2, t3 = e3.lib.Base, s2 = e3.enc.Utf8;
      e3.algo.HMAC = t3.extend({ init: function(e4, t4) {
        e4 = this._hasher = new e4.init(), "string" == typeof t4 && (t4 = s2.parse(t4));
        var n3 = e4.blockSize, r2 = 4 * n3;
        t4.sigBytes > r2 && (t4 = e4.finalize(t4)), t4.clamp();
        for (var i2 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a2 = i2.words, c2 = o2.words, u2 = 0; u2 < n3; u2++)
          a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
        i2.sigBytes = o2.sigBytes = r2, this.reset();
      }, reset: function() {
        var e4 = this._hasher;
        e4.reset(), e4.update(this._iKey);
      }, update: function(e4) {
        return this._hasher.update(e4), this;
      }, finalize: function(e4) {
        var t4 = this._hasher, n3 = t4.finalize(e4);
        return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
      } });
    }());
  }), n(function(e2, t2) {
    e2.exports = r.HmacMD5;
  })), o = n(function(e2, t2) {
    e2.exports = r.enc.Utf8;
  }), a = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function() {
      var e3 = n2, t3 = e3.lib.WordArray;
      function s2(e4, n3, s3) {
        for (var r2 = [], i2 = 0, o2 = 0; o2 < n3; o2++)
          if (o2 % 4) {
            var a2 = s3[e4.charCodeAt(o2 - 1)] << o2 % 4 * 2, c2 = s3[e4.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
            r2[i2 >>> 2] |= (a2 | c2) << 24 - i2 % 4 * 8, i2++;
          }
        return t3.create(r2, i2);
      }
      e3.enc.Base64 = { stringify: function(e4) {
        var t4 = e4.words, n3 = e4.sigBytes, s3 = this._map;
        e4.clamp();
        for (var r2 = [], i2 = 0; i2 < n3; i2 += 3)
          for (var o2 = (t4[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) << 16 | (t4[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255) << 8 | t4[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && i2 + 0.75 * a2 < n3; a2++)
            r2.push(s3.charAt(o2 >>> 6 * (3 - a2) & 63));
        var c2 = s3.charAt(64);
        if (c2)
          for (; r2.length % 4; )
            r2.push(c2);
        return r2.join("");
      }, parse: function(e4) {
        var t4 = e4.length, n3 = this._map, r2 = this._reverseMap;
        if (!r2) {
          r2 = this._reverseMap = [];
          for (var i2 = 0; i2 < n3.length; i2++)
            r2[n3.charCodeAt(i2)] = i2;
        }
        var o2 = n3.charAt(64);
        if (o2) {
          var a2 = e4.indexOf(o2);
          -1 !== a2 && (t4 = a2);
        }
        return s2(e4, t4, r2);
      }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
    }(), n2.enc.Base64);
  });
  const c = "FUNCTION", u = "OBJECT", h = "CLIENT_DB", l = "pending", d = "fulfilled", p = "rejected";
  function f(e2) {
    return Object.prototype.toString.call(e2).slice(8, -1).toLowerCase();
  }
  function g(e2) {
    return "object" === f(e2);
  }
  function m(e2) {
    return "function" == typeof e2;
  }
  function y(e2) {
    return function() {
      try {
        return e2.apply(e2, arguments);
      } catch (e3) {
        console.error(e3);
      }
    };
  }
  const _ = "REJECTED", w = "NOT_PENDING";
  class v {
    constructor({ createPromise: e2, retryRule: t2 = _ } = {}) {
      this.createPromise = e2, this.status = null, this.promise = null, this.retryRule = t2;
    }
    get needRetry() {
      if (!this.status)
        return true;
      switch (this.retryRule) {
        case _:
          return this.status === p;
        case w:
          return this.status !== l;
      }
    }
    exec() {
      return this.needRetry ? (this.status = l, this.promise = this.createPromise().then((e2) => (this.status = d, Promise.resolve(e2)), (e2) => (this.status = p, Promise.reject(e2))), this.promise) : this.promise;
    }
  }
  function I(e2) {
    return e2 && "string" == typeof e2 ? JSON.parse(e2) : e2;
  }
  const S = true, b = "app", A = I(define_process_env_UNI_SECURE_NETWORK_CONFIG_default), P = b, T = I(""), C = I("[]") || [];
  let O = "";
  try {
    O = "__UNI__292AE5E";
  } catch (e2) {
  }
  let E = {};
  function L(e2, t2 = {}) {
    var n2, s2;
    return n2 = E, s2 = e2, Object.prototype.hasOwnProperty.call(n2, s2) || (E[e2] = t2), E[e2];
  }
  E = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {};
  const R = ["invoke", "success", "fail", "complete"], U = L("_globalUniCloudInterceptor");
  function N(e2, t2) {
    U[e2] || (U[e2] = {}), g(t2) && Object.keys(t2).forEach((n2) => {
      R.indexOf(n2) > -1 && function(e3, t3, n3) {
        let s2 = U[e3][t3];
        s2 || (s2 = U[e3][t3] = []), -1 === s2.indexOf(n3) && m(n3) && s2.push(n3);
      }(e2, n2, t2[n2]);
    });
  }
  function D(e2, t2) {
    U[e2] || (U[e2] = {}), g(t2) ? Object.keys(t2).forEach((n2) => {
      R.indexOf(n2) > -1 && function(e3, t3, n3) {
        const s2 = U[e3][t3];
        if (!s2)
          return;
        const r2 = s2.indexOf(n3);
        r2 > -1 && s2.splice(r2, 1);
      }(e2, n2, t2[n2]);
    }) : delete U[e2];
  }
  function M(e2, t2) {
    return e2 && 0 !== e2.length ? e2.reduce((e3, n2) => e3.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
  }
  function q(e2, t2) {
    return U[e2] && U[e2][t2] || [];
  }
  function F(e2) {
    N("callObject", e2);
  }
  const K = L("_globalUniCloudListener"), j = "response", $ = "needLogin", B = "refreshToken", W = "clientdb", H = "cloudfunction", z = "cloudobject";
  function J(e2) {
    return K[e2] || (K[e2] = []), K[e2];
  }
  function G(e2, t2) {
    const n2 = J(e2);
    n2.includes(t2) || n2.push(t2);
  }
  function V(e2, t2) {
    const n2 = J(e2), s2 = n2.indexOf(t2);
    -1 !== s2 && n2.splice(s2, 1);
  }
  function Y(e2, t2) {
    const n2 = J(e2);
    for (let e3 = 0; e3 < n2.length; e3++) {
      (0, n2[e3])(t2);
    }
  }
  let Q, X = false;
  function Z() {
    return Q || (Q = new Promise((e2) => {
      X && e2(), function t2() {
        if ("function" == typeof getCurrentPages) {
          const t3 = getCurrentPages();
          t3 && t3[0] && (X = true, e2());
        }
        X || setTimeout(() => {
          t2();
        }, 30);
      }();
    }), Q);
  }
  function ee(e2) {
    const t2 = {};
    for (const n2 in e2) {
      const s2 = e2[n2];
      m(s2) && (t2[n2] = y(s2));
    }
    return t2;
  }
  class te extends Error {
    constructor(e2) {
      super(e2.message), this.errMsg = e2.message || e2.errMsg || "unknown system error", this.code = this.errCode = e2.code || e2.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e2.subject || e2.errSubject, this.cause = e2.cause, this.requestId = e2.requestId;
    }
    toJson(e2 = 0) {
      if (!(e2 >= 10))
        return e2++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e2) : this.cause };
    }
  }
  var ne = { request: (e2) => uni.request(e2), uploadFile: (e2) => uni.uploadFile(e2), setStorageSync: (e2, t2) => uni.setStorageSync(e2, t2), getStorageSync: (e2) => uni.getStorageSync(e2), removeStorageSync: (e2) => uni.removeStorageSync(e2), clearStorageSync: () => uni.clearStorageSync() };
  function se(e2) {
    return e2 && se(e2.__v_raw) || e2;
  }
  function re() {
    return { token: ne.getStorageSync("uni_id_token") || ne.getStorageSync("uniIdToken"), tokenExpired: ne.getStorageSync("uni_id_token_expired") };
  }
  function ie({ token: e2, tokenExpired: t2 } = {}) {
    e2 && ne.setStorageSync("uni_id_token", e2), t2 && ne.setStorageSync("uni_id_token_expired", t2);
  }
  let oe, ae;
  function ce() {
    return oe || (oe = uni.getSystemInfoSync()), oe;
  }
  function ue() {
    let e2, t2;
    try {
      if (uni.getLaunchOptionsSync) {
        if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
          return;
        const { scene: n2, channel: s2 } = uni.getLaunchOptionsSync();
        e2 = s2, t2 = n2;
      }
    } catch (e3) {
    }
    return { channel: e2, scene: t2 };
  }
  function he() {
    const e2 = uni.getLocale && uni.getLocale() || "en";
    if (ae)
      return { ...ae, locale: e2, LOCALE: e2 };
    const t2 = ce(), { deviceId: n2, osName: s2, uniPlatform: r2, appId: i2 } = t2, o2 = ["pixelRatio", "brand", "model", "system", "language", "version", "platform", "host", "SDKVersion", "swanNativeVersion", "app", "AppPlatform", "fontSizeSetting"];
    for (let e3 = 0; e3 < o2.length; e3++) {
      delete t2[o2[e3]];
    }
    return ae = { PLATFORM: r2, OS: s2, APPID: i2, DEVICEID: n2, ...ue(), ...t2 }, { ...ae, locale: e2, LOCALE: e2 };
  }
  var le = { sign: function(e2, t2) {
    let n2 = "";
    return Object.keys(e2).sort().forEach(function(t3) {
      e2[t3] && (n2 = n2 + "&" + t3 + "=" + e2[t3]);
    }), n2 = n2.slice(1), i(n2, t2).toString();
  }, wrappedRequest: function(e2, t2) {
    return new Promise((n2, s2) => {
      t2(Object.assign(e2, { complete(e3) {
        e3 || (e3 = {});
        const t3 = e3.data && e3.data.header && e3.data.header["x-serverless-request-id"] || e3.header && e3.header["request-id"];
        if (!e3.statusCode || e3.statusCode >= 400) {
          const n3 = e3.data && e3.data.error && e3.data.error.code || "SYS_ERR", r3 = e3.data && e3.data.error && e3.data.error.message || e3.errMsg || "request:fail";
          return s2(new te({ code: n3, message: r3, requestId: t3 }));
        }
        const r2 = e3.data;
        if (r2.error)
          return s2(new te({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
        r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
      } }));
    });
  }, toBase64: function(e2) {
    return a.stringify(o.parse(e2));
  } };
  var de = class {
    constructor(e2) {
      ["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(`${t2} required`);
      }), this.config = Object.assign({}, { endpoint: 0 === e2.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com" }, e2), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = ne, this._getAccessTokenPromiseHub = new v({ createPromise: () => this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e3) => {
        if (!e3.result || !e3.result.accessToken)
          throw new te({ code: "AUTH_FAILED", message: "获取accessToken失败" });
        this.setAccessToken(e3.result.accessToken);
      }), retryRule: w });
    }
    get hasAccessToken() {
      return !!this.accessToken;
    }
    setAccessToken(e2) {
      this.accessToken = e2;
    }
    requestWrapped(e2) {
      return le.wrappedRequest(e2, this.adapter.request);
    }
    requestAuth(e2) {
      return this.requestWrapped(e2);
    }
    request(e2, t2) {
      return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e2) : this.requestWrapped(e2).catch((t3) => new Promise((e3, n2) => {
        !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e3();
      }).then(() => this.getAccessToken()).then(() => {
        const t4 = this.rebuildRequest(e2);
        return this.request(t4, true);
      })) : this.getAccessToken().then(() => {
        const t3 = this.rebuildRequest(e2);
        return this.request(t3, true);
      }));
    }
    rebuildRequest(e2) {
      const t2 = Object.assign({}, e2);
      return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = le.sign(t2.data, this.config.clientSecret), t2;
    }
    setupRequest(e2, t2) {
      const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = le.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
    }
    getAccessToken() {
      return this._getAccessTokenPromiseHub.exec();
    }
    async authorize() {
      await this.getAccessToken();
    }
    callFunction(e2) {
      const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
      return this.request(this.setupRequest(t2));
    }
    getOSSUploadOptionsFromPath(e2) {
      const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
      return this.request(this.setupRequest(t2));
    }
    uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
      return new Promise((o2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e3) {
          e3 && e3.statusCode < 400 ? o2(e3) : a2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          a2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
          i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }
    reportOSSUpload(e2) {
      const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
      return this.request(this.setupRequest(t2));
    }
    async uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", cloudPathAsRealPath: s2 = false, onUploadProgress: r2, config: i2 }) {
      if ("string" !== f(t2))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
      if (!(t2 = t2.trim()))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
      if (/:\/\//.test(t2))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath不合法" });
      const o2 = i2 && i2.envType || this.config.envType;
      if (s2 && ("/" !== t2[0] && (t2 = "/" + t2), t2.indexOf("\\") > -1))
        throw new te({ code: "INVALID_PARAM", message: "使用cloudPath作为路径时，cloudPath不可包含“\\”" });
      const a2 = (await this.getOSSUploadOptionsFromPath({ env: o2, filename: s2 ? t2.split("/").pop() : t2, fileId: s2 ? t2 : void 0 })).result, c2 = "https://" + a2.cdnDomain + "/" + a2.ossPath, { securityToken: u2, accessKeyId: h2, signature: l2, host: d2, ossPath: p2, id: g2, policy: m2, ossCallbackUrl: y2 } = a2, _2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: h2, Signature: l2, host: d2, id: g2, key: p2, policy: m2, success_action_status: 200 };
      if (u2 && (_2["x-oss-security-token"] = u2), y2) {
        const e3 = JSON.stringify({ callbackUrl: y2, callbackBody: JSON.stringify({ fileId: g2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
        _2.callback = le.toBase64(e3);
      }
      const w2 = { url: "https://" + a2.host, formData: _2, fileName: "file", name: "file", filePath: e2, fileType: n2 };
      if (await this.uploadFileToOSS(Object.assign({}, w2, { onUploadProgress: r2 })), y2)
        return { success: true, filePath: e2, fileID: c2 };
      if ((await this.reportOSSUpload({ id: g2 })).success)
        return { success: true, filePath: e2, fileID: c2 };
      throw new te({ code: "UPLOAD_FAILED", message: "文件上传失败" });
    }
    getTempFileURL({ fileList: e2 } = {}) {
      return new Promise((t2, n2) => {
        Array.isArray(e2) && 0 !== e2.length || n2(new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t2({ fileList: e2.map((e3) => ({ fileID: e3, tempFileURL: e3 })) });
      });
    }
    async getFileInfo({ fileList: e2 } = {}) {
      if (!Array.isArray(e2) || 0 === e2.length)
        throw new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const t2 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e2.map((e3) => e3.split("?")[0]).join(",") }) };
      return { fileList: (await this.request(this.setupRequest(t2))).result };
    }
  };
  var pe = { init(e2) {
    const t2 = new de(e2), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } };
  const fe = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
  var ge;
  !function(e2) {
    e2.local = "local", e2.none = "none", e2.session = "session";
  }(ge || (ge = {}));
  var me = function() {
  }, ye = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function(e3) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [], c2 = [];
      !function() {
        function t4(t5) {
          for (var n4 = e3.sqrt(t5), s4 = 2; s4 <= n4; s4++)
            if (!(t5 % s4))
              return false;
          return true;
        }
        function n3(e4) {
          return 4294967296 * (e4 - (0 | e4)) | 0;
        }
        for (var s3 = 2, r3 = 0; r3 < 64; )
          t4(s3) && (r3 < 8 && (a2[r3] = n3(e3.pow(s3, 0.5))), c2[r3] = n3(e3.pow(s3, 1 / 3)), r3++), s3++;
      }();
      var u2 = [], h2 = o2.SHA256 = i2.extend({ _doReset: function() {
        this._hash = new r2.init(a2.slice(0));
      }, _doProcessBlock: function(e4, t4) {
        for (var n3 = this._hash.words, s3 = n3[0], r3 = n3[1], i3 = n3[2], o3 = n3[3], a3 = n3[4], h3 = n3[5], l2 = n3[6], d2 = n3[7], p2 = 0; p2 < 64; p2++) {
          if (p2 < 16)
            u2[p2] = 0 | e4[t4 + p2];
          else {
            var f2 = u2[p2 - 15], g2 = (f2 << 25 | f2 >>> 7) ^ (f2 << 14 | f2 >>> 18) ^ f2 >>> 3, m2 = u2[p2 - 2], y2 = (m2 << 15 | m2 >>> 17) ^ (m2 << 13 | m2 >>> 19) ^ m2 >>> 10;
            u2[p2] = g2 + u2[p2 - 7] + y2 + u2[p2 - 16];
          }
          var _2 = s3 & r3 ^ s3 & i3 ^ r3 & i3, w2 = (s3 << 30 | s3 >>> 2) ^ (s3 << 19 | s3 >>> 13) ^ (s3 << 10 | s3 >>> 22), v2 = d2 + ((a3 << 26 | a3 >>> 6) ^ (a3 << 21 | a3 >>> 11) ^ (a3 << 7 | a3 >>> 25)) + (a3 & h3 ^ ~a3 & l2) + c2[p2] + u2[p2];
          d2 = l2, l2 = h3, h3 = a3, a3 = o3 + v2 | 0, o3 = i3, i3 = r3, r3 = s3, s3 = v2 + (w2 + _2) | 0;
        }
        n3[0] = n3[0] + s3 | 0, n3[1] = n3[1] + r3 | 0, n3[2] = n3[2] + i3 | 0, n3[3] = n3[3] + o3 | 0, n3[4] = n3[4] + a3 | 0, n3[5] = n3[5] + h3 | 0, n3[6] = n3[6] + l2 | 0, n3[7] = n3[7] + d2 | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        return n3[r3 >>> 5] |= 128 << 24 - r3 % 32, n3[14 + (r3 + 64 >>> 9 << 4)] = e3.floor(s3 / 4294967296), n3[15 + (r3 + 64 >>> 9 << 4)] = s3, t4.sigBytes = 4 * n3.length, this._process(), this._hash;
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._hash = this._hash.clone(), e4;
      } });
      t3.SHA256 = i2._createHelper(h2), t3.HmacSHA256 = i2._createHmacHelper(h2);
    }(Math), n2.SHA256);
  }), _e = ye, we = n(function(e2, t2) {
    e2.exports = r.HmacSHA256;
  });
  const ve = () => {
    let e2;
    if (!Promise) {
      e2 = () => {
      }, e2.promise = {};
      const t3 = () => {
        throw new te({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
      };
      return Object.defineProperty(e2.promise, "then", { get: t3 }), Object.defineProperty(e2.promise, "catch", { get: t3 }), e2;
    }
    const t2 = new Promise((t3, n2) => {
      e2 = (e3, s2) => e3 ? n2(e3) : t3(s2);
    });
    return e2.promise = t2, e2;
  };
  function Ie(e2) {
    return void 0 === e2;
  }
  function Se(e2) {
    return "[object Null]" === Object.prototype.toString.call(e2);
  }
  var be;
  function ke(e2) {
    const t2 = (n2 = e2, "[object Array]" === Object.prototype.toString.call(n2) ? e2 : [e2]);
    var n2;
    for (const e3 of t2) {
      const { isMatch: t3, genAdapter: n3, runtime: s2 } = e3;
      if (t3())
        return { adapter: n3(), runtime: s2 };
    }
  }
  !function(e2) {
    e2.WEB = "web", e2.WX_MP = "wx_mp";
  }(be || (be = {}));
  const Ae = { adapter: null, runtime: void 0 }, Pe = ["anonymousUuidKey"];
  class Te extends me {
    constructor() {
      super(), Ae.adapter.root.tcbObject || (Ae.adapter.root.tcbObject = {});
    }
    setItem(e2, t2) {
      Ae.adapter.root.tcbObject[e2] = t2;
    }
    getItem(e2) {
      return Ae.adapter.root.tcbObject[e2];
    }
    removeItem(e2) {
      delete Ae.adapter.root.tcbObject[e2];
    }
    clear() {
      delete Ae.adapter.root.tcbObject;
    }
  }
  function Ce(e2, t2) {
    switch (e2) {
      case "local":
        return t2.localStorage || new Te();
      case "none":
        return new Te();
      default:
        return t2.sessionStorage || new Te();
    }
  }
  class xe {
    constructor(e2) {
      if (!this._storage) {
        this._persistence = Ae.adapter.primaryStorage || e2.persistence, this._storage = Ce(this._persistence, Ae.adapter);
        const t2 = `access_token_${e2.env}`, n2 = `access_token_expire_${e2.env}`, s2 = `refresh_token_${e2.env}`, r2 = `anonymous_uuid_${e2.env}`, i2 = `login_type_${e2.env}`, o2 = `user_info_${e2.env}`;
        this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: i2, userInfoKey: o2 };
      }
    }
    updatePersistence(e2) {
      if (e2 === this._persistence)
        return;
      const t2 = "local" === this._persistence;
      this._persistence = e2;
      const n2 = Ce(e2, Ae.adapter);
      for (const e3 in this.keys) {
        const s2 = this.keys[e3];
        if (t2 && Pe.includes(e3))
          continue;
        const r2 = this._storage.getItem(s2);
        Ie(r2) || Se(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
      }
      this._storage = n2;
    }
    setStore(e2, t2, n2) {
      if (!this._storage)
        return;
      const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
      try {
        this._storage.setItem(e2, r2);
      } catch (e3) {
        throw e3;
      }
    }
    getStore(e2, t2) {
      try {
        if (!this._storage)
          return;
      } catch (e3) {
        return "";
      }
      t2 = t2 || "localCachev1";
      const n2 = this._storage.getItem(e2);
      if (!n2)
        return "";
      if (n2.indexOf(t2) >= 0) {
        return JSON.parse(n2).content;
      }
      return "";
    }
    removeStore(e2) {
      this._storage.removeItem(e2);
    }
  }
  const Oe = {}, Ee = {};
  function Le(e2) {
    return Oe[e2];
  }
  class Re {
    constructor(e2, t2) {
      this.data = t2 || null, this.name = e2;
    }
  }
  class Ue extends Re {
    constructor(e2, t2) {
      super("error", { error: e2, data: t2 }), this.error = e2;
    }
  }
  const Ne = new class {
    constructor() {
      this._listeners = {};
    }
    on(e2, t2) {
      return function(e3, t3, n2) {
        n2[e3] = n2[e3] || [], n2[e3].push(t3);
      }(e2, t2, this._listeners), this;
    }
    off(e2, t2) {
      return function(e3, t3, n2) {
        if (n2 && n2[e3]) {
          const s2 = n2[e3].indexOf(t3);
          -1 !== s2 && n2[e3].splice(s2, 1);
        }
      }(e2, t2, this._listeners), this;
    }
    fire(e2, t2) {
      if (e2 instanceof Ue)
        return console.error(e2.error), this;
      const n2 = "string" == typeof e2 ? new Re(e2, t2 || {}) : e2;
      const s2 = n2.name;
      if (this._listens(s2)) {
        n2.target = this;
        const e3 = this._listeners[s2] ? [...this._listeners[s2]] : [];
        for (const t3 of e3)
          t3.call(this, n2);
      }
      return this;
    }
    _listens(e2) {
      return this._listeners[e2] && this._listeners[e2].length > 0;
    }
  }();
  function De(e2, t2) {
    Ne.on(e2, t2);
  }
  function Me(e2, t2 = {}) {
    Ne.fire(e2, t2);
  }
  function qe(e2, t2) {
    Ne.off(e2, t2);
  }
  const Fe = "loginStateChanged", Ke = "loginStateExpire", je = "loginTypeChanged", $e = "anonymousConverted", Be = "refreshAccessToken";
  var We;
  !function(e2) {
    e2.ANONYMOUS = "ANONYMOUS", e2.WECHAT = "WECHAT", e2.WECHAT_PUBLIC = "WECHAT-PUBLIC", e2.WECHAT_OPEN = "WECHAT-OPEN", e2.CUSTOM = "CUSTOM", e2.EMAIL = "EMAIL", e2.USERNAME = "USERNAME", e2.NULL = "NULL";
  }(We || (We = {}));
  const He = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], ze = { "X-SDK-Version": "1.3.5" };
  function Je(e2, t2, n2) {
    const s2 = e2[t2];
    e2[t2] = function(t3) {
      const r2 = {}, i2 = {};
      n2.forEach((n3) => {
        const { data: s3, headers: o3 } = n3.call(e2, t3);
        Object.assign(r2, s3), Object.assign(i2, o3);
      });
      const o2 = t3.data;
      return o2 && (() => {
        var e3;
        if (e3 = o2, "[object FormData]" !== Object.prototype.toString.call(e3))
          t3.data = { ...o2, ...r2 };
        else
          for (const e4 in r2)
            o2.append(e4, r2[e4]);
      })(), t3.headers = { ...t3.headers || {}, ...i2 }, s2.call(e2, t3);
    };
  }
  function Ge() {
    const e2 = Math.random().toString(16).slice(2);
    return { data: { seqId: e2 }, headers: { ...ze, "x-seqid": e2 } };
  }
  class Ve {
    constructor(e2 = {}) {
      var t2;
      this.config = e2, this._reqClass = new Ae.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `请求在${this.config.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] }), this._cache = Le(this.config.env), this._localCache = (t2 = this.config.env, Ee[t2]), Je(this._reqClass, "post", [Ge]), Je(this._reqClass, "upload", [Ge]), Je(this._reqClass, "download", [Ge]);
    }
    async post(e2) {
      return await this._reqClass.post(e2);
    }
    async upload(e2) {
      return await this._reqClass.upload(e2);
    }
    async download(e2) {
      return await this._reqClass.download(e2);
    }
    async refreshAccessToken() {
      let e2, t2;
      this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
      try {
        e2 = await this._refreshAccessTokenPromise;
      } catch (e3) {
        t2 = e3;
      }
      if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
        throw t2;
      return e2;
    }
    async _refreshAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
      this._cache.removeStore(e2), this._cache.removeStore(t2);
      let i2 = this._cache.getStore(n2);
      if (!i2)
        throw new te({ message: "未登录CloudBase" });
      const o2 = { refresh_token: i2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
      if (a2.data.code) {
        const { code: e3 } = a2.data;
        if ("SIGN_PARAM_INVALID" === e3 || "REFRESH_TOKEN_EXPIRED" === e3 || "INVALID_REFRESH_TOKEN" === e3) {
          if (this._cache.getStore(s2) === We.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e3) {
            const e4 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e4, refresh_token: t3 });
            return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
          }
          Me(Ke), this._cache.removeStore(n2);
        }
        throw new te({ code: a2.data.code, message: `刷新access token失败：${a2.data.code}` });
      }
      if (a2.data.access_token)
        return Me(Be), this._cache.setStore(e2, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
      a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
    }
    async getAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
      if (!this._cache.getStore(n2))
        throw new te({ message: "refresh token不存在，登录状态异常" });
      let s2 = this._cache.getStore(e2), r2 = this._cache.getStore(t2), i2 = true;
      return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (i2 = false), (!s2 || !r2 || r2 < Date.now()) && i2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
    }
    async request(e2, t2, n2) {
      const s2 = `x-tcb-trace_${this.config.env}`;
      let r2 = "application/x-www-form-urlencoded";
      const i2 = { action: e2, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
      if (-1 === He.indexOf(e2)) {
        const { refreshTokenKey: e3 } = this._cache.keys;
        this._cache.getStore(e3) && (i2.access_token = (await this.getAccessToken()).accessToken);
      }
      let o2;
      if ("storage.uploadFile" === e2) {
        o2 = new FormData();
        for (let e3 in o2)
          o2.hasOwnProperty(e3) && void 0 !== o2[e3] && o2.append(e3, i2[e3]);
        r2 = "multipart/form-data";
      } else {
        r2 = "application/json", o2 = {};
        for (let e3 in i2)
          void 0 !== i2[e3] && (o2[e3] = i2[e3]);
      }
      let a2 = { headers: { "content-type": r2 } };
      n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
      const c2 = this._localCache.getStore(s2);
      c2 && (a2.headers["X-TCB-Trace"] = c2);
      const { parse: u2, inQuery: h2, search: l2 } = t2;
      let d2 = { env: this.config.env };
      u2 && (d2.parse = true), h2 && (d2 = { ...h2, ...d2 });
      let p2 = function(e3, t3, n3 = {}) {
        const s3 = /\?/.test(t3);
        let r3 = "";
        for (let e4 in n3)
          "" === r3 ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e4}=${encodeURIComponent(n3[e4])}`;
        return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e3}${t3}`;
      }(fe, "//tcb-api.tencentcloudapi.com/web", d2);
      l2 && (p2 += l2);
      const f2 = await this.post({ url: p2, data: o2, ...a2 }), g2 = f2.header && f2.header["x-tcb-trace"];
      if (g2 && this._localCache.setStore(s2, g2), 200 !== Number(f2.status) && 200 !== Number(f2.statusCode) || !f2.data)
        throw new te({ code: "NETWORK_ERROR", message: "network request error" });
      return f2;
    }
    async send(e2, t2 = {}) {
      const n2 = await this.request(e2, t2, { onUploadProgress: t2.onUploadProgress });
      if ("ACCESS_TOKEN_EXPIRED" === n2.data.code && -1 === He.indexOf(e2)) {
        await this.refreshAccessToken();
        const n3 = await this.request(e2, t2, { onUploadProgress: t2.onUploadProgress });
        if (n3.data.code)
          throw new te({ code: n3.data.code, message: n3.data.message });
        return n3.data;
      }
      if (n2.data.code)
        throw new te({ code: n2.data.code, message: n2.data.message });
      return n2.data;
    }
    setRefreshToken(e2) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
    }
  }
  const Ye = {};
  function Qe(e2) {
    return Ye[e2];
  }
  class Xe {
    constructor(e2) {
      this.config = e2, this._cache = Le(e2.env), this._request = Qe(e2.env);
    }
    setRefreshToken(e2) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
    }
    setAccessToken(e2, t2) {
      const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
      this._cache.setStore(n2, e2), this._cache.setStore(s2, t2);
    }
    async refreshUserInfo() {
      const { data: e2 } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e2), e2;
    }
    setLocalUserInfo(e2) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e2);
    }
  }
  class Ze {
    constructor(e2) {
      if (!e2)
        throw new te({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._envId = e2, this._cache = Le(this._envId), this._request = Qe(this._envId), this.setUserInfo();
    }
    linkWithTicket(e2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "ticket must be string" });
      return this._request.send("auth.linkWithTicket", { ticket: e2 });
    }
    linkWithRedirect(e2) {
      e2.signInWithRedirect();
    }
    updatePassword(e2, t2) {
      return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e2 });
    }
    updateEmail(e2) {
      return this._request.send("auth.updateEmail", { newEmail: e2 });
    }
    updateUsername(e2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
      return this._request.send("auth.updateUsername", { username: e2 });
    }
    async getLinkedUidList() {
      const { data: e2 } = await this._request.send("auth.getLinkedUidList", {});
      let t2 = false;
      const { users: n2 } = e2;
      return n2.forEach((e3) => {
        e3.wxOpenId && e3.wxPublicId && (t2 = true);
      }), { users: n2, hasPrimaryUid: t2 };
    }
    setPrimaryUid(e2) {
      return this._request.send("auth.setPrimaryUid", { uid: e2 });
    }
    unlink(e2) {
      return this._request.send("auth.unlink", { platform: e2 });
    }
    async update(e2) {
      const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 } = e2, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 });
      this.setLocalUserInfo(a2);
    }
    async refresh() {
      const { data: e2 } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e2), e2;
    }
    setUserInfo() {
      const { userInfoKey: e2 } = this._cache.keys, t2 = this._cache.getStore(e2);
      ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e3) => {
        this[e3] = t2[e3];
      }), this.location = { country: t2.country, province: t2.province, city: t2.city };
    }
    setLocalUserInfo(e2) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e2), this.setUserInfo();
    }
  }
  class et {
    constructor(e2) {
      if (!e2)
        throw new te({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._cache = Le(e2);
      const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), i2 = this._cache.getStore(n2), o2 = this._cache.getStore(s2);
      this.credential = { refreshToken: r2, accessToken: i2, accessTokenExpire: o2 }, this.user = new Ze(e2);
    }
    get isAnonymousAuth() {
      return this.loginType === We.ANONYMOUS;
    }
    get isCustomAuth() {
      return this.loginType === We.CUSTOM;
    }
    get isWeixinAuth() {
      return this.loginType === We.WECHAT || this.loginType === We.WECHAT_OPEN || this.loginType === We.WECHAT_PUBLIC;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
  }
  class tt extends Xe {
    async signIn() {
      this._cache.updatePersistence("local");
      const { anonymousUuidKey: e2, refreshTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2) || void 0, s2 = this._cache.getStore(t2) || void 0, r2 = await this._request.send("auth.signInAnonymously", { anonymous_uuid: n2, refresh_token: s2 });
      if (r2.uuid && r2.refresh_token) {
        this._setAnonymousUUID(r2.uuid), this.setRefreshToken(r2.refresh_token), await this._request.refreshAccessToken(), Me(Fe), Me(je, { env: this.config.env, loginType: We.ANONYMOUS, persistence: "local" });
        const e3 = new et(this.config.env);
        return await e3.user.refresh(), e3;
      }
      throw new te({ message: "匿名登录失败" });
    }
    async linkAndRetrieveDataWithTicket(e2) {
      const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e2 });
      if (i2.refresh_token)
        return this._clearAnonymousUUID(), this.setRefreshToken(i2.refresh_token), await this._request.refreshAccessToken(), Me($e, { env: this.config.env }), Me(je, { loginType: We.CUSTOM, persistence: "local" }), { credential: { refreshToken: i2.refresh_token } };
      throw new te({ message: "匿名转化失败" });
    }
    _setAnonymousUUID(e2) {
      const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.setStore(t2, e2), this._cache.setStore(n2, We.ANONYMOUS);
    }
    _clearAnonymousUUID() {
      this._cache.removeStore(this._cache.keys.anonymousUuidKey);
    }
  }
  class nt extends Xe {
    async signIn(e2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "ticket must be a string" });
      const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e2, refresh_token: this._cache.getStore(t2) || "" });
      if (n2.refresh_token)
        return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), Me(Fe), Me(je, { env: this.config.env, loginType: We.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new et(this.config.env);
      throw new te({ message: "自定义登录失败" });
    }
  }
  class st extends Xe {
    async signIn(e2, t2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "email must be a string" });
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i2, access_token_expire: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Me(Fe), Me(je, { env: this.config.env, loginType: We.EMAIL, persistence: this.config.persistence }), new et(this.config.env);
      throw s2.code ? new te({ code: s2.code, message: `邮箱登录失败: ${s2.message}` }) : new te({ message: "邮箱登录失败" });
    }
    async activate(e2) {
      return this._request.send("auth.activateEndUserMail", { token: e2 });
    }
    async resetPasswordWithToken(e2, t2) {
      return this._request.send("auth.resetPasswordWithToken", { token: e2, newPassword: t2 });
    }
  }
  class rt extends Xe {
    async signIn(e2, t2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
      "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: We.USERNAME, username: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i2, access_token: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Me(Fe), Me(je, { env: this.config.env, loginType: We.USERNAME, persistence: this.config.persistence }), new et(this.config.env);
      throw s2.code ? new te({ code: s2.code, message: `用户名密码登录失败: ${s2.message}` }) : new te({ message: "用户名密码登录失败" });
    }
  }
  class it {
    constructor(e2) {
      this.config = e2, this._cache = Le(e2.env), this._request = Qe(e2.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), De(je, this._onLoginTypeChanged);
    }
    get currentUser() {
      const e2 = this.hasLoginState();
      return e2 && e2.user || null;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
    anonymousAuthProvider() {
      return new tt(this.config);
    }
    customAuthProvider() {
      return new nt(this.config);
    }
    emailAuthProvider() {
      return new st(this.config);
    }
    usernameAuthProvider() {
      return new rt(this.config);
    }
    async signInAnonymously() {
      return new tt(this.config).signIn();
    }
    async signInWithEmailAndPassword(e2, t2) {
      return new st(this.config).signIn(e2, t2);
    }
    signInWithUsernameAndPassword(e2, t2) {
      return new rt(this.config).signIn(e2, t2);
    }
    async linkAndRetrieveDataWithTicket(e2) {
      this._anonymousAuthProvider || (this._anonymousAuthProvider = new tt(this.config)), De($e, this._onAnonymousConverted);
      return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e2);
    }
    async signOut() {
      if (this.loginType === We.ANONYMOUS)
        throw new te({ message: "匿名用户不支持登出操作" });
      const { refreshTokenKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e2);
      if (!s2)
        return;
      const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
      return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.removeStore(n2), Me(Fe), Me(je, { env: this.config.env, loginType: We.NULL, persistence: this.config.persistence }), r2;
    }
    async signUpWithEmailAndPassword(e2, t2) {
      return this._request.send("auth.signUpWithEmailAndPassword", { email: e2, password: t2 });
    }
    async sendPasswordResetEmail(e2) {
      return this._request.send("auth.sendPasswordResetEmail", { email: e2 });
    }
    onLoginStateChanged(e2) {
      De(Fe, () => {
        const t3 = this.hasLoginState();
        e2.call(this, t3);
      });
      const t2 = this.hasLoginState();
      e2.call(this, t2);
    }
    onLoginStateExpired(e2) {
      De(Ke, e2.bind(this));
    }
    onAccessTokenRefreshed(e2) {
      De(Be, e2.bind(this));
    }
    onAnonymousConverted(e2) {
      De($e, e2.bind(this));
    }
    onLoginTypeChanged(e2) {
      De(je, () => {
        const t2 = this.hasLoginState();
        e2.call(this, t2);
      });
    }
    async getAccessToken() {
      return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
    }
    hasLoginState() {
      const { refreshTokenKey: e2 } = this._cache.keys;
      return this._cache.getStore(e2) ? new et(this.config.env) : null;
    }
    async isUsernameRegistered(e2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
      const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e2 });
      return t2 && t2.isRegistered;
    }
    getLoginState() {
      return Promise.resolve(this.hasLoginState());
    }
    async signInWithTicket(e2) {
      return new nt(this.config).signIn(e2);
    }
    shouldRefreshAccessToken(e2) {
      this._request._shouldRefreshAccessTokenHook = e2.bind(this);
    }
    getUserInfo() {
      return this._request.send("auth.getUserInfo", {}).then((e2) => e2.code ? e2 : { ...e2.data, requestId: e2.seqId });
    }
    getAuthHeader() {
      const { refreshTokenKey: e2, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2);
      return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
    }
    _onAnonymousConverted(e2) {
      const { env: t2 } = e2.data;
      t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
    }
    _onLoginTypeChanged(e2) {
      const { loginType: t2, persistence: n2, env: s2 } = e2.data;
      s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
    }
  }
  const ot = function(e2, t2) {
    t2 = t2 || ve();
    const n2 = Qe(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: i2, fileType: o2 = "image" } = e2;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
      const { data: { url: a2, authorization: c2, token: u2, fileId: h2, cosFileId: l2 }, requestId: d2 } = e3, p2 = { key: s2, signature: c2, "x-cos-meta-fileid": l2, success_action_status: "201", "x-cos-security-token": u2 };
      n2.upload({ url: a2, data: p2, file: r2, name: s2, fileType: o2, onUploadProgress: i2 }).then((e4) => {
        201 === e4.statusCode ? t2(null, { fileID: h2, requestId: d2 }) : t2(new te({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e4.data}` }));
      }).catch((e4) => {
        t2(e4);
      });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, at = function(e2, t2) {
    t2 = t2 || ve();
    const n2 = Qe(this.config.env), { cloudPath: s2 } = e2;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
      t2(null, e3);
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, ct = function({ fileList: e2 }, t2) {
    if (t2 = t2 || ve(), !e2 || !Array.isArray(e2))
      return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };
    for (let t3 of e2)
      if (!t3 || "string" != typeof t3)
        return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };
    const n2 = { fileid_list: e2 };
    return Qe(this.config.env).send("storage.batchDeleteFile", n2).then((e3) => {
      e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.delete_list, requestId: e3.requestId });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, ut = function({ fileList: e2 }, t2) {
    t2 = t2 || ve(), e2 && Array.isArray(e2) || t2(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });
    let n2 = [];
    for (let s3 of e2)
      "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });
    const s2 = { file_list: n2 };
    return Qe(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e3) => {
      e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.download_list, requestId: e3.requestId });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, ht = async function({ fileID: e2 }, t2) {
    const n2 = (await ut.call(this, { fileList: [{ fileID: e2, maxAge: 600 }] })).fileList[0];
    if ("SUCCESS" !== n2.code)
      return t2 ? t2(n2) : new Promise((e3) => {
        e3(n2);
      });
    const s2 = Qe(this.config.env);
    let r2 = n2.download_url;
    if (r2 = encodeURI(r2), !t2)
      return s2.download({ url: r2 });
    t2(await s2.download({ url: r2 }));
  }, lt = function({ name: e2, data: t2, query: n2, parse: s2, search: r2 }, i2) {
    const o2 = i2 || ve();
    let a2;
    try {
      a2 = t2 ? JSON.stringify(t2) : "";
    } catch (e3) {
      return Promise.reject(e3);
    }
    if (!e2)
      return Promise.reject(new te({ code: "PARAM_ERROR", message: "函数名不能为空" }));
    const c2 = { inQuery: n2, parse: s2, search: r2, function_name: e2, request_data: a2 };
    return Qe(this.config.env).send("functions.invokeFunction", c2).then((e3) => {
      if (e3.code)
        o2(null, e3);
      else {
        let t3 = e3.data.response_data;
        if (s2)
          o2(null, { result: t3, requestId: e3.requestId });
        else
          try {
            t3 = JSON.parse(e3.data.response_data), o2(null, { result: t3, requestId: e3.requestId });
          } catch (e4) {
            o2(new te({ message: "response data must be json" }));
          }
      }
      return o2.promise;
    }).catch((e3) => {
      o2(e3);
    }), o2.promise;
  }, dt = { timeout: 15e3, persistence: "session" }, pt = {};
  class ft {
    constructor(e2) {
      this.config = e2 || this.config, this.authObj = void 0;
    }
    init(e2) {
      switch (Ae.adapter || (this.requestClient = new Ae.adapter.reqClass({ timeout: e2.timeout || 5e3, timeoutMsg: `请求在${(e2.timeout || 5e3) / 1e3}s内未完成，已中断` })), this.config = { ...dt, ...e2 }, true) {
        case this.config.timeout > 6e5:
          console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
          break;
        case this.config.timeout < 100:
          console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
      }
      return new ft(this.config);
    }
    auth({ persistence: e2 } = {}) {
      if (this.authObj)
        return this.authObj;
      const t2 = e2 || Ae.adapter.primaryStorage || dt.persistence;
      var n2;
      return t2 !== this.config.persistence && (this.config.persistence = t2), function(e3) {
        const { env: t3 } = e3;
        Oe[t3] = new xe(e3), Ee[t3] = new xe({ ...e3, persistence: "local" });
      }(this.config), n2 = this.config, Ye[n2.env] = new Ve(n2), this.authObj = new it(this.config), this.authObj;
    }
    on(e2, t2) {
      return De.apply(this, [e2, t2]);
    }
    off(e2, t2) {
      return qe.apply(this, [e2, t2]);
    }
    callFunction(e2, t2) {
      return lt.apply(this, [e2, t2]);
    }
    deleteFile(e2, t2) {
      return ct.apply(this, [e2, t2]);
    }
    getTempFileURL(e2, t2) {
      return ut.apply(this, [e2, t2]);
    }
    downloadFile(e2, t2) {
      return ht.apply(this, [e2, t2]);
    }
    uploadFile(e2, t2) {
      return ot.apply(this, [e2, t2]);
    }
    getUploadMetadata(e2, t2) {
      return at.apply(this, [e2, t2]);
    }
    registerExtension(e2) {
      pt[e2.name] = e2;
    }
    async invokeExtension(e2, t2) {
      const n2 = pt[e2];
      if (!n2)
        throw new te({ message: `扩展${e2} 必须先注册` });
      return await n2.invoke(t2, this);
    }
    useAdapters(e2) {
      const { adapter: t2, runtime: n2 } = ke(e2) || {};
      t2 && (Ae.adapter = t2), n2 && (Ae.runtime = n2);
    }
  }
  var gt = new ft();
  function mt(e2, t2, n2) {
    void 0 === n2 && (n2 = {});
    var s2 = /\?/.test(t2), r2 = "";
    for (var i2 in n2)
      "" === r2 ? !s2 && (t2 += "?") : r2 += "&", r2 += i2 + "=" + encodeURIComponent(n2[i2]);
    return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e2 + t2;
  }
  class yt {
    post(e2) {
      const { url: t2, data: n2, headers: s2 } = e2;
      return new Promise((e3, r2) => {
        ne.request({ url: mt("https:", t2), data: n2, method: "POST", header: s2, success(t3) {
          e3(t3);
        }, fail(e4) {
          r2(e4);
        } });
      });
    }
    upload(e2) {
      return new Promise((t2, n2) => {
        const { url: s2, file: r2, data: i2, headers: o2, fileType: a2 } = e2, c2 = ne.uploadFile({ url: mt("https:", s2), name: "file", formData: Object.assign({}, i2), filePath: r2, fileType: a2, header: o2, success(e3) {
          const n3 = { statusCode: e3.statusCode, data: e3.data || {} };
          200 === e3.statusCode && i2.success_action_status && (n3.statusCode = parseInt(i2.success_action_status, 10)), t2(n3);
        }, fail(e3) {
          n2(new Error(e3.errMsg || "uploadFile:fail"));
        } });
        "function" == typeof e2.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
          e2.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
        });
      });
    }
  }
  const _t = { setItem(e2, t2) {
    ne.setStorageSync(e2, t2);
  }, getItem: (e2) => ne.getStorageSync(e2), removeItem(e2) {
    ne.removeStorageSync(e2);
  }, clear() {
    ne.clearStorageSync();
  } };
  var wt = { genAdapter: function() {
    return { root: {}, reqClass: yt, localStorage: _t, primaryStorage: "local" };
  }, isMatch: function() {
    return true;
  }, runtime: "uni_app" };
  gt.useAdapters(wt);
  const vt = gt, It = vt.init;
  vt.init = function(e2) {
    e2.env = e2.spaceId;
    const t2 = It.call(this, e2);
    t2.config.provider = "tencent", t2.config.spaceId = e2.spaceId;
    const n2 = t2.auth;
    return t2.auth = function(e3) {
      const t3 = n2.call(this, e3);
      return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e4) => {
        var n3;
        t3[e4] = (n3 = t3[e4], function(e5) {
          e5 = e5 || {};
          const { success: t4, fail: s2, complete: r2 } = ee(e5);
          if (!(t4 || s2 || r2))
            return n3.call(this, e5);
          n3.call(this, e5).then((e6) => {
            t4 && t4(e6), r2 && r2(e6);
          }, (e6) => {
            s2 && s2(e6), r2 && r2(e6);
          });
        }).bind(t3);
      }), t3;
    }, t2.customAuth = t2.auth, t2;
  };
  var St = vt;
  var bt = class extends de {
    getAccessToken() {
      return new Promise((e2, t2) => {
        const n2 = "Anonymous_Access_token";
        this.setAccessToken(n2), e2(n2);
      });
    }
    setupRequest(e2, t2) {
      const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = le.sign(n2, this.config.clientSecret);
      const r2 = he();
      s2["x-client-info"] = encodeURIComponent(JSON.stringify(r2));
      const { token: i2 } = re();
      return s2["x-client-token"] = i2, { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: JSON.parse(JSON.stringify(s2)) };
    }
    uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
      return new Promise((o2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, success(e3) {
          e3 && e3.statusCode < 400 ? o2(e3) : a2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          a2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
          i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }
    uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
      if (!t2)
        throw new te({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
      let r2;
      return this.getOSSUploadOptionsFromPath({ cloudPath: t2 }).then((t3) => {
        const { url: i2, formData: o2, name: a2 } = t3.result;
        r2 = t3.result.fileUrl;
        const c2 = { url: i2, formData: o2, name: a2, filePath: e2, fileType: n2 };
        return this.uploadFileToOSS(Object.assign({}, c2, { onUploadProgress: s2 }));
      }).then(() => this.reportOSSUpload({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
        t3.success ? n3({ success: true, filePath: e2, fileID: r2 }) : s3(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }));
    }
    deleteFile({ fileList: e2 }) {
      const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e2 }) };
      return this.request(this.setupRequest(t2)).then((e3) => {
        if (e3.success)
          return e3.result;
        throw new te({ code: "DELETE_FILE_FAILED", message: "删除文件失败" });
      });
    }
    getTempFileURL({ fileList: e2, maxAge: t2 } = {}) {
      if (!Array.isArray(e2) || 0 === e2.length)
        throw new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const n2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e2, maxAge: t2 }) };
      return this.request(this.setupRequest(n2)).then((e3) => {
        if (e3.success)
          return { fileList: e3.result.fileList.map((e4) => ({ fileID: e4.fileID, tempFileURL: e4.tempFileURL })) };
        throw new te({ code: "GET_TEMP_FILE_URL_FAILED", message: "获取临时文件链接失败" });
      });
    }
  };
  var kt = { init(e2) {
    const t2 = new bt(e2), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } }, At = n(function(e2, t2) {
    e2.exports = r.enc.Hex;
  });
  function Pt(e2 = "", t2 = {}) {
    const { data: n2, functionName: s2, method: r2, headers: i2, signHeaderKeys: o2 = [], config: a2 } = t2, c2 = Date.now(), u2 = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e3) {
      var t3 = 16 * Math.random() | 0;
      return ("x" === e3 ? t3 : 3 & t3 | 8).toString(16);
    }), h2 = Object.assign({}, i2, { "x-from-app-id": a2.spaceAppId, "x-from-env-id": a2.spaceId, "x-to-env-id": a2.spaceId, "x-from-instance-id": c2, "x-from-function-name": s2, "x-client-timestamp": c2, "x-alipay-source": "client", "x-request-id": u2, "x-alipay-callid": u2, "x-trace-id": u2 }), l2 = ["x-from-app-id", "x-from-env-id", "x-to-env-id", "x-from-instance-id", "x-from-function-name", "x-client-timestamp"].concat(o2), [d2 = "", p2 = ""] = e2.split("?") || [], f2 = function(e3) {
      const t3 = e3.signedHeaders.join(";"), n3 = e3.signedHeaders.map((t4) => `${t4.toLowerCase()}:${e3.headers[t4]}
`).join(""), s3 = _e(e3.body).toString(At), r3 = `${e3.method.toUpperCase()}
${e3.path}
${e3.query}
${n3}
${t3}
${s3}
`, i3 = _e(r3).toString(At), o3 = `HMAC-SHA256
${e3.timestamp}
${i3}
`, a3 = we(o3, e3.secretKey).toString(At);
      return `HMAC-SHA256 Credential=${e3.secretId}, SignedHeaders=${t3}, Signature=${a3}`;
    }({ path: d2, query: p2, method: r2, headers: h2, timestamp: c2, body: JSON.stringify(n2), secretId: a2.accessKey, secretKey: a2.secretKey, signedHeaders: l2.sort() });
    return { url: `${a2.endpoint}${e2}`, headers: Object.assign({}, h2, { Authorization: f2 }) };
  }
  function Tt({ url: e2, data: t2, method: n2 = "POST", headers: s2 = {} }) {
    return new Promise((r2, i2) => {
      ne.request({ url: e2, method: n2, data: t2, header: s2, dataType: "json", complete: (e3 = {}) => {
        const t3 = s2["x-trace-id"] || "";
        if (!e3.statusCode || e3.statusCode >= 400) {
          const { message: n3, errMsg: s3, trace_id: r3 } = e3.data || {};
          return i2(new te({ code: "SYS_ERR", message: n3 || s3 || "request:fail", requestId: r3 || t3 }));
        }
        r2({ status: e3.statusCode, data: e3.data, headers: e3.header, requestId: t3 });
      } });
    });
  }
  function Ct(e2, t2) {
    const { path: n2, data: s2, method: r2 = "GET" } = e2, { url: i2, headers: o2 } = Pt(n2, { functionName: "", data: s2, method: r2, headers: { "x-alipay-cloud-mode": "oss", "x-data-api-type": "oss", "x-expire-timestamp": Date.now() + 6e4 }, signHeaderKeys: ["x-data-api-type", "x-expire-timestamp"], config: t2 });
    return Tt({ url: i2, data: s2, method: r2, headers: o2 }).then((e3) => {
      const t3 = e3.data || {};
      if (!t3.success)
        throw new te({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
      return t3.data || {};
    }).catch((e3) => {
      throw new te({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
    });
  }
  function xt(e2 = "") {
    const t2 = e2.trim().replace(/^cloud:\/\//, ""), n2 = t2.indexOf("/");
    if (n2 <= 0)
      throw new te({ code: "INVALID_PARAM", message: "fileID不合法" });
    const s2 = t2.substring(0, n2), r2 = t2.substring(n2 + 1);
    return s2 !== this.config.spaceId && console.warn("file ".concat(e2, " does not belong to env ").concat(this.config.spaceId)), r2;
  }
  function Ot(e2 = "") {
    return "cloud://".concat(this.config.spaceId, "/").concat(e2.replace(/^\/+/, ""));
  }
  var Et = class {
    constructor(e2) {
      if (["spaceId", "spaceAppId", "accessKey", "secretKey"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(`${t2} required`);
      }), e2.endpoint) {
        if ("string" != typeof e2.endpoint)
          throw new Error("endpoint must be string");
        if (!/^https:\/\//.test(e2.endpoint))
          throw new Error("endpoint must start with https://");
        e2.endpoint = e2.endpoint.replace(/\/$/, "");
      }
      this.config = Object.assign({}, e2, { endpoint: e2.endpoint || `https://${e2.spaceId}.api-hz.cloudbasefunction.cn` });
    }
    callFunction(e2) {
      return function(e3, t2) {
        const { name: n2, data: s2 } = e3, r2 = "POST", { url: i2, headers: o2 } = Pt("/functions/invokeFunction", { functionName: n2, data: s2, method: r2, headers: { "x-to-function-name": n2 }, signHeaderKeys: ["x-to-function-name"], config: t2 });
        return Tt({ url: i2, data: s2, method: r2, headers: o2 }).then((e4) => ({ errCode: 0, success: true, requestId: e4.requestId, result: e4.data })).catch((e4) => {
          throw new te({ code: e4.errCode, message: e4.errMsg, requestId: e4.requestId });
        });
      }(e2, this.config);
    }
    uploadFileToOSS({ url: e2, filePath: t2, fileType: n2, formData: s2, onUploadProgress: r2 }) {
      return new Promise((i2, o2) => {
        const a2 = ne.uploadFile({ url: e2, filePath: t2, fileType: n2, formData: s2, name: "file", success(e3) {
          e3 && e3.statusCode < 400 ? i2(e3) : o2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          o2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof r2 && a2 && "function" == typeof a2.onProgressUpdate && a2.onProgressUpdate((e3) => {
          r2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }
    async uploadFile({ filePath: e2, cloudPath: t2 = "", fileType: n2 = "image", onUploadProgress: s2 }) {
      if ("string" !== f(t2))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
      if (!(t2 = t2.trim()))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
      if (/:\/\//.test(t2))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath不合法" });
      const r2 = await Ct({ path: "/".concat(t2.replace(/^\//, ""), "?post_url") }, this.config), { file_id: i2, upload_url: o2, form_data: a2 } = r2, c2 = a2 && a2.reduce((e3, t3) => (e3[t3.key] = t3.value, e3), {});
      return this.uploadFileToOSS({ url: o2, filePath: e2, fileType: n2, formData: c2, onUploadProgress: s2 }).then(() => ({ fileID: i2 }));
    }
    async getTempFileURL({ fileList: e2 }) {
      return new Promise((t2, n2) => {
        (!e2 || e2.length < 0) && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList不能为空数组" })), e2.length > 50 && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList数组长度不能超过50" }));
        const s2 = [];
        for (const t3 of e2) {
          "string" !== f(t3) && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList的元素必须是非空的字符串" }));
          const e3 = xt.call(this, t3);
          s2.push({ file_id: e3, expire: 600 });
        }
        Ct({ path: "/?download_url", data: { file_list: s2 }, method: "POST" }, this.config).then((e3) => {
          const { file_list: n3 = [] } = e3;
          t2({ fileList: n3.map((e4) => ({ fileID: Ot.call(this, e4.file_id), tempFileURL: e4.download_url })) });
        }).catch((e3) => n2(e3));
      });
    }
  };
  var Lt = { init: (e2) => {
    e2.provider = "alipay";
    const t2 = new Et(e2);
    return t2.auth = function() {
      return { signInAnonymously: function() {
        return Promise.resolve();
      }, getLoginState: function() {
        return Promise.resolve(true);
      } };
    }, t2;
  } };
  function Rt({ data: e2 }) {
    let t2;
    t2 = he();
    const n2 = JSON.parse(JSON.stringify(e2 || {}));
    if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
      const { token: e3 } = re();
      e3 && (n2.uniIdToken = e3);
    }
    return n2;
  }
  async function Ut({ name: e2, data: t2 } = {}) {
    await this.__dev__.initLocalNetwork();
    const { localAddress: n2, localPort: s2 } = this.__dev__, r2 = { aliyun: "aliyun", tencent: "tcb", alipay: "alipay" }[this.config.provider], i2 = this.config.spaceId, o2 = `http://${n2}:${s2}/system/check-function`, a2 = `http://${n2}:${s2}/cloudfunctions/${e2}`;
    return new Promise((t3, n3) => {
      ne.request({ method: "POST", url: o2, data: { name: e2, platform: P, provider: r2, spaceId: i2 }, timeout: 3e3, success(e3) {
        t3(e3);
      }, fail() {
        t3({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });
      } });
    }).then(({ data: e3 } = {}) => {
      const { code: t3, message: n3 } = e3 || {};
      return { code: 0 === t3 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
    }).then(({ code: n3, message: s3 }) => {
      if (0 !== n3) {
        switch (n3) {
          case "MODULE_ENCRYPTED":
            console.error(`此云函数（${e2}）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "FUNCTION_ENCRYPTED":
            console.error(`此云函数（${e2}）已加密不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "ACTION_ENCRYPTED":
            console.error(s3 || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
            break;
          case "NETWORK_ERROR": {
            const e3 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";
            throw console.error(e3), new Error(e3);
          }
          case "SWITCH_TO_CLOUD":
            break;
          default: {
            const e3 = `检测本地调试服务出现错误：${s3}，请检查网络环境或重启客户端再试`;
            throw console.error(e3), new Error(e3);
          }
        }
        return this._callCloudFunction({ name: e2, data: t2 });
      }
      return new Promise((e3, n4) => {
        const s4 = Rt.call(this, { data: t2 });
        ne.request({ method: "POST", url: a2, data: { provider: r2, platform: P, param: s4 }, success: ({ statusCode: t3, data: s5 } = {}) => !t3 || t3 >= 400 ? n4(new te({ code: s5.code || "SYS_ERR", message: s5.message || "request:fail" })) : e3({ result: s5 }), fail(e4) {
          n4(new te({ code: e4.code || e4.errCode || "SYS_ERR", message: e4.message || e4.errMsg || "request:fail" }));
        } });
      });
    });
  }
  const Nt = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];
  var Dt = /[\\^$.*+?()[\]{}|]/g, Mt = RegExp(Dt.source);
  function qt(e2, t2, n2) {
    return e2.replace(new RegExp((s2 = t2) && Mt.test(s2) ? s2.replace(Dt, "\\$&") : s2, "g"), n2);
    var s2;
  }
  const Kt = "request", jt = "response", $t = "both";
  const An = { code: 2e4, message: "System error" }, Pn = { code: 20101, message: "Invalid client" };
  function xn(e2) {
    const { errSubject: t2, subject: n2, errCode: s2, errMsg: r2, code: i2, message: o2, cause: a2 } = e2 || {};
    return new te({ subject: t2 || n2 || "uni-secure-network", code: s2 || i2 || An.code, message: r2 || o2, cause: a2 });
  }
  let En;
  function Dn({ secretType: e2 } = {}) {
    return e2 === Kt || e2 === jt || e2 === $t;
  }
  function Mn({ name: e2, data: t2 = {} } = {}) {
    return "DCloud-clientDB" === e2 && "encryption" === t2.redirectTo && "getAppClientKey" === t2.action;
  }
  function qn({ provider: e2, spaceId: t2, functionName: n2 } = {}) {
    const { appId: s2, uniPlatform: r2, osName: i2 } = ce();
    let o2 = r2;
    "app" === r2 && (o2 = i2);
    const a2 = function({ provider: e3, spaceId: t3 } = {}) {
      const n3 = A;
      if (!n3)
        return {};
      e3 = /* @__PURE__ */ function(e4) {
        return "tencent" === e4 ? "tcb" : e4;
      }(e3);
      const s3 = n3.find((n4) => n4.provider === e3 && n4.spaceId === t3);
      return s3 && s3.config;
    }({ provider: e2, spaceId: t2 });
    if (!a2 || !a2.accessControl || !a2.accessControl.enable)
      return false;
    const c2 = a2.accessControl.function || {}, u2 = Object.keys(c2);
    if (0 === u2.length)
      return true;
    const h2 = function(e3, t3) {
      let n3, s3, r3;
      for (let i3 = 0; i3 < e3.length; i3++) {
        const o3 = e3[i3];
        o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e4) => e4.trim()).indexOf(t3) > -1 && (s3 = o3) : r3 = o3 : n3 = o3;
      }
      return n3 || s3 || r3;
    }(u2, n2);
    if (!h2)
      return false;
    if ((c2[h2] || []).find((e3 = {}) => e3.appId === s2 && (e3.platform || "").toLowerCase() === o2.toLowerCase()))
      return true;
    throw console.error(`此应用[appId: ${s2}, platform: ${o2}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`), xn(Pn);
  }
  function Fn({ functionName: e2, result: t2, logPvd: n2 }) {
    if (this.__dev__.debugLog && t2 && t2.requestId) {
      const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e2, requestId: t2.requestId });
      console.log(`[${n2}-request]${s2}[/${n2}-request]`);
    }
  }
  function Kn(e2) {
    const t2 = e2.callFunction, n2 = function(n3) {
      const s2 = n3.name;
      n3.data = Rt.call(e2, { data: n3.data });
      const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb", alipay: "alipay" }[this.config.provider], i2 = Dn(n3), o2 = Mn(n3), a2 = i2 || o2;
      return t2.call(this, n3).then((e3) => (e3.errCode = 0, !a2 && Fn.call(this, { functionName: s2, result: e3, logPvd: r2 }), Promise.resolve(e3)), (e3) => (!a2 && Fn.call(this, { functionName: s2, result: e3, logPvd: r2 }), e3 && e3.message && (e3.message = function({ message: e4 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
        for (let s3 = 0; s3 < n4.length; s3++) {
          const { rule: r3, content: i3, mode: o3 } = n4[s3], a3 = e4.match(r3);
          if (!a3)
            continue;
          let c2 = i3;
          for (let e5 = 1; e5 < a3.length; e5++)
            c2 = qt(c2, `{$${e5}}`, a3[e5]);
          for (const e5 in t3)
            c2 = qt(c2, `{${e5}}`, t3[e5]);
          return "replace" === o3 ? c2 : e4 + c2;
        }
        return e4;
      }({ message: `[${n3.name}]: ${e3.message}`, formatter: Nt, extraInfo: { functionName: s2 } })), Promise.reject(e3)));
    };
    e2.callFunction = function(t3) {
      const { provider: s2, spaceId: r2 } = e2.config, i2 = t3.name;
      let o2, a2;
      if (t3.data = t3.data || {}, e2.__dev__.debugInfo && !e2.__dev__.debugInfo.forceRemote && C ? (e2._callCloudFunction || (e2._callCloudFunction = n2, e2._callLocalFunction = Ut), o2 = Ut) : o2 = n2, o2 = o2.bind(e2), Mn(t3))
        a2 = n2.call(e2, t3);
      else if (Dn(t3)) {
        a2 = new En({ secretType: t3.secretType, uniCloudIns: e2 }).wrapEncryptDataCallFunction(n2.bind(e2))(t3);
      } else if (qn({ provider: s2, spaceId: r2, functionName: i2 })) {
        a2 = new En({ secretType: t3.secretType, uniCloudIns: e2 }).wrapVerifyClientCallFunction(n2.bind(e2))(t3);
      } else
        a2 = o2(t3);
      return Object.defineProperty(a2, "result", { get: () => (console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a2.then((e3) => ("undefined" != typeof UTSJSONObject && (e3.result = new UTSJSONObject(e3.result)), e3));
    };
  }
  En = class {
    constructor() {
      throw xn({ message: `Platform ${P} is not enabled, please check whether secure network module is enabled in your manifest.json` });
    }
  };
  const jn = Symbol("CLIENT_DB_INTERNAL");
  function $n(e2, t2) {
    return e2.then = "DoNotReturnProxyWithAFunctionNamedThen", e2._internalType = jn, e2.inspect = null, e2.__v_raw = void 0, new Proxy(e2, { get(e3, n2, s2) {
      if ("_uniClient" === n2)
        return null;
      if ("symbol" == typeof n2)
        return e3[n2];
      if (n2 in e3 || "string" != typeof n2) {
        const t3 = e3[n2];
        return "function" == typeof t3 ? t3.bind(e3) : t3;
      }
      return t2.get(e3, n2, s2);
    } });
  }
  function Bn(e2) {
    return { on: (t2, n2) => {
      e2[t2] = e2[t2] || [], e2[t2].indexOf(n2) > -1 || e2[t2].push(n2);
    }, off: (t2, n2) => {
      e2[t2] = e2[t2] || [];
      const s2 = e2[t2].indexOf(n2);
      -1 !== s2 && e2[t2].splice(s2, 1);
    } };
  }
  const Wn = ["db.Geo", "db.command", "command.aggregate"];
  function Hn(e2, t2) {
    return Wn.indexOf(`${e2}.${t2}`) > -1;
  }
  function zn(e2) {
    switch (f(e2 = se(e2))) {
      case "array":
        return e2.map((e3) => zn(e3));
      case "object":
        return e2._internalType === jn || Object.keys(e2).forEach((t2) => {
          e2[t2] = zn(e2[t2]);
        }), e2;
      case "regexp":
        return { $regexp: { source: e2.source, flags: e2.flags } };
      case "date":
        return { $date: e2.toISOString() };
      default:
        return e2;
    }
  }
  function Jn(e2) {
    return e2 && e2.content && e2.content.$method;
  }
  class Gn {
    constructor(e2, t2, n2) {
      this.content = e2, this.prevStage = t2 || null, this.udb = null, this._database = n2;
    }
    toJSON() {
      let e2 = this;
      const t2 = [e2.content];
      for (; e2.prevStage; )
        e2 = e2.prevStage, t2.push(e2.content);
      return { $db: t2.reverse().map((e3) => ({ $method: e3.$method, $param: zn(e3.$param) })) };
    }
    toString() {
      return JSON.stringify(this.toJSON());
    }
    getAction() {
      const e2 = this.toJSON().$db.find((e3) => "action" === e3.$method);
      return e2 && e2.$param && e2.$param[0];
    }
    getCommand() {
      return { $db: this.toJSON().$db.filter((e2) => "action" !== e2.$method) };
    }
    get isAggregate() {
      let e2 = this;
      for (; e2; ) {
        const t2 = Jn(e2), n2 = Jn(e2.prevStage);
        if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    get isCommand() {
      let e2 = this;
      for (; e2; ) {
        if ("command" === Jn(e2))
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    get isAggregateCommand() {
      let e2 = this;
      for (; e2; ) {
        const t2 = Jn(e2), n2 = Jn(e2.prevStage);
        if ("aggregate" === t2 && "command" === n2)
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    getNextStageFn(e2) {
      const t2 = this;
      return function() {
        return Vn({ $method: e2, $param: zn(Array.from(arguments)) }, t2, t2._database);
      };
    }
    get count() {
      return this.isAggregate ? this.getNextStageFn("count") : function() {
        return this._send("count", Array.from(arguments));
      };
    }
    get remove() {
      return this.isCommand ? this.getNextStageFn("remove") : function() {
        return this._send("remove", Array.from(arguments));
      };
    }
    get() {
      return this._send("get", Array.from(arguments));
    }
    get add() {
      return this.isCommand ? this.getNextStageFn("add") : function() {
        return this._send("add", Array.from(arguments));
      };
    }
    update() {
      return this._send("update", Array.from(arguments));
    }
    end() {
      return this._send("end", Array.from(arguments));
    }
    get set() {
      return this.isCommand ? this.getNextStageFn("set") : function() {
        throw new Error("JQL禁止使用set方法");
      };
    }
    _send(e2, t2) {
      const n2 = this.getAction(), s2 = this.getCommand();
      if (s2.$db.push({ $method: e2, $param: zn(t2) }), S) {
        const e3 = s2.$db.find((e4) => "collection" === e4.$method), t3 = e3 && e3.$param;
        t3 && 1 === t3.length && "string" == typeof e3.$param[0] && e3.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");
      }
      return this._database._callCloudFunction({ action: n2, command: s2 });
    }
  }
  function Vn(e2, t2, n2) {
    return $n(new Gn(e2, t2, n2), { get(e3, t3) {
      let s2 = "db";
      return e3 && e3.content && (s2 = e3.content.$method), Hn(s2, t3) ? Vn({ $method: t3 }, e3, n2) : function() {
        return Vn({ $method: t3, $param: zn(Array.from(arguments)) }, e3, n2);
      };
    } });
  }
  function Yn({ path: e2, method: t2 }) {
    return class {
      constructor() {
        this.param = Array.from(arguments);
      }
      toJSON() {
        return { $newDb: [...e2.map((e3) => ({ $method: e3 })), { $method: t2, $param: this.param }] };
      }
      toString() {
        return JSON.stringify(this.toJSON());
      }
    };
  }
  function Qn(e2, t2 = {}) {
    return $n(new e2(t2), { get: (e3, t3) => Hn("db", t3) ? Vn({ $method: t3 }, null, e3) : function() {
      return Vn({ $method: t3, $param: zn(Array.from(arguments)) }, null, e3);
    } });
  }
  class Xn extends class {
    constructor({ uniClient: e2 = {}, isJQL: t2 = false } = {}) {
      this._uniClient = e2, this._authCallBacks = {}, this._dbCallBacks = {}, e2._isDefault && (this._dbCallBacks = L("_globalUniCloudDatabaseCallback")), t2 || (this.auth = Bn(this._authCallBacks)), this._isJQL = t2, Object.assign(this, Bn(this._dbCallBacks)), this.env = $n({}, { get: (e3, t3) => ({ $env: t3 }) }), this.Geo = $n({}, { get: (e3, t3) => Yn({ path: ["Geo"], method: t3 }) }), this.serverDate = Yn({ path: [], method: "serverDate" }), this.RegExp = Yn({ path: [], method: "RegExp" });
    }
    getCloudEnv(e2) {
      if ("string" != typeof e2 || !e2.trim())
        throw new Error("getCloudEnv参数错误");
      return { $env: e2.replace("$cloudEnv_", "") };
    }
    _callback(e2, t2) {
      const n2 = this._dbCallBacks;
      n2[e2] && n2[e2].forEach((e3) => {
        e3(...t2);
      });
    }
    _callbackAuth(e2, t2) {
      const n2 = this._authCallBacks;
      n2[e2] && n2[e2].forEach((e3) => {
        e3(...t2);
      });
    }
    multiSend() {
      const e2 = Array.from(arguments), t2 = e2.map((e3) => {
        const t3 = e3.getAction(), n2 = e3.getCommand();
        if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
          throw new Error("multiSend只支持子命令内使用getTemp");
        return { action: t3, command: n2 };
      });
      return this._callCloudFunction({ multiCommand: t2, queryList: e2 });
    }
  } {
    _parseResult(e2) {
      return this._isJQL ? e2.result : e2;
    }
    _callCloudFunction({ action: e2, command: t2, multiCommand: n2, queryList: s2 }) {
      function r2(e3, t3) {
        if (n2 && s2)
          for (let n3 = 0; n3 < s2.length; n3++) {
            const r3 = s2[n3];
            r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e3.result.dataList[n3]));
          }
      }
      const i2 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
      function a2(e3) {
        return i2._callback("error", [e3]), M(q(o2, "fail"), e3).then(() => M(q(o2, "complete"), e3)).then(() => (r2(null, e3), Y(j, { type: W, content: e3 }), Promise.reject(e3)));
      }
      const c2 = M(q(o2, "invoke")), u2 = this._uniClient;
      return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: h, data: { action: e2, command: t2, multiCommand: n2 } })).then((e3) => {
        const { code: t3, message: n3, token: s3, tokenExpired: c3, systemInfo: u3 = [] } = e3.result;
        if (u3)
          for (let e4 = 0; e4 < u3.length; e4++) {
            const { level: t4, message: n4, detail: s4 } = u3[e4], r3 = console["warn" === t4 ? "error" : t4] || console.log;
            let i3 = "[System Info]" + n4;
            s4 && (i3 = `${i3}
详细信息：${s4}`), r3(i3);
          }
        if (t3) {
          return a2(new te({ code: t3, message: n3, requestId: e3.requestId }));
        }
        e3.result.errCode = e3.result.errCode || e3.result.code, e3.result.errMsg = e3.result.errMsg || e3.result.message, s3 && c3 && (ie({ token: s3, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: c3 }]), Y(B, { token: s3, tokenExpired: c3 }));
        const h2 = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];
        for (let t4 = 0; t4 < h2.length; t4++) {
          const { prop: n4, tips: s4 } = h2[t4];
          if (n4 in e3.result) {
            const t5 = e3.result[n4];
            Object.defineProperty(e3.result, n4, { get: () => (console.warn(s4), t5) });
          }
        }
        return function(e4) {
          return M(q(o2, "success"), e4).then(() => M(q(o2, "complete"), e4)).then(() => {
            r2(e4, null);
            const t4 = i2._parseResult(e4);
            return Y(j, { type: W, content: t4 }), Promise.resolve(t4);
          });
        }(e3);
      }, (e3) => {
        /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e3.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
        return a2(new te({ code: e3.code || "SYSTEM_ERROR", message: e3.message, requestId: e3.requestId }));
      });
    }
  }
  const Zn = "token无效，跳转登录页面", es = "token过期，跳转登录页面", ts = { TOKEN_INVALID_TOKEN_EXPIRED: es, TOKEN_INVALID_INVALID_CLIENTID: Zn, TOKEN_INVALID: Zn, TOKEN_INVALID_WRONG_TOKEN: Zn, TOKEN_INVALID_ANONYMOUS_USER: Zn }, ns = { "uni-id-token-expired": es, "uni-id-check-token-failed": Zn, "uni-id-token-not-exist": Zn, "uni-id-check-device-feature-failed": Zn };
  function ss(e2, t2) {
    let n2 = "";
    return n2 = e2 ? `${e2}/${t2}` : t2, n2.replace(/^\//, "");
  }
  function rs(e2 = [], t2 = "") {
    const n2 = [], s2 = [];
    return e2.forEach((e3) => {
      true === e3.needLogin ? n2.push(ss(t2, e3.path)) : false === e3.needLogin && s2.push(ss(t2, e3.path));
    }), { needLoginPage: n2, notNeedLoginPage: s2 };
  }
  function is(e2) {
    return e2.split("?")[0].replace(/^\//, "");
  }
  function os() {
    return function(e2) {
      let t2 = e2 && e2.$page && e2.$page.fullPath || "";
      return t2 ? ("/" !== t2.charAt(0) && (t2 = "/" + t2), t2) : t2;
    }(function() {
      const e2 = getCurrentPages();
      return e2[e2.length - 1];
    }());
  }
  function as() {
    return is(os());
  }
  function cs(e2 = "", t2 = {}) {
    if (!e2)
      return false;
    if (!(t2 && t2.list && t2.list.length))
      return false;
    const n2 = t2.list, s2 = is(e2);
    return n2.some((e3) => e3.pagePath === s2);
  }
  const us = !!e.uniIdRouter;
  const { loginPage: hs, routerNeedLogin: ls, resToLogin: ds, needLoginPage: ps, notNeedLoginPage: fs, loginPageInTabBar: gs } = function({ pages: t2 = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = e) {
    const { loginPage: i2, needLogin: o2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = rs(t2), { needLoginPage: h2, notNeedLoginPage: l2 } = function(e2 = []) {
      const t3 = [], n3 = [];
      return e2.forEach((e3) => {
        const { root: s3, pages: r3 = [] } = e3, { needLoginPage: i3, notNeedLoginPage: o3 } = rs(r3, s3);
        t3.push(...i3), n3.push(...o3);
      }), { needLoginPage: t3, notNeedLoginPage: n3 };
    }(n2);
    return { loginPage: i2, routerNeedLogin: o2, resToLogin: a2, needLoginPage: [...c2, ...h2], notNeedLoginPage: [...u2, ...l2], loginPageInTabBar: cs(i2, r2) };
  }();
  if (ps.indexOf(hs) > -1)
    throw new Error(`Login page [${hs}] should not be "needLogin", please check your pages.json`);
  function ms(e2) {
    const t2 = as();
    if ("/" === e2.charAt(0))
      return e2;
    const [n2, s2] = e2.split("?"), r2 = n2.replace(/^\//, "").split("/"), i2 = t2.split("/");
    i2.pop();
    for (let e3 = 0; e3 < r2.length; e3++) {
      const t3 = r2[e3];
      ".." === t3 ? i2.pop() : "." !== t3 && i2.push(t3);
    }
    return "" === i2[0] && i2.shift(), "/" + i2.join("/") + (s2 ? "?" + s2 : "");
  }
  function ys(e2) {
    const t2 = is(ms(e2));
    return !(fs.indexOf(t2) > -1) && (ps.indexOf(t2) > -1 || ls.some((t3) => function(e3, t4) {
      return new RegExp(t4).test(e3);
    }(e2, t3)));
  }
  function _s({ redirect: e2 }) {
    const t2 = is(e2), n2 = is(hs);
    return as() !== n2 && t2 !== n2;
  }
  function ws({ api: e2, redirect: t2 } = {}) {
    if (!t2 || !_s({ redirect: t2 }))
      return;
    const n2 = function(e3, t3) {
      return "/" !== e3.charAt(0) && (e3 = "/" + e3), t3 ? e3.indexOf("?") > -1 ? e3 + `&uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3 + `?uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3;
    }(hs, t2);
    gs ? "navigateTo" !== e2 && "redirectTo" !== e2 || (e2 = "switchTab") : "switchTab" === e2 && (e2 = "navigateTo");
    const s2 = { navigateTo: uni.navigateTo, redirectTo: uni.redirectTo, switchTab: uni.switchTab, reLaunch: uni.reLaunch };
    setTimeout(() => {
      s2[e2]({ url: n2 });
    }, 0);
  }
  function vs({ url: e2 } = {}) {
    const t2 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
      const { token: e3, tokenExpired: t3 } = re();
      let n3;
      if (e3) {
        if (t3 < Date.now()) {
          const e4 = "uni-id-token-expired";
          n3 = { errCode: e4, errMsg: ns[e4] };
        }
      } else {
        const e4 = "uni-id-check-token-failed";
        n3 = { errCode: e4, errMsg: ns[e4] };
      }
      return n3;
    }();
    if (ys(e2) && n2) {
      n2.uniIdRedirectUrl = e2;
      if (J($).length > 0)
        return setTimeout(() => {
          Y($, n2);
        }, 0), t2.abortLoginPageJump = true, t2;
      t2.autoToLoginPage = true;
    }
    return t2;
  }
  function Is() {
    !function() {
      const e3 = os(), { abortLoginPageJump: t2, autoToLoginPage: n2 } = vs({ url: e3 });
      t2 || n2 && ws({ api: "redirectTo", redirect: e3 });
    }();
    const e2 = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
    for (let t2 = 0; t2 < e2.length; t2++) {
      const n2 = e2[t2];
      uni.addInterceptor(n2, { invoke(e3) {
        const { abortLoginPageJump: t3, autoToLoginPage: s2 } = vs({ url: e3.url });
        return t3 ? e3 : s2 ? (ws({ api: n2, redirect: ms(e3.url) }), false) : e3;
      } });
    }
  }
  function Ss() {
    this.onResponse((e2) => {
      const { type: t2, content: n2 } = e2;
      let s2 = false;
      switch (t2) {
        case "cloudobject":
          s2 = function(e3) {
            if ("object" != typeof e3)
              return false;
            const { errCode: t3 } = e3 || {};
            return t3 in ns;
          }(n2);
          break;
        case "clientdb":
          s2 = function(e3) {
            if ("object" != typeof e3)
              return false;
            const { errCode: t3 } = e3 || {};
            return t3 in ts;
          }(n2);
      }
      s2 && function(e3 = {}) {
        const t3 = J($);
        Z().then(() => {
          const n3 = os();
          if (n3 && _s({ redirect: n3 }))
            return t3.length > 0 ? Y($, Object.assign({ uniIdRedirectUrl: n3 }, e3)) : void (hs && ws({ api: "navigateTo", redirect: n3 }));
        });
      }(n2);
    });
  }
  function bs(e2) {
    !function(e3) {
      e3.onResponse = function(e4) {
        G(j, e4);
      }, e3.offResponse = function(e4) {
        V(j, e4);
      };
    }(e2), function(e3) {
      e3.onNeedLogin = function(e4) {
        G($, e4);
      }, e3.offNeedLogin = function(e4) {
        V($, e4);
      }, us && (L("_globalUniCloudStatus").needLoginInit || (L("_globalUniCloudStatus").needLoginInit = true, Z().then(() => {
        Is.call(e3);
      }), ds && Ss.call(e3)));
    }(e2), function(e3) {
      e3.onRefreshToken = function(e4) {
        G(B, e4);
      }, e3.offRefreshToken = function(e4) {
        V(B, e4);
      };
    }(e2);
  }
  let ks;
  const As = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", Ps = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
  function Ts() {
    const e2 = re().token || "", t2 = e2.split(".");
    if (!e2 || 3 !== t2.length)
      return { uid: null, role: [], permission: [], tokenExpired: 0 };
    let n2;
    try {
      n2 = JSON.parse((s2 = t2[1], decodeURIComponent(ks(s2).split("").map(function(e3) {
        return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
      }).join(""))));
    } catch (e3) {
      throw new Error("获取当前用户信息出错，详细错误信息为：" + e3.message);
    }
    var s2;
    return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
  }
  ks = "function" != typeof atob ? function(e2) {
    if (e2 = String(e2).replace(/[\t\n\f\r ]+/g, ""), !Ps.test(e2))
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    var t2;
    e2 += "==".slice(2 - (3 & e2.length));
    for (var n2, s2, r2 = "", i2 = 0; i2 < e2.length; )
      t2 = As.indexOf(e2.charAt(i2++)) << 18 | As.indexOf(e2.charAt(i2++)) << 12 | (n2 = As.indexOf(e2.charAt(i2++))) << 6 | (s2 = As.indexOf(e2.charAt(i2++))), r2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
    return r2;
  } : atob;
  var Cs = n(function(e2, t2) {
    Object.defineProperty(t2, "__esModule", { value: true });
    const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
    function r2(e3, t3) {
      return e3.tempFiles.forEach((e4, n3) => {
        e4.name || (e4.name = e4.path.substring(e4.path.lastIndexOf("/") + 1)), t3 && (e4.fileType = t3), e4.cloudPath = Date.now() + "_" + n3 + e4.name.substring(e4.name.lastIndexOf("."));
      }), e3.tempFilePaths || (e3.tempFilePaths = e3.tempFiles.map((e4) => e4.path)), e3;
    }
    function i2(e3, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
      return t3.then((e4) => {
        if (s3) {
          const t4 = s3(e4);
          if (void 0 !== t4)
            return Promise.resolve(t4).then((t5) => void 0 === t5 ? e4 : t5);
        }
        return e4;
      }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e4, t5, s4 = 5, r4) {
        (t5 = Object.assign({}, t5)).errMsg = n2;
        const i3 = t5.tempFiles, o2 = i3.length;
        let a2 = 0;
        return new Promise((n3) => {
          for (; a2 < s4; )
            c2();
          function c2() {
            const s5 = a2++;
            if (s5 >= o2)
              return void (!i3.find((e5) => !e5.url && !e5.errMsg) && n3(t5));
            const u2 = i3[s5];
            e4.uploadFile({ provider: u2.provider, filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, cloudPathAsRealPath: u2.cloudPathAsRealPath, onUploadProgress(e5) {
              e5.index = s5, e5.tempFile = u2, e5.tempFilePath = u2.path, r4 && r4(e5);
            } }).then((e5) => {
              u2.url = e5.fileID, s5 < o2 && c2();
            }).catch((e5) => {
              u2.errMsg = e5.errMsg || e5.message, s5 < o2 && c2();
            });
          }
        });
      }(e3, t4, 5, r3));
    }
    t2.initChooseAndUploadFile = function(e3) {
      return function(t3 = { type: "all" }) {
        return "image" === t3.type ? i2(e3, function(e4) {
          const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e4;
          return new Promise((e5, a2) => {
            uni.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
              e5(r2(t5, "image"));
            }, fail(e6) {
              a2({ errMsg: e6.errMsg.replace("chooseImage:fail", s2) });
            } });
          });
        }(t3), t3) : "video" === t3.type ? i2(e3, function(e4) {
          const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a2 } = e4;
          return new Promise((e5, c2) => {
            uni.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a2, success(t5) {
              const { tempFilePath: n4, duration: s3, size: i4, height: o3, width: a3 } = t5;
              e5(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: o3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
            }, fail(e6) {
              c2({ errMsg: e6.errMsg.replace("chooseVideo:fail", s2) });
            } });
          });
        }(t3), t3) : i2(e3, function(e4) {
          const { count: t4, extension: n3 } = e4;
          return new Promise((e5, i3) => {
            let o2 = uni.chooseFile;
            if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (o2 = wx.chooseMessageFile), "function" != typeof o2)
              return i3({ errMsg: s2 + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });
            o2({ type: "all", count: t4, extension: n3, success(t5) {
              e5(r2(t5));
            }, fail(e6) {
              i3({ errMsg: e6.errMsg.replace("chooseFile:fail", s2) });
            } });
          });
        }(t3), t3);
      };
    };
  }), xs = t(Cs);
  const Os = "manual";
  function Es(e2) {
    return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {}, mixinDatacomError: null }), created() {
      this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
        var e3 = [];
        return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
          e3.push(this[t2]);
        }), e3;
      }, (e3, t2) => {
        if (this.loadtime === Os)
          return;
        let n2 = false;
        const s2 = [];
        for (let r2 = 2; r2 < e3.length; r2++)
          e3[r2] !== t2[r2] && (s2.push(e3[r2]), n2 = true);
        e3[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
      });
    }, methods: { onMixinDatacomPropsChange(e3, t2) {
    }, mixinDatacomEasyGet({ getone: e3 = false, success: t2, fail: n2 } = {}) {
      this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomError = null, this.mixinDatacomGet().then((n3) => {
        this.mixinDatacomLoading = false;
        const { data: s2, count: r2 } = n3.result;
        this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
        const i2 = e3 ? s2.length ? s2[0] : void 0 : s2;
        this.mixinDatacomResData = i2, t2 && t2(i2);
      }).catch((e4) => {
        this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e4, this.mixinDatacomError = e4, n2 && n2(e4);
      }));
    }, mixinDatacomGet(t2 = {}) {
      let n2;
      t2 = t2 || {}, n2 = "undefined" != typeof __uniX && __uniX ? e2.databaseForJQL(this.spaceInfo) : e2.database(this.spaceInfo);
      const s2 = t2.action || this.action;
      s2 && (n2 = n2.action(s2));
      const r2 = t2.collection || this.collection;
      n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
      const i2 = t2.where || this.where;
      i2 && Object.keys(i2).length && (n2 = n2.where(i2));
      const o2 = t2.field || this.field;
      o2 && (n2 = n2.field(o2));
      const a2 = t2.foreignKey || this.foreignKey;
      a2 && (n2 = n2.foreignKey(a2));
      const c2 = t2.groupby || this.groupby;
      c2 && (n2 = n2.groupBy(c2));
      const u2 = t2.groupField || this.groupField;
      u2 && (n2 = n2.groupField(u2));
      true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
      const h2 = t2.orderby || this.orderby;
      h2 && (n2 = n2.orderBy(h2));
      const l2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, p2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, f2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, g2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: p2 }, y2 = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
      return f2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d2 * (l2 - 1)).limit(d2).get(m2), n2;
    } } };
  }
  function Ls(e2) {
    return function(t2, n2 = {}) {
      n2 = function(e3, t3 = {}) {
        return e3.customUI = t3.customUI || e3.customUI, e3.parseSystemError = t3.parseSystemError || e3.parseSystemError, Object.assign(e3.loadingOptions, t3.loadingOptions), Object.assign(e3.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e3.secretMethods = t3.secretMethods), e3;
      }({ customUI: false, loadingOptions: { title: "加载中...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
      const { customUI: s2, loadingOptions: r2, errorOptions: i2, parseSystemError: o2 } = n2, a2 = !s2;
      return new Proxy({}, { get(s3, c2) {
        switch (c2) {
          case "toString":
            return "[object UniCloudObject]";
          case "toJSON":
            return {};
        }
        return function({ fn: e3, interceptorName: t3, getCallbackArgs: n3 } = {}) {
          return async function(...s4) {
            const r3 = n3 ? n3({ params: s4 }) : {};
            let i3, o3;
            try {
              return await M(q(t3, "invoke"), { ...r3 }), i3 = await e3(...s4), await M(q(t3, "success"), { ...r3, result: i3 }), i3;
            } catch (e4) {
              throw o3 = e4, await M(q(t3, "fail"), { ...r3, error: o3 }), o3;
            } finally {
              await M(q(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
            }
          };
        }({ fn: async function s4(...h2) {
          let l2;
          a2 && uni.showLoading({ title: r2.title, mask: r2.mask });
          const d2 = { name: t2, type: u, data: { method: c2, params: h2 } };
          "object" == typeof n2.secretMethods && function(e3, t3) {
            const n3 = t3.data.method, s5 = e3.secretMethods || {}, r3 = s5[n3] || s5["*"];
            r3 && (t3.secretType = r3);
          }(n2, d2);
          let p2 = false;
          try {
            l2 = await e2.callFunction(d2);
          } catch (e3) {
            p2 = true, l2 = { result: new te(e3) };
          }
          const { errSubject: f2, errCode: g2, errMsg: m2, newToken: y2 } = l2.result || {};
          if (a2 && uni.hideLoading(), y2 && y2.token && y2.tokenExpired && (ie(y2), Y(B, { ...y2 })), g2) {
            let e3 = m2;
            if (p2 && o2) {
              e3 = (await o2({ objectName: t2, methodName: c2, params: h2, errSubject: f2, errCode: g2, errMsg: m2 })).errMsg || m2;
            }
            if (a2)
              if ("toast" === i2.type)
                uni.showToast({ title: e3, icon: "none" });
              else {
                if ("modal" !== i2.type)
                  throw new Error(`Invalid errorOptions.type: ${i2.type}`);
                {
                  const { confirm: t3 } = await async function({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                    return new Promise((i3, o3) => {
                      uni.showModal({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e5) {
                        i3(e5);
                      }, fail() {
                        i3({ confirm: false, cancel: true });
                      } });
                    });
                  }({ title: "提示", content: e3, showCancel: i2.retry, cancelText: "取消", confirmText: i2.retry ? "重试" : "确定" });
                  if (i2.retry && t3)
                    return s4(...h2);
                }
              }
            const n3 = new te({ subject: f2, code: g2, message: m2, requestId: l2.requestId });
            throw n3.detail = l2.result, Y(j, { type: z, content: n3 }), n3;
          }
          return Y(j, { type: z, content: l2.result }), l2.result;
        }, interceptorName: "callObject", getCallbackArgs: function({ params: e3 } = {}) {
          return { objectName: t2, methodName: c2, params: e3 };
        } });
      } });
    };
  }
  function Rs(e2) {
    return L("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e2.config.spaceId));
  }
  async function Us({ openid: e2, callLoginByWeixin: t2 = false } = {}) {
    Rs(this);
    throw new Error(`[SecureNetwork] API \`initSecureNetworkByWeixin\` is not supported on platform \`${P}\``);
  }
  async function Ns(e2) {
    const t2 = Rs(this);
    return t2.initPromise || (t2.initPromise = Us.call(this, e2).then((e3) => e3).catch((e3) => {
      throw delete t2.initPromise, e3;
    })), t2.initPromise;
  }
  function Ds(e2) {
    return function({ openid: t2, callLoginByWeixin: n2 = false } = {}) {
      return Ns.call(e2, { openid: t2, callLoginByWeixin: n2 });
    };
  }
  function Ms(e2) {
    const t2 = { getSystemInfo: uni.getSystemInfo, getPushClientId: uni.getPushClientId };
    return function(n2) {
      return new Promise((s2, r2) => {
        t2[e2]({ ...n2, success(e3) {
          s2(e3);
        }, fail(e3) {
          r2(e3);
        } });
      });
    };
  }
  class qs extends class {
    constructor() {
      this._callback = {};
    }
    addListener(e2, t2) {
      this._callback[e2] || (this._callback[e2] = []), this._callback[e2].push(t2);
    }
    on(e2, t2) {
      return this.addListener(e2, t2);
    }
    removeListener(e2, t2) {
      if (!t2)
        throw new Error('The "listener" argument must be of type function. Received undefined');
      const n2 = this._callback[e2];
      if (!n2)
        return;
      const s2 = function(e3, t3) {
        for (let n3 = e3.length - 1; n3 >= 0; n3--)
          if (e3[n3] === t3)
            return n3;
        return -1;
      }(n2, t2);
      n2.splice(s2, 1);
    }
    off(e2, t2) {
      return this.removeListener(e2, t2);
    }
    removeAllListener(e2) {
      delete this._callback[e2];
    }
    emit(e2, ...t2) {
      const n2 = this._callback[e2];
      if (n2)
        for (let e3 = 0; e3 < n2.length; e3++)
          n2[e3](...t2);
    }
  } {
    constructor() {
      super(), this._uniPushMessageCallback = this._receivePushMessage.bind(this), this._currentMessageId = -1, this._payloadQueue = [];
    }
    init() {
      return Promise.all([Ms("getSystemInfo")(), Ms("getPushClientId")()]).then(([{ appId: e2 } = {}, { cid: t2 } = {}] = []) => {
        if (!e2)
          throw new Error("Invalid appId, please check the manifest.json file");
        if (!t2)
          throw new Error("Invalid push client id");
        this._appId = e2, this._pushClientId = t2, this._seqId = Date.now() + "-" + Math.floor(9e5 * Math.random() + 1e5), this.emit("open"), this._initMessageListener();
      }, (e2) => {
        throw this.emit("error", e2), this.close(), e2;
      });
    }
    async open() {
      return this.init();
    }
    _isUniCloudSSE(e2) {
      if ("receive" !== e2.type)
        return false;
      const t2 = e2 && e2.data && e2.data.payload;
      return !(!t2 || "UNI_CLOUD_SSE" !== t2.channel || t2.seqId !== this._seqId);
    }
    _receivePushMessage(e2) {
      if (!this._isUniCloudSSE(e2))
        return;
      const t2 = e2 && e2.data && e2.data.payload, { action: n2, messageId: s2, message: r2 } = t2;
      this._payloadQueue.push({ action: n2, messageId: s2, message: r2 }), this._consumMessage();
    }
    _consumMessage() {
      for (; ; ) {
        const e2 = this._payloadQueue.find((e3) => e3.messageId === this._currentMessageId + 1);
        if (!e2)
          break;
        this._currentMessageId++, this._parseMessagePayload(e2);
      }
    }
    _parseMessagePayload(e2) {
      const { action: t2, messageId: n2, message: s2 } = e2;
      "end" === t2 ? this._end({ messageId: n2, message: s2 }) : "message" === t2 && this._appendMessage({ messageId: n2, message: s2 });
    }
    _appendMessage({ messageId: e2, message: t2 } = {}) {
      this.emit("message", t2);
    }
    _end({ messageId: e2, message: t2 } = {}) {
      this.emit("end", t2), this.close();
    }
    _initMessageListener() {
      uni.onPushMessage(this._uniPushMessageCallback);
    }
    _destroy() {
      uni.offPushMessage(this._uniPushMessageCallback);
    }
    toJSON() {
      return { appId: this._appId, pushClientId: this._pushClientId, seqId: this._seqId };
    }
    close() {
      this._destroy(), this.emit("close");
    }
  }
  async function Fs(e2, t2) {
    const n2 = `http://${e2}:${t2}/system/ping`;
    try {
      const e3 = await (s2 = { url: n2, timeout: 500 }, new Promise((e4, t3) => {
        ne.request({ ...s2, success(t4) {
          e4(t4);
        }, fail(e5) {
          t3(e5);
        } });
      }));
      return !(!e3.data || 0 !== e3.data.code);
    } catch (e3) {
      return false;
    }
    var s2;
  }
  async function Ks(e2) {
    {
      const { osName: e3, osVersion: t3 } = ce();
      "ios" === e3 && function(e4) {
        if (!e4 || "string" != typeof e4)
          return 0;
        const t4 = e4.match(/^(\d+)./);
        return t4 && t4[1] ? parseInt(t4[1]) : 0;
      }(t3) >= 14 && console.warn("iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发期间需要，发行后不需要）");
    }
    const t2 = e2.__dev__;
    if (!t2.debugInfo)
      return;
    const { address: n2, servePort: s2 } = t2.debugInfo, { address: r2 } = await async function(e3, t3) {
      let n3;
      for (let s3 = 0; s3 < e3.length; s3++) {
        const r3 = e3[s3];
        if (await Fs(r3, t3)) {
          n3 = r3;
          break;
        }
      }
      return { address: n3, port: t3 };
    }(n2, s2);
    if (r2)
      return t2.localAddress = r2, void (t2.localPort = s2);
    const i2 = console["error"];
    let o2 = "";
    if ("remote" === t2.debugInfo.initialLaunchType ? (t2.debugInfo.forceRemote = true, o2 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : o2 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", o2 += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", 0 === P.indexOf("mp-") && (o2 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), !t2.debugInfo.forceRemote)
      throw new Error(o2);
    i2(o2);
  }
  function js(e2) {
    e2._initPromiseHub || (e2._initPromiseHub = new v({ createPromise: function() {
      let t2 = Promise.resolve();
      var n2;
      n2 = 1, t2 = new Promise((e3) => {
        setTimeout(() => {
          e3();
        }, n2);
      });
      const s2 = e2.auth();
      return t2.then(() => s2.getLoginState()).then((e3) => e3 ? Promise.resolve() : s2.signInAnonymously());
    } }));
  }
  const $s = { tcb: St, tencent: St, aliyun: pe, private: kt, alipay: Lt };
  let Bs = new class {
    init(e2) {
      let t2 = {};
      const n2 = $s[e2.provider];
      if (!n2)
        throw new Error("未提供正确的provider参数");
      t2 = n2.init(e2), function(e3) {
        const t3 = {};
        e3.__dev__ = t3, t3.debugLog = "app" === P;
        const n3 = T;
        n3 && !n3.code && (t3.debugInfo = n3);
        const s2 = new v({ createPromise: function() {
          return Ks(e3);
        } });
        t3.initLocalNetwork = function() {
          return s2.exec();
        };
      }(t2), js(t2), Kn(t2), function(e3) {
        const t3 = e3.uploadFile;
        e3.uploadFile = function(e4) {
          return t3.call(this, e4);
        };
      }(t2), function(e3) {
        e3.database = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e3.init(t3).database();
          if (this._database)
            return this._database;
          const n3 = Qn(Xn, { uniClient: e3 });
          return this._database = n3, n3;
        }, e3.databaseForJQL = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e3.init(t3).databaseForJQL();
          if (this._databaseForJQL)
            return this._databaseForJQL;
          const n3 = Qn(Xn, { uniClient: e3, isJQL: true });
          return this._databaseForJQL = n3, n3;
        };
      }(t2), function(e3) {
        e3.getCurrentUserInfo = Ts, e3.chooseAndUploadFile = xs.initChooseAndUploadFile(e3), Object.assign(e3, { get mixinDatacom() {
          return Es(e3);
        } }), e3.SSEChannel = qs, e3.initSecureNetworkByWeixin = Ds(e3), e3.importObject = Ls(e3);
      }(t2);
      return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e3) => {
        if (!t2[e3])
          return;
        const n3 = t2[e3];
        t2[e3] = function() {
          return n3.apply(t2, Array.from(arguments));
        }, t2[e3] = (/* @__PURE__ */ function(e4, t3) {
          return function(n4) {
            let s2 = false;
            if ("callFunction" === t3) {
              const e5 = n4 && n4.type || c;
              s2 = e5 !== c;
            }
            const r2 = "callFunction" === t3 && !s2, i2 = this._initPromiseHub.exec();
            n4 = n4 || {};
            const { success: o2, fail: a2, complete: u2 } = ee(n4), h2 = i2.then(() => s2 ? Promise.resolve() : M(q(t3, "invoke"), n4)).then(() => e4.call(this, n4)).then((e5) => s2 ? Promise.resolve(e5) : M(q(t3, "success"), e5).then(() => M(q(t3, "complete"), e5)).then(() => (r2 && Y(j, { type: H, content: e5 }), Promise.resolve(e5))), (e5) => s2 ? Promise.reject(e5) : M(q(t3, "fail"), e5).then(() => M(q(t3, "complete"), e5)).then(() => (Y(j, { type: H, content: e5 }), Promise.reject(e5))));
            if (!(o2 || a2 || u2))
              return h2;
            h2.then((e5) => {
              o2 && o2(e5), u2 && u2(e5), r2 && Y(j, { type: H, content: e5 });
            }, (e5) => {
              a2 && a2(e5), u2 && u2(e5), r2 && Y(j, { type: H, content: e5 });
            });
          };
        }(t2[e3], e3)).bind(t2);
      }), t2.init = this.init, t2;
    }
  }();
  (() => {
    const e2 = C;
    let t2 = {};
    if (e2 && 1 === e2.length)
      t2 = e2[0], Bs = Bs.init(t2), Bs._isDefault = true;
    else {
      const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
      let n2;
      n2 = e2 && e2.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", t3.forEach((e3) => {
        Bs[e3] = function() {
          return console.error(n2), Promise.reject(new te({ code: "SYS_ERR", message: n2 }));
        };
      });
    }
    Object.assign(Bs, { get mixinDatacom() {
      return Es(Bs);
    } }), bs(Bs), Bs.addInterceptor = N, Bs.removeInterceptor = D, Bs.interceptObject = F;
  })();
  var Ws = Bs;
  const IapTransactionState = {
    purchasing: "0",
    // A transaction that is being processed by the App Store.
    purchased: "1",
    // A successfully processed transaction.
    failed: "2",
    // A failed transaction.
    restored: "3",
    // A transaction that restores content previously purchased by the user.
    deferred: "4"
    // A transaction that is in the queue, but its final status is pending external action such as Ask to Buy.
  };
  class Iap {
    constructor(data = {}) {
      this._productIds = data.products || [];
      this._channel = null;
      this._channelError = null;
      this.ready = false;
    }
    init() {
      return new Promise((resolve, reject) => {
        this.getChannels((channel) => {
          this.ready = true;
          resolve(channel);
        }, (err) => {
          reject(err);
        });
      });
    }
    getProduct(productIds) {
      return new Promise((resolve, reject) => {
        this._channel.requestProduct(productIds || this._productIds, (res) => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    }
    requestPayment(orderInfo) {
      return new Promise((resolve, reject) => {
        uni.requestPayment({
          provider: "appleiap",
          orderInfo: {
            quantity: 1,
            manualFinishTransaction: true,
            ...orderInfo
          },
          success: (res) => {
            resolve(res);
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    }
    restoreCompletedTransactions(username) {
      return new Promise((resolve, reject) => {
        this._channel.restoreCompletedTransactions({
          manualFinishTransaction: true,
          username
        }, (res) => {
          resolve(res);
        }, (err) => {
          formatAppLog("log", "at uni_modules/uni-pay/js_sdk/appleiap.js:69", "restoreCompletedTransactions-err: ", err);
          reject(err);
        });
      });
    }
    finishTransaction(transaction) {
      return new Promise((resolve, reject) => {
        this._channel.finishTransaction(transaction, (res) => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    }
    getChannels(success, fail) {
      if (this._channel !== null) {
        success(this._channel);
        return;
      }
      if (this._channelError !== null) {
        fail(this._channelError);
        return;
      }
      uni.getProvider({
        service: "payment",
        success: (res) => {
          this._channel = res.providers.find((channel) => {
            return channel.id === "appleiap";
          });
          if (this._channel) {
            success(this._channel);
          } else {
            this._channelError = {
              errMsg: "paymentContext:fail iap service not found"
            };
            fail(this._channelError);
          }
        }
      });
    }
    get channel() {
      return this._channel;
    }
  }
  const appleiapSdk = {
    Iap,
    IapTransactionState
  };
  const uniPayCo = Ws.importObject("uni-pay-co");
  var myOpenid;
  const _sfc_main$3 = {
    name: "uni-pay",
    emits: ["success", "cancel", "fail", "create", "mounted", "qrcode"],
    props: {
      /**
       * Banner广告位id
       */
      adpid: {
        Type: String,
        default: ""
      },
      /**
       * 是否自动跳转到插件内置的支付成功页面（具有看广告功能，可以增加开发者收益）默认true
       */
      toSuccessPage: {
        Type: Boolean,
        default: true
      },
      /**
       * 支付成功后，点击查看订单按钮时跳转的页面地址
       */
      returnUrl: {
        Type: String,
        default: ""
      },
      /**
       * 支付结果页主色调，默认支付宝小程序为#108ee9，其他端均为#01be6e
       * 建议：绿色系 #01be6e 蓝色系 #108ee9 咖啡色 #816a4e 粉红 #fe4070 橙黄 #ffac0c 橘黄 #ff7100
       */
      mainColor: {
        Type: String,
        default: ""
      },
      /**
       * 收银台模式
       * mobile 手机版
       * pc 电脑版
       */
      mode: {
        Type: String,
        default: ""
      },
      /**
       * PC收银台模式时，展示的logo
       */
      logo: {
        Type: String,
        default: "/static/logo.png"
      },
      /**
       * 收银台高度（默认70vh）
       */
      height: {
        Type: [String],
        default: "70vh"
      },
      /**
       * 是否打印运行过程日志
       */
      debug: {
        Type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // 支付参数
        options: {},
        // 支付云对象返回结果
        res: {},
        images: {
          wxpay: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABC9JREFUeF7tWk1a20AMlUzv0bDr13AAYAOcpLCBcoqQU1DYEE6C2QAHIP26q3sPPOqniU2cZMYj+SeGxN5kEXlm9ObpjaQxwpY/uOX+Qw9Az4AtR6APgS0nQC+CfQi0FQLfrvcHXwAGPP4bQMK/fy5f7O9HehphwPfb/dOIogEhHQHBcamDCDESPoIxMQPTNSi1ABj+OrwDpNMaO5og4P2bMZOugFADwNTewWhU0/FVzAgnKZnxuoFQAbB3vX9MET7U2PHgq4R09vv8ZRI0bMhADMDw9uAhGN8NLQrWyAYRAGt1PgcRIU5TOms7JIIAdOL8nElJauikTRBKAdi7ObwioFFTzHaMw3mBzRV8DwKOXy+ertpagxcAq/YR/g2d6TlNrUDu4EiiE0Why4T1rgyINoXRC4DgjE+mF8+7RYAkp4RrRyVztRUKTgCkuz89fz4pAiB5z7WbklBrKxScAEgWxI6joZPXy5c4B0H0nkPdhzcHFIxxhHgZ8OA7AgMnAMObA479UnF6H5twQpF5RBMdibPDvB4AAAL6IZ0rNbTb9IngAyC8IwJ0K5okQBgzqFEKSV4wcXg17bxl8fIiJXFc0bHAgYLjYlHEFaZlVUQDoAIbcVZaN1VRrgAgUfImASiKW6Yh4pAohmHVQqpLABI0dMYiKhJPCeoV0ueuQsDmEJrkSeJ/bqNJnOqfApqVzWznzrdYWkvzhnUDYGnPKLTdV5gpfLiOqJUIaTefF8RKH6wxtAOX2IdA8NcCmmRItmBLfVF5jRBnR58kGQtWlGUJlBeAxpQ5A4eFKTu/ufLzPQv1f2mRRDiZ/nyyYwYrypI0OlQOc/9PsgshDsh2v+BUwTFnD3K5DglVlD4WlDZEsqywNgiK2F9gQBkLi7EtyV59WhBsiTURCjy5QZMgYRn9cxbZWgCQ+IKlnH2sFQYTURHmCYMgAJaKs9aYPkXNXGK6QhQdt9xeC4UhTC+eV/wVASASmrKj6IMA4NIBMQDsX1VN4IlbuU0K7vmiQS0G5EOpmiW6I1Dpjtp8pYc5yxYVj0RtXcMJcwDFSiqYLh2x+QgqAJwnAuEEydxbkZtdj+fKPVfwbPIq7KngqvMVX4WoAmDBAcH9HTMmXw23s0LJSlPOOsZx0l8VAu/0Fzjuc2Td3aY5zf1VoZgBvPgmvuhoIrFSMSXQThcDoJo0YLxGLfBSv5IINgVC1XxCOb/oZrkTBtRJqkQgKG6ROgPgPbGq/6HVIiYK51WngAj5ikbBhoZi3FALbHmozhlQXFChTc75g6wRM2ufzb9N/IwMcG0wg8HZJf9HBF/tFZnBBBH+cW/BpBDnd4XLDNJcon4oBiiY7jS194mEI0IaSz+12ygAclSYEcXvFsqA3UgANEzqAdCgtYm2PQM2cVc1PvUM0KC1ibY9AzZxVzU+bT0D/gPs/oxfcUEcJAAAAABJRU5ErkJggg==",
          alipay: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA2FJREFUeF7tmU122jAQx2cMB2hp9yULeK+naHISwhJyiIRDBJaQkwRO0fdgEWff0h4ANH0yFc+m+hhbckKNvJUsaX76z4ckhAv/8MLthwggKuDCCUQXuHABxCAYXSC6wIUTiC7wFgL4MPveTaj9optrO+696ya8yeQRQFRAdIEYAxoVBD/PNtdCwHWpDIJwr+1PMCk1DgAkCSx/jHrLsv/p+lfKAp3HzQOYDAqxKtcYBJPtXe/B1Y3TXgmATGst0WIrgAC7JmBINOQsNN8HE0zfVQFlFxzrgFgHNLQOkNJuQ7vrcgkS1CXEua5fgnDj+l+172CX/h59Tbn9Of0qBUE1cGe2ngPhLWeiEH0krFDBT63HC8Cnx/VtFuFDfgl90UOldDvuX4WcSo7lBSD0YuR4H6ebZwRNkRUw9xdSah1G+IzZmW5IW7ERDX/e9Rc+YwerBEMvQo1nrhfqkf/ZuYCxxK5J/t4AjkFQBi71CXxFoFSWq2XTlkn+AndXodNf5SwgT4J7gnttoNL6BqUEmCZET/tkvzQZYj5g1Sf/0goIkfcJYIkEK5HsFnkYnen6BXQptUb5lwJgMz4zCihXD/BqAwVDuoy+Uqx399kACrkZaYECVjY5qxJZXpoQwrcDHB6UghfVvPssAMo35W4R7oZVg5EMmAJxUCZ2CNzfVJ2Pm6qdleDBNwFClaHZdRrQAEhWe25VSPCuAMo1tnQhdIzMNUixfDYBqAOGVQEKQB15OFMCwXPV3QsFww7g73E39Pudr/Gn0EyplQPXCkBF/5AKsBtPKRA+AdKAEx/0BhYLL9nHFkhZLiBvbkOcxFzG5wPtoe7gBUrrTiMttqO+8ebZCkAtWErs17jHvrrSLcj+lkCpKeV5g/ABIA05lqgVM4Er2nPhZgev7DHGnToLG+ALIC9budgWwoRzyuMUPlzj8waVBuELIFOB5iksi7xIKQh8PS4wu8/j+a3vBScbRAgABVfg5BZbH6SFgP0kVIl7UCjNja4RCkAGwecaPLDhp4yNsSYkADlp/mncdNLLu8fpud9XQK7//wERGoBrAefSfgRBsLI9pTtPg+diUNV1yLuJypVg1Un/p/8arwDXZkQALkJNb48KaPoOu+yLCnARanp7VEDTd9hlX1SAi1DT2/8AaakVXysj5qkAAAAASUVORK5CYII="
        },
        originalRroviders: ["wxpay", "alipay"],
        currentProviders: ["wxpay", "alipay"],
        openid: ""
      };
    },
    async mounted() {
      let getPayProviderFromCloudRes = await this.getPayProviderFromCloud();
      if (getPayProviderFromCloudRes.errCode === 0) {
        this.originalRroviders = getPayProviderFromCloudRes.provider;
        this.currentProviders = JSON.parse(JSON.stringify(this.originalRroviders));
      }
      this.$emit("mounted", {
        images: this.images,
        originalRroviders: this.originalRroviders,
        currentProviders: this.currentProviders,
        appleiapSdk
      });
    },
    methods: {
      // 发起支付 - 打开支付选项弹窗
      async open(options = {}) {
        if (options.provider) {
          let providers = [];
          this.originalRroviders.map((item, index) => {
            if (options.provider.indexOf(item) > -1) {
              providers.push(item);
            }
          });
          this.currentProviders = providers;
          delete options.provider;
        } else {
          this.currentProviders = JSON.parse(JSON.stringify(this.originalRroviders));
        }
        this.options = options;
        if (this.currentProviders.length === 1) {
          this.createOrder({ provider: this.currentProviders[0] });
        } else {
          if (this.modeCom === "pc") {
            this._pcChooseProvider(this.currentProviders[0]);
          }
          this.openPopup("payPopup");
        }
      },
      // 创建支付
      async createOrder(data = {}) {
        let { options } = this;
        Object.assign(options, data);
        if (options.provider === "appleiap") {
          return this._appleiapCreateOrder(options);
        }
        let createOrderData = {
          provider: options.provider,
          total_fee: options.total_fee,
          openid: myOpenid,
          order_no: options.order_no,
          out_trade_no: options.out_trade_no,
          description: options.description,
          type: options.type,
          qr_code: options.qr_code,
          custom: options.custom,
          other: options.other,
          wxpay_virtual: options.wxpay_virtual
          // 微信小程序虚拟支付需要
        };
        try {
          let res = await uniPayCo.createOrder(createOrderData);
          if (!res.errCode) {
            this.$emit("create", res);
            if (res.qr_code && !options.cancel_popup) {
              this.res = res;
              if (this.modeCom === "pc") {
                this.openPopup("payPopup");
                this._pcChooseProvider(options.provider);
              } else {
                this.openPopup("qrcodePopup");
              }
            } else {
              this.orderPayment(res);
            }
          } else {
            this.$emit("fail", res);
          }
        } catch (err) {
          this.$emit("fail", err);
        }
      },
      // 调起支付
      orderPayment(res) {
        this.res = res;
        if (res.qr_code) {
          this.$emit("qrcode", res);
        } else if (res.order) {
          if (res.provider === "wxpay-virtual") {
            uni.requestVirtualPayment({
              ...res.order,
              success: (res2) => {
                this._getOrder();
              },
              fail: (err) => {
                if (err.errMsg.indexOf("fail cancel") == -1) {
                  formatAppLog("error", "at uni_modules/uni-pay/components/uni-pay/uni-pay.vue:358", "uni.requestVirtualPayment:fail", err);
                  this.$emit("fail", err);
                } else {
                  this.$emit("cancel", err);
                }
              }
            });
          } else {
            uni.requestPayment({
              provider: res.provider,
              // App端此参数必填，可以通过uni.getProvider获取
              orderInfo: res.order,
              ...res.order,
              success: (res2) => {
                this._getOrder();
              },
              fail: (err) => {
                if (err.errMsg.indexOf("fail cancel") == -1) {
                  formatAppLog("error", "at uni_modules/uni-pay/components/uni-pay/uni-pay.vue:384", "uni.requestPayment:fail", err);
                  this.$emit("fail", err);
                } else {
                  this.$emit("cancel", err);
                }
              }
            });
          }
        }
      },
      // 打开弹窗
      openPopup(name) {
        if (!this.$refs[name].showPopup)
          this.$refs[name].open();
      },
      // 关闭弹窗
      closePopup(name) {
        this.$refs[name].close();
      },
      // 查询订单（查询支付情况）
      async getOrder(data = {}) {
        try {
          let res = await uniPayCo.getOrder(data);
          if (typeof data.success === "function")
            data.success(res);
          return res;
        } catch (err) {
          if (typeof data.fail === "function")
            data.fail(err);
        }
      },
      // 发起退款（此接口需要admin角色才可以访问）
      async refund(data = {}) {
        try {
          let res = await uniPayCo.refund(data);
          if (typeof data.success === "function")
            data.success(res);
          return res;
        } catch (err) {
          if (typeof data.fail === "function")
            data.fail(err);
        }
      },
      // 查询退款（查询退款情况）
      async getRefund(data = {}) {
        try {
          let res = await uniPayCo.getRefund(data);
          if (typeof data.success === "function")
            data.success(res);
          return res;
        } catch (err) {
          if (typeof data.fail === "function")
            data.fail(err);
        }
      },
      // 关闭订单
      async closeOrder(data = {}) {
        try {
          let res = await uniPayCo.closeOrder(data);
          if (typeof data.success === "function")
            data.success(res);
          return res;
        } catch (err) {
          if (typeof data.fail === "function")
            data.fail(err);
        }
      },
      // 获取支持的支付供应商
      async getPayProviderFromCloud(data = {}) {
        try {
          let res = await uniPayCo.getPayProviderFromCloud(data);
          if (typeof data.success === "function")
            data.success(res);
          return res;
        } catch (err) {
          if (typeof data.fail === "function")
            data.fail(err);
        }
      },
      // 获取支付配置内的appid（主要用于获取获取微信公众号的appid，用以获取code）
      async getProviderAppId(data = {}) {
        try {
          let res = await uniPayCo.getProviderAppId(data);
          if (typeof data.success === "function")
            data.success(res);
          return res;
        } catch (err) {
          if (typeof data.fail === "function")
            data.fail(err);
        }
      },
      // 根据code获取openid
      async getOpenid(data = {}) {
        try {
          let res = await uniPayCo.getOpenid(data);
          if (typeof data.success === "function")
            data.success(res);
          return res;
        } catch (err) {
          if (typeof data.fail === "function")
            data.fail(err);
        }
      },
      // 验证iosIap苹果内购支付凭据
      async verifyReceiptFromAppleiap(data = {}) {
        try {
          let res = await uniPayCo.verifyReceiptFromAppleiap(data);
          if (typeof data.success === "function")
            data.success(res);
          return res;
        } catch (err) {
          if (typeof data.fail === "function")
            data.fail(err);
        }
      },
      // 获取code
      async getCode() {
      },
      // 支付成功后的逻辑
      paySuccess(res = {}) {
        this.closePopup("payPopup");
        this.closePopup("payConfirmPopup");
        this.clearQrcode();
        if (this.toSuccessPage) {
          this.pageToSuccess(res);
        }
        this.$emit("success", res);
      },
      pageToSuccess(res) {
        if (this.modeCom !== "pc") {
          uni.navigateTo({
            url: `/uni_modules/uni-pay/pages/success/success?out_trade_no=${res.out_trade_no}&order_no=${res.pay_order.order_no}&pay_date=${res.pay_order.pay_date}&total_fee=${res.pay_order.total_fee}&adpid=${this.adpid}&return_url=${this.returnUrl}&main_color=${this.mainColor}`
          });
        } else {
          if (this.returnUrl) {
            let url = this.returnUrl + `?out_trade_no=${res.out_trade_no}&order_no=${res.pay_order.order_no}`;
            if (url.indexOf("/") !== 0)
              url = `/${url}`;
            uni.navigateTo({
              url
            });
          }
        }
      },
      // 监听 - 关闭二维码弹窗
      clearQrcode() {
        this.res.codeUrl = "";
        this.res.qr_code_image = "";
      },
      // 内部函数查询支付状态
      async _getOrder() {
        this.getOrder({
          out_trade_no: this.res.out_trade_no,
          await_notify: true,
          success: (res) => {
            if (res.has_paid) {
              this.closePopup("qrcodePopup");
              this.paySuccess(res);
            }
          }
        });
      },
      // 重新发起支付
      _afreshPayment() {
        this.orderPayment(this.res);
      },
      // pc版弹窗选择支付方式
      _pcChooseProvider(provider) {
        if (provider === this.options.provider) {
          return;
        }
        return this.createOrder({ provider });
      },
      // ios内购支付逻辑
      async _appleiapCreateOrder(options) {
        let appleiap = new appleiapSdk.Iap({
          // products为苹果开发者后台的商品id数组
          products: [options.productid]
        });
        uni.showLoading({
          title: "加载中..."
        });
        await appleiap.init();
        let productList = await appleiap.getProduct();
        let productInfo = productList[0];
        options.total_fee = productInfo.price * 100;
        options.description = productInfo.description;
        let createOrderData = {
          provider: options.provider,
          total_fee: options.total_fee,
          order_no: options.order_no,
          out_trade_no: options.out_trade_no,
          description: options.description,
          type: options.type,
          custom: options.custom
        };
        let res = await uniPayCo.createOrder(createOrderData);
        if (res.errCode === 0) {
          this.$emit("create", res);
          this.res = res;
          uni.showLoading({
            title: "支付请求中..."
          });
          try {
            if (this.debug)
              formatAppLog("log", "at uni_modules/uni-pay/components/uni-pay/uni-pay.vue:583", "正在请求苹果服务器", options.productid, res.out_trade_no);
            let requestPaymentRes = await appleiap.requestPayment({
              productid: options.productid,
              username: res.out_trade_no
            });
            if (this.debug)
              formatAppLog("log", "at uni_modules/uni-pay/components/uni-pay/uni-pay.vue:588", "用户支付成功", requestPaymentRes);
            uni.showLoading({
              title: "正在处理支付结果..."
            });
            if (!requestPaymentRes.payment.username) {
              requestPaymentRes.payment.username = this.getAppleiapUserName(requestPaymentRes);
            }
            if (!requestPaymentRes.payment.username) {
              await appleiap.finishTransaction(requestPaymentRes);
              uni.hideLoading();
              formatAppLog("log", "at uni_modules/uni-pay/components/uni-pay/uni-pay.vue:600", `您可能已支付成功，但很抱歉丢单了，请联系客服处理。`, requestPaymentRes);
              return false;
            }
            this.addAppleiapOrder(requestPaymentRes);
            let verifyRes = await this.verifyReceiptFromAppleiap({
              out_trade_no: requestPaymentRes.payment.username,
              transaction_receipt: requestPaymentRes.transactionReceipt,
              transaction_identifier: requestPaymentRes.transactionIdentifier
            });
            if (verifyRes.errCode === 0) {
              await appleiap.finishTransaction(requestPaymentRes);
              this.removeAppleiapOrder(requestPaymentRes);
              uni.hideLoading();
              this.paySuccess(verifyRes);
            }
          } catch (err) {
            let code = err.errCode || err.code;
            if (code === 2) {
              if (this.debug)
                formatAppLog("log", "at uni_modules/uni-pay/components/uni-pay/uni-pay.vue:622", "用户取消支付");
              this.$emit("cancel", err);
            } else {
              formatAppLog("error", "at uni_modules/uni-pay/components/uni-pay/uni-pay.vue:626", "appleiapCreateOrder:fail", err);
              this.$emit("fail", err);
            }
            uni.hideLoading();
          }
        }
      },
      // ios内购支付漏单重试
      async appleiapRestore() {
        uni.showLoading({
          title: "检测支付环境..."
        });
        let appleiap = new appleiapSdk.Iap();
        await appleiap.init();
        try {
          if (this.debug)
            formatAppLog("log", "at uni_modules/uni-pay/components/uni-pay/uni-pay.vue:643", "正在查询是否有漏单信息");
          const transactions = await appleiap.restoreCompletedTransactions({
            username: ""
          });
          if (this.debug)
            formatAppLog("log", "at uni_modules/uni-pay/components/uni-pay/uni-pay.vue:647", "漏单查询结果：" + (transactions.length === 0 ? "未漏单" : "有漏单"), transactions);
          if (!transactions.length) {
            return;
          }
          for (let i2 = 0; i2 < transactions.length; i2++) {
            let requestPaymentRes = transactions[i2];
            switch (requestPaymentRes.transactionState) {
              case appleiapSdk.IapTransactionState.purchased:
                if (!requestPaymentRes.payment.username) {
                  requestPaymentRes.payment.username = this.getAppleiapUserName(requestPaymentRes);
                }
                if (!requestPaymentRes.payment.username) {
                  await appleiap.finishTransaction(requestPaymentRes);
                  formatAppLog("log", "at uni_modules/uni-pay/components/uni-pay/uni-pay.vue:664", `您可能已支付成功，但很抱歉丢单了，请联系客服处理。`, requestPaymentRes);
                  continue;
                }
                formatAppLog("log", "at uni_modules/uni-pay/components/uni-pay/uni-pay.vue:667", "requestPaymentRes: ", requestPaymentRes);
                let verifyRes = await this.verifyReceiptFromAppleiap({
                  out_trade_no: requestPaymentRes.payment.username,
                  transaction_receipt: requestPaymentRes.transactionReceipt,
                  transaction_identifier: requestPaymentRes.transactionIdentifier
                });
                formatAppLog("log", "at uni_modules/uni-pay/components/uni-pay/uni-pay.vue:673", "verifyRes: ", verifyRes);
                if (verifyRes.errCode === 0) {
                  formatAppLog("log", "at uni_modules/uni-pay/components/uni-pay/uni-pay.vue:676", "完结订单：" + requestPaymentRes.payment.username);
                  await appleiap.finishTransaction(requestPaymentRes);
                  this.removeAppleiapOrder(requestPaymentRes);
                }
                break;
              case appleiapSdk.IapTransactionState.failed:
                await appleiap.finishTransaction(requestPaymentRes);
                break;
              default:
                break;
            }
          }
        } catch (e2) {
          formatAppLog("error", "at uni_modules/uni-pay/components/uni-pay/uni-pay.vue:690", e2);
        } finally {
          uni.hideLoading();
        }
      },
      // 保存ios内购订单至本地缓存（丢单时可找回username）
      addAppleiapOrder(requestPaymentRes) {
        let key = "uni-pay-appleiap-order";
        let list = uni.getStorageSync(key) || [];
        list.push(requestPaymentRes);
        uni.setStorageSync(key, list);
      },
      // 从本地缓存中根据订单信息获取username
      getAppleiapUserName(requestPaymentRes) {
        let key = "uni-pay-appleiap-order";
        let list = uni.getStorageSync(key) || [];
        let info = list.find((item) => {
          return item.transactionIdentifier === requestPaymentRes.transactionIdentifier && item.transactionDate === requestPaymentRes.transactionDate;
        });
        let username = info && info.payment && info.payment.username;
        return username;
      },
      // 从本地缓存中删除ios内购订单
      removeAppleiapOrder(requestPaymentRes) {
        let key = "uni-pay-appleiap-order";
        let list = uni.getStorageSync(key) || [];
        let index = list.findIndex((item) => {
          return item.transactionIdentifier === requestPaymentRes.transactionIdentifier && item.transactionDate === requestPaymentRes.transactionDate;
        });
        if (index > -1) {
          list.splice(index, 1);
        }
        uni.setStorageSync(key, list);
      }
    },
    watch: {},
    computed: {
      modeCom() {
        if (this.mode)
          return this.mode;
        let systemInfo = uni.getSystemInfoSync();
        return systemInfo && systemInfo.deviceType === "pc" ? "pc" : "mobile";
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$3);
    const _component_uni_list_item = resolveEasycom(vue.resolveDynamicComponent("uni-list-item"), __easycom_0);
    const _component_uni_list = resolveEasycom(vue.resolveDynamicComponent("uni-list"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-pay" }, [
      vue.createCommentVNode(" PC版收银台弹窗开始 "),
      $options.modeCom === "pc" ? (vue.openBlock(), vue.createBlock(
        _component_uni_popup,
        {
          key: 0,
          ref: "payPopup",
          type: "center",
          "safe-area": false
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "pc-pay-popup" }, [
              vue.createElementVNode("view", { class: "pc-pay-popup-title" }, "收银台"),
              vue.createElementVNode("view", { class: "pc-pay-popup-flex" }, [
                vue.createElementVNode("view", { class: "pc-pay-popup-qrcode-box" }, [
                  vue.createElementVNode("image", {
                    class: "pc-pay-popup-qrcode-image",
                    src: $data.res.qr_code_image
                  }, null, 8, ["src"]),
                  vue.createElementVNode("view", { class: "pc-pay-popup-amount-box" }, [
                    vue.createElementVNode("view", { class: "pc-pay-popup-amount-tips" }, "扫一扫付款"),
                    vue.createElementVNode(
                      "view",
                      { class: "pc-pay-popup-amount" },
                      vue.toDisplayString(($data.options.total_fee / 100).toFixed(2)),
                      1
                      /* TEXT */
                    )
                  ]),
                  $data.res.qr_code_image ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "pc-pay-popup-complete-button"
                  }, [
                    vue.createElementVNode("button", {
                      type: "primary",
                      onClick: _cache[0] || (_cache[0] = ($event) => $options._getOrder())
                    }, "我已完成支付")
                  ])) : vue.createCommentVNode("v-if", true)
                ]),
                vue.createElementVNode("view", { class: "pc-pay-popup-provider-list" }, [
                  $data.currentProviders.indexOf("wxpay") > -1 ? (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 0,
                      class: vue.normalizeClass(["pc-pay-popup-provider-item", $data.options.provider == "wxpay" ? "active" : ""]),
                      onClick: _cache[1] || (_cache[1] = ($event) => $options._pcChooseProvider("wxpay"))
                    },
                    [
                      vue.createElementVNode("image", {
                        src: $data.images.wxpay,
                        class: "pc-pay-popup-provider-image"
                      }, null, 8, ["src"]),
                      vue.createElementVNode("text", { class: "pc-pay-popup-provider-text" }, "微信支付")
                    ],
                    2
                    /* CLASS */
                  )) : vue.createCommentVNode("v-if", true),
                  $data.currentProviders.indexOf("alipay") > -1 ? (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 1,
                      class: vue.normalizeClass(["pc-pay-popup-provider-item", $data.options.provider == "alipay" ? "active" : ""]),
                      onClick: _cache[2] || (_cache[2] = ($event) => $options._pcChooseProvider("alipay"))
                    },
                    [
                      vue.createElementVNode("image", {
                        src: $data.images.alipay,
                        class: "pc-pay-popup-provider-image"
                      }, null, 8, ["src"]),
                      vue.createElementVNode("text", { class: "pc-pay-popup-provider-text" }, "支付宝支付")
                    ],
                    2
                    /* CLASS */
                  )) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("view", { class: "pc-pay-popup-logo" }, [
                    vue.createElementVNode("image", {
                      src: $props.logo,
                      mode: "widthFix"
                    }, null, 8, ["src"])
                  ])
                ])
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      )) : (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 1 },
        [
          vue.createCommentVNode(" PC版收银台弹窗结束 "),
          vue.createCommentVNode(" 手机版收银台弹窗开始 "),
          vue.createVNode(
            _component_uni_popup,
            {
              ref: "payPopup",
              type: "bottom",
              "safe-area": false
            },
            {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: "mobile-pay-popup",
                    style: vue.normalizeStyle("min-height: " + $props.height + ";")
                  },
                  [
                    vue.createElementVNode("view", { class: "mobile-pay-popup-title" }, "收银台"),
                    vue.createElementVNode("view", { class: "mobile-pay-popup-amount-box" }, [
                      vue.createElementVNode("view", null, "待支付金额："),
                      vue.createElementVNode(
                        "view",
                        { class: "mobile-pay-popup-amount" },
                        vue.toDisplayString(($data.options.total_fee / 100).toFixed(2)),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "mobile-pay-popup-provider-list" }, [
                      vue.createVNode(_component_uni_list, null, {
                        default: vue.withCtx(() => [
                          $data.currentProviders.indexOf("wxpay") > -1 ? (vue.openBlock(), vue.createBlock(_component_uni_list_item, {
                            key: 0,
                            thumb: $data.images.wxpay,
                            title: "微信支付",
                            onClick: _cache[3] || (_cache[3] = ($event) => $options.createOrder({ provider: "wxpay" })),
                            clickable: "",
                            link: ""
                          }, null, 8, ["thumb"])) : vue.createCommentVNode("v-if", true),
                          $data.currentProviders.indexOf("alipay") > -1 ? (vue.openBlock(), vue.createBlock(_component_uni_list_item, {
                            key: 1,
                            thumb: $data.images.alipay,
                            title: "支付宝",
                            onClick: _cache[4] || (_cache[4] = ($event) => $options.createOrder({ provider: "alipay" })),
                            clickable: "",
                            link: ""
                          }, null, 8, ["thumb"])) : vue.createCommentVNode("v-if", true)
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ])
                  ],
                  4
                  /* STYLE */
                )
              ]),
              _: 1
              /* STABLE */
            },
            512
            /* NEED_PATCH */
          )
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      )),
      vue.createCommentVNode(" 手机版收银台弹窗结束 "),
      vue.createCommentVNode(" 二维码支付弹窗开始 "),
      vue.createVNode(_component_uni_popup, {
        ref: "qrcodePopup",
        type: "center",
        "safe-area": false,
        animation: false,
        "mask-click": false,
        onClose: $options.clearQrcode
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "qrcode-popup-content" }, [
            vue.createElementVNode("image", {
              src: $data.res.qr_code_image,
              class: "qrcode-image"
            }, null, 8, ["src"]),
            vue.createElementVNode("view", { class: "qrcode-popup-info" }, [
              vue.createElementVNode("view", null, [
                vue.createElementVNode(
                  "text",
                  { class: "qrcode-popup-info-fee" },
                  vue.toDisplayString(($data.options.total_fee / 100).toFixed(2)),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("text", null, "元")
              ]),
              $data.options.provider == "wxpay" ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, "请用微信扫码支付")) : $data.options.provider == "alipay" ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, "请用支付宝扫码支付")) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("button", {
              type: "primary",
              onClick: _cache[5] || (_cache[5] = ($event) => $options._getOrder())
            }, "我已完成支付"),
            vue.createElementVNode("view", {
              class: "qrcode-popup-cancel",
              onClick: _cache[6] || (_cache[6] = ($event) => $options.closePopup("qrcodePopup"))
            }, "暂不支付")
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["onClose"]),
      vue.createCommentVNode(" 二维码支付弹窗结束 "),
      vue.createCommentVNode(" 外部浏览器确认支付弹窗开始 "),
      vue.createVNode(
        _component_uni_popup,
        {
          ref: "payConfirmPopup",
          type: "center",
          "safe-area": false,
          animation: false,
          "mask-click": false
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "pay-confirm-popup-content" }, [
              vue.createElementVNode("view", { class: "pay-confirm-popup-title" }, "请确认支付是否已完成"),
              vue.createElementVNode("view", null, [
                vue.createElementVNode("button", {
                  type: "primary",
                  onClick: _cache[7] || (_cache[7] = ($event) => $options._getOrder())
                }, "已完成支付")
              ]),
              vue.createElementVNode("view", { class: "pay-confirm-popup-refresh" }, [
                vue.createElementVNode("button", {
                  type: "default",
                  onClick: _cache[8] || (_cache[8] = ($event) => $options._afreshPayment())
                }, "支付遇到问题，重新支付")
              ]),
              vue.createElementVNode("view", {
                class: "pay-confirm-popup-cancel",
                onClick: _cache[9] || (_cache[9] = ($event) => $options.closePopup("payConfirmPopup"))
              }, "暂不支付")
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createCommentVNode(" 外部浏览器确认支付弹窗结束 ")
    ]);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$1], ["__scopeId", "data-v-9aa540bd"], ["__file", "C:/uni_apps/peizhenApp/uni_modules/uni-pay/components/uni-pay/uni-pay.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        options: {
          total_fee: ""
        },
        insideData: {},
        // uni-pay组件mounted事件获得的数据
        adpid: "",
        // 广告id
        return_url: "",
        // 支付成功后点击查看订单跳转的订单详情页面地址
        main_color: ""
        // 支付成功页面的主色调
      };
    },
    // 监听 - 页面每次【加载时】执行(如：前进)
    onLoad(options = {}) {
      options = JSON.parse(decodeURI(options.options));
      this.options = options;
    },
    // 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
    onReady() {
    },
    // 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
    onShow() {
    },
    // 监听 - 页面每次【隐藏时】执行(如：返回)
    onHide() {
    },
    // 函数
    methods: {
      // 监听 - 支付组件加载完毕事件
      onMounted(insideData) {
        this.insideData = insideData;
      },
      // 发起支付
      createOrder(provider) {
        Object.assign(this.options, provider);
        this.$refs.uniPay.createOrder(this.options);
      },
      // 监听事件 - 支付成功
      onSuccess(res) {
        formatAppLog("log", "at uni_modules/uni-pay/pages/pay-desk/pay-desk.vue:63", "success: ", res);
        if (res.user_order_success) {
          uni.redirectTo({
            url: `/uni_modules/uni-pay/pages/success/success?out_trade_no=${res.out_trade_no}&order_no=${res.pay_order.order_no}&pay_date=${res.pay_order.pay_date}&total_fee=${res.pay_order.total_fee}&adpid=${this.adpid}&return_url=${this.return_url}&main_color=${this.main_color}`
          });
        }
      }
    },
    // 监听器
    watch: {},
    // 计算属性
    computed: {}
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_list_item = resolveEasycom(vue.resolveDynamicComponent("uni-list-item"), __easycom_0);
    const _component_uni_list = resolveEasycom(vue.resolveDynamicComponent("uni-list"), __easycom_1);
    const _component_uni_pay = resolveEasycom(vue.resolveDynamicComponent("uni-pay"), __easycom_2);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" 自定义收银台页面模式 "),
        vue.createElementVNode("view", { class: "uni-pay" }, [
          $data.insideData && $data.insideData.currentProviders ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "mobile-pay-popup"
          }, [
            vue.createElementVNode("view", { class: "mobile-pay-popup-amount-box" }, [
              vue.createElementVNode("view", null, "待支付金额："),
              vue.createElementVNode(
                "view",
                { class: "mobile-pay-popup-amount" },
                vue.toDisplayString(($data.options.total_fee / 100).toFixed(2)),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "mobile-pay-popup-provider-list" }, [
              vue.createVNode(_component_uni_list, null, {
                default: vue.withCtx(() => [
                  $data.insideData.currentProviders.indexOf("wxpay") > -1 ? (vue.openBlock(), vue.createBlock(_component_uni_list_item, {
                    key: 0,
                    thumb: $data.insideData.images.wxpay,
                    title: "微信支付",
                    onClick: _cache[0] || (_cache[0] = ($event) => $options.createOrder({ provider: "wxpay" })),
                    clickable: "",
                    link: ""
                  }, null, 8, ["thumb"])) : vue.createCommentVNode("v-if", true),
                  $data.insideData.currentProviders.indexOf("alipay") > -1 ? (vue.openBlock(), vue.createBlock(_component_uni_list_item, {
                    key: 1,
                    thumb: $data.insideData.images.alipay,
                    title: "支付宝",
                    onClick: _cache[1] || (_cache[1] = ($event) => $options.createOrder({ provider: "alipay" })),
                    clickable: "",
                    link: ""
                  }, null, 8, ["thumb"])) : vue.createCommentVNode("v-if", true)
                ]),
                _: 1
                /* STABLE */
              })
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 挂载支付组件 "),
          vue.createVNode(_component_uni_pay, {
            ref: "uniPay",
            "to-success-page": false,
            onMounted: $options.onMounted,
            onSuccess: $options.onSuccess
          }, null, 8, ["onMounted", "onSuccess"])
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const Uni_modulesUniPayPagesPayDeskPayDesk = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render], ["__scopeId", "data-v-52f4fa89"], ["__file", "C:/uni_apps/peizhenApp/uni_modules/uni-pay/pages/pay-desk/pay-desk.vue"]]);
  const _sfc_main$1 = {
    __name: "order",
    setup(__props) {
      const app = getApp();
      onLoad((options) => {
        getOrderDetail(options.oid);
      });
      let order = vue.ref({});
      const orderStatus = vue.computed(() => {
        let mymap = {
          "待支付": "10",
          "待服务": "20",
          "已完成": "30",
          "已取消": "40"
        };
        return mymap[order.value.trade_state];
      });
      const getOrderDetail = (myoid) => {
        app.globalData.utils.myrequest({
          myurl: "/order/detail",
          header: {
            token: uni.getStorageSync("token")
          },
          data: {
            oid: myoid
          },
          mysuccess: (res) => {
            formatAppLog("log", "at pages/myorder/order.vue:390", "订单详情res", res);
            order.value = res.data;
          },
          myfail: (err) => {
            formatAppLog("log", "at pages/myorder/order.vue:396", "获取订单详情信息错误", err);
            return uni.showToast({
              title: "获取订单详情信息错误",
              icon: "error"
            });
          }
        });
      };
      const onCounterOver = () => {
        getOrderDetail();
      };
      const dopay = () => {
        formatAppLog("log", "at pages/myorder/order.vue:410", "假装我已经支付了");
        order.value.trade_state = "待服务";
      };
      const makePhoneCall = (e2) => {
        uni.makePhoneCall({
          phoneNumber: e2.currentTarget.dataset.tel
        });
      };
      return (_ctx, _cache) => {
        const _component_counter = resolveEasycom(vue.resolveDynamicComponent("counter"), __easycom_0$6);
        const _component_formater = resolveEasycom(vue.resolveDynamicComponent("formater"), __easycom_1$3);
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode("view", { class: "od-banner" }, [
            vue.createElementVNode("image", {
              class: "od-banner-icon",
              src: "/static/images/od_bg_icon.png",
              mode: "widthFix"
            }),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass("od-jd od-jd-" + orderStatus.value)
              },
              [
                vue.createElementVNode("view", { class: "od-jd-out" }, [
                  vue.createElementVNode("view", { class: "od-jd-in" })
                ]),
                vue.createElementVNode("view", { class: "vp-flex od-jd-text" }, [
                  vue.createElementVNode("view", { class: "vp-flex_1" }, [
                    vue.createElementVNode("text", { class: "od-jd-st-0" }, "填写订单")
                  ]),
                  vue.createElementVNode("view", { class: "vp-flex_1" }, [
                    vue.createElementVNode("text", { class: "od-jd-st-10" }, "在线支付")
                  ]),
                  vue.createElementVNode("view", { class: "vp-flex_1" }, [
                    vue.createElementVNode("text", { class: "od-jd-st-20" }, "专人服务")
                  ]),
                  vue.createElementVNode("view", { class: "vp-flex_1" }, [
                    vue.createElementVNode("text", { class: "od-jd-st-30" }, "服务完成")
                  ])
                ])
              ],
              2
              /* CLASS */
            )
          ]),
          vue.createElementVNode("view", { class: "order-status" }, [
            vue.createCommentVNode(" 待付款 "),
            orderStatus.value == 10 ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              [
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("text", { class: "od-st" }, "订单待支付")
                ]),
                vue.createElementVNode("view", { class: "od-stt" }, [
                  vue.createTextVNode(" 请在 "),
                  vue.createVNode(_component_counter, {
                    style: { "font-size": "24rpx" },
                    second: vue.unref(order)._exp_time,
                    onCounterOver
                  }, null, 8, ["second"]),
                  vue.createTextVNode(" 内完成支付，超时订单自动取消 ")
                ]),
                vue.createElementVNode("view", { class: "od-op" }, [
                  vue.createElementVNode(
                    "button",
                    {
                      class: "btnp",
                      onClick: dopay
                    },
                    "立即支付（" + vue.toDisplayString(vue.unref(order).price) + "元）",
                    1
                    /* TEXT */
                  )
                ])
              ],
              64
              /* STABLE_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" 进行中 "),
            orderStatus.value == 20 ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 1 },
              [
                vue.unref(order).service_state == 0 ? (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 0 },
                  [
                    vue.createElementVNode("view", null, [
                      vue.createElementVNode("text", { class: "od-st" }, "正在为您安排服务专员...")
                    ]),
                    vue.createElementVNode("view", { class: "od-stt" }, "请保持手机畅通，稍后将有服务专员与您联系")
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : vue.createCommentVNode("v-if", true),
                vue.unref(order).service_state == 1 ? (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  [
                    vue.createElementVNode("view", null, [
                      vue.createElementVNode("text", { class: "od-st" }, "服务进行中")
                    ]),
                    vue.createElementVNode("view", { class: "od-stt" }, "已安排服务专员，将于预约时间进行服务")
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" 已完成 "),
            orderStatus.value == 30 ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 2 },
              [
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("text", { class: "od-st" }, "服务已完成")
                ]),
                vue.createElementVNode("view", { class: "od-stt" }, "感谢您的使用，如有售后问题请联系客服")
              ],
              64
              /* STABLE_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" 已取消 "),
            orderStatus.value == 40 ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 3 },
              [
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("text", { class: "od-st" }, "订单已取消")
                ]),
                vue.createElementVNode("view", { class: "od-stt" }, "期待下次为您服务，如需帮助可咨询客服")
              ],
              64
              /* STABLE_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true)
          ]),
          orderStatus.value == 20 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "od-box"
          }, [
            vue.createElementVNode("view", { class: "weui-cells" }, [
              vue.createElementVNode("view", { class: "weui-cell" }, [
                vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                  vue.createElementVNode("view", { class: "weui-label od-box-tt" }, "本次服务专员")
                ]),
                vue.createElementVNode("view", { class: "weui-cell__bd" })
              ]),
              vue.createElementVNode("view", { class: "weui-cell od-staff" }, [
                vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                  vue.createElementVNode("view", null, [
                    vue.createElementVNode("image", {
                      src: vue.unref(order)._staff.avatar_url,
                      mode: "aspectFill",
                      class: "od-staff-avatar"
                    }, null, 8, ["src"])
                  ])
                ]),
                vue.createElementVNode("view", { class: "weui-cell__bd" }, [
                  vue.createElementVNode(
                    "view",
                    null,
                    vue.toDisplayString(vue.unref(order)._staff.nickname),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                  vue.createElementVNode("view", null, [
                    vue.createElementVNode("button", {
                      class: "btn1m",
                      onClick: makePhoneCall,
                      "data-tel": vue.unref(order)._staff.mobile
                    }, "电话联系", 8, ["data-tel"])
                  ])
                ])
              ])
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "od-box" }, [
            vue.createElementVNode("view", { class: "weui-cells" }, [
              vue.createElementVNode("view", { class: "weui-cell" }, [
                vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                  vue.createElementVNode("view", { class: "weui-label od-box-tt" }, "预约信息")
                ]),
                vue.createElementVNode("view", { class: "weui-cell__bd" })
              ]),
              vue.createElementVNode("view", { class: "weui-cell" }, [
                vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                  vue.createElementVNode("view", { class: "weui-label" }, "预约服务")
                ]),
                vue.createElementVNode("view", { class: "weui-cell__bd" }),
                vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                  vue.createElementVNode(
                    "view",
                    null,
                    vue.toDisplayString(vue.unref(order).service_name),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              vue.unref(order).service_stype <= 20 ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                [
                  vue.createElementVNode("view", { class: "weui-cell" }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "就诊医院")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                      vue.createElementVNode(
                        "view",
                        null,
                        vue.toDisplayString(vue.unref(order).hospital_name),
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "weui-cell" }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "期望就诊时间")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                      vue.createElementVNode("view", null, [
                        vue.createVNode(_component_formater, {
                          timestamp: vue.unref(order).starttime,
                          format: "YYYY-MM-dd hh:mm"
                        }, null, 8, ["timestamp"])
                      ])
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "weui-cell" }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "就诊人")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                      vue.createElementVNode(
                        "view",
                        null,
                        vue.toDisplayString(vue.unref(order).client_name) + " " + vue.toDisplayString(vue.unref(order).client_sex == 1 ? "男" : "女") + " " + vue.toDisplayString(vue.unref(order).client_age) + "周岁",
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "weui-cell" }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "就诊人电话")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                      vue.createElementVNode(
                        "view",
                        null,
                        vue.toDisplayString(vue.unref(order).tel),
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  vue.unref(order).service_stype == 15 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "weui-cell"
                  }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "接送地址")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                      vue.createElementVNode(
                        "view",
                        null,
                        vue.toDisplayString(vue.unref(order).receiveAddress),
                        1
                        /* TEXT */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true)
                ],
                64
                /* STABLE_FRAGMENT */
              )) : vue.createCommentVNode("v-if", true),
              vue.unref(order).service_stype > 20 && vue.unref(order).service_stype < 100 ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 1 },
                [
                  vue.createElementVNode("view", { class: "weui-cell" }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "所在医院")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                      vue.createElementVNode(
                        "view",
                        null,
                        vue.toDisplayString(vue.unref(order).hospital_name),
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "weui-cell" }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "期望处理时间")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                      vue.createElementVNode("view", null, [
                        vue.createVNode(_component_formater, {
                          timestamp: vue.unref(order).starttime,
                          format: "YYYY-MM-dd hh:mm"
                        }, null, 8, ["timestamp"])
                      ])
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "weui-cell" }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "收件人")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                      vue.createElementVNode(
                        "view",
                        null,
                        vue.toDisplayString(vue.unref(order).address.userName) + " " + vue.toDisplayString(vue.unref(order).address.telNumber),
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "weui-cell" }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "收件地址")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                      vue.createElementVNode(
                        "view",
                        null,
                        vue.toDisplayString(vue.unref(order).address.cityName) + vue.toDisplayString(vue.unref(order).address.countyName) + vue.toDisplayString(vue.unref(order).address.detailInfo),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ],
                64
                /* STABLE_FRAGMENT */
              )) : vue.createCommentVNode("v-if", true),
              vue.unref(order).service_stype > 100 ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 2 },
                [
                  vue.createElementVNode("view", { class: "weui-cell" }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "期望服务时间")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                      vue.createElementVNode("view", null, [
                        vue.createVNode(_component_formater, {
                          timestamp: vue.unref(order).starttime,
                          format: "YYYY-MM-dd hh:mm"
                        }, null, 8, ["timestamp"])
                      ])
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "weui-cell" }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "服务对象")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                      vue.createElementVNode(
                        "view",
                        null,
                        vue.toDisplayString(vue.unref(order).client_name) + " " + vue.toDisplayString(vue.unref(order).client_sex == 1 ? "男" : "女") + " " + vue.toDisplayString(vue.unref(order).client_age) + "周岁",
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "weui-cell" }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "服务对象电话")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                      vue.createElementVNode(
                        "view",
                        null,
                        vue.toDisplayString(vue.unref(order).client_mobile),
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "weui-cell" }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "服务地址")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                      vue.createElementVNode(
                        "view",
                        null,
                        vue.toDisplayString(vue.unref(order).address.address),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ],
                64
                /* STABLE_FRAGMENT */
              )) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { class: "weui-cell" }, [
                vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                  vue.createElementVNode("view", { class: "weui-label" }, "其他需求")
                ]),
                vue.createElementVNode("view", { class: "weui-cell__bd" }),
                vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                  vue.createElementVNode(
                    "view",
                    null,
                    vue.toDisplayString(vue.unref(order).demand),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "od-box" }, [
            vue.createElementVNode("view", { class: "weui-cells" }, [
              vue.createElementVNode("view", { class: "weui-cell" }, [
                vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                  vue.createElementVNode("view", { class: "weui-label od-box-tt" }, "订单信息")
                ]),
                vue.createElementVNode("view", { class: "weui-cell__bd" })
              ]),
              vue.createElementVNode("view", { class: "weui-cell" }, [
                vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                  vue.createElementVNode("view", { class: "weui-label" }, "联系电话")
                ]),
                vue.createElementVNode("view", { class: "weui-cell__bd" }),
                vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                  vue.createElementVNode(
                    "view",
                    null,
                    vue.toDisplayString(vue.unref(order).tel),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              vue.createElementVNode("view", { class: "weui-cell" }, [
                vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                  vue.createElementVNode("view", { class: "weui-label" }, "下单时间")
                ]),
                vue.createElementVNode("view", { class: "weui-cell__bd" }),
                vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                  vue.createElementVNode("view", null, [
                    vue.createVNode(_component_formater, {
                      timestamp: vue.unref(order).order_start_time,
                      format: "YYYY-MM-dd hh:mm"
                    }, null, 8, ["timestamp"])
                  ])
                ])
              ]),
              vue.createElementVNode("view", { class: "weui-cell" }, [
                vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                  vue.createElementVNode("view", { class: "weui-label" }, "应付金额")
                ]),
                vue.createElementVNode("view", { class: "weui-cell__bd" }),
                vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                  vue.createElementVNode(
                    "view",
                    null,
                    vue.toDisplayString(vue.unref(order).price) + "元",
                    1
                    /* TEXT */
                  )
                ])
              ]),
              orderStatus.value == 20 ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                [
                  vue.createElementVNode("view", { class: "weui-cell" }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "实付金额")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                      vue.createElementVNode(
                        "view",
                        null,
                        vue.toDisplayString(vue.unref(order).price) + "元",
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "weui-cell" }, [
                    vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                      vue.createElementVNode("view", { class: "weui-label" }, "付款时间")
                    ]),
                    vue.createElementVNode("view", { class: "weui-cell__bd" }),
                    vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                      vue.createElementVNode("view", null, [
                        vue.createVNode(_component_formater, {
                          timestamp: vue.unref(order).pay_time,
                          format: "YYYY-MM-dd hh:mm"
                        }, null, 8, ["timestamp"])
                      ])
                    ])
                  ])
                ],
                64
                /* STABLE_FRAGMENT */
              )) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { class: "weui-cell" }, [
                vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                  vue.createElementVNode("view", { class: "weui-label" }, "订单编号")
                ]),
                vue.createElementVNode("view", { class: "weui-cell__bd" }),
                vue.createElementVNode("view", { class: "weui-cell__ft" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "color_click" },
                    vue.toDisplayString(vue.unref(order).out_trade_no),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              vue.createElementVNode("navigator", {
                class: "weui-cell weui-cell_access",
                url: "../index/server"
              }, [
                vue.createElementVNode("view", { class: "weui-cell__hd" }, [
                  vue.createElementVNode("view", { class: "weui-label" }, "联系客服")
                ]),
                vue.createElementVNode("view", { class: "weui-cell__bd" }),
                vue.createElementVNode("view", { class: "weui-cell__ft weui-cell__ft_in-access" }, "疑问或投诉")
              ])
            ])
          ])
        ]);
      };
    }
  };
  const PagesMyorderOrder = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "C:/uni_apps/peizhenApp/pages/myorder/order.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/myorder/index", PagesMyorderIndex);
  __definePage("pages/myuser/index", PagesMyuserIndex);
  __definePage("pages/mysearch/index", PagesMysearchIndex);
  __definePage("pages/hospital/index", PagesHospitalIndex);
  __definePage("pages/service/index", PagesServiceIndex);
  __definePage("pages/clients/index", PagesClientsIndex);
  __definePage("uni_modules/uni-pay/pages/success/success", Uni_modulesUniPayPagesSuccessSuccess);
  __definePage("uni_modules/uni-pay/pages/ad-interactive-webview/ad-interactive-webview", Uni_modulesUniPayPagesAdInteractiveWebviewAdInteractiveWebview);
  __definePage("uni_modules/uni-pay/pages/pay-desk/pay-desk", Uni_modulesUniPayPagesPayDeskPayDesk);
  __definePage("pages/myorder/order", PagesMyorderOrder);
  class Utils {
    constructor() {
      this.baseUrl = "http://159.75.169.224:7300/pz";
    }
    getUserInfo() {
      uni.login({
        success: (res) => {
          formatAppLog("log", "at common/js/utils.js:8", "userinfo", res);
          this.myrequest({
            myurl: "/auth/wxLogin",
            data: {
              code: res.code
              // code:0
            },
            mysuccess: (resdata) => {
              formatAppLog("log", "at common/js/utils.js:16", "我的成功数据", resdata);
            }
          });
        }
      });
    }
    myrequest(options = { myloading: false }) {
      if (!options.myurl) {
        formatAppLog("log", "at common/js/utils.js:24", "请求错误");
        return false;
      }
      if (options.myloading) {
        this.showmyLoading();
        uni.setStorageSync("ifloading", true);
      }
      uni.request({
        url: this.baseUrl + options.myurl,
        data: options.data ? options.data : {},
        header: options.header ? options.header : {},
        method: options.method ? options.method : "GET",
        //默认get
        success: (res) => {
          uni.hideLoading();
          uni.setStorageSync("ifloading", false);
          if (res.data.code !== 1e4) {
            if (options.myfail && typeof options.myfail === "function") {
              options.myfail(res);
            }
          } else {
            if (options.mysuccess && typeof options.mysuccess === "function") {
              options.mysuccess(res.data);
            }
          }
        },
        fail: (err) => {
          options.myfail(err);
          uni.hideLoading();
          uni.setStorageSync("ifloading", false);
        }
      });
    }
    showmyLoading() {
      if (uni.getStorageSync("ifloading")) {
        uni.hideLoading();
      }
      uni.showLoading({
        title: "正在努力加载中..."
        // success() {
        // 	uni.setStorageSync('ifloading',true)
        // },
        // fail() {
        // 	uni.setStorageSync('ifloading',false)
        // }
      });
    }
  }
  const Utils$1 = new Utils();
  const _sfc_main = {
    onLaunch: function() {
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:18", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:21", "App Hide");
    },
    globalData: {
      utils: Utils$1,
      orders_filt: ""
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/uni_apps/peizhenApp/App.vue"]]);
  Date.prototype.VP_FORMAT = function(format) {
    var ds2 = parseInt(this.getTime() / (24 * 60 * 60 * 1e3)) - parseInt((/* @__PURE__ */ new Date()).getTime() / (24 * 60 * 60 * 1e3));
    var n2 = "";
    if (ds2 == 0) {
      n2 = "(今天)";
    }
    if (ds2 == 1) {
      n2 = "(明天)";
    }
    if (ds2 == 2) {
      n2 = "(后天)";
    }
    if (ds2 == -1) {
      n2 = "(昨天)";
    }
    if (ds2 == -2) {
      n2 = "(前天)";
    }
    var date = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "h+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S+": this.getMilliseconds(),
      "n+": n2
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
      }
    }
    return format;
  };
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
