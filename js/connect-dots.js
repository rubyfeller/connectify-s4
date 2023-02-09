! function () {
    var t, e, r, a = null,
        i = null,
        n = {},
        o = !1,
        u = 0,
        d = function () {
            var t = {
                3: ["a1abc2bc"],
                8: ["2b7gfe5d10d1f3b1g2e1c2ca1h3a5h5"],
                15: ["4o1i9l6a11eb5g5e20j2g26n9f1f9l7h1o7n10j7c6pd3mc4h5p6im3kad23b2k1"]
            }
            t = ["a1abc2bc",
                "2b7gfe5d10d1f3b1g2e1c2ca1h3a5h5",
                "4o1i9l6a11eb5g5e20j2g26n9f1f9l7h1o7n10j7c6pd3mc4h5p6im3kad23b2k1"
            ],
                l(t[Math.floor(Math.random() * t.length)])
            var e = document.querySelector(".grid")
            r = parseInt(e.getAttribute("data-size")),
                Array.from(e.querySelectorAll("div")).forEach(function (t, e) {
                    parseInt(t.getAttribute("data-id")), "true" === t.getAttribute("data-point")
                    t.setAttribute("data-i", e),
                        "ontouchstart" in document ? (t.addEventListener("touchstart", b, !1),
                            t.addEventListener("touchmove", h, !1),
                            t.addEventListener("touchend", g, !1)) : (t.addEventListener("mousedown", b, !1),
                                t.addEventListener("mousemove", h, !1), t.addEventListener("mouseup", g, !1))
                })
        },
        l = function (t) {
            for (var e = []; t.length;) t = t.replace(/^\d+|[a-z]/i, function (t) {
                if (parseInt(t))
                    for (; t--;) e.push(0)
                else e.push(parseInt(t, 36) - 9)
                return ""
            })
            var r = document.querySelector(".grid"),
                a = Math.sqrt(e.length)
            return a !== parseInt(a) ? void console.error("Invalid grid definition.") : (r.setAttribute("data-size", a), r.innerHTML = "", void e.forEach(function (t) {
                var e = document.createElement("div")
                t && (e.setAttribute("data-id", t), e.setAttribute("data-point", "true")), r.appendChild(e)
            }))
        },
        c = function (t, e) {
            var a = t % r - e % r,
                i = Math.floor(t / r) - Math.floor(e / r)
            return -1 === a && 0 === i ? "l" : 1 === a && 0 === i ? "r" : 0 === a && -1 === i ? "t" : 0 === a && 1 === i ? "b" : !1
        },
        f = function (t, e) {
            if (!t.length) return []
            var r = t[0].getAttribute("data-id")
            if (Array.from(document.querySelector(".grid").querySelectorAll('div[data-id="' + r + '"]')).forEach(function (t) {
                t.removeAttribute("data-completed")
            }), e = e || 1, t && t.length)
                for (; t.length > e;) {
                    var a = t.pop(),
                        i = t[t.length - 1],
                        n = c(i.getAttribute("data-i"), a.getAttribute("data-i"))
                    "true" !== a.getAttribute("data-point") && a.removeAttribute("data-id"), a.removeAttribute("data-" + n), i.removeAttribute("data-" + {
                        t: "b",
                        b: "t",
                        l: "r",
                        r: "l"
                    }[n])
                }
            return 1 === t.length && t.pop(), t
        },
        b = function (r) {
            var d = parseInt(this.getAttribute("data-id"))
            if (d && (!r.type.match(/^mouse/) || 1 === r.which)) {
                if (t !== a && u++, a = t, t = d, e !== r.target) {
                    if (i = e, e = r.target,
                        "true" === e.getAttribute("data-point")) n[t] ? n[t] = f(n[t]) : n[t] = []
                    else {
                        var l = n[t].indexOf(r.target)
                        l > -1 && (n[t] = f(n[t], l + 1),
                            i = n[t][n[t].length - 1])
                    }
                    n[t].push(e)
                }
                o = !0,
                    r.preventDefault()
            }
        },
        h = function (r) {
            if (o) {
                var a = r.target
                if (!r.type.match(/^touch/) || (a = document.elementFromPoint(r.touches[0].pageX, r.touches[0].pageY))) {
                    if (!e) return void console.log("no current block")
                    if (a !== e) {
                        var u = c(e.getAttribute("data-i"), a.getAttribute("data-i"))
                        if (u) {
                            var d = a.getAttribute("data-id"),
                                l = "true" === a.getAttribute("data-point")
                            if (d == t) {
                                var b = n[t].indexOf(a)
                                b > -1 ? (n[t] = f(n[t], b + 1), e = n[t][n[t].length - 1],
                                    i = n[t][n[t].length - 2]) : l ? (i = e, e = a, n[t].push(e),
                                        n[t].forEach(function (t) {
                                            t.setAttribute("data-completed", "true")
                                        }),
                                        e.setAttribute("data-id", t), e.setAttribute("data-" + u, ""),
                                        i.setAttribute("data-" + {
                                            t: "b",
                                            b: "t",
                                            l: "r",
                                            r: "l"
                                        }[u], "")) : (console.log("here: " + n[t].length),
                                            console.log(n[t]))
                            } else if (!d) {
                                if (e.getAttribute("data-point") && n[t].length > 1) return
                                i = e, e = a, e.setAttribute("data-id", t),
                                    e.setAttribute("data-" + u, ""),
                                    i.setAttribute("data-" + {
                                        t: "b",
                                        b: "t",
                                        l: "r",
                                        r: "l"
                                    }[u], ""),
                                    n[t].push(e)
                            }
                        }
                    }
                    r.preventDefault()
                }
            }
        },
        g = function (t) {
            o && (o = !1, t.preventDefault())
        }
    d()
}()