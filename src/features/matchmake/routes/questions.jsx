import { useEffect } from "react";
import { Check, X, XCircle } from "lucide-react";

import Container from "../components/container";
import QuestionAlternative from "../components/question-alternative";
import Heading from "../components/heading";
import SecondaryButton from "../../../components/buttons/secondary-button";
import HorizontalRow from "../components/hr";
import Card, { CardButtons } from "../../../components/card";

function Questions({ questionnaire, answers, setAnswers, setAction, getNew, question, setQuestion }) {

	function handleChange(event) {
		const { name, value } = event.target;
		setAnswers((prev) => ({ ...prev, [name]: value }));
	}

	useEffect(() => {
		if (question === questionnaire.length) {
			setAction("verify");
		}
	}, [question]);

	return (
		<>
		{questionnaire[question] && <Card className="matchmake-cardfix mx-auto max-w-screen-sm matchmake-min-height">
			<Heading
				className="text-2xl text-white px-3"
				{...{
					heading: "Frågor",
					icon: <XCircle className="cursor-pointer" color="white" size="30" onClick={getNew} />,
				}}
			/>
			<HorizontalRow className="px-3" />
			<Container display="grid" className="gap-3">
				<Container display="flex" className="flex-col gap-3">
					<h2 className="px-3 text-xl text-white">{`${question + 1}/${questionnaire.length}`}</h2>
					<Container className="p-3 bg-black text-white text-base">{questionnaire[question].body}</Container>
				</Container>
				<Container type="form" display="flex" className="flex-col text-white p-3 gap-3">
					{questionnaire[question].answers.map((answer) => (
						<QuestionAlternative key={`${questionnaire.id}${answer.id}`} type="radio" text={answer.text} name={questionnaire[question].id} handleChange={handleChange} value={answer.id} checked={String(answers[questionnaire[question].id]) === String(answer.id)} />
					))}
				</Container>
			</Container>
			<HorizontalRow className="px-3" />
			<CardButtons className="px-3 h-10 mt-auto">
				<SecondaryButton
					icon={<X color="white" />}
					bgColor="red"
					className="text-white w-full text-sm"
					style={question === 0 ? { color: "darkgrey", backgroundColor: "rgba(0, 0, 0, 0.3)" } : { backgroundColor: "rgba(0, 0, 0, 0.3)" }}
					onClick={() => {
						setQuestion((prev) => (prev <= 0 ? 0 : prev - 1));
					}}
				>
					Föregående
				</SecondaryButton>
				<SecondaryButton
					icon={<Check color="white" />}
					bgColor="green"
					className="text-white w-full text-sm"
					onClick={() => {
						setQuestion((prev) => prev + 1);
					}}
				>
					Nästa
				</SecondaryButton>
			</CardButtons>
		</Card>}
		</>
	);
}

export default Questions;
