import React from "react";
import {
	CalendarDays,
	Check,
	CheckCircle,
	Info,
	MapPin,
	X,
} from "lucide-react";
import {
	CardBadges,
	CardButtons,
	CardHeader,
} from "../../../../components/card";
import InfoGrid from "../../../../components/info-grid";
import HorizontalRow from "../hr";
import generateBadges from "../../../../components/badge/generate-badges";
import InfoStats from "../info-stats";
import SecondaryButton from "../../../../components/buttons/secondary-button";
import translate from "../../../../translate";

function Information({ advertisementData, setAction, user, apply }) {
	const { attribute } = advertisementData;
	const {
		badges,
		profession,
		period,
		location,
		work_type,
		decline_rate,
		response_time,
		openings,
	} = attribute;
	const [fromDate, toDate] = period;

	return (
		<>
			<CardHeader className="text-2xl px-3">
				<h2 className="overflow-hidden white-space-nowrap text-overflow-ellipsis">
					{profession}
				</h2>
				<Info size="30" style={{ minWidth: "max-content" }} />
			</CardHeader>
			<InfoGrid
				className="px-3 text-tiny"
				entries={[
					{
						icon: (
							<CalendarDays size="20" style={{ minWidth: "max-content" }} />
						),
						children: (
							<>
								{fromDate}
								<br />
								{toDate}
							</>
						),
					},
					{
						icon: <MapPin size="20" style={{ minWidth: "max-content" }} />,
						children: location,
					},
					{
						icon: <CheckCircle size="20" style={{ minWidth: "max-content" }} />,
						children: work_type,
					},
				]}
			/>
			<HorizontalRow className="px-3 opacity-3" />
			<CardBadges className="px-3">
				{generateBadges(
					[...badges].map((item) => item.toUpperCase()),
					[...user.attribute.badges].map((item) => item.toUpperCase()),
					{ className: "flex-1" }
				)}
			</CardBadges>
			<HorizontalRow className="px-3 opacity-3" />
			<InfoStats statistics={{ decline_rate, response_time, openings }} />
			<HorizontalRow className="px-3 opacity-3" />
			<CardButtons className="px-3 text-white mt-auto">
				<SecondaryButton
					icon={<X color="white" />}
					bgColor="red"
					className="w-full text-sm"
					onClick={() => apply.deny()}
				>
					Ny annons
				</SecondaryButton>
				<SecondaryButton
					icon={<Check color="white" />}
					bgColor="green"
					className="w-full text-sm"
					onClick={() => {
						setAction("questions");
					}}
				>
					Gör test
				</SecondaryButton>
			</CardButtons>
		</>
	);
}

export default Information;
