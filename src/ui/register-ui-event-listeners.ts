import { executeCommand } from "../commands-setup/executeCommand";
import { CancelCommand } from "../scene-commands/cancel/CancelCommand";

export function registerUiEventListeners(): void {
  document.addEventListener("click", function (event: MouseEvent) {
    const target = event.target as HTMLElement;

    switch (target.id) {
      case "cancel":
        executeCommand(new CancelCommand());
        break;
    }
  });
}
