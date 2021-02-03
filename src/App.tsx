import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { fetchTravelLogList } from "./API";

import LogEntryForm from "./LogEntryForm";

import "./App.scss";

const App = (): JSX.Element => {
	const [viewport, setViewport] = useState({
		width: "100%",
		height: "100vh",
		latitude: 21.028511,
		longitude: 105.804817,
		zoom: 3,
	});
	const [travelLostList, setTravelLostList] = useState<Array<[]>>([]);
	const [showPopup, setShowPopup] = useState<any>({});
	const [addEntryLocation, setAddEntryLocation] = useState<any>(null);

	const getEntries = async () => {
		const logEntries: any = await fetchTravelLogList();
		setTravelLostList(logEntries);
	};

	const showAddMarkerPopup = (e: any) => {
		const [longitude, latitude] = e.lngLat;

		setAddEntryLocation({
			latitude,
			longitude,
		});
	};

	useEffect(() => {
		getEntries();
	}, []);

	return (
		<ReactMapGL
			{...viewport}
			mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
			onViewportChange={setViewport}
			mapboxApiAccessToken="pk.eyJ1IjoiY29uZ3BoYW4zMDAzIiwiYSI6ImNra21pbmV6azFidjMycG16dTVwZmxzZ3MifQ.iqjKoc3pzEb85mIiIi0fmA"
			onDblClick={showAddMarkerPopup}
		>
			{travelLostList.map((entry: any) => (
				<React.Fragment key={entry._id}>
					<Marker
						key={entry._id}
						latitude={entry.latitude}
						longitude={entry.longitude}
					>
						<div
							onClick={() =>
								setShowPopup({
									...showPopup,
									[entry._id]: true,
								})
							}
						>
							<svg
								className="marker yellow"
								version="1.1"
								id="Layer_1"
								viewBox="0 0 512 512"
								strokeWidth="1.5"
								style={{
									width: 6 * viewport.zoom,
									height: 6 * viewport.zoom,
								}}
							>
								<path
									d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
								/>
							</svg>
						</div>
					</Marker>
					{showPopup[entry._id] && (
						<Popup
							latitude={entry.latitude}
							longitude={entry.longitude}
							closeButton={true}
							closeOnClick={false}
							onClose={() => setShowPopup({})}
							anchor="top"
						>
							<div>
								<h3>{entry.title}</h3>
								<p>{entry.comments}</p>
								<p>{entry.description}</p>
								<small>
									Visited on: {new Date(entry.visitDate).toLocaleDateString()}
								</small>
								{entry.img && <img src={entry.img} alt={entry.title} />}
							</div>
						</Popup>
					)}
				</React.Fragment>
			))}
			{addEntryLocation && (
				<>
					<Marker
						latitude={addEntryLocation.latitude}
						longitude={addEntryLocation.longitude}
					>
						<div>
							<svg
								className="marker red"
								version="1.1"
								id="Layer_1"
								viewBox="0 0 512 512"
								strokeWidth="1.5"
								style={{
									width: 6 * viewport.zoom,
									height: 6 * viewport.zoom,
								}}
							>
								<path
									d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
								/>
							</svg>
						</div>
					</Marker>
					<Popup
						latitude={addEntryLocation.latitude}
						longitude={addEntryLocation.longitude}
						closeButton={true}
						closeOnClick={false}
						onClose={() => setAddEntryLocation(null)}
						anchor="top"
					>
						<div className="popup">
							<LogEntryForm
								location={addEntryLocation}
								onClose={() => {
									setAddEntryLocation(null);
									getEntries();
								}}
							/>
						</div>
					</Popup>
				</>
			)}
		</ReactMapGL>
	);
};

export default App;
