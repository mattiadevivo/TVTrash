import { Info, TriangleAlert } from "lucide-solid";
import type { Component } from "solid-js";
import { useI18n } from "../../../app/context/i18n";

export const InstructionsCard: Component<{ show: boolean }> = (props) => {
	const { t } = useI18n();
	return (
		<div
			class={`card bg-base-100 shadow-xl transition-all duration-300 ${
				props.show ? "ring-2 ring-primary" : ""
			}`}
		>
			<div class="card-body">
				<h3 class="card-title text-lg">
					<Info size={24} />
					{t("account.instructions.title")}
				</h3>

				<div class="space-y-4 text-sm">
					<div class="steps steps-vertical">
						<div class="step step-primary">
							<div class="text-left">
								<div class="font-semibold">{t("account.instructions.step1Title")}</div>
								<div class="text-gray-600">{t("account.instructions.step1Desc")}</div>
							</div>
						</div>

						<div class="step step-primary">
							<div class="text-left">
								<div class="font-semibold">{t("account.instructions.step2Title")}</div>
								<div class="text-gray-600">{t("account.instructions.step2Desc")}</div>
							</div>
						</div>

						<div class="step step-primary">
							<div class="text-left">
								<div class="font-semibold">{t("account.instructions.step3Title")}</div>
								<div class="text-gray-600">{t("account.instructions.step3Desc")}</div>
							</div>
						</div>

						<div class="step step-primary">
							<div class="text-left">
								<div class="font-semibold">{t("account.instructions.step4Title")}</div>
								<div class="text-gray-600">{t("account.instructions.step4Desc")}</div>
							</div>
						</div>
					</div>

					<div class="alert alert-info">
						<Info size={24} />
						<div>
							<div class="font-semibold">{t("account.instructions.alternativeTitle")}</div>
							<p class="text-xs mt-1">{t("account.instructions.alternativeDesc")}</p>
						</div>
					</div>

					<div class="alert alert-warning">
						<TriangleAlert size={24} />
						<div>
							<div class="font-semibold">{t("account.instructions.privateTitle")}</div>
							<p class="text-xs mt-1">{t("account.instructions.privateDesc")}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
