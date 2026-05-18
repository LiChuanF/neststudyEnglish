//#region ../../node_modules/.pnpm/@fingerprintjs+fingerprintjs@5.2.0/node_modules/@fingerprintjs/fingerprintjs/dist/fp.esm.js
var e = "5.2.0";
function t(e, t) {
	return new Promise((n) => setTimeout(n, e, t));
}
function n() {
	return new Promise((e) => {
		let t = new MessageChannel();
		t.port1.onmessage = () => e(), t.port2.postMessage(null);
	});
}
function r(e, n = Infinity) {
	let { requestIdleCallback: r } = window;
	return r ? new Promise((e) => r.call(window, () => e(), { timeout: n })) : t(Math.min(e, n));
}
function i(e) {
	return !!e && typeof e.then == "function";
}
function a(e, t) {
	try {
		let n = e();
		i(n) ? n.then((e) => t(!0, e), (e) => t(!1, e)) : t(!0, n);
	} catch (e) {
		t(!1, e);
	}
}
async function o(e, t, r = 16) {
	let i = Array(e.length), a = Date.now();
	for (let o = 0; o < e.length; ++o) {
		i[o] = t(e[o], o);
		let s = Date.now();
		s >= a + r && (a = s, await n());
	}
	return i;
}
function s(e) {
	return e.then(void 0, () => void 0), e;
}
function c(e, t) {
	for (let n = 0, r = e.length; n < r; ++n) if (e[n] === t) return !0;
	return !1;
}
function l(e, t) {
	return !c(e, t);
}
function u(e) {
	return parseInt(e);
}
function d(e) {
	return parseFloat(e);
}
function f(e, t) {
	return typeof e == "number" && isNaN(e) ? t : e;
}
function p(e) {
	return e.reduce((e, t) => e + +!!t, 0);
}
function m(e, t = 1) {
	if (Math.abs(t) >= 1) return Math.round(e / t) * t;
	{
		let n = 1 / t;
		return Math.round(e * n) / n;
	}
}
function ee(e) {
	let t = `Unexpected syntax '${e}'`, n = /^\s*([a-z-]*)(.*)$/i.exec(e), r = n[1] || void 0, i = {}, a = /([.:#][\w-]+|\[.+?\])/gi, o = (e, t) => {
		i[e] = i[e] || [], i[e].push(t);
	};
	for (;;) {
		let e = a.exec(n[2]);
		if (!e) break;
		let r = e[0];
		switch (r[0]) {
			case ".":
				o("class", r.slice(1));
				break;
			case "#":
				o("id", r.slice(1));
				break;
			case "[": {
				let e = /^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(r);
				if (e) o(e[1], e[4] ?? e[5] ?? "");
				else throw Error(t);
				break;
			}
			default: throw Error(t);
		}
	}
	return [r, i];
}
function te(e) {
	let t = new Uint8Array(e.length);
	for (let n = 0; n < e.length; n++) {
		let r = e.charCodeAt(n);
		if (r > 127) return new TextEncoder().encode(e);
		t[n] = r;
	}
	return t;
}
function h(e, t) {
	let n = e[0] >>> 16, r = e[0] & 65535, i = e[1] >>> 16, a = e[1] & 65535, o = t[0] >>> 16, s = t[0] & 65535, c = t[1] >>> 16, l = t[1] & 65535, u = 0, d = 0, f = 0, p = 0;
	p += a + l, f += p >>> 16, p &= 65535, f += i + c, d += f >>> 16, f &= 65535, d += r + s, u += d >>> 16, d &= 65535, u += n + o, u &= 65535, e[0] = u << 16 | d, e[1] = f << 16 | p;
}
function g(e, t) {
	let n = e[0] >>> 16, r = e[0] & 65535, i = e[1] >>> 16, a = e[1] & 65535, o = t[0] >>> 16, s = t[0] & 65535, c = t[1] >>> 16, l = t[1] & 65535, u = 0, d = 0, f = 0, p = 0;
	p += a * l, f += p >>> 16, p &= 65535, f += i * l, d += f >>> 16, f &= 65535, f += a * c, d += f >>> 16, f &= 65535, d += r * l, u += d >>> 16, d &= 65535, d += i * c, u += d >>> 16, d &= 65535, d += a * s, u += d >>> 16, d &= 65535, u += n * l + r * c + i * s + a * o, u &= 65535, e[0] = u << 16 | d, e[1] = f << 16 | p;
}
function ne(e, t) {
	let n = e[0];
	t %= 64, t === 32 ? (e[0] = e[1], e[1] = n) : t < 32 ? (e[0] = n << t | e[1] >>> 32 - t, e[1] = e[1] << t | n >>> 32 - t) : (t -= 32, e[0] = e[1] << t | n >>> 32 - t, e[1] = n << t | e[1] >>> 32 - t);
}
function _(e, t) {
	t %= 64, t !== 0 && (t < 32 ? (e[0] = e[1] >>> 32 - t, e[1] <<= t) : (e[0] = e[1] << t - 32, e[1] = 0));
}
function v(e, t) {
	e[0] ^= t[0], e[1] ^= t[1];
}
var re = [4283543511, 3981806797], ie = [3301882366, 444984403];
function ae(e) {
	let t = [0, e[0] >>> 1];
	v(e, t), g(e, re), t[1] = e[0] >>> 1, v(e, t), g(e, ie), t[1] = e[0] >>> 1, v(e, t);
}
var oe = [2277735313, 289559509], se = [1291169091, 658871167], ce = [0, 5], le = [0, 1390208809], ue = [0, 944331445];
function de(e, t) {
	let n = te(e);
	t ||= 0;
	let r = [0, n.length], i = r[1] % 16, a = r[1] - i, o = [0, t], s = [0, t], c = [0, 0], l = [0, 0], u;
	for (u = 0; u < a; u += 16) c[0] = n[u + 4] | n[u + 5] << 8 | n[u + 6] << 16 | n[u + 7] << 24, c[1] = n[u] | n[u + 1] << 8 | n[u + 2] << 16 | n[u + 3] << 24, l[0] = n[u + 12] | n[u + 13] << 8 | n[u + 14] << 16 | n[u + 15] << 24, l[1] = n[u + 8] | n[u + 9] << 8 | n[u + 10] << 16 | n[u + 11] << 24, g(c, oe), ne(c, 31), g(c, se), v(o, c), ne(o, 27), h(o, s), g(o, ce), h(o, le), g(l, se), ne(l, 33), g(l, oe), v(s, l), ne(s, 31), h(s, o), g(s, ce), h(s, ue);
	c[0] = 0, c[1] = 0, l[0] = 0, l[1] = 0;
	let d = [0, 0];
	switch (i) {
		case 15: d[1] = n[u + 14], _(d, 48), v(l, d);
		case 14: d[1] = n[u + 13], _(d, 40), v(l, d);
		case 13: d[1] = n[u + 12], _(d, 32), v(l, d);
		case 12: d[1] = n[u + 11], _(d, 24), v(l, d);
		case 11: d[1] = n[u + 10], _(d, 16), v(l, d);
		case 10: d[1] = n[u + 9], _(d, 8), v(l, d);
		case 9: d[1] = n[u + 8], v(l, d), g(l, se), ne(l, 33), g(l, oe), v(s, l);
		case 8: d[1] = n[u + 7], _(d, 56), v(c, d);
		case 7: d[1] = n[u + 6], _(d, 48), v(c, d);
		case 6: d[1] = n[u + 5], _(d, 40), v(c, d);
		case 5: d[1] = n[u + 4], _(d, 32), v(c, d);
		case 4: d[1] = n[u + 3], _(d, 24), v(c, d);
		case 3: d[1] = n[u + 2], _(d, 16), v(c, d);
		case 2: d[1] = n[u + 1], _(d, 8), v(c, d);
		case 1: d[1] = n[u], v(c, d), g(c, oe), ne(c, 31), g(c, se), v(o, c);
	}
	return v(o, r), v(s, r), h(o, s), h(s, o), ae(o), ae(s), h(o, s), h(s, o), ("00000000" + (o[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (o[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (s[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (s[1] >>> 0).toString(16)).slice(-8);
}
function fe(e) {
	return {
		name: e.name,
		message: e.message,
		stack: e.stack?.split("\n"),
		...e
	};
}
function pe(e) {
	return /^function\s.*?\{\s*\[native code]\s*}$/.test(String(e));
}
function me(e) {
	return typeof e != "function";
}
function he(e, t) {
	let n = s(new Promise((n) => {
		let r = Date.now();
		a(e.bind(null, t), (...e) => {
			let t = Date.now() - r;
			if (!e[0]) return n(() => ({
				error: e[1],
				duration: t
			}));
			let i = e[1];
			if (me(i)) return n(() => ({
				value: i,
				duration: t
			}));
			n(() => new Promise((e) => {
				let n = Date.now();
				a(i, (...r) => {
					let i = t + Date.now() - n;
					if (!r[0]) return e({
						error: r[1],
						duration: i
					});
					e({
						value: r[1],
						duration: i
					});
				});
			}));
		});
	}));
	return function() {
		return n.then((e) => e());
	};
}
function ge(e, t, n, r) {
	let i = Object.keys(e).filter((e) => l(n, e)), a = s(o(i, (n) => he(e[n], t), r));
	return async function() {
		let e = await o(await a, (e) => s(e()), r), t = await Promise.all(e), n = {};
		for (let e = 0; e < i.length; ++e) n[i[e]] = t[e];
		return n;
	};
}
function _e() {
	let e = window, t = navigator;
	return p([
		"MSCSSMatrix" in e,
		"msSetImmediate" in e,
		"msIndexedDB" in e,
		"msMaxTouchPoints" in t,
		"msPointerEnabled" in t
	]) >= 4;
}
function ve() {
	let e = window, t = navigator;
	return p([
		"msWriteProfilerMark" in e,
		"MSStream" in e,
		"msLaunchUri" in t,
		"msSaveBlob" in t
	]) >= 3 && !_e();
}
function ye() {
	let e = window, t = navigator;
	return p([
		"webkitPersistentStorage" in t,
		"webkitTemporaryStorage" in t,
		(t.vendor || "").indexOf("Google") === 0,
		"webkitResolveLocalFileSystemURL" in e,
		"BatteryManager" in e,
		"webkitMediaStream" in e,
		"webkitSpeechGrammar" in e
	]) >= 5;
}
function y() {
	let e = window, t = navigator;
	return p([
		"ApplePayError" in e,
		"CSSPrimitiveValue" in e,
		"Counter" in e,
		t.vendor.indexOf("Apple") === 0,
		"RGBColor" in e,
		"WebKitMediaKeys" in e
	]) >= 4;
}
function be() {
	let e = window, { HTMLElement: t, Document: n } = e;
	return p([
		"safari" in e,
		!("ongestureend" in e),
		!("TouchEvent" in e),
		!("orientation" in e),
		t && !("autocapitalize" in t.prototype),
		n && "pointerLockElement" in n.prototype
	]) >= 4;
}
function xe() {
	let e = window;
	return pe(e.print) && String(e.browser) === "[object WebPageNamespace]";
}
function Se() {
	let e = window;
	return p([
		"buildID" in navigator,
		"MozAppearance" in (document.documentElement?.style ?? {}),
		"onmozfullscreenchange" in e,
		"mozInnerScreenX" in e,
		"CSSMozDocumentRule" in e,
		"CanvasCaptureMediaStream" in e
	]) >= 4;
}
function Ce() {
	let e = window, t = navigator, { CSS: n } = e;
	return p([
		"userActivation" in t,
		n.supports("color", "light-dark(#000, #fff)"),
		n.supports("height", "1lh"),
		"globalPrivacyControl" in t
	]) >= 3;
}
function we() {
	let { CSS: e } = window;
	return p([
		e.supports("selector(::details-content)"),
		e.supports("selector(::before::marker)"),
		e.supports("selector(::after::marker)"),
		!("locale" in CompositionEvent.prototype)
	]) >= 3;
}
function Te() {
	let e = window;
	return p([
		!("MediaSettingsRange" in e),
		"RTCEncodedAudioFrame" in e,
		"" + e.Intl == "[object Intl]",
		"" + e.Reflect == "[object Reflect]"
	]) >= 3;
}
function Ee() {
	let e = window, { URLPattern: t } = e;
	return p([
		"union" in Set.prototype,
		"Iterator" in e,
		t && "hasRegExpGroups" in t.prototype,
		"RGB8" in WebGLRenderingContext.prototype
	]) >= 3;
}
function De() {
	let e = window, t = document, { CSS: n, Promise: r, AudioContext: i } = e;
	return p([
		r && "try" in r,
		"caretPositionFromPoint" in t,
		i && "onerror" in i.prototype,
		n.supports("ruby-align", "space-around")
	]) >= 3;
}
function Oe() {
	let e = window;
	return p([
		"DOMRectList" in e,
		"RTCPeerConnectionIceEvent" in e,
		"SVGGeometryElement" in e,
		"ontransitioncancel" in e
	]) >= 3;
}
function ke() {
	let e = window, t = navigator, { CSS: n, HTMLButtonElement: r } = e;
	return p([
		!("getStorageUpdates" in t),
		r && "popover" in r.prototype,
		"CSSCounterStyleRule" in e,
		n.supports("font-size-adjust: ex-height 0.5"),
		n.supports("text-transform: full-width")
	]) >= 4;
}
function Ae() {
	if (navigator.platform === "iPad") return !0;
	let e = screen, t = e.width / e.height;
	return p([
		"MediaSource" in window,
		!!Element.prototype.webkitRequestFullscreen,
		t > .65 && t < 1.53
	]) >= 2;
}
function je() {
	let e = document;
	return e.fullscreenElement || e.msFullscreenElement || e.mozFullScreenElement || e.webkitFullscreenElement || null;
}
function Me() {
	let e = document;
	return (e.exitFullscreen || e.msExitFullscreen || e.mozCancelFullScreen || e.webkitExitFullscreen).call(e);
}
function Ne() {
	let e = ye(), t = Se(), n = window, r = navigator, i = "connection";
	return e ? p([
		!("SharedWorker" in n),
		r[i] && "ontypechange" in r[i],
		!("sinkId" in new Audio())
	]) >= 2 : t ? p([
		"onorientationchange" in n,
		"orientation" in n,
		/android/i.test(r.appVersion)
	]) >= 2 : !1;
}
function Pe() {
	let e = navigator, t = window, n = Audio.prototype, { visualViewport: r } = t;
	return p([
		"srLatency" in n,
		"srChannelCount" in n,
		"devicePosture" in e,
		r && "segments" in r,
		"getTextInformation" in Image.prototype
	]) >= 3;
}
function Fe() {
	return Re() ? -4 : Ie();
}
function Ie() {
	let e = window, t = e.OfflineAudioContext || e.webkitOfflineAudioContext;
	if (!t) return -2;
	if (Le()) return -1;
	let n = new t(1, 5e3, 44100), r = n.createOscillator();
	r.type = "triangle", r.frequency.value = 1e4;
	let i = n.createDynamicsCompressor();
	i.threshold.value = -50, i.knee.value = 40, i.ratio.value = 12, i.attack.value = 0, i.release.value = .25, r.connect(i), i.connect(n.destination), r.start(0);
	let [a, o] = ze(n), c = s(a.then((e) => Be(e.getChannelData(0).subarray(4500)), (e) => {
		if (e.name === "timeout" || e.name === "suspended") return -3;
		throw e;
	}));
	return () => (o(), c);
}
function Le() {
	return y() && !be() && !Oe();
}
function Re() {
	return y() && ke() && xe() || ye() && Pe() && Ee();
}
function ze(e) {
	let t = () => void 0;
	return [new Promise((n, r) => {
		let a = !1, o = 0, c = 0;
		e.oncomplete = (e) => n(e.renderedBuffer);
		let l = () => {
			setTimeout(() => r(Ve("timeout")), Math.min(500, c + 5e3 - Date.now()));
		}, u = () => {
			try {
				let t = e.startRendering();
				switch (i(t) && s(t), e.state) {
					case "running":
						c = Date.now(), a && l();
						break;
					case "suspended":
						document.hidden || o++, a && o >= 3 ? r(Ve("suspended")) : setTimeout(u, 500);
						break;
				}
			} catch (e) {
				r(e);
			}
		};
		u(), t = () => {
			a || (a = !0, c > 0 && l());
		};
	}), t];
}
function Be(e) {
	let t = 0;
	for (let n = 0; n < e.length; ++n) t += Math.abs(e[n]);
	return t;
}
function Ve(e) {
	let t = Error(e);
	return t.name = e, t;
}
async function He(e, n, r = 50) {
	var i;
	let a = document;
	for (; !a.body;) await t(r);
	let o = a.createElement("iframe");
	try {
		for (await new Promise((e, t) => {
			let r = !1, i = () => {
				r = !0, e();
			};
			o.onload = i, o.onerror = (e) => {
				r = !0, t(e);
			};
			let { style: s } = o;
			s.setProperty("display", "block", "important"), s.position = "absolute", s.top = "0", s.left = "0", s.visibility = "hidden", n && "srcdoc" in o ? o.srcdoc = n : o.src = "about:blank", a.body.appendChild(o);
			let c = () => {
				r || (o.contentWindow?.document?.readyState === "complete" ? i() : setTimeout(c, 10));
			};
			c();
		}); !o.contentWindow?.document?.body;) await t(r);
		return await e(o, o.contentWindow);
	} finally {
		(i = o.parentNode) == null || i.removeChild(o);
	}
}
function Ue(e) {
	let [t, n] = ee(e), r = document.createElement(t ?? "div");
	for (let e of Object.keys(n)) {
		let t = n[e].join(" ");
		e === "style" ? We(r.style, t) : r.setAttribute(e, t);
	}
	return r;
}
function We(e, t) {
	for (let n of t.split(";")) {
		let t = /^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec(n);
		if (t) {
			let [, n, r, , i] = t;
			e.setProperty(n, r, i || "");
		}
	}
}
function Ge() {
	let e = window;
	for (;;) {
		let t = e.parent;
		if (!t || t === e) return !1;
		try {
			if (t.location.origin !== e.location.origin) return !0;
		} catch (e) {
			if (e instanceof Error && e.name === "SecurityError") return !0;
			throw e;
		}
		e = t;
	}
}
var Ke = "mmMwWLliI0O&1", qe = "48px", Je = [
	"monospace",
	"sans-serif",
	"serif"
], Ye = /* @__PURE__ */ "sans-serif-thin.ARNO PRO.Agency FB.Arabic Typesetting.Arial Unicode MS.AvantGarde Bk BT.BankGothic Md BT.Batang.Bitstream Vera Sans Mono.Calibri.Century.Century Gothic.Clarendon.EUROSTILE.Franklin Gothic.Futura Bk BT.Futura Md BT.GOTHAM.Gill Sans.HELV.Haettenschweiler.Helvetica Neue.Humanst521 BT.Leelawadee.Letter Gothic.Levenim MT.Lucida Bright.Lucida Sans.Menlo.MS Mincho.MS Outlook.MS Reference Specialty.MS UI Gothic.MT Extra.MYRIAD PRO.Marlett.Meiryo UI.Microsoft Uighur.Minion Pro.Monotype Corsiva.PMingLiU.Pristina.SCRIPTINA.Segoe UI Light.Serifa.SimHei.Small Fonts.Staccato222 BT.TRAJAN PRO.Univers CE 55 Medium.Vrinda.ZWAdobeF".split(".");
function Xe() {
	return He(async (e, { document: t }) => {
		let n = t.body;
		n.style.fontSize = qe;
		let r = t.createElement("div");
		r.style.setProperty("visibility", "hidden", "important");
		let i = {}, a = {}, o = (e) => {
			let n = t.createElement("span"), { style: i } = n;
			return i.position = "absolute", i.top = "0", i.left = "0", i.fontFamily = e, n.textContent = Ke, r.appendChild(n), n;
		}, s = (e, t) => o(`'${e}',${t}`), c = () => Je.map(o), l = () => {
			let e = {};
			for (let t of Ye) e[t] = Je.map((e) => s(t, e));
			return e;
		}, u = (e) => Je.some((t, n) => e[n].offsetWidth !== i[t] || e[n].offsetHeight !== a[t]), d = c(), f = l();
		n.appendChild(r);
		for (let e = 0; e < Je.length; e++) i[Je[e]] = d[e].offsetWidth, a[Je[e]] = d[e].offsetHeight;
		return Ye.filter((e) => u(f[e]));
	});
}
function Ze() {
	let e = navigator.plugins;
	if (!e) return;
	let t = [];
	for (let n = 0; n < e.length; ++n) {
		let r = e[n];
		if (!r) continue;
		let i = [];
		for (let e = 0; e < r.length; ++e) {
			let t = r[e];
			i.push({
				type: t.type,
				suffixes: t.suffixes
			});
		}
		t.push({
			name: r.name,
			description: r.description,
			mimeTypes: i
		});
	}
	return t;
}
function Qe() {
	return $e(st());
}
function $e(e) {
	let t = !1, n, r, [i, a] = et();
	return tt(i, a) ? (t = nt(a), e ? n = r = "skipped" : [n, r] = rt(i, a)) : n = r = "unsupported", {
		winding: t,
		geometry: n,
		text: r
	};
}
function et() {
	let e = document.createElement("canvas");
	return e.width = 1, e.height = 1, [e, e.getContext("2d")];
}
function tt(e, t) {
	return !!(t && e.toDataURL);
}
function nt(e) {
	return e.rect(0, 0, 10, 10), e.rect(2, 2, 6, 6), !e.isPointInPath(5, 5, "evenodd");
}
function rt(e, t) {
	it(e, t);
	let n = ot(e);
	return n === ot(e) ? (at(e, t), [ot(e), n]) : ["unstable", "unstable"];
}
function it(e, t) {
	e.width = 240, e.height = 60, t.textBaseline = "alphabetic", t.fillStyle = "#f60", t.fillRect(100, 1, 62, 20), t.fillStyle = "#069", t.font = "11pt \"Times New Roman\"";
	let n = `Cwm fjordbank gly ${String.fromCharCode(55357, 56835)}`;
	t.fillText(n, 2, 15), t.fillStyle = "rgba(102, 204, 0, 0.2)", t.font = "18pt Arial", t.fillText(n, 4, 45);
}
function at(e, t) {
	e.width = 122, e.height = 110, t.globalCompositeOperation = "multiply";
	for (let [e, n, r] of [
		[
			"#f2f",
			40,
			40
		],
		[
			"#2ff",
			80,
			40
		],
		[
			"#ff2",
			60,
			80
		]
	]) t.fillStyle = e, t.beginPath(), t.arc(n, r, 40, 0, Math.PI * 2, !0), t.closePath(), t.fill();
	t.fillStyle = "#f9c", t.arc(60, 60, 60, 0, Math.PI * 2, !0), t.arc(60, 60, 20, 0, Math.PI * 2, !0), t.fill("evenodd");
}
function ot(e) {
	return e.toDataURL();
}
function st() {
	let e = y() && ke() && xe(), t = Se() && Ce();
	return e || t;
}
function ct() {
	let e = navigator, t = 0, n;
	e.maxTouchPoints === void 0 ? e.msMaxTouchPoints !== void 0 && (t = e.msMaxTouchPoints) : t = u(e.maxTouchPoints);
	try {
		document.createEvent("TouchEvent"), n = !0;
	} catch {
		n = !1;
	}
	let r = "ontouchstart" in window;
	return {
		maxTouchPoints: t,
		touchEvent: n,
		touchStart: r
	};
}
function lt() {
	return navigator.oscpu;
}
function ut() {
	let e = navigator, t = [], n = e.language || e.userLanguage || e.browserLanguage || e.systemLanguage;
	if (n !== void 0 && t.push([n]), Array.isArray(e.languages)) ye() && Te() || t.push(e.languages);
	else if (typeof e.languages == "string") {
		let n = e.languages;
		n && t.push(n.split(","));
	}
	return t;
}
function dt() {
	return window.screen.colorDepth;
}
function ft() {
	return f(d(navigator.deviceMemory), void 0);
}
function pt() {
	if (!(y() && ke() && xe())) return mt();
}
function mt() {
	let e = screen, t = (e) => f(u(e), null), n = [t(e.width), t(e.height)];
	return n.sort().reverse(), n;
}
var ht = 2500, gt = 10, _t, vt;
function yt() {
	if (vt !== void 0) return;
	let e = () => {
		let t = St();
		Ct(t) ? vt = setTimeout(e, ht) : (_t = t, vt = void 0);
	};
	e();
}
function bt() {
	return yt(), async () => {
		let e = St();
		if (Ct(e)) {
			if (_t) return [..._t];
			je() && (await Me(), e = St());
		}
		return Ct(e) || (_t = e), e;
	};
}
function xt() {
	let e = y() && ke() && xe(), t = Se() && we();
	if (e || t) return () => Promise.resolve(void 0);
	let n = bt();
	return async () => {
		let e = await n(), t = (e) => e === null ? null : m(e, gt);
		return [
			t(e[0]),
			t(e[1]),
			t(e[2]),
			t(e[3])
		];
	};
}
function St() {
	let e = screen;
	return [
		f(d(e.availTop), null),
		f(d(e.width) - d(e.availWidth) - f(d(e.availLeft), 0), null),
		f(d(e.height) - d(e.availHeight) - f(d(e.availTop), 0), null),
		f(d(e.availLeft), null)
	];
}
function Ct(e) {
	for (let t = 0; t < 4; ++t) if (e[t]) return !1;
	return !0;
}
function wt() {
	let e = Tt();
	return e !== void 0 && Se() && we() ? e >= 8 ? 8 : 4 : e;
}
function Tt() {
	return f(u(navigator.hardwareConcurrency), void 0);
}
function Et() {
	let e = window.Intl?.DateTimeFormat;
	if (e) {
		let t = new e().resolvedOptions().timeZone;
		if (t) return t;
	}
	let t = -Dt();
	return `UTC${t >= 0 ? "+" : ""}${t}`;
}
function Dt() {
	let e = (/* @__PURE__ */ new Date()).getFullYear();
	return Math.max(d(new Date(e, 0, 1).getTimezoneOffset()), d(new Date(e, 6, 1).getTimezoneOffset()));
}
function Ot() {
	try {
		return !!window.sessionStorage;
	} catch {
		return !0;
	}
}
function kt() {
	try {
		return !!window.localStorage;
	} catch {
		return !0;
	}
}
function At() {
	if (!(_e() || ve())) try {
		return !!window.indexedDB;
	} catch {
		return !0;
	}
}
function jt() {
	return !!window.openDatabase;
}
function Mt() {
	return navigator.cpuClass;
}
function Nt() {
	let { platform: e } = navigator;
	return e === "MacIntel" && y() && !be() ? Ae() ? "iPad" : "iPhone" : e;
}
function Pt() {
	return navigator.vendor || "";
}
function Ft() {
	let e = [];
	for (let t of [
		"chrome",
		"safari",
		"__crWeb",
		"__gCrWeb",
		"yandex",
		"__yb",
		"__ybro",
		"__firefox__",
		"__edgeTrackingPreventionStatistics",
		"webkit",
		"oprt",
		"samsungAr",
		"ucweb",
		"UCShellJava",
		"puffinDevice"
	]) {
		let n = window[t];
		n && typeof n == "object" && e.push(t);
	}
	return e.sort();
}
function It() {
	let e = document;
	try {
		e.cookie = "cookietest=1; SameSite=Strict;";
		let t = e.cookie.indexOf("cookietest=") !== -1;
		return e.cookie = "cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT", t;
	} catch {
		return !1;
	}
}
function Lt() {
	let e = atob;
	return {
		abpIndo: [
			"#Iklan-Melayang",
			"#Kolom-Iklan-728",
			"#SidebarIklan-wrapper",
			"[title=\"ALIENBOLA\" i]",
			e("I0JveC1CYW5uZXItYWRz")
		],
		abpvn: [
			".quangcao",
			"#mobileCatfish",
			e("LmNsb3NlLWFkcw=="),
			"[id^=\"bn_bottom_fixed_\"]",
			"#pmadv"
		],
		adBlockFinland: [
			".mainostila",
			e("LnNwb25zb3JpdA=="),
			".ylamainos",
			e("YVtocmVmKj0iL2NsaWNrdGhyZ2guYXNwPyJd"),
			e("YVtocmVmXj0iaHR0cHM6Ly9hcHAucmVhZHBlYWsuY29tL2FkcyJd")
		],
		adBlockPersian: [
			"#navbar_notice_50",
			".kadr",
			"TABLE[width=\"140px\"]",
			"#divAgahi",
			e("YVtocmVmXj0iaHR0cDovL2cxLnYuZndtcm0ubmV0L2FkLyJd")
		],
		adBlockWarningRemoval: [
			"#adblock-honeypot",
			".adblocker-root",
			".wp_adblock_detect",
			e("LmhlYWRlci1ibG9ja2VkLWFk"),
			e("I2FkX2Jsb2NrZXI=")
		],
		adGuardAnnoyances: [
			".hs-sosyal",
			"#cookieconsentdiv",
			"div[class^=\"app_gdpr\"]",
			".as-oil",
			"[data-cypress=\"soft-push-notification-modal\"]"
		],
		adGuardBase: [
			".BetterJsPopOverlay",
			e("I2FkXzMwMFgyNTA="),
			e("I2Jhbm5lcmZsb2F0MjI="),
			e("I2NhbXBhaWduLWJhbm5lcg=="),
			e("I0FkLUNvbnRlbnQ=")
		],
		adGuardChinese: [
			e("LlppX2FkX2FfSA=="),
			e("YVtocmVmKj0iLmh0aGJldDM0LmNvbSJd"),
			"#widget-quan",
			e("YVtocmVmKj0iLzg0OTkyMDIwLnh5eiJd"),
			e("YVtocmVmKj0iLjE5NTZobC5jb20vIl0=")
		],
		adGuardFrench: [
			"#pavePub",
			e("LmFkLWRlc2t0b3AtcmVjdGFuZ2xl"),
			".mobile_adhesion",
			".widgetadv",
			e("LmFkc19iYW4=")
		],
		adGuardGerman: ["aside[data-portal-id=\"leaderboard\"]"],
		adGuardJapanese: [
			"#kauli_yad_1",
			e("YVtocmVmXj0iaHR0cDovL2FkMi50cmFmZmljZ2F0ZS5uZXQvIl0="),
			e("Ll9wb3BJbl9pbmZpbml0ZV9hZA=="),
			e("LmFkZ29vZ2xl"),
			e("Ll9faXNib29zdFJldHVybkFk")
		],
		adGuardMobile: [
			e("YW1wLWF1dG8tYWRz"),
			e("LmFtcF9hZA=="),
			"amp-embed[type=\"24smi\"]",
			"#mgid_iframe1",
			e("I2FkX2ludmlld19hcmVh")
		],
		adGuardRussian: [
			e("YVtocmVmXj0iaHR0cHM6Ly9hZC5sZXRtZWFkcy5jb20vIl0="),
			e("LnJlY2xhbWE="),
			"div[id^=\"smi2adblock\"]",
			e("ZGl2W2lkXj0iQWRGb3hfYmFubmVyXyJd"),
			"#psyduckpockeball"
		],
		adGuardSocial: [
			e("YVtocmVmXj0iLy93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9Il0="),
			e("YVtocmVmXj0iLy90ZWxlZ3JhbS5tZS9zaGFyZS91cmw/Il0="),
			".etsy-tweet",
			"#inlineShare",
			".popup-social"
		],
		adGuardSpanishPortuguese: [
			"#barraPublicidade",
			"#Publicidade",
			"#publiEspecial",
			"#queTooltip",
			".cnt-publi"
		],
		adGuardTrackingProtection: [
			"#qoo-counter",
			e("YVtocmVmXj0iaHR0cDovL2NsaWNrLmhvdGxvZy5ydS8iXQ=="),
			e("YVtocmVmXj0iaHR0cDovL2hpdGNvdW50ZXIucnUvdG9wL3N0YXQucGhwIl0="),
			e("YVtocmVmXj0iaHR0cDovL3RvcC5tYWlsLnJ1L2p1bXAiXQ=="),
			"#top100counter"
		],
		adGuardTurkish: [
			"#backkapat",
			e("I3Jla2xhbWk="),
			e("YVtocmVmXj0iaHR0cDovL2Fkc2Vydi5vbnRlay5jb20udHIvIl0="),
			e("YVtocmVmXj0iaHR0cDovL2l6bGVuemkuY29tL2NhbXBhaWduLyJd"),
			e("YVtocmVmXj0iaHR0cDovL3d3dy5pbnN0YWxsYWRzLm5ldC8iXQ==")
		],
		bulgarian: [
			e("dGQjZnJlZW5ldF90YWJsZV9hZHM="),
			"#ea_intext_div",
			".lapni-pop-over",
			"#xenium_hot_offers"
		],
		easyList: [
			".yb-floorad",
			e("LndpZGdldF9wb19hZHNfd2lkZ2V0"),
			e("LnRyYWZmaWNqdW5reS1hZA=="),
			".textad_headline",
			e("LnNwb25zb3JlZC10ZXh0LWxpbmtz")
		],
		easyListChina: [
			e("LmFwcGd1aWRlLXdyYXBbb25jbGljayo9ImJjZWJvcy5jb20iXQ=="),
			e("LmZyb250cGFnZUFkdk0="),
			"#taotaole",
			"#aafoot.top_box",
			".cfa_popup"
		],
		easyListCookie: [
			".ezmob-footer",
			".cc-CookieWarning",
			"[data-cookie-number]",
			e("LmF3LWNvb2tpZS1iYW5uZXI="),
			".sygnal24-gdpr-modal-wrap"
		],
		easyListCzechSlovak: [
			"#onlajny-stickers",
			e("I3Jla2xhbW5pLWJveA=="),
			e("LnJla2xhbWEtbWVnYWJvYXJk"),
			".sklik",
			e("W2lkXj0ic2tsaWtSZWtsYW1hIl0=")
		],
		easyListDutch: [
			e("I2FkdmVydGVudGll"),
			e("I3ZpcEFkbWFya3RCYW5uZXJCbG9jaw=="),
			".adstekst",
			e("YVtocmVmXj0iaHR0cHM6Ly94bHR1YmUubmwvY2xpY2svIl0="),
			"#semilo-lrectangle"
		],
		easyListGermany: [
			"#SSpotIMPopSlider",
			e("LnNwb25zb3JsaW5rZ3J1ZW4="),
			e("I3dlcmJ1bmdza3k="),
			e("I3Jla2xhbWUtcmVjaHRzLW1pdHRl"),
			e("YVtocmVmXj0iaHR0cHM6Ly9iZDc0Mi5jb20vIl0=")
		],
		easyListItaly: [
			e("LmJveF9hZHZfYW5udW5jaQ=="),
			".sb-box-pubbliredazionale",
			e("YVtocmVmXj0iaHR0cDovL2FmZmlsaWF6aW9uaWFkcy5zbmFpLml0LyJd"),
			e("YVtocmVmXj0iaHR0cHM6Ly9hZHNlcnZlci5odG1sLml0LyJd"),
			e("YVtocmVmXj0iaHR0cHM6Ly9hZmZpbGlhemlvbmlhZHMuc25haS5pdC8iXQ==")
		],
		easyListLithuania: [
			e("LnJla2xhbW9zX3RhcnBhcw=="),
			e("LnJla2xhbW9zX251b3JvZG9z"),
			e("aW1nW2FsdD0iUmVrbGFtaW5pcyBza3lkZWxpcyJd"),
			e("aW1nW2FsdD0iRGVkaWt1b3RpLmx0IHNlcnZlcmlhaSJd"),
			e("aW1nW2FsdD0iSG9zdGluZ2FzIFNlcnZlcmlhaS5sdCJd")
		],
		estonian: [e("QVtocmVmKj0iaHR0cDovL3BheTRyZXN1bHRzMjQuZXUiXQ==")],
		fanboyAnnoyances: [
			"#ac-lre-player",
			".navigate-to-top",
			"#subscribe_popup",
			".newsletter_holder",
			"#back-top"
		],
		fanboyAntiFacebook: [".util-bar-module-firefly-visible"],
		fanboyEnhancedTrackers: [
			".open.pushModal",
			"#issuem-leaky-paywall-articles-zero-remaining-nag",
			"#sovrn_container",
			"div[class$=\"-hide\"][zoompage-fontsize][style=\"display: block;\"]",
			".BlockNag__Card"
		],
		fanboySocial: [
			"#FollowUs",
			"#meteored_share",
			"#social_follow",
			".article-sharer",
			".community__social-desc"
		],
		frellwitSwedish: [
			e("YVtocmVmKj0iY2FzaW5vcHJvLnNlIl1bdGFyZ2V0PSJfYmxhbmsiXQ=="),
			e("YVtocmVmKj0iZG9rdG9yLXNlLm9uZWxpbmsubWUiXQ=="),
			"article.category-samarbete",
			e("ZGl2LmhvbGlkQWRz"),
			"ul.adsmodern"
		],
		greekAdBlock: [
			e("QVtocmVmKj0iYWRtYW4ub3RlbmV0LmdyL2NsaWNrPyJd"),
			e("QVtocmVmKj0iaHR0cDovL2F4aWFiYW5uZXJzLmV4b2R1cy5nci8iXQ=="),
			e("QVtocmVmKj0iaHR0cDovL2ludGVyYWN0aXZlLmZvcnRobmV0LmdyL2NsaWNrPyJd"),
			"DIV.agores300",
			"TABLE.advright"
		],
		hungarian: [
			"#cemp_doboz",
			".optimonk-iframe-container",
			e("LmFkX19tYWlu"),
			e("W2NsYXNzKj0iR29vZ2xlQWRzIl0="),
			"#hirdetesek_box"
		],
		iDontCareAboutCookies: [
			".alert-info[data-block-track*=\"CookieNotice\"]",
			".ModuleTemplateCookieIndicator",
			".o--cookies--container",
			"#cookies-policy-sticky",
			"#stickyCookieBar"
		],
		icelandicAbp: [e("QVtocmVmXj0iL2ZyYW1ld29yay9yZXNvdXJjZXMvZm9ybXMvYWRzLmFzcHgiXQ==")],
		latvian: [e("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMjBweDsgaGVpZ2h0OiA0MHB4OyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7Il0="), e("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDMxcHg7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsiXQ==")],
		listKr: [
			e("YVtocmVmKj0iLy9hZC5wbGFuYnBsdXMuY28ua3IvIl0="),
			e("I2xpdmVyZUFkV3JhcHBlcg=="),
			e("YVtocmVmKj0iLy9hZHYuaW1hZHJlcC5jby5rci8iXQ=="),
			e("aW5zLmZhc3R2aWV3LWFk"),
			".revenue_unit_item.dable"
		],
		listeAr: [
			e("LmdlbWluaUxCMUFk"),
			".right-and-left-sponsers",
			e("YVtocmVmKj0iLmFmbGFtLmluZm8iXQ=="),
			e("YVtocmVmKj0iYm9vcmFxLm9yZyJd"),
			e("YVtocmVmKj0iZHViaXp6bGUuY29tL2FyLz91dG1fc291cmNlPSJd")
		],
		listeFr: [
			e("YVtocmVmXj0iaHR0cDovL3Byb21vLnZhZG9yLmNvbS8iXQ=="),
			e("I2FkY29udGFpbmVyX3JlY2hlcmNoZQ=="),
			e("YVtocmVmKj0id2Vib3JhbWEuZnIvZmNnaS1iaW4vIl0="),
			".site-pub-interstitiel",
			"div[id^=\"crt-\"][data-criteo-id]"
		],
		officialPolish: [
			"#ceneo-placeholder-ceneo-12",
			e("W2hyZWZePSJodHRwczovL2FmZi5zZW5kaHViLnBsLyJd"),
			e("YVtocmVmXj0iaHR0cDovL2Fkdm1hbmFnZXIudGVjaGZ1bi5wbC9yZWRpcmVjdC8iXQ=="),
			e("YVtocmVmXj0iaHR0cDovL3d3dy50cml6ZXIucGwvP3V0bV9zb3VyY2UiXQ=="),
			e("ZGl2I3NrYXBpZWNfYWQ=")
		],
		ro: [
			e("YVtocmVmXj0iLy9hZmZ0cmsuYWx0ZXgucm8vQ291bnRlci9DbGljayJd"),
			e("YVtocmVmXj0iaHR0cHM6Ly9ibGFja2ZyaWRheXNhbGVzLnJvL3Ryay9zaG9wLyJd"),
			e("YVtocmVmXj0iaHR0cHM6Ly9ldmVudC4ycGVyZm9ybWFudC5jb20vZXZlbnRzL2NsaWNrIl0="),
			e("YVtocmVmXj0iaHR0cHM6Ly9sLnByb2ZpdHNoYXJlLnJvLyJd"),
			"a[href^=\"/url/\"]"
		],
		ruAd: [
			e("YVtocmVmKj0iLy9mZWJyYXJlLnJ1LyJd"),
			e("YVtocmVmKj0iLy91dGltZy5ydS8iXQ=="),
			e("YVtocmVmKj0iOi8vY2hpa2lkaWtpLnJ1Il0="),
			"#pgeldiz",
			".yandex-rtb-block"
		],
		thaiAds: [
			"a[href*=macau-uta-popup]",
			e("I2Fkcy1nb29nbGUtbWlkZGxlX3JlY3RhbmdsZS1ncm91cA=="),
			e("LmFkczMwMHM="),
			".bumq",
			".img-kosana"
		],
		webAnnoyancesUltralist: [
			"#mod-social-share-2",
			"#social-tools",
			e("LmN0cGwtZnVsbGJhbm5lcg=="),
			".zergnet-recommend",
			".yt.btn-link.btn-md.btn"
		]
	};
}
async function Rt({ debug: e } = {}) {
	if (!zt()) return;
	let t = Lt(), n = Object.keys(t), r = await Bt([].concat(...n.map((e) => t[e])));
	e && Ht(t, r);
	let i = n.filter((e) => {
		let n = t[e];
		return p(n.map((e) => r[e])) > n.length * .6;
	});
	return i.sort(), i;
}
function zt() {
	return y() || Ne();
}
async function Bt(e) {
	var n;
	let r = document, i = r.createElement("div"), a = Array(e.length), o = {};
	Vt(i);
	for (let t = 0; t < e.length; ++t) {
		let n = Ue(e[t]);
		n.tagName === "DIALOG" && n.show();
		let o = r.createElement("div");
		Vt(o), o.appendChild(n), i.appendChild(o), a[t] = n;
	}
	for (; !r.body;) await t(50);
	r.body.appendChild(i);
	try {
		for (let t = 0; t < e.length; ++t) a[t].offsetParent || (o[e[t]] = !0);
	} finally {
		(n = i.parentNode) == null || n.removeChild(i);
	}
	return o;
}
function Vt(e) {
	e.style.setProperty("visibility", "hidden", "important"), e.style.setProperty("display", "block", "important");
}
function Ht(e, t) {
	let n = "DOM blockers debug:\n```";
	for (let r of Object.keys(e)) {
		n += `\n${r}:`;
		for (let i of e[r]) n += `\n  ${t[i] ? "🚫" : "➡️"} ${i}`;
	}
	console.log(`${n}\n\`\`\``);
}
function Ut() {
	for (let e of [
		"rec2020",
		"p3",
		"srgb"
	]) if (matchMedia(`(color-gamut: ${e})`).matches) return e;
}
function Wt() {
	if (Gt("inverted")) return !0;
	if (Gt("none")) return !1;
}
function Gt(e) {
	return matchMedia(`(inverted-colors: ${e})`).matches;
}
function Kt() {
	if (qt("active")) return !0;
	if (qt("none")) return !1;
}
function qt(e) {
	return matchMedia(`(forced-colors: ${e})`).matches;
}
var Jt = 100;
function Yt() {
	if (matchMedia("(min-monochrome: 0)").matches) {
		for (let e = 0; e <= Jt; ++e) if (matchMedia(`(max-monochrome: ${e})`).matches) return e;
		throw Error("Too high value");
	}
}
function Xt() {
	if (b("no-preference")) return 0;
	if (b("high") || b("more")) return 1;
	if (b("low") || b("less")) return -1;
	if (b("forced")) return 10;
}
function b(e) {
	return matchMedia(`(prefers-contrast: ${e})`).matches;
}
function Zt() {
	if (Qt("reduce")) return !0;
	if (Qt("no-preference")) return !1;
}
function Qt(e) {
	return matchMedia(`(prefers-reduced-motion: ${e})`).matches;
}
function $t() {
	if (en("reduce")) return !0;
	if (en("no-preference")) return !1;
}
function en(e) {
	return matchMedia(`(prefers-reduced-transparency: ${e})`).matches;
}
function tn() {
	if (nn("high")) return !0;
	if (nn("standard")) return !1;
}
function nn(e) {
	return matchMedia(`(dynamic-range: ${e})`).matches;
}
var x = Math, S = () => 0;
function rn() {
	let e = x.acos || S, t = x.acosh || S, n = x.asin || S, r = x.asinh || S, i = x.atanh || S, a = x.atan || S, o = x.sin || S, s = x.sinh || S, c = x.cos || S, l = x.cosh || S, u = x.tan || S, d = x.tanh || S, f = x.exp || S, p = x.expm1 || S, m = x.log1p || S;
	return {
		acos: e(.12312423423423424),
		acosh: t(1e308),
		acoshPf: ((e) => x.log(e + x.sqrt(e * e - 1)))(1e154),
		asin: n(.12312423423423424),
		asinh: r(1),
		asinhPf: ((e) => x.log(e + x.sqrt(e * e + 1)))(1),
		atanh: i(.5),
		atanhPf: ((e) => x.log((1 + e) / (1 - e)) / 2)(.5),
		atan: a(.5),
		sin: o(-1e300),
		sinh: s(1),
		sinhPf: ((e) => x.exp(e) - 1 / x.exp(e) / 2)(1),
		cos: c(10.000000000123),
		cosh: l(1),
		coshPf: ((e) => (x.exp(e) + 1 / x.exp(e)) / 2)(1),
		tan: u(-1e300),
		tanh: d(1),
		tanhPf: ((e) => (x.exp(2 * e) - 1) / (x.exp(2 * e) + 1))(1),
		exp: f(1),
		expm1: p(1),
		expm1Pf: ((e) => x.exp(e) - 1)(1),
		log1p: m(10),
		log1pPf: ((e) => x.log(1 + e))(10),
		powPI: ((e) => x.pow(x.PI, e))(-100)
	};
}
var an = "mmMwWLliI0fiflO&1", on = {
	default: [],
	apple: [{ font: "-apple-system-body" }],
	serif: [{ fontFamily: "serif" }],
	sans: [{ fontFamily: "sans-serif" }],
	mono: [{ fontFamily: "monospace" }],
	min: [{ fontSize: "1px" }],
	system: [{ fontFamily: "system-ui" }]
};
function sn() {
	return ln((e, t, n) => {
		let r = {}, i = {};
		for (let n of Object.keys(on)) {
			let [i = {}, a = an] = on[n], o = e.createElement("span");
			o.textContent = a, o.style.whiteSpace = "nowrap";
			for (let e of Object.keys(i)) {
				let t = i[e];
				t !== void 0 && (o.style[e] = t);
			}
			r[n] = o, t.append(e.createElement("br"), o);
		}
		let a = ye() && De();
		for (let e of Object.keys(on)) {
			let t = r[e].getBoundingClientRect().width;
			i[e] = a ? cn(t * n.devicePixelRatio) : t;
		}
		return i;
	});
}
function cn(e) {
	let t = 10 ** (Ne() ? 0 : 3);
	return Math.floor(e * t) / t;
}
function ln(e, t = 4e3) {
	return He((n, r) => {
		let i = r.document, a = i.body, o = a.style;
		o.width = `${t}px`, o.webkitTextSizeAdjust = o.textSizeAdjust = "none", ye() ? a.style.zoom = `${1 / r.devicePixelRatio}` : y() && (a.style.zoom = "reset");
		let s = i.createElement("div");
		return s.textContent = [...Array(t / 20 << 0)].map(() => "word").join(" "), a.appendChild(s), e(i, a, r);
	}, "<!doctype html><html><head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
}
function un() {
	return navigator.pdfViewerEnabled;
}
function dn() {
	let e = new Float32Array(1), t = new Uint8Array(e.buffer);
	return e[0] = Infinity, e[0] -= e[0], t[3];
}
function fn() {
	let { ApplePaySession: e } = window;
	if (typeof e?.canMakePayments != "function") return -1;
	if (pn()) return -3;
	try {
		return +!!e.canMakePayments();
	} catch (e) {
		return mn(e);
	}
}
var pn = Ge;
function mn(e) {
	if (e instanceof Error && e.name === "InvalidAccessError" && /\bfrom\b.*\binsecure\b/i.test(e.message)) return -2;
	throw e;
}
function hn() {
	let e = document.createElement("a"), t = e.attributionSourceId ?? e.attributionsourceid;
	return t === void 0 ? void 0 : String(t);
}
var gn = -1, _n = -2, vn = new Set([
	10752,
	2849,
	2884,
	2885,
	2886,
	2928,
	2929,
	2930,
	2931,
	2932,
	2960,
	2961,
	2962,
	2963,
	2964,
	2965,
	2966,
	2967,
	2968,
	2978,
	3024,
	3042,
	3088,
	3089,
	3106,
	3107,
	32773,
	32777,
	32777,
	32823,
	32824,
	32936,
	32937,
	32938,
	32939,
	32968,
	32969,
	32970,
	32971,
	3317,
	33170,
	3333,
	3379,
	3386,
	33901,
	33902,
	34016,
	34024,
	34076,
	3408,
	3410,
	3411,
	3412,
	3413,
	3414,
	3415,
	34467,
	34816,
	34817,
	34818,
	34819,
	34877,
	34921,
	34930,
	35660,
	35661,
	35724,
	35738,
	35739,
	36003,
	36004,
	36005,
	36347,
	36348,
	36349,
	37440,
	37441,
	37443,
	7936,
	7937,
	7938
]), yn = new Set([
	34047,
	35723,
	36063,
	34852,
	34853,
	34854,
	34229,
	36392,
	36795,
	38449
]), bn = ["FRAGMENT_SHADER", "VERTEX_SHADER"], xn = [
	"LOW_FLOAT",
	"MEDIUM_FLOAT",
	"HIGH_FLOAT",
	"LOW_INT",
	"MEDIUM_INT",
	"HIGH_INT"
], Sn = "WEBGL_debug_renderer_info", Cn = "WEBGL_polygon_mode";
function wn({ cache: e }) {
	let t = En(e);
	if (!t) return gn;
	if (!Mn(t)) return _n;
	let n = An() ? null : t.getExtension(Sn);
	return {
		version: t.getParameter(t.VERSION)?.toString() || "",
		vendor: t.getParameter(t.VENDOR)?.toString() || "",
		vendorUnmasked: n ? t.getParameter(n.UNMASKED_VENDOR_WEBGL)?.toString() : "",
		renderer: t.getParameter(t.RENDERER)?.toString() || "",
		rendererUnmasked: n ? t.getParameter(n.UNMASKED_RENDERER_WEBGL)?.toString() : "",
		shadingLanguageVersion: t.getParameter(t.SHADING_LANGUAGE_VERSION)?.toString() || ""
	};
}
function Tn({ cache: e }) {
	let t = En(e);
	if (!t) return gn;
	if (!Mn(t)) return _n;
	let n = t.getSupportedExtensions(), r = t.getContextAttributes(), i = [], a = [], o = [], s = [], c = [];
	if (r) for (let e of Object.keys(r)) a.push(`${e}=${r[e]}`);
	let l = On(t);
	for (let e of l) {
		let n = t[e];
		o.push(`${e}=${n}${vn.has(n) ? `=${t.getParameter(n)}` : ""}`);
	}
	if (n) for (let e of n) {
		if (e === Sn && An() || e === Cn && jn()) continue;
		let n = t.getExtension(e);
		if (!n) {
			i.push(e);
			continue;
		}
		for (let e of On(n)) {
			let r = n[e];
			s.push(`${e}=${r}${yn.has(r) ? `=${t.getParameter(r)}` : ""}`);
		}
	}
	for (let e of bn) for (let n of xn) {
		let r = Dn(t, e, n);
		c.push(`${e}.${n}=${r.join(",")}`);
	}
	return s.sort(), o.sort(), {
		contextAttributes: a,
		parameters: o,
		shaderPrecisions: c,
		extensions: n,
		extensionParameters: s,
		unsupportedExtensions: i
	};
}
function En(e) {
	if (e.webgl) return e.webgl.context;
	let t = document.createElement("canvas"), n;
	t.addEventListener("webglCreateContextError", () => n = void 0);
	for (let e of ["webgl", "experimental-webgl"]) {
		try {
			n = t.getContext(e);
		} catch {}
		if (n) break;
	}
	return e.webgl = { context: n }, n;
}
function Dn(e, t, n) {
	let r = e.getShaderPrecisionFormat(e[t], e[n]);
	return r ? [
		r.rangeMin,
		r.rangeMax,
		r.precision
	] : [];
}
function On(e) {
	return Object.keys(e.__proto__).filter(kn);
}
function kn(e) {
	return typeof e == "string" && !e.match(/[^A-Z0-9_x]/);
}
function An() {
	return Se();
}
function jn() {
	return ye() || y();
}
function Mn(e) {
	return typeof e.getParameter == "function";
}
function Nn() {
	if (!(Ne() || y())) return -2;
	if (!window.AudioContext) return -1;
	let e = new AudioContext().baseLatency;
	return e == null ? -1 : isFinite(e) ? e : -3;
}
function Pn() {
	if (!window.Intl) return -1;
	let e = window.Intl.DateTimeFormat;
	if (!e) return -2;
	let t = e().resolvedOptions().locale;
	return !t && t !== "" ? -3 : t;
}
function Fn(e) {
	return /not/i.test(e);
}
async function In() {
	let e = navigator.userAgentData;
	if (!e) return;
	let t = e.brands.filter(({ brand: e }) => !Fn(e)).map(({ brand: e }) => e), n = {
		brands: t.length > 1 ? t.filter((e) => e !== "Chromium") : t,
		mobile: e.mobile,
		platform: e.platform
	};
	if (e.getHighEntropyValues) try {
		let t = await e.getHighEntropyValues([
			"architecture",
			"bitness",
			"model",
			"platformVersion"
		]);
		n.architecture = t.architecture, n.bitness = t.bitness, n.model = t.model, n.platformVersion = t.platformVersion;
	} catch (e) {
		if (e instanceof DOMException && e.name === "NotAllowedError") n.highEntropyStatus = "not_allowed";
		else throw e;
	}
	return n;
}
var Ln = {
	userAgentData: In,
	fonts: Xe,
	domBlockers: Rt,
	fontPreferences: sn,
	audio: Fe,
	screenFrame: xt,
	canvas: Qe,
	osCpu: lt,
	languages: ut,
	colorDepth: dt,
	deviceMemory: ft,
	screenResolution: pt,
	hardwareConcurrency: wt,
	timezone: Et,
	sessionStorage: Ot,
	localStorage: kt,
	indexedDB: At,
	openDatabase: jt,
	cpuClass: Mt,
	platform: Nt,
	plugins: Ze,
	touchSupport: ct,
	vendor: Pt,
	vendorFlavors: Ft,
	cookiesEnabled: It,
	colorGamut: Ut,
	invertedColors: Wt,
	forcedColors: Kt,
	monochrome: Yt,
	contrast: Xt,
	reducedMotion: Zt,
	reducedTransparency: $t,
	hdr: tn,
	math: rn,
	pdfViewerEnabled: un,
	architecture: dn,
	applePay: fn,
	privateClickMeasurement: hn,
	audioBaseLatency: Nn,
	dateTimeLocale: Pn,
	webGlBasics: wn,
	webGlExtensions: Tn
};
function Rn(e) {
	return ge(Ln, e, []);
}
var zn = "$ if upgrade to Pro: https://fingerprint.com/github/?utm_source=oss&utm_medium=referral&utm_campaign=confidence_score";
function Bn(e) {
	let t = Vn(e), n = Hn(t);
	return {
		score: t,
		comment: zn.replace(/\$/g, `${n}`)
	};
}
function Vn(e) {
	if (Ne()) return .4;
	if (y()) return be() && !(ke() && xe()) ? .5 : .3;
	let t = "value" in e.platform ? e.platform.value : "";
	return /^Win/.test(t) ? .6 : /^Mac/.test(t) ? .5 : .7;
}
function Hn(e) {
	return m(.99 + .01 * e, 1e-4);
}
function Un(e) {
	let t = "";
	for (let n of Object.keys(e).sort()) {
		let r = e[n], i = "error" in r ? "error" : JSON.stringify(r.value);
		t += `${t ? "|" : ""}${n.replace(/([:|\\])/g, "\\$1")}:${i}`;
	}
	return t;
}
function Wn(e) {
	return JSON.stringify(e, (e, t) => t instanceof Error ? fe(t) : t, 2);
}
function Gn(e) {
	return de(Un(e));
}
function Kn(t) {
	let n;
	return {
		get visitorId() {
			return n === void 0 && (n = Gn(this.components)), n;
		},
		set visitorId(e) {
			n = e;
		},
		confidence: Bn(t),
		components: t,
		version: e
	};
}
function qn(e = 50) {
	return r(e, e * 2);
}
function Jn(e, t) {
	let n = Date.now();
	return { async get(r) {
		let i = Date.now(), a = await e(), o = Kn(a);
		return (t || r?.debug) && console.log(`Copy the text below to get the debug data:

\`\`\`
version: ${o.version}
userAgent: ${navigator.userAgent}
timeBetweenLoadAndGet: ${i - n}
visitorId: ${o.visitorId}
components: ${Wn(a)}
\`\`\``), o;
	} };
}
function Yn() {
	if (!(window.__fpjs_d_m || Math.random() >= .001)) try {
		let t = new XMLHttpRequest();
		t.open("get", `https://m1.openfpcdn.io/fingerprintjs/v${e}/npm-monitoring`, !0), t.send();
	} catch (e) {
		console.error(e);
	}
}
async function Xn(e = {}) {
	let { delayFallback: t, debug: n, monitoring: r = !0 } = e;
	return r && Yn(), await qn(t), Jn(Rn({
		cache: {},
		debug: n
	}), n);
}
var Zn = {
	load: Xn,
	hashComponents: Gn,
	componentsToDebugString: Wn
}, Qn = "2.0.9", $n = 500, er = "user-agent", C = "", tr = "?", w = {
	FUNCTION: "function",
	OBJECT: "object",
	STRING: "string",
	UNDEFINED: "undefined"
}, T = "browser", E = "cpu", D = "device", O = "engine", k = "os", nr = "result", A = "name", j = "type", M = "vendor", N = "version", P = "architecture", rr = "major", F = "model", ir = "console", I = "mobile", L = "tablet", R = "smarttv", z = "wearable", ar = "xr", or = "embedded", sr = "fetcher", B = "inapp", cr = "brands", V = "formFactors", lr = "fullVersionList", H = "platform", ur = "platformVersion", dr = "bitness", U = "sec-ch-ua", fr = U + "-full-version-list", pr = U + "-arch", mr = U + "-" + dr, hr = U + "-form-factors", gr = U + "-" + I, _r = U + "-" + F, vr = U + "-" + H, yr = vr + "-version", br = [
	cr,
	lr,
	I,
	F,
	H,
	ur,
	P,
	V,
	dr
], xr = "Amazon", Sr = "Apple", Cr = "ASUS", wr = "BlackBerry", W = "Google", Tr = "Huawei", Er = "Lenovo", Dr = "Honor", Or = "LG", kr = "Microsoft", Ar = "Motorola", jr = "Nvidia", Mr = "OnePlus", Nr = "OPPO", Pr = "Samsung", Fr = "Sharp", Ir = "Sony", Lr = "Xiaomi", Rr = "Zebra", zr = "Chrome", Br = "Chromium", G = "Chromecast", Vr = "Edge", Hr = "Firefox", Ur = "Opera", Wr = "Facebook", Gr = "Sogou", Kr = "Mobile ", K = " Browser", qr = "Windows", q = typeof window !== w.UNDEFINED && window.navigator ? window.navigator : void 0, J = q && q.userAgentData ? q.userAgentData : void 0, Jr = function(e, t) {
	var n = {}, r = t;
	if (!Zr(t)) for (var i in r = {}, t) for (var a in t[i]) r[a] = t[i][a].concat(r[a] ? r[a] : []);
	for (var o in e) n[o] = r[o] && r[o].length % 2 == 0 ? r[o].concat(e[o]) : e[o];
	return n;
}, Yr = function(e) {
	for (var t = {}, n = 0; n < e.length; n++) t[e[n].toUpperCase()] = e[n];
	return t;
}, Xr = function(e, t) {
	if (typeof e === w.OBJECT && e.length > 0) {
		for (var n in e) if (Y(t) == Y(e[n])) return !0;
		return !1;
	}
	return Qr(e) ? Y(t) == Y(e) : !1;
}, Zr = function(e, t) {
	for (var n in e) return /^(browser|cpu|device|engine|os)$/.test(n) || (t ? Zr(e[n]) : !1);
}, Qr = function(e) {
	return typeof e === w.STRING;
}, $r = function(e) {
	if (e) {
		for (var t = [], n = ti(/\\?\"/g, e).split(","), r = 0; r < n.length; r++) if (n[r].indexOf(";") > -1) {
			var i = ri(n[r]).split(";v=");
			t[r] = {
				brand: i[0],
				version: i[1]
			};
		} else t[r] = ri(n[r]);
		return t;
	}
}, Y = function(e) {
	return Qr(e) ? e.toLowerCase() : e;
}, ei = function(e) {
	return Qr(e) ? ti(/[^\d\.]/g, e).split(".")[0] : void 0;
}, X = function(e) {
	for (var t in e) if (e.hasOwnProperty(t)) {
		var n = e[t];
		typeof n == w.OBJECT && n.length == 2 ? this[n[0]] = n[1] : this[n] = void 0;
	}
	return this;
}, ti = function(e, t) {
	return Qr(t) ? t.replace(e, C) : t;
}, ni = function(e) {
	return ti(/\\?\"/g, e);
}, ri = function(e, t) {
	return e = ti(/^\s\s*/, String(e)), typeof t === w.UNDEFINED ? e : e.substring(0, t);
}, ii = function(e, t) {
	if (!(!e || !t)) for (var n = 0, r, i, a, o, s, c; n < t.length && !s;) {
		var l = t[n], u = t[n + 1];
		for (r = i = 0; r < l.length && !s && l[r];) if (s = l[r++].exec(e), s) for (a = 0; a < u.length; a++) c = s[++i], o = u[a], typeof o === w.OBJECT && o.length > 0 ? o.length === 2 ? typeof o[1] == w.FUNCTION ? this[o[0]] = o[1].call(this, c) : this[o[0]] = o[1] : o.length >= 3 && (typeof o[1] === w.FUNCTION && !(o[1].exec && o[1].test) ? o.length > 3 ? this[o[0]] = c ? o[1].apply(this, o.slice(2)) : void 0 : this[o[0]] = c ? o[1].call(this, c, o[2]) : void 0 : o.length == 3 ? this[o[0]] = c ? c.replace(o[1], o[2]) : void 0 : o.length == 4 ? this[o[0]] = c ? o[3].call(this, c.replace(o[1], o[2])) : void 0 : o.length > 4 && (this[o[0]] = c ? o[3].apply(this, [c.replace(o[1], o[2])].concat(o.slice(4))) : void 0)) : this[o] = c || void 0;
		n += 2;
	}
}, Z = function(e, t) {
	for (var n in t) if (typeof t[n] === w.OBJECT && t[n].length > 0) {
		for (var r = 0; r < t[n].length; r++) if (Xr(t[n][r], e)) return n === tr ? void 0 : n;
	} else if (Xr(t[n], e)) return n === tr ? void 0 : n;
	return t.hasOwnProperty("*") ? t["*"] : e;
}, ai = {
	ME: "4.90",
	"NT 3.51": "3.51",
	"NT 4.0": "4.0",
	2e3: ["5.0", "5.01"],
	XP: ["5.1", "5.2"],
	Vista: "6.0",
	7: "6.1",
	8: "6.2",
	"8.1": "6.3",
	10: ["6.4", "10.0"],
	NT: ""
}, oi = {
	embedded: "Automotive",
	mobile: "Mobile",
	tablet: ["Tablet", "EInk"],
	smarttv: "TV",
	wearable: "Watch",
	xr: ["VR", "XR"],
	"?": ["Desktop", "Unknown"],
	"*": void 0
}, si = {
	Chrome: "Google Chrome",
	Edge: "Microsoft Edge",
	"Edge WebView2": "Microsoft Edge WebView2",
	"Chrome WebView": "Android WebView",
	"Chrome Headless": "HeadlessChrome",
	"Huawei Browser": "HuaweiBrowser",
	"MIUI Browser": "Miui Browser",
	"Opera Mobi": "OperaMobile",
	Yandex: "YaBrowser"
}, ci = {
	browser: [
		[/\b(?:crmo|crios)\/([\w\.]+)/i],
		[N, [A, Kr + "Chrome"]],
		[/webview.+edge\/([\w\.]+)/i],
		[N, [A, Vr + " WebView"]],
		[/edg(?:e|ios|a)?\/([\w\.]+)/i],
		[N, [A, "Edge"]],
		[
			/(opera mini)\/([-\w\.]+)/i,
			/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
			/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
		],
		[A, N],
		[/opios[\/ ]+([\w\.]+)/i],
		[N, [A, Ur + " Mini"]],
		[/\bop(?:rg)?x\/([\w\.]+)/i],
		[N, [A, Ur + " GX"]],
		[/\bopr\/([\w\.]+)/i],
		[N, [A, Ur]],
		[/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],
		[N, [A, "Baidu"]],
		[/\b(?:mxbrowser|mxios|myie2)\/?([-\w\.]*)\b/i],
		[N, [A, "Maxthon"]],
		[
			/(kindle)\/([\w\.]+)/i,
			/(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i,
			/(avant|iemobile|slim(?:browser|boat|jet))[\/ ]?([\d\.]*)/i,
			/(?:ms|\()(ie) ([\w\.]+)/i,
			/(atlas|flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon|otter|dooble|(?:hi|lg |ovi|qute)browser|palemoon)\/v?([-\w\.]+)/i,
			/(brave)(?: chrome)?\/([\d\.]+)/i,
			/(aloha|heytap|ovi|115|surf|qwant)browser\/([\d\.]+)/i,
			/(qwant)(?:ios|mobile)\/([\d\.]+)/i,
			/(ecosia|weibo)(?:__| \w+@)([\d\.]+)/i
		],
		[A, N],
		[/quark(?:pc)?\/([-\w\.]+)/i],
		[N, [A, "Quark"]],
		[/\bddg\/([\w\.]+)/i],
		[N, [A, "DuckDuckGo"]],
		[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
		[N, [A, "UCBrowser"]],
		[
			/microm.+\bqbcore\/([\w\.]+)/i,
			/\bqbcore\/([\w\.]+).+microm/i,
			/micromessenger\/([\w\.]+)/i
		],
		[N, [A, "WeChat"]],
		[/konqueror\/([\w\.]+)/i],
		[N, [A, "Konqueror"]],
		[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
		[N, [A, "IE"]],
		[/ya(?:search)?browser\/([\w\.]+)/i],
		[N, [A, "Yandex"]],
		[/slbrowser\/([\w\.]+)/i],
		[N, [A, "Smart " + Er + K]],
		[/(av(?:ast|g|ira))\/([\w\.]+)/i],
		[[
			A,
			/(.+)/,
			"$1 Secure" + K
		], N],
		[/norton\/([\w\.]+)/i],
		[N, [A, "Norton Private" + K]],
		[/\bfocus\/([\w\.]+)/i],
		[N, [A, Hr + " Focus"]],
		[/ mms\/([\w\.]+)$/i],
		[N, [A, Ur + " Neon"]],
		[/ opt\/([\w\.]+)$/i],
		[N, [A, Ur + " Touch"]],
		[/coc_coc\w+\/([\w\.]+)/i],
		[N, [A, "Coc Coc"]],
		[/dolfin\/([\w\.]+)/i],
		[N, [A, "Dolphin"]],
		[/coast\/([\w\.]+)/i],
		[N, [A, Ur + " Coast"]],
		[/miuibrowser\/([\w\.]+)/i],
		[N, [A, "MIUI" + K]],
		[/fxios\/([\w\.-]+)/i],
		[N, [A, Kr + Hr]],
		[/\bqihoobrowser\/?([\w\.]*)/i],
		[N, [A, "360"]],
		[/\b(qq)\/([\w\.]+)/i],
		[[
			A,
			/(.+)/,
			"$1Browser"
		], N],
		[/(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i],
		[[
			A,
			/(.+)/,
			"$1" + K
		], N],
		[/samsungbrowser\/([\w\.]+)/i],
		[N, [A, Pr + " Internet"]],
		[/metasr[\/ ]?([\d\.]+)/i],
		[N, [A, Gr + " Explorer"]],
		[/(sogou)mo\w+\/([\d\.]+)/i],
		[[A, Gr + " Mobile"], N],
		[
			/(electron)\/([\w\.]+) safari/i,
			/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
			/m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[\/ ]?v?([\w\.]+)/i
		],
		[A, N],
		[/(lbbrowser|luakit|rekonq|steam(?= (clie|tenf|gameo)))/i],
		[A],
		[/ome\/([\w\.]+).+(iron(?= saf)|360(?=[es]e$))/i],
		[N, A],
		[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
		[
			[A, Wr],
			N,
			[j, B]
		],
		[
			/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
			/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
			/(daum)apps[\/ ]([\w\.]+)/i,
			/safari (line)\/([\w\.]+)/i,
			/\b(line)\/([\w\.]+)\/iab/i,
			/(alipay)client\/([\w\.]+)/i,
			/(twitter)(?:and| f.+e\/([\w\.]+))/i,
			/(bing)(?:web|sapphire)\/([\w\.]+)/i,
			/(instagram|snapchat|klarna)[\/ ]([-\w\.]+)/i
		],
		[
			A,
			N,
			[j, B]
		],
		[/\bgsa\/([\w\.]+) .*safari\//i],
		[
			N,
			[A, "GSA"],
			[j, B]
		],
		[/(?:musical_ly|trill)(?:.+app_?version\/|_)([\w\.]+)/i],
		[
			N,
			[A, "TikTok"],
			[j, B]
		],
		[/\[(linkedin)app\]/i],
		[A, [j, B]],
		[/(zalo(?:app)?)[\/\sa-z]*([\w\.-]+)/i],
		[
			[
				A,
				/(.+)/,
				"Zalo"
			],
			N,
			[j, B]
		],
		[/(chromium)[\/ ]([-\w\.]+)/i],
		[A, N],
		[/ome-(lighthouse)$/i],
		[A, [j, sr]],
		[/headlesschrome(?:\/([\w\.]+)| )/i],
		[N, [A, zr + " Headless"]],
		[/wv\).+chrome\/([\w\.]+).+edgw\//i],
		[N, [A, Vr + " WebView2"]],
		[/ wv\).+(chrome)\/([\w\.]+)/i],
		[[A, zr + " WebView"], N],
		[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
		[N, [A, "Android" + K]],
		[/chrome\/([\w\.]+) mobile/i],
		[N, [A, Kr + "Chrome"]],
		[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
		[A, N],
		[/version\/([\w\.\,]+) .*mobile(?:\/\w+ | ?)safari/i],
		[N, [A, Kr + "Safari"]],
		[/iphone .*mobile(?:\/\w+ | ?)safari/i],
		[[A, Kr + "Safari"]],
		[/version\/([\w\.\,]+) .*(safari)/i],
		[N, A],
		[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
		[A, [N, "1"]],
		[/(webkit|khtml)\/([\w\.]+)/i],
		[A, N],
		[/(?:mobile|tablet);.*(firefox)\/([\w\.-]+)/i],
		[[A, Kr + Hr], N],
		[/(navigator|netscape\d?)\/([-\w\.]+)/i],
		[[A, "Netscape"], N],
		[/(wolvic|librewolf)\/([\w\.]+)/i],
		[A, N],
		[/mobile vr; rv:([\w\.]+)\).+firefox/i],
		[N, [A, Hr + " Reality"]],
		[
			/ekiohf.+(flow)\/([\w\.]+)/i,
			/(swiftfox)/i,
			/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[\/ ]?([\w\.\+]+)/i,
			/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|basilisk|waterfox)\/([-\w\.]+)$/i,
			/(firefox)\/([\w\.]+)/i,
			/(mozilla)\/([\w\.]+(?= .+rv\:.+gecko\/\d+)|[0-4][\w\.]+(?!.+compatible))/i,
			/(amaya|dillo|doris|icab|ladybird|lynx|mosaic|netsurf|obigo|polaris|w3m|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
			/\b(links) \(([\w\.]+)/i
		],
		[A, [
			N,
			/_/g,
			"."
		]],
		[/(cobalt)\/([\w\.]+)/i],
		[A, [
			N,
			/[^\d\.]+./,
			C
		]]
	],
	cpu: [
		[/\b((amd|x|x86[-_]?|wow|win)64)\b/i],
		[[P, "amd64"]],
		[/(ia32(?=;))/i, /\b((i[346]|x)86)(pc)?\b/i],
		[[P, "ia32"]],
		[/\b(aarch64|arm(v?[89]e?l?|_?64))\b/i],
		[[P, "arm64"]],
		[/\b(arm(v[67])?ht?n?[fl]p?)\b/i],
		[[P, "armhf"]],
		[/( (ce|mobile); ppc;|\/[\w\.]+arm\b)/i],
		[[P, "arm"]],
		[/ sun4\w[;\)]/i],
		[[P, "sparc"]],
		[
			/\b(avr32|ia64(?=;)|68k(?=\))|\barm(?=v([1-7]|[5-7]1)l?|;|eabi)|(irix|mips|sparc)(64)?\b|pa-risc)/i,
			/((ppc|powerpc)(64)?)( mac|;|\))/i,
			/(?:osf1|[freopnt]{3,4}bsd) (alpha)/i
		],
		[[
			P,
			/ower/,
			C,
			Y
		]],
		[/mc680.0/i],
		[[P, "68k"]],
		[/winnt.+\[axp/i],
		[[P, "alpha"]]
	],
	device: [
		[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],
		[
			F,
			[M, Pr],
			[j, L]
		],
		[
			/\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
			/samsung[- ]((?!sm-[lr]|browser)[-\w]+)/i,
			/sec-(sgh\w+)/i
		],
		[
			F,
			[M, Pr],
			[j, I]
		],
		[/(?:\/|\()(ip(?:hone|od)[\w, ]*)[\/\);]/i],
		[
			F,
			[M, Sr],
			[j, I]
		],
		[/\b(?:ios|apple\w+)\/.+[\(\/](ipad)/i, /\b(ipad)[\d,]*[;\] ].+(mac |i(pad)?)os/i],
		[
			F,
			[M, Sr],
			[j, L]
		],
		[/(macintosh);/i],
		[F, [M, Sr]],
		[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
		[
			F,
			[M, Fr],
			[j, I]
		],
		[/\b((?:brt|eln|hey2?|gdi|jdn)-a?[lnw]09|(?:ag[rm]3?|jdn2|kob2)-a?[lw]0[09]hn)(?: bui|\)|;)/i],
		[
			F,
			[M, Dr],
			[j, L]
		],
		[/honor([-\w ]+)[;\)]/i],
		[
			F,
			[M, Dr],
			[j, I]
		],
		[/\b((?:ag[rs][2356]?k?|bah[234]?|bg[2o]|bt[kv]|cmr|cpn|db[ry]2?|jdn2|got|kob2?k?|mon|pce|scm|sht?|[tw]gr|vrd)-[ad]?[lw][0125][09]b?|605hw|bg2-u03|(?:gem|fdr|m2|ple|t1)-[7a]0[1-4][lu]|t1-a2[13][lw]|mediapad[\w\. ]*(?= bui|\)))\b(?!.+d\/s)/i],
		[
			F,
			[M, Tr],
			[j, L]
		],
		[/(?:huawei) ?([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][\dc][adnt]?)\b(?!.+d\/s)/i],
		[
			F,
			[M, Tr],
			[j, I]
		],
		[/oid[^\)]+; (2[\dbc]{4}(182|283|rp\w{2})[cgl]|m2105k81a?c)(?: bui|\))/i, /\b(?:xiao)?((?:red)?mi[-_ ]?pad[\w- ]*)(?: bui|\))/i],
		[
			[
				F,
				/_/g,
				" "
			],
			[M, Lr],
			[j, L]
		],
		[
			/\b; (\w+) build\/hm\1/i,
			/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
			/oid[^\)]+; (redmi[\-_ ]?(?:note|k)?[\w_ ]+|m?[12]\d[01]\d\w{3,6}|poco[\w ]+|(shark )?\w{3}-[ah]0|qin ?[1-3](s\+|ultra| pro)?)( bui|; wv|\))/i,
			/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note|max|cc)?[_ ]?(?:\d{0,2}\w?)[_ ]?(?:plus|se|lite|pro)?( 5g|lte)?)(?: bui|\))/i,
			/ ([\w ]+) miui\/v?\d/i
		],
		[
			[
				F,
				/_/g,
				" "
			],
			[M, Lr],
			[j, I]
		],
		[/droid.+; (cph2[3-6]\d[13579]|((gm|hd)19|(ac|be|in|kb)20|(d[en]|eb|le|mt)21|ne22)[0-2]\d|p[g-l]\w[1m]10)\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],
		[
			F,
			[M, Mr],
			[j, I]
		],
		[/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],
		[
			F,
			[M, Nr],
			[j, I]
		],
		[/\b(opd2(\d{3}a?))(?: bui|\))/i],
		[
			F,
			[
				M,
				Z,
				{
					OnePlus: [
						"203",
						"304",
						"403",
						"404",
						"413",
						"415"
					],
					"*": Nr
				}
			],
			[j, L]
		],
		[/(vivo (5r?|6|8l?|go|one|s|x[il]?[2-4]?)[\w\+ ]*)(?: bui|\))/i],
		[
			F,
			[M, "BLU"],
			[j, I]
		],
		[/; vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
		[
			F,
			[M, "Vivo"],
			[j, I]
		],
		[/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],
		[
			F,
			[M, "Realme"],
			[j, I]
		],
		[/(ideatab[-\w ]+|602lv|d-42a|a101lv|a2109a|a3500-hv|s[56]000|pb-6505[my]|tb-?x?\d{3,4}(?:f[cu]|xu|[av])|yt\d?-[jx]?\d+[lfmx])( bui|;|\)|\/)/i, /lenovo ?(b[68]0[08]0-?[hf]?|tab(?:[\w- ]+?)|tb[\w-]{6,7})( bui|;|\)|\/)/i],
		[
			F,
			[M, Er],
			[j, L]
		],
		[/lenovo[-_ ]?([-\w ]+?)(?: bui|\)|\/)/i],
		[
			F,
			[M, Er],
			[j, I]
		],
		[
			/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
			/\bmot(?:orola)?[- ]([\w\s]+)(\)| bui)/i,
			/((?:moto(?! 360)[-\w\(\) ]+|xt\d{3,4}[cgkosw\+]?[-\d]*|nexus 6)(?= bui|\)))/i
		],
		[
			F,
			[M, Ar],
			[j, I]
		],
		[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
		[
			F,
			[M, Ar],
			[j, L]
		],
		[/\b(?:lg)?([vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
		[
			F,
			[M, Or],
			[j, L]
		],
		[
			/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
			/\blg[-e;\/ ]+(?!.*(?:browser|netcast|android tv|watch|webos))(\w+)/i,
			/\blg-?([\d\w]+) bui/i
		],
		[
			F,
			[M, Or],
			[j, I]
		],
		[/(nokia) (t[12][01])/i],
		[
			M,
			F,
			[j, L]
		],
		[/(?:maemo|nokia).*(n900|lumia \d+|rm-\d+)/i, /nokia[-_ ]?(([-\w\. ]*?))( bui|\)|;|\/)/i],
		[
			[
				F,
				/_/g,
				" "
			],
			[j, I],
			[M, "Nokia"]
		],
		[/(pixel (c|tablet))\b/i],
		[
			F,
			[M, W],
			[j, L]
		],
		[/droid.+;(?: google)? (g(01[13]a|020[aem]|025[jn]|1b60|1f8f|2ybb|4s1m|576d|5nz6|8hhn|8vou|a02099|c15s|d1yq|e2ae|ec77|gh2x|kv4x|p4bc|pj41|r83y|tt9q|ur25|wvk6)|pixel[\d ]*a?( pro)?( xl)?( fold)?( \(5g\))?)( bui|\))/i],
		[
			F,
			[M, W],
			[j, I]
		],
		[/(google) (pixelbook( go)?)/i],
		[M, F],
		[/droid.+; (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-\w\w\d\d)(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],
		[
			F,
			[M, Ir],
			[j, I]
		],
		[/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
		[
			[F, "Xperia Tablet"],
			[M, Ir],
			[j, L]
		],
		[
			/(alexa)webm/i,
			/(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i,
			/(kf[a-z]+)( bui|\)).+silk\//i
		],
		[
			F,
			[M, xr],
			[j, L]
		],
		[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
		[
			[
				F,
				/(.+)/g,
				"Fire Phone $1"
			],
			[M, xr],
			[j, I]
		],
		[/(playbook);[-\w\),; ]+(rim)/i],
		[
			F,
			M,
			[j, L]
		],
		[/\b((?:bb[a-f]|st[hv])100-\d)/i, /(?:blackberry|\(bb10;) (\w+)/i],
		[
			F,
			[M, wr],
			[j, I]
		],
		[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],
		[
			F,
			[M, Cr],
			[j, L]
		],
		[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
		[
			F,
			[M, Cr],
			[j, I]
		],
		[/(nexus 9)/i],
		[
			F,
			[M, "HTC"],
			[j, L]
		],
		[
			/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
			/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
			/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i
		],
		[
			M,
			[
				F,
				/_/g,
				" "
			],
			[j, I]
		],
		[/tcl (xess p17aa)/i, /droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])(_\w(\w|\w\w))?(\)| bui)/i],
		[
			F,
			[M, "TCL"],
			[j, L]
		],
		[/droid [\w\.]+; (418(?:7d|8v)|5087z|5102l|61(?:02[dh]|25[adfh]|27[ai]|56[dh]|59k|65[ah])|a509dl|t(?:43(?:0w|1[adepqu])|50(?:6d|7[adju])|6(?:09dl|10k|12b|71[efho]|76[hjk])|7(?:66[ahju]|67[hw]|7[045][bh]|71[hk]|73o|76[ho]|79w|81[hks]?|82h|90[bhsy]|99b)|810[hs]))(_\w(\w|\w\w))?(\)| bui)/i],
		[
			F,
			[M, "TCL"],
			[j, I]
		],
		[/(itel) ((\w+))/i],
		[
			[M, Y],
			F,
			[
				j,
				Z,
				{
					tablet: ["p10001l", "w7001"],
					"*": "mobile"
				}
			]
		],
		[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
		[
			F,
			[M, "Acer"],
			[j, L]
		],
		[/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
		[
			F,
			[M, "Meizu"],
			[j, I]
		],
		[/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],
		[
			F,
			[M, "Ulefone"],
			[j, I]
		],
		[/; (energy ?\w+)(?: bui|\))/i, /; energizer ([\w ]+)(?: bui|\))/i],
		[
			F,
			[M, "Energizer"],
			[j, I]
		],
		[/; cat (b35);/i, /; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i],
		[
			F,
			[M, "Cat"],
			[j, I]
		],
		[/((?:new )?andromax[\w- ]+)(?: bui|\))/i],
		[
			F,
			[M, "Smartfren"],
			[j, I]
		],
		[/droid.+; (a(in)?(0(15|59|6[35])|142)p?)/i],
		[
			F,
			[M, "Nothing"],
			[j, I]
		],
		[/; (x67 5g|tikeasy \w+|ac[1789]\d\w+)( b|\))/i, /archos ?(5|gamepad2?|([\w ]*[t1789]|hello) ?\d+[\w ]*)( b|\))/i],
		[
			F,
			[M, "Archos"],
			[j, L]
		],
		[/archos ([\w ]+)( b|\))/i, /; (ac[3-6]\d\w{2,8})( b|\))/i],
		[
			F,
			[M, "Archos"],
			[j, I]
		],
		[/; (n159v)/i],
		[
			F,
			[M, "HMD"],
			[j, I]
		],
		[/(imo) (tab \w+)/i, /(infinix|tecno) (x1101b?|p904|dp(7c|8d|10a)( pro)?|p70[1-3]a?|p904|t1101)/i],
		[
			M,
			F,
			[j, L]
		],
		[
			/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus(?! zenw)|dell|jolla|meizu|motorola|polytron|tecno|micromax|advan)[-_ ]?([-\w]*)/i,
			/; (blu|hmd|imo|infinix|lava|oneplus|tcl|wiko)[_ ]([\w\+ ]+?)(?: bui|\)|; r)/i,
			/(hp) ([\w ]+\w)/i,
			/(microsoft); (lumia[\w ]+)/i,
			/(oppo) ?([\w ]+) bui/i,
			/(hisense) ([ehv][\w ]+)\)/i,
			/droid[^;]+; (philips)[_ ]([sv-x][\d]{3,4}[xz]?)/i
		],
		[
			M,
			F,
			[j, I]
		],
		[
			/(kobo)\s(ereader|touch)/i,
			/(hp).+(touchpad(?!.+tablet)|tablet)/i,
			/(kindle)\/([\w\.]+)/i
		],
		[
			M,
			F,
			[j, L]
		],
		[/(surface duo)/i],
		[
			F,
			[M, kr],
			[j, L]
		],
		[/droid [\d\.]+; (fp\du?)(?: b|\))/i],
		[
			F,
			[M, "Fairphone"],
			[j, I]
		],
		[/((?:tegranote|shield t(?!.+d tv))[\w- ]*?)(?: b|\))/i],
		[
			F,
			[M, jr],
			[j, L]
		],
		[/(sprint) (\w+)/i],
		[
			M,
			F,
			[j, I]
		],
		[/(kin\.[onetw]{3})/i],
		[
			[
				F,
				/\./g,
				" "
			],
			[M, kr],
			[j, I]
		],
		[/droid.+; ([c6]+|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
		[
			F,
			[M, Rr],
			[j, L]
		],
		[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
		[
			F,
			[M, Rr],
			[j, I]
		],
		[/(philips)[\w ]+tv/i, /smart-tv.+(samsung)/i],
		[M, [j, R]],
		[/hbbtv.+maple;(\d+)/i],
		[
			[
				F,
				/^/,
				"SmartTV"
			],
			[M, Pr],
			[j, R]
		],
		[/(vizio)(?: |.+model\/)(\w+-\w+)/i, /tcast.+(lg)e?. ([-\w]+)/i],
		[
			M,
			F,
			[j, R]
		],
		[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
		[[M, Or], [j, R]],
		[/(apple) ?tv/i],
		[
			M,
			[F, Sr + " TV"],
			[j, R]
		],
		[/crkey.*devicetype\/chromecast/i],
		[
			[F, G + " Third Generation"],
			[M, W],
			[j, R]
		],
		[/crkey.*devicetype\/([^/]*)/i],
		[
			[
				F,
				/^/,
				"Chromecast "
			],
			[M, W],
			[j, R]
		],
		[/fuchsia.*crkey/i],
		[
			[F, G + " Nest Hub"],
			[M, W],
			[j, R]
		],
		[/crkey/i],
		[
			[F, G],
			[M, W],
			[j, R]
		],
		[/(portaltv)/i],
		[
			F,
			[M, Wr],
			[j, R]
		],
		[/droid.+aft(\w+)( bui|\))/i],
		[
			F,
			[M, xr],
			[j, R]
		],
		[/(shield \w+ tv)/i],
		[
			F,
			[M, jr],
			[j, R]
		],
		[/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
		[
			F,
			[M, Fr],
			[j, R]
		],
		[/(bravia[\w ]+)( bui|\))/i],
		[
			F,
			[M, Ir],
			[j, R]
		],
		[/(mi(tv|box)-?\w+) bui/i],
		[
			F,
			[M, Lr],
			[j, R]
		],
		[/Hbbtv.*(technisat) (.*);/i],
		[
			M,
			F,
			[j, R]
		],
		[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],
		[
			[
				M,
				/.+\/(\w+)/,
				"$1",
				Z,
				{ LG: "lge" }
			],
			[F, ri],
			[j, R]
		],
		[/(playstation \w+)/i],
		[
			F,
			[M, Ir],
			[j, ir]
		],
		[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
		[
			F,
			[M, kr],
			[j, ir]
		],
		[
			/(ouya)/i,
			/(nintendo) (\w+)/i,
			/(retroid) (pocket ([^\)]+))/i,
			/(valve).+(steam deck)/i,
			/droid.+; ((shield|rgcube|gr0006))( bui|\))/i
		],
		[
			[
				M,
				Z,
				{
					Nvidia: "Shield",
					Anbernic: "RGCUBE",
					Logitech: "GR0006"
				}
			],
			F,
			[j, ir]
		],
		[/\b(sm-[lr]\d\d[0156][fnuw]?s?|gear live)\b/i],
		[
			F,
			[M, Pr],
			[j, z]
		],
		[/((pebble))app/i, /(asus|google|lg|oppo|xiaomi) ((pixel |zen)?watch[\w ]*)( bui|\))/i],
		[
			M,
			F,
			[j, z]
		],
		[/(ow(?:19|20)?we?[1-3]{1,3})/i],
		[
			F,
			[M, Nr],
			[j, z]
		],
		[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
		[
			F,
			[M, Sr],
			[j, z]
		],
		[/(opwwe\d{3})/i],
		[
			F,
			[M, Mr],
			[j, z]
		],
		[/(moto 360)/i],
		[
			F,
			[M, Ar],
			[j, z]
		],
		[/(smartwatch 3)/i],
		[
			F,
			[M, Ir],
			[j, z]
		],
		[/(g watch r)/i],
		[
			F,
			[M, Or],
			[j, z]
		],
		[/droid.+; (wt63?0{2,3})\)/i],
		[
			F,
			[M, Rr],
			[j, z]
		],
		[/droid.+; (glass) \d/i],
		[
			F,
			[M, W],
			[j, ar]
		],
		[/(pico) ([\w ]+) os\d/i],
		[
			M,
			F,
			[j, ar]
		],
		[/(quest( \d| pro)?s?).+vr/i],
		[
			F,
			[M, Wr],
			[j, ar]
		],
		[/mobile vr; rv.+firefox/i],
		[[j, ar]],
		[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
		[M, [j, or]],
		[/(aeobc)\b/i],
		[
			F,
			[M, xr],
			[j, or]
		],
		[/(homepod).+mac os/i],
		[
			F,
			[M, Sr],
			[j, or]
		],
		[/windows iot/i],
		[[j, or]],
		[/droid.+; ([\w- ]+) (4k|android|smart|google)[- ]?tv/i],
		[F, [j, R]],
		[/\b((4k|android|smart|opera)[- ]?tv|tv; rv:|large screen[\w ]+safari)\b/i],
		[[j, R]],
		[/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew|; hmsc).+?(mobile|vr|\d) safari/i],
		[F, [
			j,
			Z,
			{
				mobile: "Mobile",
				xr: "VR",
				"*": L
			}
		]],
		[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
		[[j, L]],
		[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],
		[[j, I]],
		[/droid .+?; ([\w\. -]+)( bui|\))/i],
		[F, [M, "Generic"]]
	],
	engine: [
		[/windows.+ edge\/([\w\.]+)/i],
		[N, [A, Vr + "HTML"]],
		[/(arkweb)\/([\w\.]+)/i],
		[A, N],
		[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
		[N, [A, "Blink"]],
		[
			/(presto)\/([\w\.]+)/i,
			/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w\.]+)/i,
			/ekioh(flow)\/([\w\.]+)/i,
			/(khtml|tasman|links|dillo)[\/ ]\(?([\w\.]+)/i,
			/(icab)[\/ ]([23]\.[\d\.]+)/i,
			/\b(libweb)/i
		],
		[A, N],
		[/ladybird\//i],
		[[A, "LibWeb"]],
		[/rv\:([\w\.]{1,9})\b.+(gecko)/i],
		[N, A]
	],
	os: [
		[/(windows nt) (6\.[23]); arm/i],
		[[
			A,
			/N/,
			"R"
		], [
			N,
			Z,
			ai
		]],
		[/(windows (?:phone|mobile|iot))(?: os)?[\/ ]?([\d\.]*( se)?)/i, /(windows)[\/ ](1[01]|2000|3\.1|7|8(\.1)?|9[58]|me|server 20\d\d( r2)?|vista|xp)/i],
		[A, N],
		[/windows nt ?([\d\.\)]*)(?!.+xbox)/i, /\bwin(?=3| ?9|n)(?:nt| 9x )?([\d\.;]*)/i],
		[[
			N,
			/(;|\))/g,
			"",
			Z,
			ai
		], [A, qr]],
		[/(windows ce)\/?([\d\.]*)/i],
		[A, N],
		[
			/[adehimnop]{4,7}\b(?:.*os ([\w]+) like mac|; opera)/i,
			/(?:ios;fbsv|ios(?=.+ip(?:ad|hone)|.+apple ?tv)|ip(?:ad|hone)(?: |.+i(?:pad)?)os|apple ?tv.+ios)[\/ ]([\w\.]+)/i,
			/\btvos ?([\w\.]+)/i,
			/cfnetwork\/.+darwin/i
		],
		[[
			N,
			/_/g,
			"."
		], [A, "iOS"]],
		[/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+(haiku|morphos))/i],
		[[A, "macOS"], [
			N,
			/_/g,
			"."
		]],
		[/android ([\d\.]+).*crkey/i],
		[N, [A, G + " Android"]],
		[/fuchsia.*crkey\/([\d\.]+)/i],
		[N, [A, G + " Fuchsia"]],
		[/crkey\/([\d\.]+).*devicetype\/smartspeaker/i],
		[N, [A, G + " SmartSpeaker"]],
		[/linux.*crkey\/([\d\.]+)/i],
		[N, [A, G + " Linux"]],
		[/crkey\/([\d\.]+)/i],
		[N, [A, G]],
		[/droid ([\w\.]+)\b.+(android[- ]x86)/i],
		[N, A],
		[/(ubuntu) ([\w\.]+) like android/i],
		[[
			A,
			/(.+)/,
			"$1 Touch"
		], N],
		[/(harmonyos)[\/ ]?([\d\.]*)/i, /(android|bada|blackberry|kaios|maemo|meego|openharmony|qnx|rim tablet os|sailfish|series40|symbian|tizen)\w*[-\/\.; ]?([\d\.]*)/i],
		[A, N],
		[/\(bb(10);/i],
		[N, [A, wr]],
		[/(?:symbian ?os|symbos|s60(?=;)|series ?60)[-\/ ]?([\w\.]*)/i],
		[N, [A, "Symbian"]],
		[/mozilla\/[\d\.]+ \((?:mobile[;\w ]*|tablet|tv|[^\)]*(?:viera|lg(?:l25|-d300)|alcatel ?o.+|y300-f1)); rv:([\w\.]+)\).+gecko\//i],
		[N, [A, Hr + " OS"]],
		[/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i, /webos(?:[ \/]?|\.tv-20(?=2[2-9]))(\d[\d\.]*)/i],
		[N, [A, "webOS"]],
		[/web0s;.+?(?:chr[o0]me|safari)\/(\d+)/i],
		[[
			N,
			Z,
			{
				25: "120",
				24: "108",
				23: "94",
				22: "87",
				6: "79",
				5: "68",
				4: "53",
				3: "38",
				2: "538",
				1: "537",
				"*": "TV"
			}
		], [A, "webOS"]],
		[/watch(?: ?os[,\/ ]|\d,\d\/)([\d\.]+)/i],
		[N, [A, "watchOS"]],
		[/cros [\w]+(?:\)| ([\w\.]+)\b)/i],
		[N, [A, "Chrome OS"]],
		[/kepler ([\w\.]+); (aft|aeo)/i],
		[N, [A, "Vega OS"]],
		[
			/(netrange)mmh/i,
			/(nettv)\/(\d+\.[\w\.]+)/i,
			/(nintendo|playstation) (\w+)/i,
			/(xbox); +xbox ([^\);]+)/i,
			/(pico) .+os([\w\.]+)/i,
			/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
			/linux.+(mint)[\/\(\) ]?([\w\.]*)/i,
			/(mageia|vectorlinux|fuchsia|arcaos|arch(?= ?linux))[;l ]([\d\.]*)/i,
			/([kxln]?ubuntu|debian|suse|opensuse|gentoo|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire|knoppix)(?: gnu[\/ ]linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
			/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
			/\b(aix)[; ]([1-9\.]{0,4})/i,
			/(hurd|linux|morphos)(?: (?:arm|x86|ppc)\w*| ?)([\w\.]*)/i,
			/(gnu) ?([\w\.]*)/i,
			/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
			/(haiku) ?(r\d)?/i
		],
		[A, N],
		[/(sunos) ?([\d\.]*)/i],
		[[A, "Solaris"], N],
		[/\b(beos|os\/2|amigaos|openvms|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i],
		[A, N]
	]
}, li = (function() {
	var e = {
		init: {},
		isIgnore: {},
		isIgnoreRgx: {},
		toString: {}
	};
	return X.call(e.init, [
		[T, [
			A,
			N,
			rr,
			j
		]],
		[E, [P]],
		[D, [
			j,
			F,
			M
		]],
		[O, [A, N]],
		[k, [A, N]]
	]), X.call(e.isIgnore, [
		[T, [N, rr]],
		[O, [N]],
		[k, [N]]
	]), X.call(e.isIgnoreRgx, [[T, / ?browser$/i], [k, / ?os$/i]]), X.call(e.toString, [
		[T, [A, N]],
		[E, [P]],
		[D, [M, F]],
		[O, [A, N]],
		[k, [A, N]]
	]), e;
})(), ui = function(e, t) {
	var n = li.init[t], r = li.isIgnore[t] || 0, i = li.isIgnoreRgx[t] || 0, a = li.toString[t] || 0;
	function o() {
		X.call(this, n);
	}
	return o.prototype.getItem = function() {
		return e;
	}, o.prototype.withClientHints = function() {
		return J ? J.getHighEntropyValues(br).then(function(t) {
			return e.setCH(new di(t, !1)).parseCH().get();
		}) : e.parseCH().get();
	}, o.prototype.withFeatureCheck = function() {
		return e.detectFeature().get();
	}, t != nr && (o.prototype.is = function(e) {
		var t = !1;
		for (var n in this) if (this.hasOwnProperty(n) && !Xr(r, n) && Y(i ? ti(i, this[n]) : this[n]) == Y(i ? ti(i, e) : e)) {
			if (t = !0, e != w.UNDEFINED) break;
		} else if (e == w.UNDEFINED && t) {
			t = !t;
			break;
		}
		return t;
	}, o.prototype.toString = function() {
		var e = C;
		for (var t in a) typeof this[a[t]] !== w.UNDEFINED && (e += (e ? " " : C) + this[a[t]]);
		return e || w.UNDEFINED;
	}), o.prototype.then = function(e) {
		var t = this, n = function() {
			for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
		};
		n.prototype = {
			is: o.prototype.is,
			toString: o.prototype.toString,
			withClientHints: o.prototype.withClientHints,
			withFeatureCheck: o.prototype.withFeatureCheck
		};
		var r = new n();
		return e(r), r;
	}, new o();
};
function di(e, t) {
	if (e ||= {}, X.call(this, br), t) X.call(this, [
		[cr, $r(e[U])],
		[lr, $r(e[fr])],
		[I, /\?1/.test(e[gr])],
		[F, ni(e[_r])],
		[H, ni(e[vr])],
		[ur, ni(e[yr])],
		[P, ni(e[pr])],
		[V, $r(e[hr])],
		[dr, ni(e[mr])]
	]);
	else for (var n in e) this.hasOwnProperty(n) && typeof e[n] !== w.UNDEFINED && (this[n] = e[n]);
}
function Q(e, t, n, r) {
	return X.call(this, [
		["itemType", e],
		["ua", t],
		["uaCH", r],
		["rgxMap", n],
		["data", ui(this, e)]
	]), this;
}
Q.prototype.get = function(e) {
	return e ? this.data.hasOwnProperty(e) ? this.data[e] : void 0 : this.data;
}, Q.prototype.set = function(e, t) {
	return this.data[e] = t, this;
}, Q.prototype.setCH = function(e) {
	return this.uaCH = e, this;
}, Q.prototype.detectFeature = function() {
	if (q && q.userAgent == this.ua) switch (this.itemType) {
		case T:
			q.brave && typeof q.brave.isBrave == w.FUNCTION && this.set(A, "Brave");
			break;
		case D:
			!this.get(j) && J && J[I] && this.set(j, I), this.get(F) == "Macintosh" && q && typeof q.standalone !== w.UNDEFINED && q.maxTouchPoints && q.maxTouchPoints > 2 && this.set(F, "iPad").set(j, L);
			break;
		case k:
			!this.get(A) && J && J[H] && this.set(A, J[H]);
			break;
		case nr:
			var e = this.data, t = function(t) {
				return e[t].getItem().detectFeature().get();
			};
			this.set(T, t(T)).set(E, t(E)).set(D, t(D)).set(O, t(O)).set(k, t(k));
	}
	return this;
}, Q.prototype.parseUA = function() {
	switch (this.itemType != nr && ii.call(this.data, this.ua, this.rgxMap), this.itemType) {
		case T:
			this.set(rr, ei(this.get(N)));
			break;
		case k:
			if (this.get(A) == "iOS" && this.get(N) == "18.6") {
				var e = /\) Version\/([\d\.]+)/.exec(this.ua);
				e && parseInt(e[1].substring(0, 2), 10) >= 26 && this.set(N, e[1]);
			}
			break;
	}
	return this;
}, Q.prototype.parseCH = function() {
	var e = this.uaCH, t = this.rgxMap;
	switch (this.itemType) {
		case T:
		case O:
			var n = e[lr] || e[cr], r;
			if (n) for (var i = 0; i < n.length; i++) {
				var a = n[i].brand || n[i], o = n[i].version;
				this.itemType == T && !/not.a.brand/i.test(a) && (!r || /Chrom/.test(r) && a != Br || r == Vr && /WebView2/.test(a)) && (a = Z(a, si), r = this.get(A), r && !/Chrom/.test(r) && /Chrom/.test(a) || this.set(A, a).set(N, o).set(rr, ei(o)), r = a), this.itemType == O && a == Br && this.set(N, o);
			}
			break;
		case E:
			var s = e[P];
			s && (s && e[dr] == "64" && (s += "64"), ii.call(this.data, s + ";", t));
			break;
		case D:
			if (e[I] && this.set(j, I), e[F] && (this.set(F, e[F]), !this.get(j) || !this.get(M))) {
				var c = {};
				ii.call(c, "droid 9; " + e[F] + ")", t), !this.get(j) && c.type && this.set(j, c.type), !this.get(M) && c.vendor && this.set(M, c.vendor);
			}
			if (e[V]) {
				var l;
				if (typeof e[V] != "string") for (var u = 0; !l && u < e[V].length;) l = Z(e[V][u++], oi);
				else l = Z(e[V], oi);
				this.set(j, l);
			}
			break;
		case k:
			var d = e[H];
			if (d) {
				var f = e[ur];
				d == qr && (f = parseInt(ei(f), 10) >= 13 ? "11" : "10"), this.set(A, d).set(N, f);
			}
			this.get(A) == qr && e[F] == "Xbox" && this.set(A, "Xbox").set(N, void 0);
			break;
		case nr:
			var p = this.data, m = function(t) {
				return p[t].getItem().setCH(e).parseCH().get();
			};
			this.set(T, m(T)).set(E, m(E)).set(D, m(D)).set(O, m(O)).set(k, m(k));
	}
	return this;
};
function $(e, t, n) {
	if (typeof e === w.OBJECT ? (Zr(e, !0) ? (typeof t === w.OBJECT && (n = t), t = e) : (n = e, t = void 0), e = void 0) : typeof e === w.STRING && !Zr(t, !0) && (n = t, t = void 0), n) if (typeof n.append === w.FUNCTION) {
		var r = {};
		n.forEach(function(e, t) {
			r[String(t).toLowerCase()] = e;
		}), n = r;
	} else {
		var i = {};
		for (var a in n) n.hasOwnProperty(a) && (i[String(a).toLowerCase()] = n[a]);
		n = i;
	}
	if (!(this instanceof $)) return new $(e, t, n).getResult();
	var o = typeof e === w.STRING ? e : n && n[er] ? n[er] : q && q.userAgent ? q.userAgent : C, s = new di(n, !0), c = t ? Jr(ci, t) : ci, l = function(e) {
		return e == nr ? function() {
			return new Q(e, o, c, s).set("ua", o).set(T, this.getBrowser()).set(E, this.getCPU()).set(D, this.getDevice()).set(O, this.getEngine()).set(k, this.getOS()).get();
		} : function() {
			return new Q(e, o, c[e], s).parseUA().get();
		};
	};
	return X.call(this, [
		["getBrowser", l(T)],
		["getCPU", l(E)],
		["getDevice", l(D)],
		["getEngine", l(O)],
		["getOS", l(k)],
		["getResult", l(nr)],
		["getUA", function() {
			return o;
		}],
		["setUA", function(e) {
			return Qr(e) && (o = ri(e, $n)), this;
		}]
	]).setUA(o), this;
}
$.VERSION = Qn, $.BROWSER = Yr([
	A,
	N,
	rr,
	j
]), $.CPU = Yr([P]), $.DEVICE = Yr([
	F,
	M,
	j,
	ir,
	I,
	R,
	L,
	z,
	or
]), $.ENGINE = $.OS = Yr([A, N]);
//#endregion
//#region src/report/index.ts
var fi = async (e, t) => {
	console.log("🫒 url -- report", e);
	let n = new Blob([JSON.stringify(t)], { type: "application/json" });
	navigator.sendBeacon(e, n);
}, pi = async (e, t) => (console.log("🫒 url -- reportFetch", e), (await fetch(e, {
	method: "POST",
	body: JSON.stringify(t),
	keepalive: !0,
	headers: { "Content-Type": "application/json" }
})).json()), mi = () => {
	let e = new $();
	return {
		browser: e.getBrowser().name,
		os: e.getOS().name,
		device: e.getDevice().type || "desktop"
	};
}, hi = async (e) => {
	let t = mi(), n = {
		anonymousId: (await (await Zn.load()).get()).visitorId,
		browser: t.browser,
		os: t.os,
		device: t.device
	};
	return (await pi(e.baseUrl + e.uv.api, n)).data;
}, gi = (e, t) => {
	let n = "BUTTON", r = t.baseUrl + t.event.api;
	document.addEventListener("click", (t) => {
		let i = t.target, a = () => {
			let n = i.getBoundingClientRect();
			fi(r, {
				visitorId: e,
				event: t.type,
				payload: {
					x: n.left.toFixed(2) || 0,
					y: n.top.toFixed(2) || 0,
					width: n.width.toFixed(2) || 0,
					height: n.height.toFixed(2) || 0,
					text: i.textContent
				},
				url: window.location.href
			});
		};
		i.nodeName === n && a(), i.nodeName === "SPAN" && i.parentElement?.nodeName === n && a();
	});
}, _i = (e, t) => {
	let n = t.baseUrl + t.error.api;
	window.addEventListener("error", (t) => {
		fi(n, {
			visitorId: e,
			error: "js",
			message: t.message,
			stack: t.error.stack,
			url: t.filename
		});
	}), window.addEventListener("unhandledrejection", (t) => {
		let r = t.reason instanceof Error;
		fi(n, {
			visitorId: e,
			error: "promise",
			message: r ? t.reason.message : JSON.stringify(t.reason),
			stack: r ? t.reason.stack : "Promise Rejection",
			url: window.location.href
		});
	});
}, vi = (e, t) => {
	let n = t.baseUrl + t.pv.api, r = window.location.href.includes("#"), i = {
		visitorId: e,
		url: window.location.protocol + "//" + window.location.host,
		referrer: document.referrer,
		path: r ? "/" + window.location.hash : window.location.pathname
	};
	console.log(i), fi(n, i);
}, yi = (e, t) => {
	vi(e, t), window.addEventListener("hashchange", (n) => {
		vi(e, t);
	}), window.addEventListener("popstate", (n) => {
		vi(e, t);
	});
	let n = history.pushState;
	history.pushState = function() {
		n.apply(this, arguments), vi(e, t);
	};
	let r = history.replaceState;
	history.replaceState = function() {
		r.apply(this, arguments), vi(e, t);
	};
}, bi = -1, xi = (e) => {
	addEventListener("pageshow", (t) => {
		t.persisted && (bi = t.timeStamp, e(t));
	}, !0);
}, Si = (e, t, n, r) => {
	let i, a;
	return (o) => {
		t.value >= 0 && (o || r) && (a = t.value - (i ?? 0), (a || i === void 0) && (i = t.value, t.delta = a, t.rating = ((e, t) => e > t[1] ? "poor" : e > t[0] ? "needs-improvement" : "good")(t.value, n), e(t)));
	};
}, Ci = (e) => {
	requestAnimationFrame(() => requestAnimationFrame(e));
}, wi = () => {
	let e = performance.getEntriesByType("navigation")[0];
	if (e && e.responseStart > 0 && e.responseStart < performance.now()) return e;
}, Ti = () => wi()?.activationStart ?? 0, Ei = (e, t = -1) => {
	let n = wi(), r = "navigate";
	return bi >= 0 ? r = "back-forward-cache" : n && (document.prerendering || Ti() > 0 ? r = "prerender" : document.wasDiscarded ? r = "restore" : n.type && (r = n.type.replace(/_/g, "-"))), {
		name: e,
		value: t,
		rating: "good",
		delta: 0,
		entries: [],
		id: `v5-${Date.now()}-${Math.floor(8999999999999 * Math.random()) + 0xe8d4a51000}`,
		navigationType: r
	};
}, Di = /* @__PURE__ */ new WeakMap();
function Oi(e, t) {
	return Di.get(e) || Di.set(e, new t()), Di.get(e);
}
var ki = class {
	t;
	i = 0;
	o = [];
	h(e) {
		if (e.hadRecentInput) return;
		let t = this.o[0], n = this.o.at(-1);
		this.i && t && n && e.startTime - n.startTime < 1e3 && e.startTime - t.startTime < 5e3 ? (this.i += e.value, this.o.push(e)) : (this.i = e.value, this.o = [e]), this.t?.(e);
	}
}, Ai = (e, t, n = {}) => {
	try {
		if (PerformanceObserver.supportedEntryTypes.includes(e)) {
			let r = new PerformanceObserver((e) => {
				queueMicrotask(() => {
					t(e.getEntries());
				});
			});
			return r.observe({
				type: e,
				buffered: !0,
				...n
			}), r;
		}
	} catch {}
}, ji = (e) => {
	let t = !1;
	return () => {
		t ||= (e(), !0);
	};
}, Mi = -1, Ni = /* @__PURE__ */ new Set(), Pi = () => document.visibilityState !== "hidden" || document.prerendering ? Infinity : 0, Fi = (e) => {
	if (document.visibilityState === "hidden") {
		if (e.type === "visibilitychange") for (let e of Ni) e();
		isFinite(Mi) || (Mi = e.type === "visibilitychange" ? e.timeStamp : 0, removeEventListener("prerenderingchange", Fi, !0));
	}
}, Ii = () => {
	if (Mi < 0) {
		let e = Ti();
		Mi = (document.prerendering ? void 0 : globalThis.performance.getEntriesByType("visibility-state").find((t) => t.name === "hidden" && t.startTime >= e)?.startTime) ?? Pi(), addEventListener("visibilitychange", Fi, !0), addEventListener("prerenderingchange", Fi, !0), xi(() => {
			setTimeout(() => {
				Mi = Pi();
			});
		});
	}
	return {
		get firstHiddenTime() {
			return Mi;
		},
		onHidden(e) {
			Ni.add(e);
		}
	};
}, Li = (e) => {
	document.prerendering ? addEventListener("prerenderingchange", e, !0) : e();
}, Ri = [1800, 3e3], zi = (e, t = {}) => {
	Li(() => {
		let n = Ii(), r, i = Ei("FCP"), a = Ai("paint", (e) => {
			for (let t of e) t.name === "first-contentful-paint" && (a.disconnect(), t.startTime < n.firstHiddenTime && (i.value = Math.max(t.startTime - Ti(), 0), i.entries.push(t), r(!0)));
		});
		a && (r = Si(e, i, Ri, t.reportAllChanges), xi((n) => {
			i = Ei("FCP"), r = Si(e, i, Ri, t.reportAllChanges), Ci(() => {
				i.value = performance.now() - n.timeStamp, r(!0);
			});
		}));
	});
}, Bi = [.1, .25], Vi = (e, t = {}) => {
	let n = Ii();
	zi(ji(() => {
		let r, i = Ei("CLS", 0), a = Oi(t, ki), o = (e) => {
			for (let t of e) a.h(t);
			a.i > i.value && (i.value = a.i, i.entries = a.o, r());
		}, s = Ai("layout-shift", o);
		s && (r = Si(e, i, Bi, t.reportAllChanges), n.onHidden(() => {
			o(s.takeRecords()), r(!0);
		}), xi(() => {
			a.i = 0, i = Ei("CLS", 0), r = Si(e, i, Bi, t.reportAllChanges), Ci(r);
		}), setTimeout(r));
	}));
}, Hi = 0, Ui = Infinity, Wi = 0, Gi = (e) => {
	for (let t of e) t.interactionId && (Ui = Math.min(Ui, t.interactionId), Wi = Math.max(Wi, t.interactionId), Hi = Wi ? (Wi - Ui) / 7 + 1 : 0);
}, Ki, qi = () => Ki ? Hi : performance.interactionCount ?? 0, Ji = () => {
	"interactionCount" in performance || Ki || (Ki = Ai("event", Gi, { durationThreshold: 0 }));
}, Yi = 0, Xi = class {
	l = [];
	u = /* @__PURE__ */ new Map();
	m;
	p;
	v() {
		Yi = qi(), this.l.length = 0, this.u.clear();
	}
	T() {
		let e = Math.min(this.l.length - 1, Math.floor((qi() - Yi) / 50));
		return this.l[e];
	}
	h(e) {
		if (this.m?.(e), !e.interactionId && e.entryType !== "first-input") return;
		let t = this.l.at(-1), n = this.u.get(e.interactionId);
		if (n || this.l.length < 10 || e.duration > t.L) {
			if (n ? e.duration > n.L ? (n.entries = [e], n.L = e.duration) : e.duration === n.L && e.startTime === n.entries[0].startTime && n.entries.push(e) : (n = {
				id: e.interactionId,
				entries: [e],
				L: e.duration
			}, this.u.set(n.id, n), this.l.push(n)), this.l.sort((e, t) => t.L - e.L), this.l.length > 10) {
				let e = this.l.splice(10);
				for (let t of e) this.u.delete(t.id);
			}
			this.p?.(n);
		}
	}
}, Zi = (e) => {
	let t = globalThis.requestIdleCallback || setTimeout, n = globalThis.cancelIdleCallback || clearTimeout;
	if (document.visibilityState === "hidden") e();
	else {
		let r = ji(e), i = -1, a = () => {
			n(i), r();
		};
		addEventListener("visibilitychange", a, {
			once: !0,
			capture: !0
		}), i = t(() => {
			removeEventListener("visibilitychange", a, { capture: !0 }), r();
		});
	}
}, Qi = [200, 500], $i = (e, t = {}) => {
	if (!globalThis.PerformanceEventTiming || !("interactionId" in PerformanceEventTiming.prototype)) return;
	let n = Ii();
	Li(() => {
		Ji();
		let r, i = Ei("INP"), a = Oi(t, Xi), o = (e) => {
			Zi(() => {
				for (let t of e) a.h(t);
				let t = a.T();
				t && t.L !== i.value && (i.value = t.L, i.entries = t.entries, r());
			});
		}, s = Ai("event", o, { durationThreshold: t.durationThreshold ?? 40 });
		r = Si(e, i, Qi, t.reportAllChanges), s && (s.observe({
			type: "first-input",
			buffered: !0
		}), n.onHidden(() => {
			o(s.takeRecords()), r(!0);
		}), xi(() => {
			a.v(), i = Ei("INP"), r = Si(e, i, Qi, t.reportAllChanges);
		}));
	});
}, ea = async (e, t) => {
	let n = t.baseUrl + t.performance.api, r = 0, i = 0, a = 0, o = 0, s = 0, c = performance.getEntriesByType("paint"), l = c.find((e) => e.name === "first-paint"), u = c.find((e) => e.name === "first-contentful-paint");
	l && (r = l.startTime), u && (i = u.startTime);
	let { lcpTime: d, lcpObsercer: f } = await new Promise((e) => {
		let t = new PerformanceObserver((n) => {
			e({
				lcpTime: n.getEntries().at(-1)?.startTime || 0,
				lcpObsercer: t
			});
		});
		t.observe({
			type: "largest-contentful-paint",
			buffered: !0
		});
	});
	f.disconnect(), a = d, $i((e) => {
		o = e.value;
	}), Vi((e) => {
		s = e.value;
	}), window.addEventListener("visibilitychange", () => {
		document.visibilityState === "hidden" && fi(n, {
			visitorId: e,
			fp: r,
			fcp: i,
			lcp: a,
			inp: o,
			cls: s
		});
	}, { once: !0 });
}, ta = class {
	config;
	visitorId = null;
	initPromise = null;
	constructor(e) {
		this.config = e, this.init();
	}
	async init() {
		return this.initPromise ||= (async () => {
			let e = this.config;
			this.visitorId = await hi(e), gi(this.visitorId, e), _i(this.visitorId, e), yi(this.visitorId, e), ea(this.visitorId, e);
		})(), this.initPromise;
	}
	async setUserId(e) {
		await this.init(), await pi(this.config.baseUrl + this.config.uv.updateApi, {
			visitorId: this.visitorId,
			userId: e
		});
	}
};
//#endregion
export { ta as Tracker };

//# sourceMappingURL=tracker.js.map