/**
 * A Myhouse [Item]{@link myhouse/Item} used as the basis for other stylized toggle item
 * components.
 *
 * Note: This is not intended to be used directly, but should be extended by a component that will
 * customize this component's appearance by supplying an
 * [iconComponent prop]{@link myhouse/ToggleItem.ToggleItemBase#iconComponent}.
 *
 * @example
 * <ToggleItem
 * 	iconComponent={Checkbox}
 * 	iconPosition='before'>
 * 	Toggle me
 * </ToggleItem>
 *
 * @module myhouse/ToggleItem
 * @exports ToggleItem
 * @exports ToggleItemBase
 * @exports ToggleItemDecorator
 */

import kind from '@enact/core/kind';
import EnactPropTypes from '@enact/core/internal/prop-types';
import React from 'react';
import PropTypes from 'prop-types';
import {ToggleItemBase as UiToggleItem, ToggleItemDecorator as UiToggleItemDecorator} from '@enact/ui/ToggleItem';
import Spottable from '@enact/spotlight/Spottable';
import compose from 'ramda/src/compose';

import Skinnable from '../Skinnable';
import {SlotItemBase} from '../SlotItem';

import componentCss from './ToggleItem.module.less';

/**
 * A Myhouse styled toggle [Item]{@link myhouse/Item} without any behavior.
 *
 * @class ToggleItemBase
 * @memberof myhouse/ToggleItem
 * @ui
 * @public
 */
const ToggleItemBase = kind({
	name: 'ToggleItem',

	propTypes: /** @lends myhouse/ToggleItem.ToggleItemBase.prototype */ {
		/**
		 * The content to be displayed as the main content of the toggle item.
		 *
		 * @type {Node}
		 * @required
		 * @public
		 */
		children: PropTypes.node.isRequired,

		/**
		 * The icon component to render in this item.
		 *
		 * This component receives the `selected` prop and value, and must therefore respond to it in some
		 * way. It is recommended to use [ToggleIcon]{@link myhouse/ToggleIcon} for this.
		 *
		 * @type {Component|Element}
		 * @required
		 * @public
		 */
		iconComponent: EnactPropTypes.componentOverride.isRequired,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `toggleItem` - The root class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Overrides the icon of the `iconComponent` component.
		 *
		 * This accepts any string that the [Icon]{@link myhouse/Icon.Icon} component supports,
		 * provided the recommendations of `iconComponent` are followed.
		 *
		 * @type {String}
		 * @public
		 */
		icon: PropTypes.string
	},

	styles: {
		css: componentCss,
		publicClassNames: ['toggleItem']
	},

	render: (props) => {

		return (
			<UiToggleItem
				role="checkbox"
				{...props}
				component={SlotItemBase}
				css={props.css}
			/>
		);
	}
});

/**
 * Adds interactive functionality to `ToggleItemBase`.
 *
 * @class ToggleItemDecorator
 * @memberof myhouse/ToggleItem
 * @mixes ui/ToggleItem.ToggleItemDecorator
 * @mixes spotlight/Spottable.Spottable
 * @mixes myhouse/Skinnable
 * @hoc
 * @public
 */
const ToggleItemDecorator = compose(
	UiToggleItemDecorator,
	Spottable,
	Skinnable
);

/**
 * A Myhouse styled item with built-in support for toggling and `Spotlight` focus.
 *
 * This is not intended to be used directly, but should be extended by a component that will
 * customize this component's appearance by supplying an `iconComponent` prop.
 *
 * @class ToggleItem
 * @memberof myhouse/ToggleItem
 * @extends myhouse/ToggleItem.ToggleItemBase
 * @mixes myhouse/ToggleItem.ToggleItemDecorator
 * @ui
 * @public
 */
const ToggleItem = ToggleItemDecorator(ToggleItemBase);

/**
 * The Icon to render in this item.
 *
 * This component receives the `selected` prop and value, and must therefore respond to it in some
 * way. It is recommended to use [ToggleIcon]{@link myhouse/ToggleIcon} for this.
 *
 * @name iconComponent
 * @memberof myhouse/ToggleItem.ToggleItem.prototype
 * @type {Component|Element}
 * @default null
 * @required
 * @public
 */

export default ToggleItem;
export {
	ToggleItem,
	ToggleItemBase,
	ToggleItemDecorator
};
