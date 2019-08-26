/**
 * Provides Myhouse styled icon components and behaviors.
 *
 * @example
 * <Icon>flag</Icon>
 *
 * @module myhouse/Icon
 * @exports Icon
 * @exports IconBase
 * @exports IconDecorator
 * @exports icons
 */

import kind from '@enact/core/kind';
import UiIcon from '@enact/ui/Icon';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import Skinnable from '../Skinnable';

import componentCss from './Icon.module.less';

/**
 * Renders a Myhouse-styled icon without any behavior.
 *
 * myhouse uses Material icons out-of-the-box. For a complete list of supported icons, visit the
 * material icons website: https://material.io/tools/icons/
 *
 * @class IconBase
 * @memberof myhouse/Icon
 * @extends ui/Icon.Icon
 * @ui
 * @public
 */
const IconBase = kind({
	name: 'Icon',

	propTypes: /** @lends myhouse/Icon.Icon.prototype */ {
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

	styles: {
		css: componentCss,
		className: 'material-icons-round'
	},

	render: (props) => (
		<UiIcon
			{...props}
			css={props.css}
		/>
	)
});

/**
 * Myhouse-specific behaviors to apply to [IconBase]{@link myhouse/Icon.IconBase}.
 *
 * @hoc
 * @memberof myhouse/Icon
 * @mixes myhouse/Skinnable.Skinnable
 * @public
 */
const IconDecorator = compose(
	Skinnable
);

/**
 * A Myhouse-styled icon.
 *
 * @class Icon
 * @memberof myhouse/Icon
 * @extends myhouse/Icon.IconBase
 * @mixes myhouse/Icon.IconDecorator
 * @ui
 * @public
 */
const Icon = IconDecorator(IconBase);

export default Icon;
export {
	Icon,
	IconBase,
	IconDecorator
};
