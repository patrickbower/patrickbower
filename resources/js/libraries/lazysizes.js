(function(window, factory) {
    var lazySizes = factory(window, window.document);
    window.lazySizes = lazySizes;
    if(typeof module == 'object' && module.exports){
        module.exports = lazySizes;
    }
}(window, function l(window, document) {
    'use strict';
    /*jshint eqnull:true */
    if(!document.getElementsByClassName){return;}

    var lazySizesConfig;

    var docElem = document.documentElement;

    var Date = window.Date;

    var supportPicture = window.HTMLPictureElement;

    var _addEventListener = 'addEventListener';

    var _getAttribute = 'getAttribute';

    var addEventListener = window[_addEventListener];

    var setTimeout = window.setTimeout;

    var requestAnimationFrame = window.requestAnimationFrame || setTimeout;

    var requestIdleCallback = window.requestIdleCallback;

    var regPicture = /^picture$/i;

    var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];

    var regClassCache = {};

    var forEach = Array.prototype.forEach;

    var hasClass = function(ele, cls) {
        if(!regClassCache[cls]){
            regClassCache[cls] = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        }
        return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
    };

    var addClass = function(ele, cls) {
        if (!hasClass(ele, cls)){
            ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
        }
    };

    var removeClass = function(ele, cls) {
        var reg;
        if ((reg = hasClass(ele,cls))) {
            ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
        }
    };

    var addRemoveLoadEvents = function(dom, fn, add){
        var action = add ? _addEventListener : 'removeEventListener';
        if(add){
            addRemoveLoadEvents(dom, fn);
        }
        loadEvents.forEach(function(evt){
            dom[action](evt, fn);
        });
    };

    var triggerEvent = function(elem, name, detail, noBubbles, noCancelable){
        var event = document.createEvent('CustomEvent');

        event.initCustomEvent(name, !noBubbles, !noCancelable, detail || {});

        elem.dispatchEvent(event);
        return event;
    };

    var updatePolyfill = function (el, full){
        var polyfill;
        if( !supportPicture && ( polyfill = (window.picturefill || lazySizesConfig.pf) ) ){
            polyfill({reevaluate: true, elements: [el]});
        } else if(full && full.src){
            el.src = full.src;
        }
    };

    var getCSS = function (elem, style){
        return (getComputedStyle(elem, null) || {})[style];
    };

    var getWidth = function(elem, parent, width){
        width = width || elem.offsetWidth;

        while(width < lazySizesConfig.minSize && parent && !elem._lazysizesWidth){
            width =  parent.offsetWidth;
            parent = parent.parentNode;
        }

        return width;
    };

    var rAF = (function(){
        var running, waiting;
        var fns = [];

        var run = function(){
            var fn;
            running = true;
            waiting = false;
            while(fns.length){
                fn = fns.shift();
                fn[0].apply(fn[1], fn[2]);
            }
            running = false;
        };

        return function(fn){
            if(running){
                fn.apply(this, arguments);
            } else {
                fns.push([fn, this, arguments]);

                if(!waiting){
                    waiting = true;
                    (document.hidden ? setTimeout : requestAnimationFrame)(run);
                }
            }
        };
    })();

    var rAFIt = function(fn, simple){
        return simple ?
            function() {
                rAF(fn);
            } :
            function(){
                var that = this;
                var args = arguments;
                rAF(function(){
                    fn.apply(that, args);
                });
            }
        ;
    };

    var throttle = function(fn){
        var running;
        var lastTime = 0;
        var gDelay = 99;
        var RIC_DEFAULT_TIMEOUT = 999;
        var rICTimeout = RIC_DEFAULT_TIMEOUT;
        var run = function(){
            running = false;
            lastTime = Date.now();
            fn();
        };
        var idleCallback = requestIdleCallback ?
            function(){
                requestIdleCallback(run, {timeout: rICTimeout});
                if(rICTimeout !== RIC_DEFAULT_TIMEOUT){
                    rICTimeout = RIC_DEFAULT_TIMEOUT;
                }
            }:
            rAFIt(function(){
                setTimeout(run);
            }, true)
        ;

        return function(isPriority){
            var delay;
            if((isPriority = isPriority === true)){
                rICTimeout = 66;
            }

            if(running){
                return;
            }

            running =  true;

            delay = gDelay - (Date.now() - lastTime);

            if(delay < 0){
                delay = 0;
            }

            if(isPriority || (delay < 9 && requestIdleCallback)){
                idleCallback();
            } else {
                setTimeout(idleCallback, delay);
            }
        };
    };

    //based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html
    var debounce = function(func) {
        var timeout, timestamp;
        var wait = 99;
        var run = function(){
            timeout = null;
            func();
        };
        var later = function() {
            var last = Date.now() - timestamp;

            if (last < wait) {
                setTimeout(later, wait - last);
            } else {
                (requestIdleCallback || run)(run);
            }
        };

        return function() {
            timestamp = Date.now();

            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
        };
    };


    var loader = (function(){
        var lazyloadElems, preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;

        var eLvW, elvH, eLtop, eLleft, eLright, eLbottom;

        var defaultExpand, preloadExpand, hFac;

        var regImg = /^img$/i;
        var regIframe = /^iframe$/i;

        var supportScroll = ('onscroll' in window) && !(/glebot/.test(navigator.userAgent));

        var shrinkExpand = 0;
        var currentExpand = 0;

        var isLoading = 0;
        var lowRuns = 0;

        var resetPreloading = function(e){
            isLoading--;
            if(e && e.target){
                addRemoveLoadEvents(e.target, resetPreloading);
            }

            if(!e || isLoading < 0 || !e.target){
                isLoading = 0;
            }
        };

        var isNestedVisible = function(elem, elemExpand){
            var outerRect;
            var parent = elem;
            var visible = getCSS(document.body, 'visibility') == 'hidden' || getCSS(elem, 'visibility') != 'hidden';

            eLtop -= elemExpand;
            eLbottom += elemExpand;
            eLleft -= elemExpand;
            eLright += elemExpand;

            while(visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem){
                visible = ((getCSS(parent, 'opacity') || 1) > 0);

                if(visible && getCSS(parent, 'overflow') != 'visible'){
                    outerRect = parent.getBoundingClientRect();
                    visible = eLright > outerRect.left &&
                        eLleft < outerRect.right &&
                        eLbottom > outerRect.top - 1 &&
                        eLtop < outerRect.bottom + 1
                    ;
                }
            }

            return visible;
        };

        var checkElements = function() {
            var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal;

            if((loadMode = lazySizesConfig.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)){

                i = 0;

                lowRuns++;

                if(preloadExpand == null){
                    if(!('expand' in lazySizesConfig)){
                        lazySizesConfig.expand = docElem.clientHeight > 600 ? docElem.clientWidth > 600 ? 550 : 410 : 359;
                    }

                    defaultExpand = lazySizesConfig.expand;
                    preloadExpand = defaultExpand * lazySizesConfig.expFactor;
                }

                if(currentExpand < preloadExpand && isLoading < 1 && lowRuns > 3 && loadMode > 2){
                    currentExpand = preloadExpand;
                    lowRuns = 0;
                } else if(loadMode > 1 && lowRuns > 2 && isLoading < 6){
                    currentExpand = defaultExpand;
                } else {
                    currentExpand = shrinkExpand;
                }

                for(; i < eLlen; i++){

                    if(!lazyloadElems[i] || lazyloadElems[i]._lazyRace){continue;}

                    if(!supportScroll){unveilElement(lazyloadElems[i]);continue;}

                    if(!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)){
                        elemExpand = currentExpand;
                    }

                    if(beforeExpandVal !== elemExpand){
                        eLvW = innerWidth + (elemExpand * hFac);
                        elvH = innerHeight + elemExpand;
                        elemNegativeExpand = elemExpand * -1;
                        beforeExpandVal = elemExpand;
                    }

                    rect = lazyloadElems[i].getBoundingClientRect();

                    if ((eLbottom = rect.bottom) >= elemNegativeExpand &&
                        (eLtop = rect.top) <= elvH &&
                        (eLright = rect.right) >= elemNegativeExpand * hFac &&
                        (eLleft = rect.left) <= eLvW &&
                        (eLbottom || eLright || eLleft || eLtop) &&
                        ((isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4)) || isNestedVisible(lazyloadElems[i], elemExpand))){
                        unveilElement(lazyloadElems[i]);
                        loadedSomething = true;
                        if(isLoading > 9){break;}
                    } else if(!loadedSomething && isCompleted && !autoLoadElem &&
                        isLoading < 4 && lowRuns < 4 && loadMode > 2 &&
                        (preloadElems[0] || lazySizesConfig.preloadAfterLoad) &&
                        (preloadElems[0] || (!elemExpandVal && ((eLbottom || eLright || eLleft || eLtop) || lazyloadElems[i][_getAttribute](lazySizesConfig.sizesAttr) != 'auto')))){
                        autoLoadElem = preloadElems[0] || lazyloadElems[i];
                    }
                }

                if(autoLoadElem && !loadedSomething){
                    unveilElement(autoLoadElem);
                }
            }
        };

        var throttledCheckElements = throttle(checkElements);

        var switchLoadingClass = function(e){
            addClass(e.target, lazySizesConfig.loadedClass);
            removeClass(e.target, lazySizesConfig.loadingClass);
            addRemoveLoadEvents(e.target, rafSwitchLoadingClass);
        };
        var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
        var rafSwitchLoadingClass = function(e){
            rafedSwitchLoadingClass({target: e.target});
        };

        var changeIframeSrc = function(elem, src){
            try {
                elem.contentWindow.location.replace(src);
            } catch(e){
                elem.src = src;
            }
        };

        var handleSources = function(source){
            var customMedia, parent;

            var sourceSrcset = source[_getAttribute](lazySizesConfig.srcsetAttr);

            if( (customMedia = lazySizesConfig.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) ){
                source.setAttribute('media', customMedia);
            }

            if(sourceSrcset){
                source.setAttribute('srcset', sourceSrcset);
            }

            //https://bugzilla.mozilla.org/show_bug.cgi?id=1170572
            if(customMedia){
                parent = source.parentNode;
                parent.insertBefore(source.cloneNode(), source);
                parent.removeChild(source);
            }
        };

        var lazyUnveil = rAFIt(function (elem, detail, isAuto, sizes, isImg){
            var src, srcset, parent, isPicture, event, firesLoad;

            if(!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented){

                if(sizes){
                    if(isAuto){
                        addClass(elem, lazySizesConfig.autosizesClass);
                    } else {
                        elem.setAttribute('sizes', sizes);
                    }
                }

                srcset = elem[_getAttribute](lazySizesConfig.srcsetAttr);
                src = elem[_getAttribute](lazySizesConfig.srcAttr);

                if(isImg) {
                    parent = elem.parentNode;
                    isPicture = parent && regPicture.test(parent.nodeName || '');
                }

                firesLoad = detail.firesLoad || (('src' in elem) && (srcset || src || isPicture));

                event = {target: elem};

                if(firesLoad){
                    addRemoveLoadEvents(elem, resetPreloading, true);
                    clearTimeout(resetPreloadingTimer);
                    resetPreloadingTimer = setTimeout(resetPreloading, 2500);

                    addClass(elem, lazySizesConfig.loadingClass);
                    addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
                }

                if(isPicture){
                    forEach.call(parent.getElementsByTagName('source'), handleSources);
                }

                if(srcset){
                    elem.setAttribute('srcset', srcset);
                } else if(src && !isPicture){
                    if(regIframe.test(elem.nodeName)){
                        changeIframeSrc(elem, src);
                    } else {
                        elem.src = src;
                    }
                }

                if(srcset || isPicture){
                    updatePolyfill(elem, {src: src});
                }
            }

            rAF(function(){
                if(elem._lazyRace){
                    delete elem._lazyRace;
                }
                removeClass(elem, lazySizesConfig.lazyClass);

                if( !firesLoad || elem.complete ){
                    if(firesLoad){
                        resetPreloading(event);
                    } else {
                        isLoading--;
                    }
                    switchLoadingClass(event);
                }
            });
        });

        var unveilElement = function (elem){
            var detail;

            var isImg = regImg.test(elem.nodeName);

            //allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")
            var sizes = isImg && (elem[_getAttribute](lazySizesConfig.sizesAttr) || elem[_getAttribute]('sizes'));
            var isAuto = sizes == 'auto';

            if( (isAuto || !isCompleted) && isImg && (elem.src || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesConfig.errorClass)){return;}

            detail = triggerEvent(elem, 'lazyunveilread').detail;

            if(isAuto){
                 autoSizer.updateElem(elem, true, elem.offsetWidth);
            }

            elem._lazyRace = true;
            isLoading++;

            lazyUnveil(elem, detail, isAuto, sizes, isImg);
        };

        var onload = function(){
            if(isCompleted){return;}
            if(Date.now() - started < 999){
                setTimeout(onload, 999);
                return;
            }
            var afterScroll = debounce(function(){
                lazySizesConfig.loadMode = 3;
                throttledCheckElements();
            });

            isCompleted = true;

            lazySizesConfig.loadMode = 3;

            throttledCheckElements();

            addEventListener('scroll', function(){
                if(lazySizesConfig.loadMode == 3){
                    lazySizesConfig.loadMode = 2;
                }
                afterScroll();
            }, true);
        };

        return {
            _: function(){
                started = Date.now();

                lazyloadElems = document.getElementsByClassName(lazySizesConfig.lazyClass);
                preloadElems = document.getElementsByClassName(lazySizesConfig.lazyClass + ' ' + lazySizesConfig.preloadClass);
                hFac = lazySizesConfig.hFac;

                addEventListener('scroll', throttledCheckElements, true);

                addEventListener('resize', throttledCheckElements, true);

                if(window.MutationObserver){
                    new MutationObserver( throttledCheckElements ).observe( docElem, {childList: true, subtree: true, attributes: true} );
                } else {
                    docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);
                    docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);
                    setInterval(throttledCheckElements, 999);
                }

                addEventListener('hashchange', throttledCheckElements, true);

                //, 'fullscreenchange'
                ['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend', 'webkitAnimationEnd'].forEach(function(name){
                    document[_addEventListener](name, throttledCheckElements, true);
                });

                if((/d$|^c/.test(document.readyState))){
                    onload();
                } else {
                    addEventListener('load', onload);
                    document[_addEventListener]('DOMContentLoaded', throttledCheckElements);
                    setTimeout(onload, 20000);
                }

                throttledCheckElements(lazyloadElems.length > 0);
            },
            checkElems: throttledCheckElements,
            unveil: unveilElement
        };
    })();


    var autoSizer = (function(){
        var autosizesElems;

        var sizeElement = rAFIt(function(elem, parent, event, width){
            var sources, i, len;
            elem._lazysizesWidth = width;
            width += 'px';

            elem.setAttribute('sizes', width);

            if(regPicture.test(parent.nodeName || '')){
                sources = parent.getElementsByTagName('source');
                for(i = 0, len = sources.length; i < len; i++){
                    sources[i].setAttribute('sizes', width);
                }
            }

            if(!event.detail.dataAttr){
                updatePolyfill(elem, event.detail);
            }
        });
        var getSizeElement = function (elem, dataAttr, width){
            var event;
            var parent = elem.parentNode;

            if(parent){
                width = getWidth(elem, parent, width);
                event = triggerEvent(elem, 'lazybeforesizes', {width: width, dataAttr: !!dataAttr});

                if(!event.defaultPrevented){
                    width = event.detail.width;

                    if(width && width !== elem._lazysizesWidth){
                        sizeElement(elem, parent, event, width);
                    }
                }
            }
        };

        var updateElementsSizes = function(){
            var i;
            var len = autosizesElems.length;
            if(len){
                i = 0;

                for(; i < len; i++){
                    getSizeElement(autosizesElems[i]);
                }
            }
        };

        var debouncedUpdateElementsSizes = debounce(updateElementsSizes);

        return {
            _: function(){
                autosizesElems = document.getElementsByClassName(lazySizesConfig.autosizesClass);
                addEventListener('resize', debouncedUpdateElementsSizes);
            },
            checkElems: debouncedUpdateElementsSizes,
            updateElem: getSizeElement
        };
    })();

    var init = function(){
        if(!init.i){
            init.i = true;
            autoSizer._();
            loader._();
        }
    };

    (function(){
        var prop;

        var lazySizesDefaults = {
            lazyClass: 'lazyload',
            loadedClass: 'lazyloaded',
            loadingClass: 'lazyloading',
            preloadClass: 'lazypreload',
            errorClass: 'lazyerror',
            //strictClass: 'lazystrict',
            autosizesClass: 'lazyautosizes',
            srcAttr: 'data-src',
            srcsetAttr: 'data-srcset',
            sizesAttr: 'data-sizes',
            //preloadAfterLoad: false,
            minSize: 40,
            customMedia: {},
            init: true,
            expFactor: 1.7,
            hFac: 0.8,
            loadMode: 2
        };

        lazySizesConfig = window.lazySizesConfig || window.lazysizesConfig || {};

        for(prop in lazySizesDefaults){
            if(!(prop in lazySizesConfig)){
                lazySizesConfig[prop] = lazySizesDefaults[prop];
            }
        }

        window.lazySizesConfig = lazySizesConfig;

        setTimeout(function(){
            if(lazySizesConfig.init){
                init();
            }
        });
    })();

    return {
        cfg: lazySizesConfig,
        autoSizer: autoSizer,
        loader: loader,
        init: init,
        uP: updatePolyfill,
        aC: addClass,
        rC: removeClass,
        hC: hasClass,
        fire: triggerEvent,
        gW: getWidth,
        rAF: rAF,
    };
}
));
