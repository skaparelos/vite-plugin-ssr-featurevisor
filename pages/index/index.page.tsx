import React from "react";
import { Counter } from "./Counter";
import { useFlag } from "@featurevisor/react";

export { Page };

function Page() {
	const isEnabled = useFlag("showDeprecatedRoutes")
	return (
		<>
			<h1>Hello from vite-plugin-ssr</h1>
			This page is:
			<ul>
				<li>Rendered to HTML.</li>
				<li>
					Interactive. <Counter />
				</li>
			</ul>
			<p>{isEnabled ? "ENABLED" : "NOT ENABLED"}</p>
		</>
	);
}
