import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

function renameFileExtensions(
  directory: string,
  targetExtension: string,
  replacementExtension: string
) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      vscode.window.showErrorMessage(`Failed to read directory: ${err}`);
      return;
    }

    files.forEach((filename) => {
      const filePath = path.join(directory, filename);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          vscode.window.showErrorMessage(`Failed to get file stats: ${err}`);
          return;
        }

        if (stats.isFile() && filename.endsWith(targetExtension)) {
          const newFilename = filename.replace(
            targetExtension,
            replacementExtension
          );
          const newFilePath = path.join(directory, newFilename);

          fs.rename(filePath, newFilePath, (err) => {
            if (err) {
              vscode.window.showErrorMessage(`Failed to rename file: ${err}`);
              return;
            }

            vscode.window.showInformationMessage(
              `Renamed: ${filename} -> ${newFilename}`
            );
          });
        } else if (stats.isDirectory()) {
          renameFileExtensions(filePath, targetExtension, replacementExtension); // Recursively process subdirectories
        }
      });
    });
  });
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.renameExtensions",
    () => {
      vscode.window
        .showInputBox({ prompt: "Enter the directory path:" })
        .then((directory) => {
          if (!directory) {
            return;
          }

          vscode.window
            .showInputBox({
              prompt: "Enter the target extension (e.g., .jsx):",
            })
            .then((targetExtension) => {
              if (!targetExtension) {
                return;
              }

              vscode.window
                .showInputBox({
                  prompt: "Enter the replacement extension (e.g., .tsx):",
                })
                .then((replacementExtension) => {
                  if (!replacementExtension) {
                    return;
                  }

                  renameFileExtensions(
                    directory,
                    targetExtension,
                    replacementExtension
                  );
                });
            });
        });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
