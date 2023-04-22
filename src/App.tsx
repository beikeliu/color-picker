import './assets/style.scss'
import { defineComponent } from 'vue'
import { ColorPicker } from './components/ColorPicker'

export const App = defineComponent({
  name: 'App',
  render() {
    return (
      <main style="padding: 50px">
        <ColorPicker />
      </main>
    )
  }
})
