import { useState } from "react";

export type TmpLang = "en" | "ru";

export const tmpTranslations = {
  en: {
    pageTitle: "Taskbar Media Player",
    addFeature: "Add feature",
    inProgress: "In Progress",
    done: "Done",
    emptyState: "No features yet. Click + to add one.",
    emptyDone: "Nothing done yet. Click a card to mark it done.",
    markDone: "Mark as done",
    markInProgress: "Move back to in progress",
    closeModal: "Close",
    modalTitle: "New Feature",
    featureNameLabel: "Feature Name",
    featureNamePlaceholder: "e.g. Mini Player",
    descriptionLabel: "Description",
    descriptionPlaceholder: "Describe what this feature does...",
    versionLabel: "Version",
    cancel: "Cancel",
    create: "Create",
    pinTitle: "Enter Access Code",
    pinDescription: "This page is locked. Enter the code to continue.",
    pinPlaceholder: "------",
    pinSubmit: "Unlock",
    pinErrorFormat: "Enter a 6-digit code.",
    pinErrorWrong: "Incorrect code. Try again.",
    saveError: "Couldn't save to GitHub — showing locally only.",
  },
  ru: {
    pageTitle: "Медиаплеер панели задач",
    addFeature: "Добавить функцию",
    inProgress: "В процессе",
    done: "Готово",
    emptyState: "Пока нет функций. Нажмите +, чтобы добавить.",
    emptyDone: "Пока ничего не готово. Нажмите на карточку, чтобы отметить.",
    markDone: "Отметить как готово",
    markInProgress: "Вернуть в процесс",
    closeModal: "Закрыть",
    modalTitle: "Новая функция",
    featureNameLabel: "Название функции",
    featureNamePlaceholder: "напр. Mini Player",
    descriptionLabel: "Описание",
    descriptionPlaceholder: "Опишите, что делает эта функция...",
    versionLabel: "Версия",
    cancel: "Отмена",
    create: "Создать",
    pinTitle: "Введите код доступа",
    pinDescription: "Эта страница заблокирована. Введите код, чтобы продолжить.",
    pinPlaceholder: "------",
    pinSubmit: "Разблокировать",
    pinErrorFormat: "Введите 6-значный код.",
    pinErrorWrong: "Неверный код. Попробуйте ещё раз.",
    saveError: "Не удалось сохранить в GitHub — показано только локально.",
  },
} satisfies Record<TmpLang, Record<string, string>>;

export type TmpTranslationKey = keyof (typeof tmpTranslations)["en"];

export function useTmpLang() {
  const [lang, setLang] = useState<TmpLang>("en");

  const t = (key: TmpTranslationKey): string => tmpTranslations[lang][key];

  return { lang, setLang, t };
}
