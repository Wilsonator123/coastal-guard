"use client";
import { useEffect, useState } from "react";
import { fetchCameras } from "@/hooks/case";
import Close from "@/assets/close.svg";

export default function CameraWidgit({ lon, lat, position, edit, remove }) {
	const [cameras, setCameras] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchCameras(lat, lon).then((data) => {
			setCameras(data);
			setLoading(false);
		});
	}, [lon, lat]);

	return (
		<div className="w-full h-full">
			{edit && (
				<button
					onClick={() => {
						remove(position);
					}}
					className="absolute top-[-7px] right-[-7px] bg-background z-20 rounded-full border hover:bg-secondary/90 cursor-pointer"
				>
					<Close width="20" height="20" />
				</button>
			)}
			{loading ? (
				<p>Loading...</p>
			) : (
				<div className="flex w-full h-full bg-accent border-[#00000]/50 border-t flex-col p-2">
					<table className="border border-white w-full h-full items-center">
						<thead className="flex flex-row w-full h-1/5">
							<tr className="flex w-full text-center text-lg text-white items-center">
								<th className="flex-auto w-1/3">Camera Name</th>
								<th className="flex-auto w-1/3">Distance</th>
								<th className="flex-auto w-1/3">Camera </th>
							</tr>
						</thead>
						<tbody className="flex flex-col w-full h-4/5 items-center ">
							{cameras.map((camera) => (
								<tr
									key={camera.name}
									className="flex 
											w-full text-lg items-center text-background 
											text-center font-semibold justify-center
											border-t p-1"
								>
									<td className="flex-auto w-1/3">
										{camera.name}
									</td>
									<td className="flex-auto w-1/3">
										{camera.distance.toPrecision(2)} miles
									</td>
									<td className="flex-auto w-1/3">
										<a
											className="bg-primary text-white p-1"
											href={`${camera.cameras[0]?.url}`}
										>
											Go to Camera
										</a>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
