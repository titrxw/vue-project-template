/**
 * YDUI ??ß³Ä‘??Ðõ??ºÅ?
 * remÝ°¡Þ??½Ù???Ý°\??ÉÏòµ½z?px / 100 = ½W???rem  óð?: 100px = 1rem
 */
!function (window) {

    /* Ý°\??ÕÉ??óÁ£å?¾_? */
    var docWidth = 750;

    var doc = window.document,
        docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    var recalc = (function refreshRem () {
        var clientWidth = docEl.getBoundingClientRect().width;

        /* 8.55çŒ?½qäa?320pxóÝ???Ä‘????11.2çŒ?ÎÉ§ä??420pxóÝ????ÉÏ¤§ */
        docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5 + 'px';

        return refreshRem;
    })();

    /* Ðßôé????Ðõ???Çr?çŒ?½W?????Ðõä^?1 */
    docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

    if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
        /* Ðßôé??IOS??Çr? */
        doc.documentElement.classList.add('ios');
        /* IOS8óò¥ä?ÄŽ?htmlÐßôé??hairline?èì???óò¥äÉÒ?ºÅ?ÎÉ??? */
        if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
            doc.documentElement.classList.add('hairline');
    }

    if (!doc.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

}(window);