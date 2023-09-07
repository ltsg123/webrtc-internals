import { setParameter } from "./config/config";

export function initUI(isInject) {
  const outContainer = document.createElement("div");
  outContainer.className = "webrtc-internals-body-out";
  document.body.appendChild(outContainer);

  const body = document.createElement("div");
  body.id = "webrtc-internals-body";
  body.className = "webrtc-internals-body";
  body.innerHTML = `
  <p id="content-root"></p>
  <template id="td2-template"><td></td><td></td></template>
  <template id="summary-template"><td><details><summary></summary></details></td></template>
  <template id="container-template"><div></div><div><canvas></canvas></div></template>
  <template id="summary-span-template"><summary><span></span></summary></template>
  <template id="checkbox-template"><input type=checkbox checked></template>
  <template id="trth-template"><tbody><tr><th colspan=2></th></tr></tbody></template>
  <template id="td-colspan-template"><td colspan=2></td></template>
  <template id="time-event-template"><tbody><tr><th>Time</th><th class="update-log-header-event">Event</th></tr></tbody></template>
  <template id="dump-template">
    <div>
      <a>
        <button>Download the PeerConnection updates and stats data</button>
      </a>
      <label>
        <input type="checkbox">Compress result
      </label>
    </div>
    <p>
      <label>
        <input type="checkbox">Enable diagnostic audio recordings
      </label>
    </p>
    <p class="audio-diagnostic-dumps-info">A diagnostic audio recording is used for analyzing audio problems. It consists of several files and contains the audio played out to the speaker (output) and captured from the microphone (input). The data is saved locally. Checking this box will enable recordings of all ongoing input and output audio streams (including non-WebRTC streams) and for future audio streams. When the box is unchecked or this page is closed, all ongoing recordings will be stopped and this recording functionality disabled. Recording audio from multiple tabs is supported as well as multiple recordings from the same tab.</p>
    <p>When enabling, select a base filename to which the following suffixes will be added:</p>
    <div>&lt;base filename&gt;.&lt;render process ID&gt;.aec_dump.&lt;AEC dump recording ID&gt;</div>
    <div>&lt;base filename&gt;.input.&lt;stream recording ID&gt;.wav</div>
    <div>&lt;base filename&gt;.output.&lt;stream recording ID&gt;.wav</div>
    <p class="audio-diagnostic-dumps-info">It is recommended to choose a new base filename each time the feature is enabled to avoid ending up with partially overwritten or unusable audio files.</p>
    <p>
      <label>
        <input type="checkbox" disabled>Enable diagnostic packet and event recording
      </label>
    </p>
    <p class="audio-diagnostic-dumps-info">A diagnostic packet and event recording can be used for analyzing various issues related to thread starvation, jitter buffers or bandwidth estimation. Two types of data are logged. First, incoming and outgoing RTP headers and RTCP packets are logged. These do not include any audio or video information, nor any other types of personally identifiable information (so no IP addresses or URLs). Checking this box will enable the recording for ongoing WebRTC calls and for future WebRTC calls. When the box is unchecked or this page is closed, all ongoing recordings will be stopped and this recording functionality will be disabled for future WebRTC calls. Recording in multiple tabs or multiple recordings in the same tab will cause multiple log files to be created. When enabling, a filename for the recording can be entered. The entered filename is used as a base, to which the following suffixes will be appended.</p>
    <p>&lt;base filename&gt;_&lt;date&gt;_&lt;timestamp&gt;_&lt;render process ID&gt;_&lt;recording ID&gt;</p>
    <p class="audio-diagnostic-dumps-info">If a file with the same name already exists, it will be overwritten. No more than 5 logfiles  will be created, and each of them is limited to 60MB of storage.  On Android these limits are 3 files of at most 10MB each.  When the limit is reached, the checkbox must be unchecked and  rechecked to resume logging.</p>
  </template>
  <template id="stats-template">
    <div>
      Read stats From:
      <select id="statsSelectElement">
      </select>
      <p><b>Note:</b> computed stats are in []. Experimental stats are marked with an * at the end and do not show up in the getStats result.</p>
      <p id="legacy-stats-warning"><b>Note:</b> the callback-based getStats API and many of its goog-prefixed values are non-standard and may be removed from the getStats() API in the future.</p>
    </div>
  </template>
  `;
  outContainer.appendChild(body);
  if (isInject) {
    outContainer.hidden = true;
    const button = document.createElement("div");
    button.innerText = "WebRTC-Internals";
    button.className = "webrtc-internals-switch";
    document.body.appendChild(button);

    button.onclick = () => {
      outContainer.hidden = !outContainer.hidden;
    };
  }

  setParameter("container", outContainer);
}
