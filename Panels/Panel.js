import {Cell, Column} from '@enact/ui/Layout';
import {forward, handle} from '@enact/core/handle';
import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import Slottable from '@enact/ui/Slottable';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator, {spotlightDefaultClass} from '@enact/spotlight/SpotlightContainerDecorator';

import Skinnable from '../Skinnable';

import componentCss from './Panel.module.less';

let panelId = 0;

/**
 * A Panel is the standard view container used inside a [Panels]{@link my-theme/Panels.Panels} view
 * manager instance. [Panels]{@link my-theme/Panels.Panels} will typically contain several
 * instances of these and transition between them.
 *
 * @class Panel
 * @memberof my-theme/Panels
 * @ui
 * @public
 */
const PanelBase = kind({

	name: 'Panel',

	propTypes: /** @lends my-theme/Panels.Panel.prototype */ {
		/**
		 * By default, the panel will be labeled by its [Header]{@link my-theme/Panels.Header}.
		 * When `aria-label` is set, it will be used instead to provide an accessibility label for
		 * the panel.
		 *
		 * @memberof my-theme/Panels.Panel.prototype
		 * @type {String}
		 * @public
		 */
		'aria-label': PropTypes.string,

		/**
		 * Sets the strategy used to automatically focus an element within the panel upon render.
		 *
		 * * "none" - Automatic focus is disabled
		 * * "last-focused" - The element last focused in the panel with be restored
		 * * "default-element" - The first spottable component within the body will be focused
		 * * Custom Selector - A custom CSS selector may also be provided which will be used to find
		 *   the target within the Panel
		 *
		 * @type {String}
		 * @default 'last-focused'
		 * @public
		 */
		autoFocus: PropTypes.string,

		/**
		 * Footer for the panel.
		 *
		 * This is usually passed by the [Slottable]{@link ui/Slottable.Slottable} API by using a
		 * [Footer]{@link my-theme/Panels.Header} component as a child of the Panel.
		 *
		 * @type {Footer}
		 * @public
		 */
		footer: PropTypes.node,

		/**
		 * Header for the panel.
		 *
		 * This is usually passed by the [Slottable]{@link ui/Slottable.Slottable} API by using a
		 * [Header]{@link my-theme/Panels.Header} component as a child of the Panel.
		 *
		 * @type {Header}
		 * @public
		 */
		header: PropTypes.node,

		/**
		 * Hides the body components.
		 *
		 * When a Panel is used within [`Panels`]{@link my-theme/Panels.Panels},
		 * [`ActivityPanels`]{@link my-theme/Panels.ActivityPanels}, or
		 * [`AlwaysViewingPanels`]{@link my-theme/Panels.AlwaysViewingPanels},
		 * this property will be set automatically to `true` on render and `false` after animating
		 * into view.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		hideChildren: PropTypes.bool
	},

	defaultProps: {
		autoFocus: 'last-focused',
		hideChildren: false
	},

	styles: {
		css: componentCss,
		className: 'panel',
		publicClassNames: true
	},

	handlers: {
		onScroll: handle(
			forward('onScroll'),
			({currentTarget}) => {
				currentTarget.scrollTop = 0;
				currentTarget.scrollLeft = 0;
			}
		),
		spotOnRender: (node, {autoFocus}) => {
			if (node && !Spotlight.getCurrent()) {
				const {spotlightId} = node.dataset;
				const config = {
					enterTo: 'last-focused'
				};

				if (autoFocus !== 'last-focused') {
					config.enterTo = 'default-element';

					if (autoFocus !== 'default-element') {
						config.defaultElement = autoFocus;
					}
				}

				Spotlight.set(spotlightId, config);
				Spotlight.focus(spotlightId);
			}
		}
	},

	computed: {
		spotOnRender: ({autoFocus, hideChildren, spotOnRender}) => {
			// In order to spot the body components, we defer spotting until !hideChildren. If the
			// Panel opts out of hideChildren support by explicitly setting it to false, it'll spot
			// on first render.
			if (hideChildren || autoFocus === 'none') {
				return null;
			}

			return spotOnRender;
		},
		children: ({children, hideChildren}) => hideChildren ? null : children,
		bodyClassName: ({footer, header, hideChildren, styler}) => styler.join({
			body: true,
			noFooter: !footer,
			noHeader: !header,
			visible: !hideChildren
		}),
		// nulling headerId prevents the aria-labelledby relationship which is necessary to allow
		// aria-label to take precedence
		// (see https://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby)
		headerId: ({'aria-label': label}) => label ? null : `panel_${++panelId}_header`
	},

	render: ({bodyClassName, css, children, footer, header, headerId, spotOnRender, ...rest}) => {
		delete rest.autoFocus;
		delete rest.hideChildren;

		return (
			<Column
				component="article"
				role="region"
				{...rest}
				aria-labelledby={headerId}
				ref={spotOnRender}
			>
				<Cell
					className={css.header}
					id={headerId}
					shrink
				>
					{header}
				</Cell>
				<Cell
					className={bodyClassName}
					component="section"
				>
					{children}
				</Cell>
				<Cell
					className={css.footer}
					shrink
				>
					{footer}
				</Cell>
			</Column>
		);
	}
});

const Panel = SpotlightContainerDecorator(
	{
		// prefer any spottable within the panel body for first render
		continue5WayHold: true,
		defaultElement: [`.${spotlightDefaultClass}`, `.${componentCss.body} *`],
		enterTo: 'last-focused',
		preserveId: true
	},
	Slottable(
		{slots: ['footer', 'header']},
		Skinnable(
			PanelBase
		)
	)
);

export default Panel;
export {Panel, PanelBase};
