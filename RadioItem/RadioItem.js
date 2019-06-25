/**
 * Provides a MyTheme Item component and interactive radio toggle icon.
 *
 * @module my-theme/RadioItem
 * @exports RadioItem
 */

import React from 'react';
import PropTypes from 'prop-types';

import kind from '@enact/core/kind';
import Icon from '../Icon';
import Skinnable from '../Skinnable';

import Spottable from '@enact/spotlight/Spottable';
import Toggleable from '@enact/ui/Toggleable';
import Touchable from '@enact/ui/Touchable';
import compose from 'ramda/src/compose';

import componentCss from './RadioItem.module.less';

/**
 * Renders an `Item` with a radio-dot component. Useful to show a selected state on an Item.
 *
 * @class RadioItem
 * @memberof my-theme/RadioItem
 * @extends my-theme/RadioItem.RadioItem
 * @ui
 * @public
 */


const RadioItemBase = kind({
	name: 'RadioItemBase',

	propTypes: /** @lends my-theme/Divider.DividerBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `radioIcon` - Class name for the radio toggle icon
		 * * `radioItem` - The root class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Customize the component used as the icon label.
		 *
		 * @type {Element|Function|String}
		 * @default {@link my-theme/Switch.Switch}
		 * @public
		 */
		icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string]),

		/**
		 * If true the radio toggle will be selected.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool
	},

	defaultProps: {
		icon: 'circle',
		selected: false
	},

	styles: {
		css: componentCss,
		className: 'radioItem',
		publicClassNames: true
	},

	computed: {
		className: ({css, selected, styler}) => styler.append(selected && css.selected)
	},

	render: ({children, css, icon, ...rest}) => {
		delete rest.selected;

		return (
			<div {...rest} css={css}>
				<Icon small className={css.icon}>{icon}</Icon>
				<div
					className={css.text}
				>
					{children}
				</div>
			</div>
		);
	}
});


const RadioItemDecorator = compose(
	Toggleable({toggleProp: 'onTap'}),
	Touchable,
	Spottable,
	Skinnable
);

const RadioItem = RadioItemDecorator(RadioItemBase);

export default RadioItem;
export {
	RadioItem
};
