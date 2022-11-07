import { useEffect, useState } from "react";
import getAttribute from "../api/get-attribute";
import getAdvertisement from "../api/get-advertisement";
import deleteApplicant from "../api/delete-applicant";
import { getQuestionnairesByAdvertisementID } from "../../questionnaire/api/questionnaire";
import getApplicant from "../../applications/api/get-applicant";

async function getAdvertisementByAttributeID(id = []) {
	const searchParams = new URLSearchParams();
	if (Array.isArray(id)) {
		id.forEach((item) => searchParams.append("attribute_id", item));
	} else {
		searchParams.set("attribute_id", id);
	}
	const json = await (await getAdvertisement(searchParams)).json();
	return json;
}

async function getApplicantByAdvertisementID(id = []) {
	const searchParams = new URLSearchParams();
	if (Array.isArray(id)) {
		id.forEach((item) => searchParams.append("advertisement_id", item));
	} else {
		searchParams.set("advertisement_id", id);
	}
	const json = await (await getApplicant(searchParams)).json();
	return json;
}

function sortAdvertisements(a, b, attributes, badges) {
	const aBadges = [...attributes.find((attribute) => attribute.id === a.attribute_id).badges].filter((item) => badges.includes(item));
	const bBadges = [...attributes.find((attribute) => attribute.id === b.attribute_id).badges].filter((item) => badges.includes(item));
	if (aBadges.length > bBadges.length) {
		return -1;
	}
	if (aBadges.length < bBadges.length) {
		return 1;
	}
	return 0;
}

/**
 * @param {{id:string, attribute:{profession:string}}} user
 * @returns {{}}
 */
function useGenerateAdvertisementData(user) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [advertisementData, setAdvertisementData] = useState(null);

	async function getNewAdvertisement(user) {
		setLoading(true);
		setError(null);
		if (!user.id) return;
		try {
			const searchParams = new URLSearchParams();
			searchParams.set("profession", user.attribute.profession);
			searchParams.set("type", "advertisement");
			searchParams.set("is_active", true);
			const attributes = await (await getAttribute(searchParams)).json();
			const advertisements = await getAdvertisementByAttributeID(Array.from(attributes).map((attribute) => attribute.id));
			const applicants = await getApplicantByAdvertisementID(Array.from(advertisements).map((advertisement) => advertisement.id));
			const toFilter = [];
			for (const applicant of applicants) {
				const date = new Date();
				date.setDate(date.getDate() - 30);
				if (applicant.user_id === user.id) {
					if (applicant.accepted === null && applicant.cooldown < date.getTime()) {
						const res = await deleteApplicant(applicant.id);
						if (res.status !== 200) {
							throw new Error(`${res.status} (${res.statusText})`);
						}
					} else {
						toFilter.push(applicant.advertisement_id);
					}
				}
			}
			const filteredAdvertisements = advertisements.filter((advertisement) => !toFilter.includes(advertisement.id));
			if (!filteredAdvertisements.length) return setAdvertisementData(false);
			const badges = [...user.attribute.badges].map((item) => item.toUpperCase());
			filteredAdvertisements.sort((a, b) => sortAdvertisements(a, b, attributes, badges));
			const [advertisement] = filteredAdvertisements;
			const attribute = attributes.find((attribute) => attribute.id === advertisement.attribute_id);
			const questionnaire = await getQuestionnairesByAdvertisementID(advertisement.id);
			setAdvertisementData(() => ({
				...advertisement,
				attribute,
				questionnaire: questionnaire.data,
			}));
		} catch (error) {
			setError(error.toString());
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getNewAdvertisement(user);
	}, [user]);

	return { advertisementData, loading, error, getNewAdvertisement };
}
export default useGenerateAdvertisementData;
