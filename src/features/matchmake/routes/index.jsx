import { useEffect, useState } from "react";
import Card from "../../../components/card";
import Container from "../components/container";
import GenerateAdvertisementData from "../components/generate-advertisment-data";
import Loading from "../components/loading";

import "./index.scss";
import Information from "./information";
import Questions from "./questions";
import Verify from "./verify";

const Index = () => {
	const [action, setAction] = useState("information");
	const [answers, setAnswers] = useState({});
	const [question, setQuestion] = useState(0);

	const params = new URLSearchParams();
	params.append("profession", "Systemutvecklare");
	const { advertisementData, setAdvertisementData, setGetNew } = GenerateAdvertisementData(params);

	function getNew() {
		setAdvertisementData(null);
		setGetNew(true);
		setQuestion(0);
		setAction("information");
	}

	useEffect(() => {
		//console.log(advertisementData);
	}, [advertisementData]);

	return (
		<Container type="main" display="flex" className="gradient-bg p-3 h-full items-center justify-center">
			<Card className="matchmake-cardfix max-w-screen-sm matchmake-min-height h-max w-full">
				{!advertisementData && <Loading />}
				{advertisementData && (
					<>
						{action === "information" && <Information advertisementData={advertisementData} getNew={getNew} setAction={setAction} />}
						{action === "questions" && <Questions questionnaire={advertisementData.questionnaire} setAction={setAction} getNew={getNew} question={question} setQuestion={setQuestion} answers={answers} setAnswers={setAnswers} />}
						{action === "verify" && <Verify questionnaire={advertisementData.questionnaire} setAction={setAction} getNew={getNew} setQuestion={setQuestion} answers={answers} />}
					</>
				)}
			</Card>
		</Container>
	);
};

export default Index;
