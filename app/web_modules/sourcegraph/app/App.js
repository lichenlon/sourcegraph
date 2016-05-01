// @flow

import React from "react";
import Helmet from "react-helmet";
import type {Route} from "react-router";

import GlobalNav from "sourcegraph/app/GlobalNav";
import Footer from "sourcegraph/app/Footer";
import CSSModules from "react-css-modules";
import styles from "./styles/App.css";

import {withEventLoggerContext, withViewEventsLogged} from "sourcegraph/util/EventLogger";
import EventLogger from "sourcegraph/util/EventLogger";
import {withFeaturesContext} from "sourcegraph/app/features";
import {withSiteConfigContext} from "sourcegraph/app/siteConfig";
import {withUserContext} from "sourcegraph/app/user";
import {withAppdashRouteStateRecording} from "sourcegraph/app/appdash";

const reactElement = React.PropTypes.oneOfType([
	React.PropTypes.arrayOf(React.PropTypes.element),
	React.PropTypes.element,
]);

function App(props) {
	return (
		<div styleName={props.location.state && props.location.state.modal ? "main-container-with-modal" : "main-container"}>
			<Helmet titleTemplate="%s · Sourcegraph" defaultTitle="Sourcegraph" />
			<GlobalNav navContext={props.navContext} location={props.location} />
			<div styleName="main-content">{props.main}</div>
			<Footer />
		</div>
	);
}
App.propTypes = {
	main: reactElement,
	navContext: reactElement,
	location: React.PropTypes.object.isRequired,
};

export const rootRoute: Route = {
	path: "/",
	component: withEventLoggerContext(EventLogger,
		withViewEventsLogged(
			withAppdashRouteStateRecording(
				withSiteConfigContext(
					withUserContext(
						withFeaturesContext(
							CSSModules(App, styles)
						)
					)
				)
			)
		)
	),
	getIndexRoute: (location, callback) => {
		require.ensure([], (require) => {
			callback(null, require("sourcegraph/dashboard").route);
		});
	},
	getChildRoutes: (location, callback) => {
		require.ensure([], (require) => {
			callback(null, [
				...require("sourcegraph/admin/routes").routes,
				...require("sourcegraph/user").routes,
				...require("sourcegraph/repo/routes").routes,
			]);
		});
	},
};
