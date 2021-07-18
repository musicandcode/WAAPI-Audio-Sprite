class Sprite {
  constructor(settingsObj) {
    this.src = settingsObj.src;
    this.samples = settingsObj.sprite;

    this.init();
  }

  async init() {
    // Set up web audio
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioCtx;
    // Load file
    this.audioBuffer = await this.getFile();
  }
  async getFile() {
    // Request file
    const response = await fetch(this.src);
    if (!response.ok) {
      console.log(`${response.url} ${response.statusText}`);
      throw new Error(`${response.url} ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
    console.log(audioBuffer);
    return audioBuffer;
  }

  play(sampleName) {
    console.log(sampleName)
    console.log(this.samples)
    const startTime = this.samples[sampleName][0] / 1000;
    const duration = this.samples[sampleName][1] / 1000;
    const sampleSource = this.ctx.createBufferSource();
    sampleSource.buffer = this.audioBuffer;
    sampleSource.connect(this.ctx.destination);
    sampleSource.start(this.ctx.currentTime, startTime, duration);
  }
}

const abc = new Sprite({
    "src": './abc.webm',
    "sprite": {
      "a": [
        0,
        453.42403628117916
      ],
      "b": [
        2000,
        445.0793650793652
      ],
      "c": [
        4000,
        601.3832199546484
      ],
      "d": [
        6000,
        395.4195011337864
      ],
      "e": [
        8000,
        376.1904761904766
      ],
      "f": [
        10000,
        414.64852607709804
      ],
      "g": [
        12000,
        457.00680272108764
      ],
      "h": [
        14000,
        423.5147392290255
      ],
      "i": [
        16000,
        423.06122448979625
      ],
      "j": [
        18000,
        489.9999999999984
      ],
      "k": [
        20000,
        500
      ],
      "l": [
        22000,
        405.78231292516875
      ],
      "m": [
        24000,
        386.7120181405887
      ],
      "n": [
        26000,
        418.548752834468
      ],
      "o": [
        28000,
        381.67800453514644
      ],
      "p": [
        30000,
        415.1020408163255
      ],
      "q": [
        32000,
        500
      ],
      "r": [
        34000,
        414.8299319727897
      ],
      "s": [
        36000,
        464.8752834467089
      ],
      "t": [
        38000,
        490.63492063491765
      ],
      "u": [
        40000,
        537.1201814058963
      ],
      "v": [
        42000,
        523.4920634920641
      ],
      "w": [
        44000,
        772.6757369614531
      ],
      "x": [
        46000,
        466.98412698412994
      ],
      "y": [
        48000,
        547.5283446711999
      ],
      "z": [
        50000,
        523.832199546483
      ]
    }
})

const playKey = (e) => {
  for (key in abc.samples) {
    if (e.key === key) {
      abc.play(key);
    }
  }
}

const keyPress = document.addEventListener("keydown", (e) => {
  const keyDiv = document.querySelector(".key");
  keyDiv.innerText = e.key.toUpperCase();
  playKey(e);
})