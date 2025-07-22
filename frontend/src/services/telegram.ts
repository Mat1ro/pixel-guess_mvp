import WebApp from "@twa-dev/sdk";

class TelegramService {
  private webApp = WebApp;

  init() {
    // Проверяем, что приложение запущено в Telegram
    if (!this.isInTelegram()) {
      console.warn("App is not running in Telegram");
      return;
    }

    // Уведомляем Telegram, что приложение готово
    this.webApp.ready();

    // Расширяем приложение на весь экран
    this.webApp.expand();

    // Настраиваем цвета в соответствии с темой Telegram
    this.setupTheme();

    // Настраиваем кнопку "Назад"
    this.setupBackButton();
  }

  isInTelegram(): boolean {
    return !!window.Telegram?.WebApp;
  }

  getUserData() {
    if (!this.isInTelegram()) {
      // Возвращаем тестовые данные для разработки
      return {
        id: 12345,
        first_name: "Test",
        last_name: "User",
        username: "testuser",
        language_code: "ru",
      };
    }

    return this.webApp.initDataUnsafe.user || null;
  }

  getInitData(): string {
    return this.webApp.initData || "";
  }

  setupTheme() {
    const theme = this.webApp.themeParams;
    const root = document.documentElement;

    // Применяем цвета темы Telegram к CSS переменным
    if (theme.bg_color) {
      root.style.setProperty("--tg-theme-bg-color", theme.bg_color);
    }
    if (theme.text_color) {
      root.style.setProperty("--tg-theme-text-color", theme.text_color);
    }
    if (theme.hint_color) {
      root.style.setProperty("--tg-theme-hint-color", theme.hint_color);
    }
    if (theme.link_color) {
      root.style.setProperty("--tg-theme-link-color", theme.link_color);
    }
    if (theme.button_color) {
      root.style.setProperty("--tg-theme-button-color", theme.button_color);
    }
    if (theme.button_text_color) {
      root.style.setProperty(
        "--tg-theme-button-text-color",
        theme.button_text_color
      );
    }
    if (theme.secondary_bg_color) {
      root.style.setProperty(
        "--tg-theme-secondary-bg-color",
        theme.secondary_bg_color
      );
    }

    // Устанавливаем цвет заголовка
    this.webApp.setHeaderColor(theme.secondary_bg_color || "#1a1a1a");
    this.webApp.setBackgroundColor(theme.bg_color || "#0c0c0c");
  }

  setupBackButton() {
    // Скрываем кнопку назад по умолчанию
    this.webApp.BackButton.hide();
  }

  showBackButton(onClick: () => void) {
    this.webApp.BackButton.show();
    this.webApp.BackButton.onClick(onClick);
  }

  hideBackButton() {
    this.webApp.BackButton.hide();
  }

  showMainButton(text: string, onClick: () => void) {
    const mainButton = this.webApp.MainButton;
    mainButton.setText(text);
    mainButton.show();
    mainButton.enable();
    mainButton.onClick(onClick);
  }

  hideMainButton() {
    this.webApp.MainButton.hide();
  }

  showAlert(message: string) {
    this.webApp.showAlert(message);
  }

  showConfirm(message: string, callback: (confirmed: boolean) => void) {
    this.webApp.showConfirm(message, callback);
  }

  hapticFeedback(
    type: "impact" | "notification" | "selection",
    style?: string
  ) {
    const haptic = this.webApp.HapticFeedback;

    switch (type) {
      case "impact":
        haptic.impactOccurred((style as any) || "medium");
        break;
      case "notification":
        haptic.notificationOccurred((style as any) || "success");
        break;
      case "selection":
        haptic.selectionChanged();
        break;
    }
  }

  close() {
    this.webApp.close();
  }
}

export const telegramService = new TelegramService();
