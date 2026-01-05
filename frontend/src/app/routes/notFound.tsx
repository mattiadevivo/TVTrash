import type { Component } from "solid-js";
import { useI18n } from "../context/i18n";

export const NotFoundPage: Component = () => {
	const { t } = useI18n();
	return <h1 class="h-svh text-3xl text-primary/80 text-center pt-30">{t("notFound")}</h1>;
};
