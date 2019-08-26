/**
 * Myhouse styled labeled Heading components and behaviors
 *
 * @example
 * <Heading>
 *   A Content Section Heading
 * </Heading>
 *
 * @module myhouse/Heading
 * @exports Heading
 * @exports HeadingBase
 * @exports HeadingDecorator
 */

import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import UiHeading from '@enact/ui/Heading';

import Skinnable from '../Skinnable';

import componentCss from './Heading.module.less';

/**
 * A labeled Heading component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [Heading]{@link myhouse/Heading.Heading}.
 *
 * @class HeadingBase
 * @memberof myhouse/Heading
 * @ui
 * @public
 */
const HeadingBase = kind({
	name: 'Heading',

	propTypes: /** @lends myhouse/Heading.HeadingBase.prototype */ {
		css: PropTypes.object,

		/**
		 * Adds a horizontal-rule (line) under the component
		 *
		 * @type {Boolean}
		 * @public
		 */
		showLine: PropTypes.bool
	},

	styles: {
		css: componentCss,
		className: 'heading'
	},

	computed: {
		className: ({showLine, styler}) => styler.append({showLine})
	},

	render: ({css, ...rest}) => {
		delete rest.showLine;
		return (<UiHeading
			{...rest}
			css={css}
		/>);
	}
});

/**
 * Applies Myhouse specific behaviors to [HeadingBase]{@link myhouse/Heading.HeadingBase}.
 *
 * @hoc
 * @memberof myhouse/Heading
 * @mixes myhouse/Skinnable.Skinnable
 * @public
 */
const HeadingDecorator = compose(
	Skinnable
);

/**
 * A labeled Heading component, ready to use in Myhouse applications.
 *
 * `Heading` may be used as a header to group related components.
 *
 * Usage:
 * ```
 * <Heading>
 *   Related Settings
 * </Heading>
 * <CheckboxItem>A Setting</CheckboxItem>
 * <CheckboxItem>A Second Setting</CheckboxItem>
 * ```
 *
 * @class Heading
 * @memberof myhouse/Heading
 * @extends myhouse/Heading.HeadingBase
 * @mixes myhouse/Heading.HeadingDecorator
 * @ui
 * @public
 */
const Heading = HeadingDecorator(HeadingBase);

export default Heading;
export {
	Heading,
	HeadingBase,
	HeadingDecorator
};
