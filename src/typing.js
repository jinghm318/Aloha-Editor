/* typing.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor.
 * Copyright (c) 2010-2013 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php
 */
define([
	'dom',
	'keys',
	'ranges',
	'editing'
], function Typing(
	dom,
	keys,
	ranges,
	editing
) {
	'use strict';

	function enter(msg) {
		ranges.insertTextBehind(msg.range, '¶');
	}

	function space(msg) {
		ranges.insertTextBehind(msg.range, '·');
		msg.event.preventDefault();
	}

	function delete_(msg) {
		ranges.select(editing.remove(msg.range));
		msg.event.preventDefault();
	}

	// h (72) => left  (37)
	// k (75) => up    (38)
	// l (76) => right (39)
	// j (74) => down  (40)
	var movement = {
		72: 37,
		75: 38,
		76: 39,
		74: 40
	};

	function triggerKeyboardEvent(elem, name, code) {
		var event = document.createEventObject
		          ? document.createEventObject()
		          : document.createEvent('Event');

		if (event.initEvent) {
			event.initEvent(name, true, true);
		}
	
		event.keyIdentifier = 'U+004A';

		if (elem.dispatchEvent) {
			elem.dispatchEvent(event);
		} else {
			elem.fireEvent('on' + name, event);
		}
	}

	function down(msg) {
		var key = movement[keys.keycode(msg.event)];
		console.log(key, msg.event.keyCode);
		if (!key) {
			return;
		}
		msg.event.preventDefault();
		triggerKeyboardEvent(
			dom.getEditingHost(msg.range.startContainer),
			'keydown',
			key
		);
	}
  
	var exports = {
		enter: enter,
		space: space,
		down: down,
		'delete': delete_
	};

	exports['enter'] = enter;
	exports['space'] = space;
	exports['down'] = down;
	exports['delete'] = exports.delete;

	return exports;
});
