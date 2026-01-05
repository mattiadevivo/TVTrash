import { useNavigate } from "@solidjs/router";
import { SignInForm } from "../../features/auth/components/signInForm";
import { useAuth } from "../context/auth";
import { useI18n } from "../context/i18n";

export function AuthPage() {
	const redirectPage = "/account/notifications";

	const { t } = useI18n();
	const auth = useAuth();
	const navigate = useNavigate();

	const handleAuthSuccess = () => {
		navigate(redirectPage);
	};

	// Redirect if already authenticated
	if (auth.user()) {
		navigate(redirectPage);
		return null;
	}

	return (
		<div class="h-svh flex items-center justify-center px-4 md:px-0">
			<div class="card card-border shadow-xl bg-base-100">
				<div class="card-body p-8">
					<div class="flex flex-col items-center mb-8">
						<div class="size-10 bg-primary/90 rounded-xl flex items-center justify-center mb-4 text-primary">
							<img src="/favicon.png" alt="Logo" class="size-6" />
						</div>
						<h1 class="text-2xl ont-bold">{t("auth.welcomeBack")}</h1>
						<p class="text-sm text-base-content/70 mt-2">{t("auth.signInDescription")}</p>
					</div>

					<SignInForm onSuccess={handleAuthSuccess} />
				</div>
			</div>
		</div>
	);
}
