/**
 * Created by 周志锋 on 2017/8/16 0016.
 */

var Animation = (function () {
	var setStyle = function (dom, cssObj) {
		if (dom && typeof cssObj === 'object') {
			for (var key in cssObj) {
				dom.style[key] = cssObj[key];
			}
		}
		return dom;
	};
	// 转化为css字符串
	var toCssStr = function (obj) {
		if (!obj) {
			return '{}';
		}
		str = '';
		for (var key in obj) {
			str += (key + ':' + obj[key] + ';');
		}
		return str;
	};

	var setPointStyle = function (dom, css) {
		setStyle(dom, {
			background: css.background || '#9a0000',
			animationName: css.animationName || 'loading-p2',
			animationDuration: css.animationDuration || '2s',
			animationIterationCount: css.animationIterationCount || 'infinite',
			animationTimingFunction: css.animationTimingFunction || 'linear',
			animationDelay: css.animationDelay || '0'
		})
	};

	var setKeyframes = function (animationName, kfObj) {
		var stlSt = document.styleSheets[0];
		var len = stlSt.cssRules.length;
		var kfStr = '';
		for (var i in kfObj) {
			kfStr += (i + '{' + toCssStr(kfObj[i]) + '} ');
		}
		kfStr = ('@keyframes ' + animationName + ' {' + kfStr + '}');
		stlSt.insertRule(kfStr, len);
	};
	return {
		init: function (paramObj) {
			var count = paramObj.pointCount || 3;
			var bg = paramObj.background || '#fff';
			var ct = paramObj.container || document;
			var size = (paramObj.size || '10') + 'px';

			var winWidth = window.innerWidth;
			var duraTime = winWidth < 500 ? 1.5 : 2;
			// var interval = duraTime / (winWidth * (8 / 500));
			var interval = duraTime / (winWidth * 0.016);
			var delay = 0;

			for (var i = 0; i < count; i++) {
				var div = document.createElement('div');
				setStyle(div, {
					display: 'inline-block',
					position: 'absolute',
					left: 0,
					width: size,
					height: size,
					borderRadius: '50%',
					background: bg,
					opacity: 0
				});
				ct.appendChild(div);

				var name = 'loading-p' + i;
				setPointStyle(div, {
					background: '#fff',
					animationName: name,
					animationDelay: delay + 's',
					animationDuration: duraTime + 's'
				});
				setKeyframes(name, {
					"0%": {
						opacity: 0,
						transform: 'translateX(0)'
					},
					"33%": {
						opacity: 1,
						transform: 'translateX(' + winWidth * 0.4 + 'px)'
					},
					"66%": {

						opacity: 1,
						transform: 'translateX(' + winWidth * 0.6 + 'px)'
					},
					"100%": {

						opacity: 0,
						transform: 'translateX(' + winWidth + 'px)'
					}
				});

				delay += interval;

			}
		}

	}
}());