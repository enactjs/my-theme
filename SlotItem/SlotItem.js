/**
 * Provides a MyTheme item component that accepts multiple positions for children.
 *
 * Using the usual `children` prop, as well as two additional props: `slotBefore`, and `slotAfter`.
 * It is customizable by a theme or application.
 *
 * @example
 * <SlotItem autoHide="both">
 * 	<slotBefore>
 * 		<Icon>flag</Icon>
 * 		<Icon>star</Icon>
 * 	</slotBefore>
 * 	An Item that will show some icons before and after this text when spotted
 * 	<Icon slot="slotAfter">trash</Icon>
 * </SlotItem>
 *
 * @module my-theme/SlotItem
 * @exports SlotItem
 * @exports SlotItemBase
 * @exports SlotItemDecorator
 */

import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import {ItemDecorator as UiItemDecorator} from '@enact/ui/Item';
import Slottable from '@enact/ui/Slottable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import {ItemBase} from '../Item';
import Skinnable from '../Skinnable';

import componentCss from './SlotItem.module.less';

/**
 * A MyTheme styled SlotItem without any behavior.
 *
 * @class SlotItemBase
 * @memberof my-theme/SlotItem
 * @ui
 * @public
 */
const SlotItemBase = kind({
	name: 'SlotItem',

	propTypes: /** @lends my-theme/SlotItem.SlotItemBase.prototype */ {
		/**
		 * Controls the visibility state of the slots.
		 *
		 * One, both, or neither slot can be shown. Choosing `'after'` will leave `slotBefore`
		 * visible at all times; only `slotAfter` will have its visibility toggled.  Valid values
		 * are `'before'`, `'after'` and `'both'`. Omitting the property will result in
		 * no-auto-hiding for either slot, so they will both be present.
		 *
		 * In order for `autoHide` to have a visual affect, the `hidden` class must be tied to
		 * another condition such as focus.
		 *
		 * ```
		 * .slot.hidden:not(:focus) {
		 *   display: none;
		 * }
		 * ```
		 *
		 * @type {Boolean}
		 * @public
		 */
		autoHide: PropTypes.oneOf(['after', 'before', 'both']),

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `slotItem` - The root class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Nodes to be inserted after `children` and hidden using `autoHide`.
		 *
		 * If nothing is specified, nothing, not even an empty container, is rendered in this place.
		 *
		 * @type {Node}
		 * @public
		 */
		slotAfter: PropTypes.node,

		/**
		 * Nodes to be inserted before `children` and hidden using `autoHide`.
		 *
		 * If nothing is specified, nothing, not even an empty container, is rendered in this place.
		 *
		 * @type {Node}
		 * @public
		 */
		slotBefore: PropTypes.node
	},

	styles: {
		css: componentCss,
		className: 'slotItem',
		publicClassNames: true
	},

	computed: {
		slotBefore: ({slotBefore, autoHide, styler}) => (slotBefore ?
			<div className={styler.join('slot', 'before', {hidden: (autoHide === 'before' || autoHide === 'both')})}>
				{slotBefore}
			</div> : null
		),
		slotAfter: ({slotAfter, autoHide, styler}) => (slotAfter ?
			<div className={styler.join('slot', 'after', {hidden: (autoHide === 'after' || autoHide === 'both')})}>
				{slotAfter}
			</div> : null
		)
	},

	render: ({css, children, slotAfter, slotBefore, ...rest}) => {
		delete rest.autoHide;

		return (
			<ItemBase
				css={css}
				{...rest}
			>
				{slotBefore}
				<div className={css.content}>{children}</div>
				{slotAfter}
			</ItemBase>
		);
	}
});

/**
 * MyTheme-specific item with overlay behaviors to apply to SlotItem.
 *
 * @class SlotItemDecorator
 * @memberof my-theme/SlotItem
 * @mixes my-theme/Skinnable.Skinnable
 * @mixes spotlight/Spottable.Spottable
 * @mixes ui/Slottable.Slottable
 * @hoc
 * @public
 */
const SlotItemDecorator = compose(
	Slottable({slots: ['slotAfter', 'slotBefore']}),
	Skinnable,
	Spottable,
	UiItemDecorator
);

/**
 * A MyTheme styled item with built-in support for overlays.
 *
 * ```
 *	<SlotItem autoHide="both">
 *		<slotBefore>
 *			<Icon>flag</Icon>
 *			<Icon>star</Icon>
 *		</slotBefore>
 *		An Item that will show some icons before and after this text when spotted
 *		<Icon slot="slotAfter">trash</Icon>
 *	</SlotItem>
 * ```
 *
 * @class SlotItem
 * @memberof my-theme/SlotItem
 * @extends my-theme/SlotItem.SlotItemBase
 * @mixes my-theme/SlotItem.SlotItemDecorator
 * @ui
 * @public
 */
const SlotItem = SlotItemDecorator(SlotItemBase);

export default SlotItem;
export {
	SlotItem,
	SlotItemBase,
	SlotItemDecorator
};
