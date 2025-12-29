import { A } from "@solidjs/router";
import type { Component } from "solid-js";
import { useI18n } from "../context/i18n";
import { Send } from "lucide-solid";

export const LandingPage: Component = () => {
	const { t } = useI18n();

	return (
		<div class="hero min-h-[calc(100vh-4rem)] bg-base-200">
			<div class="hero-content flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
				<div class="text-center lg:text-left flex-1">
					<h1 class="text-5xl font-bold leading-tight">{t("landing.hero.title")}</h1>
					<p class="py-6 text-lg opacity-90">{t("landing.hero.description")}</p>
					<div class="flex flex-wrap gap-4 justify-center lg:justify-start">
						<A href="/calendar" class="btn btn-primary btn-lg shadow-xl">
							{t("landing.hero.ctaCalendar")}
						</A>
						<A href="/auth" class="btn btn-accent btn-lg shadow-xl">
							{t("landing.hero.ctaAuth")}
						</A>
					</div>
				</div>

				<div class="flex-1 flex justify-center">
					<div class="mockup-phone border-primary origin-top transform scale-[0.6] sm:scale-75 lg:scale-100">
						<div class="mockup-phone-camera" />
						<div class="mockup-phone-display">
							<img
								src="https://img.daisyui.com/images/stock/453966.webp"
								alt="Phone Wallpaper"
								class="absolute"
							/>
							<div class="relative mt-10 overflow-hidden">
								<div class="relative z-10 w-full h-full  backdrop-blur-[1px] pt-12 px-4 flex flex-col justify-start">
									{/* Telegram Notification Mockup */}
									<div class="w-full bg-[#2AABEE] text-white p-3 rounded-lg shadow-lg mb-4 flex items-start gap-3 animate-bounce">
										<div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
											<Send />
										</div>
										<div class="flex-1">
											<div class="flex justify-between items-center mb-1">
												<span class="font-bold">{t("landing.mockup.notification.title")}</span>
												<span class="text-xs opacity-80">
													{t("landing.mockup.notification.time")}
												</span>
											</div>
											<p class="text-sm">{t("landing.mockup.notification.body")}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
