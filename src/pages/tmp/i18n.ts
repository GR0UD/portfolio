import { useState } from "react";

export type TmpLang = "en" | "ru";

export const tmpTranslations = {
  en: {
    addFeature: "Add feature",
    inProgress: "Doing",
    done: "Done",
    emptyState: "Nothing here yet. Hit + to add one!",
    emptyDone: "Nothing finished yet. Click a card to mark it done.",
    closeModal: "Close",
    modalTitle: "New Feature",
    featureNameLabel: "Feature name",
    featureNamePlaceholder: "e.g., Mini Player",
    descriptionLabel: "Description",
    descriptionPlaceholder: "What does this feature do?",
    versionLabel: "Version",
    cancel: "Cancel",
    create: "Create",
    pinTitle: "Enter Access Code",
    pinDescription: "This page is locked. Drop the code below to continue.",
    pinPlaceholder: "------",
    pinSubmit: "Unlock",
    pinErrorFormat: "Needs to be a 6-digit code.",
    pinErrorWrong: "Wrong code. Try again!",
    saveError: "Couldn't save to GitHub—showing locally for now.",
  },
  ru: {
    addFeature: "Добавить фичу",
    inProgress: "Делаю",
    done: "Готово",
    emptyState: "Тут пока пусто. Жми + чтобы добавить!",
    emptyDone: "Пока ничего не готово. Кликни на карточку, чтобы закрыть её.",
    closeModal: "Закрыть",
    modalTitle: "Новая фича",
    featureNameLabel: "Название фичи",
    featureNamePlaceholder: "например, Мини-плеер",
    descriptionLabel: "Описание",
    descriptionPlaceholder: "Что делает эта фича?",
    versionLabel: "Версия",
    cancel: "Отмена",
    create: "Создать",
    pinTitle: "Введи код доступа",
    pinDescription: "Страница закрыта. Введи код, чтобы пройти дальше.",
    pinPlaceholder: "------",
    pinSubmit: "Открыть",
    pinErrorFormat: "Нужен 6-значный код.",
    pinErrorWrong: "Неверный код. Попробуй ещё раз!",
    saveError: "Не вышло сохранить на GitHub — пока только локально.",
  },
} satisfies Record<TmpLang, Record<string, string>>;

export type TmpTranslationKey = keyof (typeof tmpTranslations)["en"];

export function useTmpLang() {
  const [lang, setLang] = useState<TmpLang>("en");

  const t = (key: TmpTranslationKey): string => tmpTranslations[lang][key];

  return { lang, setLang, t };
}
