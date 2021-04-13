/**
 * Interactive Image jQuery plug-in
 *
 * @author Jean-Philippe Chateau <contact@jpchateau.com>
 * @version 0.4.0
 * @license MIT https://github.com/jpchateau/Interactive-Image/blob/master/LICENSE
 */
(function ($) {
    'use strict';

    $.interactiveImage = function (items, settings, $image) {
        var debug = function (message) {
            if (window.console && window.console.log && true === settings.debug) {
                console.log(message);
            }
        };

        var checkSettings = function () {
            if ('undefined' !== typeof settings.debug && (false !== settings.debug && true !== settings.debug)) {
                throw 'Error: check debug option';
            }

            debug('Settings checked');
        };

        var optionsDefaults = {
            fontColor: "#000",
            backgroundColor: "#fff"
        };

        var createDomElement = function (tag, cssClass) {
            var DOMElement = document.createElement(tag);
            DOMElement.setAttribute('class', cssClass);

            return DOMElement;
        };

        var AbstractItem = function (top, left, backgroundColor, fontColor, title, cnt, idx) {
            this.top = top;
            this.left = left;
            this.backgroundColor = backgroundColor;
            this.fontColor = fontColor;
            this.title = title;
            this.cnt = cnt;
            this.idx = idx;
        };

        AbstractItem.prototype.createIcon = function () {
            var iconElement = createDomElement('div', 'icon-button icon-radio-checked');
            iconElement.setAttribute('data-for', this.idx);
            iconElement.setAttribute('id', 'req_'+this.idx);
            iconElement.style.top = this.top + 'px';
            iconElement.style.left = this.left + 'px';

            var addSpan = createDomElement('div', 'contCount');
            addSpan.appendChild(document.createTextNode(this.cnt));
            iconElement.appendChild(addSpan);
            
            return iconElement;
        };
        
        AbstractItem.prototype.createWorkIcon = function () {
            var iconElement = createDomElement('div', 'icon-button icon-radio-worked');
            iconElement.setAttribute('data-for', this.idx);
            iconElement.setAttribute('id', 'req_'+this.idx);
            iconElement.style.top = this.top + 'px';
            iconElement.style.left = this.left + 'px';
            
            var addSpan = createDomElement('div', 'contCount');
            addSpan.appendChild(document.createTextNode(this.cnt));
            iconElement.appendChild(addSpan);

            return iconElement;
        };
        
        AbstractItem.prototype.createCompleteIcon = function () {
            var iconElement = createDomElement('div', 'icon-button icon-radio-completed');
            iconElement.setAttribute('data-for', this.idx);
            iconElement.setAttribute('id', 'req_'+this.idx);
            iconElement.style.top = this.top + 'px';
            iconElement.style.left = this.left + 'px';

            var addSpan = createDomElement('div', 'contCount');
            addSpan.appendChild(document.createTextNode(this.cnt));
            iconElement.appendChild(addSpan);
            
            return iconElement;
        };

        AbstractItem.prototype.createTitle = function () {
            var titleElement = createDomElement('span', 'title');
            titleElement.appendChild(document.createTextNode("요청 구분 : "+this.title));

            return titleElement;
        };

        AbstractItem.prototype.renderHtml = function () {
            throw 'Error: render method not implemented';
        };

        var TextItem = function (top, left, backgroundColor, frontColor, title, cnt, description, picture, link, idx) {
            var textItem = new AbstractItem(top, left, backgroundColor, frontColor, title, cnt, idx);
            textItem.description = description;
            textItem.picture = picture;
            textItem.link = link;

            textItem.createDescription = function () {
                var descriptionElement = createDomElement('p', 'description');
                //descriptionElement.appendChild(document.createTextNode(this.description));
                descriptionElement.innerHTML = this.description;

                return descriptionElement;
            };

            textItem.createPicture = function () {
                var pictureElement = createDomElement('img', 'picture');
                pictureElement.src = this.picture;

                return pictureElement;
            };

            textItem.createLink = function () {
                var label, linkElement = document.createElement('a');
                linkElement.href = this.link.href;
                linkElement.style.color = this.fontColor;

                if ("undefined" !== this.link.label) {
                    label = this.link.label;
                } else {
                    label = this.link.href;
                }

                linkElement.appendChild(document.createTextNode(label));

                return linkElement;
            };

            textItem.renderHtml = function () {
            	/*
            	 * 마우스 오버시 정보레이어 show
            	 */
                var containerElement = createDomElement('div', 'container');
                containerElement.setAttribute('data-id', this.idx);
                containerElement.style.color = this.fontColor;
                //containerElement.style.backgroundColor = this.backgroundColor;
                if(this.backgroundColor=='red') containerElement.style.backgroundColor = '#f99';
                else if (this.backgroundColor=='green') containerElement.style.backgroundColor = '#9f9';
                else if (this.backgroundColor=='yellow') containerElement.style.backgroundColor = '#ff9';
                else containerElement.style.backgroundColor = '#fff';
                containerElement.style.left = (this.left + 70) + 'px';
                containerElement.style.top = (this.top + 35) + 'px';

                containerElement.appendChild(this.createTitle());
                containerElement.appendChild(this.createDescription());

                if ('undefined' !== typeof this.picture) {
                    containerElement.appendChild(this.createPicture());
                }

                if ('undefined' !== typeof this.link) {
                    containerElement.appendChild(this.createLink());
                }

                return containerElement;
                
            	//return "";
            };

            return textItem;
        };

        var createElement = function (options) {
            options = $.extend({}, optionsDefaults, options);
            debug('Options:');
            debug(options);

            var element = new TextItem(options.top, options.left, options.backgroundColor, options.fontColor, options.title, options.cnt, options.description, options.picture, options.link,options.idx);
            debug('Item ' + element.backgroundColor + ' created');

            if(element.backgroundColor=='red') $image.append(element.createIcon());
            else if(element.backgroundColor=='yellow') $image.append(element.createWorkIcon());
            else $image.append(element.createCompleteIcon());

            return $(element.renderHtml());
        };

        var buildElements = function () {
            var i;
            for (i in items) {
                if (items.hasOwnProperty(i)) {
                    $image.append(createElement(items[i]));
                }
            }
        };

        var bindEvents = function () {
			$image.unbind('click');
			$image.unbind('mouseover');
			$image.unbind('mouseleave');

            $image.on('click', '.icon-button', function () {
                var seq = $(this).attr('data-for');
                //console.log(seq+" 관련 내용 팝업 호출");
                //MAIN('openList');
                $('input:radio[name=searchType]:input[value=ALL]').prop("checked", true);
                fnReqBoardList(seq);
            });
            
			
            $image.on('mouseover', '.icon-button', function () {
                var $container = $('div[data-id="' + $(this).attr('data-for') + '"]');
                if ($container.css('display') !== 'block') {
                    $container.fadeIn('fast');
                }
            });
            debug('Event mouseover on icon created');

            $image.on('mouseleave', '.icon-button', function () {
                var $container = $('div[data-id="' + $(this).attr('data-for') + '"]');
                if ($container.css('display') === 'block') {
                    $container.hide();
                }
            });
            debug('Event mouseleave on icon created');
/*
            $image.on('mouseover', function () {
                var $icons = $(this).find('.icon-button');
                $.each($icons, function () {
                    if ($(this).css('display') !== 'block') {
                        $(this).fadeIn('fast');
                    }
                });
            });
            debug('Event mouseover on image created');

            $image.on('mouseleave', function () {
                var $icons = $(this).find('.icon-button');
                $.each($icons, function () {
                    if ($(this).css('display') === 'block') {
                        $(this).hide();
                    }
                });
            });
            debug('Event mouseleave on image created');
*/
        };

        try {
            checkSettings();
            buildElements();
            bindEvents();
        } catch (exception) {
            $image.html(exception);
        }
    };

    $.fn.interactiveImage = function (items, options) {
        var optionsDefaults = {
            debug: false
        };

        options = $.extend({}, optionsDefaults, options);

        return this.each(function () {
            (new $.interactiveImage(items, options, $(this)));
        });
    };



}(jQuery));