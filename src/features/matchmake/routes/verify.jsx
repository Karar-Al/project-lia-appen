import { Navigate } from "react-router-dom";
import { XCircle } from "lucide-react";

import "./verify.scss";

import Container from "../components/container";
import Heading from "../components/heading";

function Verify({ data, setSearchParams }) {
	return (
		<>
			{!data && <Navigate to="/matchmake" />}
			{data && (
				<Container type="section" id="matchmake-verify">
					<Heading
						props={{
							heading: "Bekräfta",
							subheading: "Besvarade frågor 2/" + data.questions.length,
							icon: (
								<XCircle
									color="white"
									size="30"
									onClick={() => {
										setSearchParams();
									}}
								/>
							),
						}}
					></Heading>
					<p>Är du säker på att du vill skicka dina svar och få en chans att ansöka? </p>
					<Container type="nav" className="verify-nav">
						<button
							className="button"
							onClick={() => {
								setSearchParams((prev) => {
									prev.set("action", "questions");
									const question = parseInt(prev.get("question"));
									prev.set("question", question - 1);
									return prev;
								});
							}}
						>
							Tillbaks
						</button>
						<button className="button" onClick={() => {}}>
							Skicka in
						</button>
					</Container>
				</Container>
			)}
		</>
	);
}

export default Verify;
