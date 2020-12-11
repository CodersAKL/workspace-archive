import * as vscode from "vscode";
import * as pack from "npm-packlist";
import * as AdmZip from "adm-zip";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand("extension.workspace.archive", () => {
		const workSpace = vscode.workspace.workspaceFolders
			? vscode.workspace.workspaceFolders[0]
			: { uri: { fsPath: "./" }, name: "no-name" };

		const rootPath = workSpace.uri.fsPath;
		const projectName = workSpace.name;
		const archivePath = path.resolve(rootPath, `${projectName}_${Date.now()}.zip`);
		const msg = vscode.window.setStatusBarMessage(`Archiving project: ${projectName}...`);

		const archive = new AdmZip();

		pack({ path: rootPath })
			.then((files) =>
				files.map((file) => {
					archive.addLocalFile(path.resolve(rootPath, file), path.dirname(file));
				})
			)
			.then(() => {
				msg.dispose();
				archive.writeZip(archivePath);

				msg.dispose();
				vscode.window.showInformationMessage(`Project: ${projectName} is archived to: ${rootPath}`);
			})
			.catch((error) => {
				msg.dispose();

				vscode.window.showErrorMessage(error);
			});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
