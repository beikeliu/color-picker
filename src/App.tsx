import './assets/style.scss'
import { defineComponent, ref } from 'vue'
import { ColorPicker } from './components/ColorPicker'
import type { HSVA, Hex, RGBA } from './components/util';

export const App = defineComponent({
  name: 'App',
  setup() {
    const color = ref();
    const onColor = (value:{hsva:HSVA, rgba:RGBA, hex:Hex}) => {
      color.value = value.hex;
    }
    return { color, onColor }
  },
  render() {
    return (
      <main style="padding: 50px">
        <div style={{background: this.color, width: '300px'}}>当前色值：{this.color}</div>
        <br />
        <ColorPicker onChange={this.onColor}/>
      </main>
    )
  }
})
