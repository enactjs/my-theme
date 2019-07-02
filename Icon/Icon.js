/**
 * Provides MyTheme styled icon components and behaviors.
 *
 * @example
 * <Icon>flag</Icon>
 *
 * @module my-theme/Icon
 * @exports Icon
 * @exports IconBase
 * @exports IconDecorator
 * @exports icons
 */

import kind from '@enact/core/kind';
import UiIcon from '@enact/ui/Icon';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';

import Skinnable from '../Skinnable';

import iconList from './IconList.js';

import componentCss from './Icon.module.less';

/**
 * Renders a MyTheme-styled icon without any behavior.
 *
 * @class IconBase
 * @memberof my-theme/Icon
 * @extends ui/Icon.Icon
 * @ui
 * @public
 */
const IconBase = kind({
	name: 'Icon',

	propTypes: /** @lends my-theme/Icon.Icon.prototype */ {
		/**
		 * The icon content.
		 *
		 * May be specified as either:
		 *
		 * * A string that represents an icon from the [iconList]{@link ui/Icon.Icon.iconList},
		 * * An HTML entity string, Unicode reference or hex value (in the form '0x...'),
		 * * A URL specifying path to an icon image, or
		 * * An object representing a resolution independent resource (See {@link ui/resolution}).
		 *
		 * @type {String|Object}
		 * @public
		 */
		children: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
	},

	render: (props) => UiIcon.inline({
		...props,
		css: componentCss,
		iconList
	})
});

// Let's find a way to import this list directly, and bonus feature, render our icons in the docs
// next to their names.
/**
 * An object whose keys can be used as the child of an [Icon]{@link my-theme/Icon.Icon} component.
 *
 * List of Icons:
 * ```
 * plus
 * minus
 * arrowhookleft
 * arrowhookright
 * ellipsis
 * check
 * circle
 * stop
 * play
 * pause
 * forward
 * backward
 * skipforward
 * skipbackward
 * pauseforward
 * pausebackward
 * pausejumpforward
 * pausejumpbackward
 * jumpforward
 * jumpbackward
 * denselist
 * bulletlist
 * list
 * drawer
 * arrowlargedown
 * arrowlargeup
 * arrowlargeleft
 * arrowlargeright
 * arrowsmallup
 * arrowsmalldown
 * arrowsmallleft
 * arrowsmallright
 * closex
 * search
 * rollforward
 * rollbackward
 * exitfullscreen
 * fullscreen
 * arrowshrinkleft
 * arrowshrinkright
 * arrowextend
 * arrowshrink
 * flag
 * funnel
 * trash
 * star
 * hollowstar
 * halfstar
 * gear
 * plug
 * lock
 * forward15
 * back15
 * continousplay
 * playlist
 * resumeplay
 * image
 * audio
 * music
 * languages
 * cc
 * ccon
 * ccoff
 * sub
 * recordings
 * livezoom
 * liveplayback
 * liveplaybackoff
 * repeat
 * repeatoff
 * series
 * repeatdownload
 * view360
 * view360off
 * info
 * ```
 *
 * @name iconList
 * @memberof my-theme/Icon
 * @constant
 * @type {Object}
 * @public
 */

/**
 * MyTheme-specific behaviors to apply to [IconBase]{@link my-theme/Icon.IconBase}.
 *
 * @hoc
 * @memberof my-theme/Icon
 * @mixes my-theme/Skinnable.Skinnable
 * @public
 */
const IconDecorator = compose(
	Skinnable
);

/**
 * A MyTheme-styled icon.
 *
 * @class Icon
 * @memberof my-theme/Icon
 * @extends my-theme/Icon.IconBase
 * @mixes my-theme/Icon.IconDecorator
 * @ui
 * @public
 */
const Icon = IconDecorator(IconBase);

export default Icon;
export {
	Icon,
	IconBase,
	IconDecorator,
	iconList as icons
};
