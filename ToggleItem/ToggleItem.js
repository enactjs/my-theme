/**
 * A MyTheme [Item]{@link my-theme/Item} used as the basis for other stylized toggle item
 * components.
 *
 * Note: This is not intended to be used directly, but should be extended by a component that will
 * customize this component's appearance by supplying an
 * [iconComponent prop]{@link my-theme/ToggleItem.ToggleItemBase#iconComponent}.
 *
 * @example
 * <ToggleItem
 * 	iconComponent={Checkbox}
 * 	Toggle me
 * </ToggleItem>
 *
 * @module my-theme/ToggleItem
 * @exports ToggleItem
 * @exports ToggleItemBase
 * @exports ToggleItemDecorator
 */

import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import ComponentOverride from '@enact/ui/ComponentOverride';
import Spottable from '@enact/spotlight/Spottable';
import Toggleable from '@enact/ui/Toggleable';
import Touchable from '@enact/ui/Touchable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {Fragment} from 'react';

import {SlotItemBase} from '../SlotItem';
import Skinnable from '../Skinnable';

import componentCss from './ToggleItem.module.less';

// eslint-disable-next-line enact/display-name,enact/prop-types
const iconCreator = () => ({disabled, icon, iconComponent, selected}) => {
	return (
		<Fragment>
			<ComponentOverride
				component={iconComponent}
				disabled={disabled}
				selected={selected}
			>
				{icon}
			</ComponentOverride>
		</Fragment>
	);
};

/**
 * A MyTheme styled toggle [Item]{@link my-theme/Item} without any behavior.
 *
 * @class ToggleItemBase
 * @memberof my-theme/ToggleItem
 * @ui
 * @public
 */
const ToggleItemBase = kind({
	name: 'ToggleItem',

	propTypes: /** @lends my-theme/ToggleItem.ToggleItemBase.prototype */ {
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
		 * way. It is recommended to use [ToggleIcon]{@link my-theme/ToggleIcon} for this.
		 *
		 * @type {Component|Element}
		 * @required
		 * @public
		 */
		iconComponent: EnactPropTypes.componentOverride.isRequired,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
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
		 * Applies a disabled visual state to the toggle item.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * An optional prop that lets you override the icon of the `iconComponent` component.
		 *
		 * This accepts any string that the [Icon]{@link my-theme/Icon.Icon} component supports,
		 * provided the recommendations of `iconComponent` are followed.
		 *
		 * @type {String|Object}
		 * @public
		 */
		icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * Called when the toggle item is toggled. Developers should generally use `onToggle` instead.
		 *
		 * @type {Function}
		 * @public
		 */
		onTap: PropTypes.func,

		/**
		 * Called when the toggle item is toggled.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @param {String} event.selected - Selected value of item.
		 * @param {*} event.value - Value passed from `value` prop.
		 * @public
		 */
		onToggle: PropTypes.func,

		/**
		 * Applies the provided `icon`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * The value that will be sent to the `onToggle` handler.
		 *
		 * @type {*}
		 * @default null
		 * @public
		 */
		value: PropTypes.any
	},

	defaultProps: {
		disabled: false,
		selected: false,
		value: null
	},

	styles: {
		css: componentCss,
		className: 'toggleItem',
		publicClassNames: true
	},

	computed: {
		slotBefore: iconCreator()
	},

	render: ({css, children, selected, ...rest}) => {
		delete rest.iconComponent;
		delete rest.value;

		return (
			<SlotItemBase
				aria-checked={selected}
				css={css}
				role="checkbox"
				{...rest}
			>
				<div className={componentCss.content}>{children}</div>
			</SlotItemBase>
		);
	}
});

/**
 * Adds interactive functionality to `ToggleItemBase`.
 *
 * @class ToggleItemDecorator
 * @memberof my-theme/ToggleItem
 * @mixes my-theme/Skinnable.Skinnable
 * @mixes spotlight/Spottable.Spottable
 * @mixes ui/ForwardRef.ForwardRef
 * @mixes ui/Touchable.Touchable
 * @mixes ui/Toggleable.Toggleable
 * @hoc
 * @public
 */
const ToggleItemDecorator = compose(
	Toggleable({toggleProp: 'onTap', eventProps: ['value']}),
	Touchable,
	Spottable,
	Skinnable
);

/**
 * A MyTheme styled item with built-in support for toggling and `Spotlight` focus.
 *
 * This is not intended to be used directly, but should be extended by a component that will
 * customize this component's appearance by supplying an `iconComponent` prop.
 *
 * @class ToggleItem
 * @memberof my-theme/ToggleItem
 * @extends my-theme/ToggleItem.ToggleItemBase
 * @mixes my-theme/ToggleItem.ToggleItemDecorator
 * @ui
 * @public
 */
const ToggleItem = ToggleItemDecorator(ToggleItemBase);

/**
 * The Icon to render in this item.
 *
 * This component receives the `selected` prop and value, and must therefore respond to it in some
 * way. It is recommended to use [ToggleIcon]{@link my-theme/ToggleIcon} for this.
 *
 * @name iconComponent
 * @memberof my-theme/ToggleItem.ToggleItem.prototype
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
