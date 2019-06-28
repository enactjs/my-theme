import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import {shape, SlideLeftArranger, SlideTopArranger, ViewManager} from '@enact/ui/ViewManager';

import Skinnable from '../Skinnable';

import Panel from './Panel';

import componentCss from './Panels.module.less';

const mapChildren = (children) => React.Children.map(children, (child, index) => {
	return child ? React.cloneElement(child, {
		'data-index': index
	}) : null;
});

const PanelsBase = kind({
	name: 'Panels',
	propTypes: {
		/**
		 * Set of functions that control how the panels are transitioned into and out of the
		 * viewport.
		 *
		 * @see ui/ViewManager.SlideArranger
		 * @type {ui/ViewManager.Arranger}
		 * @public
		 */
		arranger: shape,

		/**
		 * Index of the active panel
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		index: PropTypes.number,

		/**
		 * Disables panel transitions.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Controls the direction of panel transitions.  If set to `'vertical'`,
		 * the `SlideTopArranger` will be used.  Otherwise, the `SlideLeftArranger`
		 * will be used.
		 *
		 * This setting has no effect if a custom `arranger` is provided.
		 *
		 * @type {String}
		 * @public
		 */
		orientation: PropTypes.string
	},
	defaultProps: {
		index: 0
	},
	styles: {
		css: componentCss,
		className: 'panels enact-fit',
		publicClassNames: true
	},
	computed: {
		arranger: ({arranger, orientation}) => {
			if (arranger) return arranger;
			if (orientation === 'vertical') return SlideTopArranger;
			else return SlideLeftArranger;
		},
		enteringProp: ({noAnimation}) => noAnimation ? null : 'hideChildren'
	},
	render: ({children, ...props}) => {
		const mappedChildren = mapChildren(children);

		return (
			<ViewManager
				{...props}
			>
				{mappedChildren}
			</ViewManager>
		);
	}
});

const Panels = Skinnable(PanelsBase);

export default Panels;
export {
	Panel,
	Panels,
	PanelsBase
};
