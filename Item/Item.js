/**
 * Provides Myhouse themed item components and behaviors. Useful for content in lists.
 *
 * @example
 * <Item>Hello Enact!</Item>
 *
 * @module myhouse/Item
 * @exports Item
 * @exports ItemBase
 */

import Spottable from '@enact/spotlight/Spottable';
import {ItemBase as UiItemBase, ItemDecorator as UiItemDecorator} from '@enact/ui/Item';
import compose from 'ramda/src/compose';
import React from 'react';

import componentCss from './Item.module.less';
import Skinnable from '../Skinnable';

/**
 * A Myhouse styled item.
 *
 * @class ItemBase
 * @memberof myhouse/Item
 * @ui
 * @public
 */
const ItemBase = (props) => (
	<UiItemBase
		{...props}
		css={componentCss}
	/>
);

/**
 * Myhouse specific item behaviors to apply to `Item`.
 *
 * @class ItemDecorator
 * @hoc
 * @memberof myhouse/Item
 * @mixes spotlight.Spottable
 * @mixes myhouse/Skinnable
 * @ui
 * @public
 */
const ItemDecorator = compose(
	UiItemDecorator,
	Spottable,
	Skinnable
);

const Item = ItemDecorator(ItemBase);

export default Item;
export {
	Item,
	ItemBase,
	ItemDecorator
};
