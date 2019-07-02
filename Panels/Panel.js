import {Cell, Column} from '@enact/ui/Layout';
import {forward, handle} from '@enact/core/handle';
import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import Slottable from '@enact/ui/Slottable';
import SpotlightContainerDecorator, {spotlightDefaultClass} from '@enact/spotlight/SpotlightContainerDecorator';

import Skinnable from '../Skinnable';

import componentCss from './Panel.module.less';

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
		 * Header for the panel.
		 *
		 * This can also be passed by the [Slottable]{@link ui/Slottable.Slottable} API by using a
		 * component that has a `defaultSlot` value of `'header'`.
		 *
		 * @type {Node}
		 * @public
		 */
		header: PropTypes.node
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
		)
	},

	computed: {
		bodyClassName: ({header, styler}) => styler.join({
			body: true,
			noHeader: !header
		})
	},

	render: ({bodyClassName, css, children, header, ...rest}) => {

		return (
			<Column
				component="article"
				role="region"
				{...rest}
			>
				<Cell
					className={css.header}
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
			</Column>
		);
	}
});

const Panel = SpotlightContainerDecorator(
	{
		// this `defaultElement` selector will prefer any spottable within the panel body for first render
		defaultElement: [`.${spotlightDefaultClass}`, `.${componentCss.body} *`],
		preserveId: true
	},
	Slottable(
		{slots: ['header']},
		Skinnable(
			PanelBase
		)
	)
);

export default Panel;
export {Panel, PanelBase};
