import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { PageContextProvider } from "./usePageContext";
import "./PageWrapper.css";
import { Link } from "./Link";
import type { PageContext } from "./types";
import { FeaturevisorProvider } from "@featurevisor/react";
// import { createInstance } from "@featurevisor/sdk";

import { getInstance } from '#~/utils/featurevisor'

export function PageWrapper({
	children,
	pageContext,
}: {
	children: React.ReactNode;
	pageContext: PageContext;
}) {

	// const f = createInstance({
	// 	datafileUrl: "https://raw.githubusercontent.com/skaparelos/random/main/datafile-tag-all.json"
	// });

	const [f, setF] = useState<any>(null)

	useEffect(() => {
		// const d = createInstance({
		// 	datafileUrl: "https://raw.githubusercontent.com/skaparelos/random/main/datafile-tag-all.json"
		// });
		getInstance().then((r) => setF(r))
	}, [])

	if (!f) {
		return <></>
	}

	return (
		<React.StrictMode>
			<PageContextProvider pageContext={pageContext}>
				<FeaturevisorProvider instance={f}>
					<Layout>
						<Sidebar>
							<Logo />
							<Link className="navitem" href="/">
								Home
							</Link>
							<Link className="navitem" href="/about">
								About
							</Link>
						</Sidebar>
						<Content>{children}</Content>
					</Layout>
				</FeaturevisorProvider>
			</PageContextProvider>
		</React.StrictMode>
	);
}

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div
			style={{
				display: "flex",
				maxWidth: 900,
				margin: "auto",
			}}
		>
			{children}
		</div>
	);
}

function Sidebar({ children }: { children: React.ReactNode }) {
	return (
		<div
			style={{
				padding: 20,
				flexShrink: 0,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				lineHeight: "1.8em",
			}}
		>
			{children}
		</div>
	);
}

function Content({ children }: { children: React.ReactNode }) {
	return (
		<div
			style={{
				padding: 20,
				paddingBottom: 50,
				borderLeft: "2px solid #eee",
				minHeight: "100vh",
			}}
		>
			{children}
		</div>
	);
}

function Logo() {
	return (
		<div
			style={{
				marginTop: 20,
				marginBottom: 10,
			}}
		>
			<a href="/">
				<img src={logo} height={64} width={64} alt="logo" />
			</a>
		</div>
	);
}
