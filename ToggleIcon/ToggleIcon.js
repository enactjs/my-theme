/**
 * Provides Myhouse Icon component with interactive toggleable capabilities.
 *
 * `ToggleIcon` does not implement a visual change when a user interacts with the control and must
 * be customized by the consumer using [css className
 * overrides]{@link ui/ToggleIcon.ToggleIconBase.css}.
 *
 * Often, an [Icon value]{@link myhouse/Icon.Icon} is passed as `children` to represent the
 * selected state but is not required. Omitting `children` allows the consumer to implement more
 * advanced approaches such as styling the `::before` and `::after` pseudo-elements to save a DOM
 * node.
 *
 * The following Myhouse components use `ToggleIcon`, and make good examples of various usages:
 *
 * * [Checkbox]{@link myhouse/Checkbox.Checkbox}
 * * [RadioItem]{@link myhouse/RadioItem.RadioItem}
 *
 * @example
 * <ToggleIcon onToggle={(props)=> console.log(props.selected)}>
 *   check
 * </ToggleIcon>
 *
 * @module myhouse/ToggleIcon
 * @exports ToggleIcon
 * @exports ToggleIconBase
 * @exports ToggleIconDecorator
 */

import kind from '@enact/core/kind';
import UiToggleIcon from '@enact/ui/ToggleIcon';
import compose from 'ramda/src/compose';
import React from 'react';

import Icon from '../Icon';
import Skinnable from '../Skinnable';

/**
 * A component that indicates a boolean state.
 *
 * @class ToggleIconBase
 * @memberof myhouse/ToggleIcon
 * @extends ui/ToggleIcon.ToggleIcon
 * @ui
 * @public
 */
const ToggleIconBase = kind({
	name: 'ToggleIcon',

	render: (props) => {
		return (
			<UiToggleIcon {...props} iconComponent={Icon} />
		);
	}
});

/**
 * Myhouse-specific behaviors to apply to `ToggleIconBase`.
 *
 * @hoc
 * @memberof myhouse/ToggleIcon
 * @mixes myhouse/Skinnable.Skinnable
 * @public
 */
const ToggleIconDecorator = compose(
	Skinnable
);

/**
 * A customizable Myhouse starting point [Icon]{@link myhouse/Icon.Icon} that responds to the
 * `selected` prop.
 *
 * @class ToggleIcon
 * @memberof myhouse/ToggleIcon
 * @extends myhouse/ToggleIcon.ToggleIconBase
 * @mixes myhouse/ToggleIcon.ToggleIconDecorator
 * @ui
 * @public
 */
const ToggleIcon = ToggleIconDecorator(ToggleIconBase);

export default ToggleIcon;
export {
	ToggleIcon,
	ToggleIconBase,
	ToggleIconDecorator
};
