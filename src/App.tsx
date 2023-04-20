import './assets/style.scss'
import { defineComponent } from 'vue'
import { ColorPicker } from './components/ColorPicker'

export const App = defineComponent({
  name: 'App',
  render() {
    return (
      <main style="margin: 100px">
        <ColorPicker />
      </main>
    )
  }
})
