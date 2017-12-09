import * as React from "react";
import { FormEvent } from "react";

export interface MyComponentProps { 
    compiler: string,
    framework: string 
}

export interface MyComponentState { 
    pingAddress: string 
    pingOutput: string 
    pingProcess: Cockpit.ProcessPromise
}

export class MyComponent extends React.Component<MyComponentProps, MyComponentState> {

    constructor(props: MyComponentProps) {
        super(props);
        this.state = {
            pingAddress: "www.google.com",
            pingOutput: "",
            pingProcess: null
        };

        this.updateUrl = this.updateUrl.bind(this);        
        this.ping = this.ping.bind(this);        
        this.cancelPingProcess = this.cancelPingProcess.bind(this);        
    }

    updateUrl(input: React.FormEvent<HTMLInputElement>) {
        this.setState({
            pingAddress: input.currentTarget.value
        });
    }

    ping() {
        let update : Cockpit.ProcessPromiseStreamCallback = this.appendPingOutput.bind(this);
        let done : Cockpit.ProcessPromiseDoneCallback = this.resetPingProcess.bind(this);
        let fail : Cockpit.ProcessPromiseFailCallback = this.printPingException.bind(this);
        
        let proc: Cockpit.ProcessPromise = cockpit.spawn(
            [
                "ping",
                "-c",
                "1",
                this.state.pingAddress
            ]
        )
        .stream(update)
        .done(done)
        .fail(fail);

        this.setState({
            pingProcess: proc
        });
    }

    appendPingOutput(output: string) {
        //Append a new line if needed
        if (output.charAt(output.length - 1) !== "\n") {
            output += "\n";
        }

        this.setState({
            pingOutput: this.state.pingOutput + output
        });
    }

    printPingException(exception: Cockpit.ProcessFailureException) {
        this.appendPingOutput("Program exited with code " + exception.exit_status + ": " + exception.message);
        this.resetPingProcess();
    }

    clearPingOutput() {
        this.setState({
            pingOutput: "",
        });
        this.resetPingProcess()
    }

    cancelPingProcess() {
        if (this.state.pingProcess !== null) {
            this.state.pingProcess.close();
            this.appendPingOutput("Canceled ping\n");
            this.resetPingProcess();
        }
    }

    resetPingProcess() {
        this.setState({
            pingProcess: null,
        });
    }

    showPingControls() {
        if (this.state.pingProcess === null) {
            return (
                <div>
                    <input type="text" onChange={this.updateUrl} value={this.state.pingAddress} ></input>
                    <button onClick={this.ping}>Ping</button>
                </div>
            );
        } else {
            return (
                <div>
                    <button onClick={this.cancelPingProcess}>Cancel</button>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
                {this.showPingControls()}

                <pre>{this.state.pingOutput}</pre>
            </div>
        );
    }
}