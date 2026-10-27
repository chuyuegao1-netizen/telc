import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Languages, l as ArrowRight, o as Clock, s as Check, u as ArrowLeft } from "../_libs/lucide-react.mjs";
import { r as Route$1 } from "./router-D7Vs_JXx.mjs";
import { i as saveFullAttempt, n as loadProgress, r as patchWrong } from "./progress-DH-VT4V6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exam._setId-BCRsKdUM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LETTERS = "ABCDEFGHIJ";
var LIMIT = 960;
function shuffle(list) {
	const next = [...list];
	for (let i = next.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[next[i], next[j]] = [next[j], next[i]];
	}
	return next;
}
function formatTime(total) {
	return `${Math.floor(total / 60)}:${(total % 60).toString().padStart(2, "0")}`;
}
function ExamView({ set }) {
	const [phase, setPhase] = (0, import_react.useState)("intro");
	const [timed, setTimed] = (0, import_react.useState)(true);
	const [showZh, setShowZh] = (0, import_react.useState)(false);
	const [left, setLeft] = (0, import_react.useState)(LIMIT);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [options, setOptions] = (0, import_react.useState)([]);
	const [picks, setPicks] = (0, import_react.useState)({});
	const [subset, setSubset] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(null);
	const [saved, setSaved] = (0, import_react.useState)();
	const finishedRef = (0, import_react.useRef)(false);
	const picksRef = (0, import_react.useRef)(picks);
	picksRef.current = picks;
	(0, import_react.useEffect)(() => {
		setSaved(loadProgress()[set.id]);
	}, [set.id]);
	const active = (0, import_react.useMemo)(() => subset ? set.speakers.filter((speaker) => subset.includes(speaker.n)) : set.speakers, [set.speakers, subset]);
	const current = active[index];
	(0, import_react.useEffect)(() => {
		if (phase !== "run" || !timed) return;
		const id = window.setInterval(() => {
			setLeft((value) => value <= 1 ? 0 : value - 1);
		}, 1e3);
		return () => window.clearInterval(id);
	}, [phase, timed]);
	(0, import_react.useEffect)(() => {
		if (phase !== "run") {
			finishedRef.current = false;
			return;
		}
		if (timed && left === 0 && !finishedRef.current) {
			finishedRef.current = true;
			finish(picksRef.current);
		}
	}, [
		left,
		phase,
		timed
	]);
	function begin(nextSubset) {
		const pool = shuffle(set.speakers).map((speaker, i) => ({
			id: speaker.n,
			letter: LETTERS[i],
			claim: speaker.claim,
			claimZh: speaker.claimZh
		}));
		setSubset(nextSubset);
		setOptions(pool);
		setPicks({});
		setIndex(0);
		setLeft(LIMIT);
		setResult(null);
		setOpen(null);
		setShowZh(false);
		setPhase("run");
	}
	function finish(source) {
		const people = subset ? set.speakers.filter((speaker) => subset.includes(speaker.n)) : set.speakers;
		const wrong = people.filter((speaker) => source[speaker.n] !== speaker.n).map((speaker) => speaker.n);
		const full = people.length === set.speakers.length;
		const correct = people.length - wrong.length;
		if (full) setSaved(saveFullAttempt(set.id, correct, people.length, wrong));
		else patchWrong(set.id, people.map((speaker) => speaker.n), wrong);
		setResult({
			correct,
			total: people.length,
			wrong,
			picks: source,
			full
		});
		setPhase("done");
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	function choose(optionId) {
		if (!current) return;
		setPicks((prev) => {
			const next = { ...prev };
			for (const key of Object.keys(next)) if (next[Number(key)] === optionId) delete next[Number(key)];
			next[current.n] = optionId;
			return next;
		});
		setIndex((value) => Math.min(active.length - 1, value + 1));
	}
	const filled = active.filter((speaker) => picks[speaker.n] !== void 0).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-3xl px-4 pb-28 pt-5 sm:px-6 sm:pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex h-10 items-center gap-1 text-sm font-semibold text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					className: "size-4",
					"aria-hidden": true
				}), "题库"]
			}),
			phase === "intro" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Intro, {
				set,
				saved,
				timed,
				setTimed,
				onStart: () => begin(null),
				onWrong: () => saved && begin(saved.wrong),
				onRead: () => {
					setShowZh(false);
					setPhase("read");
				}
			}),
			phase === "read" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadMode, {
				set,
				showZh,
				onZh: () => setShowZh((value) => !value),
				onBack: () => setPhase("intro")
			}),
			phase === "run" && current && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Run, {
				set,
				active,
				current,
				index,
				setIndex,
				options,
				picks,
				filled,
				timed,
				left,
				showZh,
				onZh: () => setShowZh((value) => !value),
				onChoose: choose,
				onFinish: () => finish(picks)
			}),
			phase === "done" && result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Done, {
				set,
				result,
				options,
				open,
				setOpen,
				showZh,
				onZh: () => setShowZh((value) => !value),
				onAgain: () => begin(null),
				onWrong: () => begin(result.wrong)
			})
		]
	});
}
function Intro({ set, saved, timed, setTimed, onStart, onWrong, onRead }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-widest text-primary uppercase",
				children: set.group
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl text-ink sm:text-5xl",
				children: set.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-lg text-muted",
				children: set.titleZh
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mt-6 space-y-3 text-base leading-relaxed",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-2xl bg-paper p-4 ring-1 ring-line",
						children: "1. 按 1 到 8 读原文。没有录音，阅读就是这一遍听力。"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-2xl bg-paper p-4 ring-1 ring-line",
						children: "2. 选出最贴切的概括句。每句只用一次，点别人用过的会换过来。"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-2xl bg-paper p-4 ring-1 ring-line",
						children: "3. 八个人都选完再交卷。中文对照默认关掉。"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 flex h-12 items-center justify-between rounded-2xl bg-paper px-4 ring-1 ring-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
						className: "size-4 text-primary",
						"aria-hidden": true
					}), "计时 16 分钟"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: timed,
					onChange: (event) => setTimed(event.target.checked),
					className: "size-5 accent-primary"
				})]
			}),
			saved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm text-muted",
				children: [
					"练过 ",
					saved.attempts,
					" 次，最高 ",
					saved.best,
					"/",
					saved.total,
					"，最近 ",
					saved.last,
					"/",
					saved.total,
					"。"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onStart,
						className: "h-12 rounded-full bg-primary px-5 text-sm font-semibold text-primary-fg",
						children: "开始这套"
					}),
					saved && saved.wrong.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onWrong,
						className: "h-12 rounded-full bg-paper px-5 text-sm font-semibold text-ink ring-1 ring-line",
						children: [
							"只重做 ",
							saved.wrong.length,
							" 道错题"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onRead,
						className: "h-12 rounded-full px-4 text-sm font-semibold text-primary",
						children: "先对照精读"
					})
				]
			})
		]
	});
}
function Run({ set, active, current, index, setIndex, options, picks, filled, timed, left, showZh, onZh, onChoose, onFinish }) {
	const ownerOf = (id) => active.find((speaker) => picks[speaker.n] === id)?.n;
	const urgent = timed && left < 60;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-wide text-primary uppercase",
					children: set.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"已选 ",
						filled,
						"/",
						active.length,
						active.length < set.speakers.length ? " · 错题重做" : ""
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onZh,
						className: `inline-flex h-10 items-center gap-1 rounded-full px-3 text-sm font-semibold ${showZh ? "bg-mark text-ink" : "text-muted"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, {
							className: "size-4",
							"aria-hidden": true
						}), "中文"]
					}), timed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `font-display text-2xl tabular-nums ${urgent ? "text-accent" : "text-ink"}`,
						children: formatTime(left)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1",
				children: active.map((speaker, i) => {
					const on = i === index;
					const done = picks[speaker.n] !== void 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setIndex(i),
						className: `h-11 w-11 shrink-0 rounded-full text-sm font-semibold tabular-nums ${on ? "bg-primary text-primary-fg" : done ? "bg-mark text-ink" : "bg-paper text-muted ring-1 ring-line"}`,
						children: speaker.n
					}, speaker.n);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				lang: "de",
				className: "mt-3 rounded-2xl bg-paper p-4 ring-1 ring-line sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-sm tracking-widest text-primary uppercase",
						children: ["Person ", current.n]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-base leading-relaxed text-ink",
						children: current.de
					}),
					showZh && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 border-t border-line pt-3 text-sm leading-relaxed text-muted",
						children: current.zh
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-5 text-sm font-semibold text-muted",
				children: "哪一句是这个人的立场？"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-2",
				children: options.map((option) => {
					const selected = picks[current.n] === option.id;
					const owner = ownerOf(option.id);
					const taken = owner !== void 0 && owner !== current.n;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onChoose(option.id),
						className: `flex w-full gap-3 rounded-2xl px-3 py-3 text-left ring-1 ${selected ? "bg-primary text-primary-fg ring-primary" : "bg-paper text-ink ring-line"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${selected ? "bg-paper text-primary" : "bg-deep text-ink"}`,
							children: option.letter
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									lang: "de",
									className: "block text-sm leading-relaxed sm:text-base",
									children: option.claim
								}),
								showZh && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `mt-1 block text-sm leading-relaxed ${selected ? "text-primary-fg" : "text-muted"}`,
									children: option.claimZh
								}),
								taken && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `mt-1 block text-xs font-semibold ${selected ? "text-primary-fg" : "text-accent"}`,
									children: [
										"目前标在第 ",
										owner,
										" 人，点这里会换过来"
									]
								})
							]
						})]
					}) }, option.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 z-10 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-3xl items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: index === 0,
							onClick: () => setIndex(index - 1),
							className: "inline-flex h-11 items-center gap-1 rounded-full px-3 text-sm font-semibold text-ink disabled:opacity-40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
								className: "size-4",
								"aria-hidden": true
							}), "上一位"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: index === active.length - 1,
							onClick: () => setIndex(index + 1),
							className: "inline-flex h-11 items-center gap-1 rounded-full px-3 text-sm font-semibold text-ink disabled:opacity-40",
							children: ["下一位", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								className: "size-4",
								"aria-hidden": true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onFinish,
							disabled: filled < active.length,
							className: "ml-auto h-11 rounded-full bg-accent px-4 text-sm font-semibold text-paper disabled:opacity-40",
							children: filled < active.length ? `还差 ${active.length - filled} 人` : "交卷"
						})
					]
				})
			})
		]
	});
}
function Done({ set, result, options, open, setOpen, showZh, onZh, onAgain, onWrong }) {
	const people = set.speakers.filter((speaker) => speaker.n in result.picks || result.wrong.includes(speaker.n) || result.full);
	const ratio = result.correct / result.total;
	const tone = ratio >= .85 ? "稳" : ratio >= .6 ? "还行，看看偏的那几位" : "先别急着刷下一套";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-widest text-primary uppercase",
				children: "结果"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-2 font-display text-5xl tabular-nums text-ink",
				children: [result.correct, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted",
					children: ["/", result.total]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-lg text-muted",
				children: [
					tone,
					"。",
					result.full ? "这次记入最高分。" : "只更新了错题，没有覆盖整套最高分。"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onZh,
				className: "mt-3 inline-flex h-10 items-center gap-1 text-sm font-semibold text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, {
					className: "size-4",
					"aria-hidden": true
				}), showZh ? "隐藏中文" : "显示中文"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: people.map((speaker) => {
					const picked = result.picks[speaker.n];
					const ok = picked === speaker.n;
					const chosen = options.find((option) => option.id === picked);
					const expanded = open === speaker.n;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: `rounded-2xl p-4 ring-1 ${ok ? "bg-good-bg ring-good-bg" : "bg-bad-bg ring-bad-bg"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-paper ${ok ? "bg-good" : "bg-bad"}`,
								children: ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "size-4",
									"aria-hidden": true
								}) : speaker.n
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-semibold text-ink",
										children: [
											"第 ",
											speaker.n,
											" 人 ",
											ok ? "对了" : "没对上"
										]
									}),
									!ok && chosen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										lang: "de",
										className: "mt-1 text-sm leading-relaxed text-bad",
										children: ["你选的：", chosen.claim]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										lang: "de",
										className: "mt-1 text-sm leading-relaxed text-ink",
										children: ok ? speaker.claim : `正确：${speaker.claim}`
									}),
									showZh && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm leading-relaxed text-muted",
										children: speaker.claimZh
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "mt-2 text-sm font-semibold text-primary",
										onClick: () => setOpen(expanded ? null : speaker.n),
										children: expanded ? "收起原文" : "看原文"
									}),
									expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											lang: "de",
											className: "text-sm leading-relaxed text-ink",
											children: speaker.de
										}), showZh && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm leading-relaxed text-muted",
											children: speaker.zh
										})]
									})
								]
							})]
						})
					}, speaker.n);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onAgain,
						className: "h-12 rounded-full bg-primary px-5 text-sm font-semibold text-primary-fg",
						children: "再考一次，选项重排"
					}),
					result.wrong.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onWrong,
						className: "h-12 rounded-full bg-paper px-5 text-sm font-semibold text-ink ring-1 ring-line",
						children: [
							"只重做这 ",
							result.wrong.length,
							" 道"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex h-12 items-center px-3 text-sm font-semibold text-muted",
						children: "回题库"
					})
				]
			})
		]
	});
}
function ReadMode({ set, showZh, onZh, onBack }) {
	const [open, setOpen] = (0, import_react.useState)(1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-widest text-primary uppercase",
				children: "精读"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl text-ink",
				children: set.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: "先看概括句，再展开原文。模考时不要靠这里背序号，序号换一套卷就变了。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onBack,
					className: "h-10 rounded-full px-3 text-sm font-semibold text-primary",
					children: "返回"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onZh,
					className: "h-10 rounded-full bg-paper px-3 text-sm font-semibold text-ink ring-1 ring-line",
					children: showZh ? "隐藏中文" : "显示中文"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: set.speakers.map((speaker) => {
					const expanded = open === speaker.n;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl bg-paper p-4 ring-1 ring-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "w-full text-left",
							onClick: () => setOpen(expanded ? null : speaker.n),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-semibold text-primary",
									children: [
										"第 ",
										speaker.n,
										" 人"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									lang: "de",
									className: "mt-1 text-base leading-relaxed text-ink",
									children: speaker.claim
								}),
								showZh && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm leading-relaxed text-muted",
									children: speaker.claimZh
								})
							]
						}), expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 border-t border-line pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								lang: "de",
								className: "text-sm leading-relaxed text-ink",
								children: speaker.de
							}), showZh && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: speaker.zh
							})]
						})]
					}, speaker.n);
				})
			})
		]
	});
}
var SplitComponent = function ExamPage() {
	const { set } = Route$1.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExamView, { set }, set.id);
};
//#endregion
export { SplitComponent as component };
