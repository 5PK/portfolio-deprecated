/*
This component will analyse an audio file using the Web Audio API, more information can be found here:

https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

https://www.twilio.com/blog/audio-visualisation-web-audio-api--react

*/

import React, { Component } from 'react';

class AudioAnalyser extends Component {

    // When Component mounts, set up Web Autio API objets.
    componentDidMount() {

        // The AudioContext interface represents an audio-processing graph built from audio modules linked together, each represented by an AudioNode.
        this.audioContext = new (window.AudioContext ||  window.webkitAudioContext)();
    
        // The AnalyserNode interface represents a node able to provide real-time frequency and time-domain analysis information.
        this.analyser = this.audioContext.createAnalyser();
    
        // This dataArray will be used to store the waveform data that the AnalyserNode will be creating.
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    
        // The source, which is the audio file.
        this.source = this.audioContext.createMediaStreamSource(this.props.audio);
    
        // connect source to the anlayser .
        this.source.connect(this.analyser);
      }

      // Method that will be called every time requestAnimationFrame runs. 
      // The function will copy the current waveform as an array of integers, from the AnalyserNode into the dataArray. 
      // It will then update the audioData property in the component's state with the dataArray. 
      // Finally, it will call on requestAnimationFrame again to request the next update.
      tick() {

        // Use the analyser to update the visualization from the dataArray
        this.analyser.getByteTimeDomainData(this.dataArray);

        // 
        this.setState({ audioData: this.dataArray });
        
        this.rafId = requestAnimationFrame(this.tick);
      }
 
}



export default AudioAnalyser;
