/**
 * MyTheme styled button components and behaviors.
 *
 * @example
 * <Button>Hello Enact!</Button>
 *
 * @module my-theme/Button
 * @exports Button
 * @exports ButtonBase
 * @exports ButtonDecorator
 */

import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import {ButtonBase as UiButtonBase, ButtonDecorator as UiButtonDecorator} from '@enact/ui/Button';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import {IconBase} from '../Icon';
import Skinnable from '../Skinnable';

import componentCss from './Button.module.less';

// Make a basic Icon in case we need it later. This cuts `Pure` out of icon for a small gain.
const Icon = Skinnable(IconBase);

/**
 * A button component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [Button]{@link my-theme/Button.Button}.
 *
 * @class ButtonBase
 * @memberof my-theme/Button
 * @extends ui/Button.ButtonBase
 * @ui
 * @public
 */
const ButtonBase = kind({
	name: 'Button',

	propTypes: /** @lends my-theme/Button.ButtonBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `button` - The root class name
		 * * `bg` - The background node of the button
		 * * `selected` - Applied to a `selected` button
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Provides a way to call special interface attention to this button. It will be "featured"
		 * in some way by the theme's visual rules.
		 *
		 * @type {Boolean}
		 * @public
		 */
		selected: PropTypes.bool
	},

	styles: {
		css: componentCss,
		publicClassNames: true
	},

	computed: {
		className: ({selected, styler}) => styler.append(
			{selected}
		),
		minWidth: ({children}) => (!children)
	},

	render: ({css, ...rest}) => {
		delete rest.selected;

		return UiButtonBase.inline({
			'data-webos-voice-intent': 'Select',
			...rest,
			css,
			iconComponent: Icon
		});
	}
});

/**
 * Enforces a minimum width on the Button.
 *
 * *NOTE*: This property's default is `true` and must be explicitly set to `false` to allow
 * the button to shrink to fit its contents.
 *
 * @name minWidth
 * @memberof my-theme/Button.ButtonBase.prototype
 * @type {Boolean}
 * @default true
 * @public
 */


/**
 * Applies MyTheme specific behaviors to [Button]{@link my-theme/Button.ButtonBase} components.
 *
 * @hoc
 * @memberof my-theme/Button
 * @mixes ui/Button.ButtonDecorator
 * @mixes spotlight/Spottable.Spottable
 * @mixes my-theme/Skinnable.Skinnable
 * @public
 */
const ButtonDecorator = compose(
	Pure,
	UiButtonDecorator,
	Spottable,
	Skinnable
);

/**
 * A button component, ready to use in MyTheme applications.
 *
 * Usage:
 * ```
 * <Button>
 * 	Press me!
 * </Button>
 * ```
 *
 * @class Button
 * @memberof my-theme/Button
 * @extends my-theme/Button.ButtonBase
 * @mixes my-theme/Button.ButtonDecorator
 * @ui
 * @public
 */
const Button = ButtonDecorator(ButtonBase);

export default Button;
export {
	Button,
	ButtonBase,
	ButtonDecorator
};
