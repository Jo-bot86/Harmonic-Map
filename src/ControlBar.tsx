import React, { EventHandler } from 'react';


type PortProps = {
  outputAccess: Promise<WebMidi.MIDIAccess>;
  inputAccess: Promise<WebMidi.MIDIAccess>;
};

type PortState = {
  availableOutputs: Array<JSX.Element>;
  availableInputs: Array<JSX.Element>;
};

class MidiPort extends React.Component<PortProps, PortState> {
  constructor(props: PortProps) {
    super(props);
    this.state = {
      availableOutputs: [],
      availableInputs: [],
    };
  }

  componentDidMount() {
    this.generatePort(this.props.outputAccess);
    this.generatePort(this.props.inputAccess);
  }

  generatePort(midiAccess: Promise<WebMidi.MIDIAccess>) {
    midiAccess.then((access: WebMidi.MIDIAccess) => {
      var outputs: Array<JSX.Element> = [];
      for (const [outputId, output] of access.outputs) {
        outputs.push(<option key={outputId} value={outputId}>{output["name"]}</option>);
      }
      this.setState({ availableOutputs: outputs });

      var inputs: Array<JSX.Element> = [];
      for (const [inputId, input] of access.inputs) {
        inputs.push(<option key={inputId} value={inputId}>{input["name"]}</option>);
      }
      this.setState({ availableInputs: inputs });
    });
  }

  
  onSelectedInput(): void {
    console.log();
  }

  setHandlerForSelectedInput(midiAccess: WebMidi.MIDIAccess, midiId: string) {
    var selectedInput = midiAccess.inputs.get(midiId);
    
  }


  render(): JSX.Element {
    return (
      <React.Fragment>
        <select onChange={this.onSelectedInput}>
          <option id="inputs" key="inital_input">-- inputs --</option>
          {this.state.availableInputs}
        </select>

        <select>
          <option id='outputs' key="initial_output">-- outputs --</option>
          {this.state.availableOutputs}
        </select>
      </React.Fragment>
    );
  }
}

export default MidiPort;
