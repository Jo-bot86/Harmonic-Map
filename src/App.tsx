import React from 'react';
import './App.css';
import MidiPort from './ControlBar'

type EmptyProps = {};
type AppState = { access: Promise<WebMidi.MIDIAccess> };

class App extends React.Component<EmptyProps, AppState> {
  constructor(props: EmptyProps) {
    super(props);
    this.state = { access: navigator.requestMIDIAccess() };
  }
  render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          Harmonic Map
        </header>
        <MidiPort
          outputAccess={this.state.access}
          inputAccess={this.state.access} />
      </div>
    )
  }
}


export default App;
