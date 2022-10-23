import React from "react";
import "../styles/auth.scss";
import { Mail, Lock } from "lucide-react";
import Logo from "../components/logo";
import Path from "../components/path";
import Button from "../../../components/buttons";
import InputField from "../../../components/input-field";
import useFetch from "../hooks/useFetch";
import InputError from "../components/inputError";
import { useNavigate, useParams } from "react-router-dom";

const Reset = () => {
	const [localError, setLocalError] = React.useState(null);
	const { data, loading, error, execute } = useFetch();
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [password2, setPassword2] = React.useState("");
	const [notSame, setNotSame] = React.useState(false);
	const { id } = useParams();
	const navigate = useNavigate();

	const handleGetResetCredentials = (e) => {
		e.preventDefault();
		execute("/user/reset/getCredentials", { email }, "GET", `?email=${email}`);
	};

	const handleReset = (e) => {
		e.preventDefault();
		execute("/user/reset/confirmCredentials", { id, password }, "PUT", `reset_key=${id}`);
	};

	React.useEffect(() => {
		if (data && id === "*") window.location.href = `/reset/${data[0].reset_key}`;
		else if (data)
			setTimeout(() => {
				navigate("/signin");
			}, 3000);
	}, [data]);

	React.useEffect(() => {
		if (password === password2) setNotSame(false);
		else setNotSame(true);
	}, [password, password2]);

	React.useEffect(() => {
		setLocalError(error);
	}, [error]);

	return (
		<div className="authContainer flex justify-center items-center">
			<div className="authContent w-full p-12">
				<Logo />
				{!data ? (
					<>
						{id === "*" ? (
							<form onSubmit={handleGetResetCredentials} className="flex gap-3 flex-col">
								<InputField
									className={localError?.type === "email" && "globalInputFieldError"}
									icon={<Mail strokeWidth={1} />}
									type="email"
									placeholder="E-post"
									value={email}
									handleChange={(e) => {
										if (localError?.type === "email") setLocalError(null);
										setEmail(e.target.value);
									}}
									required
								/>
								<InputError error={localError} type="email" />
								<Button children={loading ? "..." : "FORTSÄTT"} disabled={notSame | loading} className="w-full" />
							</form>
						) : (
							<form onSubmit={handleReset} className="flex gap-3 flex-col">
								<div className="authSignupPasswordContainer">
									<InputField
										className={localError?.type === "password" && "globalInputFieldError"}
										icon={<Lock strokeWidth={1} />}
										type="password"
										placeholder="Nytt lösenord"
										value={password}
										handleChange={(e) => {
											if (localError?.type === "password") setLocalError(null);
											setPassword(e.target.value);
										}}
										required
									/>
									<InputField
										className={notSame && "globalInputFieldError"}
										type="password"
										placeholder="Repetera lösenord"
										value={password2}
										handleChange={(e) => setPassword2(e.target.value)}
										required
									/>
								</div>
								<InputError error={localError} type="password" />
								<Button
									children={loading ? "..." : "ÅTERSTÄLL LÖSENORD"}
									disabled={notSame | loading}
									className="w-full"
								/>
							</form>
						)}
						<Path links={[{ path: "/signin", title: "Tillbaka" }]} />
					</>
				) : (
					<>
						<div className="text-center text-green">{data?.reset_key && "Password reset complete!"}</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Reset;
