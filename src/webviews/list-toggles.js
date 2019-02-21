import React from "react";
import { VsCodeContext } from "./vs-code-context/index";

export class ListToggles extends React.Component {
  state = {
    toggles: [],
    testData: ""
  };

  componentDidMount() {
    const { vscodeSubscribe, vscode } = this.context;
    const appState = vscode.getState();
    vscodeSubscribe(event => {
      if (event.data.fetchToggles) {
        vscode.setState({ toggles: event.data.fetchToggles });
        this.setState({ toggles: event.data.fetchToggles });
      }

      if (event.data.test) {
        this.setState({ testData: event.data.test });
      }
    });

    if (!appState || !appState.toggles) {
      vscode.postMessage({
        name: "fetchToggles"
      });
    } else {
      this.setState({ toggles: appState.toggles });
    }
    vscode.postMessage({
      name: "log",
      args: ["Im using a React context"]
    });
  }

  render() {
    const { toggles, testData } = this.state;
    return (
      <div>
        test: {testData}
        <ul>
          {toggles.map(toggle => (
            <li>{toggle.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

ListToggles.contextType = VsCodeContext;
