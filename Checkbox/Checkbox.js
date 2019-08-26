/**
 * Myhouse styled checkbox components.
 *
 * @example
 * <Checkbox onToggle={console.log} />
 *
 * @module myhouse/Checkbox
 * @exports Checkbox
 * @exports CheckboxBase
 */

import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import ToggleIcon from '../ToggleIcon';
import Icon from '@enact/ui/Icon';

import css from './Checkbox.module.less';

/**
 * A checkbox component, ready to use in Myhouse applications.
 *
 * `Checkbox` may be used independently to represent a toggleable state but is more commonly used as
 * part of [CheckboxItem]{@link myhouse/CheckboxItem}.
 *
 * Usage:
 * ```
 * <Checkbox selected />
 * ```
 *
 * @class Checkbox
 * @memberof myhouse/Checkbox
 * @extends myhouse/ToggleIcon.ToggleIcon
 * @ui
 * @public
 */
const CheckboxBase = kind({
	name: 'Checkbox',

	propTypes: /** @lends myhouse/Checkbox.Checkbox.prototype */ {
		/**
		 * The icon displayed when `selected`.
		 *
		 * @see myhouse/Icon.Icon.children
		 * @type {String|Object}
		 * @default	'check'
		 * @public
		 */
		children: PropTypes.string
	},

	defaultProps: {
		children: 'check'
	},

	render: ({children, ...rest}) => {
		return (
			<ToggleIcon
				{...rest}
				css={css}
				iconComponent={Icon}
			>
				{children}
			</ToggleIcon>
		);
	}
});

export default CheckboxBase;
export {
	CheckboxBase as Checkbox,
	CheckboxBase
};
